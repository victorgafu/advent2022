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
var moves;
(function (moves) {
    moves[moves["rock"] = 1] = "rock";
    moves[moves["paper"] = 2] = "paper";
    moves[moves["scissors"] = 3] = "scissors";
})(moves || (moves = {}));
const entryPoints = {
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3,
};
const getData = () => {
    const input = fs
        .readFileSync('../resources/inputDay02.txt')
        .toString()
        .trim()
        .split('\n');
    return input.map(values => values.split(' '));
};
const getWinner = (elfMove, playerMove) => {
    if (elfMove === playerMove)
        return { result: 'Draw', points: 3 };
    const playerWon = { result: 'won', points: 6 };
    const playerLost = { result: 'lost', points: 0 };
    switch (elfMove) {
        case moves.rock:
            if (playerMove === moves.paper)
                return playerWon;
            break;
        case moves.paper:
            if (playerMove === moves.scissors)
                return playerWon;
            break;
        case moves.scissors:
            if (playerMove === moves.rock)
                return playerWon;
            break;
        default:
            return playerLost;
    }
    return playerLost;
};
const getRoundPoints = (round, play) => {
    const elfValue = entryPoints[play[0]];
    const playerValue = entryPoints[play[1]];
    const elfMove = moves[elfValue];
    const playerMove = moves[playerValue];
    console.log(`Round ${round} elf played ${elfMove} and player played ${playerMove}`);
    const winner = getWinner(elfValue, playerValue);
    const points = playerValue + winner.points;
    console.log(`Player ${winner.result} and got ${points} point${points === 1 ? '' : 's'}`);
    return points;
};
const data = getData();
const roundPoints = data.map((play, index) => getRoundPoints(index + 1, play));
const totalPoints = roundPoints.reduce((previous, current) => previous + current);
console.log();
console.log(`Player total points are: ${totalPoints}`);
