import type { Solver } from '../aoc.d.ts';

const executeInstructionsPartOne = (instructions: string[]) => {
  let register = 1;
  let cycles = 0;
  let totalSignalStrength = 0;

  const tick = () => {
    cycles++;
    const shouldIncrement = cycles === 20 || cycles % 40 === 20;

    if (shouldIncrement) {
      totalSignalStrength += register * cycles;
    }
  };

  instructions.forEach((instruction) => {
    if (instruction === 'noop') {
      tick();
      return;
    }

    const [, value] = instruction.split(' ');
    if (instruction.startsWith('addx')) {
      tick();
      tick();

      register += +value;
    }
  });

  return totalSignalStrength;
};

export const partOne: Solver = (input: string) => {
  return executeInstructionsPartOne(input.split('\n'));
};

export const partTwo: Solver = (input: string) => {
  return null;
};
