import { choice, choiceAsync } from '../../src/random';
import { InvalidArgumentError, LengthError } from '../../src/exceptions';

describe.each([
  ...dataProviderForFiniteSync(),
])(
  'Random Choice Finite (sync)',
  (count) => {
    it(`generates exactly ${count} values`, () => {
      const values = Array.from(choice([1, 2, 3], count));
      expect(values.length).toBe(count);
      values.forEach((val) => {
        expect([1, 2, 3]).toContain(val);
      });
    });
  }
);

describe.each([
  ...dataProviderForInfiniteSync(),
])(
  'Random Choice Infinite (sync)',
  (takeCount) => {
    it(`generates ${takeCount} values when manually limited`, () => {
      const gen = choice([1, 2, 3]);
      const values: number[] = [];
      for (let i = 0; i < takeCount; i++) {
        const { value, done } = gen[Symbol.iterator]().next();
        if (done) break;
        values.push(value);
      }
      expect(values.length).toBe(takeCount);
      values.forEach((val) => {
        expect([1, 2, 3]).toContain(val);
      });
    });
  }
);

describe.each([
  ...dataProviderForNegativeSync(),
])(
  'Random Choice Negative (sync)',
  (negativeCount) => {
    it(`throws InvalidArgumentError when repetitions = ${negativeCount}`, () => {
      expect(() => Array.from(choice([1, 2, 3], negativeCount))).toThrow(InvalidArgumentError);
    });
  }
);

describe('Random Choice Empty (sync)', () => {
  it('throws LengthError when input is empty', () => {
    expect(() => Array.from(choice([], 5))).toThrow(LengthError);
  });
});

describe.each([
  ...dataProviderForFiniteAsync(),
])(
  'Random Choice Finite (async)',
  (count) => {
    it(`generates exactly ${count} values`, async () => {
      const values: number[] = [];
      for await (const val of choiceAsync([1, 2, 3], count)) {
        values.push(val);
      }
      expect(values.length).toBe(count);
      values.forEach((val) => {
        expect([1, 2, 3]).toContain(val);
      });
    });
  }
);

describe.each([
  ...dataProviderForInfiniteAsync(),
])(
  'Random Choice Infinite (async)',
  (takeCount) => {
    it(`generates ${takeCount} values when manually limited`, async () => {
      const values: number[] = [];
      for await (const val of choiceAsync([1, 2, 3])) {
        values.push(val);
        if (values.length === takeCount) break;
      }
      expect(values.length).toBe(takeCount);
      values.forEach((val) => {
        expect([1, 2, 3]).toContain(val);
      });
    });
  }
);

describe.each([
  ...dataProviderForNegativeAsync(),
])(
  'Random Choice Negative (async)',
  (negativeCount) => {
    it(`throws InvalidArgumentError when repetitions = ${negativeCount}`, async () => {
      const gen = choiceAsync([1, 2, 3], negativeCount);
      await expect((async () => {
        for await (const _ of gen) {}
      })()).rejects.toThrow(InvalidArgumentError);
    });
  }
);

describe('Random Choice Empty (async)', () => {
  it('throws LengthError when input is empty', async () => {
    const gen = choiceAsync([], 5);
    await expect((async () => {
      for await (const _ of gen) {}
    })()).rejects.toThrow(LengthError);
  });
});

function dataProviderForFiniteSync(): Array<[number]> {
  return [[1], [5], [10]];
}

function dataProviderForInfiniteSync(): Array<[number]> {
  return [[5], [8]];
}

function dataProviderForNegativeSync(): Array<[number]> {
  return [[-1], [-5]];
}

function dataProviderForFiniteAsync(): Array<[number]> {
  return [[1], [5], [10]];
}

function dataProviderForInfiniteAsync(): Array<[number]> {
  return [[5], [8]];
}

function dataProviderForNegativeAsync(): Array<[number]> {
  return [[-1], [-5]];
}
