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
  "Multi Zip Filled Test",
  (iterables, filler, expected) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const values of multi.zipFilled(filler, ...iterables)) {
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
  "Multi Zip Filled Async Test",
  (iterables, filler, expected) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const values of multi.zipFilledAsync(filler, ...iterables)) {
        result.push(values);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<[Array<Array<any>>, any, Array<Array<any>>]> {
  return [
    [
      [],
      'filler',
      [],
    ],
    [
      [
        [],
      ],
      'filler',
      [],
    ],
    [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      'filler',
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [],
      undefined,
      [],
    ],
    [
      [
        [],
      ],
      undefined,
      [],
    ],
    [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      undefined,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        [1, 2, 3],
        [4, 5, 6, 10],
        [7, 8, 9, 11, 12],
      ],
      'filler',
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], ['filler', 10, 11], ['filler', 'filler', 12]],
    ],
    [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9, 11, 12],
      ],
      'filler',
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], ['filler', 'filler', 11], ['filler', 'filler', 12]],
    ],
    [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7],
      ],
      'filler',
      [[1, 4, 7], [2, 5, 'filler'], [3, 6, 'filler']],
    ],
    [
      [
        [1, 2, 3],
        [4, 5, 6, 10],
        [7, 8, 9, 11, 12],
      ],
      null,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [null, 10, 11], [null, null, 12]],
    ],
    [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9, 11, 12],
      ],
      null,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [null, null, 11], [null, null, 12]],
    ],
    [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7],
      ],
      null,
      [[1, 4, 7], [2, 5, null], [3, 6, null]],
    ],
    [
      [
        [1, 2, 3],
        [4, 5, 6, 10],
        [7, 8, 9, 11, 12],
      ],
      undefined,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, 10, 11], [undefined, undefined, 12]],
    ],
    [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9, 11, 12],
      ],
      undefined,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, undefined, 11], [undefined, undefined, 12]],
    ],
    [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7],
      ],
      undefined,
      [[1, 4, 7], [2, 5, undefined], [3, 6, undefined]],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Array<Generator<any>>, any, Array<Array<any>>]> {
  return [
    [
      [],
      'filler',
      [],
    ],
    [
      [
        createGeneratorFixture([]),
      ],
      'filler',
      [],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([4, 5, 6]),
        createGeneratorFixture([7, 8, 9]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [],
      undefined,
      [],
    ],
    [
      [
        createGeneratorFixture([]),
      ],
      undefined,
      [],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([4, 5, 6]),
        createGeneratorFixture([7, 8, 9]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([4, 5, 6, 10]),
        createGeneratorFixture([7, 8, 9, 11, 12]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], ['filler', 10, 11], ['filler', 'filler', 12]],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([4, 5, 6]),
        createGeneratorFixture([7, 8, 9, 11, 12]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], ['filler', 'filler', 11], ['filler', 'filler', 12]],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([4, 5, 6]),
        createGeneratorFixture([7]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 'filler'], [3, 6, 'filler']],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([4, 5, 6, 10]),
        createGeneratorFixture([7, 8, 9, 11, 12]),
      ],
      null,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [null, 10, 11], [null, null, 12]],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([4, 5, 6]),
        createGeneratorFixture([7, 8, 9, 11, 12]),
      ],
      null,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [null, null, 11], [null, null, 12]],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([4, 5, 6]),
        createGeneratorFixture([7]),
      ],
      null,
      [[1, 4, 7], [2, 5, null], [3, 6, null]],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([4, 5, 6, 10]),
        createGeneratorFixture([7, 8, 9, 11, 12]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, 10, 11], [undefined, undefined, 12]],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([4, 5, 6]),
        createGeneratorFixture([7, 8, 9, 11, 12]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, undefined, 11], [undefined, undefined, 12]],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([4, 5, 6]),
        createGeneratorFixture([7]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, undefined], [3, 6, undefined]],
    ],
  ];
}

