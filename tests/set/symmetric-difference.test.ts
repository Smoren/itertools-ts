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
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMixed(),
])(
  "Set Symmetric Difference Test",
  (input, expected) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of set.symmetricDifference(...input)) {
        result.push(item);
      }

      result.sort();
      expected.sort();

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
  ...dataProviderForMixed(),
  ...dataProviderForMixedAsync(),
])(
  "Set Symmetric Difference Async Test",
  (input, expected) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of set.symmetricDifferenceAsync(...input)) {
        result.push(item);
      }

      result.sort();
      expected.sort();

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<[Array<Array<any>>, Array<any>]> {
  return [
    // sets:
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
        [],
        [],
      ],
      [],
    ],
    [
      [
        [],
        [],
        [],
      ],
      [],
    ],
    [
      [
        [2],
        [],
      ],
      [2],
    ],
    [
      [
        [],
        [2],
      ],
      [2],
    ],
    [
      [
        [2],
        [2],
      ],
      [],
    ],
    [
      [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
      ],
      [],
    ],
    [
      [
        [1, 2, 3, 4, 5],
        [1, 2, 3, '4', '5'],
      ],
      [4, '4', 5, '5'],
    ],
    [
      [
        ['1', '2', '3', 4, 5],
        [1, 2, 3, '4', '5'],
      ],
      ['1', 1, '2', 2, '3', 3, 4, '4', 5, '5'],
    ],
    [
      [
        [null, 1, 6, null],
        [null, 2, 7, 11, null],
        [null, 3, 8, 12, 15, null],
        [null, 4, 9, 13, 16, 18, null],
        [null, 5, 10, 14, 17, 19, 20, null],
      ],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    ],
    [
      [
        [null, 1, 6, null],
        [null, '1', 7, 11, null],
        [null, '1.0', 8, 12, 15, null],
        [null, true, 9, 13, 16, 18, null],
        [null, 'true', 10, 14, 17, 19, 20, null],
      ],
      [1, '1', '1.0', true, 'true', 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    ],
    [
      [
        ['1', 2, '3.3', true, false],
        [true, '2', 3.3, '4', '5'],
      ],
      ['1', 2, '2', '3.3', 3.3, '4', false, '5'],
    ],
    // multisets:
    [
      [
        [2, 2],
        [],
      ],
      [2, 2],
    ],
    [
      [
        [2, 2],
        [2, 2],
      ],
      [],
    ],
    [
      [
        [2, 2, 3],
        [2, 2, 4],
      ],
      [3, 4],
    ],
    [
      [
        [1, 1, 2, 2, 1, 1],
        [2, 2, 1, 1, 2, 2],
      ],
      [1, 1, 2, 2],
    ],
    [
      [
        [1, 1, 2, 2, 1, 1],
        [2, 2, 1, 1, '2', '2'],
      ],
      [1, 1, '2', '2'],
    ],
    [
      [
        [1, 1, 2, 2, 1, 1],
        [2, 2, '1', '1', 2, 2],
      ],
      [1, 1, 1, 1, 2, 2, '1', '1'],
    ],
    [
      [
        [1, 1, 1, 1, 1],
        [1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
        [5, 5, 5, 5, 5, 1, 5, 5, 1],
      ],
      [1, 1, 1, 5, 5, 5, 5, 5, 2, 2, 3, 3, 4, 4],
    ],
    [
      [
        [1, 1, '1', '1'],
        [1, 2, 3, 1, 2, 3],
        ['2', '3'],
      ],
      ['2', 2, 2, '3', '1', '1', 3, 3],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Array<Generator<any>>, Array<any>]> {
  return [
    // sets:
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
        createGeneratorFixture([2]),
        createGeneratorFixture([]),
      ],
      [2],
    ],
    [
      [
        createGeneratorFixture([]),
        createGeneratorFixture([2]),
      ],
      [2],
    ],
    [
      [
        createGeneratorFixture([2]),
        createGeneratorFixture([2]),
      ],
      [],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3, 4, 5]),
        createGeneratorFixture([1, 2, 3, 4, 5]),
      ],
      [],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3, 4, 5]),
        createGeneratorFixture([1, 2, 3, '4', '5']),
      ],
      [4, '4', 5, '5'],
    ],
    [
      [
        createGeneratorFixture(['1', '2', '3', 4, 5]),
        createGeneratorFixture([1, 2, 3, '4', '5']),
      ],
      ['1', 1, '2', 2, '3', 3, 4, '4', 5, '5'],
    ],
    [
      [
        createGeneratorFixture([null, 1, 6, null]),
        createGeneratorFixture([null, 2, 7, 11, null]),
        createGeneratorFixture([null, 3, 8, 12, 15, null]),
        createGeneratorFixture([null, 4, 9, 13, 16, 18, null]),
        createGeneratorFixture([null, 5, 10, 14, 17, 19, 20, null]),
      ],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    ],
    [
      [
        createGeneratorFixture([null, 1, 6, null]),
        createGeneratorFixture([null, '1', 7, 11, null]),
        createGeneratorFixture([null, '1.0', 8, 12, 15, null]),
        createGeneratorFixture([null, true, 9, 13, 16, 18, null]),
        createGeneratorFixture([null, 'true', 10, 14, 17, 19, 20, null]),
      ],
      [1, '1', '1.0', true, 'true', 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    ],
    [
      [
        createGeneratorFixture(['1', 2, '3.3', true, false]),
        createGeneratorFixture([true, '2', 3.3, '4', '5']),
      ],
      ['1', 2, '2', '3.3', 3.3, '4', false, '5'],
    ],
    // multisets:
    [
      [
        createGeneratorFixture([2, 2]),
        createGeneratorFixture([]),
      ],
      [2, 2],
    ],
    [
      [
        createGeneratorFixture([2, 2]),
        createGeneratorFixture([2, 2]),
      ],
      [],
    ],
    [
      [
        createGeneratorFixture([2, 2, 3]),
        createGeneratorFixture([2, 2, 4]),
      ],
      [3, 4],
    ],
    [
      [
        createGeneratorFixture([1, 1, 2, 2, 1, 1]),
        createGeneratorFixture([2, 2, 1, 1, 2, 2]),
      ],
      [1, 1, 2, 2],
    ],
    [
      [
        createGeneratorFixture([1, 1, 2, 2, 1, 1]),
        createGeneratorFixture([2, 2, 1, 1, '2', '2']),
      ],
      [1, 1, '2', '2'],
    ],
    [
      [
        createGeneratorFixture([1, 1, 2, 2, 1, 1]),
        createGeneratorFixture([2, 2, '1', '1', 2, 2]),
      ],
      [1, 1, 1, 1, 2, 2, '1', '1'],
    ],
    [
      [
        createGeneratorFixture([1, 1, 1, 1, 1]),
        createGeneratorFixture([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]),
        createGeneratorFixture([5, 5, 5, 5, 5, 1, 5, 5, 1]),
      ],
      [1, 1, 1, 5, 5, 5, 5, 5, 2, 2, 3, 3, 4, 4],
    ],
    [
      [
        createGeneratorFixture([1, 1, '1', '1']),
        createGeneratorFixture([1, 2, 3, 1, 2, 3]),
        createGeneratorFixture(['2', '3']),
      ],
      ['2', 2, 2, '3', '1', '1', 3, 3],
    ],
  ];
}

