"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const getMovements = () => {
    const input = fs_1.default
        .readFileSync('../resources/inputDay09.txt')
        .toString()
        .trim()
        .split('\n');
    return input.map(row => {
        const items = row.split(' ');
        return { direction: items[0], steps: Number(items[1]) };
    });
};
const moveHead = (head, movement) => {
    switch (movement.direction) {
        case 'U':
            head.y -= movement.steps;
            break;
        case 'D':
            head.y += movement.steps;
            break;
        case 'L':
            head.x -= movement.steps;
            break;
        case 'R':
            head.x += movement.steps;
            break;
    }
    return head;
};
const crossBridge = () => {
    const movements = getMovements();
    let head = { x: 0, y: 0 };
    const tail = { x: 0, y: 0 };
    // Keep track of the positions that the tail visits
    const visitedPositions = new Set();
    visitedPositions.add(`${tail.x},${tail.y}`);
    for (const movement of movements) {
        head = moveHead(head, movement);
        while (Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1) {
            if (head.x !== tail.x) {
                tail.x += head.x > tail.x ? 1 : -1;
            }
            if (head.y !== tail.y) {
                tail.y += head.y > tail.y ? 1 : -1;
            }
            visitedPositions.add(`${tail.x},${tail.y}`);
        }
    }
    console.log(`The total unique positions are: ${visitedPositions.size}`);
};
console.log(crossBridge());
