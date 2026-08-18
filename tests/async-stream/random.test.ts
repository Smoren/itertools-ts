import { percentageAsync } from '../../src/random';
import { InvalidArgumentError, LengthError} from '../../src/exceptions';
import { AsyncStream } from '../../src/async-stream';
import { describe, expect, it } from '@jest/globals';


const ROCK_PAPER_SCISSORS_VALUES = ['rock', 'paper', 'scissors'];

describe.each([
  ...dataProviderForFiniteAsync(),
])(
  'Async Stream Integration - percentageAsync() finite',
  (count) => {
    it('', async () => {
      const values: number[] = [];
      for await (const num of percentageAsync(count)) {
        values.push(num);
      }
      expect(values.length).toBe(count);
      values.forEach((num) => {
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThan(1);
      });
    });
  }
);

describe.each([
  ...dataProviderForNegativeAsync(),
])(
  'Async Stream Integration - percentageAsync() negative',
  (negativeCount) => {
    it('', async () => {
      const gen = percentageAsync(negativeCount);
      await expect((async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for await (const _ of gen) {
          // noop
        }
      })()).rejects.toThrow(InvalidArgumentError);
    });
  }
);

describe.each([
  ...dataProviderForAggregationsAsync(),
])(
  'Async Stream Integration - percentageAsync() aggregations',
  (count) => {
    it('', async () => {
      let sum = 0;
      let generated = 0;
      for await (const num of percentageAsync(count)) {
        sum += num;
        generated++;
      }
      expect(generated).toBe(count);
      expect(sum).toBeGreaterThanOrEqual(0);
      expect(sum).toBeLessThan(count);
    });
  }
);

describe.each([
  ...dataProviderForTransformationsAsync(),
])(
  'Async Stream Integration - percentageAsync() transformations',
  (count) => {
    it('', async () => {
      const values: number[] = [];
      for await (const num of percentageAsync(count)) {
        values.push(num * 100);
      }
      expect(values.length).toBe(count);
      values.forEach((num) => {
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThan(100);
      });
    });
  }
);

describe.each([
  ...dataProviderForStreamWrapperAsync(),
])(
  'AsyncStream.ofPercentage()',
  (count) => {
    it('', async () => {
      const values: number[] = [];
      for await (const num of AsyncStream.ofPercentage(count)) {
        values.push(num);
      }
      expect(values.length).toBe(count);
      values.forEach((num) => {
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThan(1);
      });
    });
  }
);

describe.each([
  ...dataProviderForStreamWrapperAsync(),
])(
  'AsyncStream.ofRockPaperScissors()',
  (count) => {
    it('', async () => {
      const values = await AsyncStream.ofRockPaperScissors(count).toArray();
      expect(values.length).toBe(count);
      values.forEach((value) => {
        expect(ROCK_PAPER_SCISSORS_VALUES).toContain(value);
      });
    });
  }
);

describe.each([
  ...dataProviderForFiniteAsync(),
])('AsyncStream.choice() finite', (count) => {
  it(`generates exactly ${count} values`, async () => {
    const values: number[] = [];
    for await (const val of AsyncStream.of([1, 2, 3]).choice(count)) {
      values.push(val);
    }
    expect(values.length).toBe(count);
    values.forEach((val) => {
      expect([1, 2, 3]).toContain(val);
    });
  });
});

describe.each([
  ...dataProviderForNegativeAsync(),
])('AsyncStream.choice() negative', (negativeCount) => {
  it(`throws InvalidArgumentError for ${negativeCount}`, async () => {
    const gen = AsyncStream.of([1, 2, 3]).choice(negativeCount);
    await expect((async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for await (const _ of gen) {
          // noop
        }
    })()).rejects.toThrow(InvalidArgumentError);
  });
});

describe('AsyncStream.choice() empty', () => {
  it('throws LengthError when stream is empty', async () => {
    const gen = AsyncStream.of([]).choice(5);
    await expect((async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for await (const _ of gen) {
          // noop
        }
    })()).rejects.toThrow(LengthError);
  });
});

describe.each([
  ...dataProviderForNegativeAsync(),
])(
  'AsyncStream.ofRockPaperScissors() negative',
  (negativeCount) => {
    it('', async () => {
      await expect(AsyncStream.ofRockPaperScissors(negativeCount).toArray()).rejects.toThrow(InvalidArgumentError);
    });
  }
);

function dataProviderForFiniteAsync(): Array<[number]> {
  return [
    [1],
    [5],
    [10],
  ];
}

function dataProviderForNegativeAsync(): Array<[number]> {
  return [
    [-1],
    [-5],
  ];
}

function dataProviderForAggregationsAsync(): Array<[number]> {
  return [
    [5],
    [10],
  ];
}

function dataProviderForTransformationsAsync(): Array<[number]> {
  return [
    [5],
    [10],
  ];
}

function dataProviderForStreamWrapperAsync(): Array<[number]> {
  return [
    [1],
    [10],
  ];
}
