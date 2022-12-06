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
  let position = 0;
  for (let i = 0; i < input.length; i++) {
    const section = new Set(input.slice(i, i + 14));

    if (section.size === 14) {
      position = i + 14;
      break;
    }
  }

  return position;
};
