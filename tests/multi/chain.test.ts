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
import { multi } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
  ...dataProviderForMixed(),
])(
  "Multi Chain Test",
  (iterables, expected) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const values of multi.chain(...iterables)) {
        result.push(values);
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
])(
  "Multi Chain Async Test",
  (iterables, expected) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const values of multi.chainAsync(...iterables)) {
        result.push(values);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<[Array<Array<any>>, Array<any>]> {
  return [
    [
      [],
      [],
    ],
    [
      [
        [],
      ],
      [],
    ],
    [
      [
        [1],
      ],
      [1],
    ],
    [
      [
        [1, 2, 3],
      ],
      [1, 2, 3],
    ],
    [
      [
        [],
        [],
      ],
      [],
    ],
    [
      [
        [1],
        [2],
      ],
      [1, 2],
    ],
    [
      [
        [1, 2],
        [4, 5],
      ],
      [1, 2, 4, 5],
    ],
    [
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [
        ['a', 'b', 'c'],
        ['x', 'y', 'z'],
      ],
      ['a', 'b', 'c', 'x', 'y', 'z'],
    ],
    [
      [
        [1, 2, 3],
        ['a', 'b', 'c'],
      ],
      [1, 2, 3, 'a', 'b', 'c'],
    ],
    [
      [
        [1, [1, 2, 3], 'abc', true],
        [9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']],
      ],
      [1, [1, 2, 3], 'abc', true, 9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Array<Generator<any>>, Array<any>]> {
  return [
    [
      [],
      [],
    ],
    [
      [
        createGeneratorFixture([]),
      ],
      [],
    ],
    [
      [
        createGeneratorFixture([1]),
      ],
      [1],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
      ],
      [1, 2, 3],
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
        createGeneratorFixture([1]),
        createGeneratorFixture([2]),
      ],
      [1, 2],
    ],
    [
      [
        createGeneratorFixture([1, 2]),
        createGeneratorFixture([4, 5]),
      ],
      [1, 2, 4, 5],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([4, 5, 6]),
      ],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [
        createGeneratorFixture(['a', 'b', 'c']),
        createGeneratorFixture(['x', 'y', 'z']),
      ],
      ['a', 'b', 'c', 'x', 'y', 'z'],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture(['a', 'b', 'c']),
      ],
      [1, 2, 3, 'a', 'b', 'c'],
    ],
    [
      [
        createGeneratorFixture([1, [1, 2, 3], 'abc', true]),
        createGeneratorFixture([9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']]),
      ],
      [1, [1, 2, 3], 'abc', true, 9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']],
    ],
  ];
}

function dataProviderForIterables(): Array<[Array<Iterable<any>>, Array<any>]> {
  return [
    [
      [],
      [],
    ],
    [
      [
        createIterableFixture([]),
      ],
      [],
    ],
    [
      [
        createIterableFixture([1]),
      ],
      [1],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
      ],
      [1, 2, 3],
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
        createIterableFixture([1]),
        createIterableFixture([2]),
      ],
      [1, 2],
    ],
    [
      [
        createIterableFixture([1, 2]),
        createIterableFixture([4, 5]),
      ],
      [1, 2, 4, 5],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([4, 5, 6]),
      ],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [
        createIterableFixture(['a', 'b', 'c']),
        createIterableFixture(['x', 'y', 'z']),
      ],
      ['a', 'b', 'c', 'x', 'y', 'z'],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture(['a', 'b', 'c']),
      ],
      [1, 2, 3, 'a', 'b', 'c'],
    ],
    [
      [
        createIterableFixture([1, [1, 2, 3], 'abc', true]),
        createIterableFixture([9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']]),
      ],
      [1, [1, 2, 3], 'abc', true, 9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']],
    ],
  ];
}

function dataProviderForIterators(): Array<[Array<Iterator<any>>, Array<any>]> {
  return [
    [
      [],
      [],
    ],
    [
      [
        createIteratorFixture([]),
      ],
      [],
    ],
    [
      [
        createIteratorFixture([1]),
      ],
      [1],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
      ],
      [1, 2, 3],
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
        createIteratorFixture([1]),
        createIteratorFixture([2]),
      ],
      [1, 2],
    ],
    [
      [
        createIteratorFixture([1, 2]),
        createIteratorFixture([4, 5]),
      ],
      [1, 2, 4, 5],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([4, 5, 6]),
      ],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [
        createIteratorFixture(['a', 'b', 'c']),
        createIteratorFixture(['x', 'y', 'z']),
      ],
      ['a', 'b', 'c', 'x', 'y', 'z'],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture(['a', 'b', 'c']),
      ],
      [1, 2, 3, 'a', 'b', 'c'],
    ],
    [
      [
        createIteratorFixture([1, [1, 2, 3], 'abc', true]),
        createIteratorFixture([9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']]),
      ],
      [1, [1, 2, 3], 'abc', true, 9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']],
    ],
  ];
}

function dataProviderForStrings(): Array<[Array<string>, Array<string>]> {
  return [
    [
      [],
      [],
    ],
    [
      [
        '',
      ],
      [],
    ],
    [
      [
        '1',
      ],
      ['1'],
    ],
    [
      [
        '123',
      ],
      ['1', '2', '3'],
    ],
    [
      [
        '1',
        '2',
      ],
      ['1', '2'],
    ],
    [
      [
        '12',
        '45',
      ],
      ['1', '2', '4', '5'],
    ],
    [
      [
        '123',
        '456',
      ],
      ['1', '2', '3', '4', '5', '6'],
    ],
    [
      [
        'abc',
        'xyz',
      ],
      ['a', 'b', 'c', 'x', 'y', 'z'],
    ],
    [
      [
        '123',
        'abc',
      ],
      ['1', '2', '3', 'a', 'b', 'c'],
    ],
  ];
}

function dataProviderForSets(): Array<[Array<Set<any>>, Array<any>]> {
  return [
    [
      [
        new Set([]),
      ],
      [],
    ],
    [
      [
        new Set([1]),
      ],
      [1],
    ],
    [
      [
        new Set([1, 2, 3]),
      ],
      [1, 2, 3],
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
        new Set([1]),
        new Set([2]),
      ],
      [1, 2],
    ],
    [
      [
        new Set([1, 2]),
        new Set([4, 5]),
      ],
      [1, 2, 4, 5],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([4, 5, 6]),
      ],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [
        new Set(['a', 'b', 'c']),
        new Set(['x', 'y', 'z']),
      ],
      ['a', 'b', 'c', 'x', 'y', 'z'],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set(['a', 'b', 'c']),
      ],
      [1, 2, 3, 'a', 'b', 'c'],
    ],
    [
      [
        new Set([1, [1, 2, 3], 'abc', true]),
        new Set([9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']]),
      ],
      [1, [1, 2, 3], 'abc', true, 9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']],
    ],
  ];
}

function dataProviderForMaps(): Array<[Array<Map<any, any>>, Array<any>]> {
  return [
    [
      [
        createMapFixture([]),
      ],
      [],
    ],
    [
      [
        createMapFixture([1]),
      ],
      [[0, 1]],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
      ],
      [[0, 1], [1, 2], [2, 3]],
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
        createMapFixture([1]),
        createMapFixture([2]),
      ],
      [[0, 1], [0, 2]],
    ],
    [
      [
        createMapFixture([1, 2]),
        createMapFixture([4, 5]),
      ],
      [[0, 1], [1, 2], [0, 4], [1, 5]],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture([4, 5, 6]),
      ],
      [[0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 6]],
    ],
    [
      [
        createMapFixture(['a', 'b', 'c']),
        createMapFixture(['x', 'y', 'z']),
      ],
      [[0, 'a'], [1, 'b'], [2, 'c'], [0, 'x'], [1, 'y'], [2, 'z']],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture(['a', 'b', 'c']),
      ],
      [[0, 1], [1, 2], [2, 3], [0, 'a'], [1, 'b'], [2, 'c']],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[Array<AsyncGenerator<any>>, Array<any>]> {
  return [
    [
      [],
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([1]),
      ],
      [1],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
      ],
      [1, 2, 3],
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
        createAsyncGeneratorFixture([1]),
        createAsyncGeneratorFixture([2]),
      ],
      [1, 2],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2]),
        createAsyncGeneratorFixture([4, 5]),
      ],
      [1, 2, 4, 5],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture([4, 5, 6]),
      ],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [
        createAsyncGeneratorFixture(['a', 'b', 'c']),
        createAsyncGeneratorFixture(['x', 'y', 'z']),
      ],
      ['a', 'b', 'c', 'x', 'y', 'z'],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture(['a', 'b', 'c']),
      ],
      [1, 2, 3, 'a', 'b', 'c'],
    ],
    [
      [
        createAsyncGeneratorFixture([1, [1, 2, 3], 'abc', true]),
        createAsyncGeneratorFixture([9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']]),
      ],
      [1, [1, 2, 3], 'abc', true, 9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[Array<AsyncIterable<any>>, Array<any>]> {
  return [
    [
      [],
      [],
    ],
    [
      [
        createAsyncIterableFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncIterableFixture([1]),
      ],
      [1],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
      ],
      [1, 2, 3],
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
        createAsyncIterableFixture([1]),
        createAsyncIterableFixture([2]),
      ],
      [1, 2],
    ],
    [
      [
        createAsyncIterableFixture([1, 2]),
        createAsyncIterableFixture([4, 5]),
      ],
      [1, 2, 4, 5],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture([4, 5, 6]),
      ],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [
        createAsyncIterableFixture(['a', 'b', 'c']),
        createAsyncIterableFixture(['x', 'y', 'z']),
      ],
      ['a', 'b', 'c', 'x', 'y', 'z'],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture(['a', 'b', 'c']),
      ],
      [1, 2, 3, 'a', 'b', 'c'],
    ],
    [
      [
        createAsyncIterableFixture([1, [1, 2, 3], 'abc', true]),
        createAsyncIterableFixture([9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']]),
      ],
      [1, [1, 2, 3], 'abc', true, 9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[Array<AsyncIterator<any>>, Array<any>]> {
  return [
    [
      [],
      [],
    ],
    [
      [
        createAsyncIteratorFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncIteratorFixture([1]),
      ],
      [1],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
      ],
      [1, 2, 3],
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
        createAsyncIteratorFixture([1]),
        createAsyncIteratorFixture([2]),
      ],
      [1, 2],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2]),
        createAsyncIteratorFixture([4, 5]),
      ],
      [1, 2, 4, 5],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture([4, 5, 6]),
      ],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [
        createAsyncIteratorFixture(['a', 'b', 'c']),
        createAsyncIteratorFixture(['x', 'y', 'z']),
      ],
      ['a', 'b', 'c', 'x', 'y', 'z'],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture(['a', 'b', 'c']),
      ],
      [1, 2, 3, 'a', 'b', 'c'],
    ],
    [
      [
        createAsyncIteratorFixture([1, [1, 2, 3], 'abc', true]),
        createAsyncIteratorFixture([9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']]),
      ],
      [1, [1, 2, 3], 'abc', true, 9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']],
    ],
  ];
}

function dataProviderForMixed(): Array<[Array<Iterable<any> | Iterator<any>>, Array<any>]> {
  return [
    [
      [
        [1, 2],
        createGeneratorFixture([2, 3]),
        createIterableFixture([3, 4]),
        createIteratorFixture([4, 5]),
        '56',
        new Set([6, 7]),
        createMapFixture([7, 8]),
      ],
      [1, 2, 2, 3, 3, 4, 4, 5, '5', '6', 6, 7, [0, 7], [1, 8]],
    ],
  ];
}

function dataProviderForMixedAsync(): Array<[Array<Iterable<any> | Iterator<any> | AsyncIterable<any> | AsyncIterator<any>>, Array<any>]> {
  return [
    [
      [
        createAsyncGeneratorFixture([2, 3]),
        createAsyncIterableFixture([3, 4]),
        createAsyncIteratorFixture([4, 5]),
      ],
      [2, 3, 3, 4, 4, 5],
    ],
    [
      [
        createAsyncGeneratorFixture([2, 3]),
        createAsyncIterableFixture([3, 4]),
        createAsyncIteratorFixture([4, 5, 6]),
      ],
      [2, 3, 3, 4, 4, 5, 6],
    ],
    [
      [
        [1, 2],
        createAsyncGeneratorFixture([2, 3]),
        createAsyncIterableFixture([3, 4]),
        createIteratorFixture([4, 5]),
        '56',
        new Set([6, 7]),
        createMapFixture([7, 8]),
      ],
      [1, 2, 2, 3, 3, 4, 4, 5, '5', '6', 6, 7, [0, 7], [1, 8]],
    ],
  ];
}
