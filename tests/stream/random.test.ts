import { percentage } from '../../src/random';
import { InvalidArgumentError } from '../../src/exceptions';
import { Stream } from '../../src/stream';

describe.each([
  ...dataProviderForFinite(),
])(
  'Stream Integration - percentage() finite',
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
  ...dataProviderForNegative(),
])(
  'Stream Integration - percentage() negative',
  (negativeCount) => {
    it('', () => {
      expect(() => Array.from(percentage(negativeCount))).toThrow(InvalidArgumentError);
    });
  }
);

describe.each([
  ...dataProviderForAggregations(),
])(
  'Stream Integration - percentage() aggregations',
  (count) => {
    it('', () => {
      const sum = Array.from(percentage(count)).reduce((acc, num) => acc + num, 0);
      expect(sum).toBeGreaterThanOrEqual(0);
      expect(sum).toBeLessThan(count);
    });
  }
);

describe.each([
  ...dataProviderForTransformations(),
])(
  'Stream Integration - percentage() transformations',
  (count) => {
    it('', () => {
      const transformed = Array.from(percentage(count)).map((num) => num * 100);
      expect(transformed.length).toBe(count);
      transformed.forEach((num) => {
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThan(100);
      });
    });
  }
);

describe.each([
  ...dataProviderForStreamWrapper(),
])(
  'Stream.ofPercentage()',
  (count) => {
    it('', () => {
      const values = Array.from(Stream.ofPercentage(count));
      expect(values.length).toBe(count);
      values.forEach((num) => {
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThan(1);
      });
    });
  }
);

function dataProviderForFinite(): Array<[number]> {
  return [
    [1],
    [5],
    [10],
  ];
}

function dataProviderForNegative(): Array<[number]> {
  return [
    [-1],
    [-5],
  ];
}

function dataProviderForAggregations(): Array<[number]> {
  return [
    [5],
    [10],
  ];
}

function dataProviderForTransformations(): Array<[number]> {
  return [
    [5],
    [10],
  ];
}

function dataProviderForStreamWrapper(): Array<[number]> {
  return [
    [1],
    [10],
  ];
}