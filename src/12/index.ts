import type { Solver } from '../aoc.d.ts';

export const partOne: Solver = (input: string) => {
  const grid = input.split('\n').map((line) => line.split(''));

  let position = (() => {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[x].length; x++) {
        if (grid[y][x] === 'S') {
          return [y, x] as const;
        }
      }
    }
    return [0, 0] as const;
  })();

  return traverse(grid, position);
};

type Direction = 'left' | 'right' | 'up' | 'down';

const opposites = {
  left: 'right',
  right: 'left',
  up: 'down',
  down: 'up',
} as const;

type DirectionMap = Record<Direction, { newPos: readonly [number, number]; value: number }>;

const DESTINATION = 'E'.codePointAt(0)!;

const traverse = (
  grid: string[][],
  position: readonly [number, number],
  prevDirection: Direction | undefined = undefined,
  steps = 0
): number => {
  const [y, x] = position;
  let current = grid[y]?.[x].codePointAt(0) ?? -1;
  if (current === -1) {
    return steps;
  }
  // 'S' is equal to 'a'
  current = current === 83 ? 97 : current;

  const adjecents = Object.fromEntries(
    Object.entries({
      up: [y - 1, x],
      down: [y + 1, x],
      left: [y, x - 1],
      right: [y, x + 1],
    } as const).map(([direction, [y, x]]) => [direction, { newPos: [y, x], value: grid[y]?.[x]?.codePointAt(0) ?? -1 }])
  ) as unknown as DirectionMap;

  const stepAttempts: number[] = [];
  // What even is this mess, typescript please why do you make me cast so much
  for (const [direction, { newPos, value }] of Object.entries(adjecents) as [
    Direction,
    { newPos: readonly [number, number]; value: number }
  ][]) {
    if (opposites[direction] === prevDirection) continue;
    if (value === DESTINATION) {
      console.log('FOUND IT in', steps + 1, 'steps');
      return steps + 1;
    }

    if (
      value === current + 1 ||
      value === current
      //  || value === current - 1
    ) {
      // console.log({
      //   current: { position, height: String.fromCodePoint(current), prevDirection },
      //   next: { newPos, height: String.fromCodePoint(value), direction },
      // });
      stepAttempts.push(traverse(grid, newPos, direction, steps++));
    }
  }

  return Math.min(...stepAttempts);
};

export const partTwo: Solver = (input: string) => {
  return null;
};
