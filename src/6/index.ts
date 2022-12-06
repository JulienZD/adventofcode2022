import type { Solver } from '../aoc.d.ts';

export const partOne: Solver = (input: string) => {
  return findMarker(input, 4);
};

export const partTwo: Solver = (input: string) => {
  return findMarker(input, 14);
};

const findMarker = (data: string, markerLength: number) => {
  for (let i = 0; i < data.length; i++) {
    const section = new Set(data.slice(i, i + markerLength));

    if (section.size === markerLength) {
      return i + markerLength;
    }
  }

  return -1;
};
