// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { multi, LengthError } from "../../src";

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
  "Multi Zip Equal Test",
  (
    iterables: Array<Iterable<unknown>|Iterator<unknown>>,
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const values of multi.zipEqual(...iterables)) {
        result.push(values);
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
  ];
}

function dataProviderForGenerators(): Array<unknown> {
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
  ];
}

function dataProviderForIterables(): Array<unknown> {
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
  ];
}

function dataProviderForIterators(): Array<unknown> {
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
  ];
}

function dataProviderForStrings(): Array<unknown> {
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
  ];
}

function dataProviderForSets(): Array<unknown> {
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
  ];
}

function dataProviderForMaps(): Array<unknown> {
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
        new Map([['a', 1], ['b', 2], ['c', 3]]),
        new Map([[4, 'd'], [5, 'e'], [6, 'f']]),
        createMapFixture([7, 8, 9]),
      ],
      [[['a', 1], [4, 'd'], [0, 7]], [['b', 2], [5, 'e'], [1, 8]], [['c', 3], [6, 'f'], [2, 9]]],
    ],
  ];
}

function dataProviderForMixed(): Array<unknown> {
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
  ];
}

describe.each([
  ...dataProviderForArraysError(),
  ...dataProviderForGeneratorsError(),
  ...dataProviderForIterablesError(),
  ...dataProviderForIteratorsError(),
  ...dataProviderForStringsError(),
  ...dataProviderForSetsError(),
  ...dataProviderForMapsError(),
  ...dataProviderForMixedError(),
] as Array<[Array<Iterable<unknown>|Iterator<unknown>>, Array<unknown>]>)(
  "Multi Zip Equal Test Error",
  (
    iterables: Array<Iterable<unknown>|Iterator<unknown>>,
    expected: Array<unknown>
  ) => {
    // Given
    const result: Array<unknown> = [];

    it("", () => {
      expect(() => {
        // When
        for (const values of multi.zipEqual(...iterables)) {
          result.push(values);
        }
      }).toThrow(LengthError);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArraysError(): Array<unknown> {
  return [
    [
      [
        [1, 2, 3],
        [4, 5, 6, 10],
        [7, 8, 9, 11, 12],
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9, 11, 12],
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7],
      ],
      [[1, 4, 7]],
    ],
  ];
}

function dataProviderForGeneratorsError(): Array<unknown> {
  return [
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([4, 5, 6, 10]),
        createGeneratorFixture([7, 8, 9, 11, 12]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([4, 5, 6]),
        createGeneratorFixture([7, 8, 9, 11, 12]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([4, 5, 6]),
        createGeneratorFixture([7]),
      ],
      [[1, 4, 7]],
    ],
  ];
}

function dataProviderForIterablesError(): Array<unknown> {
  return [
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([4, 5, 6, 10]),
        createIterableFixture([7, 8, 9, 11, 12]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([4, 5, 6]),
        createIterableFixture([7, 8, 9, 11, 12]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([4, 5, 6]),
        createIterableFixture([7]),
      ],
      [[1, 4, 7]],
    ],
  ];
}

function dataProviderForIteratorsError(): Array<unknown> {
  return [
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([4, 5, 6, 10]),
        createIteratorFixture([7, 8, 9, 11, 12]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([4, 5, 6]),
        createIteratorFixture([7, 8, 9, 11, 12]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([4, 5, 6]),
        createIteratorFixture([7]),
      ],
      [[1, 4, 7]],
    ],
  ];
}

function dataProviderForStringsError(): Array<unknown> {
  return [
    [
      [
        '123',
        '4561',
        '78923',
      ],
      [['1', '4', '7'], ['2', '5', '8'], ['3', '6', '9']],
    ],
    [
      [
        '123',
        '456',
        '78912',
      ],
      [['1', '4', '7'], ['2', '5', '8'], ['3', '6', '9']],
    ],
    [
      [
        '123',
        '456',
        '7',
      ],
      [['1', '4', '7']],
    ],
  ];
}

function dataProviderForSetsError(): Array<unknown> {
  return [
    [
      [
        new Set([1, 2, 3]),
        new Set([4, 5, 6, 10]),
        new Set([7, 8, 9, 11, 12]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([4, 5, 6]),
        new Set([7, 8, 9, 11, 12]),
      ],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([4, 5, 6]),
        new Set([7]),
      ],
      [[1, 4, 7]],
    ],
  ];
}

function dataProviderForMapsError(): Array<unknown> {
  return [
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture([4, 5, 6, 10]),
        createMapFixture([7, 8, 9, 11, 12]),
      ],
      [[[0, 1], [0, 4], [0, 7]], [[1, 2], [1, 5], [1, 8]], [[2, 3], [2, 6], [2, 9]]],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture([4, 5, 6]),
        createMapFixture([7, 8, 9, 11, 12]),
      ],
      [[[0, 1], [0, 4], [0, 7]], [[1, 2], [1, 5], [1, 8]], [[2, 3], [2, 6], [2, 9]]],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture([4, 5, 6]),
        createMapFixture([7]),
      ],
      [[[0, 1], [0, 4], [0, 7]]],
    ],
    [
      [
        new Map([['a', 1], ['b', 2], ['c', 3]]),
        new Map([[4, 'd'], [5, 'e'], [6, 'f']]),
        createMapFixture([7, 8]),
      ],
      [[['a', 1], [4, 'd'], [0, 7]], [['b', 2], [5, 'e'], [1, 8]]],
    ],
    [
      [
        new Map([['a', 1], ['b', 2]]),
        new Map([[4, 'd'], [5, 'e'], [6, 'f']]),
        createMapFixture([7, 8, 9]),
      ],
      [[['a', 1], [4, 'd'], [0, 7]], [['b', 2], [5, 'e'], [1, 8]]],
    ],
  ];
}

function dataProviderForMixedError(): Array<unknown> {
  return [
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
      [],
    ],
  ];
}
