import {
  createAsyncGeneratorFixture, createAsyncIterableFixture, createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  // @ts-ignore
} from "../fixture";
import { reduce } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
] as Array<[Iterable<number>|Iterator<number>, number]>)(
  "Reduce To Range Test",
  (
    input: Iterable<number>|Iterator<number>,
    expected: number
  ) => {
    it("", () => {
      // When
      const result = reduce.toRange(input);

      // Then
      expect(result).toEqual(expected);
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
] as Array<[
    AsyncIterable<number>|AsyncIterator<number>|Iterable<number>|Iterator<number>, number]>)(
  "Reduce To Range Async Test",
  (
    input: AsyncIterable<number>|AsyncIterator<number>|Iterable<number>|Iterator<number>,
    expected: number
  ) => {
    it("", async () => {
      // When
      const result = await reduce.toRangeAsync(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<unknown> {
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
  ];
}

function dataProviderForGenerators(): Array<unknown> {
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
  ];
}

function dataProviderForIterables(): Array<unknown> {
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
  ];
}

function dataProviderForIterators(): Array<unknown> {
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
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      [''],
      0,
    ],
    [
      ['', ''],
      0,
    ],
    [
      ['1', '2', '3'],
      2,
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
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
  ];
}

function dataProviderForAsyncGenerators(): Array<unknown> {
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
  ];
}

function dataProviderForAsyncIterables(): Array<unknown> {
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
  ];
}

function dataProviderForAsyncIterators(): Array<unknown> {
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
  ];
}
