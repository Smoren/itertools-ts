// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { reduce } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])("Reduce To Count Test", (input, expected) => {
  it("", () => {
    // When
    const result = reduce.toCount(input as Iterable<number>);

    // Then
    expect(result).toEqual(expected);
  });
});

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [],
      0,
    ],
    [
      [0],
      1,
    ],
    [
      [null],
      1,
    ],
    [
      [''],
      1,
    ],
    [
      ['', null],
      2,
    ],
    [
      [1, 2, 3],
      3,
    ],
    [
      [[1], '2', 3],
      3,
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      0,
    ],
    [
      createGeneratorFixture([0]),
      1,
    ],
    [
      createGeneratorFixture([null]),
      1,
    ],
    [
      createGeneratorFixture(['']),
      1,
    ],
    [
      createGeneratorFixture(['', null]),
      2,
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      3,
    ],
    [
      createGeneratorFixture([[1], '2', 3]),
      3,
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      0,
    ],
    [
      createIterableFixture([0]),
      1,
    ],
    [
      createIterableFixture([null]),
      1,
    ],
    [
      createIterableFixture(['']),
      1,
    ],
    [
      createIterableFixture(['', null]),
      2,
    ],
    [
      createIterableFixture([1, 2, 3]),
      3,
    ],
    [
      createIterableFixture([[1], '2', 3]),
      3,
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      0,
    ],
    [
      createIteratorFixture([0]),
      1,
    ],
    [
      createIteratorFixture([null]),
      1,
    ],
    [
      createIteratorFixture(['']),
      1,
    ],
    [
      createIteratorFixture(['', null]),
      2,
    ],
    [
      createIteratorFixture([1, 2, 3]),
      3,
    ],
    [
      createIteratorFixture([[1], '2', 3]),
      3,
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      0,
    ],
    [
      '0',
      1,
    ],
    [
      '1',
      1,
    ],
    [
      'a',
      1,
    ],
    [
      '12',
      2,
    ],
    [
      '123',
      3,
    ],
    [
      'abc',
      3,
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([]),
      0,
    ],
    [
      new Set([0]),
      1,
    ],
    [
      new Set([null]),
      1,
    ],
    [
      new Set(['']),
      1,
    ],
    [
      new Set(['', null]),
      2,
    ],
    [
      new Set([1, 2, 3]),
      3,
    ],
    [
      new Set([[1], '2', 3]),
      3,
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      0,
    ],
    [
      createMapFixture([0]),
      1,
    ],
    [
      createMapFixture([null]),
      1,
    ],
    [
      createMapFixture(['']),
      1,
    ],
    [
      createMapFixture(['', null]),
      2,
    ],
    [
      createMapFixture([1, 2, 3]),
      3,
    ],
    [
      createMapFixture([[1], '2', 3]),
      3,
    ],
  ];
}
