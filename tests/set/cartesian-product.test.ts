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
import { set } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
  ...dataProviderForMixed(),
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
  ...dataProviderForMixed(),
  ...dataProviderForMixedAsync(),
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
      [[1], []],
      [],
    ],
    [
      [[1], [], []],
      [],
    ],
    [
      [[1], [2], []],
      [],
    ],
    [
      [[1], [], [3]],
      [],
    ],
    [
      [[1, 2], [11, 22, 33], []],
      [],
    ],
    [
      [[1]],
      [[1]],
    ],
    [
      [[1], [2]],
      [[1, 2]],
    ],
    [
      [[1, 2], [11]],
      [[1, 11], [2, 11]],
    ],
    [
      [[1, 1], [11]],
      [[1, 11], [1, 11]],
    ],
    [
      [[1, 2], [11, 22]],
      [[1, 11], [1, 22], [2, 11], [2, 22]],
    ],
    [
      [[1, 2], [11, 22, 33]],
      [[1, 11], [1, 22], [1, 33], [2, 11], [2, 22], [2, 33]],
    ],
    [
      [[1], [11], ['a']],
      [[1, 11, 'a']],
    ],
    [
      [[1, 2], [11], ['a']],
      [[1, 11, 'a'], [2, 11, 'a']],
    ],
    [
      [[1], [11], ['a', 'b']],
      [[1, 11, 'a'], [1, 11, 'b']],
    ],
    [
      [[1, 2], [11, 22], ['a', 'b']],
      [
        [1, 11, 'a'], [1, 11, 'b'], [1, 22, 'a'], [1, 22, 'b'],
        [2, 11, 'a'], [2, 11, 'b'], [2, 22, 'a'], [2, 22, 'b'],
      ],
    ],
    [
      [[1, 2, 3], [11, 22], ['a', 'b']],
      [
        [1, 11, 'a'], [1, 11, 'b'], [1, 22, 'a'], [1, 22, 'b'],
        [2, 11, 'a'], [2, 11, 'b'], [2, 22, 'a'], [2, 22, 'b'],
        [3, 11, 'a'], [3, 11, 'b'], [3, 22, 'a'], [3, 22, 'b'],
      ],
    ],
    [
      [[1, 2, 3], [11, 22], [['a'], []]],
      [
        [1, 11, ['a']], [1, 11, []], [1, 22, ['a']], [1, 22, []],
        [2, 11, ['a']], [2, 11, []], [2, 22, ['a']], [2, 22, []],
        [3, 11, ['a']], [3, 11, []], [3, 22, ['a']], [3, 22, []],
      ],
    ],
    [
      [[1, 2, 3], [11, 22], [['a', 'b'], []]],
      [
        [1, 11, ['a', 'b']], [1, 11, []], [1, 22, ['a', 'b']], [1, 22, []],
        [2, 11, ['a', 'b']], [2, 11, []], [2, 22, ['a', 'b']], [2, 22, []],
        [3, 11, ['a', 'b']], [3, 11, []], [3, 22, ['a', 'b']], [3, 22, []],
      ],
    ],
    [
      [[1, 2, 3], [11, 22], ['a', 'b'], [true, false], [null]],
      [
        [1, 11, 'a', true, null], [1, 11, 'a', false, null],
        [1, 11, 'b', true, null], [1, 11, 'b', false, null],
        [1, 22, 'a', true, null], [1, 22, 'a', false, null],
        [1, 22, 'b', true, null], [1, 22, 'b', false, null],
        [2, 11, 'a', true, null], [2, 11, 'a', false, null],
        [2, 11, 'b', true, null], [2, 11, 'b', false, null],
        [2, 22, 'a', true, null], [2, 22, 'a', false, null],
        [2, 22, 'b', true, null], [2, 22, 'b', false, null],
        [3, 11, 'a', true, null], [3, 11, 'a', false, null],
        [3, 11, 'b', true, null], [3, 11, 'b', false, null],
        [3, 22, 'a', true, null], [3, 22, 'a', false, null],
        [3, 22, 'b', true, null], [3, 22, 'b', false, null],
      ],
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      [],
      [],
    ],
    [
      [createGeneratorFixture([])],
      [],
    ],
    [
      [
        createGeneratorFixture([]),
        createGeneratorFixture([]),
      ],
      [],
    ],
    [
      [
        createGeneratorFixture([]),
        createGeneratorFixture([]),
        createGeneratorFixture([]),
      ],
      [],
    ],
    [
      [
        createGeneratorFixture([1]),
        createGeneratorFixture([]),
      ],
      [],
    ],
    [
      [
        createGeneratorFixture([1]),
        createGeneratorFixture([]),
        createGeneratorFixture([]),
      ],
      [],
    ],
    [
      [
        createGeneratorFixture([1]),
        createGeneratorFixture([2]),
        createGeneratorFixture([]),
      ],
      [],
    ],
    [
      [
        createGeneratorFixture([1]),
        createGeneratorFixture([]),
        createGeneratorFixture([3]),
      ],
      [],
    ],
    [
      [
        createGeneratorFixture([1, 2]),
        createGeneratorFixture([11, 22, 33]),
        createGeneratorFixture([]),
      ],
      [],
    ],
    [
      [createGeneratorFixture([1])],
      [[1]],
    ],
    [
      [
        createGeneratorFixture([1]),
        createGeneratorFixture([2]),
      ],
      [[1, 2]],
    ],
    [
      [
        createGeneratorFixture([1, 2]),
        createGeneratorFixture([11]),
      ],
      [[1, 11], [2, 11]],
    ],
    [
      [
        createGeneratorFixture([1, 1]),
        createGeneratorFixture([11]),
      ],
      [[1, 11], [1, 11]],
    ],
    [
      [
        createGeneratorFixture([1, 2]),
        createGeneratorFixture([11, 22]),
      ],
      [[1, 11], [1, 22], [2, 11], [2, 22]],
    ],
    [
      [
        createGeneratorFixture([1, 2]),
        createGeneratorFixture([11, 22, 33]),
      ],
      [[1, 11], [1, 22], [1, 33], [2, 11], [2, 22], [2, 33]],
    ],
    [
      [
        createGeneratorFixture([1]),
        createGeneratorFixture([11]),
        createGeneratorFixture(['a']),
      ],
      [[1, 11, 'a']],
    ],
    [
      [
        createGeneratorFixture([1, 2]),
        createGeneratorFixture([11]),
        createGeneratorFixture(['a']),
      ],
      [[1, 11, 'a'], [2, 11, 'a']],
    ],
    [
      [
        createGeneratorFixture([1]),
        createGeneratorFixture([11]),
        createGeneratorFixture(['a', 'b']),
      ],
      [[1, 11, 'a'], [1, 11, 'b']],
    ],
    [
      [
        createGeneratorFixture([1, 2]),
        createGeneratorFixture([11, 22]),
        createGeneratorFixture(['a', 'b']),
      ],
      [
        [1, 11, 'a'], [1, 11, 'b'], [1, 22, 'a'], [1, 22, 'b'],
        [2, 11, 'a'], [2, 11, 'b'], [2, 22, 'a'], [2, 22, 'b'],
      ],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([11, 22]),
        createGeneratorFixture(['a', 'b']),
      ],
      [
        [1, 11, 'a'], [1, 11, 'b'], [1, 22, 'a'], [1, 22, 'b'],
        [2, 11, 'a'], [2, 11, 'b'], [2, 22, 'a'], [2, 22, 'b'],
        [3, 11, 'a'], [3, 11, 'b'], [3, 22, 'a'], [3, 22, 'b'],
      ],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([11, 22]),
        createGeneratorFixture([['a'], []]),
      ],
      [
        [1, 11, ['a']], [1, 11, []], [1, 22, ['a']], [1, 22, []],
        [2, 11, ['a']], [2, 11, []], [2, 22, ['a']], [2, 22, []],
        [3, 11, ['a']], [3, 11, []], [3, 22, ['a']], [3, 22, []],
      ],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([11, 22]),
        createGeneratorFixture([['a', 'b'], []]),
      ],
      [
        [1, 11, ['a', 'b']], [1, 11, []], [1, 22, ['a', 'b']], [1, 22, []],
        [2, 11, ['a', 'b']], [2, 11, []], [2, 22, ['a', 'b']], [2, 22, []],
        [3, 11, ['a', 'b']], [3, 11, []], [3, 22, ['a', 'b']], [3, 22, []],
      ],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([11, 22]),
        createGeneratorFixture(['a', 'b']),
        createGeneratorFixture([true, false]),
        createGeneratorFixture([null]),
      ],
      [
        [1, 11, 'a', true, null], [1, 11, 'a', false, null],
        [1, 11, 'b', true, null], [1, 11, 'b', false, null],
        [1, 22, 'a', true, null], [1, 22, 'a', false, null],
        [1, 22, 'b', true, null], [1, 22, 'b', false, null],
        [2, 11, 'a', true, null], [2, 11, 'a', false, null],
        [2, 11, 'b', true, null], [2, 11, 'b', false, null],
        [2, 22, 'a', true, null], [2, 22, 'a', false, null],
        [2, 22, 'b', true, null], [2, 22, 'b', false, null],
        [3, 11, 'a', true, null], [3, 11, 'a', false, null],
        [3, 11, 'b', true, null], [3, 11, 'b', false, null],
        [3, 22, 'a', true, null], [3, 22, 'a', false, null],
        [3, 22, 'b', true, null], [3, 22, 'b', false, null],
      ],
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      [],
      [],
    ],
    [
      [createIterableFixture([])],
      [],
    ],
    [
      [
        createIterableFixture([]),
        createIterableFixture([]),
      ],
      [],
    ],
    [
      [
        createIterableFixture([]),
        createIterableFixture([]),
        createIterableFixture([]),
      ],
      [],
    ],
    [
      [
        createIterableFixture([1]),
        createIterableFixture([]),
      ],
      [],
    ],
    [
      [
        createIterableFixture([1]),
        createIterableFixture([]),
        createIterableFixture([]),
      ],
      [],
    ],
    [
      [
        createIterableFixture([1]),
        createIterableFixture([2]),
        createIterableFixture([]),
      ],
      [],
    ],
    [
      [
        createIterableFixture([1]),
        createIterableFixture([]),
        createIterableFixture([3]),
      ],
      [],
    ],
    [
      [
        createIterableFixture([1, 2]),
        createIterableFixture([11, 22, 33]),
        createIterableFixture([]),
      ],
      [],
    ],
    [
      [createIterableFixture([1])],
      [[1]],
    ],
    [
      [
        createIterableFixture([1]),
        createIterableFixture([2]),
      ],
      [[1, 2]],
    ],
    [
      [
        createIterableFixture([1, 2]),
        createIterableFixture([11]),
      ],
      [[1, 11], [2, 11]],
    ],
    [
      [
        createIterableFixture([1, 1]),
        createIterableFixture([11]),
      ],
      [[1, 11], [1, 11]],
    ],
    [
      [
        createIterableFixture([1, 2]),
        createIterableFixture([11, 22]),
      ],
      [[1, 11], [1, 22], [2, 11], [2, 22]],
    ],
    [
      [
        createIterableFixture([1, 2]),
        createIterableFixture([11, 22, 33]),
      ],
      [[1, 11], [1, 22], [1, 33], [2, 11], [2, 22], [2, 33]],
    ],
    [
      [
        createIterableFixture([1]),
        createIterableFixture([11]),
        createIterableFixture(['a']),
      ],
      [[1, 11, 'a']],
    ],
    [
      [
        createIterableFixture([1, 2]),
        createIterableFixture([11]),
        createIterableFixture(['a']),
      ],
      [[1, 11, 'a'], [2, 11, 'a']],
    ],
    [
      [
        createIterableFixture([1]),
        createIterableFixture([11]),
        createIterableFixture(['a', 'b']),
      ],
      [[1, 11, 'a'], [1, 11, 'b']],
    ],
    [
      [
        createIterableFixture([1, 2]),
        createIterableFixture([11, 22]),
        createIterableFixture(['a', 'b']),
      ],
      [
        [1, 11, 'a'], [1, 11, 'b'], [1, 22, 'a'], [1, 22, 'b'],
        [2, 11, 'a'], [2, 11, 'b'], [2, 22, 'a'], [2, 22, 'b'],
      ],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([11, 22]),
        createIterableFixture(['a', 'b']),
      ],
      [
        [1, 11, 'a'], [1, 11, 'b'], [1, 22, 'a'], [1, 22, 'b'],
        [2, 11, 'a'], [2, 11, 'b'], [2, 22, 'a'], [2, 22, 'b'],
        [3, 11, 'a'], [3, 11, 'b'], [3, 22, 'a'], [3, 22, 'b'],
      ],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([11, 22]),
        createIterableFixture([['a'], []]),
      ],
      [
        [1, 11, ['a']], [1, 11, []], [1, 22, ['a']], [1, 22, []],
        [2, 11, ['a']], [2, 11, []], [2, 22, ['a']], [2, 22, []],
        [3, 11, ['a']], [3, 11, []], [3, 22, ['a']], [3, 22, []],
      ],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([11, 22]),
        createIterableFixture([['a', 'b'], []]),
      ],
      [
        [1, 11, ['a', 'b']], [1, 11, []], [1, 22, ['a', 'b']], [1, 22, []],
        [2, 11, ['a', 'b']], [2, 11, []], [2, 22, ['a', 'b']], [2, 22, []],
        [3, 11, ['a', 'b']], [3, 11, []], [3, 22, ['a', 'b']], [3, 22, []],
      ],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([11, 22]),
        createIterableFixture(['a', 'b']),
        createIterableFixture([true, false]),
        createIterableFixture([null]),
      ],
      [
        [1, 11, 'a', true, null], [1, 11, 'a', false, null],
        [1, 11, 'b', true, null], [1, 11, 'b', false, null],
        [1, 22, 'a', true, null], [1, 22, 'a', false, null],
        [1, 22, 'b', true, null], [1, 22, 'b', false, null],
        [2, 11, 'a', true, null], [2, 11, 'a', false, null],
        [2, 11, 'b', true, null], [2, 11, 'b', false, null],
        [2, 22, 'a', true, null], [2, 22, 'a', false, null],
        [2, 22, 'b', true, null], [2, 22, 'b', false, null],
        [3, 11, 'a', true, null], [3, 11, 'a', false, null],
        [3, 11, 'b', true, null], [3, 11, 'b', false, null],
        [3, 22, 'a', true, null], [3, 22, 'a', false, null],
        [3, 22, 'b', true, null], [3, 22, 'b', false, null],
      ],
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      [],
      [],
    ],
    [
      [createIteratorFixture([])],
      [],
    ],
    [
      [
        createIteratorFixture([]),
        createIteratorFixture([]),
      ],
      [],
    ],
    [
      [
        createIteratorFixture([]),
        createIteratorFixture([]),
        createIteratorFixture([]),
      ],
      [],
    ],
    [
      [
        createIteratorFixture([1]),
        createIteratorFixture([]),
      ],
      [],
    ],
    [
      [
        createIteratorFixture([1]),
        createIteratorFixture([]),
        createIteratorFixture([]),
      ],
      [],
    ],
    [
      [
        createIteratorFixture([1]),
        createIteratorFixture([2]),
        createIteratorFixture([]),
      ],
      [],
    ],
    [
      [
        createIteratorFixture([1]),
        createIteratorFixture([]),
        createIteratorFixture([3]),
      ],
      [],
    ],
    [
      [
        createIteratorFixture([1, 2]),
        createIteratorFixture([11, 22, 33]),
        createIteratorFixture([]),
      ],
      [],
    ],
    [
      [createIteratorFixture([1])],
      [[1]],
    ],
    [
      [
        createIteratorFixture([1]),
        createIteratorFixture([2]),
      ],
      [[1, 2]],
    ],
    [
      [
        createIteratorFixture([1, 2]),
        createIteratorFixture([11]),
      ],
      [[1, 11], [2, 11]],
    ],
    [
      [
        createIteratorFixture([1, 1]),
        createIteratorFixture([11]),
      ],
      [[1, 11], [1, 11]],
    ],
    [
      [
        createIteratorFixture([1, 2]),
        createIteratorFixture([11, 22]),
      ],
      [[1, 11], [1, 22], [2, 11], [2, 22]],
    ],
    [
      [
        createIteratorFixture([1, 2]),
        createIteratorFixture([11, 22, 33]),
      ],
      [[1, 11], [1, 22], [1, 33], [2, 11], [2, 22], [2, 33]],
    ],
    [
      [
        createIteratorFixture([1]),
        createIteratorFixture([11]),
        createIteratorFixture(['a']),
      ],
      [[1, 11, 'a']],
    ],
    [
      [
        createIteratorFixture([1, 2]),
        createIteratorFixture([11]),
        createIteratorFixture(['a']),
      ],
      [[1, 11, 'a'], [2, 11, 'a']],
    ],
    [
      [
        createIteratorFixture([1]),
        createIteratorFixture([11]),
        createIteratorFixture(['a', 'b']),
      ],
      [[1, 11, 'a'], [1, 11, 'b']],
    ],
    [
      [
        createIteratorFixture([1, 2]),
        createIteratorFixture([11, 22]),
        createIteratorFixture(['a', 'b']),
      ],
      [
        [1, 11, 'a'], [1, 11, 'b'], [1, 22, 'a'], [1, 22, 'b'],
        [2, 11, 'a'], [2, 11, 'b'], [2, 22, 'a'], [2, 22, 'b'],
      ],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([11, 22]),
        createIteratorFixture(['a', 'b']),
      ],
      [
        [1, 11, 'a'], [1, 11, 'b'], [1, 22, 'a'], [1, 22, 'b'],
        [2, 11, 'a'], [2, 11, 'b'], [2, 22, 'a'], [2, 22, 'b'],
        [3, 11, 'a'], [3, 11, 'b'], [3, 22, 'a'], [3, 22, 'b'],
      ],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([11, 22]),
        createIteratorFixture([['a'], []]),
      ],
      [
        [1, 11, ['a']], [1, 11, []], [1, 22, ['a']], [1, 22, []],
        [2, 11, ['a']], [2, 11, []], [2, 22, ['a']], [2, 22, []],
        [3, 11, ['a']], [3, 11, []], [3, 22, ['a']], [3, 22, []],
      ],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([11, 22]),
        createIteratorFixture([['a', 'b'], []]),
      ],
      [
        [1, 11, ['a', 'b']], [1, 11, []], [1, 22, ['a', 'b']], [1, 22, []],
        [2, 11, ['a', 'b']], [2, 11, []], [2, 22, ['a', 'b']], [2, 22, []],
        [3, 11, ['a', 'b']], [3, 11, []], [3, 22, ['a', 'b']], [3, 22, []],
      ],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([11, 22]),
        createIteratorFixture(['a', 'b']),
        createIteratorFixture([true, false]),
        createIteratorFixture([null]),
      ],
      [
        [1, 11, 'a', true, null], [1, 11, 'a', false, null],
        [1, 11, 'b', true, null], [1, 11, 'b', false, null],
        [1, 22, 'a', true, null], [1, 22, 'a', false, null],
        [1, 22, 'b', true, null], [1, 22, 'b', false, null],
        [2, 11, 'a', true, null], [2, 11, 'a', false, null],
        [2, 11, 'b', true, null], [2, 11, 'b', false, null],
        [2, 22, 'a', true, null], [2, 22, 'a', false, null],
        [2, 22, 'b', true, null], [2, 22, 'b', false, null],
        [3, 11, 'a', true, null], [3, 11, 'a', false, null],
        [3, 11, 'b', true, null], [3, 11, 'b', false, null],
        [3, 22, 'a', true, null], [3, 22, 'a', false, null],
        [3, 22, 'b', true, null], [3, 22, 'b', false, null],
      ],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<unknown> {
  return [
    [
      [],
      [],
    ],
    [
      [createAsyncGeneratorFixture([])],
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([]),
        createAsyncGeneratorFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([]),
        createAsyncGeneratorFixture([]),
        createAsyncGeneratorFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([1]),
        createAsyncGeneratorFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([1]),
        createAsyncGeneratorFixture([]),
        createAsyncGeneratorFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([1]),
        createAsyncGeneratorFixture([2]),
        createAsyncGeneratorFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([1]),
        createAsyncGeneratorFixture([]),
        createAsyncGeneratorFixture([3]),
      ],
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2]),
        createAsyncGeneratorFixture([11, 22, 33]),
        createAsyncGeneratorFixture([]),
      ],
      [],
    ],
    [
      [createAsyncGeneratorFixture([1])],
      [[1]],
    ],
    [
      [
        createAsyncGeneratorFixture([1]),
        createAsyncGeneratorFixture([2]),
      ],
      [[1, 2]],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2]),
        createAsyncGeneratorFixture([11]),
      ],
      [[1, 11], [2, 11]],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 1]),
        createAsyncGeneratorFixture([11]),
      ],
      [[1, 11], [1, 11]],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2]),
        createAsyncGeneratorFixture([11, 22]),
      ],
      [[1, 11], [1, 22], [2, 11], [2, 22]],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2]),
        createAsyncGeneratorFixture([11, 22, 33]),
      ],
      [[1, 11], [1, 22], [1, 33], [2, 11], [2, 22], [2, 33]],
    ],
    [
      [
        createAsyncGeneratorFixture([1]),
        createAsyncGeneratorFixture([11]),
        createAsyncGeneratorFixture(['a']),
      ],
      [[1, 11, 'a']],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2]),
        createAsyncGeneratorFixture([11]),
        createAsyncGeneratorFixture(['a']),
      ],
      [[1, 11, 'a'], [2, 11, 'a']],
    ],
    [
      [
        createAsyncGeneratorFixture([1]),
        createAsyncGeneratorFixture([11]),
        createAsyncGeneratorFixture(['a', 'b']),
      ],
      [[1, 11, 'a'], [1, 11, 'b']],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2]),
        createAsyncGeneratorFixture([11, 22]),
        createAsyncGeneratorFixture(['a', 'b']),
      ],
      [
        [1, 11, 'a'], [1, 11, 'b'], [1, 22, 'a'], [1, 22, 'b'],
        [2, 11, 'a'], [2, 11, 'b'], [2, 22, 'a'], [2, 22, 'b'],
      ],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture([11, 22]),
        createAsyncGeneratorFixture(['a', 'b']),
      ],
      [
        [1, 11, 'a'], [1, 11, 'b'], [1, 22, 'a'], [1, 22, 'b'],
        [2, 11, 'a'], [2, 11, 'b'], [2, 22, 'a'], [2, 22, 'b'],
        [3, 11, 'a'], [3, 11, 'b'], [3, 22, 'a'], [3, 22, 'b'],
      ],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture([11, 22]),
        createAsyncGeneratorFixture([['a'], []]),
      ],
      [
        [1, 11, ['a']], [1, 11, []], [1, 22, ['a']], [1, 22, []],
        [2, 11, ['a']], [2, 11, []], [2, 22, ['a']], [2, 22, []],
        [3, 11, ['a']], [3, 11, []], [3, 22, ['a']], [3, 22, []],
      ],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture([11, 22]),
        createAsyncGeneratorFixture([['a', 'b'], []]),
      ],
      [
        [1, 11, ['a', 'b']], [1, 11, []], [1, 22, ['a', 'b']], [1, 22, []],
        [2, 11, ['a', 'b']], [2, 11, []], [2, 22, ['a', 'b']], [2, 22, []],
        [3, 11, ['a', 'b']], [3, 11, []], [3, 22, ['a', 'b']], [3, 22, []],
      ],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture([11, 22]),
        createAsyncGeneratorFixture(['a', 'b']),
        createAsyncGeneratorFixture([true, false]),
        createAsyncGeneratorFixture([null]),
      ],
      [
        [1, 11, 'a', true, null], [1, 11, 'a', false, null],
        [1, 11, 'b', true, null], [1, 11, 'b', false, null],
        [1, 22, 'a', true, null], [1, 22, 'a', false, null],
        [1, 22, 'b', true, null], [1, 22, 'b', false, null],
        [2, 11, 'a', true, null], [2, 11, 'a', false, null],
        [2, 11, 'b', true, null], [2, 11, 'b', false, null],
        [2, 22, 'a', true, null], [2, 22, 'a', false, null],
        [2, 22, 'b', true, null], [2, 22, 'b', false, null],
        [3, 11, 'a', true, null], [3, 11, 'a', false, null],
        [3, 11, 'b', true, null], [3, 11, 'b', false, null],
        [3, 22, 'a', true, null], [3, 22, 'a', false, null],
        [3, 22, 'b', true, null], [3, 22, 'b', false, null],
      ],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<unknown> {
  return [
    [
      [],
      [],
    ],
    [
      [createAsyncIterableFixture([])],
      [],
    ],
    [
      [
        createAsyncIterableFixture([]),
        createAsyncIterableFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncIterableFixture([]),
        createAsyncIterableFixture([]),
        createAsyncIterableFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncIterableFixture([1]),
        createAsyncIterableFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncIterableFixture([1]),
        createAsyncIterableFixture([]),
        createAsyncIterableFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncIterableFixture([1]),
        createAsyncIterableFixture([2]),
        createAsyncIterableFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncIterableFixture([1]),
        createAsyncIterableFixture([]),
        createAsyncIterableFixture([3]),
      ],
      [],
    ],
    [
      [
        createAsyncIterableFixture([1, 2]),
        createAsyncIterableFixture([11, 22, 33]),
        createAsyncIterableFixture([]),
      ],
      [],
    ],
    [
      [createAsyncIterableFixture([1])],
      [[1]],
    ],
    [
      [
        createAsyncIterableFixture([1]),
        createAsyncIterableFixture([2]),
      ],
      [[1, 2]],
    ],
    [
      [
        createAsyncIterableFixture([1, 2]),
        createAsyncIterableFixture([11]),
      ],
      [[1, 11], [2, 11]],
    ],
    [
      [
        createAsyncIterableFixture([1, 1]),
        createAsyncIterableFixture([11]),
      ],
      [[1, 11], [1, 11]],
    ],
    [
      [
        createAsyncIterableFixture([1, 2]),
        createAsyncIterableFixture([11, 22]),
      ],
      [[1, 11], [1, 22], [2, 11], [2, 22]],
    ],
    [
      [
        createAsyncIterableFixture([1, 2]),
        createAsyncIterableFixture([11, 22, 33]),
      ],
      [[1, 11], [1, 22], [1, 33], [2, 11], [2, 22], [2, 33]],
    ],
    [
      [
        createAsyncIterableFixture([1]),
        createAsyncIterableFixture([11]),
        createAsyncIterableFixture(['a']),
      ],
      [[1, 11, 'a']],
    ],
    [
      [
        createAsyncIterableFixture([1, 2]),
        createAsyncIterableFixture([11]),
        createAsyncIterableFixture(['a']),
      ],
      [[1, 11, 'a'], [2, 11, 'a']],
    ],
    [
      [
        createAsyncIterableFixture([1]),
        createAsyncIterableFixture([11]),
        createAsyncIterableFixture(['a', 'b']),
      ],
      [[1, 11, 'a'], [1, 11, 'b']],
    ],
    [
      [
        createAsyncIterableFixture([1, 2]),
        createAsyncIterableFixture([11, 22]),
        createAsyncIterableFixture(['a', 'b']),
      ],
      [
        [1, 11, 'a'], [1, 11, 'b'], [1, 22, 'a'], [1, 22, 'b'],
        [2, 11, 'a'], [2, 11, 'b'], [2, 22, 'a'], [2, 22, 'b'],
      ],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture([11, 22]),
        createAsyncIterableFixture(['a', 'b']),
      ],
      [
        [1, 11, 'a'], [1, 11, 'b'], [1, 22, 'a'], [1, 22, 'b'],
        [2, 11, 'a'], [2, 11, 'b'], [2, 22, 'a'], [2, 22, 'b'],
        [3, 11, 'a'], [3, 11, 'b'], [3, 22, 'a'], [3, 22, 'b'],
      ],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture([11, 22]),
        createAsyncIterableFixture([['a'], []]),
      ],
      [
        [1, 11, ['a']], [1, 11, []], [1, 22, ['a']], [1, 22, []],
        [2, 11, ['a']], [2, 11, []], [2, 22, ['a']], [2, 22, []],
        [3, 11, ['a']], [3, 11, []], [3, 22, ['a']], [3, 22, []],
      ],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture([11, 22]),
        createAsyncIterableFixture([['a', 'b'], []]),
      ],
      [
        [1, 11, ['a', 'b']], [1, 11, []], [1, 22, ['a', 'b']], [1, 22, []],
        [2, 11, ['a', 'b']], [2, 11, []], [2, 22, ['a', 'b']], [2, 22, []],
        [3, 11, ['a', 'b']], [3, 11, []], [3, 22, ['a', 'b']], [3, 22, []],
      ],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture([11, 22]),
        createAsyncIterableFixture(['a', 'b']),
        createAsyncIterableFixture([true, false]),
        createAsyncIterableFixture([null]),
      ],
      [
        [1, 11, 'a', true, null], [1, 11, 'a', false, null],
        [1, 11, 'b', true, null], [1, 11, 'b', false, null],
        [1, 22, 'a', true, null], [1, 22, 'a', false, null],
        [1, 22, 'b', true, null], [1, 22, 'b', false, null],
        [2, 11, 'a', true, null], [2, 11, 'a', false, null],
        [2, 11, 'b', true, null], [2, 11, 'b', false, null],
        [2, 22, 'a', true, null], [2, 22, 'a', false, null],
        [2, 22, 'b', true, null], [2, 22, 'b', false, null],
        [3, 11, 'a', true, null], [3, 11, 'a', false, null],
        [3, 11, 'b', true, null], [3, 11, 'b', false, null],
        [3, 22, 'a', true, null], [3, 22, 'a', false, null],
        [3, 22, 'b', true, null], [3, 22, 'b', false, null],
      ],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<unknown> {
  return [
    [
      [],
      [],
    ],
    [
      [createAsyncIteratorFixture([])],
      [],
    ],
    [
      [
        createAsyncIteratorFixture([]),
        createAsyncIteratorFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncIteratorFixture([]),
        createAsyncIteratorFixture([]),
        createAsyncIteratorFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncIteratorFixture([1]),
        createAsyncIteratorFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncIteratorFixture([1]),
        createAsyncIteratorFixture([]),
        createAsyncIteratorFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncIteratorFixture([1]),
        createAsyncIteratorFixture([2]),
        createAsyncIteratorFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncIteratorFixture([1]),
        createAsyncIteratorFixture([]),
        createAsyncIteratorFixture([3]),
      ],
      [],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2]),
        createAsyncIteratorFixture([11, 22, 33]),
        createAsyncIteratorFixture([]),
      ],
      [],
    ],
    [
      [createAsyncIteratorFixture([1])],
      [[1]],
    ],
    [
      [
        createAsyncIteratorFixture([1]),
        createAsyncIteratorFixture([2]),
      ],
      [[1, 2]],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2]),
        createAsyncIteratorFixture([11]),
      ],
      [[1, 11], [2, 11]],
    ],
    [
      [
        createAsyncIteratorFixture([1, 1]),
        createAsyncIteratorFixture([11]),
      ],
      [[1, 11], [1, 11]],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2]),
        createAsyncIteratorFixture([11, 22]),
      ],
      [[1, 11], [1, 22], [2, 11], [2, 22]],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2]),
        createAsyncIteratorFixture([11, 22, 33]),
      ],
      [[1, 11], [1, 22], [1, 33], [2, 11], [2, 22], [2, 33]],
    ],
    [
      [
        createAsyncIteratorFixture([1]),
        createAsyncIteratorFixture([11]),
        createAsyncIteratorFixture(['a']),
      ],
      [[1, 11, 'a']],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2]),
        createAsyncIteratorFixture([11]),
        createAsyncIteratorFixture(['a']),
      ],
      [[1, 11, 'a'], [2, 11, 'a']],
    ],
    [
      [
        createAsyncIteratorFixture([1]),
        createAsyncIteratorFixture([11]),
        createAsyncIteratorFixture(['a', 'b']),
      ],
      [[1, 11, 'a'], [1, 11, 'b']],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2]),
        createAsyncIteratorFixture([11, 22]),
        createAsyncIteratorFixture(['a', 'b']),
      ],
      [
        [1, 11, 'a'], [1, 11, 'b'], [1, 22, 'a'], [1, 22, 'b'],
        [2, 11, 'a'], [2, 11, 'b'], [2, 22, 'a'], [2, 22, 'b'],
      ],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture([11, 22]),
        createAsyncIteratorFixture(['a', 'b']),
      ],
      [
        [1, 11, 'a'], [1, 11, 'b'], [1, 22, 'a'], [1, 22, 'b'],
        [2, 11, 'a'], [2, 11, 'b'], [2, 22, 'a'], [2, 22, 'b'],
        [3, 11, 'a'], [3, 11, 'b'], [3, 22, 'a'], [3, 22, 'b'],
      ],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture([11, 22]),
        createAsyncIteratorFixture([['a'], []]),
      ],
      [
        [1, 11, ['a']], [1, 11, []], [1, 22, ['a']], [1, 22, []],
        [2, 11, ['a']], [2, 11, []], [2, 22, ['a']], [2, 22, []],
        [3, 11, ['a']], [3, 11, []], [3, 22, ['a']], [3, 22, []],
      ],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture([11, 22]),
        createAsyncIteratorFixture([['a', 'b'], []]),
      ],
      [
        [1, 11, ['a', 'b']], [1, 11, []], [1, 22, ['a', 'b']], [1, 22, []],
        [2, 11, ['a', 'b']], [2, 11, []], [2, 22, ['a', 'b']], [2, 22, []],
        [3, 11, ['a', 'b']], [3, 11, []], [3, 22, ['a', 'b']], [3, 22, []],
      ],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture([11, 22]),
        createAsyncIteratorFixture(['a', 'b']),
        createAsyncIteratorFixture([true, false]),
        createAsyncIteratorFixture([null]),
      ],
      [
        [1, 11, 'a', true, null], [1, 11, 'a', false, null],
        [1, 11, 'b', true, null], [1, 11, 'b', false, null],
        [1, 22, 'a', true, null], [1, 22, 'a', false, null],
        [1, 22, 'b', true, null], [1, 22, 'b', false, null],
        [2, 11, 'a', true, null], [2, 11, 'a', false, null],
        [2, 11, 'b', true, null], [2, 11, 'b', false, null],
        [2, 22, 'a', true, null], [2, 22, 'a', false, null],
        [2, 22, 'b', true, null], [2, 22, 'b', false, null],
        [3, 11, 'a', true, null], [3, 11, 'a', false, null],
        [3, 11, 'b', true, null], [3, 11, 'b', false, null],
        [3, 22, 'a', true, null], [3, 22, 'a', false, null],
        [3, 22, 'b', true, null], [3, 22, 'b', false, null],
      ],
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      ['a', ''],
      [],
    ],
    [
      ['a', 'b'],
      [['a', 'b']],
    ],
    [
      ['a', 'b', 'c'],
      [['a', 'b', 'c']],
    ],
    [
      ['ab', ''],
      [],
    ],
    [
      ['ab', '12', ''],
      [],
    ],
    [
      ['aa', '1'],
      [['a', '1'], ['a', '1']],
    ],
    [
      ['ab', '1'],
      [['a', '1'], ['b', '1']],
    ],
    [
      ['ab', '12'],
      [['a', '1'], ['a', '2'], ['b', '1'], ['b', '2']],
    ],
    [
      ['aaa', '11'],
      [['a', '1'], ['a', '1'], ['a', '1'], ['a', '1'], ['a', '1'], ['a', '1']],
    ],
    [
      ['ab', '12', '0'],
      [['a', '1', '0'], ['a', '2', '0'], ['b', '1', '0'], ['b', '2', '0']],
    ],
    [
      ['ab', '12', '!?*'],
      [
        ['a', '1', '!'],
        ['a', '1', '?'],
        ['a', '1', '*'],
        ['a', '2', '!'],
        ['a', '2', '?'],
        ['a', '2', '*'],
        ['b', '1', '!'],
        ['b', '1', '?'],
        ['b', '1', '*'],
        ['b', '2', '!'],
        ['b', '2', '?'],
        ['b', '2', '*'],
      ],
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      [],
      [],
    ],
    [
      [new Set([])],
      [],
    ],
    [
      [
        new Set([]),
        new Set([]),
      ],
      [],
    ],
    [
      [
        new Set([]),
        new Set([]),
        new Set([]),
      ],
      [],
    ],
    [
      [
        new Set([1]),
        new Set([]),
      ],
      [],
    ],
    [
      [
        new Set([1]),
        new Set([]),
        new Set([]),
      ],
      [],
    ],
    [
      [
        new Set([1]),
        new Set([2]),
        new Set([]),
      ],
      [],
    ],
    [
      [
        new Set([1]),
        new Set([]),
        new Set([3]),
      ],
      [],
    ],
    [
      [
        new Set([1, 2]),
        new Set([11, 22, 33]),
        new Set([]),
      ],
      [],
    ],
    [
      [new Set([1])],
      [[1]],
    ],
    [
      [
        new Set([1]),
        new Set([2]),
      ],
      [[1, 2]],
    ],
    [
      [
        new Set([1, 2]),
        new Set([11]),
      ],
      [[1, 11], [2, 11]],
    ],
    [
      [
        new Set([1, 2]),
        new Set([11, 22]),
      ],
      [[1, 11], [1, 22], [2, 11], [2, 22]],
    ],
    [
      [
        new Set([1, 2]),
        new Set([11, 22, 33]),
      ],
      [[1, 11], [1, 22], [1, 33], [2, 11], [2, 22], [2, 33]],
    ],
    [
      [
        new Set([1]),
        new Set([11]),
        new Set(['a']),
      ],
      [[1, 11, 'a']],
    ],
    [
      [
        new Set([1, 2]),
        new Set([11]),
        new Set(['a']),
      ],
      [[1, 11, 'a'], [2, 11, 'a']],
    ],
    [
      [
        new Set([1]),
        new Set([11]),
        new Set(['a', 'b']),
      ],
      [[1, 11, 'a'], [1, 11, 'b']],
    ],
    [
      [
        new Set([1, 2]),
        new Set([11, 22]),
        new Set(['a', 'b']),
      ],
      [
        [1, 11, 'a'], [1, 11, 'b'], [1, 22, 'a'], [1, 22, 'b'],
        [2, 11, 'a'], [2, 11, 'b'], [2, 22, 'a'], [2, 22, 'b'],
      ],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([11, 22]),
        new Set(['a', 'b']),
      ],
      [
        [1, 11, 'a'], [1, 11, 'b'], [1, 22, 'a'], [1, 22, 'b'],
        [2, 11, 'a'], [2, 11, 'b'], [2, 22, 'a'], [2, 22, 'b'],
        [3, 11, 'a'], [3, 11, 'b'], [3, 22, 'a'], [3, 22, 'b'],
      ],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([11, 22]),
        new Set([['a'], []]),
      ],
      [
        [1, 11, ['a']], [1, 11, []], [1, 22, ['a']], [1, 22, []],
        [2, 11, ['a']], [2, 11, []], [2, 22, ['a']], [2, 22, []],
        [3, 11, ['a']], [3, 11, []], [3, 22, ['a']], [3, 22, []],
      ],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([11, 22]),
        new Set([['a', 'b'], []]),
      ],
      [
        [1, 11, ['a', 'b']], [1, 11, []], [1, 22, ['a', 'b']], [1, 22, []],
        [2, 11, ['a', 'b']], [2, 11, []], [2, 22, ['a', 'b']], [2, 22, []],
        [3, 11, ['a', 'b']], [3, 11, []], [3, 22, ['a', 'b']], [3, 22, []],
      ],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([11, 22]),
        new Set(['a', 'b']),
        new Set([true, false]),
        new Set([null]),
      ],
      [
        [1, 11, 'a', true, null], [1, 11, 'a', false, null],
        [1, 11, 'b', true, null], [1, 11, 'b', false, null],
        [1, 22, 'a', true, null], [1, 22, 'a', false, null],
        [1, 22, 'b', true, null], [1, 22, 'b', false, null],
        [2, 11, 'a', true, null], [2, 11, 'a', false, null],
        [2, 11, 'b', true, null], [2, 11, 'b', false, null],
        [2, 22, 'a', true, null], [2, 22, 'a', false, null],
        [2, 22, 'b', true, null], [2, 22, 'b', false, null],
        [3, 11, 'a', true, null], [3, 11, 'a', false, null],
        [3, 11, 'b', true, null], [3, 11, 'b', false, null],
        [3, 22, 'a', true, null], [3, 22, 'a', false, null],
        [3, 22, 'b', true, null], [3, 22, 'b', false, null],
      ],
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      [],
      [],
    ],
    [
      [createMapFixture([])],
      [],
    ],
    [
      [
        createMapFixture([]),
        createMapFixture([]),
      ],
      [],
    ],
    [
      [
        createMapFixture([]),
        createMapFixture([]),
        createMapFixture([]),
      ],
      [],
    ],
    [
      [
        createMapFixture([1]),
        createMapFixture([]),
      ],
      [],
    ],
    [
      [
        createMapFixture([1]),
        createMapFixture([]),
        createMapFixture([]),
      ],
      [],
    ],
    [
      [
        createMapFixture([1]),
        createMapFixture([2]),
        createMapFixture([]),
      ],
      [],
    ],
    [
      [
        createMapFixture([1]),
        createMapFixture([]),
        createMapFixture([3]),
      ],
      [],
    ],
    [
      [
        createMapFixture([1, 2]),
        createMapFixture([11, 22, 33]),
        createMapFixture([]),
      ],
      [],
    ],
    [
      [createMapFixture([1])],
      [[[0, 1]]],
    ],
    [
      [
        createMapFixture([1]),
        createMapFixture([2]),
      ],
      [[[0, 1], [0, 2]]],
    ],
    [
      [
        createMapFixture([1, 2]),
        createMapFixture([11]),
      ],
      [[[0, 1], [0, 11]], [[1, 2], [0, 11]]],
    ],
    [
      [
        createMapFixture([1, 1]),
        createMapFixture([11]),
      ],
      [[[0, 1], [0, 11]], [[1, 1], [0, 11]]],
    ],
    [
      [
        createMapFixture([1, 2]),
        createMapFixture([11, 22]),
      ],
      [[[0, 1], [0, 11]], [[0, 1], [1, 22]], [[1, 2], [0, 11]], [[1, 2], [1, 22]]],
    ],
    [
      [
        createMapFixture([1, 2]),
        createMapFixture([11, 22, 33]),
      ],
      [[[0, 1], [0, 11]], [[0, 1], [1, 22]], [[0, 1], [2, 33]], [[1, 2], [0, 11]], [[1, 2], [1, 22]], [[1, 2], [2, 33]]],
    ],
    [
      [
        createMapFixture([1]),
        createMapFixture([11]),
        createMapFixture(['a']),
      ],
      [[[0, 1], [0, 11], [0, 'a']]],
    ],
    [
      [
        createMapFixture([1, 2]),
        createMapFixture([11]),
        createMapFixture(['a']),
      ],
      [[[0, 1], [0, 11], [0, 'a']], [[1, 2], [0, 11], [0, 'a']]],
    ],
    [
      [
        createMapFixture([1]),
        createMapFixture([11]),
        createMapFixture(['a', 'b']),
      ],
      [[[0, 1], [0, 11], [0, 'a']], [[0, 1], [0, 11], [1, 'b']]],
    ],
    [
      [
        createMapFixture([1, 2]),
        createMapFixture([11, 22]),
        createMapFixture(['a', 'b']),
      ],
      [
        [[0, 1], [0, 11], [0, 'a']], [[0, 1], [0, 11], [1, 'b']],
        [[0, 1], [1, 22], [0, 'a']], [[0, 1], [1, 22], [1, 'b']],
        [[1, 2], [0, 11], [0, 'a']], [[1, 2], [0, 11], [1, 'b']],
        [[1, 2], [1, 22], [0, 'a']], [[1, 2], [1, 22], [1, 'b']],
      ],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture([11, 22]),
        createMapFixture(['a', 'b']),
      ],
      [
        [[0, 1], [0, 11], [0, 'a']], [[0, 1], [0, 11], [1, 'b']],
        [[0, 1], [1, 22], [0, 'a']], [[0, 1], [1, 22], [1, 'b']],
        [[1, 2], [0, 11], [0, 'a']], [[1, 2], [0, 11], [1, 'b']],
        [[1, 2], [1, 22], [0, 'a']], [[1, 2], [1, 22], [1, 'b']],
        [[2, 3], [0, 11], [0, 'a']], [[2, 3], [0, 11], [1, 'b']],
        [[2, 3], [1, 22], [0, 'a']], [[2, 3], [1, 22], [1, 'b']],
      ],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture([11, 22]),
        createMapFixture([['a'], []]),
      ],
      [
        [[0, 1], [0, 11], [0, ['a']]], [[0, 1], [0, 11], [1, []]],
        [[0, 1], [1, 22], [0, ['a']]], [[0, 1], [1, 22], [1, []]],
        [[1, 2], [0, 11], [0, ['a']]], [[1, 2], [0, 11], [1, []]],
        [[1, 2], [1, 22], [0, ['a']]], [[1, 2], [1, 22], [1, []]],
        [[2, 3], [0, 11], [0, ['a']]], [[2, 3], [0, 11], [1, []]],
        [[2, 3], [1, 22], [0, ['a']]], [[2, 3], [1, 22], [1, []]],
      ],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture([11, 22]),
        createMapFixture([['a', 'b'], []]),
      ],
      [
        [[0, 1], [0, 11], [0, ['a', 'b']]],
        [[0, 1], [0, 11], [1, []]],
        [[0, 1], [1, 22], [0, ['a', 'b']]],
        [[0, 1], [1, 22], [1, []]],
        [[1, 2], [0, 11], [0, ['a', 'b']]],
        [[1, 2], [0, 11], [1, []]],
        [[1, 2], [1, 22], [0, ['a', 'b']]],
        [[1, 2], [1, 22], [1, []]],
        [[2, 3], [0, 11], [0, ['a', 'b']]],
        [[2, 3], [0, 11], [1, []]],
        [[2, 3], [1, 22], [0, ['a', 'b']]],
        [[2, 3], [1, 22], [1, []]],
      ],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture([11, 22]),
        createMapFixture(['a', 'b']),
        createMapFixture([true, false]),
        createMapFixture([null]),
      ],
      [
        [[0, 1], [0, 11], [0, 'a'], [0, true], [0, null]],
        [[0, 1], [0, 11], [0, 'a'], [1, false], [0, null]],
        [[0, 1], [0, 11], [1, 'b'], [0, true], [0, null]],
        [[0, 1], [0, 11], [1, 'b'], [1, false], [0, null]],
        [[0, 1], [1, 22], [0, 'a'], [0, true], [0, null]],
        [[0, 1], [1, 22], [0, 'a'], [1, false], [0, null]],
        [[0, 1], [1, 22], [1, 'b'], [0, true], [0, null]],
        [[0, 1], [1, 22], [1, 'b'], [1, false], [0, null]],
        [[1, 2], [0, 11], [0, 'a'], [0, true], [0, null]],
        [[1, 2], [0, 11], [0, 'a'], [1, false], [0, null]],
        [[1, 2], [0, 11], [1, 'b'], [0, true], [0, null]],
        [[1, 2], [0, 11], [1, 'b'], [1, false], [0, null]],
        [[1, 2], [1, 22], [0, 'a'], [0, true], [0, null]],
        [[1, 2], [1, 22], [0, 'a'], [1, false], [0, null]],
        [[1, 2], [1, 22], [1, 'b'], [0, true], [0, null]],
        [[1, 2], [1, 22], [1, 'b'], [1, false], [0, null]],
        [[2, 3], [0, 11], [0, 'a'], [0, true], [0, null]],
        [[2, 3], [0, 11], [0, 'a'], [1, false], [0, null]],
        [[2, 3], [0, 11], [1, 'b'], [0, true], [0, null]],
        [[2, 3], [0, 11], [1, 'b'], [1, false], [0, null]],
        [[2, 3], [1, 22], [0, 'a'], [0, true], [0, null]],
        [[2, 3], [1, 22], [0, 'a'], [1, false], [0, null]],
        [[2, 3], [1, 22], [1, 'b'], [0, true], [0, null]],
        [[2, 3], [1, 22], [1, 'b'], [1, false], [0, null]],
      ],
    ],
  ];
}

