import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  roundEpsilon,
  // @ts-ignore
} from "../fixture";
import { Numeric, reduce } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
])(
  "Reduce To Range Test",
  (input, expected) => {
    it("", () => {
      // When
      const result = reduce.toRange(input as Iterable<Numeric> | Iterator<Numeric>);

      // Then
      expect(roundEpsilon(result)).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForAsyncGenerators(),
  ...dataProviderForAsyncIterables(),
  ...dataProviderForAsyncIterators(),
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
])(
  "Reduce To Range Async Test",
  (input, expected) => {
    it("", async () => {
      // When
      const result = await reduce.toRangeAsync(input as Iterable<Numeric> | Iterator<Numeric> | AsyncIterable<Numeric> | AsyncIterator<Numeric>);

      // Then
      expect(roundEpsilon(result)).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<[Array<Numeric>, number]> {
  return [
    [
      [],
      0,
    ],
    [
      [0],
      0,
    ],
    [
      [1],
      0,
    ],
    [
      [-1],
      0,
    ],
    [
      [-1, -3, -5],
      4,
    ],
    [
      [3, 1, 2, -3, -1, -2],
      6,
    ],
    [
      [2.2, -3.3, -1.1, 2.2, 5.5],
      8.8,
    ],
    [
      ['3', '4', '1'],
      3,
    ],
    [
      [2, -3.3, '-1.1', 2.2, '5'],
      8.3,
    ],
    [
      [2.2, 3.3, 1.1],
      2.2,
    ],
    [
      [2, 3.3, 1.1],
      2.2,
    ],
    [
      ['2.2', '-3.3', '-1.1', '2.2', '5.5'],
      8.8,
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<Numeric>, number]> {
  return [
    [
      createGeneratorFixture([]),
      0,
    ],
    [
      createGeneratorFixture([0]),
      0,
    ],
    [
      createGeneratorFixture([1]),
      0,
    ],
    [
      createGeneratorFixture([-1]),
      0,
    ],
    [
      createGeneratorFixture([-1, -3, -5]),
      4,
    ],
    [
      createGeneratorFixture([3, 1, 2, -3, -1, -2]),
      6,
    ],
    [
      createGeneratorFixture([2.2, -3.3, -1.1, 2.2, 5.5]),
      8.8,
    ],
    [
      createGeneratorFixture(['3', '4', '1']),
      3,
    ],
    [
      createGeneratorFixture([2, -3.3, '-1.1', 2.2, '5']),
      8.3,
    ],
    [
      createGeneratorFixture([2.2, 3.3, 1.1]),
      2.2,
    ],
    [
      createGeneratorFixture([2, 3.3, 1.1]),
      2.2,
    ],
    [
      createGeneratorFixture(['2.2', '-3.3', '-1.1', '2.2', '5.5']),
      8.8,
    ],
  ];
}

function dataProviderForIterables(): Array<[Iterable<Numeric>, number]> {
  return [
    [
      createIterableFixture([]),
      0,
    ],
    [
      createIterableFixture([0]),
      0,
    ],
    [
      createIterableFixture([1]),
      0,
    ],
    [
      createIterableFixture([-1]),
      0,
    ],
    [
      createIterableFixture([-1, -3, -5]),
      4,
    ],
    [
      createIterableFixture([3, 1, 2, -3, -1, -2]),
      6,
    ],
    [
      createIterableFixture([2.2, -3.3, -1.1, 2.2, 5.5]),
      8.8,
    ],
    [
      createIterableFixture(['3', '4', '1']),
      3,
    ],
    [
      createIterableFixture([2, -3.3, '-1.1', 2.2, '5']),
      8.3,
    ],
    [
      createIterableFixture([2.2, 3.3, 1.1]),
      2.2,
    ],
    [
      createIterableFixture([2, 3.3, 1.1]),
      2.2,
    ],
    [
      createIterableFixture(['2.2', '-3.3', '-1.1', '2.2', '5.5']),
      8.8,
    ],
  ];
}

function dataProviderForIterators(): Array<[Iterator<Numeric>, number]> {
  return [
    [
      createIteratorFixture([]),
      0,
    ],
    [
      createIteratorFixture([0]),
      0,
    ],
    [
      createIteratorFixture([1]),
      0,
    ],
    [
      createIteratorFixture([-1]),
      0,
    ],
    [
      createIteratorFixture([-1, -3, -5]),
      4,
    ],
    [
      createIteratorFixture([3, 1, 2, -3, -1, -2]),
      6,
    ],
    [
      createIteratorFixture([2.2, -3.3, -1.1, 2.2, 5.5]),
      8.8,
    ],
    [
      createIteratorFixture(['3', '4', '1']),
      3,
    ],
    [
      createIteratorFixture([2, -3.3, '-1.1', 2.2, '5']),
      8.3,
    ],
    [
      createIteratorFixture([2.2, 3.3, 1.1]),
      2.2,
    ],
    [
      createIteratorFixture([2, 3.3, 1.1]),
      2.2,
    ],
    [
      createIteratorFixture(['2.2', '-3.3', '-1.1', '2.2', '5.5']),
      8.8,
    ],
  ];
}

function dataProviderForStrings(): Array<[string, number]> {
  return [
    [
      '',
      0,
    ],
    [
      '01',
      1,
    ],
    [
      '123',
      2,
    ],
    [
      '7213835',
      7,
    ],
    [
      '72138350',
      8,
    ],
  ];
}

function dataProviderForSets(): Array<[Set<Numeric>, number]> {
  return [
    [
      new Set([]),
      0,
    ],
    [
      new Set([0]),
      0,
    ],
    [
      new Set([1]),
      0,
    ],
    [
      new Set([-1]),
      0,
    ],
    [
      new Set([-1, -3, -5]),
      4,
    ],
    [
      new Set([3, 1, 2, -3, -1, -2]),
      6,
    ],
    [
      new Set(['3', '4', '1']),
      3,
    ],
    [
      new Set([2, -3.3, '-1.1', 2.2, '5']),
      8.3,
    ],
    [
      new Set([2.2, 3.3, 1.1]),
      2.2,
    ],
    [
      new Set([2, 3.3, 1.1]),
      2.2,
    ],
    [
      new Set(['2.2', '-3.3', '-1.1', '2.2', '5.5']),
      8.8,
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[AsyncGenerator<Numeric>, number]> {
  return [
    [
      createAsyncGeneratorFixture([]),
      0,
    ],
    [
      createAsyncGeneratorFixture([0]),
      0,
    ],
    [
      createAsyncGeneratorFixture([1]),
      0,
    ],
    [
      createAsyncGeneratorFixture([-1]),
      0,
    ],
    [
      createAsyncGeneratorFixture([-1, -3, -5]),
      4,
    ],
    [
      createAsyncGeneratorFixture([3, 1, 2, -3, -1, -2]),
      6,
    ],
    [
      createAsyncGeneratorFixture([2.2, -3.3, -1.1, 2.2, 5.5]),
      8.8,
    ],
    [
      createAsyncGeneratorFixture(['3', '4', '1']),
      3,
    ],
    [
      createAsyncGeneratorFixture([2, -3.3, '-1.1', 2.2, '5']),
      8.3,
    ],
    [
      createAsyncGeneratorFixture([2.2, 3.3, 1.1]),
      2.2,
    ],
    [
      createAsyncGeneratorFixture([2, 3.3, 1.1]),
      2.2,
    ],
    [
      createAsyncGeneratorFixture(['2.2', '-3.3', '-1.1', '2.2', '5.5']),
      8.8,
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[AsyncIterable<Numeric>, number]> {
  return [
    [
      createAsyncIterableFixture([]),
      0,
    ],
    [
      createAsyncIterableFixture([0]),
      0,
    ],
    [
      createAsyncIterableFixture([1]),
      0,
    ],
    [
      createAsyncIterableFixture([-1]),
      0,
    ],
    [
      createAsyncIterableFixture([-1, -3, -5]),
      4,
    ],
    [
      createAsyncIterableFixture([3, 1, 2, -3, -1, -2]),
      6,
    ],
    [
      createAsyncIterableFixture([2.2, -3.3, -1.1, 2.2, 5.5]),
      8.8,
    ],
    [
      createAsyncIterableFixture(['3', '4', '1']),
      3,
    ],
    [
      createAsyncIterableFixture([2, -3.3, '-1.1', 2.2, '5']),
      8.3,
    ],
    [
      createAsyncIterableFixture([2.2, 3.3, 1.1]),
      2.2,
    ],
    [
      createAsyncIterableFixture([2, 3.3, 1.1]),
      2.2,
    ],
    [
      createAsyncIterableFixture(['2.2', '-3.3', '-1.1', '2.2', '5.5']),
      8.8,
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[AsyncIterator<Numeric>, number]> {
  return [
    [
      createAsyncIteratorFixture([]),
      0,
    ],
    [
      createAsyncIteratorFixture([0]),
      0,
    ],
    [
      createAsyncIteratorFixture([1]),
      0,
    ],
    [
      createAsyncIteratorFixture([-1]),
      0,
    ],
    [
      createAsyncIteratorFixture([-1, -3, -5]),
      4,
    ],
    [
      createAsyncIteratorFixture([3, 1, 2, -3, -1, -2]),
      6,
    ],
    [
      createAsyncIteratorFixture([2.2, -3.3, -1.1, 2.2, 5.5]),
      8.8,
    ],
    [
      createAsyncIteratorFixture(['3', '4', '1']),
      3,
    ],
    [
      createAsyncIteratorFixture([2, -3.3, '-1.1', 2.2, '5']),
      8.3,
    ],
    [
      createAsyncIteratorFixture([2.2, 3.3, 1.1]),
      2.2,
    ],
    [
      createAsyncIteratorFixture([2, 3.3, 1.1]),
      2.2,
    ],
    [
      createAsyncIteratorFixture(['2.2', '-3.3', '-1.1', '2.2', '5.5']),
      8.8,
    ],
  ];
}
