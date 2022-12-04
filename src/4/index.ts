import type { Solver } from '../aoc.d.ts';

const isFullyContained = (rangeOne: [number, number], rangeTwo: [number, number]) => {
  const [minOne, maxOne] = rangeOne;
  const [minTwo, maxTwo] = rangeTwo;

  return minOne >= minTwo && maxOne <= maxTwo;
};

const overlappingAssignments = (
  assignments: string[],
  comparator: (rangeOne: [number, number], rangeTwo: [number, number]) => boolean
) => {
  let overlaps = 0;

  const pairs = assignments.map((a) => a.split(',').map((pair) => pair.split('-').map(Number) as [number, number]));

  for (const [rangeOne, rangeTwo] of pairs) {
    if (comparator(rangeOne, rangeTwo) || comparator(rangeTwo, rangeOne)) {
      overlaps++;
    }
  }

  return overlaps;
};

const hasSingleOverlap = (rangeOne: [number, number], rangeTwo: [number, number]) => {
  const [minOne, maxOne] = rangeOne;
  const [minTwo, maxTwo] = rangeTwo;

  return (minOne >= minTwo && minOne <= maxTwo) || (maxOne >= minTwo && maxOne <= maxTwo);
};

export const partOne: Solver = (input: string) => {
  return overlappingAssignments(input.split('\n'), isFullyContained);
};

export const partTwo: Solver = (input: string) => {
  return overlappingAssignments(
    input.split('\n'),
    (rangeOne, rangeTwo) => isFullyContained(rangeOne, rangeTwo) || hasSingleOverlap(rangeOne, rangeTwo)
  );
};
