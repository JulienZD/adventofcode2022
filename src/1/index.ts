import { readFile } from '../lib/readFile.ts';

const input = await readFile('./input.txt');

const elves = [];

const items = input.split('\n');

let elfsTotalCalories = 0;

for (let i = 0; i < items.length; i++) {
  const current = items[i];
  const next = items[i + 1];

  if (current === '' || next === undefined) {
    elves.push(elfsTotalCalories);
    elfsTotalCalories = 0;
  }

  elfsTotalCalories += +current;
}

const topThree = elves.toSorted((a, b) => b - a).slice(0, 3);

const highestCalories = elves.reduce((accum, current) => (current > accum ? current : accum), Number.MIN_SAFE_INTEGER);

console.log({ highestCalories, elves });

const topThreeCaloryTotal = topThree.reduce((total, current) => total + current, 0);

console.log({ topThree, topThreeCaloryTotal });