function dataProviderForIterables(): Array<[Array<Iterable<any>>, Array<any>]> {
  return [
    // sets:
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
        createIterableFixture([2]),
        createIterableFixture([]),
      ],
      [2],
    ],
    [
      [
        createIterableFixture([]),
        createIterableFixture([2]),
      ],
      [2],
    ],
    [
      [
        createIterableFixture([2]),
        createIterableFixture([2]),
      ],
      [],
    ],
    [
      [
        createIterableFixture([1, 2, 3, 4, 5]),
        createIterableFixture([1, 2, 3, 4, 5]),
      ],
      [],
    ],
    [
      [
        createIterableFixture([1, 2, 3, 4, 5]),
        createIterableFixture([1, 2, 3, '4', '5']),
      ],
      [4, '4', 5, '5'],
    ],
    [
      [
        createIterableFixture(['1', '2', '3', 4, 5]),
        createIterableFixture([1, 2, 3, '4', '5']),
      ],
      ['1', 1, '2', 2, '3', 3, 4, '4', 5, '5'],
    ],
    [
      [
        createIterableFixture([null, 1, 6, null]),
        createIterableFixture([null, 2, 7, 11, null]),
        createIterableFixture([null, 3, 8, 12, 15, null]),
        createIterableFixture([null, 4, 9, 13, 16, 18, null]),
        createIterableFixture([null, 5, 10, 14, 17, 19, 20, null]),
      ],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    ],
    [
      [
        createIterableFixture([null, 1, 6, null]),
        createIterableFixture([null, '1', 7, 11, null]),
        createIterableFixture([null, '1.0', 8, 12, 15, null]),
        createIterableFixture([null, true, 9, 13, 16, 18, null]),
        createIterableFixture([null, 'true', 10, 14, 17, 19, 20, null]),
      ],
      [1, '1', '1.0', true, 'true', 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    ],
    [
      [
        createIterableFixture(['1', 2, '3.3', true, false]),
        createIterableFixture([true, '2', 3.3, '4', '5']),
      ],
      ['1', 2, '2', '3.3', 3.3, '4', false, '5'],
    ],
    // multisets:
    [
      [
        createIterableFixture([2, 2]),
        createIterableFixture([]),
      ],
      [2, 2],
    ],
    [
      [
        createIterableFixture([2, 2]),
        createIterableFixture([2, 2]),
      ],
      [],
    ],
    [
      [
        createIterableFixture([2, 2, 3]),
        createIterableFixture([2, 2, 4]),
      ],
      [3, 4],
    ],
    [
      [
        createIterableFixture([1, 1, 2, 2, 1, 1]),
        createIterableFixture([2, 2, 1, 1, 2, 2]),
      ],
      [1, 1, 2, 2],
    ],
    [
      [
        createIterableFixture([1, 1, 2, 2, 1, 1]),
        createIterableFixture([2, 2, 1, 1, '2', '2']),
      ],
      [1, 1, '2', '2'],
    ],
    [
      [
        createIterableFixture([1, 1, 2, 2, 1, 1]),
        createIterableFixture([2, 2, '1', '1', 2, 2]),
      ],
      [1, 1, 1, 1, 2, 2, '1', '1'],
    ],
    [
      [
        createIterableFixture([1, 1, 1, 1, 1]),
        createIterableFixture([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]),
        createIterableFixture([5, 5, 5, 5, 5, 1, 5, 5, 1]),
      ],
      [1, 1, 1, 5, 5, 5, 5, 5, 2, 2, 3, 3, 4, 4],
    ],
    [
      [
        createIterableFixture([1, 1, '1', '1']),
        createIterableFixture([1, 2, 3, 1, 2, 3]),
        createIterableFixture(['2', '3']),
      ],
      ['2', 2, 2, '3', '1', '1', 3, 3],
    ],
  ];
}

