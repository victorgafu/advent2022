"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const getData = () => {
    const input = fs_1.default
        .readFileSync('../resources/inputDay04.txt')
        .toString()
        .trim()
        .split('\n');
    return input.map(values => values.split(','));
};
const isOverlaping = (elfOne, elfTwo) => {
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
const calculateOverlaps = () => {
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
