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
  "Multi Zip Longest Test",
  (iterables, expected) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const values of multi.zipLongest(...iterables)) {
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
  "Multi Zip Longest Async Test",
  (iterables, expected) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const values of multi.zipLongestAsync(...iterables)) {
        result.push(values);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<[Array<Array<any>>, Array<Array<any>>]> {
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
      [[1]],
    ],
    [
      [
        [1, 2, 3],
      ],
      [[1], [2], [3]],
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
      [[1, 2]],
    ],
    [
      [
        [1, 2],
        [4, 5],
      ],
      [[1, 4], [2, 5]],
    ],
    [
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
      [[1, 4], [2, 5], [3, 6]],
    ],
    [
      [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
      ],
      [[1, 4], [2, 5], [3, 6], [4, 7], [5, 8], [6, 9], [7, 1], [8, 2], [9, 3]],
    ],
    [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        [1, 2, 3],
        [4, 5, 6, 10],
        [7, 8, 9, 11, 12],
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, 10, 11], [undefined, undefined, 12]],
    ],
    [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9, 11, 12],
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, undefined, 11], [undefined, undefined, 12]],
    ],
    [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7],
      ],
      [[1, 4, 7], [2, 5, undefined], [3, 6, undefined]],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Array<Generator<any>>, Array<Array<any>>]> {
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
      [[1]],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
      ],
      [[1], [2], [3]],
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
      [[1, 2]],
    ],
    [
      [
        createGeneratorFixture([1, 2]),
        createGeneratorFixture([4, 5]),
      ],
      [[1, 4], [2, 5]],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([4, 5, 6]),
      ],
      [[1, 4], [2, 5], [3, 6]],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        createGeneratorFixture([4, 5, 6, 7, 8, 9, 1, 2, 3]),
      ],
      [[1, 4], [2, 5], [3, 6], [4, 7], [5, 8], [6, 9], [7, 1], [8, 2], [9, 3]],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([4, 5, 6]),
        createGeneratorFixture([7, 8, 9]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([4, 5, 6, 10]),
        createGeneratorFixture([7, 8, 9, 11, 12]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, 10, 11], [undefined, undefined, 12]],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([4, 5, 6]),
        createGeneratorFixture([7, 8, 9, 11, 12]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, undefined, 11], [undefined, undefined, 12]],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([4, 5, 6]),
        createGeneratorFixture([7]),
      ],
      [[1, 4, 7], [2, 5, undefined], [3, 6, undefined]],
    ],
  ];
}

function dataProviderForIterables(): Array<[Array<Iterable<any>>, Array<Array<any>>]> {
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
      [[1]],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
      ],
      [[1], [2], [3]],
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
      [[1, 2]],
    ],
    [
      [
        createIterableFixture([1, 2]),
        createIterableFixture([4, 5]),
      ],
      [[1, 4], [2, 5]],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([4, 5, 6]),
      ],
      [[1, 4], [2, 5], [3, 6]],
    ],
    [
      [
        createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        createIterableFixture([4, 5, 6, 7, 8, 9, 1, 2, 3]),
      ],
      [[1, 4], [2, 5], [3, 6], [4, 7], [5, 8], [6, 9], [7, 1], [8, 2], [9, 3]],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([4, 5, 6]),
        createIterableFixture([7, 8, 9]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([4, 5, 6, 10]),
        createIterableFixture([7, 8, 9, 11, 12]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, 10, 11], [undefined, undefined, 12]],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([4, 5, 6]),
        createIterableFixture([7, 8, 9, 11, 12]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, undefined, 11], [undefined, undefined, 12]],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([4, 5, 6]),
        createIterableFixture([7]),
      ],
      [[1, 4, 7], [2, 5, undefined], [3, 6, undefined]],
    ],
  ];
}