function dataProviderForIterables(): Array<[Array<Iterable<any>>, any, Array<Array<any>>]> {
  return [
    [
      [],
      'filler',
      [],
    ],
    [
      [
        createIterableFixture([]),
      ],
      'filler',
      [],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([4, 5, 6]),
        createIterableFixture([7, 8, 9]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [],
      undefined,
      [],
    ],
    [
      [
        createIterableFixture([]),
      ],
      undefined,
      [],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([4, 5, 6]),
        createIterableFixture([7, 8, 9]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([4, 5, 6, 10]),
        createIterableFixture([7, 8, 9, 11, 12]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], ['filler', 10, 11], ['filler', 'filler', 12]],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([4, 5, 6]),
        createIterableFixture([7, 8, 9, 11, 12]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], ['filler', 'filler', 11], ['filler', 'filler', 12]],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([4, 5, 6]),
        createIterableFixture([7]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 'filler'], [3, 6, 'filler']],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([4, 5, 6, 10]),
        createIterableFixture([7, 8, 9, 11, 12]),
      ],
      null,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [null, 10, 11], [null, null, 12]],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([4, 5, 6]),
        createIterableFixture([7, 8, 9, 11, 12]),
      ],
      null,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [null, null, 11], [null, null, 12]],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([4, 5, 6]),
        createIterableFixture([7]),
      ],
      null,
      [[1, 4, 7], [2, 5, null], [3, 6, null]],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([4, 5, 6, 10]),
        createIterableFixture([7, 8, 9, 11, 12]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, 10, 11], [undefined, undefined, 12]],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([4, 5, 6]),
        createIterableFixture([7, 8, 9, 11, 12]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, undefined, 11], [undefined, undefined, 12]],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([4, 5, 6]),
        createIterableFixture([7]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, undefined], [3, 6, undefined]],
    ],
  ];
}

function dataProviderForIterators(): Array<[Array<Iterator<any>>, any, Array<Array<any>>]> {
  return [
    [
      [],
      'filler',
      [],
    ],
    [
      [
        createIteratorFixture([]),
      ],
      'filler',
      [],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([4, 5, 6]),
        createIteratorFixture([7, 8, 9]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [],
      undefined,
      [],
    ],
    [
      [
        createIteratorFixture([]),
      ],
      undefined,
      [],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([4, 5, 6]),
        createIteratorFixture([7, 8, 9]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([4, 5, 6, 10]),
        createIteratorFixture([7, 8, 9, 11, 12]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], ['filler', 10, 11], ['filler', 'filler', 12]],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([4, 5, 6]),
        createIteratorFixture([7, 8, 9, 11, 12]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], ['filler', 'filler', 11], ['filler', 'filler', 12]],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([4, 5, 6]),
        createIteratorFixture([7]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 'filler'], [3, 6, 'filler']],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([4, 5, 6, 10]),
        createIteratorFixture([7, 8, 9, 11, 12]),
      ],
      null,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [null, 10, 11], [null, null, 12]],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([4, 5, 6]),
        createIteratorFixture([7, 8, 9, 11, 12]),
      ],
      null,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [null, null, 11], [null, null, 12]],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([4, 5, 6]),
        createIteratorFixture([7]),
      ],
      null,
      [[1, 4, 7], [2, 5, null], [3, 6, null]],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([4, 5, 6, 10]),
        createIteratorFixture([7, 8, 9, 11, 12]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, 10, 11], [undefined, undefined, 12]],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([4, 5, 6]),
        createIteratorFixture([7, 8, 9, 11, 12]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, undefined, 11], [undefined, undefined, 12]],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([4, 5, 6]),
        createIteratorFixture([7]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, undefined], [3, 6, undefined]],
    ],
  ];
}

