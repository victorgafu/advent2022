import * as fs from 'fs';

interface Result {
  result: string;
  points: number;
}

enum moves {
  rock = 1,
  paper = 2,
  scissors = 3,
}

const entryPoints: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
};

const getData = (): Array<Array<string>> => {
  const input = fs
    .readFileSync('../resources/inputDay02.txt')
    .toString()
    .trim()
    .split('\n');
  return input.map(values => values.split(' '));
};

const getWinner = (elfMove: number, playerMove: number): Result => {
  if (elfMove === playerMove) return {result: 'Draw', points: 3};

  const playerWon = {result: 'won', points: 6};
  const playerLost = {result: 'lost', points: 0};

  switch (elfMove) {
    case moves.rock:
      if (playerMove === moves.paper) return playerWon;
      break;
    case moves.paper:
      if (playerMove === moves.scissors) return playerWon;
      break;
    case moves.scissors:
      if (playerMove === moves.rock) return playerWon;
      break;
    default:
      return playerLost;
  }
  return playerLost;
};

const losingValue = (elfMove: number): number => {
  let move = 0;
  switch (elfMove) {
    case moves.rock:
      move = moves.scissors;
      break;
    case moves.paper:
      move = moves.rock;
      break;
    case moves.scissors:
      move = moves.paper;
      break;
  }
  return move;
};

const winingValue = (elfMove: number): number => {
  let move = 0;
  switch (elfMove) {
    case moves.rock:
      move = moves.paper;
      break;
    case moves.paper:
      move = moves.scissors;
      break;
    case moves.scissors:
      move = moves.rock;
      break;
  }
  return move;
};

// X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win. Good luck!
const resolvePlayerMove = (elfMove: number, playerMove: string) => {
  let move = 0;
  switch (playerMove) {
    case 'X':
      move = losingValue(elfMove);
      break;
    case 'Y':
      move = elfMove;
      break;
    case 'Z':
      move = winingValue(elfMove);
      break;
  }
  return move;
};

const getRoundPoints = (round: number, play: Array<string>): number => {
  const elfValue = entryPoints[play[0]];
  const playerValue = resolvePlayerMove(elfValue, play[1]);
  const elfMove = moves[elfValue];
  const playerMove = moves[playerValue];
  console.log(
    `Round ${round} elf played ${elfMove} and player played ${playerMove}`
  );
  const winner = getWinner(elfValue, playerValue);
  const points = playerValue + winner.points;

  console.log(
    `Player ${winner.result} and got ${points} point${points === 1 ? '' : 's'}`
  );
  return points;
};

const data = getData();
const roundPoints = data.map((play, index) => getRoundPoints(index + 1, play));
const totalPoints = roundPoints.reduce(
  (previous, current) => previous + current
);

console.log();
console.log(`Player total points are: ${totalPoints}`);
