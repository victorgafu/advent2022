import * as fs from 'fs';

const getData = (): Array<Array<string>> => {
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

const findDuplicatedItem = (itemsOne: string, itemsTwo: string): string => {
  return [...itemsOne].find(item => itemsTwo.includes(item)) ?? '';
};

const obtainItemValue = (item: string) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(
    ''
  );
  return alphabet.indexOf(item) + 1;
};

const getResult = () => {
  const sacks = getData();

  return sacks
    .map((sack: Array<string>) => {
      const duplicatedItem = findDuplicatedItem(sack[0], sack[1]);
      return obtainItemValue(duplicatedItem);
    })
    .reduce((previous, current) => previous + current);
};

console.log(`The total value is: ${getResult()}`);