function dataProviderForIterators(): Array<[Array<Iterator<any>>, Array<Array<any>>]> {
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
      [[1]],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
      ],
      [[1], [2], [3]],
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
      [[1, 2]],
    ],
    [
      [
        createIteratorFixture([1, 2]),
        createIteratorFixture([4, 5]),
      ],
      [[1, 4], [2, 5]],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([4, 5, 6]),
      ],
      [[1, 4], [2, 5], [3, 6]],
    ],
    [
      [
        createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        createIteratorFixture([4, 5, 6, 7, 8, 9, 1, 2, 3]),
      ],
      [[1, 4], [2, 5], [3, 6], [4, 7], [5, 8], [6, 9], [7, 1], [8, 2], [9, 3]],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([4, 5, 6]),
        createIteratorFixture([7, 8, 9]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([4, 5, 6, 10]),
        createIteratorFixture([7, 8, 9, 11, 12]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, 10, 11], [undefined, undefined, 12]],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([4, 5, 6]),
        createIteratorFixture([7, 8, 9, 11, 12]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, undefined, 11], [undefined, undefined, 12]],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([4, 5, 6]),
        createIteratorFixture([7]),
      ],
      [[1, 4, 7], [2, 5, undefined], [3, 6, undefined]],
    ],
  ];
}

function dataProviderForStrings(): Array<[Array<string>, Array<Array<any>>]> {
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
      [['1']],
    ],
    [
      [
        '123',
      ],
      [['1'], ['2'], ['3']],
    ],
    [
      [
        '',
        '',
      ],
      [],
    ],
    [
      [
        '1',
        '2',
      ],
      [['1', '2']],
    ],
    [
      [
        '12',
        '45',
      ],
      [['1', '4'], ['2', '5']],
    ],
    [
      [
        '123',
        '456',
      ],
      [['1', '4'], ['2', '5'], ['3', '6']],
    ],
    [
      [
        '123456789',
        '456789123',
      ],
      [['1', '4'], ['2', '5'], ['3', '6'], ['4', '7'], ['5', '8'], ['6', '9'], ['7', '1'], ['8', '2'], ['9', '3']],
    ],
    [
      [
        '123',
        '456',
        '789',
      ],
      [['1', '4', '7'], ['2', '5', '8'], ['3', '6', '9']],
    ],
    [
      [
        '123',
        '4561',
        '78923',
      ],
      [['1', '4', '7'], ['2', '5', '8'], ['3', '6', '9'], [undefined, '1', '2'], [undefined, undefined, '3']],
    ],
    [
      [
        '123',
        '456',
        '78912',
      ],
      [['1', '4', '7'], ['2', '5', '8'], ['3', '6', '9'], [undefined, undefined, '1'], [undefined, undefined, '2']],
    ],
    [
      [
        '123',
        '456',
        '7',
      ],
      [['1', '4', '7'], ['2', '5', undefined], ['3', '6', undefined]],
    ],
  ];
}

function dataProviderForSets(): Array<[Array<Set<any>>, Array<Array<any>>]> {
  return [
    [
      [],
      [],
    ],
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
      [[1]],
    ],
    [
      [
        new Set([1, 2, 3]),
      ],
      [[1], [2], [3]],
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
      [[1, 2]],
    ],
    [
      [
        new Set([1, 2]),
        new Set([4, 5]),
      ],
      [[1, 4], [2, 5]],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([4, 5, 6]),
      ],
      [[1, 4], [2, 5], [3, 6]],
    ],
    [
      [
        new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        new Set([4, 5, 6, 7, 8, 9, 1, 2, 3]),
      ],
      [[1, 4], [2, 5], [3, 6], [4, 7], [5, 8], [6, 9], [7, 1], [8, 2], [9, 3]],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([4, 5, 6]),
        new Set([7, 8, 9]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([4, 5, 6, 10]),
        new Set([7, 8, 9, 11, 12]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, 10, 11], [undefined, undefined, 12]],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([4, 5, 6]),
        new Set([7, 8, 9, 11, 12]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, undefined, 11], [undefined, undefined, 12]],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([4, 5, 6]),
        new Set([7]),
      ],
      [[1, 4, 7], [2, 5, undefined], [3, 6, undefined]],
    ],
  ];
}

