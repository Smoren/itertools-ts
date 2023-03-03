// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
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
])("Multi Chain Test", (iterables, expected) => {
  it("", () => {
    // Given
    const result = [];

    // When
    for (const values of multi.chain(...iterables as Array<Iterable<unknown>>)) {
      result.push(values);
    }

    // Then
    expect(result).toEqual(expected);
  });
});

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
      [1],
    ],
    [
      [
        [1, 2, 3],
      ],
      [1, 2, 3],
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
      [1, 2],
    ],
    [
      [
        [1, 2],
        [4, 5],
      ],
      [1, 2, 4, 5],
    ],
    [
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [
        ['a', 'b', 'c'],
        ['x', 'y', 'z'],
      ],
      ['a', 'b', 'c', 'x', 'y', 'z'],
    ],
    [
      [
        [1, 2, 3],
        ['a', 'b', 'c'],
      ],
      [1, 2, 3, 'a', 'b', 'c'],
    ],
    [
      [
        [1, [1, 2, 3], 'abc', true],
        [9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']],
      ],
      [1, [1, 2, 3], 'abc', true, 9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']],
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
      [1],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
      ],
      [1, 2, 3],
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
      [1, 2],
    ],
    [
      [
        createGeneratorFixture([1, 2]),
        createGeneratorFixture([4, 5]),
      ],
      [1, 2, 4, 5],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([4, 5, 6]),
      ],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [
        createGeneratorFixture(['a', 'b', 'c']),
        createGeneratorFixture(['x', 'y', 'z']),
      ],
      ['a', 'b', 'c', 'x', 'y', 'z'],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture(['a', 'b', 'c']),
      ],
      [1, 2, 3, 'a', 'b', 'c'],
    ],
    [
      [
        createGeneratorFixture([1, [1, 2, 3], 'abc', true]),
        createGeneratorFixture([9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']]),
      ],
      [1, [1, 2, 3], 'abc', true, 9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']],
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
      [1],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
      ],
      [1, 2, 3],
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
      [1, 2],
    ],
    [
      [
        createIterableFixture([1, 2]),
        createIterableFixture([4, 5]),
      ],
      [1, 2, 4, 5],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([4, 5, 6]),
      ],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [
        createIterableFixture(['a', 'b', 'c']),
        createIterableFixture(['x', 'y', 'z']),
      ],
      ['a', 'b', 'c', 'x', 'y', 'z'],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture(['a', 'b', 'c']),
      ],
      [1, 2, 3, 'a', 'b', 'c'],
    ],
    [
      [
        createIterableFixture([1, [1, 2, 3], 'abc', true]),
        createIterableFixture([9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']]),
      ],
      [1, [1, 2, 3], 'abc', true, 9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']],
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
      [1],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
      ],
      [1, 2, 3],
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
      [1, 2],
    ],
    [
      [
        createIteratorFixture([1, 2]),
        createIteratorFixture([4, 5]),
      ],
      [1, 2, 4, 5],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([4, 5, 6]),
      ],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [
        createIteratorFixture(['a', 'b', 'c']),
        createIteratorFixture(['x', 'y', 'z']),
      ],
      ['a', 'b', 'c', 'x', 'y', 'z'],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture(['a', 'b', 'c']),
      ],
      [1, 2, 3, 'a', 'b', 'c'],
    ],
    [
      [
        createIteratorFixture([1, [1, 2, 3], 'abc', true]),
        createIteratorFixture([9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']]),
      ],
      [1, [1, 2, 3], 'abc', true, 9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']],
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
      ['1'],
    ],
    [
      [
        '123',
      ],
      ['1', '2', '3'],
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
        '1',
        '2',
      ],
      ['1', '2'],
    ],
    [
      [
        '12',
        '45',
      ],
      ['1', '2', '4', '5'],
    ],
    [
      [
        '123',
        '456',
      ],
      ['1', '2', '3', '4', '5', '6'],
    ],
    [
      [
        'abc',
        'xyz',
      ],
      ['a', 'b', 'c', 'x', 'y', 'z'],
    ],
    [
      [
        '123',
        'abc',
      ],
      ['1', '2', '3', 'a', 'b', 'c'],
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
      [1],
    ],
    [
      [
        new Set([1, 2, 3]),
      ],
      [1, 2, 3],
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
      [1, 2],
    ],
    [
      [
        new Set([1, 2]),
        new Set([4, 5]),
      ],
      [1, 2, 4, 5],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([4, 5, 6]),
      ],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [
        new Set(['a', 'b', 'c']),
        new Set(['x', 'y', 'z']),
      ],
      ['a', 'b', 'c', 'x', 'y', 'z'],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set(['a', 'b', 'c']),
      ],
      [1, 2, 3, 'a', 'b', 'c'],
    ],
    [
      [
        new Set([1, [1, 2, 3], 'abc', true]),
        new Set([9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']]),
      ],
      [1, [1, 2, 3], 'abc', true, 9, 3.5, false, null, Infinity, '日本語', ['a', 3, 'false']],
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
      [[0, 1]],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
      ],
      [[0, 1], [1, 2], [2, 3]],
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
      [[0, 1], [0, 2]],
    ],
    [
      [
        createMapFixture([1, 2]),
        createMapFixture([4, 5]),
      ],
      [[0, 1], [1, 2], [0, 4], [1, 5]],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture([4, 5, 6]),
      ],
      [[0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 6]],
    ],
    [
      [
        createMapFixture(['a', 'b', 'c']),
        createMapFixture(['x', 'y', 'z']),
      ],
      [[0, 'a'], [1, 'b'], [2, 'c'], [0, 'x'], [1, 'y'], [2, 'z']],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture(['a', 'b', 'c']),
      ],
      [[0, 1], [1, 2], [2, 3], [0, 'a'], [1, 'b'], [2, 'c']],
    ],
  ];
}

function dataProviderForMixed(): Array<unknown> {
  return [
    [
      [
        [1, 2],
        createGeneratorFixture([2, 3]),
        createIterableFixture([3, 4]),
        createIteratorFixture([4, 5]),
        '56',
        new Set([6, 7]),
        createMapFixture([7, 8]),
      ],
      [1, 2, 2, 3, 3, 4, 4, 5, '5', '6', 6, 7, [0, 7], [1, 8]],
    ],
  ];
}
