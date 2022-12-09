import fs from 'fs';

const getData = (): Array<Array<string>> => {
  const input: Array<string> = fs
    .readFileSync('../resources/inputDay04.txt')
    .toString()
    .trim()
    .split('\n');
  return input.map(values => values.split(','));
};

const isOverlaping = (elfOne: string, elfTwo: string): boolean => {
  const firstRange = elfOne.split('-').map(value => Number(value));
  const secondRange = elfTwo.split('-').map(value => Number(value));
  if (firstRange[0] <= secondRange[0] && firstRange[1] >= secondRange[1]) {
    return true;
  }
  if (firstRange[0] >= secondRange[0] && firstRange[1] <= secondRange[1]) {
    return true;
  }
  return false;
};

const calculateOverlaps = (): number => {
  const data = getData();
  let overlaps = 0;
  data.forEach(pair => {
    if (isOverlaping(pair[0], pair[1])) {
      overlaps++;
    }
  });
  return overlaps;
};

console.log(`Overlaping elfs are: ${calculateOverlaps()}`);
