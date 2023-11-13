import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  // @ts-ignore
} from "../fixture";
import { set } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  // ...dataProviderForGenerators(),
  // ...dataProviderForIterables(),
  // ...dataProviderForIterators(),
  // ...dataProviderForStrings(),
  // ...dataProviderForSets(),
  // ...dataProviderForMixed(),
] as Array<[Array<Iterable<unknown>|Iterator<unknown>>, Array<unknown>]>)(
  "Set Cartesian Product Test",
  (
    input: Array<Iterable<unknown>|Iterator<unknown>>,
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of set.cartesianProduct(...input)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  // ...dataProviderForAsyncGenerators(),
  // ...dataProviderForAsyncIterables(),
  // ...dataProviderForAsyncIterators(),
  ...dataProviderForArrays(),
  // ...dataProviderForGenerators(),
  // ...dataProviderForIterables(),
  // ...dataProviderForIterators(),
  // ...dataProviderForStrings(),
  // ...dataProviderForSets(),
  // ...dataProviderForMixed(),
  // ...dataProviderForMixedAsync(),
] as Array<[Array<
  AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>
>, Array<unknown>]>)(
  "Set Cartesian Product Async Test",
  (
    input: Array<AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>>,
    expected: Array<unknown>
  ) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of set.cartesianProductAsync(...input)) {
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
      [],
    ],
    [
      [[]],
      [],
    ],
    [
      [[], []],
      [],
    ],
    [
      [[], [], []],
      [],
    ],
    [
      [[1], [2]],
      [[1, 2]],
    ],
    [
      [[1]],
      [[1]],
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [

  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [

  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [

  ];
}

function dataProviderForAsyncGenerators(): Array<unknown> {
  return [

  ];
}

function dataProviderForAsyncIterables(): Array<unknown> {
  return [

  ];
}

function dataProviderForAsyncIterators(): Array<unknown> {
  return [

  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [

  ];
}

function dataProviderForSets(): Array<unknown> {
  return [

  ];
}

function dataProviderForMixed(): Array<unknown> {
  return [
    [
      [
        [],
        createGeneratorFixture([]),
        createIterableFixture([]),
        createIteratorFixture([1, 1]),
      ],
      [1, 1],
    ],
  ];
}

function dataProviderForMixedAsync(): Array<unknown> {
  return [
    [
      [
        createAsyncGeneratorFixture([1, 2]),
        createAsyncGeneratorFixture([1]),
        createAsyncIterableFixture([1, 1, 2]),
        createAsyncIteratorFixture([1, 1, 1, 3]),
      ],
      [1, 1, 1, 2, 3],
    ],
  ];
}
