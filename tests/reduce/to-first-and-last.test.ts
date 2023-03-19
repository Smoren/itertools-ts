// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { LengthError, reduce } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
] as Array<[Iterable<unknown>|Iterator<unknown>, [unknown, unknown]]>)(
  "Reduce To First And Last Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    expected: [unknown, unknown]
  ) => {
    it("", () => {
      // When
      const result = reduce.toFirstAndLast(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForError(),
] as Array<[Iterable<unknown>|Iterator<unknown>]>)(
  "Reduce To First And Last Error Test",
  (input: Iterable<unknown>|Iterator<unknown>) => {
    it("", () => {
      expect(() => {
        reduce.toFirstAndLast(input);
      }).toThrow(LengthError);
    });
  }
);

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [0],
      [0, 0],
    ],
    [
      [null],
      [null, null],
    ],
    [
      [''],
      ['', ''],
    ],
    [
      ['', null],
      ['', null],
    ],
    [
      [3, 2],
      [3, 2],
    ],
    [
      [1, 2, 3],
      [1, 3],
    ],
    [
      [1.1, 1.1, 2.1, 2.1, 3.1, 3.1],
      [1.1, 3.1],
    ],
    [
      [[1], '2', 3],
      [[1], 3],
    ],
    [
      [false, [1], '2', 3],
      [false, 3],
    ],
    [
      [true, [1], '2', 3],
      [true, 3],
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([0]),
      [0, 0],
    ],
    [
      createGeneratorFixture([null]),
      [null, null],
    ],
    [
      createGeneratorFixture(['']),
      ['', ''],
    ],
    [
      createGeneratorFixture(['', null]),
      ['', null],
    ],
    [
      createGeneratorFixture([3, 2]),
      [3, 2],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      [1, 3],
    ],
    [
      createGeneratorFixture([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      [1.1, 3.1],
    ],
    [
      createGeneratorFixture([[1], '2', 3]),
      [[1], 3],
    ],
    [
      createGeneratorFixture([false, [1], '2', 3]),
      [false, 3],
    ],
    [
      createGeneratorFixture([true, [1], '2', 3]),
      [true, 3],
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([0]),
      [0, 0],
    ],
    [
      createIterableFixture([null]),
      [null, null],
    ],
    [
      createIterableFixture(['']),
      ['', ''],
    ],
    [
      createIterableFixture(['', null]),
      ['', null],
    ],
    [
      createIterableFixture([3, 2]),
      [3, 2],
    ],
    [
      createIterableFixture([1, 2, 3]),
      [1, 3],
    ],
    [
      createIterableFixture([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      [1.1, 3.1],
    ],
    [
      createIterableFixture([[1], '2', 3]),
      [[1], 3],
    ],
    [
      createIterableFixture([false, [1], '2', 3]),
      [false, 3],
    ],
    [
      createIterableFixture([true, [1], '2', 3]),
      [true, 3],
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([0]),
      [0, 0],
    ],
    [
      createIteratorFixture([null]),
      [null, null],
    ],
    [
      createIteratorFixture(['']),
      ['', ''],
    ],
    [
      createIteratorFixture(['', null]),
      ['', null],
    ],
    [
      createIteratorFixture([3, 2]),
      [3, 2],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      [1, 3],
    ],
    [
      createIteratorFixture([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      [1.1, 3.1],
    ],
    [
      createIteratorFixture([[1], '2', 3]),
      [[1], 3],
    ],
    [
      createIteratorFixture([false, [1], '2', 3]),
      [false, 3],
    ],
    [
      createIteratorFixture([true, [1], '2', 3]),
      [true, 3],
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '0',
      ['0', '0'],
    ],
    [
      '01',
      ['0', '1'],
    ],
    [
      '10',
      ['1', '0'],
    ],
    [
      '32',
      ['3', '2'],
    ],
    [
      '123',
      ['1', '3'],
    ],
    [
      'abcdef',
      ['a', 'f'],
    ],
    [
      'fedcba',
      ['f', 'a'],
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([0]),
      [0, 0],
    ],
    [
      new Set([null]),
      [null, null],
    ],
    [
      new Set(['']),
      ['', ''],
    ],
    [
      new Set(['', null]),
      ['', null],
    ],
    [
      new Set([3, 2]),
      [3, 2],
    ],
    [
      new Set([1, 2, 3]),
      [1, 3],
    ],
    [
      new Set([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      [1.1, 3.1],
    ],
    [
      new Set([[1], '2', 3]),
      [[1], 3],
    ],
    [
      new Set([false, [1], '2', 3]),
      [false, 3],
    ],
    [
      new Set([true, [1], '2', 3]),
      [true, 3],
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      createMapFixture([0]),
      [[0, 0], [0, 0]],
    ],
    [
      createMapFixture([null]),
      [[0, null], [0, null]],
    ],
    [
      createMapFixture(['']),
      [[0, ''], [0, '']],
    ],
    [
      createMapFixture(['', null]),
      [[0, ''], [1, null]],
    ],
    [
      createMapFixture([3, 2]),
      [[0, 3], [1, 2]],
    ],
    [
      createMapFixture([1, 2, 3]),
      [[0, 1], [2, 3]],
    ],
    [
      createMapFixture([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      [[0, 1.1], [5, 3.1]],
    ],
    [
      createMapFixture([[1], '2', 3]),
      [[0, [1]], [2, 3]],
    ],
    [
      createMapFixture([false, [1], '2', 3]),
      [[0, false], [3, 3]],
    ],
    [
      createMapFixture([true, [1], '2', 3]),
      [[0, true], [3, 3]],
    ],
  ];
}

function dataProviderForError(): Array<unknown> {
  return [
    [
      [],
    ],
    [
      createGeneratorFixture([]),
    ],
    [
      createIterableFixture([]),
    ],
    [
      createIteratorFixture([]),
    ],
    [
      '',
    ],
    [
      new Set([]),
    ],
    [
      createMapFixture([]),
    ],
  ];
}
