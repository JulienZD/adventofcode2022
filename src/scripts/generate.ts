import { config } from 'https://deno.land/std@0.167.0/dotenv/mod.ts';
import { parseHtml } from '../lib/parseHtml.ts';
import { path } from '../lib/readFile.ts';

const template = `
import type { Solver } from '../aoc.d.ts';

export const partOne: Solver = (input: string) => {
  return null;
};

export const partTwo: Solver = (input: string) => {
  return null;
};
`.trimStart();

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
const urlForDay = `https://adventofcode.com/2022/day/${day}`;
const requestHeaders = {
  'User-Agent': `${repoUrl} by ${email}`, // Required as of 2022 https://reddit.com/r/adventofcode/z9dhtd
  cookie: `session=${sessionToken}`,
};

const inputResponse = await fetch(`${urlForDay}/input`, {
  headers: requestHeaders,
});

if (inputResponse.status !== 200) {
  console.log('Failed to download input', inputResponse.status, inputResponse.statusText);
  Deno.exit(0);
}

const input = await inputResponse.text();

const writeToFile = async (file: string, content: string) => {
  await Deno.writeTextFile(file, content.trimEnd());

  console.log('Wrote content to', file);
};

await writeToFile(path.join(dayDirectory, 'input.txt'), input);

const pageContent = await fetch(urlForDay, {
  headers: requestHeaders,
}).then((r) => r.text());

const parsedPage = parseHtml(pageContent);

// The example input is contained in the first <code> element on the page
const [exampleElement] = parsedPage?.querySelectorAll('code') ?? [];

await writeToFile(path.join(dayDirectory, 'example.txt'), exampleElement.textContent);
