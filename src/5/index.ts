import type { Solver } from '../aoc.d.ts';

const moveCrate = (from: string[], to: string[]) => {
  const crate = from.shift();
  if (crate) {
    to.unshift(crate);
  }
};

const moveCratesByInstructions = (
  stacks: string[][],
  instructions: string[]
) => {
  instructions.forEach((instruction) => {
    const [amountToMove, fromStack, toStack] = instruction
      .match(/\d+/g)
      ?.map(Number) as [number, number, number];

    for (let i = amountToMove - 1; i >= 0; i--) {
      moveCrate(stacks[fromStack - 1], stacks[toStack - 1]);
    }
  });

  return stacks.map((stack) => stack[0]).join('');
};

export const partOne: Solver = (input: string) => {
  const { crateConfiguration, instructions } = readInput(input);

  return moveCratesByInstructions(crateConfiguration, instructions);
};

export const partTwo: Solver = (input: string) => {
  return null;
};

function readInput(input: string) {
  const [rawCrateConfiguration, instructions] = input
    .split('\n\n')
    .map((s) => s.split('\n'));

  const stackCount = Number(
    rawCrateConfiguration.at(-1)!.replaceAll(' ', '').at(-1)
  );

  const stacks = new Array(stackCount)
    .fill(undefined)
    .map(() => [] as string[]);

  const lastIndex = rawCrateConfiguration.length - 1;

  rawCrateConfiguration.forEach((line, index) => {
    // Skip the line with stack numbers
    if (lastIndex === index) return;

    let stackNumber = 0;
    // Check sections of 4 characters
    for (let i = 0; i < line.length; i += 4, stackNumber++) {
      // Grab the letter from the 4 characters
      const char = line.slice(i, i + 3).match(/[A-Z]/);
      if (char) {
        stacks[stackNumber].push(char[0]);
      }
    }
  });

  return { crateConfiguration: stacks, instructions };
}
