import { Solver } from './aoc.d.ts';
import { mainModuleDir, path, readFile } from './lib/readFile.ts';

const day = Number(Deno.args[0]) || 1;

if (day < 1 || day > 25) {
  console.error('Day must be between 1 and 25');
  Deno.exit(1);
}

const solutionDir = `./${day}`;

const input = await readFile(path.join(solutionDir, 'input.txt'));

const { partOne, partTwo }: { partOne: Solver; partTwo: Solver } = await import(
  path.join(mainModuleDir, solutionDir, 'index.ts')
);

const benchmark = (fn: () => unknown, solutionNo: number) => {
  const benchmarksInMs: number[] = [];
  for (let i = 0; i < 200; i++) {
    const start = Date.now();
    fn();
    const end = Date.now();
    benchmarksInMs.push(end - start);
  }
  const averageTimeMs = benchmarksInMs.reduce((total, current) => total + current, 0) / benchmarksInMs.length;

  console.log(`Solution ${solutionNo}:`, `took an average of ${averageTimeMs}ms`);
};

benchmark(() => partOne(input), 1);
benchmark(() => partTwo(input), 2);
