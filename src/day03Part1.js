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
const getData = () => {
    const input = fs
        .readFileSync('../resources/inputDay03.txt')
        .toString()
        .trim()
        .split('\n');
    return input.map(values => {
        const partOne = values.slice(0, values.length / 2);
        const partTwo = values.slice(values.length / 2, values.length);
        return [partOne, partTwo];
    });
};
const findDuplicatedItem = (itemsOne, itemsTwo) => {
    var _a;
    return (_a = [...itemsOne].find(item => itemsTwo.includes(item))) !== null && _a !== void 0 ? _a : '';
};
const obtainItemValue = (item) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    return alphabet.indexOf(item) + 1;
};
const getResult = () => {
    const sacks = getData();
    return sacks
        .map((sack) => {
        const duplicatedItem = findDuplicatedItem(sack[0], sack[1]);
        return obtainItemValue(duplicatedItem);
    })
        .reduce((previous, current) => previous + current);
};
console.log(`The total value is: ${getResult()}`);