function dataProviderForMixed(): Array<unknown> {
  return [
    [
      [
        [1, 2, 3],
        createGeneratorFixture([11, 22]),
        createIterableFixture(['a', 'b']),
        createIteratorFixture([true, false]),
        new Set([null]),
      ],
      [
        [1, 11, 'a', true, null], [1, 11, 'a', false, null],
        [1, 11, 'b', true, null], [1, 11, 'b', false, null],
        [1, 22, 'a', true, null], [1, 22, 'a', false, null],
        [1, 22, 'b', true, null], [1, 22, 'b', false, null],
        [2, 11, 'a', true, null], [2, 11, 'a', false, null],
        [2, 11, 'b', true, null], [2, 11, 'b', false, null],
        [2, 22, 'a', true, null], [2, 22, 'a', false, null],
        [2, 22, 'b', true, null], [2, 22, 'b', false, null],
        [3, 11, 'a', true, null], [3, 11, 'a', false, null],
        [3, 11, 'b', true, null], [3, 11, 'b', false, null],
        [3, 22, 'a', true, null], [3, 22, 'a', false, null],
        [3, 22, 'b', true, null], [3, 22, 'b', false, null],
      ],
    ],
    [
      [
        '123',
        createIterableFixture([11, 22]),
        ['a', 'b'],
        createGeneratorFixture([true, false]),
        new Set([null]),
      ],
      [
        ['1', 11, 'a', true, null], ['1', 11, 'a', false, null],
        ['1', 11, 'b', true, null], ['1', 11, 'b', false, null],
        ['1', 22, 'a', true, null], ['1', 22, 'a', false, null],
        ['1', 22, 'b', true, null], ['1', 22, 'b', false, null],
        ['2', 11, 'a', true, null], ['2', 11, 'a', false, null],
        ['2', 11, 'b', true, null], ['2', 11, 'b', false, null],
        ['2', 22, 'a', true, null], ['2', 22, 'a', false, null],
        ['2', 22, 'b', true, null], ['2', 22, 'b', false, null],
        ['3', 11, 'a', true, null], ['3', 11, 'a', false, null],
        ['3', 11, 'b', true, null], ['3', 11, 'b', false, null],
        ['3', 22, 'a', true, null], ['3', 22, 'a', false, null],
        ['3', 22, 'b', true, null], ['3', 22, 'b', false, null],
      ],
    ],
  ];
}