function dataProviderForIterators(): Array<[Array<Iterator<any>>, Array<any>]> {
  return [
    // sets:
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
        createIteratorFixture([2]),
        createIteratorFixture([]),
      ],
      [2],
    ],
    [
      [
        createIteratorFixture([]),
        createIteratorFixture([2]),
      ],
      [2],
    ],
    [
      [
        createIteratorFixture([2]),
        createIteratorFixture([2]),
      ],
      [],
    ],
    [
      [
        createIteratorFixture([1, 2, 3, 4, 5]),
        createIteratorFixture([1, 2, 3, 4, 5]),
      ],
      [],
    ],
    [
      [
        createIteratorFixture([1, 2, 3, 4, 5]),
        createIteratorFixture([1, 2, 3, '4', '5']),
      ],
      [4, '4', 5, '5'],
    ],
    [
      [
        createIteratorFixture(['1', '2', '3', 4, 5]),
        createIteratorFixture([1, 2, 3, '4', '5']),
      ],
      ['1', 1, '2', 2, '3', 3, 4, '4', 5, '5'],
    ],
    [
      [
        createIteratorFixture([null, 1, 6, null]),
        createIteratorFixture([null, 2, 7, 11, null]),
        createIteratorFixture([null, 3, 8, 12, 15, null]),
        createIteratorFixture([null, 4, 9, 13, 16, 18, null]),
        createIteratorFixture([null, 5, 10, 14, 17, 19, 20, null]),
      ],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    ],
    [
      [
        createIteratorFixture([null, 1, 6, null]),
        createIteratorFixture([null, '1', 7, 11, null]),
        createIteratorFixture([null, '1.0', 8, 12, 15, null]),
        createIteratorFixture([null, true, 9, 13, 16, 18, null]),
        createIteratorFixture([null, 'true', 10, 14, 17, 19, 20, null]),
      ],
      [1, '1', '1.0', true, 'true', 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    ],
    [
      [
        createIteratorFixture(['1', 2, '3.3', true, false]),
        createIteratorFixture([true, '2', 3.3, '4', '5']),
      ],
      ['1', 2, '2', '3.3', 3.3, '4', false, '5'],
    ],
    // multisets:
    [
      [
        createIteratorFixture([2, 2]),
        createIteratorFixture([]),
      ],
      [2, 2],
    ],
    [
      [
        createIteratorFixture([2, 2]),
        createIteratorFixture([2, 2]),
      ],
      [],
    ],
    [
      [
        createIteratorFixture([2, 2, 3]),
        createIteratorFixture([2, 2, 4]),
      ],
      [3, 4],
    ],
    [
      [
        createIteratorFixture([1, 1, 2, 2, 1, 1]),
        createIteratorFixture([2, 2, 1, 1, 2, 2]),
      ],
      [1, 1, 2, 2],
    ],
    [
      [
        createIteratorFixture([1, 1, 2, 2, 1, 1]),
        createIteratorFixture([2, 2, 1, 1, '2', '2']),
      ],
      [1, 1, '2', '2'],
    ],
    [
      [
        createIteratorFixture([1, 1, 2, 2, 1, 1]),
        createIteratorFixture([2, 2, '1', '1', 2, 2]),
      ],
      [1, 1, 1, 1, 2, 2, '1', '1'],
    ],
    [
      [
        createIteratorFixture([1, 1, 1, 1, 1]),
        createIteratorFixture([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]),
        createIteratorFixture([5, 5, 5, 5, 5, 1, 5, 5, 1]),
      ],
      [1, 1, 1, 5, 5, 5, 5, 5, 2, 2, 3, 3, 4, 4],
    ],
    [
      [
        createIteratorFixture([1, 1, '1', '1']),
        createIteratorFixture([1, 2, 3, 1, 2, 3]),
        createIteratorFixture(['2', '3']),
      ],
      ['2', 2, 2, '3', '1', '1', 3, 3],
    ],
  ];
}

