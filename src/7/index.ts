import type { Solver } from '../aoc.d.ts';

const MIN_AVAILABLE_SPACE = 30_000_000;
const MAX_AVAILABLE_SPACE = 70_000_000;

interface Directory {
  name: string;
  files: number[];
  directories: Directory[];
  parent?: Directory;
}

type DirectoryWithSize = Directory & { size: number; directories: DirectoryWithSize[] };

const determineLargestSizes = (terminalOutput: string[]) => {
  const root: Directory = {
    name: '/',
    files: [],
    directories: [],
  };

  let currentDirectory: Directory = root;

  for (const line of terminalOutput) {
    if (line === '$ ls' || line.startsWith('dir')) {
      continue;
    }

    if (line.startsWith('$ cd')) {
      const dirName = line.split('$ cd ')[1];

      if (dirName === '..') {
        currentDirectory = currentDirectory.parent!;
        continue;
      }

      if (dirName === '/' && currentDirectory.name === '/') {
        continue;
      }

      const newDir = {
        name: dirName,
        parent: currentDirectory,
        files: [],
        directories: [],
      };

      currentDirectory.directories.push(newDir);
      currentDirectory = newDir;
      continue;
    }

    // It's a file listing
    const [size] = line.split(' ');

    currentDirectory.files.push(+size);
  }

  let totalSize = 0;

  const calculateDirectorySize = (directory: Directory): DirectoryWithSize => {
    const dirSize = determineDirSize(directory);
    if (dirSize < 100_000) {
      totalSize += dirSize;
    }

    return {
      ...directory,
      size: dirSize,
      directories: directory.directories.map(calculateDirectorySize),
    };
  };

  const withSizes = calculateDirectorySize(root);

  const availableSpace = MAX_AVAILABLE_SPACE - withSizes.size;
  const spaceToDelete = MIN_AVAILABLE_SPACE - availableSpace;

  const result = findSmallestDirectory(withSizes, spaceToDelete);

  return result.size;
};

const findSmallestDirectory = (directory: DirectoryWithSize, minSize: number): DirectoryWithSize => {
  const isElegible = directory.size >= minSize;

  if (!isElegible) {
    return directory;
  }

  const eligibleSubdirectories: DirectoryWithSize[] = [];
  for (const subDir of directory.directories) {
    const smallestEligible = findSmallestDirectory(subDir, minSize);
    eligibleSubdirectories.push(smallestEligible);
  }

  const sortedDirectories = [directory, ...eligibleSubdirectories]
    .toSorted((a, b) => a.size - b.size)
    .filter(({ size }) => size >= minSize);

  return sortedDirectories[0];
};

const determineDirSize = (directory: Directory, total = 0): number => {
  const totalFilesSize = directory.files.reduce((fileTotal, fileSize) => fileTotal + fileSize, 0);
  const totalSizeOfSubDirectories = directory.directories.reduce(
    (dirTotal, dir) => dirTotal + determineDirSize(dir),
    0
  );

  return total + totalFilesSize + totalSizeOfSubDirectories;
};

export const partOne: Solver = (input: string) => {
  const terminalOutput = input.split('\n');
  return determineLargestSizes(terminalOutput);
};

export const partTwo: Solver = (input: string) => {
  return null;
};