function dataProviderForStrings(): Array<[Array<string>, any, Array<Array<any>>]> {
  return [
    [
      [],
      'filler',
      [],
    ],
    [
      [
        '',
      ],
      'filler',
      [],
    ],
    [
      [
        '123',
        '456',
        '789',
      ],
      'filler',
      [['1', '4', '7'], ['2', '5', '8'], ['3', '6', '9']],
    ],
    [
      [
        '123',
        '4561',
        '78923',
      ],
      'filler',
      [['1', '4', '7'], ['2', '5', '8'], ['3', '6', '9'], ['filler', '1', '2'], ['filler', 'filler', '3']],
    ],
    [
      [
        '123',
        '456',
        '78912',
      ],
      'filler',
      [['1', '4', '7'], ['2', '5', '8'], ['3', '6', '9'], ['filler', 'filler', '1'], ['filler', 'filler', '2']],
    ],
    [
      [
        '123',
        '456',
        '7',
      ],
      'filler',
      [['1', '4', '7'], ['2', '5', 'filler'], ['3', '6', 'filler']],
    ],
    [
      [
        '123',
        '4561',
        '78923',
      ],
      null,
      [['1', '4', '7'], ['2', '5', '8'], ['3', '6', '9'], [null, '1', '2'], [null, null, '3']],
    ],
    [
      [
        '123',
        '456',
        '78912',
      ],
      null,
      [['1', '4', '7'], ['2', '5', '8'], ['3', '6', '9'], [null, null, '1'], [null, null, '2']],
    ],
    [
      [
        '123',
        '456',
        '7',
      ],
      null,
      [['1', '4', '7'], ['2', '5', null], ['3', '6', null]],
    ],
    [
      [
        '123',
        '4561',
        '78923',
      ],
      undefined,
      [['1', '4', '7'], ['2', '5', '8'], ['3', '6', '9'], [undefined, '1', '2'], [undefined, undefined, '3']],
    ],
    [
      [
        '123',
        '456',
        '78912',
      ],
      undefined,
      [['1', '4', '7'], ['2', '5', '8'], ['3', '6', '9'], [undefined, undefined, '1'], [undefined, undefined, '2']],
    ],
    [
      [
        '123',
        '456',
        '7',
      ],
      undefined,
      [['1', '4', '7'], ['2', '5', undefined], ['3', '6', undefined]],
    ],
  ];
}

function dataProviderForSets(): Array<[Array<Set<any>>, any, Array<Array<any>>]> {
  return [
    [
      [],
      'filler',
      [],
    ],
    [
      [
        new Set([]),
      ],
      'filler',
      [],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([4, 5, 6]),
        new Set([7, 8, 9]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [],
      undefined,
      [],
    ],
    [
      [
        new Set([]),
      ],
      undefined,
      [],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([4, 5, 6]),
        new Set([7, 8, 9]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([4, 5, 6, 10]),
        new Set([7, 8, 9, 11, 12]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], ['filler', 10, 11], ['filler', 'filler', 12]],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([4, 5, 6]),
        new Set([7, 8, 9, 11, 12]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], ['filler', 'filler', 11], ['filler', 'filler', 12]],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([4, 5, 6]),
        new Set([7]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 'filler'], [3, 6, 'filler']],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([4, 5, 6, 10]),
        new Set([7, 8, 9, 11, 12]),
      ],
      null,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [null, 10, 11], [null, null, 12]],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([4, 5, 6]),
        new Set([7, 8, 9, 11, 12]),
      ],
      null,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [null, null, 11], [null, null, 12]],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([4, 5, 6]),
        new Set([7]),
      ],
      null,
      [[1, 4, 7], [2, 5, null], [3, 6, null]],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([4, 5, 6, 10]),
        new Set([7, 8, 9, 11, 12]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, 10, 11], [undefined, undefined, 12]],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([4, 5, 6]),
        new Set([7, 8, 9, 11, 12]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, undefined, 11], [undefined, undefined, 12]],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([4, 5, 6]),
        new Set([7]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, undefined], [3, 6, undefined]],
    ],
  ];
}