function dataProviderForStrings(): Array<[Array<string>, Array<any>]> {
  return [
    // sets:
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
        '',
        '',
      ],
      [],
    ],
    [
      [
        '',
        '',
        '',
      ],
      [],
    ],
    [
      [
        '2',
        '',
      ],
      ['2'],
    ],
    [
      [
        '',
        '2',
      ],
      ['2'],
    ],
    [
      [
        '2',
        '2',
      ],
      [],
    ],
    [
      [
        '12345',
        '12345',
      ],
      [],
    ],
    [
      [
        '016',
        '027b',
        '038cf',
        '049dgi',
        '05aehjk',
      ],
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'],
    ],
    // multisets:
    [
      [
        '22',
        '',
      ],
      ['2', '2'],
    ],
    [
      [
        '22',
        '22',
      ],
      [],
    ],
    [
      [
        '223',
        '224',
      ],
      ['3', '4'],
    ],
    [
      [
        '112211',
        '221122',
      ],
      ['1', '1', '2', '2'],
    ],
    [
      [
        '11111',
        '1234512345',
        '555551551',
      ],
      ['1', '1', '1', '5', '5', '5', '5', '5', '2', '2', '3', '3', '4', '4'],
    ],
  ];
}

function dataProviderForSets(): Array<[Array<Set<any>>, Array<any>]> {
  return [
    // sets:
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
        new Set([2]),
        new Set([]),
      ],
      [2],
    ],
    [
      [
        new Set([]),
        new Set([2]),
      ],
      [2],
    ],
    [
      [
        new Set([2]),
        new Set([2]),
      ],
      [],
    ],
    [
      [
        new Set([1, 2, 3, 4, 5]),
        new Set([1, 2, 3, 4, 5]),
      ],
      [],
    ],
    [
      [
        new Set([1, 2, 3, 4, 5]),
        new Set([1, 2, 3, '4', '5']),
      ],
      [4, '4', 5, '5'],
    ],
    [
      [
        new Set(['1', '2', '3', 4, 5]),
        new Set([1, 2, 3, '4', '5']),
      ],
      ['1', 1, '2', 2, '3', 3, 4, '4', 5, '5'],
    ],
    [
      [
        new Set([null, 1, 6]),
        new Set([null, 2, 7, 11]),
        new Set([null, 3, 8, 12, 15]),
        new Set([null, 4, 9, 13, 16, 18]),
        new Set([null, 5, 10, 14, 17, 19, 20]),
      ],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    ],
    [
      [
        new Set([null, 1, 6]),
        new Set([null, '1', 7, 11]),
        new Set([null, '1.0', 8, 12, 15]),
        new Set([null, true, 9, 13, 16, 18]),
        new Set([null, 'true', 10, 14, 17, 19, 20]),
      ],
      [1, '1', '1.0', true, 'true', 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    ],
    [
      [
        new Set(['1', 2, '3.3', true, false]),
        new Set([true, '2', 3.3, '4', '5']),
      ],
      ['1', 2, '2', '3.3', 3.3, '4', false, '5'],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[Array<AsyncGenerator<any>>, Array<any>]> {
  return [
    // sets:
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
        createAsyncGeneratorFixture([2]),
        createAsyncGeneratorFixture([]),
      ],
      [2],
    ],
    [
      [
        createAsyncGeneratorFixture([]),
        createAsyncGeneratorFixture([2]),
      ],
      [2],
    ],
    [
      [
        createAsyncGeneratorFixture([2]),
        createAsyncGeneratorFixture([2]),
      ],
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
        createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
      ],
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
        createAsyncGeneratorFixture([1, 2, 3, '4', '5']),
      ],
      [4, '4', 5, '5'],
    ],
    [
      [
        createAsyncGeneratorFixture(['1', '2', '3', 4, 5]),
        createAsyncGeneratorFixture([1, 2, 3, '4', '5']),
      ],
      ['1', 1, '2', 2, '3', 3, 4, '4', 5, '5'],
    ],
    [
      [
        createAsyncGeneratorFixture([null, 1, 6, null]),
        createAsyncGeneratorFixture([null, 2, 7, 11, null]),
        createAsyncGeneratorFixture([null, 3, 8, 12, 15, null]),
        createAsyncGeneratorFixture([null, 4, 9, 13, 16, 18, null]),
        createAsyncGeneratorFixture([null, 5, 10, 14, 17, 19, 20, null]),
      ],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    ],
    [
      [
        createAsyncGeneratorFixture([null, 1, 6, null]),
        createAsyncGeneratorFixture([null, '1', 7, 11, null]),
        createAsyncGeneratorFixture([null, '1.0', 8, 12, 15, null]),
        createAsyncGeneratorFixture([null, true, 9, 13, 16, 18, null]),
        createAsyncGeneratorFixture([null, 'true', 10, 14, 17, 19, 20, null]),
      ],
      [1, '1', '1.0', true, 'true', 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    ],
    [
      [
        createAsyncGeneratorFixture(['1', 2, '3.3', true, false]),
        createAsyncGeneratorFixture([true, '2', 3.3, '4', '5']),
      ],
      ['1', 2, '2', '3.3', 3.3, '4', false, '5'],
    ],
    // multisets:
    [
      [
        createAsyncGeneratorFixture([2, 2]),
        createAsyncGeneratorFixture([]),
      ],
      [2, 2],
    ],
    [
      [
        createAsyncGeneratorFixture([2, 2]),
        createAsyncGeneratorFixture([2, 2]),
      ],
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([2, 2, 3]),
        createAsyncGeneratorFixture([2, 2, 4]),
      ],
      [3, 4],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 1, 2, 2, 1, 1]),
        createAsyncGeneratorFixture([2, 2, 1, 1, 2, 2]),
      ],
      [1, 1, 2, 2],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 1, 2, 2, 1, 1]),
        createAsyncGeneratorFixture([2, 2, 1, 1, '2', '2']),
      ],
      [1, 1, '2', '2'],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 1, 2, 2, 1, 1]),
        createAsyncGeneratorFixture([2, 2, '1', '1', 2, 2]),
      ],
      [1, 1, 1, 1, 2, 2, '1', '1'],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 1, 1, 1, 1]),
        createAsyncGeneratorFixture([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]),
        createAsyncGeneratorFixture([5, 5, 5, 5, 5, 1, 5, 5, 1]),
      ],
      [1, 1, 1, 5, 5, 5, 5, 5, 2, 2, 3, 3, 4, 4],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 1, '1', '1']),
        createAsyncGeneratorFixture([1, 2, 3, 1, 2, 3]),
        createAsyncGeneratorFixture(['2', '3']),
      ],
      ['2', 2, 2, '3', '1', '1', 3, 3],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[Array<AsyncIterable<any>>, Array<any>]> {
  return [
    // sets:
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
        createAsyncIterableFixture([2]),
        createAsyncIterableFixture([]),
      ],
      [2],
    ],
    [
      [
        createAsyncIterableFixture([]),
        createAsyncIterableFixture([2]),
      ],
      [2],
    ],
    [
      [
        createAsyncIterableFixture([2]),
        createAsyncIterableFixture([2]),
      ],
      [],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3, 4, 5]),
        createAsyncIterableFixture([1, 2, 3, 4, 5]),
      ],
      [],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3, 4, 5]),
        createAsyncIterableFixture([1, 2, 3, '4', '5']),
      ],
      [4, '4', 5, '5'],
    ],
    [
      [
        createAsyncIterableFixture(['1', '2', '3', 4, 5]),
        createAsyncIterableFixture([1, 2, 3, '4', '5']),
      ],
      ['1', 1, '2', 2, '3', 3, 4, '4', 5, '5'],
    ],
    [
      [
        createAsyncIterableFixture([null, 1, 6, null]),
        createAsyncIterableFixture([null, 2, 7, 11, null]),
        createAsyncIterableFixture([null, 3, 8, 12, 15, null]),
        createAsyncIterableFixture([null, 4, 9, 13, 16, 18, null]),
        createAsyncIterableFixture([null, 5, 10, 14, 17, 19, 20, null]),
      ],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    ],
    [
      [
        createAsyncIterableFixture([null, 1, 6, null]),
        createAsyncIterableFixture([null, '1', 7, 11, null]),
        createAsyncIterableFixture([null, '1.0', 8, 12, 15, null]),
        createAsyncIterableFixture([null, true, 9, 13, 16, 18, null]),
        createAsyncIterableFixture([null, 'true', 10, 14, 17, 19, 20, null]),
      ],
      [1, '1', '1.0', true, 'true', 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    ],
    [
      [
        createAsyncIterableFixture(['1', 2, '3.3', true, false]),
        createAsyncIterableFixture([true, '2', 3.3, '4', '5']),
      ],
      ['1', 2, '2', '3.3', 3.3, '4', false, '5'],
    ],
    // multisets:
    [
      [
        createAsyncIterableFixture([2, 2]),
        createAsyncIterableFixture([]),
      ],
      [2, 2],
    ],
    [
      [
        createAsyncIterableFixture([2, 2]),
        createAsyncIterableFixture([2, 2]),
      ],
      [],
    ],
    [
      [
        createAsyncIterableFixture([2, 2, 3]),
        createAsyncIterableFixture([2, 2, 4]),
      ],
      [3, 4],
    ],
    [
      [
        createAsyncIterableFixture([1, 1, 2, 2, 1, 1]),
        createAsyncIterableFixture([2, 2, 1, 1, 2, 2]),
      ],
      [1, 1, 2, 2],
    ],
    [
      [
        createAsyncIterableFixture([1, 1, 2, 2, 1, 1]),
        createAsyncIterableFixture([2, 2, 1, 1, '2', '2']),
      ],
      [1, 1, '2', '2'],
    ],
    [
      [
        createAsyncIterableFixture([1, 1, 2, 2, 1, 1]),
        createAsyncIterableFixture([2, 2, '1', '1', 2, 2]),
      ],
      [1, 1, 1, 1, 2, 2, '1', '1'],
    ],
    [
      [
        createAsyncIterableFixture([1, 1, 1, 1, 1]),
        createAsyncIterableFixture([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]),
        createAsyncIterableFixture([5, 5, 5, 5, 5, 1, 5, 5, 1]),
      ],
      [1, 1, 1, 5, 5, 5, 5, 5, 2, 2, 3, 3, 4, 4],
    ],
    [
      [
        createAsyncIterableFixture([1, 1, '1', '1']),
        createAsyncIterableFixture([1, 2, 3, 1, 2, 3]),
        createAsyncIterableFixture(['2', '3']),
      ],
      ['2', 2, 2, '3', '1', '1', 3, 3],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[Array<AsyncIterator<any>>, Array<any>]> {
  return [
    // sets:
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
        createAsyncIteratorFixture([2]),
        createAsyncIteratorFixture([]),
      ],
      [2],
    ],
    [
      [
        createAsyncIteratorFixture([]),
        createAsyncIteratorFixture([2]),
      ],
      [2],
    ],
    [
      [
        createAsyncIteratorFixture([2]),
        createAsyncIteratorFixture([2]),
      ],
      [],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3, 4, 5]),
        createAsyncIteratorFixture([1, 2, 3, 4, 5]),
      ],
      [],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3, 4, 5]),
        createAsyncIteratorFixture([1, 2, 3, '4', '5']),
      ],
      [4, '4', 5, '5'],
    ],
    [
      [
        createAsyncIteratorFixture(['1', '2', '3', 4, 5]),
        createAsyncIteratorFixture([1, 2, 3, '4', '5']),
      ],
      ['1', 1, '2', 2, '3', 3, 4, '4', 5, '5'],
    ],
    [
      [
        createAsyncIteratorFixture([null, 1, 6, null]),
        createAsyncIteratorFixture([null, 2, 7, 11, null]),
        createAsyncIteratorFixture([null, 3, 8, 12, 15, null]),
        createAsyncIteratorFixture([null, 4, 9, 13, 16, 18, null]),
        createAsyncIteratorFixture([null, 5, 10, 14, 17, 19, 20, null]),
      ],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    ],
    [
      [
        createAsyncIteratorFixture([null, 1, 6, null]),
        createAsyncIteratorFixture([null, '1', 7, 11, null]),
        createAsyncIteratorFixture([null, '1.0', 8, 12, 15, null]),
        createAsyncIteratorFixture([null, true, 9, 13, 16, 18, null]),
        createAsyncIteratorFixture([null, 'true', 10, 14, 17, 19, 20, null]),
      ],
      [1, '1', '1.0', true, 'true', 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    ],
    [
      [
        createAsyncIteratorFixture(['1', 2, '3.3', true, false]),
        createAsyncIteratorFixture([true, '2', 3.3, '4', '5']),
      ],
      ['1', 2, '2', '3.3', 3.3, '4', false, '5'],
    ],
    // multisets:
    [
      [
        createAsyncIteratorFixture([2, 2]),
        createAsyncIteratorFixture([]),
      ],
      [2, 2],
    ],
    [
      [
        createAsyncIteratorFixture([2, 2]),
        createAsyncIteratorFixture([2, 2]),
      ],
      [],
    ],
    [
      [
        createAsyncIteratorFixture([2, 2, 3]),
        createAsyncIteratorFixture([2, 2, 4]),
      ],
      [3, 4],
    ],
    [
      [
        createAsyncIteratorFixture([1, 1, 2, 2, 1, 1]),
        createAsyncIteratorFixture([2, 2, 1, 1, 2, 2]),
      ],
      [1, 1, 2, 2],
    ],
    [
      [
        createAsyncIteratorFixture([1, 1, 2, 2, 1, 1]),
        createAsyncIteratorFixture([2, 2, 1, 1, '2', '2']),
      ],
      [1, 1, '2', '2'],
    ],
    [
      [
        createAsyncIteratorFixture([1, 1, 2, 2, 1, 1]),
        createAsyncIteratorFixture([2, 2, '1', '1', 2, 2]),
      ],
      [1, 1, 1, 1, 2, 2, '1', '1'],
    ],
    [
      [
        createAsyncIteratorFixture([1, 1, 1, 1, 1]),
        createAsyncIteratorFixture([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]),
        createAsyncIteratorFixture([5, 5, 5, 5, 5, 1, 5, 5, 1]),
      ],
      [1, 1, 1, 5, 5, 5, 5, 5, 2, 2, 3, 3, 4, 4],
    ],
    [
      [
        createAsyncIteratorFixture([1, 1, '1', '1']),
        createAsyncIteratorFixture([1, 2, 3, 1, 2, 3]),
        createAsyncIteratorFixture(['2', '3']),
      ],
      ['2', 2, 2, '3', '1', '1', 3, 3],
    ],
  ];
}

