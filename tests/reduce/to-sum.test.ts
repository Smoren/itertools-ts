import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
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
  "Reduce To Sum Test",
  (
    input: Iterable<number>|Iterator<number>,
    expected: number
  ) => {
    it("", () => {
      // When
      const result = reduce.toSum(input);

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
  AsyncIterable<number>|AsyncIterator<number>|Iterable<number>|Iterator<number>,
  number
]>)(
  "Reduce To Sum Async Test",
  (
    input: AsyncIterable<number>|AsyncIterator<number>|Iterable<number>|Iterator<number>,
    expected: number
  ) => {
    it("", async () => {
      // When
      const result = await reduce.toSumAsync(input);

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
      [null],
      0,
    ],
    [
      [false],
      0,
    ],
    [
      [null, null],
      0,
    ],
    [
      [null, false],
      0,
    ],
    [
      [true, false],
      1,
    ],
    [
      [false, true],
      1,
    ],
    [
      [0, null, false],
      0,
    ],
    [
      [1, null, false],
      1,
    ],
    [
      [1, null, true],
      2,
    ],
    [
      [1, 2, 3],
      6,
    ],
    [
      [1.1, 2.2, 3.3],
      6.6,
    ],
    [
      [1.1, 2, 3.3],
      6.4,
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
      createGeneratorFixture([null]),
      0,
    ],
    [
      createGeneratorFixture([false]),
      0,
    ],
    [
      createGeneratorFixture([null, null]),
      0,
    ],
    [
      createGeneratorFixture([null, false]),
      0,
    ],
    [
      createGeneratorFixture([true, false]),
      1,
    ],
    [
      createGeneratorFixture([false, true]),
      1,
    ],
    [
      createGeneratorFixture([0, null, false]),
      0,
    ],
    [
      createGeneratorFixture([1, null, false]),
      1,
    ],
    [
      createGeneratorFixture([1, null, true]),
      2,
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      6,
    ],
    [
      createGeneratorFixture([1.1, 2.2, 3.3]),
      6.6,
    ],
    [
      createGeneratorFixture([1.1, 2, 3.3]),
      6.4,
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
      createIterableFixture([null]),
      0,
    ],
    [
      createIterableFixture([false]),
      0,
    ],
    [
      createIterableFixture([null, null]),
      0,
    ],
    [
      createIterableFixture([null, false]),
      0,
    ],
    [
      createIterableFixture([true, false]),
      1,
    ],
    [
      createIterableFixture([false, true]),
      1,
    ],
    [
      createIterableFixture([0, null, false]),
      0,
    ],
    [
      createIterableFixture([1, null, false]),
      1,
    ],
    [
      createIterableFixture([1, null, true]),
      2,
    ],
    [
      createIterableFixture([1, 2, 3]),
      6,
    ],
    [
      createIterableFixture([1.1, 2.2, 3.3]),
      6.6,
    ],
    [
      createIterableFixture([1.1, 2, 3.3]),
      6.4,
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
      createIteratorFixture([null]),
      0,
    ],
    [
      createIteratorFixture([false]),
      0,
    ],
    [
      createIteratorFixture([null, null]),
      0,
    ],
    [
      createIteratorFixture([null, false]),
      0,
    ],
    [
      createIteratorFixture([true, false]),
      1,
    ],
    [
      createIteratorFixture([false, true]),
      1,
    ],
    [
      createIteratorFixture([0, null, false]),
      0,
    ],
    [
      createIteratorFixture([1, null, false]),
      1,
    ],
    [
      createIteratorFixture([1, null, true]),
      2,
    ],
    [
      createIteratorFixture([1, 2, 3]),
      6,
    ],
    [
      createIteratorFixture([1.1, 2.2, 3.3]),
      6.6,
    ],
    [
      createIteratorFixture([1.1, 2, 3.3]),
      6.4,
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      0,
    ],
    [
      '0',
      0,
    ],
    [
      '00',
      0,
    ],
    [
      '123',
      6,
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
      new Set([null]),
      0,
    ],
    [
      new Set([false]),
      0,
    ],
    [
      new Set([null, null]),
      0,
    ],
    [
      new Set([null, false]),
      0,
    ],
    [
      new Set([true, false]),
      1,
    ],
    [
      new Set([false, true]),
      1,
    ],
    [
      new Set([0, null, false]),
      0,
    ],
    [
      new Set([1, null, false]),
      1,
    ],
    [
      new Set([1, null, true]),
      2,
    ],
    [
      new Set([1, 2, 3]),
      6,
    ],
    [
      new Set([1.1, 2.2, 3.3]),
      6.6,
    ],
    [
      new Set([1.1, 2, 3.3]),
      6.4,
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
      createAsyncGeneratorFixture([null]),
      0,
    ],
    [
      createAsyncGeneratorFixture([false]),
      0,
    ],
    [
      createAsyncGeneratorFixture([null, null]),
      0,
    ],
    [
      createAsyncGeneratorFixture([null, false]),
      0,
    ],
    [
      createAsyncGeneratorFixture([true, false]),
      1,
    ],
    [
      createAsyncGeneratorFixture([false, true]),
      1,
    ],
    [
      createAsyncGeneratorFixture([0, null, false]),
      0,
    ],
    [
      createAsyncGeneratorFixture([1, null, false]),
      1,
    ],
    [
      createAsyncGeneratorFixture([1, null, true]),
      2,
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      6,
    ],
    [
      createAsyncGeneratorFixture([1.1, 2.2, 3.3]),
      6.6,
    ],
    [
      createAsyncGeneratorFixture([1.1, 2, 3.3]),
      6.4,
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
      createAsyncIterableFixture([null]),
      0,
    ],
    [
      createAsyncIterableFixture([false]),
      0,
    ],
    [
      createAsyncIterableFixture([null, null]),
      0,
    ],
    [
      createAsyncIterableFixture([null, false]),
      0,
    ],
    [
      createAsyncIterableFixture([true, false]),
      1,
    ],
    [
      createAsyncIterableFixture([false, true]),
      1,
    ],
    [
      createAsyncIterableFixture([0, null, false]),
      0,
    ],
    [
      createAsyncIterableFixture([1, null, false]),
      1,
    ],
    [
      createAsyncIterableFixture([1, null, true]),
      2,
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      6,
    ],
    [
      createAsyncIterableFixture([1.1, 2.2, 3.3]),
      6.6,
    ],
    [
      createAsyncIterableFixture([1.1, 2, 3.3]),
      6.4,
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
      createAsyncIteratorFixture([null]),
      0,
    ],
    [
      createAsyncIteratorFixture([false]),
      0,
    ],
    [
      createAsyncIteratorFixture([null, null]),
      0,
    ],
    [
      createAsyncIteratorFixture([null, false]),
      0,
    ],
    [
      createAsyncIteratorFixture([true, false]),
      1,
    ],
    [
      createAsyncIteratorFixture([false, true]),
      1,
    ],
    [
      createAsyncIteratorFixture([0, null, false]),
      0,
    ],
    [
      createAsyncIteratorFixture([1, null, false]),
      1,
    ],
    [
      createAsyncIteratorFixture([1, null, true]),
      2,
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      6,
    ],
    [
      createAsyncIteratorFixture([1.1, 2.2, 3.3]),
      6.6,
    ],
    [
      createAsyncIteratorFixture([1.1, 2, 3.3]),
      6.4,
    ],
  ];
}
