"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const PACKET_LENGTH = 14;
const getData = () => {
    const input = fs_1.default
        .readFileSync('../resources/inputDay06.txt')
        .toString()
        .trim();
    return [...input];
};
const charactersAreUnique = (characters) => {
    const uniqueCharacters = new Set(characters);
    return uniqueCharacters.size === characters.length;
};
const findMarker = () => {
    let marker = -1;
    const characters = getData();
    const lastCharacters = [];
    for (let i = 0; i < characters.length; i++) {
        if (lastCharacters.length === PACKET_LENGTH) {
            lastCharacters.shift();
        }
        lastCharacters.push(characters[i]);
        if (lastCharacters.length === PACKET_LENGTH &&
            charactersAreUnique(lastCharacters)) {
            marker = i + 1;
            break;
        }
    }
    return marker;
};
console.log(`The marker is at the position ${findMarker()}`);
