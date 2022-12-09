"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const MAX_SPACE = 70000000;
const SPACE_REQUIRED = 30000000;
const getData = () => {
    const input = fs_1.default
        .readFileSync('../resources/inputDay07.txt')
        .toString()
        .trim()
        .split('\n');
    return input;
};
const parseInput = () => {
    const lines = getData();
    const root = {
        name: '/',
        type: 'dir',
        size: 0,
        children: [],
    };
    let current;
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
                }
                else if (dirName === '..') {
                    // Move up one level.
                    current = current === null || current === void 0 ? void 0 : current.parent;
                }
                else {
                    // Move down one level.
                    current = current === null || current === void 0 ? void 0 : current.children.find(d => d.name === dirName);
                }
            }
        }
        else if (command === 'dir') {
            // The second word is the name of the directory.
            const dirName = words[1];
            // Create a new directory and add it to the current directory's children.
            const dir = {
                name: dirName,
                type: 'dir',
                size: 0,
                children: [],
                parent: current || root,
            };
            current === null || current === void 0 ? void 0 : current.children.push(dir);
        }
        else {
            // The first word will be the size
            // The second word is the name of the file.
            const dirName = words[1];
            // Create a new directory and add it to the current directory's children.
            const dir = {
                name: dirName,
                type: 'file',
                size: Number(words[0]),
                children: [],
                parent: current || root,
            };
            current === null || current === void 0 ? void 0 : current.children.push(dir);
        }
    }
    updateSizes(root);
    return root;
};
const updateSizes = (input) => {
    const children = input.children;
    if ((children === null || children === void 0 ? void 0 : children.length) > 0) {
        children.forEach(child => {
            if ((children === null || children === void 0 ? void 0 : children.length) > 0) {
                updateSizes(child);
            }
        });
    }
    if (input === null || input === void 0 ? void 0 : input.parent) {
        input.parent.size += input.size;
    }
};
const input = parseInput();
const spaceFree = MAX_SPACE - input.size;
const spaceNeeded = SPACE_REQUIRED - spaceFree;
console.log(`need ${spaceNeeded}`);
let size = undefined;
const getDirectorySize = (input) => {
    if (input.type === 'dir' &&
        input.size >= spaceNeeded &&
        size &&
        input.size < size) {
        size = input.size;
    }
    else if (!size && input.type === 'dir' && input.size >= spaceNeeded) {
        size = input.size;
    }
    console.log(`input ${input.name} size ${input.size}`);
    for (const child of input.children) {
        getDirectorySize(child);
    }
    console.log(`Size ${size}`);
};
getDirectorySize(input);
console.log(`The directory size is: ${size}`);
