import * as fs from 'fs';

const getTotals = (): Array<number> => {
  const input = fs
    .readFileSync('../resources/inputDay01.txt')
    .toString()
    .split('\n\n');

  const totals = input.map((values: string) => {
    const amounts: number = values
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

const showTopThree = (values: Array<number>): void => {
  const topThree = values.sort().reverse().slice(0, 3);
  console.log('Showing the top three elves');
  topThree.forEach((value, index) =>
    console.log(`The elf top ${index + 1} carried ${value} calories`)
  );
  const total = topThree.reduce((previous, current) => previous + current);
  console.log(`That sums a total of ${total} calories`);
};

showTopThree(totals);