function dataProviderForMaps(): Array<[Array<Map<any, any>>, Array<Array<any>>]> {
  return [
    [
      [],
      [],
    ],
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
      [[[0, 1]]],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
      ],
      [[[0, 1]], [[1, 2]], [[2, 3]]],
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
      [[[0, 1], [0, 2]]],
    ],
    [
      [
        createMapFixture([1, 2]),
        createMapFixture([4, 5]),
      ],
      [[[0, 1], [0, 4]], [[1, 2], [1, 5]]],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture([4, 5, 6]),
      ],
      [[[0, 1], [0, 4]], [[1, 2], [1, 5]], [[2, 3], [2, 6]]],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture([4, 5, 6]),
        createMapFixture([7, 8, 9]),
      ],
      [[[0, 1], [0, 4], [0, 7]], [[1, 2], [1, 5], [1, 8]], [[2, 3], [2, 6], [2, 9]]],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture([4, 5, 6, 10]),
        createMapFixture([7, 8, 9, 11, 12]),
      ],
      [
        [[0, 1], [0, 4], [0, 7]],
        [[1, 2], [1, 5], [1, 8]],
        [[2, 3], [2, 6], [2, 9]],
        [undefined, [3, 10], [3, 11]],
        [undefined, undefined, [4, 12]]
      ],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture([4, 5, 6]),
        createMapFixture([7, 8, 9, 11, 12]),
      ],
      [
        [[0, 1], [0, 4], [0, 7]],
        [[1, 2], [1, 5], [1, 8]],
        [[2, 3], [2, 6], [2, 9]],
        [undefined, undefined, [3, 11]],
        [undefined, undefined, [4, 12]],
      ],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture([4, 5, 6]),
        createMapFixture([7]),
      ],
      [
        [[0, 1], [0, 4], [0, 7]],
        [[1, 2], [1, 5], undefined],
        [[2, 3], [2, 6], undefined],
      ],
    ],
    [
      [
        new Map([['a', 1], ['b', 2], ['c', 3]]),
        new Map([[4, 'd'], [5, 'e'], [6, 'f']]),
        createMapFixture([7, 8, 9]),
      ],
      [
        [['a', 1], [4, 'd'], [0, 7]],
        [['b', 2], [5, 'e'], [1, 8]],
        [['c', 3], [6, 'f'], [2, 9]],
      ],
    ],
    [
      [
        new Map([['a', 1], ['b', 2], ['c', 3]]),
        new Map([[4, 'd'], [5, 'e'], [6, 'f']]),
        createMapFixture([7, 8]),
      ],
      [
        [['a', 1], [4, 'd'], [0, 7]],
        [['b', 2], [5, 'e'], [1, 8]],
        [['c', 3], [6, 'f'], undefined],
      ],
    ],
    [
      [
        new Map([['a', 1], ['b', 2]]),
        new Map([[4, 'd'], [5, 'e'], [6, 'f']]),
        createMapFixture([7, 8, 9]),
      ],
      [
        [['a', 1], [4, 'd'], [0, 7]],
        [['b', 2], [5, 'e'], [1, 8]],
        [undefined, [6, 'f'], [2, 9]],
      ],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[Array<AsyncGenerator<any>>, Array<Array<any>>]> {
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
      [[1]],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
      ],
      [[1], [2], [3]],
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
      [[1, 2]],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2]),
        createAsyncGeneratorFixture([4, 5]),
      ],
      [[1, 4], [2, 5]],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture([4, 5, 6]),
      ],
      [[1, 4], [2, 5], [3, 6]],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        createAsyncGeneratorFixture([4, 5, 6, 7, 8, 9, 1, 2, 3]),
      ],
      [[1, 4], [2, 5], [3, 6], [4, 7], [5, 8], [6, 9], [7, 1], [8, 2], [9, 3]],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture([4, 5, 6]),
        createAsyncGeneratorFixture([7, 8, 9]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture([4, 5, 6, 10]),
        createAsyncGeneratorFixture([7, 8, 9, 11, 12]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, 10, 11], [undefined, undefined, 12]],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture([4, 5, 6]),
        createAsyncGeneratorFixture([7, 8, 9, 11, 12]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, undefined, 11], [undefined, undefined, 12]],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture([4, 5, 6]),
        createAsyncGeneratorFixture([7]),
      ],
      [[1, 4, 7], [2, 5, undefined], [3, 6, undefined]],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[Array<AsyncIterable<any>>, Array<Array<any>>]> {
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
      [[1]],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
      ],
      [[1], [2], [3]],
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
      [[1, 2]],
    ],
    [
      [
        createAsyncIterableFixture([1, 2]),
        createAsyncIterableFixture([4, 5]),
      ],
      [[1, 4], [2, 5]],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture([4, 5, 6]),
      ],
      [[1, 4], [2, 5], [3, 6]],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        createAsyncIterableFixture([4, 5, 6, 7, 8, 9, 1, 2, 3]),
      ],
      [[1, 4], [2, 5], [3, 6], [4, 7], [5, 8], [6, 9], [7, 1], [8, 2], [9, 3]],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture([4, 5, 6]),
        createAsyncIterableFixture([7, 8, 9]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture([4, 5, 6, 10]),
        createAsyncIterableFixture([7, 8, 9, 11, 12]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, 10, 11], [undefined, undefined, 12]],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture([4, 5, 6]),
        createAsyncIterableFixture([7, 8, 9, 11, 12]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, undefined, 11], [undefined, undefined, 12]],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture([4, 5, 6]),
        createAsyncIterableFixture([7]),
      ],
      [[1, 4, 7], [2, 5, undefined], [3, 6, undefined]],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[Array<AsyncIterator<any>>, Array<Array<any>>]> {
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
      [[1]],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
      ],
      [[1], [2], [3]],
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
      [[1, 2]],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2]),
        createAsyncIteratorFixture([4, 5]),
      ],
      [[1, 4], [2, 5]],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture([4, 5, 6]),
      ],
      [[1, 4], [2, 5], [3, 6]],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        createAsyncIteratorFixture([4, 5, 6, 7, 8, 9, 1, 2, 3]),
      ],
      [[1, 4], [2, 5], [3, 6], [4, 7], [5, 8], [6, 9], [7, 1], [8, 2], [9, 3]],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture([4, 5, 6]),
        createAsyncIteratorFixture([7, 8, 9]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture([4, 5, 6, 10]),
        createAsyncIteratorFixture([7, 8, 9, 11, 12]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, 10, 11], [undefined, undefined, 12]],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture([4, 5, 6]),
        createAsyncIteratorFixture([7, 8, 9, 11, 12]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, undefined, 11], [undefined, undefined, 12]],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture([4, 5, 6]),
        createAsyncIteratorFixture([7]),
      ],
      [[1, 4, 7], [2, 5, undefined], [3, 6, undefined]],
    ],
  ];
}

