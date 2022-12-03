import type { Solver } from '../aoc.d.ts';

const getElves = (items: string[]) => {
  const elves = [];

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

  return elves;
};

const partOne: Solver = (input: string) => {
  const elves = getElves(input.split('\n'));

  const highestCalories = elves.reduce(
    (accum, current) => (current > accum ? current : accum),
    Number.MIN_SAFE_INTEGER
  );

  return { highestCalories };
};

const partTwo: Solver = (input: string) => {
  const elves = getElves(input.split('\n'));

  const topThree = elves.toSorted((a, b) => b - a).slice(0, 3);
  const topThreeCaloryTotal = topThree.reduce((total, current) => total + current, 0);

  return { topThree, topThreeCaloryTotal };
};

export { partOne, partTwo };
