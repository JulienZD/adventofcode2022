import type { Solver } from '../aoc.d.ts';

const isFullyContained = (rangeOne: [number, number], rangeTwo: [number, number]) => {
  const [minOne, maxOne] = rangeOne;
  const [minTwo, maxTwo] = rangeTwo;

  return minOne >= minTwo && maxOne <= maxTwo;
};

const overlappingAssignments = (assignments: string[]) => {
  let overlaps = 0;

  const pairs = assignments.map((a) => a.split(',').map((pair) => pair.split('-').map(Number) as [number, number]));

  for (const [rangeOne, rangeTwo] of pairs) {
    if (isFullyContained(rangeOne, rangeTwo) || isFullyContained(rangeTwo, rangeOne)) {
      overlaps++;
    }
  }

  return overlaps;
};

export const partOne: Solver = (input: string) => {
  return overlappingAssignments(input.split('\n'));
};

export const partTwo: Solver = (input: string) => {
  return null;
};