function dataProviderForMixed(): Array<[Array<Iterable<any> | Iterator<any>>, Array<Array<any>>]> {
  return [
    [
      [
        [1, 2, 3],
        createGeneratorFixture([2, 3, 4]),
        createIterableFixture([3, 4, 5]),
        createIteratorFixture([4, 5, 6]),
        '567',
        new Set(['a', 'b', 'c']),
        new Map([['x', -1], ['y', -2], ['z', -3]]),
      ],
      [
        [1, 2, 3, 4, '5', 'a', ['x', -1]],
        [2, 3, 4, 5, '6', 'b', ['y', -2]],
        [3, 4, 5, 6, '7', 'c', ['z', -3]],
      ],
    ],
    [
      [
        [1, 2],
        createGeneratorFixture([2, 3, 4]),
        createIterableFixture([3, 4, 5]),
        createIteratorFixture([4, 5, 6]),
        '567',
        new Set(['a', 'b', 'c']),
        new Map([['x', -1], ['y', -2], ['z', -3]]),
      ],
      [
        [1, 2, 3, 4, '5', 'a', ['x', -1]],
        [2, 3, 4, 5, '6', 'b', ['y', -2]],
        [undefined, 4, 5, 6, '7', 'c', ['z', -3]],
      ],
    ],
    [
      [
        [],
        createGeneratorFixture([2, 3, 4]),
        createIterableFixture([3, 4, 5]),
        createIteratorFixture([4, 5, 6]),
        '567',
        new Set(['a', 'b', 'c']),
        new Map([['x', -1], ['y', -2], ['z', -3]]),
      ],
      [
        [undefined, 2, 3, 4, '5', 'a', ['x', -1]],
        [undefined, 3, 4, 5, '6', 'b', ['y', -2]],
        [undefined, 4, 5, 6, '7', 'c', ['z', -3]],
      ],
    ],
  ];
}

