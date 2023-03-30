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
] as Array<[Iterable<number>|Iterator<number>, number|undefined]>)(
  "Reduce To Product Test",
  (
    input: Iterable<number>|Iterator<number>,
    expected: number|undefined
  ) => {
    it("", () => {
      // When
      const result = reduce.toProduct(input);

      // Then
      if (expected === undefined) {
        expect(result).toEqual(expected);
      } else {
        expect(result).toBeCloseTo(expected);
      }
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
  number|undefined
]>)(
  "Reduce To Product Async Test",
  (
    input: AsyncIterable<number>|AsyncIterator<number>|Iterable<number>|Iterator<number>,
    expected: number|undefined
  ) => {
    it("", async () => {
      // When
      const result = await reduce.toProductAsync(input);

      // Then
      if (expected === undefined) {
        expect(result).toEqual(expected);
      } else {
        expect(result).toBeCloseTo(expected);
      }
    });
  }
);

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [],
      undefined,
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
      0,
    ],
    [
      [false, true],
      0,
    ],
    [
      [0, null, false],
      0,
    ],
    [
      [1, null, false],
      0,
    ],
    [
      [1, null, true],
      0,
    ],
    [
      [2, 2, 3],
      12,
    ],
    [
      [1.1, 2.2, 3.3],
      7.986,
    ],
    [
      [1.1, 2, 3.3],
      7.26,
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      undefined,
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
      0,
    ],
    [
      createGeneratorFixture([false, true]),
      0,
    ],
    [
      createGeneratorFixture([0, null, false]),
      0,
    ],
    [
      createGeneratorFixture([1, null, false]),
      0,
    ],
    [
      createGeneratorFixture([1, null, true]),
      0,
    ],
    [
      createGeneratorFixture([2, 2, 3]),
      12,
    ],
    [
      createGeneratorFixture([1.1, 2.2, 3.3]),
      7.986,
    ],
    [
      createGeneratorFixture([1.1, 2, 3.3]),
      7.26,
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      undefined,
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
      0,
    ],
    [
      createIterableFixture([false, true]),
      0,
    ],
    [
      createIterableFixture([0, null, false]),
      0,
    ],
    [
      createIterableFixture([1, null, false]),
      0,
    ],
    [
      createIterableFixture([1, null, true]),
      0,
    ],
    [
      createIterableFixture([2, 2, 3]),
      12,
    ],
    [
      createIterableFixture([1.1, 2.2, 3.3]),
      7.986,
    ],
    [
      createIterableFixture([1.1, 2, 3.3]),
      7.26,
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      undefined,
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
      0,
    ],
    [
      createIteratorFixture([false, true]),
      0,
    ],
    [
      createIteratorFixture([0, null, false]),
      0,
    ],
    [
      createIteratorFixture([1, null, false]),
      0,
    ],
    [
      createIteratorFixture([1, null, true]),
      0,
    ],
    [
      createIteratorFixture([2, 2, 3]),
      12,
    ],
    [
      createIteratorFixture([1.1, 2.2, 3.3]),
      7.986,
    ],
    [
      createIteratorFixture([1.1, 2, 3.3]),
      7.26,
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      undefined,
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
      '01',
      0,
    ],
    [
      '10',
      0,
    ],
    [
      '011',
      0,
    ],
    [
      '223',
      12,
    ],
    [
      '123',
      6,
    ],
    [
      '12345',
      120,
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([]),
      undefined,
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
      0,
    ],
    [
      new Set([false, true]),
      0,
    ],
    [
      new Set([0, null, false]),
      0,
    ],
    [
      new Set([1, null, false]),
      0,
    ],
    [
      new Set([1, null, true]),
      0,
    ],
    [
      new Set([2, 3, 4]),
      24,
    ],
    [
      new Set([1.1, 2.2, 3.3]),
      7.986,
    ],
    [
      new Set([1.1, 2, 3.3]),
      7.26,
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([]),
      undefined,
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
      0,
    ],
    [
      createAsyncGeneratorFixture([false, true]),
      0,
    ],
    [
      createAsyncGeneratorFixture([0, null, false]),
      0,
    ],
    [
      createAsyncGeneratorFixture([1, null, false]),
      0,
    ],
    [
      createAsyncGeneratorFixture([1, null, true]),
      0,
    ],
    [
      createAsyncGeneratorFixture([2, 2, 3]),
      12,
    ],
    [
      createAsyncGeneratorFixture([1.1, 2.2, 3.3]),
      7.986,
    ],
    [
      createAsyncGeneratorFixture([1.1, 2, 3.3]),
      7.26,
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<unknown> {
  return [
    [
      createAsyncIterableFixture([]),
      undefined,
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
      0,
    ],
    [
      createAsyncIterableFixture([false, true]),
      0,
    ],
    [
      createAsyncIterableFixture([0, null, false]),
      0,
    ],
    [
      createAsyncIterableFixture([1, null, false]),
      0,
    ],
    [
      createAsyncIterableFixture([1, null, true]),
      0,
    ],
    [
      createAsyncIterableFixture([2, 2, 3]),
      12,
    ],
    [
      createAsyncIterableFixture([1.1, 2.2, 3.3]),
      7.986,
    ],
    [
      createAsyncIterableFixture([1.1, 2, 3.3]),
      7.26,
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<unknown> {
  return [
    [
      createAsyncIteratorFixture([]),
      undefined,
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
      0,
    ],
    [
      createAsyncIteratorFixture([false, true]),
      0,
    ],
    [
      createAsyncIteratorFixture([0, null, false]),
      0,
    ],
    [
      createAsyncIteratorFixture([1, null, false]),
      0,
    ],
    [
      createAsyncIteratorFixture([1, null, true]),
      0,
    ],
    [
      createAsyncIteratorFixture([2, 2, 3]),
      12,
    ],
    [
      createAsyncIteratorFixture([1.1, 2.2, 3.3]),
      7.986,
    ],
    [
      createAsyncIteratorFixture([1.1, 2, 3.3]),
      7.26,
    ],
  ];
}
