const decoder = new TextDecoder('utf-8');
const input = decoder.decode(await Deno.readFile('./input.txt'));

const rucksacks = input.split('\n');

const getItemInBoth = (one: string, two: string): string => {
  for (let i = 0; i < one.length; i++) {
    if (two.includes(one[i])) return one[i];
  }

  throw new Error('Not possible');
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
  const [first, second] = [
    sack.slice(0, sack.length / 2),
    sack.slice(sack.length / 2),
  ];

  const itemType = getItemInBoth(first, second);

  return total + getPriority(itemType);
}, 0);

console.log({ totalPriority });
