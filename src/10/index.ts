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

const executeInstructionsPartTwo = (instructions: string[]) => {
  let register = 1;
  let cycles = 0;
  let position = 0;
  let output = '\n';

  const tick = () => {
    cycles++;

    const shouldDrawLitPixel = position === register || position + 1 === register || position - 1 === register;

    output += shouldDrawLitPixel ? '#' : '.';
    position++;

    const reachedEndOfScreen = cycles % 40 === 0;

    if (reachedEndOfScreen) {
      output += '\n';
      position = 0;
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

  return output;
};

export const partOne: Solver = (input: string) => {
  return executeInstructionsPartOne(input.split('\n'));
};

export const partTwo: Solver = (input: string) => {
  return executeInstructionsPartTwo(input.split('\n'));
};
