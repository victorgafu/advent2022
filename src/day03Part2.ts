import * as fs from 'fs';

const getData = (): Array<Array<string>> => {
  const input = fs
    .readFileSync('../resources/inputDay03.txt')
    .toString()
    .trim()
    .split('\n');

  const chunkSize = 3;
  const data = [];
  for (let i = 0; i < input.length; i += chunkSize) {
    const chunk = input.slice(i, i + chunkSize);
    data.push(chunk);
  }
  return data;
};

const findDuplicatedItem = (
  sackOne: string,
  sackTwo: string,
  sackThree: string
) => {
  const duplicatedValues = [...sackOne].filter(item => sackTwo.includes(item));
  return duplicatedValues.find(item => sackThree.includes(item)) ?? '';
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
      const duplicatedItem = findDuplicatedItem(sack[0], sack[1], sack[2]);
      return obtainItemValue(duplicatedItem);
    })
    .reduce((previous, current) => previous + current);
};

console.log(`The total value is: ${getResult()}`);
