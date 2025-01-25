import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture
  // @ts-ignore
} from "../fixture";
import { single } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])(
  "Single Compress Test",
  (input, selectors, expected) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of single.compress(input, selectors)) {
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
  ...dataProviderForMixedAsync(),
])(
  "Single Compress Async Test",
  (input, selectors, expected) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of single.compressAsync(input, selectors)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<[Array<any>, Array<number | boolean>, Array<any>]> {
  return [
    [
      [],
      [],
      [],
    ],
    [
      [0],
      [0],
      [],
    ],
    [
      [1],
      [1],
      [1],
    ],
    [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1],
    ],
    [
      [1, 2, 3],
      [0, 0, 1],
      [3],
    ],
    [
      [1, 2, 3, 4, 5],
      [0, 1, 1, 1, 0],
      [2, 3, 4],
    ],
    [
      [1, 2, 3, -4, 5],
      [true, true, false, false, false],
      [1, 2]
    ],
    [
      [1, 2, 3, -4, -5],
      [1, 'true', true, 0, false] as Array<number | boolean>,
      [1, 2, 3],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<any>, Array<number | boolean>, Array<any>]> {
  return [
    [
      createGeneratorFixture([]),
      [],
      [],
    ],
    [
      createGeneratorFixture([0]),
      [0],
      [],
    ],
    [
      createGeneratorFixture([1]),
      [1],
      [1],
    ],
    [
      createGeneratorFixture([1, 1, 1]),
      [1, 0, 1],
      [1, 1],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      [0, 0, 1],
      [3],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5]),
      [0, 1, 1, 1, 0],
      [2, 3, 4],
    ],
    [
      createGeneratorFixture([1, 2, 3, -4, 5]),
      [true, true, false, false, false],
      [1, 2]
    ],
    [
      createGeneratorFixture([1, 2, 3, -4, -5]),
      [1, 'true', true, 0, false] as Array<number | boolean>,
      [1, 2, 3],
    ],
  ];
}

function dataProviderForIterables(): Array<[Iterable<any>, Array<number | boolean>, Array<any>]> {
  return [
    [
      createIterableFixture([]),
      [],
      [],
    ],
    [
      createIterableFixture([0]),
      [0],
      [],
    ],
    [
      createIterableFixture([1]),
      [1],
      [1],
    ],
    [
      createIterableFixture([1, 1, 1]),
      [1, 0, 1],
      [1, 1],
    ],
    [
      createIterableFixture([1, 2, 3]),
      [0, 0, 1],
      [3],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5]),
      [0, 1, 1, 1, 0],
      [2, 3, 4],
    ],
    [
      createIterableFixture([1, 2, 3, -4, 5]),
      [true, true, false, false, false],
      [1, 2]
    ],
    [
      createIterableFixture([1, 2, 3, -4, -5]),
      [1, 'true', true, 0, false] as Array<number | boolean>,
      [1, 2, 3],
    ],
  ];
}

function dataProviderForIterators(): Array<[Iterator<any>, Array<number | boolean>, Array<any>]> {
  return [
    [
      createIteratorFixture([]),
      [],
      [],
    ],
    [
      createIteratorFixture([0]),
      [0],
      [],
    ],
    [
      createIteratorFixture([1]),
      [1],
      [1],
    ],
    [
      createIteratorFixture([1, 1, 1]),
      [1, 0, 1],
      [1, 1],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      [0, 0, 1],
      [3],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5]),
      [0, 1, 1, 1, 0],
      [2, 3, 4],
    ],
    [
      createIteratorFixture([1, 2, 3, -4, 5]),
      [true, true, false, false, false],
      [1, 2]
    ],
    [
      createIteratorFixture([1, 2, 3, -4, -5]),
      [1, 'true', true, 0, false] as Array<number | boolean>,
      [1, 2, 3],
    ],
  ];
}

function dataProviderForStrings(): Array<[string, Array<number | boolean>, Array<any>]> {
  return [
    [
      '',
      [],
      [],
    ],
    [
      '0',
      [0],
      [],
    ],
    [
      '1',
      [1],
      ['1'],
    ],
    [
      '111',
      [1, 0, 1],
      ['1', '1'],
    ],
    [
      '123',
      [0, 0, 1],
      ['3'],
    ],
    [
      '12345',
      [0, 1, 1, 1, 0],
      ['2', '3', '4'],
    ],
  ];
}

function dataProviderForSets(): Array<[Set<any>, Array<number | boolean>, Array<any>]> {
  return [
    [
      new Set([]),
      [],
      [],
    ],
    [
      new Set([0]),
      [0],
      [],
    ],
    [
      new Set([1]),
      [1],
      [1],
    ],
    [
      new Set([1, 2, 3]),
      [0, 0, 1],
      [3],
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      [0, 1, 1, 1, 0],
      [2, 3, 4],
    ],
    [
      new Set([1, 2, 3, -4, 5]),
      [true, true, false, false, false],
      [1, 2]
    ],
    [
      new Set([1, 2, 3, -4, -5]),
      [1, 'true', true, 0, false] as Array<number | boolean>,
      [1, 2, 3],
    ],
  ];
}

