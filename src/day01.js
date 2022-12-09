"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const getTotals = () => {
    const input = fs
        .readFileSync('../resources/inputDay01.txt')
        .toString()
        .split('\n\n');
    const totals = input.map((values) => {
        const amounts = values
            .split('\n')
            .map(value => Number(value))
            .reduce((previous, current) => previous + current);
        return amounts;
    });
    return totals;
};
const totals = getTotals();
const max = Math.max(...totals);
const day01 = totals.indexOf(max);
console.log(`The max calories are ${max} and carried by the elf ${day01 + 1}`);
console.log();
const showTopThree = (values) => {
    const topThree = values.sort().reverse().slice(0, 3);
    console.log('Showing the top three elves');
    topThree.forEach((value, index) => console.log(`The elf top ${index + 1} carried ${value} calories`));
    const total = topThree.reduce((previous, current) => previous + current);
    console.log(`That sums a total of ${total} calories`);
};
showTopThree(totals);
