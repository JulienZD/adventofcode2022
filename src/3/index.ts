import { Solver } from '../aoc.d.ts';

const getItemInBoth = (one: string, two: string): string => {
  for (let i = 0; i < one.length; i++) {
    if (two.includes(one[i])) return one[i];
  }

  throw new Error('Not possible');
};

const longestString = (...strings: string[]): string => {
  return strings.reduce((longest, current) => (current.length > longest.length ? current : longest), strings[0]);
};

const getCommonItem = (...sacks: string[]): string => {
  const sackToCheckWith = longestString(...sacks);

  const otherSacks = sacks.filter((sack) => sack !== sackToCheckWith);

  for (let i = 0; i < sackToCheckWith.length; i++) {
    const item = sackToCheckWith[i];
    if (otherSacks.every((sack) => sack.includes(item))) return item;
  }

  throw new Error(`Not possible ${sackToCheckWith}, ${otherSacks.join(', ')}`);
};

const getPriority = (letter: string): number => {
  const charCode = letter.charCodeAt(0);

  const lowercaseIndex = charCode - 97 + 1;

  // Lowercase letter
  if (lowercaseIndex > 0) {
    return lowercaseIndex;
  }

  // Must be uppercase
  return charCode - 65 + 27;
};

const getGroupedSacks = (rucksacks: string[], groupSize: number): string[][] => {
  const grouped: string[][] = [];
  let currGroup: string[] = [];

  for (let i = 0; i < rucksacks.length; i++) {
    if (i > 0 && i % groupSize === 0) {
      grouped.push(currGroup);
      currGroup = [];
    }

    currGroup.push(rucksacks[i]);
  }

  // Add the final group
  if (currGroup.length) {
    grouped.push(currGroup);
  }

  return grouped;
};

export const partOne: Solver = (input: string) => {
  const rucksacks = input.split('\n');

  return rucksacks.reduce((total, sack) => {
    const [first, second] = [sack.slice(0, sack.length / 2), sack.slice(sack.length / 2)];

    const itemType = getItemInBoth(first, second);
    return total + getPriority(itemType);
  }, 0);
};

export const partTwo: Solver = (input: string) => {
  const groupedSacks = getGroupedSacks(input.split('\n'), 3);

  return groupedSacks.reduce((total, sacks) => {
    const itemType = getCommonItem(...sacks);
    return total + getPriority(itemType);
  }, 0);
};
