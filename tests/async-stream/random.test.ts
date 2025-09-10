import { percentageAsync } from '../../src/random';
import { InvalidArgumentError } from '../../src/exceptions';
import { AsyncStream } from '../../src/async-stream';


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
        for await (const _ of gen) {}
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
