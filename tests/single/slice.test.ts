import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture,
  // @ts-ignore
} from "../fixture";
import { InvalidArgumentError, single } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
] as Array<[Iterable<unknown>|Iterator<unknown>, Array<number>, Array<unknown>]>)(
  "Single Slice Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    config: Array<number>,
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of single.slice(input, ...config)) {
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
  Array<number>,
  Array<unknown>
]>)(
  "Single Slice Async Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    config: Array<number>,
    expected: Array<unknown>
  ) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of single.sliceAsync(input, ...config)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForErrors(),
] as Array<[Array<number>]>)(
  "Single Slice Error Test",
  (config: Array<number>) => {
    it("", () => {
      expect(() => {
        const result = single.slice([1, 2, 3], ...config);

        for (const _ of result) {
          break;
        }
      }).toThrow(InvalidArgumentError);
    });
  }
);

describe.each([
  ...dataProviderForErrors(),
] as Array<[Array<number>]>)(
  "Single Slice Async Error Test",
  (config: Array<number>) => {
    it("", async () => {
      try {
        const result = single.sliceAsync(createAsyncIterableFixture([1, 2, 3]), ...config);

        for await (const _ of result) {
          break;
        }
        expect(false).toBeTruthy();
      } catch (e) {
        expect(e).toBeInstanceOf(InvalidArgumentError);
      }
    });
  }
);

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [],
      [],
      [],
    ],
    [
      [],
      [0],
      [],
    ],
    [
      [],
      [1],
      [],
    ],
    [
      [],
      [0, 0],
      [],
    ],
    [
      [],
      [1, 1],
      [],
    ],
    [
      [],
      [1, 2],
      [],
    ],
    [
      [],
      [1, 2, 1],
      [],
    ],
    [
      [],
      [1, 2, 2],
      [],
    ],
    [
      [],
      [1, 2, 3],
      [],
    ],
    [
      [1],
      [],
      [1],
    ],
    [
      [1],
      [0],
      [1],
    ],
    [
      [1],
      [1],
      [],
    ],
    [
      [1],
      [0, 0],
      [],
    ],
    [
      [1],
      [1, 1],
      [],
    ],
    [
      [1],
      [1, 2],
      [],
    ],
    [
      [1],
      [1, 2, 1],
      [],
    ],
    [
      [1],
      [1, 2, 2],
      [],
    ],
    [
      [1],
      [1, 2, 3],
      [],
    ],
    [
      [1, 2],
      [],
      [1, 2],
    ],
    [
      [1, 2],
      [0],
      [1, 2],
    ],
    [
      [1, 2],
      [1],
      [2],
    ],
    [
      [1, 2],
      [0, 0],
      [],
    ],
    [
      [1, 2],
      [1, 1],
      [2],
    ],
    [
      [1, 2],
      [1, 2],
      [2],
    ],
    [
      [1, 2],
      [1, 2, 1],
      [2],
    ],
    [
      [1, 2],
      [1, 2, 2],
      [2],
    ],
    [
      [1, 2],
      [1, 2, 3],
      [2],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [0],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [1],
      [2, 3, 4, 5, 6],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [0, 0],
      [],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [1, 1],
      [2],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [1, 2],
      [2, 3],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [1, 4],
      [2, 3, 4, 5],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 1],
      [2, 3],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [1, 4, 1],
      [2, 3, 4, 5],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 2],
      [2, 4],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [1, 3, 2],
      [2, 4, 6],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [1, 4, 2],
      [2, 4, 6],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3],
      [2, 5],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [1, 3, 3],
      [2, 5],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [1, 3, 10],
      [2],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [1, undefined, 10],
      [2],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [1, undefined, 3],
      [2, 5],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [0, undefined, 1],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [1, undefined, 1],
      [2, 3, 4, 5, 6],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [1, undefined, 2],
      [2, 4, 6],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [5, undefined, 2],
      [6],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [6, undefined, 2],
      [],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [7, undefined, 2],
      [],
    ],
    [
      ['a', 'b', 'c', 'd', 'e', 'f'],
      [],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      ['a', 'b', 'c', 'd', 'e', 'f'],
      [0],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      ['a', 'b', 'c', 'd', 'e', 'f'],
      [1],
      ['b', 'c', 'd', 'e', 'f'],
    ],
    [
      ['a', 'b', 'c', 'd', 'e', 'f'],
      [0, 0],
      [],
    ],
    [
      ['a', 'b', 'c', 'd', 'e', 'f'],
      [1, 1],
      ['b'],
    ],
    [
      ['a', 'b', 'c', 'd', 'e', 'f'],
      [1, 2],
      ['b', 'c'],
    ],
    [
      ['a', 'b', 'c', 'd', 'e', 'f'],
      [1, 4],
      ['b', 'c', 'd', 'e'],
    ],
    [
      ['a', 'b', 'c', 'd', 'e', 'f'],
      [1, 2, 1],
      ['b', 'c'],
    ],
    [
      ['a', 'b', 'c', 'd', 'e', 'f'],
      [1, 4, 1],
      ['b', 'c', 'd', 'e'],
    ],
    [
      ['a', 'b', 'c', 'd', 'e', 'f'],
      [1, 2, 2],
      ['b', 'd'],
    ],
    [
      ['a', 'b', 'c', 'd', 'e', 'f'],
      [1, 3, 2],
      ['b', 'd', 'f'],
    ],
    [
      ['a', 'b', 'c', 'd', 'e', 'f'],
      [1, 4, 2],
      ['b', 'd', 'f'],
    ],
    [
      ['a', 'b', 'c', 'd', 'e', 'f'],
      [1, 2, 3],
      ['b', 'e'],
    ],
    [
      ['a', 'b', 'c', 'd', 'e', 'f'],
      [1, 3, 3],
      ['b', 'e'],
    ],
    [
      ['a', 'b', 'c', 'd', 'e', 'f'],
      [1, 3, 10],
      ['b'],
    ],
    [
      ['a', 'b', 'c', 'd', 'e', 'f'],
      [1, undefined, 10],
      ['b'],
    ],
    [
      ['a', 'b', 'c', 'd', 'e', 'f'],
      [1, undefined, 3],
      ['b', 'e'],
    ],
    [
      ['a', 'b', 'c', 'd', 'e', 'f'],
      [0, undefined, 1],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      ['a', 'b', 'c', 'd', 'e', 'f'],
      [1, undefined, 1],
      ['b', 'c', 'd', 'e', 'f'],
    ],
    [
      ['a', 'b', 'c', 'd', 'e', 'f'],
      [1, undefined, 2],
      ['b', 'd', 'f'],
    ],
    [
      ['a', 'b', 'c', 'd', 'e', 'f'],
      [5, undefined, 2],
      ['f'],
    ],
    [
      ['a', 'b', 'c', 'd', 'e', 'f'],
      [6, undefined, 2],
      [],
    ],
    [
      ['a', 'b', 'c', 'd', 'e', 'f'],
      [7, undefined, 2],
      [],
    ],
    [
      [[1], [2], [3], [4], [5], [6], [7], [8]],
      [1, 3, 2],
      [[2], [4], [6]],
    ],
    [
      [1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])],
      [0, 4, 2],
      [1, '3', false, 'abc'],
    ],
    [
      [1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])],
      [1, 4, 2],
      [2.2, true, null, [1, 2, 3]],
    ],
    [
      [1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])],
      [7, undefined, 1],
      [[1, 2, 3], new Set([4, 5, 6])],
    ],
    [
      [1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])],
      [7, Infinity, 1],
      [[1, 2, 3], new Set([4, 5, 6])],
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      [],
      [],
    ],
    [
      createGeneratorFixture([]),
      [0],
      [],
    ],
    [
      createGeneratorFixture([]),
      [1],
      [],
    ],
    [
      createGeneratorFixture([]),
      [0, 0],
      [],
    ],
    [
      createGeneratorFixture([]),
      [1, 1],
      [],
    ],
    [
      createGeneratorFixture([]),
      [1, 2],
      [],
    ],
    [
      createGeneratorFixture([]),
      [1, 2, 1],
      [],
    ],
    [
      createGeneratorFixture([]),
      [1, 2, 2],
      [],
    ],
    [
      createGeneratorFixture([]),
      [1, 2, 3],
      [],
    ],
    [
      createGeneratorFixture([1]),
      [],
      [1],
    ],
    [
      createGeneratorFixture([1]),
      [0],
      [1],
    ],
    [
      createGeneratorFixture([1]),
      [1],
      [],
    ],
    [
      createGeneratorFixture([1]),
      [0, 0],
      [],
    ],
    [
      createGeneratorFixture([1]),
      [1, 1],
      [],
    ],
    [
      createGeneratorFixture([1]),
      [1, 2],
      [],
    ],
    [
      createGeneratorFixture([1]),
      [1, 2, 1],
      [],
    ],
    [
      createGeneratorFixture([1]),
      [1, 2, 2],
      [],
    ],
    [
      createGeneratorFixture([1]),
      [1, 2, 3],
      [],
    ],
    [
      createGeneratorFixture([1, 2]),
      [],
      [1, 2],
    ],
    [
      createGeneratorFixture([1, 2]),
      [0],
      [1, 2],
    ],
    [
      createGeneratorFixture([1, 2]),
      [1],
      [2],
    ],
    [
      createGeneratorFixture([1, 2]),
      [0, 0],
      [],
    ],
    [
      createGeneratorFixture([1, 2]),
      [1, 1],
      [2],
    ],
    [
      createGeneratorFixture([1, 2]),
      [1, 2],
      [2],
    ],
    [
      createGeneratorFixture([1, 2]),
      [1, 2, 1],
      [2],
    ],
    [
      createGeneratorFixture([1, 2]),
      [1, 2, 2],
      [2],
    ],
    [
      createGeneratorFixture([1, 2]),
      [1, 2, 3],
      [2],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [0],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1],
      [2, 3, 4, 5, 6],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [0, 0],
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 1],
      [2],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 2],
      [2, 3],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 4],
      [2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 2, 1],
      [2, 3],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 4, 1],
      [2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 2, 2],
      [2, 4],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 3, 2],
      [2, 4, 6],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 4, 2],
      [2, 4, 6],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 2, 3],
      [2, 5],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 3, 3],
      [2, 5],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 3, 10],
      [2],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 10],
      [2],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 3],
      [2, 5],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [0, undefined, 1],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 1],
      [2, 3, 4, 5, 6],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 2],
      [2, 4, 6],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [5, undefined, 2],
      [6],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [6, undefined, 2],
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [7, undefined, 2],
      [],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [0],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1],
      ['b', 'c', 'd', 'e', 'f'],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [0, 0],
      [],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 1],
      ['b'],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2],
      ['b', 'c'],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 4],
      ['b', 'c', 'd', 'e'],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2, 1],
      ['b', 'c'],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 4, 1],
      ['b', 'c', 'd', 'e'],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2, 2],
      ['b', 'd'],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 3, 2],
      ['b', 'd', 'f'],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 4, 2],
      ['b', 'd', 'f'],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2, 3],
      ['b', 'e'],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 3, 3],
      ['b', 'e'],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 3, 10],
      ['b'],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 10],
      ['b'],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 3],
      ['b', 'e'],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [0, undefined, 1],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 1],
      ['b', 'c', 'd', 'e', 'f'],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 2],
      ['b', 'd', 'f'],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [5, undefined, 2],
      ['f'],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [6, undefined, 2],
      [],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [7, undefined, 2],
      [],
    ],
    [
      createGeneratorFixture([[1], [2], [3], [4], [5], [6], [7], [8]]),
      [1, 3, 2],
      [[2], [4], [6]],
    ],
    [
      createGeneratorFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [0, 4, 2],
      [1, '3', false, 'abc'],
    ],
    [
      createGeneratorFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [1, 4, 2],
      [2.2, true, null, [1, 2, 3]],
    ],
    [
      createGeneratorFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [7, undefined, 1],
      [[1, 2, 3], new Set([4, 5, 6])],
    ],
    [
      createGeneratorFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [7, Infinity, 1],
      [[1, 2, 3], new Set([4, 5, 6])],
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      [],
      [],
    ],
    [
      createIterableFixture([]),
      [0],
      [],
    ],
    [
      createIterableFixture([]),
      [1],
      [],
    ],
    [
      createIterableFixture([]),
      [0, 0],
      [],
    ],
    [
      createIterableFixture([]),
      [1, 1],
      [],
    ],
    [
      createIterableFixture([]),
      [1, 2],
      [],
    ],
    [
      createIterableFixture([]),
      [1, 2, 1],
      [],
    ],
    [
      createIterableFixture([]),
      [1, 2, 2],
      [],
    ],
    [
      createIterableFixture([]),
      [1, 2, 3],
      [],
    ],
    [
      createIterableFixture([1]),
      [],
      [1],
    ],
    [
      createIterableFixture([1]),
      [0],
      [1],
    ],
    [
      createIterableFixture([1]),
      [1],
      [],
    ],
    [
      createIterableFixture([1]),
      [0, 0],
      [],
    ],
    [
      createIterableFixture([1]),
      [1, 1],
      [],
    ],
    [
      createIterableFixture([1]),
      [1, 2],
      [],
    ],
    [
      createIterableFixture([1]),
      [1, 2, 1],
      [],
    ],
    [
      createIterableFixture([1]),
      [1, 2, 2],
      [],
    ],
    [
      createIterableFixture([1]),
      [1, 2, 3],
      [],
    ],
    [
      createIterableFixture([1, 2]),
      [],
      [1, 2],
    ],
    [
      createIterableFixture([1, 2]),
      [0],
      [1, 2],
    ],
    [
      createIterableFixture([1, 2]),
      [1],
      [2],
    ],
    [
      createIterableFixture([1, 2]),
      [0, 0],
      [],
    ],
    [
      createIterableFixture([1, 2]),
      [1, 1],
      [2],
    ],
    [
      createIterableFixture([1, 2]),
      [1, 2],
      [2],
    ],
    [
      createIterableFixture([1, 2]),
      [1, 2, 1],
      [2],
    ],
    [
      createIterableFixture([1, 2]),
      [1, 2, 2],
      [2],
    ],
    [
      createIterableFixture([1, 2]),
      [1, 2, 3],
      [2],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6]),
      [],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6]),
      [0],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6]),
      [1],
      [2, 3, 4, 5, 6],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6]),
      [0, 0],
      [],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, 1],
      [2],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, 2],
      [2, 3],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, 4],
      [2, 3, 4, 5],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, 2, 1],
      [2, 3],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, 4, 1],
      [2, 3, 4, 5],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, 2, 2],
      [2, 4],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, 3, 2],
      [2, 4, 6],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, 4, 2],
      [2, 4, 6],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, 2, 3],
      [2, 5],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, 3, 3],
      [2, 5],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, 3, 10],
      [2],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 10],
      [2],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 3],
      [2, 5],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6]),
      [0, undefined, 1],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 1],
      [2, 3, 4, 5, 6],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 2],
      [2, 4, 6],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6]),
      [5, undefined, 2],
      [6],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6]),
      [6, undefined, 2],
      [],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6]),
      [7, undefined, 2],
      [],
    ],
    [
      createIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [0],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1],
      ['b', 'c', 'd', 'e', 'f'],
    ],
    [
      createIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [0, 0],
      [],
    ],
    [
      createIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 1],
      ['b'],
    ],
    [
      createIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2],
      ['b', 'c'],
    ],
    [
      createIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 4],
      ['b', 'c', 'd', 'e'],
    ],
    [
      createIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2, 1],
      ['b', 'c'],
    ],
    [
      createIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 4, 1],
      ['b', 'c', 'd', 'e'],
    ],
    [
      createIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2, 2],
      ['b', 'd'],
    ],
    [
      createIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 3, 2],
      ['b', 'd', 'f'],
    ],
    [
      createIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 4, 2],
      ['b', 'd', 'f'],
    ],
    [
      createIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2, 3],
      ['b', 'e'],
    ],
    [
      createIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 3, 3],
      ['b', 'e'],
    ],
    [
      createIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 3, 10],
      ['b'],
    ],
    [
      createIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 10],
      ['b'],
    ],
    [
      createIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 3],
      ['b', 'e'],
    ],
    [
      createIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [0, undefined, 1],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 1],
      ['b', 'c', 'd', 'e', 'f'],
    ],
    [
      createIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 2],
      ['b', 'd', 'f'],
    ],
    [
      createIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [5, undefined, 2],
      ['f'],
    ],
    [
      createIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [6, undefined, 2],
      [],
    ],
    [
      createIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [7, undefined, 2],
      [],
    ],
    [
      createIterableFixture([[1], [2], [3], [4], [5], [6], [7], [8]]),
      [1, 3, 2],
      [[2], [4], [6]],
    ],
    [
      createIterableFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [0, 4, 2],
      [1, '3', false, 'abc'],
    ],
    [
      createIterableFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [1, 4, 2],
      [2.2, true, null, [1, 2, 3]],
    ],
    [
      createIterableFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [7, undefined, 1],
      [[1, 2, 3], new Set([4, 5, 6])],
    ],
    [
      createIterableFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [7, Infinity, 1],
      [[1, 2, 3], new Set([4, 5, 6])],
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      [],
      [],
    ],
    [
      createIteratorFixture([]),
      [0],
      [],
    ],
    [
      createIteratorFixture([]),
      [1],
      [],
    ],
    [
      createIteratorFixture([]),
      [0, 0],
      [],
    ],
    [
      createIteratorFixture([]),
      [1, 1],
      [],
    ],
    [
      createIteratorFixture([]),
      [1, 2],
      [],
    ],
    [
      createIteratorFixture([]),
      [1, 2, 1],
      [],
    ],
    [
      createIteratorFixture([]),
      [1, 2, 2],
      [],
    ],
    [
      createIteratorFixture([]),
      [1, 2, 3],
      [],
    ],
    [
      createIteratorFixture([1]),
      [],
      [1],
    ],
    [
      createIteratorFixture([1]),
      [0],
      [1],
    ],
    [
      createIteratorFixture([1]),
      [1],
      [],
    ],
    [
      createIteratorFixture([1]),
      [0, 0],
      [],
    ],
    [
      createIteratorFixture([1]),
      [1, 1],
      [],
    ],
    [
      createIteratorFixture([1]),
      [1, 2],
      [],
    ],
    [
      createIteratorFixture([1]),
      [1, 2, 1],
      [],
    ],
    [
      createIteratorFixture([1]),
      [1, 2, 2],
      [],
    ],
    [
      createIteratorFixture([1]),
      [1, 2, 3],
      [],
    ],
    [
      createIteratorFixture([1, 2]),
      [],
      [1, 2],
    ],
    [
      createIteratorFixture([1, 2]),
      [0],
      [1, 2],
    ],
    [
      createIteratorFixture([1, 2]),
      [1],
      [2],
    ],
    [
      createIteratorFixture([1, 2]),
      [0, 0],
      [],
    ],
    [
      createIteratorFixture([1, 2]),
      [1, 1],
      [2],
    ],
    [
      createIteratorFixture([1, 2]),
      [1, 2],
      [2],
    ],
    [
      createIteratorFixture([1, 2]),
      [1, 2, 1],
      [2],
    ],
    [
      createIteratorFixture([1, 2]),
      [1, 2, 2],
      [2],
    ],
    [
      createIteratorFixture([1, 2]),
      [1, 2, 3],
      [2],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6]),
      [],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6]),
      [0],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1],
      [2, 3, 4, 5, 6],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6]),
      [0, 0],
      [],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 1],
      [2],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 2],
      [2, 3],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 4],
      [2, 3, 4, 5],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 2, 1],
      [2, 3],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 4, 1],
      [2, 3, 4, 5],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 2, 2],
      [2, 4],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 3, 2],
      [2, 4, 6],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 4, 2],
      [2, 4, 6],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 2, 3],
      [2, 5],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 3, 3],
      [2, 5],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 3, 10],
      [2],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 10],
      [2],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 3],
      [2, 5],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6]),
      [0, undefined, 1],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 1],
      [2, 3, 4, 5, 6],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 2],
      [2, 4, 6],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6]),
      [5, undefined, 2],
      [6],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6]),
      [6, undefined, 2],
      [],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6]),
      [7, undefined, 2],
      [],
    ],
    [
      createIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [0],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1],
      ['b', 'c', 'd', 'e', 'f'],
    ],
    [
      createIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [0, 0],
      [],
    ],
    [
      createIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 1],
      ['b'],
    ],
    [
      createIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2],
      ['b', 'c'],
    ],
    [
      createIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 4],
      ['b', 'c', 'd', 'e'],
    ],
    [
      createIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2, 1],
      ['b', 'c'],
    ],
    [
      createIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 4, 1],
      ['b', 'c', 'd', 'e'],
    ],
    [
      createIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2, 2],
      ['b', 'd'],
    ],
    [
      createIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 3, 2],
      ['b', 'd', 'f'],
    ],
    [
      createIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 4, 2],
      ['b', 'd', 'f'],
    ],
    [
      createIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2, 3],
      ['b', 'e'],
    ],
    [
      createIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 3, 3],
      ['b', 'e'],
    ],
    [
      createIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 3, 10],
      ['b'],
    ],
    [
      createIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 10],
      ['b'],
    ],
    [
      createIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 3],
      ['b', 'e'],
    ],
    [
      createIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [0, undefined, 1],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 1],
      ['b', 'c', 'd', 'e', 'f'],
    ],
    [
      createIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 2],
      ['b', 'd', 'f'],
    ],
    [
      createIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [5, undefined, 2],
      ['f'],
    ],
    [
      createIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [6, undefined, 2],
      [],
    ],
    [
      createIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [7, undefined, 2],
      [],
    ],
    [
      createIteratorFixture([[1], [2], [3], [4], [5], [6], [7], [8]]),
      [1, 3, 2],
      [[2], [4], [6]],
    ],
    [
      createIteratorFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [0, 4, 2],
      [1, '3', false, 'abc'],
    ],
    [
      createIteratorFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [1, 4, 2],
      [2.2, true, null, [1, 2, 3]],
    ],
    [
      createIteratorFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [7, undefined, 1],
      [[1, 2, 3], new Set([4, 5, 6])],
    ],
    [
      createIteratorFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [7, Infinity, 1],
      [[1, 2, 3], new Set([4, 5, 6])],
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      [],
      [],
    ],
    [
      '',
      [0],
      [],
    ],
    [
      '',
      [1],
      [],
    ],
    [
      '',
      [0, 0],
      [],
    ],
    [
      '',
      [1, 1],
      [],
    ],
    [
      '',
      [1, 2],
      [],
    ],
    [
      '',
      [1, 2, 1],
      [],
    ],
    [
      '',
      [1, 2, 2],
      [],
    ],
    [
      '',
      [1, 2, 3],
      [],
    ],
    [
      '1',
      [],
      ['1'],
    ],
    [
      '1',
      [0],
      ['1'],
    ],
    [
      '1',
      [1],
      [],
    ],
    [
      '1',
      [0, 0],
      [],
    ],
    [
      '1',
      [1, 1],
      [],
    ],
    [
      '1',
      [1, 2],
      [],
    ],
    [
      '1',
      [1, 2, 1],
      [],
    ],
    [
      '1',
      [1, 2, 2],
      [],
    ],
    [
      '1',
      [1, 2, 3],
      [],
    ],
    [
      '12',
      [],
      ['1', '2'],
    ],
    [
      '12',
      [0],
      ['1', '2'],
    ],
    [
      '12',
      [1],
      ['2'],
    ],
    [
      '12',
      [0, 0],
      [],
    ],
    [
      '12',
      [1, 1],
      ['2'],
    ],
    [
      '12',
      [1, 2],
      ['2'],
    ],
    [
      '12',
      [1, 2, 1],
      ['2'],
    ],
    [
      '12',
      [1, 2, 2],
      ['2'],
    ],
    [
      '12',
      [1, 2, 3],
      ['2'],
    ],
    [
      '123456',
      [],
      ['1', '2', '3', '4', '5', '6'],
    ],
    [
      '123456',
      [0],
      ['1', '2', '3', '4', '5', '6'],
    ],
    [
      '123456',
      [1],
      ['2', '3', '4', '5', '6'],
    ],
    [
      '123456',
      [0, 0],
      [],
    ],
    [
      '123456',
      [1, 1],
      ['2'],
    ],
    [
      '123456',
      [1, 2],
      ['2', '3'],
    ],
    [
      '123456',
      [1, 4],
      ['2', '3', '4', '5'],
    ],
    [
      '123456',
      [1, 2, 1],
      ['2', '3'],
    ],
    [
      '123456',
      [1, 4, 1],
      ['2', '3', '4', '5'],
    ],
    [
      '123456',
      [1, 2, 2],
      ['2', '4'],
    ],
    [
      '123456',
      [1, 3, 2],
      ['2', '4', '6'],
    ],
    [
      '123456',
      [1, 4, 2],
      ['2', '4', '6'],
    ],
    [
      '123456',
      [1, 2, 3],
      ['2', '5'],
    ],
    [
      '123456',
      [1, 3, 3],
      ['2', '5'],
    ],
    [
      '123456',
      [1, 3, 10],
      ['2'],
    ],
    [
      '123456',
      [1, undefined, 10],
      ['2'],
    ],
    [
      '123456',
      [1, undefined, 3],
      ['2', '5'],
    ],
    [
      '123456',
      [0, undefined, 1],
      ['1', '2', '3', '4', '5', '6'],
    ],
    [
      '123456',
      [1, undefined, 1],
      ['2', '3', '4', '5', '6'],
    ],
    [
      '123456',
      [1, undefined, 2],
      ['2', '4', '6'],
    ],
    [
      '123456',
      [5, undefined, 2],
      ['6'],
    ],
    [
      '123456',
      [6, undefined, 2],
      [],
    ],
    [
      '123456',
      [7, undefined, 2],
      [],
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([]),
      [],
      [],
    ],
    [
      new Set([]),
      [0],
      [],
    ],
    [
      new Set([]),
      [1],
      [],
    ],
    [
      new Set([]),
      [0, 0],
      [],
    ],
    [
      new Set([]),
      [1, 1],
      [],
    ],
    [
      new Set([]),
      [1, 2],
      [],
    ],
    [
      new Set([]),
      [1, 2, 1],
      [],
    ],
    [
      new Set([]),
      [1, 2, 2],
      [],
    ],
    [
      new Set([]),
      [1, 2, 3],
      [],
    ],
    [
      new Set([1]),
      [],
      [1],
    ],
    [
      new Set([1]),
      [0],
      [1],
    ],
    [
      new Set([1]),
      [1],
      [],
    ],
    [
      new Set([1]),
      [0, 0],
      [],
    ],
    [
      new Set([1]),
      [1, 1],
      [],
    ],
    [
      new Set([1]),
      [1, 2],
      [],
    ],
    [
      new Set([1]),
      [1, 2, 1],
      [],
    ],
    [
      new Set([1]),
      [1, 2, 2],
      [],
    ],
    [
      new Set([1]),
      [1, 2, 3],
      [],
    ],
    [
      new Set([1, 2]),
      [],
      [1, 2],
    ],
    [
      new Set([1, 2]),
      [0],
      [1, 2],
    ],
    [
      new Set([1, 2]),
      [1],
      [2],
    ],
    [
      new Set([1, 2]),
      [0, 0],
      [],
    ],
    [
      new Set([1, 2]),
      [1, 1],
      [2],
    ],
    [
      new Set([1, 2]),
      [1, 2],
      [2],
    ],
    [
      new Set([1, 2]),
      [1, 2, 1],
      [2],
    ],
    [
      new Set([1, 2]),
      [1, 2, 2],
      [2],
    ],
    [
      new Set([1, 2]),
      [1, 2, 3],
      [2],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6]),
      [],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6]),
      [0],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6]),
      [1],
      [2, 3, 4, 5, 6],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6]),
      [0, 0],
      [],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6]),
      [1, 1],
      [2],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6]),
      [1, 2],
      [2, 3],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6]),
      [1, 4],
      [2, 3, 4, 5],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6]),
      [1, 2, 1],
      [2, 3],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6]),
      [1, 4, 1],
      [2, 3, 4, 5],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6]),
      [1, 2, 2],
      [2, 4],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6]),
      [1, 3, 2],
      [2, 4, 6],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6]),
      [1, 4, 2],
      [2, 4, 6],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6]),
      [1, 2, 3],
      [2, 5],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6]),
      [1, 3, 3],
      [2, 5],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6]),
      [1, 3, 10],
      [2],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6]),
      [1, undefined, 10],
      [2],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6]),
      [1, undefined, 3],
      [2, 5],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6]),
      [0, undefined, 1],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6]),
      [1, undefined, 1],
      [2, 3, 4, 5, 6],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6]),
      [1, undefined, 2],
      [2, 4, 6],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6]),
      [5, undefined, 2],
      [6],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6]),
      [6, undefined, 2],
      [],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6]),
      [7, undefined, 2],
      [],
    ],
    [
      new Set(['a', 'b', 'c', 'd', 'e', 'f']),
      [],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      new Set(['a', 'b', 'c', 'd', 'e', 'f']),
      [0],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      new Set(['a', 'b', 'c', 'd', 'e', 'f']),
      [1],
      ['b', 'c', 'd', 'e', 'f'],
    ],
    [
      new Set(['a', 'b', 'c', 'd', 'e', 'f']),
      [0, 0],
      [],
    ],
    [
      new Set(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 1],
      ['b'],
    ],
    [
      new Set(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2],
      ['b', 'c'],
    ],
    [
      new Set(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 4],
      ['b', 'c', 'd', 'e'],
    ],
    [
      new Set(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2, 1],
      ['b', 'c'],
    ],
    [
      new Set(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 4, 1],
      ['b', 'c', 'd', 'e'],
    ],
    [
      new Set(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2, 2],
      ['b', 'd'],
    ],
    [
      new Set(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 3, 2],
      ['b', 'd', 'f'],
    ],
    [
      new Set(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 4, 2],
      ['b', 'd', 'f'],
    ],
    [
      new Set(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2, 3],
      ['b', 'e'],
    ],
    [
      new Set(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 3, 3],
      ['b', 'e'],
    ],
    [
      new Set(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 3, 10],
      ['b'],
    ],
    [
      new Set(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 10],
      ['b'],
    ],
    [
      new Set(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 3],
      ['b', 'e'],
    ],
    [
      new Set(['a', 'b', 'c', 'd', 'e', 'f']),
      [0, undefined, 1],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      new Set(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 1],
      ['b', 'c', 'd', 'e', 'f'],
    ],
    [
      new Set(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 2],
      ['b', 'd', 'f'],
    ],
    [
      new Set(['a', 'b', 'c', 'd', 'e', 'f']),
      [5, undefined, 2],
      ['f'],
    ],
    [
      new Set(['a', 'b', 'c', 'd', 'e', 'f']),
      [6, undefined, 2],
      [],
    ],
    [
      new Set(['a', 'b', 'c', 'd', 'e', 'f']),
      [7, undefined, 2],
      [],
    ],
    [
      new Set([[1], [2], [3], [4], [5], [6], [7], [8]]),
      [1, 3, 2],
      [[2], [4], [6]],
    ],
    [
      new Set([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [0, 4, 2],
      [1, '3', false, 'abc'],
    ],
    [
      new Set([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [1, 4, 2],
      [2.2, true, null, [1, 2, 3]],
    ],
    [
      new Set([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [7, undefined, 1],
      [[1, 2, 3], new Set([4, 5, 6])],
    ],
    [
      new Set([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [7, Infinity, 1],
      [[1, 2, 3], new Set([4, 5, 6])],
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      [],
      [],
    ],
    [
      createMapFixture([]),
      [0],
      [],
    ],
    [
      createMapFixture([]),
      [1],
      [],
    ],
    [
      createMapFixture([]),
      [0, 0],
      [],
    ],
    [
      createMapFixture([]),
      [1, 1],
      [],
    ],
    [
      createMapFixture([]),
      [1, 2],
      [],
    ],
    [
      createMapFixture([]),
      [1, 2, 1],
      [],
    ],
    [
      createMapFixture([]),
      [1, 2, 2],
      [],
    ],
    [
      createMapFixture([]),
      [1, 2, 3],
      [],
    ],
    [
      createMapFixture([1]),
      [],
      [[0, 1]],
    ],
    [
      createMapFixture([1]),
      [0],
      [[0, 1]],
    ],
    [
      createMapFixture([1]),
      [1],
      [],
    ],
    [
      createMapFixture([1]),
      [0, 0],
      [],
    ],
    [
      createMapFixture([1]),
      [1, 1],
      [],
    ],
    [
      createMapFixture([1]),
      [1, 2],
      [],
    ],
    [
      createMapFixture([1]),
      [1, 2, 1],
      [],
    ],
    [
      createMapFixture([1]),
      [1, 2, 2],
      [],
    ],
    [
      createMapFixture([1]),
      [1, 2, 3],
      [],
    ],
    [
      createMapFixture([1, 2]),
      [],
      [[0, 1], [1, 2]],
    ],
    [
      createMapFixture([1, 2]),
      [0],
      [[0, 1], [1, 2]],
    ],
    [
      createMapFixture([1, 2]),
      [1],
      [[1, 2]],
    ],
    [
      createMapFixture([1, 2]),
      [0, 0],
      [],
    ],
    [
      createMapFixture([1, 2]),
      [1, 1],
      [[1, 2]],
    ],
    [
      createMapFixture([1, 2]),
      [1, 2],
      [[1, 2]],
    ],
    [
      createMapFixture([1, 2]),
      [1, 2, 1],
      [[1, 2]],
    ],
    [
      createMapFixture([1, 2]),
      [1, 2, 2],
      [[1, 2]],
    ],
    [
      createMapFixture([1, 2]),
      [1, 2, 3],
      [[1, 2]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6]),
      [],
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6]),
      [0],
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6]),
      [1],
      [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6]),
      [0, 0],
      [],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6]),
      [1, 1],
      [[1, 2]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6]),
      [1, 2],
      [[1, 2], [2, 3]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6]),
      [1, 4],
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6]),
      [1, 2, 1],
      [[1, 2], [2, 3]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6]),
      [1, 4, 1],
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6]),
      [1, 2, 2],
      [[1, 2], [3, 4]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6]),
      [1, 3, 2],
      [[1, 2], [3, 4], [5, 6]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6]),
      [1, 4, 2],
      [[1, 2], [3, 4], [5, 6]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6]),
      [1, 2, 3],
      [[1, 2], [4, 5]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6]),
      [1, 3, 3],
      [[1, 2], [4, 5]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6]),
      [1, 3, 10],
      [[1, 2]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 10],
      [[1, 2]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 3],
      [[1, 2], [4, 5]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6]),
      [0, undefined, 1],
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 1],
      [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 2],
      [[1, 2], [3, 4], [5, 6]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6]),
      [5, undefined, 2],
      [[5, 6]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6]),
      [6, undefined, 2],
      [],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6]),
      [7, undefined, 2],
      [],
    ],
    [
      createMapFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [],
      [[0, 'a'], [1, 'b'], [2, 'c'], [3, 'd'], [4, 'e'], [5, 'f']],
    ],
    [
      createMapFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [0],
      [[0, 'a'], [1, 'b'], [2, 'c'], [3, 'd'], [4, 'e'], [5, 'f']],
    ],
    [
      createMapFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1],
      [[1, 'b'], [2, 'c'], [3, 'd'], [4, 'e'], [5, 'f']],
    ],
    [
      createMapFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [0, 0],
      [],
    ],
    [
      createMapFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 1],
      [[1, 'b']],
    ],
    [
      createMapFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2],
      [[1, 'b'], [2, 'c']],
    ],
    [
      createMapFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 4],
      [[1, 'b'], [2, 'c'], [3, 'd'], [4, 'e']],
    ],
    [
      createMapFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2, 1],
      [[1, 'b'], [2, 'c']],
    ],
    [
      createMapFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 4, 1],
      [[1, 'b'], [2, 'c'], [3, 'd'], [4, 'e']],
    ],
    [
      createMapFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2, 2],
      [[1, 'b'], [3, 'd']],
    ],
    [
      createMapFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 3, 2],
      [[1, 'b'], [3, 'd'], [5, 'f']],
    ],
    [
      createMapFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 4, 2],
      [[1, 'b'], [3, 'd'], [5, 'f']],
    ],
    [
      createMapFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2, 3],
      [[1, 'b'], [4, 'e']],
    ],
    [
      createMapFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 3, 3],
      [[1, 'b'], [4, 'e']],
    ],
    [
      createMapFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 3, 10],
      [[1, 'b']],
    ],
    [
      createMapFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 10],
      [[1, 'b']],
    ],
    [
      createMapFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 3],
      [[1, 'b'], [4, 'e']],
    ],
    [
      createMapFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [0, undefined, 1],
      [[0, 'a'], [1, 'b'], [2, 'c'], [3, 'd'], [4, 'e'], [5, 'f']],
    ],
    [
      createMapFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 1],
      [[1, 'b'], [2, 'c'], [3, 'd'], [4, 'e'], [5, 'f']],
    ],
    [
      createMapFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 2],
      [[1, 'b'], [3, 'd'], [5, 'f']],
    ],
    [
      createMapFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [5, undefined, 2],
      [[5, 'f']],
    ],
    [
      createMapFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [6, undefined, 2],
      [],
    ],
    [
      createMapFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [7, undefined, 2],
      [],
    ],
    [
      createMapFixture([[1], [2], [3], [4], [5], [6], [7], [8]]),
      [1, 3, 2],
      [[1, [2]], [3, [4]], [5, [6]]],
    ],
    [
      createMapFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [0, 4, 2],
      [[0, 1], [2, '3'], [4, false], [6, 'abc']],
    ],
    [
      createMapFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [1, 4, 2],
      [[1, 2.2], [3, true], [5, null], [7, [1, 2, 3]]],
    ],
    [
      createMapFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [7, undefined, 1],
      [[7, [1, 2, 3]], [8, new Set([4, 5, 6])]],
    ],
    [
      createMapFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [7, Infinity, 1],
      [[7, [1, 2, 3]], [8, new Set([4, 5, 6])]],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([]),
      [],
      [],
    ],
    [
      createAsyncGeneratorFixture([]),
      [0],
      [],
    ],
    [
      createAsyncGeneratorFixture([]),
      [1],
      [],
    ],
    [
      createAsyncGeneratorFixture([]),
      [0, 0],
      [],
    ],
    [
      createAsyncGeneratorFixture([]),
      [1, 1],
      [],
    ],
    [
      createAsyncGeneratorFixture([]),
      [1, 2],
      [],
    ],
    [
      createAsyncGeneratorFixture([]),
      [1, 2, 1],
      [],
    ],
    [
      createAsyncGeneratorFixture([]),
      [1, 2, 2],
      [],
    ],
    [
      createAsyncGeneratorFixture([]),
      [1, 2, 3],
      [],
    ],
    [
      createAsyncGeneratorFixture([1]),
      [],
      [1],
    ],
    [
      createAsyncGeneratorFixture([1]),
      [0],
      [1],
    ],
    [
      createAsyncGeneratorFixture([1]),
      [1],
      [],
    ],
    [
      createAsyncGeneratorFixture([1]),
      [0, 0],
      [],
    ],
    [
      createAsyncGeneratorFixture([1]),
      [1, 1],
      [],
    ],
    [
      createAsyncGeneratorFixture([1]),
      [1, 2],
      [],
    ],
    [
      createAsyncGeneratorFixture([1]),
      [1, 2, 1],
      [],
    ],
    [
      createAsyncGeneratorFixture([1]),
      [1, 2, 2],
      [],
    ],
    [
      createAsyncGeneratorFixture([1]),
      [1, 2, 3],
      [],
    ],
    [
      createAsyncGeneratorFixture([1, 2]),
      [],
      [1, 2],
    ],
    [
      createAsyncGeneratorFixture([1, 2]),
      [0],
      [1, 2],
    ],
    [
      createAsyncGeneratorFixture([1, 2]),
      [1],
      [2],
    ],
    [
      createAsyncGeneratorFixture([1, 2]),
      [0, 0],
      [],
    ],
    [
      createAsyncGeneratorFixture([1, 2]),
      [1, 1],
      [2],
    ],
    [
      createAsyncGeneratorFixture([1, 2]),
      [1, 2],
      [2],
    ],
    [
      createAsyncGeneratorFixture([1, 2]),
      [1, 2, 1],
      [2],
    ],
    [
      createAsyncGeneratorFixture([1, 2]),
      [1, 2, 2],
      [2],
    ],
    [
      createAsyncGeneratorFixture([1, 2]),
      [1, 2, 3],
      [2],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [0],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1],
      [2, 3, 4, 5, 6],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [0, 0],
      [],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 1],
      [2],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 2],
      [2, 3],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 4],
      [2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 2, 1],
      [2, 3],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 4, 1],
      [2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 2, 2],
      [2, 4],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 3, 2],
      [2, 4, 6],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 4, 2],
      [2, 4, 6],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 2, 3],
      [2, 5],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 3, 3],
      [2, 5],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 3, 10],
      [2],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 10],
      [2],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 3],
      [2, 5],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [0, undefined, 1],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 1],
      [2, 3, 4, 5, 6],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 2],
      [2, 4, 6],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [5, undefined, 2],
      [6],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [6, undefined, 2],
      [],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
      [7, undefined, 2],
      [],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [0],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1],
      ['b', 'c', 'd', 'e', 'f'],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [0, 0],
      [],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 1],
      ['b'],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2],
      ['b', 'c'],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 4],
      ['b', 'c', 'd', 'e'],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2, 1],
      ['b', 'c'],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 4, 1],
      ['b', 'c', 'd', 'e'],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2, 2],
      ['b', 'd'],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 3, 2],
      ['b', 'd', 'f'],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 4, 2],
      ['b', 'd', 'f'],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2, 3],
      ['b', 'e'],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 3, 3],
      ['b', 'e'],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 3, 10],
      ['b'],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 10],
      ['b'],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 3],
      ['b', 'e'],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [0, undefined, 1],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 1],
      ['b', 'c', 'd', 'e', 'f'],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 2],
      ['b', 'd', 'f'],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [5, undefined, 2],
      ['f'],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [6, undefined, 2],
      [],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [7, undefined, 2],
      [],
    ],
    [
      createAsyncGeneratorFixture([[1], [2], [3], [4], [5], [6], [7], [8]]),
      [1, 3, 2],
      [[2], [4], [6]],
    ],
    [
      createAsyncGeneratorFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [0, 4, 2],
      [1, '3', false, 'abc'],
    ],
    [
      createAsyncGeneratorFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [1, 4, 2],
      [2.2, true, null, [1, 2, 3]],
    ],
    [
      createAsyncGeneratorFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [7, undefined, 1],
      [[1, 2, 3], new Set([4, 5, 6])],
    ],
    [
      createAsyncGeneratorFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [7, Infinity, 1],
      [[1, 2, 3], new Set([4, 5, 6])],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<unknown> {
  return [
    [
      createAsyncIterableFixture([]),
      [],
      [],
    ],
    [
      createAsyncIterableFixture([]),
      [0],
      [],
    ],
    [
      createAsyncIterableFixture([]),
      [1],
      [],
    ],
    [
      createAsyncIterableFixture([]),
      [0, 0],
      [],
    ],
    [
      createAsyncIterableFixture([]),
      [1, 1],
      [],
    ],
    [
      createAsyncIterableFixture([]),
      [1, 2],
      [],
    ],
    [
      createAsyncIterableFixture([]),
      [1, 2, 1],
      [],
    ],
    [
      createAsyncIterableFixture([]),
      [1, 2, 2],
      [],
    ],
    [
      createAsyncIterableFixture([]),
      [1, 2, 3],
      [],
    ],
    [
      createAsyncIterableFixture([1]),
      [],
      [1],
    ],
    [
      createAsyncIterableFixture([1]),
      [0],
      [1],
    ],
    [
      createAsyncIterableFixture([1]),
      [1],
      [],
    ],
    [
      createAsyncIterableFixture([1]),
      [0, 0],
      [],
    ],
    [
      createAsyncIterableFixture([1]),
      [1, 1],
      [],
    ],
    [
      createAsyncIterableFixture([1]),
      [1, 2],
      [],
    ],
    [
      createAsyncIterableFixture([1]),
      [1, 2, 1],
      [],
    ],
    [
      createAsyncIterableFixture([1]),
      [1, 2, 2],
      [],
    ],
    [
      createAsyncIterableFixture([1]),
      [1, 2, 3],
      [],
    ],
    [
      createAsyncIterableFixture([1, 2]),
      [],
      [1, 2],
    ],
    [
      createAsyncIterableFixture([1, 2]),
      [0],
      [1, 2],
    ],
    [
      createAsyncIterableFixture([1, 2]),
      [1],
      [2],
    ],
    [
      createAsyncIterableFixture([1, 2]),
      [0, 0],
      [],
    ],
    [
      createAsyncIterableFixture([1, 2]),
      [1, 1],
      [2],
    ],
    [
      createAsyncIterableFixture([1, 2]),
      [1, 2],
      [2],
    ],
    [
      createAsyncIterableFixture([1, 2]),
      [1, 2, 1],
      [2],
    ],
    [
      createAsyncIterableFixture([1, 2]),
      [1, 2, 2],
      [2],
    ],
    [
      createAsyncIterableFixture([1, 2]),
      [1, 2, 3],
      [2],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
      [],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
      [0],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
      [1],
      [2, 3, 4, 5, 6],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
      [0, 0],
      [],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, 1],
      [2],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, 2],
      [2, 3],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, 4],
      [2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, 2, 1],
      [2, 3],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, 4, 1],
      [2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, 2, 2],
      [2, 4],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, 3, 2],
      [2, 4, 6],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, 4, 2],
      [2, 4, 6],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, 2, 3],
      [2, 5],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, 3, 3],
      [2, 5],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, 3, 10],
      [2],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 10],
      [2],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 3],
      [2, 5],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
      [0, undefined, 1],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 1],
      [2, 3, 4, 5, 6],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 2],
      [2, 4, 6],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
      [5, undefined, 2],
      [6],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
      [6, undefined, 2],
      [],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
      [7, undefined, 2],
      [],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [0],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1],
      ['b', 'c', 'd', 'e', 'f'],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [0, 0],
      [],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 1],
      ['b'],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2],
      ['b', 'c'],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 4],
      ['b', 'c', 'd', 'e'],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2, 1],
      ['b', 'c'],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 4, 1],
      ['b', 'c', 'd', 'e'],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2, 2],
      ['b', 'd'],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 3, 2],
      ['b', 'd', 'f'],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 4, 2],
      ['b', 'd', 'f'],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2, 3],
      ['b', 'e'],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 3, 3],
      ['b', 'e'],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 3, 10],
      ['b'],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 10],
      ['b'],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 3],
      ['b', 'e'],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [0, undefined, 1],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 1],
      ['b', 'c', 'd', 'e', 'f'],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 2],
      ['b', 'd', 'f'],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [5, undefined, 2],
      ['f'],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [6, undefined, 2],
      [],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [7, undefined, 2],
      [],
    ],
    [
      createAsyncIterableFixture([[1], [2], [3], [4], [5], [6], [7], [8]]),
      [1, 3, 2],
      [[2], [4], [6]],
    ],
    [
      createAsyncIterableFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [0, 4, 2],
      [1, '3', false, 'abc'],
    ],
    [
      createAsyncIterableFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [1, 4, 2],
      [2.2, true, null, [1, 2, 3]],
    ],
    [
      createAsyncIterableFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [7, undefined, 1],
      [[1, 2, 3], new Set([4, 5, 6])],
    ],
    [
      createAsyncIterableFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [7, Infinity, 1],
      [[1, 2, 3], new Set([4, 5, 6])],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<unknown> {
  return [
    [
      createAsyncIteratorFixture([]),
      [],
      [],
    ],
    [
      createAsyncIteratorFixture([]),
      [0],
      [],
    ],
    [
      createAsyncIteratorFixture([]),
      [1],
      [],
    ],
    [
      createAsyncIteratorFixture([]),
      [0, 0],
      [],
    ],
    [
      createAsyncIteratorFixture([]),
      [1, 1],
      [],
    ],
    [
      createAsyncIteratorFixture([]),
      [1, 2],
      [],
    ],
    [
      createAsyncIteratorFixture([]),
      [1, 2, 1],
      [],
    ],
    [
      createAsyncIteratorFixture([]),
      [1, 2, 2],
      [],
    ],
    [
      createAsyncIteratorFixture([]),
      [1, 2, 3],
      [],
    ],
    [
      createAsyncIteratorFixture([1]),
      [],
      [1],
    ],
    [
      createAsyncIteratorFixture([1]),
      [0],
      [1],
    ],
    [
      createAsyncIteratorFixture([1]),
      [1],
      [],
    ],
    [
      createAsyncIteratorFixture([1]),
      [0, 0],
      [],
    ],
    [
      createAsyncIteratorFixture([1]),
      [1, 1],
      [],
    ],
    [
      createAsyncIteratorFixture([1]),
      [1, 2],
      [],
    ],
    [
      createAsyncIteratorFixture([1]),
      [1, 2, 1],
      [],
    ],
    [
      createAsyncIteratorFixture([1]),
      [1, 2, 2],
      [],
    ],
    [
      createAsyncIteratorFixture([1]),
      [1, 2, 3],
      [],
    ],
    [
      createAsyncIteratorFixture([1, 2]),
      [],
      [1, 2],
    ],
    [
      createAsyncIteratorFixture([1, 2]),
      [0],
      [1, 2],
    ],
    [
      createAsyncIteratorFixture([1, 2]),
      [1],
      [2],
    ],
    [
      createAsyncIteratorFixture([1, 2]),
      [0, 0],
      [],
    ],
    [
      createAsyncIteratorFixture([1, 2]),
      [1, 1],
      [2],
    ],
    [
      createAsyncIteratorFixture([1, 2]),
      [1, 2],
      [2],
    ],
    [
      createAsyncIteratorFixture([1, 2]),
      [1, 2, 1],
      [2],
    ],
    [
      createAsyncIteratorFixture([1, 2]),
      [1, 2, 2],
      [2],
    ],
    [
      createAsyncIteratorFixture([1, 2]),
      [1, 2, 3],
      [2],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6]),
      [],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6]),
      [0],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1],
      [2, 3, 4, 5, 6],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6]),
      [0, 0],
      [],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 1],
      [2],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 2],
      [2, 3],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 4],
      [2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 2, 1],
      [2, 3],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 4, 1],
      [2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 2, 2],
      [2, 4],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 3, 2],
      [2, 4, 6],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 4, 2],
      [2, 4, 6],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 2, 3],
      [2, 5],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 3, 3],
      [2, 5],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, 3, 10],
      [2],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 10],
      [2],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 3],
      [2, 5],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6]),
      [0, undefined, 1],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 1],
      [2, 3, 4, 5, 6],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6]),
      [1, undefined, 2],
      [2, 4, 6],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6]),
      [5, undefined, 2],
      [6],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6]),
      [6, undefined, 2],
      [],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6]),
      [7, undefined, 2],
      [],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [0],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1],
      ['b', 'c', 'd', 'e', 'f'],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [0, 0],
      [],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 1],
      ['b'],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2],
      ['b', 'c'],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 4],
      ['b', 'c', 'd', 'e'],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2, 1],
      ['b', 'c'],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 4, 1],
      ['b', 'c', 'd', 'e'],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2, 2],
      ['b', 'd'],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 3, 2],
      ['b', 'd', 'f'],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 4, 2],
      ['b', 'd', 'f'],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 2, 3],
      ['b', 'e'],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 3, 3],
      ['b', 'e'],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, 3, 10],
      ['b'],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 10],
      ['b'],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 3],
      ['b', 'e'],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [0, undefined, 1],
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 1],
      ['b', 'c', 'd', 'e', 'f'],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [1, undefined, 2],
      ['b', 'd', 'f'],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [5, undefined, 2],
      ['f'],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [6, undefined, 2],
      [],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c', 'd', 'e', 'f']),
      [7, undefined, 2],
      [],
    ],
    [
      createAsyncIteratorFixture([[1], [2], [3], [4], [5], [6], [7], [8]]),
      [1, 3, 2],
      [[2], [4], [6]],
    ],
    [
      createAsyncIteratorFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [0, 4, 2],
      [1, '3', false, 'abc'],
    ],
    [
      createAsyncIteratorFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [1, 4, 2],
      [2.2, true, null, [1, 2, 3]],
    ],
    [
      createAsyncIteratorFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [7, undefined, 1],
      [[1, 2, 3], new Set([4, 5, 6])],
    ],
    [
      createAsyncIteratorFixture([1, 2.2, '3', true, false, null, 'abc', [1, 2, 3], new Set([4, 5, 6])]),
      [7, Infinity, 1],
      [[1, 2, 3], new Set([4, 5, 6])],
    ],
  ];
}

function dataProviderForErrors(): Array<unknown> {
  return [
    [[-1]],
    [[-2]],
    [[-1, undefined]],
    [[-2, undefined]],
    [[-1, 2]],
    [[-1, undefined, 0]],
    [[-1, 2, 0]],
    [[-1, undefined, 2]],
    [[-1, 2, 2]],
    [[-1, -2, 2]],
    [[-1, 2, -2]],
    [[-1, -2, -2]],
    [[0, -1]],
    [[1, -1]],
    [[0, -2]],
    [[0, -1, 1]],
    [[0, -2, 2]],
    [[0, -1, -1]],
    [[0, undefined, 0]],
    [[0, undefined, -1]],
    [[0, undefined, -2]],
    [[0, 0, 0]],
    [[0, 0, -1]],
    [[0, 0, -2]],
    [[0, 1, 0]],
    [[0, 1, -1]],
    [[0, 1, -2]],
  ];
}
