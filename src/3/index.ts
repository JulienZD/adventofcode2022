import { readFile } from '../lib/readFile.ts';

const input = await readFile('./input.txt');

const rucksacks = input.split('\n');

const getItemInBoth = (one: string, two: string): string => {
  for (let i = 0; i < one.length; i++) {
    if (two.includes(one[i])) return one[i];
  }

  throw new Error('Not possible');
};

const longestString = (...strings: string[]): string => {
  let longest = strings[0];
  for (const string of strings.slice(1)) {
    if (string.length > longest.length) {
      longest = string;
    }
  }
  return longest;
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

// console.log(getPriority('a'), getPriority('A'));
// console.log(getPriority('z'), getPriority('Z'));

const totalPriority = rucksacks.reduce((total, sack) => {
  const [first, second] = [sack.slice(0, sack.length / 2), sack.slice(sack.length / 2)];

  const itemType = getItemInBoth(first, second);
  return total + getPriority(itemType);
}, 0);

const getGroupedSacks = (groupSize: number): string[][] => {
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

const totalPriority2 = getGroupedSacks(3).reduce((total, sacks) => {
  const itemType = getCommonItem(...sacks);
  return total + getPriority(itemType);
}, 0);

console.log({ totalPriority, totalPriority2 });
