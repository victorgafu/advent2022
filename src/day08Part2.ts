import fs from 'fs';

const getData = (): Array<Array<number>> => {
  const input: Array<string> = fs
    .readFileSync('../resources/inputDay08.txt')
    .toString()
    .trim()
    .split('\n');

  return input.map(row => {
    return [...row].map(value => Number(value));
  });
};

const treesLeft = ({
  map,
  x,
  y,
}: {
  map: number[][];
  x: number;
  y: number;
}): number => {
  let count = 0;
  const currentTree = map[y][x];
  for (let i = x - 1; i >= 0; i--) {
    const previousTree = map[y][i];
    count++;
    if (previousTree >= currentTree) {
      break;
    }
  }
  return count;
};

const treesRight = ({
  map,
  x,
  y,
}: {
  map: number[][];
  x: number;
  y: number;
}): number => {
  let count = 0;
  const currentTree = map[y][x];
  for (let i = x + 1; i < map[0].length; i++) {
    const nextTree = map[y][i];
    count++;
    if (nextTree >= currentTree) {
      break;
    }
  }
  return count;
};

const treesTop = ({
  map,
  x,
  y,
}: {
  map: number[][];
  x: number;
  y: number;
}): number => {
  let count = 0;
  const currentTree = map[y][x];
  for (let i = y - 1; i >= 0; i--) {
    const topTree = map[i][x];
    count++;
    if (topTree >= currentTree) {
      break;
    }
  }
  return count;
};

const treesBottom = ({
  map,
  x,
  y,
}: {
  map: number[][];
  x: number;
  y: number;
}): number => {
  let count = 0;
  const currentTree = map[y][x];
  for (let i = y + 1; i < map.length; i++) {
    const bottomTree = map[i][x];
    count++;
    if (bottomTree >= currentTree) {
      break;
    }
  }
  return count;
};

const findHighestScore = (map: number[][]): number => {
  let highestScore = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const treesL = treesLeft({map, x, y});
      const treesR = treesRight({map, x, y});
      const treesT = treesTop({map, x, y});
      const treesB = treesBottom({map, x, y});

      const currentScore = treesL * treesR * treesT * treesB;
      if (currentScore > highestScore) {
        highestScore = currentScore;
      }
    }
  }
  return highestScore;
};

const countVisibleTrees = (map: number[][]): number => {
  const highestScore = findHighestScore(map);
  console.log(`Highest score is: ${highestScore}`);
  return highestScore;
};

countVisibleTrees(getData());
