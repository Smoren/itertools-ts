// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { set } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMixed(),
] as Array<[Array<Iterable<unknown>|Iterator<unknown>>, Array<unknown>]>)(
  "Set Symmetric Difference Test",
  (
    input: Array<Iterable<unknown>|Iterator<unknown>>,
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of set.symmetricDifference(...input)) {
        result.push(item);
      }

      (result as Array<number>).sort();
      (expected as Array<number>).sort();

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<unknown> {
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

function dataProviderForGenerators(): Array<unknown> {
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

function dataProviderForIterables(): Array<unknown> {
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

function dataProviderForIterators(): Array<unknown> {
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

function dataProviderForStrings(): Array<unknown> {
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

function dataProviderForSets(): Array<unknown> {
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

function dataProviderForMixed(): Array<unknown> {
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
