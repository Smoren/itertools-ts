import { rockPaperScissors, rockPaperScissorsAsync } from '../../src/random';
import { InvalidArgumentError } from '../../src/exceptions';

const ROCK_PAPER_SCISSORS_VALUES = ['rock', 'paper', 'scissors'];

afterEach(() => {
  jest.restoreAllMocks();
});

describe.each([
  ...dataProviderForFiniteSync(),
])(
  'Random Rock Paper Scissors Finite (sync)',
  (count) => {
    it('', () => {
      const values = Array.from(rockPaperScissors(count));
      expect(values.length).toBe(count);
      values.forEach((value) => {
        expect(ROCK_PAPER_SCISSORS_VALUES).toContain(value);
      });
    });
  }
);

describe.each([
  ...dataProviderForInfiniteSync(),
])(
  'Random Rock Paper Scissors Infinite (sync)',
  (takeCount) => {
    it('', () => {
      const gen = rockPaperScissors()[Symbol.iterator]();
      const values: Array<string> = [];
      for (let i = 0; i < takeCount; i++) {
        const { value, done } = gen.next();
        if (done) break;
        values.push(value);
      }
      expect(values.length).toBe(takeCount);
      values.forEach((value) => {
        expect(ROCK_PAPER_SCISSORS_VALUES).toContain(value);
      });
    });
  }
);

describe.each([
  ...dataProviderForNegativeSync(),
])(
  'Random Rock Paper Scissors Negative (sync)',
  (negativeCount) => {
    it('', () => {
      expect(() => Array.from(rockPaperScissors(negativeCount))).toThrow(InvalidArgumentError);
    });
  }
);

describe(
  'Random Rock Paper Scissors Deterministic (sync)',
  () => {
    it('', () => {
      jest.spyOn(Math, 'random')
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(0.34)
        .mockReturnValueOnce(0.99);

      expect(Array.from(rockPaperScissors(3))).toEqual(['rock', 'paper', 'scissors']);
    });
  }
);

describe.each([
  ...dataProviderForFiniteAsync(),
])(
  'Random Rock Paper Scissors Finite (async)',
  (count) => {
    it('', async () => {
      const values: Array<string> = [];
      for await (const value of rockPaperScissorsAsync(count)) {
        values.push(value);
      }
      expect(values.length).toBe(count);
      values.forEach((value) => {
        expect(ROCK_PAPER_SCISSORS_VALUES).toContain(value);
      });
    });
  }
);

describe.each([
  ...dataProviderForInfiniteAsync(),
])(
  'Random Rock Paper Scissors Infinite (async)',
  (takeCount) => {
    it('', async () => {
      const values: Array<string> = [];
      for await (const value of rockPaperScissorsAsync()) {
        values.push(value);
        if (values.length === takeCount) break;
      }
      expect(values.length).toBe(takeCount);
      values.forEach((value) => {
        expect(ROCK_PAPER_SCISSORS_VALUES).toContain(value);
      });
    });
  }
);

describe.each([
  ...dataProviderForNegativeAsync(),
])(
  'Random Rock Paper Scissors Negative (async)',
  (negativeCount) => {
    it('', async () => {
      const gen = rockPaperScissorsAsync(negativeCount);
      await expect((async () => {
        for await (const _ of gen) {}
      })()).rejects.toThrow(InvalidArgumentError);
    });
  }
);

function dataProviderForFiniteSync(): Array<[number]> {
  return [
    [0],
    [1],
    [5],
    [10],
  ];
}

function dataProviderForInfiniteSync(): Array<[number]> {
  return [
    [5],
    [8],
  ];
}

function dataProviderForNegativeSync(): Array<[number]> {
  return [
    [-1],
    [-5],
  ];
}

function dataProviderForFiniteAsync(): Array<[number]> {
  return [
    [0],
    [1],
    [5],
    [10],
  ];
}

function dataProviderForInfiniteAsync(): Array<[number]> {
  return [
    [5],
    [8],
  ];
}

function dataProviderForNegativeAsync(): Array<[number]> {
  return [
    [-1],
    [-5],
  ];
}