function dataProviderForMaps(): Array<[Map<any, any>, Array<number | boolean>, Array<any>]> {
  return [
    [
      createMapFixture([]),
      [],
      [],
    ],
    [
      createMapFixture([0]),
      [0],
      [],
    ],
    [
      createMapFixture([1]),
      [1],
      [[0, 1]],
    ],
    [
      createMapFixture([1, 1, 1]),
      [1, 0, 1],
      [[0, 1], [2, 1]],
    ],
    [
      createMapFixture([1, 2, 3]),
      [0, 0, 1],
      [[2, 3]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      [0, 1, 1, 1, 0],
      [[1, 2], [2, 3], [3, 4]],
    ],
    [
      createMapFixture([1, 2, 3, -4, 5]),
      [true, true, false, false, false],
      [[0, 1], [1, 2]],
    ],
    [
      createMapFixture([1, 2, 3, -4, -5]),
      [1, 'true', true, 0, false] as Array<number | boolean>,
      [[0, 1], [1, 2], [2, 3]],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[AsyncGenerator<any>, Array<number | boolean>, Array<any>]> {
  return [
    [
      createAsyncGeneratorFixture([]),
      [],
      [],
    ],
    [
      createAsyncGeneratorFixture([0]),
      [0],
      [],
    ],
    [
      createAsyncGeneratorFixture([1]),
      [1],
      [1],
    ],
    [
      createAsyncGeneratorFixture([1, 1, 1]),
      [1, 0, 1],
      [1, 1],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      [0, 0, 1],
      [3],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
      [0, 1, 1, 1, 0],
      [2, 3, 4],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, -4, 5]),
      [true, true, false, false, false],
      [1, 2]
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, -4, -5]),
      [1, 'true', true, 0, false] as Array<number | boolean>,
      [1, 2, 3],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[AsyncIterable<any>, Array<number | boolean>, Array<any>]> {
  return [
    [
      createAsyncIterableFixture([]),
      [],
      [],
    ],
    [
      createAsyncIterableFixture([0]),
      [0],
      [],
    ],
    [
      createAsyncIterableFixture([1]),
      [1],
      [1],
    ],
    [
      createAsyncIterableFixture([1, 1, 1]),
      [1, 0, 1],
      [1, 1],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      [0, 0, 1],
      [3],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      [0, 1, 1, 1, 0],
      [2, 3, 4],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, -4, 5]),
      [true, true, false, false, false],
      [1, 2]
    ],
    [
      createAsyncIterableFixture([1, 2, 3, -4, -5]),
      [1, 'true', true, 0, false] as Array<number | boolean>,
      [1, 2, 3],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[AsyncIterator<any>, Array<number | boolean>, Array<any>]> {
  return [
    [
      createAsyncIteratorFixture([]),
      [],
      [],
    ],
    [
      createAsyncIteratorFixture([0]),
      [0],
      [],
    ],
    [
      createAsyncIteratorFixture([1]),
      [1],
      [1],
    ],
    [
      createAsyncIteratorFixture([1, 1, 1]),
      [1, 0, 1],
      [1, 1],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      [0, 0, 1],
      [3],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5]),
      [0, 1, 1, 1, 0],
      [2, 3, 4],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, -4, 5]),
      [true, true, false, false, false],
      [1, 2]
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, -4, -5]),
      [1, 'true', true, 0, false] as Array<number | boolean>,
      [1, 2, 3],
    ],
  ];
}

function dataProviderForMixedAsync(): Array<[
  Iterable<any> | Iterator<any> | AsyncIterable<any> | AsyncIterator<any>,
  Iterable<number | boolean> | Iterator<number | boolean> | AsyncIterable<number | boolean> | AsyncIterator<number | boolean>,
  Array<any>,
]> {
  return [
    [
      createAsyncIteratorFixture([]),
      createAsyncGeneratorFixture([]),
      [],
    ],
    [
      createAsyncIteratorFixture([0]),
      createAsyncGeneratorFixture([0]),
      [],
    ],
    [
      createAsyncIteratorFixture([1]),
      createAsyncIteratorFixture([1]),
      [1],
    ],
    [
      [1, 1, 1],
      createAsyncIteratorFixture([1, 0, 1]),
      [1, 1],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      createAsyncIterableFixture([0, 0, 1]),
      [3],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      createGeneratorFixture([0, 1, 1, 1, 0]),
      [2, 3, 4],
    ],
    [
      [1, 2, 3, -4, 5],
      createAsyncIterableFixture([true, true, false, false, false]),
      [1, 2]
    ],
    [
      [1, 2, 3, -4, -5],
      createAsyncGeneratorFixture([1, 'true', true, 0, false] as Array<number | boolean>),
      [1, 2, 3],
    ],
  ];
}