function dataProviderForMaps(): Array<[Array<Map<any, any>>, any, Array<Array<any>>]> {
  return [
    [
      [],
      'filler',
      [],
    ],
    [
      [
        createMapFixture([]),
      ],
      'filler',
      [],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture([4, 5, 6]),
        createMapFixture([7, 8, 9]),
      ],
      'filler',
      [[[0, 1], [0, 4], [0, 7]], [[1, 2], [1, 5], [1, 8]], [[2, 3], [2, 6], [2, 9]]],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture([4, 5, 6, 10]),
        createMapFixture([7, 8, 9, 11, 12]),
      ],
      'filler',
      [
        [[0, 1], [0, 4], [0, 7]],
        [[1, 2], [1, 5], [1, 8]],
        [[2, 3], [2, 6], [2, 9]],
        ['filler', [3, 10], [3, 11]],
        ['filler', 'filler', [4, 12]],
      ],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture([4, 5, 6]),
        createMapFixture([7, 8, 9, 11, 12]),
      ],
      'filler',
      [
        [[0, 1], [0, 4], [0, 7]],
        [[1, 2], [1, 5], [1, 8]],
        [[2, 3], [2, 6], [2, 9]],
        ['filler', 'filler', [3, 11]],
        ['filler', 'filler', [4, 12]],
      ],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture([4, 5, 6]),
        createMapFixture([7]),
      ],
      'filler',
      [
        [[0, 1], [0, 4], [0, 7]],
        [[1, 2], [1, 5], 'filler'],
        [[2, 3], [2, 6], 'filler'],
      ],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture([4, 5, 6, 10]),
        createMapFixture([7, 8, 9, 11, 12]),
      ],
      null,
      [
        [[0, 1], [0, 4], [0, 7]],
        [[1, 2], [1, 5], [1, 8]],
        [[2, 3], [2, 6], [2, 9]],
        [null, [3, 10], [3, 11]],
        [null, null, [4, 12]],
      ],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture([4, 5, 6]),
        createMapFixture([7, 8, 9, 11, 12]),
      ],
      null,
      [
        [[0, 1], [0, 4], [0, 7]],
        [[1, 2], [1, 5], [1, 8]],
        [[2, 3], [2, 6], [2, 9]],
        [null, null, [3, 11]],
        [null, null, [4, 12]],
      ],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture([4, 5, 6]),
        createMapFixture([7]),
      ],
      null,
      [
        [[0, 1], [0, 4], [0, 7]],
        [[1, 2], [1, 5], null],
        [[2, 3], [2, 6], null],
      ],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture([4, 5, 6, 10]),
        createMapFixture([7, 8, 9, 11, 12]),
      ],
      undefined,
      [
        [[0, 1], [0, 4], [0, 7]],
        [[1, 2], [1, 5], [1, 8]],
        [[2, 3], [2, 6], [2, 9]],
        [undefined, [3, 10], [3, 11]],
        [undefined, undefined, [4, 12]],
      ],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture([4, 5, 6]),
        createMapFixture([7, 8, 9, 11, 12]),
      ],
      undefined,
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
      undefined,
      [
        [[0, 1], [0, 4], [0, 7]],
        [[1, 2], [1, 5], undefined],
        [[2, 3], [2, 6], undefined],
      ],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[Array<AsyncGenerator<any>>, any, Array<Array<any>>]> {
  return [
    [
      [],
      'filler',
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([]),
      ],
      'filler',
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture([4, 5, 6]),
        createAsyncGeneratorFixture([7, 8, 9]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [],
      undefined,
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([]),
      ],
      undefined,
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture([4, 5, 6]),
        createAsyncGeneratorFixture([7, 8, 9]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture([4, 5, 6, 10]),
        createAsyncGeneratorFixture([7, 8, 9, 11, 12]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], ['filler', 10, 11], ['filler', 'filler', 12]],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture([4, 5, 6]),
        createAsyncGeneratorFixture([7, 8, 9, 11, 12]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], ['filler', 'filler', 11], ['filler', 'filler', 12]],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture([4, 5, 6]),
        createAsyncGeneratorFixture([7]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 'filler'], [3, 6, 'filler']],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture([4, 5, 6, 10]),
        createAsyncGeneratorFixture([7, 8, 9, 11, 12]),
      ],
      null,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [null, 10, 11], [null, null, 12]],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture([4, 5, 6]),
        createAsyncGeneratorFixture([7, 8, 9, 11, 12]),
      ],
      null,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [null, null, 11], [null, null, 12]],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture([4, 5, 6]),
        createAsyncGeneratorFixture([7]),
      ],
      null,
      [[1, 4, 7], [2, 5, null], [3, 6, null]],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture([4, 5, 6, 10]),
        createAsyncGeneratorFixture([7, 8, 9, 11, 12]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, 10, 11], [undefined, undefined, 12]],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture([4, 5, 6]),
        createAsyncGeneratorFixture([7, 8, 9, 11, 12]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, undefined, 11], [undefined, undefined, 12]],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture([4, 5, 6]),
        createAsyncGeneratorFixture([7]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, undefined], [3, 6, undefined]],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[Array<AsyncIterable<any>>, any, Array<Array<any>>]> {
  return [
    [
      [],
      'filler',
      [],
    ],
    [
      [
        createAsyncIterableFixture([]),
      ],
      'filler',
      [],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture([4, 5, 6]),
        createAsyncIterableFixture([7, 8, 9]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [],
      undefined,
      [],
    ],
    [
      [
        createAsyncIterableFixture([]),
      ],
      undefined,
      [],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture([4, 5, 6]),
        createAsyncIterableFixture([7, 8, 9]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture([4, 5, 6, 10]),
        createAsyncIterableFixture([7, 8, 9, 11, 12]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], ['filler', 10, 11], ['filler', 'filler', 12]],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture([4, 5, 6]),
        createAsyncIterableFixture([7, 8, 9, 11, 12]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], ['filler', 'filler', 11], ['filler', 'filler', 12]],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture([4, 5, 6]),
        createAsyncIterableFixture([7]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 'filler'], [3, 6, 'filler']],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture([4, 5, 6, 10]),
        createAsyncIterableFixture([7, 8, 9, 11, 12]),
      ],
      null,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [null, 10, 11], [null, null, 12]],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture([4, 5, 6]),
        createAsyncIterableFixture([7, 8, 9, 11, 12]),
      ],
      null,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [null, null, 11], [null, null, 12]],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture([4, 5, 6]),
        createAsyncIterableFixture([7]),
      ],
      null,
      [[1, 4, 7], [2, 5, null], [3, 6, null]],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture([4, 5, 6, 10]),
        createAsyncIterableFixture([7, 8, 9, 11, 12]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, 10, 11], [undefined, undefined, 12]],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture([4, 5, 6]),
        createAsyncIterableFixture([7, 8, 9, 11, 12]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, undefined, 11], [undefined, undefined, 12]],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture([4, 5, 6]),
        createAsyncIterableFixture([7]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, undefined], [3, 6, undefined]],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[Array<AsyncIterator<any>>, any, Array<Array<any>>]> {
  return [
    [
      [],
      'filler',
      [],
    ],
    [
      [
        createAsyncIteratorFixture([]),
      ],
      'filler',
      [],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture([4, 5, 6]),
        createAsyncIteratorFixture([7, 8, 9]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [],
      undefined,
      [],
    ],
    [
      [
        createAsyncIteratorFixture([]),
      ],
      undefined,
      [],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture([4, 5, 6]),
        createAsyncIteratorFixture([7, 8, 9]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture([4, 5, 6, 10]),
        createAsyncIteratorFixture([7, 8, 9, 11, 12]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], ['filler', 10, 11], ['filler', 'filler', 12]],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture([4, 5, 6]),
        createAsyncIteratorFixture([7, 8, 9, 11, 12]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], ['filler', 'filler', 11], ['filler', 'filler', 12]],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture([4, 5, 6]),
        createAsyncIteratorFixture([7]),
      ],
      'filler',
      [[1, 4, 7], [2, 5, 'filler'], [3, 6, 'filler']],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture([4, 5, 6, 10]),
        createAsyncIteratorFixture([7, 8, 9, 11, 12]),
      ],
      null,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [null, 10, 11], [null, null, 12]],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture([4, 5, 6]),
        createAsyncIteratorFixture([7, 8, 9, 11, 12]),
      ],
      null,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [null, null, 11], [null, null, 12]],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture([4, 5, 6]),
        createAsyncIteratorFixture([7]),
      ],
      null,
      [[1, 4, 7], [2, 5, null], [3, 6, null]],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture([4, 5, 6, 10]),
        createAsyncIteratorFixture([7, 8, 9, 11, 12]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, 10, 11], [undefined, undefined, 12]],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture([4, 5, 6]),
        createAsyncIteratorFixture([7, 8, 9, 11, 12]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9], [undefined, undefined, 11], [undefined, undefined, 12]],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture([4, 5, 6]),
        createAsyncIteratorFixture([7]),
      ],
      undefined,
      [[1, 4, 7], [2, 5, undefined], [3, 6, undefined]],
    ],
  ];
}

