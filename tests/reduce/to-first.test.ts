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
])("Reduce To First Test", (input, expected) => {
  it("", () => {
    // When
    const result = reduce.toFirst(input as Iterable<number>);

    // Then
    expect(result).toEqual(expected);
  });
});

describe.each([
  ...dataProviderForError(),
])("Reduce To First Error Test", (input) => {
  it("", () => {
    expect(() => {
      reduce.toFirst(input as Iterable<unknown>);
    }).toThrow(LengthError);
  });
});

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [0],
      0,
    ],
    [
      [null],
      null,
    ],
    [
      [''],
      '',
    ],
    [
      ['', null],
      '',
    ],
    [
      [3, 2],
      3,
    ],
    [
      [1, 2, 3],
      1,
    ],
    [
      [1.1, 1.1, 2.1, 2.1, 3.1, 3.1],
      1.1,
    ],
    [
      [[1], '2', 3],
      [1],
    ],
    [
      [false, [1], '2', 3],
      false,
    ],
    [
      [true, [1], '2', 3],
      true,
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([0]),
      0,
    ],
    [
      createGeneratorFixture([null]),
      null,
    ],
    [
      createGeneratorFixture(['']),
      '',
    ],
    [
      createGeneratorFixture(['', null]),
      '',
    ],
    [
      createGeneratorFixture([3, 2]),
      3,
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      1,
    ],
    [
      createGeneratorFixture([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      1.1,
    ],
    [
      createGeneratorFixture([[1], '2', 3]),
      [1],
    ],
    [
      createGeneratorFixture([false, [1], '2', 3]),
      false,
    ],
    [
      createGeneratorFixture([true, [1], '2', 3]),
      true,
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([0]),
      0,
    ],
    [
      createIterableFixture([null]),
      null,
    ],
    [
      createIterableFixture(['']),
      '',
    ],
    [
      createIterableFixture(['', null]),
      '',
    ],
    [
      createIterableFixture([3, 2]),
      3,
    ],
    [
      createIterableFixture([1, 2, 3]),
      1,
    ],
    [
      createIterableFixture([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      1.1,
    ],
    [
      createIterableFixture([[1], '2', 3]),
      [1],
    ],
    [
      createIterableFixture([false, [1], '2', 3]),
      false,
    ],
    [
      createIterableFixture([true, [1], '2', 3]),
      true,
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([0]),
      0,
    ],
    [
      createIteratorFixture([null]),
      null,
    ],
    [
      createIteratorFixture(['']),
      '',
    ],
    [
      createIteratorFixture(['', null]),
      '',
    ],
    [
      createIteratorFixture([3, 2]),
      3,
    ],
    [
      createIteratorFixture([1, 2, 3]),
      1,
    ],
    [
      createIteratorFixture([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      1.1,
    ],
    [
      createIteratorFixture([[1], '2', 3]),
      [1],
    ],
    [
      createIteratorFixture([false, [1], '2', 3]),
      false,
    ],
    [
      createIteratorFixture([true, [1], '2', 3]),
      true,
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '0',
      '0',
    ],
    [
      '01',
      '0',
    ],
    [
      '10',
      '1',
    ],
    [
      '32',
      '3',
    ],
    [
      '123',
      '1',
    ],
    [
      'abcdef',
      'a',
    ],
    [
      'fedcba',
      'f',
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([0]),
      0,
    ],
    [
      new Set([null]),
      null,
    ],
    [
      new Set(['']),
      '',
    ],
    [
      new Set(['', null]),
      '',
    ],
    [
      new Set([3, 2]),
      3,
    ],
    [
      new Set([1, 2, 3]),
      1,
    ],
    [
      new Set([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      1.1,
    ],
    [
      new Set([[1], '2', 3]),
      [1],
    ],
    [
      new Set([false, [1], '2', 3]),
      false,
    ],
    [
      new Set([true, [1], '2', 3]),
      true,
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      createMapFixture([0]),
      [0, 0],
    ],
    [
      createMapFixture([null]),
      [0, null],
    ],
    [
      createMapFixture(['']),
      [0, ''],
    ],
    [
      createMapFixture(['', null]),
      [0, ''],
    ],
    [
      createMapFixture([3, 2]),
      [0, 3],
    ],
    [
      createMapFixture([1, 2, 3]),
      [0, 1],
    ],
    [
      createMapFixture([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      [0, 1.1],
    ],
    [
      createMapFixture([[1], '2', 3]),
      [0, [1]],
    ],
    [
      createMapFixture([false, [1], '2', 3]),
      [0, false],
    ],
    [
      createMapFixture([true, [1], '2', 3]),
      [0, true],
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