function dataProviderForMixedAsync(): Array<[Array<Iterable<any> | Iterator<any> | AsyncIterable<any> | AsyncIterator<any>>, Array<Array<any>>]> {
  return [
    [
      [
        createGeneratorFixture([2, 3, 4]),
        createIterableFixture([3, 4, 5]),
        createIteratorFixture([4, 5, 6]),
      ],
      [
        [2, 3, 4],
        [3, 4, 5],
        [4, 5, 6],
      ],
    ],
    [
      [
        createGeneratorFixture([2, 3]),
        createIterableFixture([3, 4, 5]),
        createIteratorFixture([4, 5, 6]),
      ],
      [
        [2, 3, 4],
        [3, 4, 5],
        [undefined, 5, 6],
      ],
    ],
    [
      [
        [1, 2, 3],
        createAsyncGeneratorFixture([2, 3, 4]),
        createIterableFixture([3, 4, 5]),
        createIteratorFixture([4, 5, 6]),
        '567',
        new Set(['a', 'b', 'c']),
        new Map([['x', -1], ['y', -2], ['z', -3]]),
      ],
      [
        [1, 2, 3, 4, '5', 'a', ['x', -1]],
        [2, 3, 4, 5, '6', 'b', ['y', -2]],
        [3, 4, 5, 6, '7', 'c', ['z', -3]],
      ],
    ],
    [
      [
        [1, 2],
        createGeneratorFixture([2, 3, 4]),
        createAsyncIterableFixture([3, 4, 5]),
        createIteratorFixture([4, 5, 6]),
        '567',
        new Set(['a', 'b', 'c']),
        new Map([['x', -1], ['y', -2], ['z', -3]]),
      ],
      [
        [1, 2, 3, 4, '5', 'a', ['x', -1]],
        [2, 3, 4, 5, '6', 'b', ['y', -2]],
        [undefined, 4, 5, 6, '7', 'c', ['z', -3]],
      ],
    ],
    [
      [
        [],
        createGeneratorFixture([2, 3, 4]),
        createAsyncIterableFixture([3, 4, 5]),
        createAsyncIteratorFixture([4, 5, 6]),
        '567',
        new Set(['a', 'b', 'c']),
        new Map([['x', -1], ['y', -2], ['z', -3]]),
      ],
      [
        [undefined, 2, 3, 4, '5', 'a', ['x', -1]],
        [undefined, 3, 4, 5, '6', 'b', ['y', -2]],
        [undefined, 4, 5, 6, '7', 'c', ['z', -3]],
      ],
    ],
  ];
}