function dataProviderForMixed(): Array<[Array<Iterable<any> | Iterator<any>>, Array<any>]> {
  return [
    [
      [
        [],
        createGeneratorFixture([]),
        createIterableFixture([]),
        createIteratorFixture([]),
      ],
      [],
    ],
    [
      [
        [1, 1, 1],
        createGeneratorFixture([1, 2, 3, 1, 2, 3]),
        createIterableFixture([3, 3, 3, 1]),
        createIteratorFixture([]),
      ],
      [1, 3, 2, 2],
    ],
    [
      [
        [1, 1, 1],
        createGeneratorFixture([1, 2, 3, 1, 2, 3]),
        createIterableFixture(['3', 3, 3, 1]),
        createIteratorFixture([]),
      ],
      [1, '3', 2, 2],
    ],
    [
      [
        [1, 1, 1, 1, 1],
        createGeneratorFixture([1, 1, 1, 1, '1']),
        createIterableFixture([1, 1, 1, 1, 1.1]),
        createIteratorFixture([1, 1, 1, 1, true]),
      ],
      [1, '1', 1.1, true],
    ],
  ];
}

function dataProviderForMixedAsync(): Array<[Array<Iterable<any> | Iterator<any> | AsyncIterable<any> | AsyncIterator<any>>, Array<any>]> {
  return [
    [
      [
        createAsyncGeneratorFixture([1, 1, 1]),
        createAsyncGeneratorFixture([1, 2, 3, 1, 2, 3]),
        createAsyncIterableFixture([3, 3, 3, 1]),
        createAsyncIteratorFixture([]),
      ],
      [1, 3, 2, 2],
    ],
    [
      [
        [],
        createAsyncGeneratorFixture([]),
        createIterableFixture([]),
        createIteratorFixture([]),
      ],
      [],
    ],
    [
      [
        [1, 1, 1],
        createGeneratorFixture([1, 2, 3, 1, 2, 3]),
        createAsyncIterableFixture([3, 3, 3, 1]),
        createAsyncIteratorFixture([]),
      ],
      [1, 3, 2, 2],
    ],
    [
      [
        [1, 1, 1],
        createAsyncGeneratorFixture([1, 2, 3, 1, 2, 3]),
        createAsyncIterableFixture(['3', 3, 3, 1]),
        createIteratorFixture([]),
      ],
      [1, '3', 2, 2],
    ],
    [
      [
        [1, 1, 1, 1, 1],
        createGeneratorFixture([1, 1, 1, 1, '1']),
        createAsyncIterableFixture([1, 1, 1, 1, 1.1]),
        createIteratorFixture([1, 1, 1, 1, true]),
      ],
      [1, '1', 1.1, true],
    ],
  ];
}
