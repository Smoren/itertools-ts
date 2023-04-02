import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  // @ts-ignore
} from "../fixture";
import { Comparator, single } from "../../src";

test("Test Sort Without Custom Comparator", () => {
  // Given
  const data = ['b', 'i', 'f', 'd', 'a', 'e', 'g', 'c', 'h'];
  const expected = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

  // When
  const sorted = [];
  for (const datum of single.sort(data)) {
    sorted.push(datum);
  }

  // Then
  expect(sorted).toEqual(expected);
});

test("Test Sort With Custom Comparator", () => {
  // Given
  const data = [5, 4, 1, 9, 3, 3, 5, 10, 2];
  const expected = [1, 2, 3, 3, 4, 5, 5, 9, 10];

  // When
  const sorted = [];
  for (const datum of single.sort(data, (lhs, rhs) => lhs - rhs)) {
    sorted.push(datum);
  }

  // Then
  expect(sorted).toEqual(expected);
});

test("Test Sort With Custom Comparator Reverse", () => {
  // Given
  const data = [5, 4, 1, 9, 3, 3, 5, 10, 2];
  const expected = [10, 9, 5, 5, 4, 3, 3, 2, 1];

  // When
  const sorted = [];
  for (const datum of single.sort(data, (lhs, rhs) => rhs - lhs)) {
    sorted.push(datum);
  }

  // Then
  expect(sorted).toEqual(expected);
});

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
] as Array<[
    Iterable<unknown>|Iterator<unknown>,
    Comparator<unknown>|undefined,
  Array<unknown>,
]>)(
  "Single Sort Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    comparator: Comparator<unknown>|undefined,
    expected: Array<unknown>,
  ) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of single.sort(input, comparator)) {
        result.push(item);
      }

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
  ...dataProviderForMaps(),
] as Array<[
    AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    Comparator<unknown>|undefined,
  Array<unknown>,
]>)(
  "Single Sort Async Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    comparator: Comparator<unknown>|undefined,
    expected: Array<unknown>,
  ) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of single.sortAsync(input, comparator)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [],
      undefined,
      [],
    ],
    [
      [],
      (lhs: number, rhs: number) => lhs - rhs,
      [],
    ],
    [
      [],
      (lhs: number, rhs: number) => rhs - lhs,
      [],
    ],
    [
      [1],
      undefined,
      [1],
    ],
    [
      [1],
      (lhs: number, rhs: number) => lhs - rhs,
      [1],
    ],
    [
      [1],
      (lhs: number, rhs: number) => rhs - lhs,
      [1],
    ],
    [
      [1, 1],
      undefined,
      [1, 1],
    ],
    [
      [1, 1],
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 1],
    ],
    [
      [1, 1],
      (lhs: number, rhs: number) => rhs - lhs,
      [1, 1],
    ],
    [
      [1, 2],
      undefined,
      [1, 2],
    ],
    [
      [1, 2],
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 2],
    ],
    [
      [1, 2],
      (lhs: number, rhs: number) => rhs - lhs,
      [2, 1],
    ],
    [
      [2, 1],
      undefined,
      [1, 2],
    ],
    [
      [2, 1],
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 2],
    ],
    [
      [2, 1],
      (lhs: number, rhs: number) => rhs - lhs,
      [2, 1],
    ],
    [
      [2, 1, 1],
      undefined,
      [1, 1, 2],
    ],
    [
      [2, 1, 1],
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 1, 2],
    ],
    [
      [2, 1, 1],
      (lhs: number, rhs: number) => rhs - lhs,
      [2, 1, 1],
    ],
    [
      [2, 1, 3],
      undefined,
      [1, 2, 3],
    ],
    [
      [2, 1, 3],
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 2, 3],
    ],
    [
      [2, 1, 3],
      (lhs: number, rhs: number) => rhs - lhs,
      [3, 2, 1],
    ],
    [
      [1, 3, 2, 5, -3, -6, 10, 11, 1],
      (lhs: number, rhs: number) => lhs - rhs,
      [-6, -3, 1, 1, 2, 3, 5, 10, 11],
    ],
    [
      [1, 3, 2, 5, -3, -6, 10, 11, 1],
      (lhs: number, rhs: number) => rhs - lhs,
      [11, 10, 5, 3, 2, 1, 1, -3, -6],
    ],
    [
      [1, 3.3, 2, 5, -3.1, -6, '10', 11, 1],
      (lhs: number, rhs: number) => lhs - rhs,
      [-6, -3.1, 1, 1, 2, 3.3, 5, '10', 11],
    ],
    [
      [1, 3.3, 2, 5, -3.1, -6, '10', 11, 1],
      (lhs: number, rhs: number) => rhs - lhs,
      [11, '10', 5, 3.3, 2, 1, 1, -3.1, -6]
    ],
    [
      [true, false, false, true, false],
      undefined,
      [false, false, false, true, true],
    ],
    [
      [true, false, false, true, false],
      (lhs: number, rhs: number) => lhs - rhs,
      [false, false, false, true, true],
    ],
    [
      [true, false, false, true, false],
      (lhs: number, rhs: number) => rhs - lhs,
      [true, true, false, false, false],
    ],
    [
      [[1, 2], [2, 1], [2, 2], [3, 0], [0, 3], [5, 2], [2, 5]],
      undefined,
      [[0, 3], [1, 2], [2, 1], [2, 2], [2, 5], [3, 0], [5, 2]],
    ],
    [
      [[1, 2], [2, 1], [2, 2], [3, 0], [0, 3], [5, 2], [2, 5]],
      (lhs: number[], rhs: number[]) => lhs[1] - rhs[1],
      [[3, 0], [2, 1], [1, 2], [2, 2], [5, 2], [0, 3], [2, 5]],
    ],
    [
      [[1, 2], [2, 1], [2, 2], [3, 0], [0, 3], [5, 2], [2, 5]],
      (lhs: number[], rhs: number[]) => rhs[1] - lhs[1],
      [[2, 5], [0, 3], [1, 2], [2, 2], [5, 2], [2, 1], [3, 0]],
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      undefined,
      [],
    ],
    [
      createGeneratorFixture([]),
      (lhs: number, rhs: number) => lhs - rhs,
      [],
    ],
    [
      createGeneratorFixture([]),
      (lhs: number, rhs: number) => rhs - lhs,
      [],
    ],
    [
      createGeneratorFixture([1]),
      undefined,
      [1],
    ],
    [
      createGeneratorFixture([1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1],
    ],
    [
      createGeneratorFixture([1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [1],
    ],
    [
      createGeneratorFixture([1, 1]),
      undefined,
      [1, 1],
    ],
    [
      createGeneratorFixture([1, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 1],
    ],
    [
      createGeneratorFixture([1, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [1, 1],
    ],
    [
      createGeneratorFixture([1, 2]),
      undefined,
      [1, 2],
    ],
    [
      createGeneratorFixture([1, 2]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 2],
    ],
    [
      createGeneratorFixture([1, 2]),
      (lhs: number, rhs: number) => rhs - lhs,
      [2, 1],
    ],
    [
      createGeneratorFixture([2, 1]),
      undefined,
      [1, 2],
    ],
    [
      createGeneratorFixture([2, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 2],
    ],
    [
      createGeneratorFixture([2, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [2, 1],
    ],
    [
      createGeneratorFixture([2, 1, 1]),
      undefined,
      [1, 1, 2],
    ],
    [
      createGeneratorFixture([2, 1, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 1, 2],
    ],
    [
      createGeneratorFixture([2, 1, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [2, 1, 1],
    ],
    [
      createGeneratorFixture([2, 1, 3]),
      undefined,
      [1, 2, 3],
    ],
    [
      createGeneratorFixture([2, 1, 3]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 2, 3],
    ],
    [
      createGeneratorFixture([2, 1, 3]),
      (lhs: number, rhs: number) => rhs - lhs,
      [3, 2, 1],
    ],
    [
      createGeneratorFixture([1, 3, 2, 5, -3, -6, 10, 11, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [-6, -3, 1, 1, 2, 3, 5, 10, 11],
    ],
    [
      createGeneratorFixture([1, 3, 2, 5, -3, -6, 10, 11, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [11, 10, 5, 3, 2, 1, 1, -3, -6],
    ],
    [
      createGeneratorFixture([1, 3.3, 2, 5, -3.1, -6, '10', 11, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [-6, -3.1, 1, 1, 2, 3.3, 5, '10', 11],
    ],
    [
      createGeneratorFixture([1, 3.3, 2, 5, -3.1, -6, '10', 11, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [11, '10', 5, 3.3, 2, 1, 1, -3.1, -6]
    ],
    [
      createGeneratorFixture([true, false, false, true, false]),
      undefined,
      [false, false, false, true, true],
    ],
    [
      createGeneratorFixture([true, false, false, true, false]),
      (lhs: number, rhs: number) => lhs - rhs,
      [false, false, false, true, true],
    ],
    [
      createGeneratorFixture([true, false, false, true, false]),
      (lhs: number, rhs: number) => rhs - lhs,
      [true, true, false, false, false],
    ],
    [
      createGeneratorFixture([[1, 2], [2, 1], [2, 2], [3, 0], [0, 3], [5, 2], [2, 5]]),
      undefined,
      [[0, 3], [1, 2], [2, 1], [2, 2], [2, 5], [3, 0], [5, 2]],
    ],
    [
      createGeneratorFixture([[1, 2], [2, 1], [2, 2], [3, 0], [0, 3], [5, 2], [2, 5]]),
      (lhs: number[], rhs: number[]) => lhs[1] - rhs[1],
      [[3, 0], [2, 1], [1, 2], [2, 2], [5, 2], [0, 3], [2, 5]],
    ],
    [
      createGeneratorFixture([[1, 2], [2, 1], [2, 2], [3, 0], [0, 3], [5, 2], [2, 5]]),
      (lhs: number[], rhs: number[]) => rhs[1] - lhs[1],
      [[2, 5], [0, 3], [1, 2], [2, 2], [5, 2], [2, 1], [3, 0]],
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      undefined,
      [],
    ],
    [
      createIterableFixture([]),
      (lhs: number, rhs: number) => lhs - rhs,
      [],
    ],
    [
      createIterableFixture([]),
      (lhs: number, rhs: number) => rhs - lhs,
      [],
    ],
    [
      createIterableFixture([1]),
      undefined,
      [1],
    ],
    [
      createIterableFixture([1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1],
    ],
    [
      createIterableFixture([1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [1],
    ],
    [
      createIterableFixture([1, 1]),
      undefined,
      [1, 1],
    ],
    [
      createIterableFixture([1, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 1],
    ],
    [
      createIterableFixture([1, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [1, 1],
    ],
    [
      createIterableFixture([1, 2]),
      undefined,
      [1, 2],
    ],
    [
      createIterableFixture([1, 2]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 2],
    ],
    [
      createIterableFixture([1, 2]),
      (lhs: number, rhs: number) => rhs - lhs,
      [2, 1],
    ],
    [
      createIterableFixture([2, 1]),
      undefined,
      [1, 2],
    ],
    [
      createIterableFixture([2, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 2],
    ],
    [
      createIterableFixture([2, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [2, 1],
    ],
    [
      createIterableFixture([2, 1, 1]),
      undefined,
      [1, 1, 2],
    ],
    [
      createIterableFixture([2, 1, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 1, 2],
    ],
    [
      createIterableFixture([2, 1, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [2, 1, 1],
    ],
    [
      createIterableFixture([2, 1, 3]),
      undefined,
      [1, 2, 3],
    ],
    [
      createIterableFixture([2, 1, 3]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 2, 3],
    ],
    [
      createIterableFixture([2, 1, 3]),
      (lhs: number, rhs: number) => rhs - lhs,
      [3, 2, 1],
    ],
    [
      createIterableFixture([1, 3, 2, 5, -3, -6, 10, 11, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [-6, -3, 1, 1, 2, 3, 5, 10, 11],
    ],
    [
      createIterableFixture([1, 3, 2, 5, -3, -6, 10, 11, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [11, 10, 5, 3, 2, 1, 1, -3, -6],
    ],
    [
      createIterableFixture([1, 3.3, 2, 5, -3.1, -6, '10', 11, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [-6, -3.1, 1, 1, 2, 3.3, 5, '10', 11],
    ],
    [
      createIterableFixture([1, 3.3, 2, 5, -3.1, -6, '10', 11, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [11, '10', 5, 3.3, 2, 1, 1, -3.1, -6]
    ],
    [
      createIterableFixture([true, false, false, true, false]),
      undefined,
      [false, false, false, true, true],
    ],
    [
      createIterableFixture([true, false, false, true, false]),
      (lhs: number, rhs: number) => lhs - rhs,
      [false, false, false, true, true],
    ],
    [
      createIterableFixture([true, false, false, true, false]),
      (lhs: number, rhs: number) => rhs - lhs,
      [true, true, false, false, false],
    ],
    [
      createIterableFixture([[1, 2], [2, 1], [2, 2], [3, 0], [0, 3], [5, 2], [2, 5]]),
      undefined,
      [[0, 3], [1, 2], [2, 1], [2, 2], [2, 5], [3, 0], [5, 2]],
    ],
    [
      createIterableFixture([[1, 2], [2, 1], [2, 2], [3, 0], [0, 3], [5, 2], [2, 5]]),
      (lhs: number[], rhs: number[]) => lhs[1] - rhs[1],
      [[3, 0], [2, 1], [1, 2], [2, 2], [5, 2], [0, 3], [2, 5]],
    ],
    [
      createIterableFixture([[1, 2], [2, 1], [2, 2], [3, 0], [0, 3], [5, 2], [2, 5]]),
      (lhs: number[], rhs: number[]) => rhs[1] - lhs[1],
      [[2, 5], [0, 3], [1, 2], [2, 2], [5, 2], [2, 1], [3, 0]],
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      undefined,
      [],
    ],
    [
      createIteratorFixture([]),
      (lhs: number, rhs: number) => lhs - rhs,
      [],
    ],
    [
      createIteratorFixture([]),
      (lhs: number, rhs: number) => rhs - lhs,
      [],
    ],
    [
      createIteratorFixture([1]),
      undefined,
      [1],
    ],
    [
      createIteratorFixture([1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1],
    ],
    [
      createIteratorFixture([1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [1],
    ],
    [
      createIteratorFixture([1, 1]),
      undefined,
      [1, 1],
    ],
    [
      createIteratorFixture([1, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 1],
    ],
    [
      createIteratorFixture([1, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [1, 1],
    ],
    [
      createIteratorFixture([1, 2]),
      undefined,
      [1, 2],
    ],
    [
      createIteratorFixture([1, 2]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 2],
    ],
    [
      createIteratorFixture([1, 2]),
      (lhs: number, rhs: number) => rhs - lhs,
      [2, 1],
    ],
    [
      createIteratorFixture([2, 1]),
      undefined,
      [1, 2],
    ],
    [
      createIteratorFixture([2, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 2],
    ],
    [
      createIteratorFixture([2, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [2, 1],
    ],
    [
      createIteratorFixture([2, 1, 1]),
      undefined,
      [1, 1, 2],
    ],
    [
      createIteratorFixture([2, 1, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 1, 2],
    ],
    [
      createIteratorFixture([2, 1, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [2, 1, 1],
    ],
    [
      createIteratorFixture([2, 1, 3]),
      undefined,
      [1, 2, 3],
    ],
    [
      createIteratorFixture([2, 1, 3]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 2, 3],
    ],
    [
      createIteratorFixture([2, 1, 3]),
      (lhs: number, rhs: number) => rhs - lhs,
      [3, 2, 1],
    ],
    [
      createIteratorFixture([1, 3, 2, 5, -3, -6, 10, 11, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [-6, -3, 1, 1, 2, 3, 5, 10, 11],
    ],
    [
      createIteratorFixture([1, 3, 2, 5, -3, -6, 10, 11, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [11, 10, 5, 3, 2, 1, 1, -3, -6],
    ],
    [
      createIteratorFixture([1, 3.3, 2, 5, -3.1, -6, '10', 11, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [-6, -3.1, 1, 1, 2, 3.3, 5, '10', 11],
    ],
    [
      createIteratorFixture([1, 3.3, 2, 5, -3.1, -6, '10', 11, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [11, '10', 5, 3.3, 2, 1, 1, -3.1, -6]
    ],
    [
      createIteratorFixture([true, false, false, true, false]),
      undefined,
      [false, false, false, true, true],
    ],
    [
      createIteratorFixture([true, false, false, true, false]),
      (lhs: number, rhs: number) => lhs - rhs,
      [false, false, false, true, true],
    ],
    [
      createIteratorFixture([true, false, false, true, false]),
      (lhs: number, rhs: number) => rhs - lhs,
      [true, true, false, false, false],
    ],
    [
      createIteratorFixture([[1, 2], [2, 1], [2, 2], [3, 0], [0, 3], [5, 2], [2, 5]]),
      undefined,
      [[0, 3], [1, 2], [2, 1], [2, 2], [2, 5], [3, 0], [5, 2]],
    ],
    [
      createIteratorFixture([[1, 2], [2, 1], [2, 2], [3, 0], [0, 3], [5, 2], [2, 5]]),
      (lhs: number[], rhs: number[]) => lhs[1] - rhs[1],
      [[3, 0], [2, 1], [1, 2], [2, 2], [5, 2], [0, 3], [2, 5]],
    ],
    [
      createIteratorFixture([[1, 2], [2, 1], [2, 2], [3, 0], [0, 3], [5, 2], [2, 5]]),
      (lhs: number[], rhs: number[]) => rhs[1] - lhs[1],
      [[2, 5], [0, 3], [1, 2], [2, 2], [5, 2], [2, 1], [3, 0]],
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      undefined,
      [],
    ],
    [
      '',
      (lhs: string, rhs: string) => Number(lhs) - Number(rhs),
      [],
    ],
    [
      '',
      (lhs: string, rhs: string) => Number(rhs) - Number(lhs),
      [],
    ],
    [
      '1',
      undefined,
      ['1'],
    ],
    [
      '1',
      (lhs: string, rhs: string) => Number(lhs) - Number(rhs),
      ['1'],
    ],
    [
      '1',
      (lhs: string, rhs: string) => Number(rhs) - Number(lhs),
      ['1'],
    ],
    [
      '11',
      undefined,
      ['1', '1'],
    ],
    [
      '11',
      (lhs: string, rhs: string) => Number(lhs) - Number(rhs),
      ['1', '1'],
    ],
    [
      '11',
      (lhs: string, rhs: string) => Number(rhs) - Number(lhs),
      ['1', '1'],
    ],
    [
      '12',
      undefined,
      ['1', '2'],
    ],
    [
      '12',
      (lhs: string, rhs: string) => Number(lhs) - Number(rhs),
      ['1', '2'],
    ],
    [
      '12',
      (lhs: string, rhs: string) => Number(rhs) - Number(lhs),
      ['2', '1'],
    ],
    [
      '21',
      undefined,
      ['1', '2'],
    ],
    [
      '21',
      (lhs: string, rhs: string) => Number(lhs) - Number(rhs),
      ['1', '2'],
    ],
    [
      '21',
      (lhs: string, rhs: string) => Number(rhs) - Number(lhs),
      ['2', '1'],
    ],
    [
      '211',
      undefined,
      ['1', '1', '2'],
    ],
    [
      '211',
      (lhs: string, rhs: string) => Number(lhs) - Number(rhs),
      ['1', '1', '2'],
    ],
    [
      '211',
      (lhs: string, rhs: string) => Number(rhs) - Number(lhs),
      ['2', '1', '1'],
    ],
    [
      '213',
      undefined,
      ['1', '2', '3'],
    ],
    [
      '213',
      (lhs: string, rhs: string) => Number(lhs) - Number(rhs),
      ['1', '2', '3'],
    ],
    [
      '213',
      (lhs: string, rhs: string) => Number(rhs) - Number(lhs),
      ['3', '2', '1'],
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([]),
      undefined,
      [],
    ],
    [
      new Set([]),
      (lhs: number, rhs: number) => lhs - rhs,
      [],
    ],
    [
      new Set([]),
      (lhs: number, rhs: number) => rhs - lhs,
      [],
    ],
    [
      new Set([1]),
      undefined,
      [1],
    ],
    [
      new Set([1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1],
    ],
    [
      new Set([1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [1],
    ],
    [
      new Set([1, 2]),
      undefined,
      [1, 2],
    ],
    [
      new Set([1, 2]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 2],
    ],
    [
      new Set([1, 2]),
      (lhs: number, rhs: number) => rhs - lhs,
      [2, 1],
    ],
    [
      new Set([2, 1]),
      undefined,
      [1, 2],
    ],
    [
      new Set([2, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 2],
    ],
    [
      new Set([2, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [2, 1],
    ],
    [
      new Set([2, 1, 3]),
      undefined,
      [1, 2, 3],
    ],
    [
      new Set([2, 1, 3]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 2, 3],
    ],
    [
      new Set([2, 1, 3]),
      (lhs: number, rhs: number) => rhs - lhs,
      [3, 2, 1],
    ],
    [
      new Set([[1, 2], [2, 1], [2, 2], [3, 0], [0, 3], [5, 2], [2, 5]]),
      undefined,
      [[0, 3], [1, 2], [2, 1], [2, 2], [2, 5], [3, 0], [5, 2]],
    ],
    [
      new Set([[1, 2], [2, 1], [2, 2], [3, 0], [0, 3], [5, 2], [2, 5]]),
      (lhs: number[], rhs: number[]) => lhs[1] - rhs[1],
      [[3, 0], [2, 1], [1, 2], [2, 2], [5, 2], [0, 3], [2, 5]],
    ],
    [
      new Set([[1, 2], [2, 1], [2, 2], [3, 0], [0, 3], [5, 2], [2, 5]]),
      (lhs: number[], rhs: number[]) => rhs[1] - lhs[1],
      [[2, 5], [0, 3], [1, 2], [2, 2], [5, 2], [2, 1], [3, 0]],
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      new Map([]),
      undefined,
      [],
    ],
    [
      new Map([]),
      (lhs: [number, number], rhs: [number, number]) => lhs[1] - rhs[1],
      [],
    ],
    [
      new Map([]),
      (lhs: [number, number], rhs: [number, number]) => rhs[1] - lhs[1],
      [],
    ],
    [
      new Map([[3, 1], [2, 1], [5, -1], [10, 10], [7, -5]]),
      (lhs: [number, number], rhs: [number, number]) => lhs[1] - rhs[1],
      [[7, -5], [5, -1], [3, 1], [2, 1], [10, 10]],
    ],
    [
      new Map([[3, 1], [2, 1], [5, -1], [10, 10], [7, -5]]),
      (lhs: [number, number], rhs: [number, number]) => rhs[0] - lhs[0],
      [[10, 10], [7, -5], [5, -1], [3, 1], [2, 1]],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([]),
      undefined,
      [],
    ],
    [
      createAsyncGeneratorFixture([]),
      (lhs: number, rhs: number) => lhs - rhs,
      [],
    ],
    [
      createAsyncGeneratorFixture([]),
      (lhs: number, rhs: number) => rhs - lhs,
      [],
    ],
    [
      createAsyncGeneratorFixture([1]),
      undefined,
      [1],
    ],
    [
      createAsyncGeneratorFixture([1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1],
    ],
    [
      createAsyncGeneratorFixture([1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [1],
    ],
    [
      createAsyncGeneratorFixture([1, 1]),
      undefined,
      [1, 1],
    ],
    [
      createAsyncGeneratorFixture([1, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 1],
    ],
    [
      createAsyncGeneratorFixture([1, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [1, 1],
    ],
    [
      createAsyncGeneratorFixture([1, 2]),
      undefined,
      [1, 2],
    ],
    [
      createAsyncGeneratorFixture([1, 2]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 2],
    ],
    [
      createAsyncGeneratorFixture([1, 2]),
      (lhs: number, rhs: number) => rhs - lhs,
      [2, 1],
    ],
    [
      createAsyncGeneratorFixture([2, 1]),
      undefined,
      [1, 2],
    ],
    [
      createAsyncGeneratorFixture([2, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 2],
    ],
    [
      createAsyncGeneratorFixture([2, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [2, 1],
    ],
    [
      createAsyncGeneratorFixture([2, 1, 1]),
      undefined,
      [1, 1, 2],
    ],
    [
      createAsyncGeneratorFixture([2, 1, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 1, 2],
    ],
    [
      createAsyncGeneratorFixture([2, 1, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [2, 1, 1],
    ],
    [
      createAsyncGeneratorFixture([2, 1, 3]),
      undefined,
      [1, 2, 3],
    ],
    [
      createAsyncGeneratorFixture([2, 1, 3]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 2, 3],
    ],
    [
      createAsyncGeneratorFixture([2, 1, 3]),
      (lhs: number, rhs: number) => rhs - lhs,
      [3, 2, 1],
    ],
    [
      createAsyncGeneratorFixture([1, 3, 2, 5, -3, -6, 10, 11, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [-6, -3, 1, 1, 2, 3, 5, 10, 11],
    ],
    [
      createAsyncGeneratorFixture([1, 3, 2, 5, -3, -6, 10, 11, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [11, 10, 5, 3, 2, 1, 1, -3, -6],
    ],
    [
      createAsyncGeneratorFixture([1, 3.3, 2, 5, -3.1, -6, '10', 11, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [-6, -3.1, 1, 1, 2, 3.3, 5, '10', 11],
    ],
    [
      createAsyncGeneratorFixture([1, 3.3, 2, 5, -3.1, -6, '10', 11, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [11, '10', 5, 3.3, 2, 1, 1, -3.1, -6]
    ],
    [
      createAsyncGeneratorFixture([true, false, false, true, false]),
      undefined,
      [false, false, false, true, true],
    ],
    [
      createAsyncGeneratorFixture([true, false, false, true, false]),
      (lhs: number, rhs: number) => lhs - rhs,
      [false, false, false, true, true],
    ],
    [
      createAsyncGeneratorFixture([true, false, false, true, false]),
      (lhs: number, rhs: number) => rhs - lhs,
      [true, true, false, false, false],
    ],
    [
      createAsyncGeneratorFixture([[1, 2], [2, 1], [2, 2], [3, 0], [0, 3], [5, 2], [2, 5]]),
      undefined,
      [[0, 3], [1, 2], [2, 1], [2, 2], [2, 5], [3, 0], [5, 2]],
    ],
    [
      createAsyncGeneratorFixture([[1, 2], [2, 1], [2, 2], [3, 0], [0, 3], [5, 2], [2, 5]]),
      (lhs: number[], rhs: number[]) => lhs[1] - rhs[1],
      [[3, 0], [2, 1], [1, 2], [2, 2], [5, 2], [0, 3], [2, 5]],
    ],
    [
      createAsyncGeneratorFixture([[1, 2], [2, 1], [2, 2], [3, 0], [0, 3], [5, 2], [2, 5]]),
      (lhs: number[], rhs: number[]) => rhs[1] - lhs[1],
      [[2, 5], [0, 3], [1, 2], [2, 2], [5, 2], [2, 1], [3, 0]],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<unknown> {
  return [
    [
      createAsyncIterableFixture([]),
      undefined,
      [],
    ],
    [
      createAsyncIterableFixture([]),
      (lhs: number, rhs: number) => lhs - rhs,
      [],
    ],
    [
      createAsyncIterableFixture([]),
      (lhs: number, rhs: number) => rhs - lhs,
      [],
    ],
    [
      createAsyncIterableFixture([1]),
      undefined,
      [1],
    ],
    [
      createAsyncIterableFixture([1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1],
    ],
    [
      createAsyncIterableFixture([1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [1],
    ],
    [
      createAsyncIterableFixture([1, 1]),
      undefined,
      [1, 1],
    ],
    [
      createAsyncIterableFixture([1, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 1],
    ],
    [
      createAsyncIterableFixture([1, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [1, 1],
    ],
    [
      createAsyncIterableFixture([1, 2]),
      undefined,
      [1, 2],
    ],
    [
      createAsyncIterableFixture([1, 2]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 2],
    ],
    [
      createAsyncIterableFixture([1, 2]),
      (lhs: number, rhs: number) => rhs - lhs,
      [2, 1],
    ],
    [
      createAsyncIterableFixture([2, 1]),
      undefined,
      [1, 2],
    ],
    [
      createAsyncIterableFixture([2, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 2],
    ],
    [
      createAsyncIterableFixture([2, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [2, 1],
    ],
    [
      createAsyncIterableFixture([2, 1, 1]),
      undefined,
      [1, 1, 2],
    ],
    [
      createAsyncIterableFixture([2, 1, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 1, 2],
    ],
    [
      createAsyncIterableFixture([2, 1, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [2, 1, 1],
    ],
    [
      createAsyncIterableFixture([2, 1, 3]),
      undefined,
      [1, 2, 3],
    ],
    [
      createAsyncIterableFixture([2, 1, 3]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 2, 3],
    ],
    [
      createAsyncIterableFixture([2, 1, 3]),
      (lhs: number, rhs: number) => rhs - lhs,
      [3, 2, 1],
    ],
    [
      createAsyncIterableFixture([1, 3, 2, 5, -3, -6, 10, 11, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [-6, -3, 1, 1, 2, 3, 5, 10, 11],
    ],
    [
      createAsyncIterableFixture([1, 3, 2, 5, -3, -6, 10, 11, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [11, 10, 5, 3, 2, 1, 1, -3, -6],
    ],
    [
      createAsyncIterableFixture([1, 3.3, 2, 5, -3.1, -6, '10', 11, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [-6, -3.1, 1, 1, 2, 3.3, 5, '10', 11],
    ],
    [
      createAsyncIterableFixture([1, 3.3, 2, 5, -3.1, -6, '10', 11, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [11, '10', 5, 3.3, 2, 1, 1, -3.1, -6]
    ],
    [
      createAsyncIterableFixture([true, false, false, true, false]),
      undefined,
      [false, false, false, true, true],
    ],
    [
      createAsyncIterableFixture([true, false, false, true, false]),
      (lhs: number, rhs: number) => lhs - rhs,
      [false, false, false, true, true],
    ],
    [
      createAsyncIterableFixture([true, false, false, true, false]),
      (lhs: number, rhs: number) => rhs - lhs,
      [true, true, false, false, false],
    ],
    [
      createAsyncIterableFixture([[1, 2], [2, 1], [2, 2], [3, 0], [0, 3], [5, 2], [2, 5]]),
      undefined,
      [[0, 3], [1, 2], [2, 1], [2, 2], [2, 5], [3, 0], [5, 2]],
    ],
    [
      createAsyncIterableFixture([[1, 2], [2, 1], [2, 2], [3, 0], [0, 3], [5, 2], [2, 5]]),
      (lhs: number[], rhs: number[]) => lhs[1] - rhs[1],
      [[3, 0], [2, 1], [1, 2], [2, 2], [5, 2], [0, 3], [2, 5]],
    ],
    [
      createAsyncIterableFixture([[1, 2], [2, 1], [2, 2], [3, 0], [0, 3], [5, 2], [2, 5]]),
      (lhs: number[], rhs: number[]) => rhs[1] - lhs[1],
      [[2, 5], [0, 3], [1, 2], [2, 2], [5, 2], [2, 1], [3, 0]],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<unknown> {
  return [
    [
      createAsyncIteratorFixture([]),
      undefined,
      [],
    ],
    [
      createAsyncIteratorFixture([]),
      (lhs: number, rhs: number) => lhs - rhs,
      [],
    ],
    [
      createAsyncIteratorFixture([]),
      (lhs: number, rhs: number) => rhs - lhs,
      [],
    ],
    [
      createAsyncIteratorFixture([1]),
      undefined,
      [1],
    ],
    [
      createAsyncIteratorFixture([1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1],
    ],
    [
      createAsyncIteratorFixture([1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [1],
    ],
    [
      createAsyncIteratorFixture([1, 1]),
      undefined,
      [1, 1],
    ],
    [
      createAsyncIteratorFixture([1, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 1],
    ],
    [
      createAsyncIteratorFixture([1, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [1, 1],
    ],
    [
      createAsyncIteratorFixture([1, 2]),
      undefined,
      [1, 2],
    ],
    [
      createAsyncIteratorFixture([1, 2]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 2],
    ],
    [
      createAsyncIteratorFixture([1, 2]),
      (lhs: number, rhs: number) => rhs - lhs,
      [2, 1],
    ],
    [
      createAsyncIteratorFixture([2, 1]),
      undefined,
      [1, 2],
    ],
    [
      createAsyncIteratorFixture([2, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 2],
    ],
    [
      createAsyncIteratorFixture([2, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [2, 1],
    ],
    [
      createAsyncIteratorFixture([2, 1, 1]),
      undefined,
      [1, 1, 2],
    ],
    [
      createAsyncIteratorFixture([2, 1, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 1, 2],
    ],
    [
      createAsyncIteratorFixture([2, 1, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [2, 1, 1],
    ],
    [
      createAsyncIteratorFixture([2, 1, 3]),
      undefined,
      [1, 2, 3],
    ],
    [
      createAsyncIteratorFixture([2, 1, 3]),
      (lhs: number, rhs: number) => lhs - rhs,
      [1, 2, 3],
    ],
    [
      createAsyncIteratorFixture([2, 1, 3]),
      (lhs: number, rhs: number) => rhs - lhs,
      [3, 2, 1],
    ],
    [
      createAsyncIteratorFixture([1, 3, 2, 5, -3, -6, 10, 11, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [-6, -3, 1, 1, 2, 3, 5, 10, 11],
    ],
    [
      createAsyncIteratorFixture([1, 3, 2, 5, -3, -6, 10, 11, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [11, 10, 5, 3, 2, 1, 1, -3, -6],
    ],
    [
      createAsyncIteratorFixture([1, 3.3, 2, 5, -3.1, -6, '10', 11, 1]),
      (lhs: number, rhs: number) => lhs - rhs,
      [-6, -3.1, 1, 1, 2, 3.3, 5, '10', 11],
    ],
    [
      createAsyncIteratorFixture([1, 3.3, 2, 5, -3.1, -6, '10', 11, 1]),
      (lhs: number, rhs: number) => rhs - lhs,
      [11, '10', 5, 3.3, 2, 1, 1, -3.1, -6]
    ],
    [
      createAsyncIteratorFixture([true, false, false, true, false]),
      undefined,
      [false, false, false, true, true],
    ],
    [
      createAsyncIteratorFixture([true, false, false, true, false]),
      (lhs: number, rhs: number) => lhs - rhs,
      [false, false, false, true, true],
    ],
    [
      createAsyncIteratorFixture([true, false, false, true, false]),
      (lhs: number, rhs: number) => rhs - lhs,
      [true, true, false, false, false],
    ],
    [
      createAsyncIteratorFixture([[1, 2], [2, 1], [2, 2], [3, 0], [0, 3], [5, 2], [2, 5]]),
      undefined,
      [[0, 3], [1, 2], [2, 1], [2, 2], [2, 5], [3, 0], [5, 2]],
    ],
    [
      createAsyncIteratorFixture([[1, 2], [2, 1], [2, 2], [3, 0], [0, 3], [5, 2], [2, 5]]),
      (lhs: number[], rhs: number[]) => lhs[1] - rhs[1],
      [[3, 0], [2, 1], [1, 2], [2, 2], [5, 2], [0, 3], [2, 5]],
    ],
    [
      createAsyncIteratorFixture([[1, 2], [2, 1], [2, 2], [3, 0], [0, 3], [5, 2], [2, 5]]),
      (lhs: number[], rhs: number[]) => rhs[1] - lhs[1],
      [[2, 5], [0, 3], [1, 2], [2, 2], [5, 2], [2, 1], [3, 0]],
    ],
  ];
}
