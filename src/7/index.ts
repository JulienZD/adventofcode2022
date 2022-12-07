import type { Solver } from '../aoc.d.ts';

interface Directory {
  name: string;
  files: number[];
  directories: Directory[];
  parent?: Directory;
}

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

  const determineDirSize = (directory: Directory, total = 0): number => {
    const totalFilesSize = directory.files.reduce((fileTotal, fileSize) => fileTotal + fileSize, 0);
    const totalSizeOfSubDirectories = directory.directories.reduce(
      (dirTotal, dir) => dirTotal + determineDirSize(dir),
      0
    );

    return total + totalFilesSize + totalSizeOfSubDirectories;
  };

  let totalSize = 0;

  const calculateDirectorySize = (directory: Directory): void => {
    const dirSize = determineDirSize(directory);
    if (dirSize < 100_000) {
      totalSize += dirSize;
    }

    directory.directories.forEach(calculateDirectorySize);
  };

  calculateDirectorySize(root);

  return totalSize;
};

export const partOne: Solver = (input: string) => {
  const terminalOutput = input.split('\n');
  return determineLargestSizes(terminalOutput);
};

export const partTwo: Solver = (input: string) => {
  return null;
};
