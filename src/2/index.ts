const SCORES = {
  WIN: 6,
  DRAW: 3,
  LOSS: 0,

  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
} as const;

const PLAYER_ONE = {
  A: 'ROCK',
  B: 'PAPER',
  C: 'SCISSORS',
} as const;

const PLAYER_TWO = {
  X: 'ROCK',
  Y: 'PAPER',
  Z: 'SCISSORS',
} as const;

const OPTIONS = {
  A: 'X',
  B: 'Y',
  C: 'Z',
};

type P1 = keyof typeof PLAYER_ONE;
type P2 = keyof typeof PLAYER_TWO;

// Required for part 2
const RESULTS_MAP = {
  ROCK: {
    LOSS: 'SCISSORS',
    WIN: 'PAPER',
  },
  SCISSORS: {
    LOSS: 'PAPER',
    WIN: 'ROCK',
  },
  PAPER: {
    LOSS: 'ROCK',
    WIN: 'SCISSORS',
  },
} as const;

const DECISION_MAP = {
  X: 'LOSS',
  Y: 'DRAW',
  Z: 'WIN',
} as const;

const playMatch1 = (p1: P1, p2: P2) => {
  if (OPTIONS[p1] === p2) return SCORES.DRAW + SCORES[PLAYER_TWO[p2]];

  if (PLAYER_ONE[p1] === 'PAPER' && PLAYER_TWO[p2] === 'SCISSORS') {
    return SCORES.WIN + SCORES.SCISSORS;
  } else if (PLAYER_ONE[p1] === 'ROCK' && PLAYER_TWO[p2] === 'PAPER') {
    return SCORES.WIN + SCORES.PAPER;
  } else if (PLAYER_ONE[p1] === 'SCISSORS' && PLAYER_TWO[p2] === 'ROCK') {
    return SCORES.WIN + SCORES.ROCK;
  }

  return SCORES.LOSS + SCORES[PLAYER_TWO[p2]];
};

const playMatch2 = (p1: P1, p2: P2) => {
  const playerOnesPick = PLAYER_ONE[p1];

  const whatToDo = DECISION_MAP[p2];

  const decisions = RESULTS_MAP[playerOnesPick];

  const playerTwosPick = whatToDo === 'DRAW' ? playerOnesPick : decisions[whatToDo];

  return SCORES[whatToDo] + SCORES[playerTwosPick];
};

const decoder = new TextDecoder('utf-8');
const input = decoder.decode(await Deno.readFile('./input.txt'));

const matches = input
  .split('\n')
  .filter((n) => n.length)
  .map((m) => m.split(' ')) as [P1, P2][];

const totalScore1 = matches.reduce((current, [p1, p2]) => current + playMatch1(p1, p2), 0);

const totalScore2 = matches.reduce((current, [p1, p2]) => current + playMatch2(p1, p2), 0);

console.log({ totalScore1, totalScore2 });
