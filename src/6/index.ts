import type { Solver } from '../aoc.d.ts';

export const partOne: Solver = (input: string) => {
  let position = 0;
  for (let i = 0; i < input.length; i++) {
    const section = new Set(input.slice(i, i + 4));

    if (section.size === 4) {
      position = i + 4;
      break;
    }
  }

  return position;
};

export const partTwo: Solver = (input: string) => {
  return null;
};
