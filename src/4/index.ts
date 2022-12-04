import type { Solver } from '../aoc.d.ts';

const isFullyContained = (rangeOne: [number, number], rangeTwo: [number, number]) => {
  const [minOne, maxOne] = rangeOne;
  const [minTwo, maxTwo] = rangeTwo;

  return minOne >= minTwo && maxOne <= maxTwo;
};

// Used in part 2
const hasSingleOverlap = (rangeOne: [number, number], rangeTwo: [number, number]) => {
  const [minOne, maxOne] = rangeOne;
  const [minTwo, maxTwo] = rangeTwo;

  return (minOne >= minTwo && minOne <= maxTwo) || (maxOne >= minTwo && maxOne <= maxTwo);
};

const overlappingAssignments = (
  assignments: string[],
  comparator: (rangeOne: [number, number], rangeTwo: [number, number]) => boolean
) => {
  const overlappingAssignments = assignments
    .map((a) => a.split(',').map((pair) => pair.split('-').map(Number) as [number, number]))
    .filter(([rangeOne, rangeTwo]) => comparator(rangeOne, rangeTwo) || comparator(rangeTwo, rangeOne));

  return overlappingAssignments.length;
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