function dataProviderForMixed(): Array<[Array<Iterable<any> | Iterator<any>>, any, Array<Array<any>>]> {
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
      'filler',
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
      'filler',
      [
        [1, 2, 3, 4, '5', 'a', ['x', -1]],
        [2, 3, 4, 5, '6', 'b', ['y', -2]],
        ['filler', 4, 5, 6, '7', 'c', ['z', -3]],
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
      'filler',
      [
        ['filler', 2, 3, 4, '5', 'a', ['x', -1]],
        ['filler', 3, 4, 5, '6', 'b', ['y', -2]],
        ['filler', 4, 5, 6, '7', 'c', ['z', -3]],
      ],
    ],
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
      null,
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
      null,
      [
        [1, 2, 3, 4, '5', 'a', ['x', -1]],
        [2, 3, 4, 5, '6', 'b', ['y', -2]],
        [null, 4, 5, 6, '7', 'c', ['z', -3]],
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
      null,
      [
        [null, 2, 3, 4, '5', 'a', ['x', -1]],
        [null, 3, 4, 5, '6', 'b', ['y', -2]],
        [null, 4, 5, 6, '7', 'c', ['z', -3]],
      ],
    ],
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
      undefined,
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
      undefined,
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
      undefined,
      [
        [undefined, 2, 3, 4, '5', 'a', ['x', -1]],
        [undefined, 3, 4, 5, '6', 'b', ['y', -2]],
        [undefined, 4, 5, 6, '7', 'c', ['z', -3]],
      ],
    ],
  ];
}

