import { percentage, percentageAsync } from '../../src/random';
import { InvalidArgumentError } from '../../src/exceptions';

describe.each([
  ...dataProviderForFiniteSync(),
])(
  'Random Percentage Finite (sync)',
  (count) => {
    it('', () => {
      const values = Array.from(percentage(count));
      expect(values.length).toBe(count);
      values.forEach((num) => {
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThan(1);
      });
    });
  }
);

describe.each([
  ...dataProviderForInfiniteSync(),
])(
  'Random Percentage Infinite (sync)',
  (takeCount) => {
    it('', () => {
      const gen = percentage();
      const values: number[] = [];
      for (let i = 0; i < takeCount; i++) {
        const { value, done } = gen.next();
        if (done) break;
        values.push(value);
      }
      expect(values.length).toBe(takeCount);
      values.forEach((num) => {
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThan(1);
      });
    });
  }
);

describe.each([
  ...dataProviderForNegativeSync(),
])(
  'Random Percentage Negative (sync)',
  (negativeCount) => {
    it('', () => {
      expect(() => Array.from(percentage(negativeCount))).toThrow(InvalidArgumentError);
    });
  }
);

describe.each([
  ...dataProviderForFiniteAsync(),
])(
  'Random Percentage Finite (async)',
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
  ...dataProviderForInfiniteAsync(),
])(
  'Random Percentage Infinite (async)',
  (takeCount) => {
    it('', async () => {
      const values: number[] = [];
      for await (const num of percentageAsync()) {
        values.push(num);
        if (values.length === takeCount) break;
      }
      expect(values.length).toBe(takeCount);
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
  'Random Percentage Negative (async)',
  (negativeCount) => {
    it('', async () => {
      const gen = percentageAsync(negativeCount);
      await expect((async () => {
        for await (const _ of gen) {}
      })()).rejects.toThrow(InvalidArgumentError);
    });
  }
);

function dataProviderForFiniteSync(): Array<[number]> {
  return [
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
