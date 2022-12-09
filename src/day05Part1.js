"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
// const stacks: Record<number, Array<string>> = {
//   1: ['N', 'Z'],
//   2: ['D', 'C', 'M'],
//   3: ['P'],
// };
const stacks = {
    1: ['Q', 'G', 'P', 'R', 'L', 'C', 'T,', 'F'],
    2: ['J', 'S', 'F', 'R', 'W', 'H', 'Q', 'N'],
    3: ['Q', 'M', 'P', 'W', 'H', 'B', 'F'],
    4: ['F', 'D', 'T', 'S', 'V'],
    5: ['Z', 'F', 'V', 'W', 'D', 'L', 'Q'],
    6: ['S', 'L', 'C', 'Z'],
    7: ['F', 'D', 'V', 'M', 'B', 'Z'],
    8: ['B', 'J', 'T'],
    9: ['H', 'P', 'S', 'L', 'G', 'B', 'N', 'Q'],
};
const getData = () => {
    const input = fs_1.default
        .readFileSync('../resources/inputDay05.txt')
        .toString()
        .trim()
        .split('\n');
    return input.map(values => {
        const parts = values.split(' ');
        const numbers = parts
            .filter(part => !isNaN(Number(part)))
            .map(part => Number(part));
        return {
            move: Number(numbers[0]),
            from: Number(numbers[1]),
            to: Number(numbers[2]),
        };
    });
};
const manipulateStacks = () => {
    const steps = getData();
    steps.forEach((step) => {
        const itemsToMove = stacks[step.from].splice(0, step.move).reverse();
        stacks[step.to].unshift(...itemsToMove);
    });
};
const processStacks = () => {
    console.log('Stacks before manipulation');
    console.log(stacks);
    manipulateStacks();
    console.log('Stacks after manipulation');
    console.log(stacks);
    const topCrates = Object.values(stacks)
        .map(crates => crates.slice(0, 1))
        .join('');
    console.log(`The top crates are: ${topCrates}`);
};
processStacks();
