import type { Solver } from '../aoc.d.ts';

interface Directory {
  name: string;
  files: number[];
  directories: Directory[];
  parent?: Directory;
}

const buildFileTreeFromTerminalOutput = (terminalOutput: string[]) => {
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

  return root;
};

const calculateTotalSizeUnderLimit = (root: Directory, maxDirectorySize: number) => {
  let totalSize = 0;

  const calculateDirectorySize = (directory: Directory): void => {
    const dirSize = determineDirSize(directory);
    if (dirSize < maxDirectorySize) {
      totalSize += dirSize;
    }

    directory.directories.forEach(calculateDirectorySize);
  };

  calculateDirectorySize(root);

  return totalSize;
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
  const fileTree = buildFileTreeFromTerminalOutput(input.split('\n'));

  return calculateTotalSizeUnderLimit(fileTree, 100_000);
};

export const partTwo: Solver = (input: string) => {
  const fileTree = buildFileTreeFromTerminalOutput(input.split('\n'));
  const MIN_AVAILABLE_SPACE = 30_000_000;
  const MAX_AVAILABLE_SPACE = 70_000_000;

  const treeWithSizes = calculateDirectorySize(fileTree);

  const spaceToDelete = MIN_AVAILABLE_SPACE - (MAX_AVAILABLE_SPACE - treeWithSizes.size);

  const largestDeletableDirectory = findLargestDeletableDirectory(treeWithSizes, spaceToDelete);

  return largestDeletableDirectory.size;
};

const calculateDirectorySize = (directory: Directory): DirectoryWithSize => {
  const dirSize = determineDirSize(directory);

  return {
    ...directory,
    size: dirSize,
    directories: directory.directories.map(calculateDirectorySize),
  };
};

type DirectoryWithSize = Directory & { size: number; directories: DirectoryWithSize[] };

const findLargestDeletableDirectory = (directory: DirectoryWithSize, minSize: number): DirectoryWithSize => {
  const isLargeEnough = directory.size >= minSize;

  if (!isLargeEnough) {
    return directory;
  }

  const eligibleSubdirectories: DirectoryWithSize[] = [];

  for (const subDir of directory.directories) {
    const largestEligibleDir = findLargestDeletableDirectory(subDir, minSize);
    eligibleSubdirectories.push(largestEligibleDir);
  }

  const sortedDirectories = [directory, ...eligibleSubdirectories]
    .toSorted((a, b) => a.size - b.size)
    .filter(({ size }) => size >= minSize);

  return sortedDirectories[0];
};
