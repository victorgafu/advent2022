import fs from 'fs';

interface Position {
  x: number;
  y: number;
}

interface Movement {
  direction: string;
  steps: number;
}

const getMovements = (): Array<Movement> => {
  const input: Array<string> = fs
    .readFileSync('../resources/inputDay09.txt')
    .toString()
    .trim()
    .split('\n');

  return input.map(row => {
    const items = row.split(' ');
    return {direction: items[0], steps: Number(items[1])};
  });
};

const moveHead = (head: Position, direction: string): Position => {
  const newHead: Position = {x: head.x, y: head.y};
  switch (direction) {
    case 'U':
      newHead.y += 1;
      break;
    case 'D':
      newHead.y -= 1;
      break;
    case 'L':
      newHead.x -= 1;
      break;
    case 'R':
      newHead.x += 1;
      break;
  }
  return newHead;
};

const moveSection = (previous: Position, current: Position): void => {
  if (
    Math.abs(previous.x - current.x) > 1 ||
    Math.abs(previous.y - current.y) > 1
  ) {
    if (previous.x !== current.x) {
      current.x += previous.x > current.x ? 1 : -1;
    }
    if (previous.y !== current.y) {
      current.y += previous.y > current.y ? 1 : -1;
    }
  }
};

const printCoordinates = (coordinates: Array<Position>) => {
  let maxX: number | undefined = undefined;
  let maxY: number | undefined = undefined;
  let minX: number | undefined = undefined;
  let minY: number | undefined = undefined;
  coordinates.forEach(coordinate => {
    if (!maxX || coordinate.x > maxX) {
      maxX = coordinate.x;
    }
    if (!maxY || coordinate.y > maxY) {
      maxY = coordinate.y;
    }
    if (!minX || coordinate.x < minX) {
      minX = coordinate.x;
    }
    if (!minY || coordinate.y < minY) {
      minY = coordinate.y;
    }
  });

  if (
    maxX !== undefined &&
    maxY !== undefined &&
    minX !== undefined &&
    minY !== undefined
  ) {
    for (let y = maxY + 1; y >= -maxY; y--) {
      let line = '';
      for (let x = minX; x <= maxX; x++) {
        if (x === 0 && y === 0) {
          line += 's';
        } else if (
          coordinates.some(
            coordinate => coordinate.x === x && coordinate.y === y
          )
        ) {
          line += '#';
        } else {
          line += '.';
        }
      }
      console.log(line);
    }
  }
};

const crossBridge = (): void => {
  const movements = getMovements();
  const knots: Array<Position> = Array(10);
  const head = 0;
  const tail = knots.length - 1;
  for (let i = 0; i < knots.length; i++) {
    knots[i] = {x: 0, y: 0};
  }

  const visitedPositions: Array<Position> = [];
  visitedPositions.push({x: 0, y: 0});

  for (const movement of movements) {
    for (let i = 0; i < movement.steps; i++) {
      knots[head] = moveHead(knots[head], movement.direction);

      for (let j = 1; j < knots.length; j++) {
        moveSection(knots[j - 1], knots[j]);
        // Keep track of the positions that the tail visits
        if (j === tail) {
          const tailCoordinates = knots[tail];
          const coordinatesExist = visitedPositions.find(
            coordinate =>
              coordinate.x === tailCoordinates.x &&
              coordinate.y === tailCoordinates.y
          );
          if (!coordinatesExist) {
            visitedPositions.push({x: knots[tail].x, y: knots[tail].y});
          }
        }
      }
    }
  }

  printCoordinates(visitedPositions);
  console.log(`The total unique positions are: ${visitedPositions.length}`);
};

crossBridge();
