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

const countExternalVisibleTrees = (map: number[][]): number => {
  const xLength = map[0].length;
  const yLength = map.length;
  const visibleTrees = xLength * 2 + (yLength - 2) * 2;
  return visibleTrees;
};

const isVisibleLeft = ({
  map,
  x,
  y,
}: {
  map: number[][];
  x: number;
  y: number;
}): boolean => {
  const currentTree = map[y][x];
  for (let i = x - 1; i >= 0; i--) {
    const previousTree = map[y][i];
    if (previousTree >= currentTree) {
      return false;
    }
  }
  return true;
};

const isVisibleRight = ({
  map,
  x,
  y,
}: {
  map: number[][];
  x: number;
  y: number;
}): boolean => {
  const currentTree = map[y][x];
  for (let i = x + 1; i < map[0].length; i++) {
    const nextTree = map[y][i];
    if (nextTree >= currentTree) {
      return false;
    }
  }
  return true;
};

const isVisibleTop = ({
  map,
  x,
  y,
}: {
  map: number[][];
  x: number;
  y: number;
}): boolean => {
  const currentTree = map[y][x];
  for (let i = y - 1; i >= 0; i--) {
    const topTree = map[i][x];
    if (topTree >= currentTree) {
      return false;
    }
  }
  return true;
};

const isVisibleBottom = ({
  map,
  x,
  y,
}: {
  map: number[][];
  x: number;
  y: number;
}): boolean => {
  const currentTree = map[y][x];
  for (let i = y + 1; i < map.length; i++) {
    const bottomTree = map[i][x];
    if (bottomTree >= currentTree) {
      return false;
    }
  }
  return true;
};

const countInternalVisibleTrees = (map: number[][]): number => {
  let visibleTrees = 0;
  for (let y = 1; y < map.length - 1; y++) {
    for (let x = 1; x < map[y].length - 1; x++) {
      if (
        isVisibleLeft({map, x, y}) ||
        isVisibleRight({map, x, y}) ||
        isVisibleTop({map, x, y}) ||
        isVisibleBottom({map, x, y})
      ) {
        visibleTrees++;
      }
    }
  }
  return visibleTrees;
};

const countVisibleTrees = (map: number[][]): number => {
  const internalTrees = countInternalVisibleTrees(map);
  const externalTrees = countExternalVisibleTrees(map);
  console.log(`External visible trees: ${externalTrees}`);
  console.log(`Internal visible trees: ${internalTrees}`);
  return externalTrees + internalTrees;
};

console.log(`Total visible trees: ${countVisibleTrees(getData())}`);
