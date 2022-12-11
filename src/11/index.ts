import type { Solver } from '../aoc.d.ts';

export const partOne: Solver = (input: string) => {
  const monkeys = parseMonkeys(input);

  for (let round = 0; round < 20; round++) {
    for (const monkey of monkeys) {
      // worryLevel is used in the eval
      // deno-lint-ignore no-unused-vars prefer-const
      for (let worryLevel of monkey.items) {
        monkey.inspections++;

        let newWorryLevel = eval(monkey.operation);
        newWorryLevel = Math.floor(newWorryLevel / 3);

        const { conditionDivisibleBy, throwToMonkeyIfFalse, throwToMonkeyIfTrue } = monkey.test;
        const monkeyToThrowTo = newWorryLevel % conditionDivisibleBy === 0 ? throwToMonkeyIfTrue : throwToMonkeyIfFalse;

        monkeys[monkeyToThrowTo].items.push(newWorryLevel);
      }

      monkey.items = [];
    }
  }

  return monkeys
    .map((m) => m.inspections)
    .toSorted((a, b) => b - a)
    .slice(0, 2)
    .reduce((acc, inspections) => acc * inspections, 1);
};

export const partTwo: Solver = (input: string) => {
  return null;
};

interface MonkeyInstruction {
  number: number;
  items: number[];
  operation: string;
  inspections: number;
  test: {
    conditionDivisibleBy: number;
    throwToMonkeyIfTrue: number;
    throwToMonkeyIfFalse: number;
  };
}

const parseMonkeys = (input: string): MonkeyInstruction[] => {
  return input.split('\n\n').map((instruction): MonkeyInstruction => {
    const lines = instruction.split('\n');
    if (lines.length !== 6) {
      throw new Error('Instruction must have 6 lines');
    }
    const [monkey, items, operation, test, ifTrue, ifFalse] = instruction.split('\n');
    return {
      number: +(monkey.match(/\d+/) ?? [1]),
      items: items.match(/\d+/g)?.map(Number) ?? [],
      operation: operation.split('new = ')[1].replaceAll('old', 'worryLevel'),
      inspections: 0,
      test: {
        conditionDivisibleBy: +(test.match(/\d+/) ?? [1]),
        throwToMonkeyIfTrue: +(ifTrue.match(/\d+/) ?? [1]),
        throwToMonkeyIfFalse: +(ifFalse.match(/\d+/) ?? [1]),
      },
    };
  });
};
