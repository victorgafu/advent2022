import fs from 'fs';

const MAX_SIZE = 100000;

interface File {
  name: string;
  type: 'dir' | 'file';
  size: number;
  children: File[];
  parent?: File;
}

const getData = (): Array<string> => {
  const input: Array<string> = fs
    .readFileSync('../resources/inputDay07.txt')
    .toString()
    .trim()
    .split('\n');
  return input;
};

const parseInput = (): File => {
  const lines = getData();

  const root: File = {
    name: '/',
    type: 'dir',
    size: 0,
    children: [],
  };

  let current: File | undefined;

  for (const line of lines) {
    const words = line.split(' ');
    let command = words[0];

    if (command === '$') {
      command = words[1];
      if (command === 'cd') {
        // The second word is the directory to change to.
        const dirName = words[2];

        if (dirName === '/') {
          // The root directory.
          current = root;
        } else if (dirName === '..') {
          // Move up one level.
          current = current?.parent;
        } else {
          // Move down one level.
          current = current?.children.find(d => d.name === dirName);
        }
      }
    } else if (command === 'dir') {
      // The second word is the name of the directory.
      const dirName = words[1];

      // Create a new directory and add it to the current directory's children.
      const dir: File = {
        name: dirName,
        type: 'dir',
        size: 0,
        children: [],
        parent: current || root,
      };
      current?.children.push(dir);
    } else {
      // The first word will be the size
      // The second word is the name of the file.
      const dirName = words[1];

      // Create a new directory and add it to the current directory's children.
      const dir: File = {
        name: dirName,
        type: 'file',
        size: Number(words[0]),
        children: [],
        parent: current || root,
      };
      current?.children.push(dir);
    }
  }
  updateSizes(root);
  return root;
};

const updateSizes = (input: File): void => {
  const children = input.children;
  if (children?.length > 0) {
    children.forEach(child => {
      if (children?.length > 0) {
        updateSizes(child);
      }
    });
  }
  if (input?.parent) {
    input.parent.size += input.size;
  }
};

const calculateTotalSize = (input: File): number => {
  let total = 0;

  if (input.type === 'dir' && input.size < MAX_SIZE) {
    total += input.size;
  }

  for (const child of input.children) {
    total += calculateTotalSize(child);
  }

  return total;
};

const input = parseInput();
const total = calculateTotalSize(input);
console.log(`Total size is: ${total}`);
