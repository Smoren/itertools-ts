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
])("Reduce To Max Test", (input, compareBy, expected) => {
  it("", () => {
    // When
    const result = reduce.toMax(input as Iterable<unknown>, compareBy as ((datum: unknown) => unknown)|undefined);

    // Then
    expect(result).toEqual(expected);
  });
});

describe.each([
  ...dataProviderForUsingCustomComparator(),
])("Reduce To Min Using Custom Comparator Test", (input, compareBy, expected) => {
  it("", () => {
    // When
    const result = reduce.toMax(input as Iterable<unknown>, compareBy as (datum: unknown) => unknown);

    // Then
    expect(result).toEqual(expected);
  });
});

function dataProviderForUsingCustomComparator(): Array<unknown> {
  return [
    [
      [
        {
          title: 'The Matrix',
          rating: 4.7,
        },
        {
          title: 'The Matrix Reloaded',
          rating: 4.3,
        },
        {
          title: 'The Matrix Revolutions',
          rating: 3.9,
        },
        {
          title: 'The Matrix Resurrections',
          rating: 2.6,
        },
      ],
      (movie: Record<string, unknown>): number => movie['rating'] as number,
      {
        title: 'The Matrix',
        rating: 4.7,
      },
    ],
  ];
}

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [],
      undefined,
      undefined,
    ],
    [
      [],
      (item: unknown) => item,
      undefined,
    ],
    [
      [],
      (item: unknown) => -(item as number),
      undefined,
    ],
    [
      [0],
      undefined,
      0,
    ],
    [
      [0],
      (item: unknown) => item,
      0,
    ],
    [
      [0],
      (item: unknown) => -(item as number),
      0,
    ],
    [
      [Infinity],
      undefined,
      Infinity,
    ],
    [
      [Infinity],
      (item: unknown) => item,
      Infinity,
    ],
    [
      [Infinity],
      (item: unknown) => -(item as number),
      Infinity,
    ],
    [
      [-Infinity],
      undefined,
      -Infinity,
    ],
    [
      [-Infinity],
      (item: unknown) => item,
      -Infinity,
    ],
    [
      [-Infinity],
      (item: unknown) => -(item as number),
      -Infinity,
    ],
    [
      [Infinity, -Infinity],
      undefined,
      Infinity,
    ],
    [
      [Infinity, -Infinity],
      (item: unknown) => item,
      Infinity,
    ],
    [
      [Infinity, -Infinity],
      (item: unknown) => -(item as number),
      -Infinity,
    ],
    [
      [Infinity, -Infinity, 10, -1],
      undefined,
      Infinity,
    ],
    [
      [Infinity, -Infinity, 10, -1],
      (item: unknown) => item,
      Infinity,
    ],
    [
      [Infinity, -Infinity, 10, -1],
      (item: unknown) => -(item as number),
      -Infinity,
    ],
    [
      [1, 2, 3],
      undefined,
      3,
    ],
    [
      [1, 2, 3],
      (item: unknown) => item,
      3,
    ],
    [
      [1, 2, 3],
      (item: unknown) => -(item as number),
      1,
    ],
    [
      [3, 2, 1],
      undefined,
      3,
    ],
    [
      [3, 2, 1],
      (item: unknown) => item,
      3,
    ],
    [
      [3, 2, 1],
      (item: unknown) => -(item as number),
      1,
    ],
    [
      [2, 3, 1],
      undefined,
      3,
    ],
    [
      [2, 3, 1],
      (item: unknown) => item,
      3,
    ],
    [
      [2, 3, 1],
      (item: unknown) => -(item as number),
      1,
    ],
    [
      [1, 2.1],
      undefined,
      2.1,
    ],
    [
      [1, 2.1],
      (item: unknown) => item,
      2.1,
    ],
    [
      [1, 2.1],
      (item: unknown) => -(item as number),
      1,
    ],
    [
      [2.1, 1],
      undefined,
      2.1,
    ],
    [
      [2.1, 1],
      (item: unknown) => item,
      2.1,
    ],
    [
      [2.1, 1],
      (item: unknown) => -(item as number),
      1,
    ],
    [
      [2, 1.1],
      undefined,
      2,
    ],
    [
      [2, 1.1],
      (item: unknown) => item,
      2,
    ],
    [
      [2, 1.1],
      (item: unknown) => -(item as number),
      1.1,
    ],
    [
      [2.2, 1.1],
      undefined,
      2.2,
    ],
    [
      [2.2, 1.1],
      (item: unknown) => item,
      2.2,
    ],
    [
      [2.2, 1.1],
      (item: unknown) => -(item as number),
      1.1,
    ],
    [
      [1.1, 2.2],
      undefined,
      2.2,
    ],
    [
      [1.1, 2.2],
      (item: unknown) => item,
      2.2,
    ],
    [
      [1.1, 2.2],
      (item: unknown) => -(item as number),
      1.1,
    ],
    [
      ['a', 'b', 'c'],
      undefined,
      'c',
    ],
    [
      ['a', 'b', 'c'],
      (item: unknown) => item,
      'c',
    ],
    [
      ['a', 'b', 'c'],
      (item: unknown) => -(item as string).charCodeAt(0),
      'a',
    ],
    [
      ['b', 'c', 'a'],
      undefined,
      'c',
    ],
    [
      ['b', 'c', 'a'],
      (item: unknown) => item,
      'c',
    ],
    [
      ['b', 'c', 'a'],
      (item: unknown) => -(item as string).charCodeAt(0),
      'a',
    ],
    [
      ['c', 'b', 'a'],
      undefined,
      'c',
    ],
    [
      ['c', 'b', 'a'],
      (item: unknown) => item,
      'c',
    ],
    [
      ['c', 'b', 'a'],
      (item: unknown) => -(item as string).charCodeAt(0),
      'a',
    ],
    [
      ['ab', 'ba', 'b'],
      undefined,
      'ba',
    ],
    [
      ['ab', 'ba', 'b'],
      (item: unknown) => item,
      'ba',
    ],
    [
      ['ba', 'b', 'ab'],
      undefined,
      'ba',
    ],
    [
      ['ba', 'b', 'ab'],
      (item: unknown) => item,
      'ba',
    ],
    [
      [[]],
      undefined,
      [],
    ],
    [
      [[]],
      (item: unknown) => item,
      [],
    ],
    [
      [[2]],
      undefined,
      [2],
    ],
    [
      [[2]],
      (item: unknown) => item,
      [2],
    ],
    [
      [[], []],
      undefined,
      [],
    ],
    [
      [[], []],
      (item: unknown) => item,
      [],
    ],
    [
      [[], [2]],
      undefined,
      [2],
    ],
    [
      [[], [2]],
      (item: unknown) => item,
      [2],
    ],
    [
      [[2], []],
      undefined,
      [2],
    ],
    [
      [[2], []],
      (item: unknown) => item,
      [2],
    ],
    [
      [[null], [null]],
      undefined,
      [null],
    ],
    [
      [[null], [null]],
      (item: unknown) => item,
      [null],
    ],
    [
      [[1, 2], [2]],
      undefined,
      [2],
    ],
    [
      [[1, 2], [2]],
      (item: unknown) => item,
      [2],
    ],
    [
      [[3, 2], [2]],
      undefined,
      [3, 2],
    ],
    [
      [[3, 2], [2]],
      (item: unknown) => item,
      [3, 2],
    ],
    [
      [[1, 2], [2, 1]],
      undefined,
      [2, 1],
    ],
    [
      [[1, 2], [2, 1]],
      (item: unknown) => item,
      [2, 1],
    ],
    [
      [[2, 1], [1, 2]],
      undefined,
      [2, 1],
    ],
    [
      [[2, 1], [1, 2]],
      (item: unknown) => item,
      [2, 1],
    ],
    [
      [['a'], ['b']],
      undefined,
      ['b'],
    ],
    [
      [['a'], ['b']],
      (item: unknown) => item,
      ['b'],
    ],
    [
      [['a', 'a'], ['b']],
      undefined,
      ['b'],
    ],
    [
      [['a', 'a'], ['b']],
      (item: unknown) => item,
      ['b'],
    ],
    [
      [[1, 2, 3], [2, 0, 3], [2, 1, 3]],
      undefined,
      [2, 1, 3],
    ],
    [
      [[1, 2, 3], [2, 0, 3], [2, 1, 3]],
      (item: unknown) => item,
      [2, 1, 3],
    ],
    [
      [[1, 2, 3], [2, 0, 3], [2, 1, 3]],
      (item: unknown) => (item as Array<number>)[1],
      [1, 2, 3],
    ],
    [
      [[1, 2, 3], [2, 0, 3], [2, 1, 3]],
      (item: unknown) => -(item as Array<number>)[1],
      [2, 0, 3],
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      undefined,
      undefined,
    ],
    [
      createGeneratorFixture([]),
      (item: unknown) => item,
      undefined,
    ],
    [
      createGeneratorFixture([]),
      (item: unknown) => -(item as number),
      undefined,
    ],
    [
      createGeneratorFixture([0]),
      undefined,
      0,
    ],
    [
      createGeneratorFixture([0]),
      (item: unknown) => item,
      0,
    ],
    [
      createGeneratorFixture([0]),
      (item: unknown) => -(item as number),
      0,
    ],
    [
      createGeneratorFixture([Infinity]),
      undefined,
      Infinity,
    ],
    [
      createGeneratorFixture([Infinity]),
      (item: unknown) => item,
      Infinity,
    ],
    [
      createGeneratorFixture([Infinity]),
      (item: unknown) => -(item as number),
      Infinity,
    ],
    [
      createGeneratorFixture([-Infinity]),
      undefined,
      -Infinity,
    ],
    [
      createGeneratorFixture([-Infinity]),
      (item: unknown) => item,
      -Infinity,
    ],
    [
      createGeneratorFixture([-Infinity]),
      (item: unknown) => -(item as number),
      -Infinity,
    ],
    [
      createGeneratorFixture([Infinity, -Infinity]),
      undefined,
      Infinity,
    ],
    [
      createGeneratorFixture([Infinity, -Infinity]),
      (item: unknown) => item,
      Infinity,
    ],
    [
      createGeneratorFixture([Infinity, -Infinity]),
      (item: unknown) => -(item as number),
      -Infinity,
    ],
    [
      createGeneratorFixture([Infinity, -Infinity, 10, -1]),
      undefined,
      Infinity,
    ],
    [
      createGeneratorFixture([Infinity, -Infinity, 10, -1]),
      (item: unknown) => item,
      Infinity,
    ],
    [
      createGeneratorFixture([Infinity, -Infinity, 10, -1]),
      (item: unknown) => -(item as number),
      -Infinity,
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      undefined,
      3,
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (item: unknown) => item,
      3,
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (item: unknown) => -(item as number),
      1,
    ],
    [
      createGeneratorFixture([3, 2, 1]),
      undefined,
      3,
    ],
    [
      createGeneratorFixture([3, 2, 1]),
      (item: unknown) => item,
      3,
    ],
    [
      createGeneratorFixture([3, 2, 1]),
      (item: unknown) => -(item as number),
      1,
    ],
    [
      createGeneratorFixture([2, 3, 1]),
      undefined,
      3,
    ],
    [
      createGeneratorFixture([2, 3, 1]),
      (item: unknown) => item,
      3,
    ],
    [
      createGeneratorFixture([2, 3, 1]),
      (item: unknown) => -(item as number),
      1,
    ],
    [
      createGeneratorFixture([1, 2.1]),
      undefined,
      2.1,
    ],
    [
      createGeneratorFixture([1, 2.1]),
      (item: unknown) => item,
      2.1,
    ],
    [
      createGeneratorFixture([1, 2.1]),
      (item: unknown) => -(item as number),
      1,
    ],
    [
      createGeneratorFixture([2.1, 1]),
      undefined,
      2.1,
    ],
    [
      createGeneratorFixture([2.1, 1]),
      (item: unknown) => item,
      2.1,
    ],
    [
      createGeneratorFixture([2.1, 1]),
      (item: unknown) => -(item as number),
      1,
    ],
    [
      createGeneratorFixture([2, 1.1]),
      undefined,
      2,
    ],
    [
      createGeneratorFixture([2, 1.1]),
      (item: unknown) => item,
      2,
    ],
    [
      createGeneratorFixture([2, 1.1]),
      (item: unknown) => -(item as number),
      1.1,
    ],
    [
      createGeneratorFixture([2.2, 1.1]),
      undefined,
      2.2,
    ],
    [
      createGeneratorFixture([2.2, 1.1]),
      (item: unknown) => item,
      2.2,
    ],
    [
      createGeneratorFixture([2.2, 1.1]),
      (item: unknown) => -(item as number),
      1.1,
    ],
    [
      createGeneratorFixture([1.1, 2.2]),
      undefined,
      2.2,
    ],
    [
      createGeneratorFixture([1.1, 2.2]),
      (item: unknown) => item,
      2.2,
    ],
    [
      createGeneratorFixture([1.1, 2.2]),
      (item: unknown) => -(item as number),
      1.1,
    ],
    [
      createGeneratorFixture(['a', 'b', 'c']),
      undefined,
      'c',
    ],
    [
      createGeneratorFixture(['a', 'b', 'c']),
      (item: unknown) => item,
      'c',
    ],
    [
      createGeneratorFixture(['a', 'b', 'c']),
      (item: unknown) => -(item as string).charCodeAt(0),
      'a',
    ],
    [
      createGeneratorFixture(['b', 'c', 'a']),
      undefined,
      'c',
    ],
    [
      createGeneratorFixture(['b', 'c', 'a']),
      (item: unknown) => item,
      'c',
    ],
    [
      createGeneratorFixture(['b', 'c', 'a']),
      (item: unknown) => -(item as string).charCodeAt(0),
      'a',
    ],
    [
      createGeneratorFixture(['c', 'b', 'a']),
      undefined,
      'c',
    ],
    [
      createGeneratorFixture(['c', 'b', 'a']),
      (item: unknown) => item,
      'c',
    ],
    [
      createGeneratorFixture(['c', 'b', 'a']),
      (item: unknown) => -(item as string).charCodeAt(0),
      'a',
    ],
    [
      createGeneratorFixture(['ab', 'ba', 'b']),
      undefined,
      'ba',
    ],
    [
      createGeneratorFixture(['ab', 'ba', 'b']),
      (item: unknown) => item,
      'ba',
    ],
    [
      createGeneratorFixture(['ba', 'b', 'ab']),
      undefined,
      'ba',
    ],
    [
      createGeneratorFixture(['ba', 'b', 'ab']),
      (item: unknown) => item,
      'ba',
    ],
    [
      createGeneratorFixture([[]]),
      undefined,
      [],
    ],
    [
      createGeneratorFixture([[]]),
      (item: unknown) => item,
      [],
    ],
    [
      createGeneratorFixture([[2]]),
      undefined,
      [2],
    ],
    [
      createGeneratorFixture([[2]]),
      (item: unknown) => item,
      [2],
    ],
    [
      createGeneratorFixture([[], []]),
      undefined,
      [],
    ],
    [
      createGeneratorFixture([[], []]),
      (item: unknown) => item,
      [],
    ],
    [
      createGeneratorFixture([[], [2]]),
      undefined,
      [2],
    ],
    [
      createGeneratorFixture([[], [2]]),
      (item: unknown) => item,
      [2],
    ],
    [
      createGeneratorFixture([[2], []]),
      undefined,
      [2],
    ],
    [
      createGeneratorFixture([[2], []]),
      (item: unknown) => item,
      [2],
    ],
    [
      createGeneratorFixture([[null], [null]]),
      undefined,
      [null],
    ],
    [
      createGeneratorFixture([[null], [null]]),
      (item: unknown) => item,
      [null],
    ],
    [
      createGeneratorFixture([[1, 2], [2]]),
      undefined,
      [2],
    ],
    [
      createGeneratorFixture([[1, 2], [2]]),
      (item: unknown) => item,
      [2],
    ],
    [
      createGeneratorFixture([[3, 2], [2]]),
      undefined,
      [3, 2],
    ],
    [
      createGeneratorFixture([[3, 2], [2]]),
      (item: unknown) => item,
      [3, 2],
    ],
    [
      createGeneratorFixture([[1, 2], [2, 1]]),
      undefined,
      [2, 1],
    ],
    [
      createGeneratorFixture([[1, 2], [2, 1]]),
      (item: unknown) => item,
      [2, 1],
    ],
    [
      createGeneratorFixture([[2, 1], [1, 2]]),
      undefined,
      [2, 1],
    ],
    [
      createGeneratorFixture([[2, 1], [1, 2]]),
      (item: unknown) => item,
      [2, 1],
    ],
    [
      createGeneratorFixture([['a'], ['b']]),
      undefined,
      ['b'],
    ],
    [
      createGeneratorFixture([['a'], ['b']]),
      (item: unknown) => item,
      ['b'],
    ],
    [
      createGeneratorFixture([['a', 'a'], ['b']]),
      undefined,
      ['b'],
    ],
    [
      createGeneratorFixture([['a', 'a'], ['b']]),
      (item: unknown) => item,
      ['b'],
    ],
    [
      createGeneratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      undefined,
      [2, 1, 3],
    ],
    [
      createGeneratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: unknown) => item,
      [2, 1, 3],
    ],
    [
      createGeneratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: unknown) => (item as Array<number>)[1],
      [1, 2, 3],
    ],
    [
      createGeneratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: unknown) => -(item as Array<number>)[1],
      [2, 0, 3],
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      undefined,
      undefined,
    ],
    [
      createIterableFixture([]),
      (item: unknown) => item,
      undefined,
    ],
    [
      createIterableFixture([]),
      (item: unknown) => -(item as number),
      undefined,
    ],
    [
      createIterableFixture([0]),
      undefined,
      0,
    ],
    [
      createIterableFixture([0]),
      (item: unknown) => item,
      0,
    ],
    [
      createIterableFixture([0]),
      (item: unknown) => -(item as number),
      0,
    ],
    [
      createIterableFixture([Infinity]),
      undefined,
      Infinity,
    ],
    [
      createIterableFixture([Infinity]),
      (item: unknown) => item,
      Infinity,
    ],
    [
      createIterableFixture([Infinity]),
      (item: unknown) => -(item as number),
      Infinity,
    ],
    [
      createIterableFixture([-Infinity]),
      undefined,
      -Infinity,
    ],
    [
      createIterableFixture([-Infinity]),
      (item: unknown) => item,
      -Infinity,
    ],
    [
      createIterableFixture([-Infinity]),
      (item: unknown) => -(item as number),
      -Infinity,
    ],
    [
      createIterableFixture([Infinity, -Infinity]),
      undefined,
      Infinity,
    ],
    [
      createIterableFixture([Infinity, -Infinity]),
      (item: unknown) => item,
      Infinity,
    ],
    [
      createIterableFixture([Infinity, -Infinity]),
      (item: unknown) => -(item as number),
      -Infinity,
    ],
    [
      createIterableFixture([Infinity, -Infinity, 10, -1]),
      undefined,
      Infinity,
    ],
    [
      createIterableFixture([Infinity, -Infinity, 10, -1]),
      (item: unknown) => item,
      Infinity,
    ],
    [
      createIterableFixture([Infinity, -Infinity, 10, -1]),
      (item: unknown) => -(item as number),
      -Infinity,
    ],
    [
      createIterableFixture([1, 2, 3]),
      undefined,
      3,
    ],
    [
      createIterableFixture([1, 2, 3]),
      (item: unknown) => item,
      3,
    ],
    [
      createIterableFixture([1, 2, 3]),
      (item: unknown) => -(item as number),
      1,
    ],
    [
      createIterableFixture([3, 2, 1]),
      undefined,
      3,
    ],
    [
      createIterableFixture([3, 2, 1]),
      (item: unknown) => item,
      3,
    ],
    [
      createIterableFixture([3, 2, 1]),
      (item: unknown) => -(item as number),
      1,
    ],
    [
      createIterableFixture([2, 3, 1]),
      undefined,
      3,
    ],
    [
      createIterableFixture([2, 3, 1]),
      (item: unknown) => item,
      3,
    ],
    [
      createIterableFixture([2, 3, 1]),
      (item: unknown) => -(item as number),
      1,
    ],
    [
      createIterableFixture([1, 2.1]),
      undefined,
      2.1,
    ],
    [
      createIterableFixture([1, 2.1]),
      (item: unknown) => item,
      2.1,
    ],
    [
      createIterableFixture([1, 2.1]),
      (item: unknown) => -(item as number),
      1,
    ],
    [
      createIterableFixture([2.1, 1]),
      undefined,
      2.1,
    ],
    [
      createIterableFixture([2.1, 1]),
      (item: unknown) => item,
      2.1,
    ],
    [
      createIterableFixture([2.1, 1]),
      (item: unknown) => -(item as number),
      1,
    ],
    [
      createIterableFixture([2, 1.1]),
      undefined,
      2,
    ],
    [
      createIterableFixture([2, 1.1]),
      (item: unknown) => item,
      2,
    ],
    [
      createIterableFixture([2, 1.1]),
      (item: unknown) => -(item as number),
      1.1,
    ],
    [
      createIterableFixture([2.2, 1.1]),
      undefined,
      2.2,
    ],
    [
      createIterableFixture([2.2, 1.1]),
      (item: unknown) => item,
      2.2,
    ],
    [
      createIterableFixture([2.2, 1.1]),
      (item: unknown) => -(item as number),
      1.1,
    ],
    [
      createIterableFixture([1.1, 2.2]),
      undefined,
      2.2,
    ],
    [
      createIterableFixture([1.1, 2.2]),
      (item: unknown) => item,
      2.2,
    ],
    [
      createIterableFixture([1.1, 2.2]),
      (item: unknown) => -(item as number),
      1.1,
    ],
    [
      createIterableFixture(['a', 'b', 'c']),
      undefined,
      'c',
    ],
    [
      createIterableFixture(['a', 'b', 'c']),
      (item: unknown) => item,
      'c',
    ],
    [
      createIterableFixture(['a', 'b', 'c']),
      (item: unknown) => -(item as string).charCodeAt(0),
      'a',
    ],
    [
      createIterableFixture(['b', 'c', 'a']),
      undefined,
      'c',
    ],
    [
      createIterableFixture(['b', 'c', 'a']),
      (item: unknown) => item,
      'c',
    ],
    [
      createIterableFixture(['b', 'c', 'a']),
      (item: unknown) => -(item as string).charCodeAt(0),
      'a',
    ],
    [
      createIterableFixture(['c', 'b', 'a']),
      undefined,
      'c',
    ],
    [
      createIterableFixture(['c', 'b', 'a']),
      (item: unknown) => item,
      'c',
    ],
    [
      createIterableFixture(['c', 'b', 'a']),
      (item: unknown) => -(item as string).charCodeAt(0),
      'a',
    ],
    [
      createIterableFixture(['ab', 'ba', 'b']),
      undefined,
      'ba',
    ],
    [
      createIterableFixture(['ab', 'ba', 'b']),
      (item: unknown) => item,
      'ba',
    ],
    [
      createIterableFixture(['ba', 'b', 'ab']),
      undefined,
      'ba',
    ],
    [
      createIterableFixture(['ba', 'b', 'ab']),
      (item: unknown) => item,
      'ba',
    ],
    [
      createIterableFixture([[]]),
      undefined,
      [],
    ],
    [
      createIterableFixture([[]]),
      (item: unknown) => item,
      [],
    ],
    [
      createIterableFixture([[2]]),
      undefined,
      [2],
    ],
    [
      createIterableFixture([[2]]),
      (item: unknown) => item,
      [2],
    ],
    [
      createIterableFixture([[], []]),
      undefined,
      [],
    ],
    [
      createIterableFixture([[], []]),
      (item: unknown) => item,
      [],
    ],
    [
      createIterableFixture([[], [2]]),
      undefined,
      [2],
    ],
    [
      createIterableFixture([[], [2]]),
      (item: unknown) => item,
      [2],
    ],
    [
      createIterableFixture([[2], []]),
      undefined,
      [2],
    ],
    [
      createIterableFixture([[2], []]),
      (item: unknown) => item,
      [2],
    ],
    [
      createIterableFixture([[null], [null]]),
      undefined,
      [null],
    ],
    [
      createIterableFixture([[null], [null]]),
      (item: unknown) => item,
      [null],
    ],
    [
      createIterableFixture([[1, 2], [2]]),
      undefined,
      [2],
    ],
    [
      createIterableFixture([[1, 2], [2]]),
      (item: unknown) => item,
      [2],
    ],
    [
      createIterableFixture([[3, 2], [2]]),
      undefined,
      [3, 2],
    ],
    [
      createIterableFixture([[3, 2], [2]]),
      (item: unknown) => item,
      [3, 2],
    ],
    [
      createIterableFixture([[1, 2], [2, 1]]),
      undefined,
      [2, 1],
    ],
    [
      createIterableFixture([[1, 2], [2, 1]]),
      (item: unknown) => item,
      [2, 1],
    ],
    [
      createIterableFixture([[2, 1], [1, 2]]),
      undefined,
      [2, 1],
    ],
    [
      createIterableFixture([[2, 1], [1, 2]]),
      (item: unknown) => item,
      [2, 1],
    ],
    [
      createIterableFixture([['a'], ['b']]),
      undefined,
      ['b'],
    ],
    [
      createIterableFixture([['a'], ['b']]),
      (item: unknown) => item,
      ['b'],
    ],
    [
      createIterableFixture([['a', 'a'], ['b']]),
      undefined,
      ['b'],
    ],
    [
      createIterableFixture([['a', 'a'], ['b']]),
      (item: unknown) => item,
      ['b'],
    ],
    [
      createIterableFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      undefined,
      [2, 1, 3],
    ],
    [
      createIterableFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: unknown) => item,
      [2, 1, 3],
    ],
    [
      createIterableFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: unknown) => (item as Array<number>)[1],
      [1, 2, 3],
    ],
    [
      createIterableFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: unknown) => -(item as Array<number>)[1],
      [2, 0, 3],
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      undefined,
      undefined,
    ],
    [
      createIteratorFixture([]),
      (item: unknown) => item,
      undefined,
    ],
    [
      createIteratorFixture([]),
      (item: unknown) => -(item as number),
      undefined,
    ],
    [
      createIteratorFixture([0]),
      undefined,
      0,
    ],
    [
      createIteratorFixture([0]),
      (item: unknown) => item,
      0,
    ],
    [
      createIteratorFixture([0]),
      (item: unknown) => -(item as number),
      0,
    ],
    [
      createIteratorFixture([Infinity]),
      undefined,
      Infinity,
    ],
    [
      createIteratorFixture([Infinity]),
      (item: unknown) => item,
      Infinity,
    ],
    [
      createIteratorFixture([Infinity]),
      (item: unknown) => -(item as number),
      Infinity,
    ],
    [
      createIteratorFixture([-Infinity]),
      undefined,
      -Infinity,
    ],
    [
      createIteratorFixture([-Infinity]),
      (item: unknown) => item,
      -Infinity,
    ],
    [
      createIteratorFixture([-Infinity]),
      (item: unknown) => -(item as number),
      -Infinity,
    ],
    [
      createIteratorFixture([Infinity, -Infinity]),
      undefined,
      Infinity,
    ],
    [
      createIteratorFixture([Infinity, -Infinity]),
      (item: unknown) => item,
      Infinity,
    ],
    [
      createIteratorFixture([Infinity, -Infinity]),
      (item: unknown) => -(item as number),
      -Infinity,
    ],
    [
      createIteratorFixture([Infinity, -Infinity, 10, -1]),
      undefined,
      Infinity,
    ],
    [
      createIteratorFixture([Infinity, -Infinity, 10, -1]),
      (item: unknown) => item,
      Infinity,
    ],
    [
      createIteratorFixture([Infinity, -Infinity, 10, -1]),
      (item: unknown) => -(item as number),
      -Infinity,
    ],
    [
      createIteratorFixture([1, 2, 3]),
      undefined,
      3,
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (item: unknown) => item,
      3,
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (item: unknown) => -(item as number),
      1,
    ],
    [
      createIteratorFixture([3, 2, 1]),
      undefined,
      3,
    ],
    [
      createIteratorFixture([3, 2, 1]),
      (item: unknown) => item,
      3,
    ],
    [
      createIteratorFixture([3, 2, 1]),
      (item: unknown) => -(item as number),
      1,
    ],
    [
      createIteratorFixture([2, 3, 1]),
      undefined,
      3,
    ],
    [
      createIteratorFixture([2, 3, 1]),
      (item: unknown) => item,
      3,
    ],
    [
      createIteratorFixture([2, 3, 1]),
      (item: unknown) => -(item as number),
      1,
    ],
    [
      createIteratorFixture([1, 2.1]),
      undefined,
      2.1,
    ],
    [
      createIteratorFixture([1, 2.1]),
      (item: unknown) => item,
      2.1,
    ],
    [
      createIteratorFixture([1, 2.1]),
      (item: unknown) => -(item as number),
      1,
    ],
    [
      createIteratorFixture([2.1, 1]),
      undefined,
      2.1,
    ],
    [
      createIteratorFixture([2.1, 1]),
      (item: unknown) => item,
      2.1,
    ],
    [
      createIteratorFixture([2.1, 1]),
      (item: unknown) => -(item as number),
      1,
    ],
    [
      createIteratorFixture([2, 1.1]),
      undefined,
      2,
    ],
    [
      createIteratorFixture([2, 1.1]),
      (item: unknown) => item,
      2,
    ],
    [
      createIteratorFixture([2, 1.1]),
      (item: unknown) => -(item as number),
      1.1,
    ],
    [
      createIteratorFixture([2.2, 1.1]),
      undefined,
      2.2,
    ],
    [
      createIteratorFixture([2.2, 1.1]),
      (item: unknown) => item,
      2.2,
    ],
    [
      createIteratorFixture([2.2, 1.1]),
      (item: unknown) => -(item as number),
      1.1,
    ],
    [
      createIteratorFixture([1.1, 2.2]),
      undefined,
      2.2,
    ],
    [
      createIteratorFixture([1.1, 2.2]),
      (item: unknown) => item,
      2.2,
    ],
    [
      createIteratorFixture([1.1, 2.2]),
      (item: unknown) => -(item as number),
      1.1,
    ],
    [
      createIteratorFixture(['a', 'b', 'c']),
      undefined,
      'c',
    ],
    [
      createIteratorFixture(['a', 'b', 'c']),
      (item: unknown) => item,
      'c',
    ],
    [
      createIteratorFixture(['a', 'b', 'c']),
      (item: unknown) => -(item as string).charCodeAt(0),
      'a',
    ],
    [
      createIteratorFixture(['b', 'c', 'a']),
      undefined,
      'c',
    ],
    [
      createIteratorFixture(['b', 'c', 'a']),
      (item: unknown) => item,
      'c',
    ],
    [
      createIteratorFixture(['b', 'c', 'a']),
      (item: unknown) => -(item as string).charCodeAt(0),
      'a',
    ],
    [
      createIteratorFixture(['c', 'b', 'a']),
      undefined,
      'c',
    ],
    [
      createIteratorFixture(['c', 'b', 'a']),
      (item: unknown) => item,
      'c',
    ],
    [
      createIteratorFixture(['c', 'b', 'a']),
      (item: unknown) => -(item as string).charCodeAt(0),
      'a',
    ],
    [
      createIteratorFixture(['ab', 'ba', 'b']),
      undefined,
      'ba',
    ],
    [
      createIteratorFixture(['ab', 'ba', 'b']),
      (item: unknown) => item,
      'ba',
    ],
    [
      createIteratorFixture(['ba', 'b', 'ab']),
      undefined,
      'ba',
    ],
    [
      createIteratorFixture(['ba', 'b', 'ab']),
      (item: unknown) => item,
      'ba',
    ],
    [
      createIteratorFixture([[]]),
      undefined,
      [],
    ],
    [
      createIteratorFixture([[]]),
      (item: unknown) => item,
      [],
    ],
    [
      createIteratorFixture([[2]]),
      undefined,
      [2],
    ],
    [
      createIteratorFixture([[2]]),
      (item: unknown) => item,
      [2],
    ],
    [
      createIteratorFixture([[], []]),
      undefined,
      [],
    ],
    [
      createIteratorFixture([[], []]),
      (item: unknown) => item,
      [],
    ],
    [
      createIteratorFixture([[], [2]]),
      undefined,
      [2],
    ],
    [
      createIteratorFixture([[], [2]]),
      (item: unknown) => item,
      [2],
    ],
    [
      createIteratorFixture([[2], []]),
      undefined,
      [2],
    ],
    [
      createIteratorFixture([[2], []]),
      (item: unknown) => item,
      [2],
    ],
    [
      createIteratorFixture([[null], [null]]),
      undefined,
      [null],
    ],
    [
      createIteratorFixture([[null], [null]]),
      (item: unknown) => item,
      [null],
    ],
    [
      createIteratorFixture([[1, 2], [2]]),
      undefined,
      [2],
    ],
    [
      createIteratorFixture([[1, 2], [2]]),
      (item: unknown) => item,
      [2],
    ],
    [
      createIteratorFixture([[3, 2], [2]]),
      undefined,
      [3, 2],
    ],
    [
      createIteratorFixture([[3, 2], [2]]),
      (item: unknown) => item,
      [3, 2],
    ],
    [
      createIteratorFixture([[1, 2], [2, 1]]),
      undefined,
      [2, 1],
    ],
    [
      createIteratorFixture([[1, 2], [2, 1]]),
      (item: unknown) => item,
      [2, 1],
    ],
    [
      createIteratorFixture([[2, 1], [1, 2]]),
      undefined,
      [2, 1],
    ],
    [
      createIteratorFixture([[2, 1], [1, 2]]),
      (item: unknown) => item,
      [2, 1],
    ],
    [
      createIteratorFixture([['a'], ['b']]),
      undefined,
      ['b'],
    ],
    [
      createIteratorFixture([['a'], ['b']]),
      (item: unknown) => item,
      ['b'],
    ],
    [
      createIteratorFixture([['a', 'a'], ['b']]),
      undefined,
      ['b'],
    ],
    [
      createIteratorFixture([['a', 'a'], ['b']]),
      (item: unknown) => item,
      ['b'],
    ],
    [
      createIteratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      undefined,
      [2, 1, 3],
    ],
    [
      createIteratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: unknown) => item,
      [2, 1, 3],
    ],
    [
      createIteratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: unknown) => (item as Array<number>)[1],
      [1, 2, 3],
    ],
    [
      createIteratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: unknown) => -(item as Array<number>)[1],
      [2, 0, 3],
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      undefined,
      undefined,
    ],
    [
      '',
      (item: unknown) => item,
      undefined,
    ],
    [
      '',
      (item: unknown) => -parseInt(item as string),
      undefined,
    ],
    [
      '0',
      undefined,
      '0',
    ],
    [
      '0',
      (item: unknown) => item,
      '0',
    ],
    [
      '0',
      (item: unknown) => -parseInt(item as string),
      '0',
    ],
    [
      '123',
      undefined,
      '3',
    ],
    [
      '123',
      (item: unknown) => item,
      '3',
    ],
    [
      '123',
      (item: unknown) => -parseInt(item as string),
      '1',
    ],
    [
      '321',
      undefined,
      '3',
    ],
    [
      '321',
      (item: unknown) => item,
      '3',
    ],
    [
      '321',
      (item: unknown) => -parseInt(item as string),
      '1',
    ],
    [
      '231',
      undefined,
      '3',
    ],
    [
      '231',
      (item: unknown) => item,
      '3',
    ],
    [
      '231',
      (item: unknown) => -(item as number),
      '1',
    ],
    [
      'abc',
      undefined,
      'c',
    ],
    [
      'abc',
      (item: unknown) => item,
      'c',
    ],
    [
      'abc',
      (item: unknown) => -(item as string).charCodeAt(0),
      'a',
    ],
    [
      'bca',
      undefined,
      'c',
    ],
    [
      'bca',
      (item: unknown) => item,
      'c',
    ],
    [
      'bca',
      (item: unknown) => -(item as string).charCodeAt(0),
      'a',
    ],
    [
      'cba',
      undefined,
      'c',
    ],
    [
      'cba',
      (item: unknown) => item,
      'c',
    ],
    [
      'cba',
      (item: unknown) => -(item as string).charCodeAt(0),
      'a',
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([]),
      undefined,
      undefined,
    ],
    [
      new Set([]),
      (item: unknown) => item,
      undefined,
    ],
    [
      new Set([]),
      (item: unknown) => -(item as number),
      undefined,
    ],
    [
      new Set([0]),
      undefined,
      0,
    ],
    [
      new Set([0]),
      (item: unknown) => item,
      0,
    ],
    [
      new Set([0]),
      (item: unknown) => -(item as number),
      0,
    ],
    [
      new Set([Infinity]),
      undefined,
      Infinity,
    ],
    [
      new Set([Infinity]),
      (item: unknown) => item,
      Infinity,
    ],
    [
      new Set([Infinity]),
      (item: unknown) => -(item as number),
      Infinity,
    ],
    [
      new Set([-Infinity]),
      undefined,
      -Infinity,
    ],
    [
      new Set([-Infinity]),
      (item: unknown) => item,
      -Infinity,
    ],
    [
      new Set([-Infinity]),
      (item: unknown) => -(item as number),
      -Infinity,
    ],
    [
      new Set([Infinity, -Infinity]),
      undefined,
      Infinity,
    ],
    [
      new Set([Infinity, -Infinity]),
      (item: unknown) => item,
      Infinity,
    ],
    [
      new Set([Infinity, -Infinity]),
      (item: unknown) => -(item as number),
      -Infinity,
    ],
    [
      new Set([Infinity, -Infinity, 10, -1]),
      undefined,
      Infinity,
    ],
    [
      new Set([Infinity, -Infinity, 10, -1]),
      (item: unknown) => item,
      Infinity,
    ],
    [
      new Set([Infinity, -Infinity, 10, -1]),
      (item: unknown) => -(item as number),
      -Infinity,
    ],
    [
      new Set([1, 2, 3]),
      undefined,
      3,
    ],
    [
      new Set([1, 2, 3]),
      (item: unknown) => item,
      3,
    ],
    [
      new Set([1, 2, 3]),
      (item: unknown) => -(item as number),
      1,
    ],
    [
      new Set([3, 2, 1]),
      undefined,
      3,
    ],
    [
      new Set([3, 2, 1]),
      (item: unknown) => item,
      3,
    ],
    [
      new Set([3, 2, 1]),
      (item: unknown) => -(item as number),
      1,
    ],
    [
      new Set([2, 3, 1]),
      undefined,
      3,
    ],
    [
      new Set([2, 3, 1]),
      (item: unknown) => item,
      3,
    ],
    [
      new Set([2, 3, 1]),
      (item: unknown) => -(item as number),
      1,
    ],
    [
      new Set([1, 2.1]),
      undefined,
      2.1,
    ],
    [
      new Set([1, 2.1]),
      (item: unknown) => item,
      2.1,
    ],
    [
      new Set([1, 2.1]),
      (item: unknown) => -(item as number),
      1,
    ],
    [
      new Set([2.1, 1]),
      undefined,
      2.1,
    ],
    [
      new Set([2.1, 1]),
      (item: unknown) => item,
      2.1,
    ],
    [
      new Set([2.1, 1]),
      (item: unknown) => -(item as number),
      1,
    ],
    [
      new Set([2, 1.1]),
      undefined,
      2,
    ],
    [
      new Set([2, 1.1]),
      (item: unknown) => item,
      2,
    ],
    [
      new Set([2, 1.1]),
      (item: unknown) => -(item as number),
      1.1,
    ],
    [
      new Set([2.2, 1.1]),
      undefined,
      2.2,
    ],
    [
      new Set([2.2, 1.1]),
      (item: unknown) => item,
      2.2,
    ],
    [
      new Set([2.2, 1.1]),
      (item: unknown) => -(item as number),
      1.1,
    ],
    [
      new Set([1.1, 2.2]),
      undefined,
      2.2,
    ],
    [
      new Set([1.1, 2.2]),
      (item: unknown) => item,
      2.2,
    ],
    [
      new Set([1.1, 2.2]),
      (item: unknown) => -(item as number),
      1.1,
    ],
    [
      new Set(['a', 'b', 'c']),
      undefined,
      'c',
    ],
    [
      new Set(['a', 'b', 'c']),
      (item: unknown) => item,
      'c',
    ],
    [
      new Set(['a', 'b', 'c']),
      (item: unknown) => -(item as string).charCodeAt(0),
      'a',
    ],
    [
      new Set(['b', 'c', 'a']),
      undefined,
      'c',
    ],
    [
      new Set(['b', 'c', 'a']),
      (item: unknown) => item,
      'c',
    ],
    [
      new Set(['b', 'c', 'a']),
      (item: unknown) => -(item as string).charCodeAt(0),
      'a',
    ],
    [
      new Set(['c', 'b', 'a']),
      undefined,
      'c',
    ],
    [
      new Set(['c', 'b', 'a']),
      (item: unknown) => item,
      'c',
    ],
    [
      new Set(['c', 'b', 'a']),
      (item: unknown) => -(item as string).charCodeAt(0),
      'a',
    ],
    [
      new Set(['ab', 'ba', 'b']),
      undefined,
      'ba',
    ],
    [
      new Set(['ab', 'ba', 'b']),
      (item: unknown) => item,
      'ba',
    ],
    [
      new Set(['ba', 'b', 'ab']),
      undefined,
      'ba',
    ],
    [
      new Set(['ba', 'b', 'ab']),
      (item: unknown) => item,
      'ba',
    ],
    [
      new Set([[]]),
      undefined,
      [],
    ],
    [
      new Set([[]]),
      (item: unknown) => item,
      [],
    ],
    [
      new Set([[2]]),
      undefined,
      [2],
    ],
    [
      new Set([[2]]),
      (item: unknown) => item,
      [2],
    ],
    [
      new Set([[], []]),
      undefined,
      [],
    ],
    [
      new Set([[], []]),
      (item: unknown) => item,
      [],
    ],
    [
      new Set([[], [2]]),
      undefined,
      [2],
    ],
    [
      new Set([[], [2]]),
      (item: unknown) => item,
      [2],
    ],
    [
      new Set([[2], []]),
      undefined,
      [2],
    ],
    [
      new Set([[2], []]),
      (item: unknown) => item,
      [2],
    ],
    [
      new Set([[null], [null]]),
      undefined,
      [null],
    ],
    [
      new Set([[null], [null]]),
      (item: unknown) => item,
      [null],
    ],
    [
      new Set([[1, 2], [2]]),
      undefined,
      [2],
    ],
    [
      new Set([[1, 2], [2]]),
      (item: unknown) => item,
      [2],
    ],
    [
      new Set([[3, 2], [2]]),
      undefined,
      [3, 2],
    ],
    [
      new Set([[3, 2], [2]]),
      (item: unknown) => item,
      [3, 2],
    ],
    [
      new Set([[1, 2], [2, 1]]),
      undefined,
      [2, 1],
    ],
    [
      new Set([[1, 2], [2, 1]]),
      (item: unknown) => item,
      [2, 1],
    ],
    [
      new Set([[2, 1], [1, 2]]),
      undefined,
      [2, 1],
    ],
    [
      new Set([[2, 1], [1, 2]]),
      (item: unknown) => item,
      [2, 1],
    ],
    [
      new Set([['a'], ['b']]),
      undefined,
      ['b'],
    ],
    [
      new Set([['a'], ['b']]),
      (item: unknown) => item,
      ['b'],
    ],
    [
      new Set([['a', 'a'], ['b']]),
      undefined,
      ['b'],
    ],
    [
      new Set([['a', 'a'], ['b']]),
      (item: unknown) => item,
      ['b'],
    ],
    [
      new Set([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      undefined,
      [2, 1, 3],
    ],
    [
      new Set([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: unknown) => item,
      [2, 1, 3],
    ],
    [
      new Set([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: unknown) => (item as Array<number>)[1],
      [1, 2, 3],
    ],
    [
      new Set([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: unknown) => -(item as Array<number>)[1],
      [2, 0, 3],
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      undefined,
      undefined,
    ],
    [
      createMapFixture([]),
      (item: unknown) => item,
      undefined,
    ],
    [
      createMapFixture([]),
      (item: unknown) => -(item as number),
      undefined,
    ],
    [
      createMapFixture([0]),
      undefined,
      [0, 0],
    ],
    [
      createMapFixture([0]),
      (item: unknown) => item,
      [0, 0],
    ],
    [
      createMapFixture([0]),
      (item: unknown) => -(item as number),
      [0, 0],
    ],
    [
      createMapFixture([Infinity]),
      undefined,
      [0, Infinity],
    ],
    [
      createMapFixture([Infinity]),
      (item: unknown) => item,
      [0, Infinity],
    ],
    [
      createMapFixture([Infinity]),
      (item: unknown) => -(item as number),
      [0, Infinity],
    ],
    [
      createMapFixture([-Infinity]),
      undefined,
      [0, -Infinity],
    ],
    [
      createMapFixture([-Infinity]),
      (item: [unknown, number]) => item[1],
      [0, -Infinity],
    ],
    [
      createMapFixture([-Infinity]),
      (item: [unknown, number]) => -item[1],
      [0, -Infinity],
    ],
    [
      createMapFixture([Infinity, -Infinity]),
      (item: [unknown, number]) => item[1],
      [0, Infinity],
    ],
    [
      createMapFixture([Infinity, -Infinity]),
      (item: [unknown, number]) => -item[1],
      [1, -Infinity],
    ],
    [
      createMapFixture([Infinity, -Infinity, 10, -1]),
      (item: [unknown, number]) => item[1],
      [0, Infinity],
    ],
    [
      createMapFixture([Infinity, -Infinity, 10, -1]),
      (item: [unknown, number]) => -item[1],
      [1, -Infinity],
    ],
    [
      createMapFixture([1, 2, 3]),
      (item: [unknown, number]) => item[1],
      [2, 3],
    ],
    [
      createMapFixture([1, 2, 3]),
      (item: [unknown, number]) => -item[1],
      [0, 1],
    ],
    [
      createMapFixture([3, 2, 1]),
      (item: [unknown, number]) => item[1],
      [0, 3],
    ],
    [
      createMapFixture([3, 2, 1]),
      (item: [unknown, number]) => -item[1],
      [2, 1],
    ],
    [
      createMapFixture([2, 3, 1]),
      (item: [unknown, number]) => item[1],
      [1, 3],
    ],
    [
      createMapFixture([2, 3, 1]),
      (item: [unknown, number]) => -item[1],
      [2, 1],
    ],
    [
      createMapFixture([1, 2.1]),
      (item: [unknown, number]) => item[1],
      [1, 2.1],
    ],
    [
      createMapFixture([1, 2.1]),
      (item: [unknown, number]) => -item[1],
      [0, 1],
    ],
    [
      createMapFixture([2.1, 1]),
      (item: [unknown, number]) => item[1],
      [0, 2.1],
    ],
    [
      createMapFixture([2.1, 1]),
      (item: [unknown, number]) => -item[1],
      [1, 1],
    ],
    [
      createMapFixture([2, 1.1]),
      (item: [unknown, number]) => item[1],
      [0, 2],
    ],
    [
      createMapFixture([2, 1.1]),
      (item: [unknown, number]) => -item[1],
      [1, 1.1],
    ],
    [
      createMapFixture([2.2, 1.1]),
      (item: [unknown, number]) => item[1],
      [0, 2.2],
    ],
    [
      createMapFixture([2.2, 1.1]),
      (item: [unknown, number]) => -item[1],
      [1, 1.1],
    ],
    [
      createMapFixture([1.1, 2.2]),
      (item: [unknown, number]) => item[1],
      [1, 2.2],
    ],
    [
      createMapFixture([1.1, 2.2]),
      (item: [unknown, number]) => -item[1],
      [0, 1.1],
    ],
    [
      createMapFixture(['a', 'b', 'c']),
      (item: [unknown, string]) => item[1],
      [2, 'c'],
    ],
    [
      createMapFixture(['a', 'b', 'c']),
      (item: [unknown, string]) => -item[1].charCodeAt(0),
      [0, 'a'],
    ],
    [
      createMapFixture(['b', 'c', 'a']),
      (item: [unknown, string]) => item[1],
      [1, 'c'],
    ],
    [
      createMapFixture(['b', 'c', 'a']),
      (item: [unknown, string]) => -item[1].charCodeAt(0),
      [2, 'a'],
    ],
    [
      createMapFixture(['c', 'b', 'a']),
      (item: [unknown, string]) => item[1],
      [0, 'c'],
    ],
    [
      createMapFixture(['c', 'b', 'a']),
      (item: [unknown, string]) => -item[1].charCodeAt(0),
      [2, 'a'],
    ],
    [
      createMapFixture(['ab', 'ba', 'b']),
      (item: [unknown, string]) => item[1],
      [1, 'ba'],
    ],
    [
      createMapFixture(['ba', 'b', 'ab']),
      (item: [unknown, string]) => item[1],
      [0, 'ba'],
    ],
    [
      createMapFixture([[]]),
      (item: [unknown, string]) => item[1],
      [0, []],
    ],
    [
      createMapFixture([[2]]),
      (item: [unknown, string]) => item[1],
      [0, [2]],
    ],
    [
      createMapFixture([[], []]),
      (item: [unknown, string]) => item[1],
      [0, []],
    ],
    [
      createMapFixture([[], [2]]),
      (item: [unknown, string]) => item[1],
      [1, [2]],
    ],
    [
      createMapFixture([[2], []]),
      (item: [unknown, string]) => item[1],
      [0, [2]],
    ],
    [
      createMapFixture([[null], [null]]),
      (item: [unknown, string]) => item[1],
      [0, [null]],
    ],
    [
      createMapFixture([[1, 2], [2]]),
      (item: [unknown, string]) => item[1],
      [1, [2]],
    ],
    [
      createMapFixture([[3, 2], [2]]),
      (item: [unknown, string]) => item[1],
      [0, [3, 2]],
    ],
    [
      createMapFixture([[1, 2], [2, 1]]),
      (item: [unknown, string]) => item[1],
      [1, [2, 1]],
    ],
    [
      createMapFixture([[2, 1], [1, 2]]),
      (item: [unknown, string]) => item[1],
      [0, [2, 1]],
    ],
    [
      createMapFixture([['a'], ['b']]),
      (item: [unknown, string]) => item[1],
      [1, ['b']],
    ],
    [
      createMapFixture([['a', 'a'], ['b']]),
      (item: [unknown, string]) => item[1],
      [1, ['b']],
    ],
    [
      createMapFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: [unknown, Array<number>]) => item[1],
      [2, [2, 1, 3]],
    ],
    [
      createMapFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: [unknown, Array<number>]) => item[1][1],
      [0, [1, 2, 3]],
    ],
    [
      createMapFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: [unknown, Array<number>]) => -item[1][1],
      [1, [2, 0, 3]],
    ],
  ];
}