function dataProviderForMixedAsync(): Array<unknown> {
  return [
    [
      [
        [1, 2, 3],
        createAsyncGeneratorFixture([11, 22]),
        createIterableFixture(['a', 'b']),
        createAsyncIterableFixture([true, false]),
        new Set([null]),
      ],
      [
        [1, 11, 'a', true, null], [1, 11, 'a', false, null],
        [1, 11, 'b', true, null], [1, 11, 'b', false, null],
        [1, 22, 'a', true, null], [1, 22, 'a', false, null],
        [1, 22, 'b', true, null], [1, 22, 'b', false, null],
        [2, 11, 'a', true, null], [2, 11, 'a', false, null],
        [2, 11, 'b', true, null], [2, 11, 'b', false, null],
        [2, 22, 'a', true, null], [2, 22, 'a', false, null],
        [2, 22, 'b', true, null], [2, 22, 'b', false, null],
        [3, 11, 'a', true, null], [3, 11, 'a', false, null],
        [3, 11, 'b', true, null], [3, 11, 'b', false, null],
        [3, 22, 'a', true, null], [3, 22, 'a', false, null],
        [3, 22, 'b', true, null], [3, 22, 'b', false, null],
      ],
    ],
    [
      [
        '123',
        createAsyncIteratorFixture([11, 22]),
        ['a', 'b'],
        createGeneratorFixture([true, false]),
        new Set([null]),
      ],
      [
        ['1', 11, 'a', true, null], ['1', 11, 'a', false, null],
        ['1', 11, 'b', true, null], ['1', 11, 'b', false, null],
        ['1', 22, 'a', true, null], ['1', 22, 'a', false, null],
        ['1', 22, 'b', true, null], ['1', 22, 'b', false, null],
        ['2', 11, 'a', true, null], ['2', 11, 'a', false, null],
        ['2', 11, 'b', true, null], ['2', 11, 'b', false, null],
        ['2', 22, 'a', true, null], ['2', 22, 'a', false, null],
        ['2', 22, 'b', true, null], ['2', 22, 'b', false, null],
        ['3', 11, 'a', true, null], ['3', 11, 'a', false, null],
        ['3', 11, 'b', true, null], ['3', 11, 'b', false, null],
        ['3', 22, 'a', true, null], ['3', 22, 'a', false, null],
        ['3', 22, 'b', true, null], ['3', 22, 'b', false, null],
      ],
    ],
  ];
}
