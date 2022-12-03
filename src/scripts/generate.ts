import { path } from '../lib/readFile.ts';
import { config } from 'https://deno.land/std@0.167.0/dotenv/mod.ts';

const template = `
import type { Solver } from '../aoc.d.ts';

export const partOne: Solver = (input: string) => {
  return null;
};

export const partTwo: Solver = (input: string) => {
  return null;
};
`;

const [workingDirectory, dayString] = Deno.args;
const day = Number(dayString);

if (isNaN(day) || day < 1 || day > 25) {
  throw new Error('Day must be a number');
}

const directoryInfo = await Deno.stat(path.join(workingDirectory, 'src', day.toString())).catch(() => null);

if (directoryInfo?.isDirectory) {
  throw new Error(`Day ${day} already exists`);
}

const dayDirectory = path.join(workingDirectory, 'src', day.toString());

await Deno.mkdir(dayDirectory);
await Deno.writeTextFile(path.join(dayDirectory, 'index.ts'), template);
await Deno.create(path.join(dayDirectory, 'input.txt'));
await Deno.create(path.join(dayDirectory, 'example.txt'));

console.log('Created template at', dayDirectory);

const configData = await config();
const sessionToken = configData.SESSION_TOKEN;
const email = configData.EMAIL_ADDRESS;
const repoUrl = configData.REPOSITORY_URL;

if (!sessionToken) {
  console.log('No session token set, skipping input download');
  Deno.exit(0);
}

if (!email || !repoUrl) {
  console.log('No email or repository set, these are required when making requests. Skipping input download');
  Deno.exit(0);
}

const response = await fetch(`https://adventofcode.com/2022/day/${day}/input`, {
  headers: {
    'User-Agent': `${repoUrl} by ${email}`, // Required as of 2022 https://reddit.com/r/adventofcode/z9dhtd
    cookie: `session=${sessionToken}`,
  },
});

if (response.status !== 200) {
  console.log('Failed to download input', response.status, response.statusText);
  Deno.exit(0);
}

const input = await response.text();

await Deno.writeTextFile(path.join(dayDirectory, 'input.txt'), input.trim());

console.log('Wrote input to', path.join(dayDirectory, 'input.txt'));
