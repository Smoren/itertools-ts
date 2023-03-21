// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { single } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
] as Array<[Iterable<unknown>|Iterator<unknown>, Iterable<number>|Iterator<number>, Array<unknown>]>)(
  "Single Compress Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    selectors: Iterable<number>|Iterator<number>,
    expected: Array<unknown>
  ) => {
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

function dataProviderForArrays(): Array<unknown> {
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
      [1, 'true', true, 0, false],
      [1, 2, 3],
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
      [1, 'true', true, 0, false],
      [1, 2, 3],
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
      [1, 'true', true, 0, false],
      [1, 2, 3],
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
      [1, 'true', true, 0, false],
      [1, 2, 3],
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

function dataProviderForSets(): Array<unknown> {
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
      [1, 'true', true, 0, false],
      [1, 2, 3],
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
      [1, 'true', true, 0, false],
      [[0, 1], [1, 2], [2, 3]],
    ],
  ];
}