function dataProviderForMixedAsync(): Array<[Array<Iterable<any> | Iterator<any> | AsyncIterable<any> | AsyncIterator<any>>, any, Array<Array<any>>]> {
  return [
    [
      [
        createAsyncGeneratorFixture([2, 3, 4]),
        createAsyncIterableFixture([3, 4, 5]),
        createAsyncIteratorFixture([4, 5, 6]),
      ],
      'filler',
      [
        [2, 3, 4],
        [3, 4, 5],
        [4, 5, 6],
      ],
    ],
    [
      [
        createAsyncGeneratorFixture([2, 3]),
        createAsyncIterableFixture([3, 4, 5]),
        createAsyncIteratorFixture([4, 5, 6]),
      ],
      'filler',
      [
        [2, 3, 4],
        [3, 4, 5],
        ['filler', 5, 6],
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
      'filler',
      [
        [1, 2, 3, 4, '5', 'a', ['x', -1]],
        [2, 3, 4, 5, '6', 'b', ['y', -2]],
        [3, 4, 5, 6, '7', 'c', ['z', -3]],
      ],
    ],
    [
      [
        [1, 2],
        createAsyncGeneratorFixture([2, 3, 4]),
        createAsyncIterableFixture([3, 4, 5]),
        createAsyncIteratorFixture([4, 5, 6]),
        '567',
        new Set(['a', 'b', 'c']),
        new Map([['x', -1], ['y', -2], ['z', -3]]),
      ],
      'filler',
      [
        [1, 2, 3, 4, '5', 'a', ['x', -1]],
        [2, 3, 4, 5, '6', 'b', ['y', -2]],
        ['filler', 4, 5, 6, '7', 'c', ['z', -3]],
      ],
    ],
    [
      [
        [],
        createGeneratorFixture([2, 3, 4]),
        createIterableFixture([3, 4, 5]),
        createAsyncIteratorFixture([4, 5, 6]),
        '567',
        new Set(['a', 'b', 'c']),
        new Map([['x', -1], ['y', -2], ['z', -3]]),
      ],
      'filler',
      [
        ['filler', 2, 3, 4, '5', 'a', ['x', -1]],
        ['filler', 3, 4, 5, '6', 'b', ['y', -2]],
        ['filler', 4, 5, 6, '7', 'c', ['z', -3]],
      ],
    ],
    [
      [
        [1, 2, 3],
        createAsyncGeneratorFixture([2, 3, 4]),
        createAsyncIterableFixture([3, 4, 5]),
        createIteratorFixture([4, 5, 6]),
        '567',
        new Set(['a', 'b', 'c']),
        new Map([['x', -1], ['y', -2], ['z', -3]]),
      ],
      null,
      [
        [1, 2, 3, 4, '5', 'a', ['x', -1]],
        [2, 3, 4, 5, '6', 'b', ['y', -2]],
        [3, 4, 5, 6, '7', 'c', ['z', -3]],
      ],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2]),
        createAsyncGeneratorFixture([2, 3, 4]),
        createAsyncIterableFixture([3, 4, 5]),
        createAsyncIteratorFixture([4, 5, 6]),
        '567',
        new Set(['a', 'b', 'c']),
        new Map([['x', -1], ['y', -2], ['z', -3]]),
      ],
      null,
      [
        [1, 2, 3, 4, '5', 'a', ['x', -1]],
        [2, 3, 4, 5, '6', 'b', ['y', -2]],
        [null, 4, 5, 6, '7', 'c', ['z', -3]],
      ],
    ],
    [
      [
        [],
        createAsyncGeneratorFixture([2, 3, 4]),
        createIterableFixture([3, 4, 5]),
        createAsyncIteratorFixture([4, 5, 6]),
        '567',
        new Set(['a', 'b', 'c']),
        new Map([['x', -1], ['y', -2], ['z', -3]]),
      ],
      null,
      [
        [null, 2, 3, 4, '5', 'a', ['x', -1]],
        [null, 3, 4, 5, '6', 'b', ['y', -2]],
        [null, 4, 5, 6, '7', 'c', ['z', -3]],
      ],
    ],
    [
      [
        [1, 2, 3],
        createAsyncGeneratorFixture([2, 3, 4]),
        createIterableFixture([3, 4, 5]),
        createAsyncIteratorFixture([4, 5, 6]),
        '567',
        new Set(['a', 'b', 'c']),
        new Map([['x', -1], ['y', -2], ['z', -3]]),
      ],
      undefined,
      [
        [1, 2, 3, 4, '5', 'a', ['x', -1]],
        [2, 3, 4, 5, '6', 'b', ['y', -2]],
        [3, 4, 5, 6, '7', 'c', ['z', -3]],
      ],
    ],
    [
      [
        [1, 2],
        createAsyncGeneratorFixture([2, 3, 4]),
        createAsyncIterableFixture([3, 4, 5]),
        createAsyncIteratorFixture([4, 5, 6]),
        '567',
        new Set(['a', 'b', 'c']),
        new Map([['x', -1], ['y', -2], ['z', -3]]),
      ],
      undefined,
      [
        [1, 2, 3, 4, '5', 'a', ['x', -1]],
        [2, 3, 4, 5, '6', 'b', ['y', -2]],
        [undefined, 4, 5, 6, '7', 'c', ['z', -3]],
      ],
    ],
    [
      [
        [],
        createAsyncGeneratorFixture([2, 3, 4]),
        createAsyncIterableFixture([3, 4, 5]),
        createAsyncIteratorFixture([4, 5, 6]),
        '567',
        new Set(['a', 'b', 'c']),
        new Map([['x', -1], ['y', -2], ['z', -3]]),
      ],
      undefined,
      [
        [undefined, 2, 3, 4, '5', 'a', ['x', -1]],
        [undefined, 3, 4, 5, '6', 'b', ['y', -2]],
        [undefined, 4, 5, 6, '7', 'c', ['z', -3]],
      ],
    ],
  ];
}
