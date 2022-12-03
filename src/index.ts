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

const runAndBenchmark = async (fn: () => ReturnType<Solver>, solutionNo: number) => {
  const start = Date.now();
  const result = await fn();
  const end = Date.now();
  console.log(`Solution ${solutionNo}:`, result, `took ${end - start}ms`);
};

await runAndBenchmark(() => partOne(input), 1);
await runAndBenchmark(() => partTwo(input), 2);
