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
  "Set Union Test",
  (
    input: Array<Iterable<unknown>|Iterator<unknown>>,
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of set.union(...input)) {
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
        [1],
      ],
      [1],
    ],
    [
      [
        [1, 2],
      ],
      [1, 2],
    ],
    [
      [
        [1, 2],
        [2, 3],
      ],
      [1, 2, 3],
    ],
    [
      [
        [1, 2],
        [3, 4],
      ],
      [1, 2, 3, 4],
    ],
    [
      [
        [1, 2],
        [3, 4],
        [4, 5],
      ],
      [1, 2, 3, 4, 5],
    ],
    [
      [
        [1, 2],
        [3, 4],
        [5, 6],
      ],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [
        [1, 2.2, '3', true, null],
        [1, 2.2, 3, false, Infinity],
      ],
      [1, 2.2, '3', 3, true, false, null, Infinity],
    ],
    // multisets:
    [
      [
        [],
        [1, 1],
      ],
      [1, 1],
    ],
    [
      [
        [1],
        [1, 1],
      ],
      [1, 1],
    ],
    [
      [
        [1, 1],
        [1, 1],
      ],
      [1, 1],
    ],
    [
      [
        [1, 1, 1],
        [1, 1],
      ],
      [1, 1, 1],
    ],
    [
      [
        [1, 2],
        [1, 1],
      ],
      [1, 1, 2],
    ],
    [
      [
        [1, 2],
        [3, 3],
      ],
      [1, 2, 3, 3],
    ],
    [
      [
        [1, 2],
        [3, 3],
        [4, 5, 5],
      ],
      [1, 2, 3, 3, 4, 5, 5],
    ],
    [
      [
        [1],
        [1, 1, 2],
        [1, 1, 1, 3],
      ],
      [1, 1, 1, 2, 3],
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
        createGeneratorFixture([1]),
      ],
      [1],
    ],
    [
      [
        createGeneratorFixture([1, 2]),
      ],
      [1, 2],
    ],
    [
      [
        createGeneratorFixture([1, 2]),
        createGeneratorFixture([2, 3]),
      ],
      [1, 2, 3],
    ],
    [
      [
        createGeneratorFixture([1, 2]),
        createGeneratorFixture([3, 4]),
      ],
      [1, 2, 3, 4],
    ],
    [
      [
        createGeneratorFixture([1, 2]),
        createGeneratorFixture([3, 4]),
        createGeneratorFixture([4, 5]),
      ],
      [1, 2, 3, 4, 5],
    ],
    [
      [
        createGeneratorFixture([1, 2]),
        createGeneratorFixture([3, 4]),
        createGeneratorFixture([5, 6]),
      ],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [
        createGeneratorFixture([1, 2.2, '3', true, null]),
        createGeneratorFixture([1, 2.2, 3, false, Infinity]),
      ],
      [1, 2.2, '3', 3, true, false, null, Infinity],
    ],
    // multisets:
    [
      [
        createGeneratorFixture([]),
        createGeneratorFixture([1, 1]),
      ],
      [1, 1],
    ],
    [
      [
        createGeneratorFixture([1]),
        createGeneratorFixture([1, 1]),
      ],
      [1, 1],
    ],
    [
      [
        createGeneratorFixture([1, 1]),
        createGeneratorFixture([1, 1]),
      ],
      [1, 1],
    ],
    [
      [
        createGeneratorFixture([1, 1, 1]),
        createGeneratorFixture([1, 1]),
      ],
      [1, 1, 1],
    ],
    [
      [
        createGeneratorFixture([1, 2]),
        createGeneratorFixture([1, 1]),
      ],
      [1, 1, 2],
    ],
    [
      [
        createGeneratorFixture([1, 2]),
        createGeneratorFixture([3, 3]),
      ],
      [1, 2, 3, 3],
    ],
    [
      [
        createGeneratorFixture([1, 2]),
        createGeneratorFixture([3, 3]),
        createGeneratorFixture([4, 5, 5]),
      ],
      [1, 2, 3, 3, 4, 5, 5],
    ],
    [
      [
        createGeneratorFixture([1]),
        createGeneratorFixture([1, 1, 2]),
        createGeneratorFixture([1, 1, 1, 3]),
      ],
      [1, 1, 1, 2, 3],
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
        createIterableFixture([1]),
      ],
      [1],
    ],
    [
      [
        createIterableFixture([1, 2]),
      ],
      [1, 2],
    ],
    [
      [
        createIterableFixture([1, 2]),
        createIterableFixture([2, 3]),
      ],
      [1, 2, 3],
    ],
    [
      [
        createIterableFixture([1, 2]),
        createIterableFixture([3, 4]),
      ],
      [1, 2, 3, 4],
    ],
    [
      [
        createIterableFixture([1, 2]),
        createIterableFixture([3, 4]),
        createIterableFixture([4, 5]),
      ],
      [1, 2, 3, 4, 5],
    ],
    [
      [
        createIterableFixture([1, 2]),
        createIterableFixture([3, 4]),
        createIterableFixture([5, 6]),
      ],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [
        createIterableFixture([1, 2.2, '3', true, null]),
        createIterableFixture([1, 2.2, 3, false, Infinity]),
      ],
      [1, 2.2, '3', 3, true, false, null, Infinity],
    ],
    // multisets:
    [
      [
        createIterableFixture([]),
        createIterableFixture([1, 1]),
      ],
      [1, 1],
    ],
    [
      [
        createIterableFixture([1]),
        createIterableFixture([1, 1]),
      ],
      [1, 1],
    ],
    [
      [
        createIterableFixture([1, 1]),
        createIterableFixture([1, 1]),
      ],
      [1, 1],
    ],
    [
      [
        createIterableFixture([1, 1, 1]),
        createIterableFixture([1, 1]),
      ],
      [1, 1, 1],
    ],
    [
      [
        createIterableFixture([1, 2]),
        createIterableFixture([1, 1]),
      ],
      [1, 1, 2],
    ],
    [
      [
        createIterableFixture([1, 2]),
        createIterableFixture([3, 3]),
      ],
      [1, 2, 3, 3],
    ],
    [
      [
        createIterableFixture([1, 2]),
        createIterableFixture([3, 3]),
        createIterableFixture([4, 5, 5]),
      ],
      [1, 2, 3, 3, 4, 5, 5],
    ],
    [
      [
        createIterableFixture([1]),
        createIterableFixture([1, 1, 2]),
        createIterableFixture([1, 1, 1, 3]),
      ],
      [1, 1, 1, 2, 3],
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
        createIteratorFixture([1]),
      ],
      [1],
    ],
    [
      [
        createIteratorFixture([1, 2]),
      ],
      [1, 2],
    ],
    [
      [
        createIteratorFixture([1, 2]),
        createIteratorFixture([2, 3]),
      ],
      [1, 2, 3],
    ],
    [
      [
        createIteratorFixture([1, 2]),
        createIteratorFixture([3, 4]),
      ],
      [1, 2, 3, 4],
    ],
    [
      [
        createIteratorFixture([1, 2]),
        createIteratorFixture([3, 4]),
        createIteratorFixture([4, 5]),
      ],
      [1, 2, 3, 4, 5],
    ],
    [
      [
        createIteratorFixture([1, 2]),
        createIteratorFixture([3, 4]),
        createIteratorFixture([5, 6]),
      ],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [
        createIteratorFixture([1, 2.2, '3', true, null]),
        createIteratorFixture([1, 2.2, 3, false, Infinity]),
      ],
      [1, 2.2, '3', 3, true, false, null, Infinity],
    ],
    // multisets:
    [
      [
        createIteratorFixture([]),
        createIteratorFixture([1, 1]),
      ],
      [1, 1],
    ],
    [
      [
        createIteratorFixture([1]),
        createIteratorFixture([1, 1]),
      ],
      [1, 1],
    ],
    [
      [
        createIteratorFixture([1, 1]),
        createIteratorFixture([1, 1]),
      ],
      [1, 1],
    ],
    [
      [
        createIteratorFixture([1, 1, 1]),
        createIteratorFixture([1, 1]),
      ],
      [1, 1, 1],
    ],
    [
      [
        createIteratorFixture([1, 2]),
        createIteratorFixture([1, 1]),
      ],
      [1, 1, 2],
    ],
    [
      [
        createIteratorFixture([1, 2]),
        createIteratorFixture([3, 3]),
      ],
      [1, 2, 3, 3],
    ],
    [
      [
        createIteratorFixture([1, 2]),
        createIteratorFixture([3, 3]),
        createIteratorFixture([4, 5, 5]),
      ],
      [1, 2, 3, 3, 4, 5, 5],
    ],
    [
      [
        createIteratorFixture([1]),
        createIteratorFixture([1, 1, 2]),
        createIteratorFixture([1, 1, 1, 3]),
      ],
      [1, 1, 1, 2, 3],
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
        '1',
      ],
      ['1'],
    ],
    [
      [
        '12',
      ],
      ['1', '2'],
    ],
    [
      [
        '12',
        '23',
      ],
      ['1', '2', '3'],
    ],
    [
      [
        '12',
        '34',
      ],
      ['1', '2', '3', '4'],
    ],
    [
      [
        '12',
        '34',
        '45',
      ],
      ['1', '2', '3', '4', '5'],
    ],
    [
      [
        '12',
        '34',
        '56',
      ],
      ['1', '2', '3', '4', '5', '6'],
    ],
    // multisets:
    [
      [
        '',
        '11',
      ],
      ['1', '1'],
    ],
    [
      [
        '1',
        '11',
      ],
      ['1', '1'],
    ],
    [
      [
        '11',
        '11',
      ],
      ['1', '1'],
    ],
    [
      [
        '111',
        '11',
      ],
      ['1', '1', '1'],
    ],
    [
      [
        '12',
        '11',
      ],
      ['1', '1', '2'],
    ],
    [
      [
        '12',
        '33',
      ],
      ['1', '2', '3', '3'],
    ],
    [
      [
        '12',
        '33',
        '455',
      ],
      ['1', '2', '3', '3', '4', '5', '5'],
    ],
    [
      [
        '1',
        '112',
        '1113',
      ],
      ['1', '1', '1', '2', '3'],
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
        new Set([1]),
      ],
      [1],
    ],
    [
      [
        new Set([1, 2]),
      ],
      [1, 2],
    ],
    [
      [
        new Set([1, 2]),
        new Set([2, 3]),
      ],
      [1, 2, 3],
    ],
    [
      [
        new Set([1, 2]),
        new Set([3, 4]),
      ],
      [1, 2, 3, 4],
    ],
    [
      [
        new Set([1, 2]),
        new Set([3, 4]),
        new Set([4, 5]),
      ],
      [1, 2, 3, 4, 5],
    ],
    [
      [
        new Set([1, 2]),
        new Set([3, 4]),
        new Set([5, 6]),
      ],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [
        new Set([1, 2.2, '3', true, null]),
        new Set([1, 2.2, 3, false, Infinity]),
      ],
      [1, 2.2, '3', 3, true, false, null, Infinity],
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
        createIteratorFixture([1, 1]),
      ],
      [1, 1],
    ],
    [
      [
        [1, 1],
        createGeneratorFixture([1, 1]),
        createIterableFixture([1, 1]),
        createIteratorFixture([1, 1]),
      ],
      [1, 1],
    ],
    [
      [
        [1],
        createGeneratorFixture([]),
        createIterableFixture([1, 1, 1]),
        createIteratorFixture([1, 1]),
      ],
      [1, 1, 1],
    ],
    [
      [
        [1, 1],
        createGeneratorFixture([1, 2]),
        createIterableFixture([3, 3]),
        createIteratorFixture([4, 5, 5]),
      ],
      [1, 1, 2, 3, 3, 4, 5, 5],
    ],
    [
      [
        [1, 2],
        createGeneratorFixture([1]),
        createIterableFixture([1, 1, 2]),
        createIteratorFixture([1, 1, 1, 3]),
      ],
      [1, 1, 1, 2, 3],
    ],
    [
      [
        [1, 1, 2.2, '3', true, null],
        createGeneratorFixture([1, 1, 2.2, '3', true, null]),
        createIterableFixture([1.0, 1.0, 2.2, 3, false, Infinity]),
        createIteratorFixture([1.0, 1.0, 2.2, 3, false, Infinity]),
      ],
      [1, 1, 2.2, '3', 3, true, false, null, Infinity],
    ],
  ];
}
