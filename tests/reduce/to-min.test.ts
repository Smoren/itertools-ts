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
])("Reduce To Min Test", (input, compareBy, expected) => {
  it("", () => {
    // When
    const result = reduce.toMin(input as Iterable<unknown>, compareBy as ((datum: unknown) => unknown)|undefined);

    // Then
    expect(result).toEqual(expected);
  });
});

describe.each([
  ...dataProviderForUsingCustomComparator(),
])("Reduce To Min Using Custom Comparator Test", (input, compareBy, expected) => {
  it("", () => {
    // When
    const result = reduce.toMin(input as Iterable<unknown>, compareBy as (datum: unknown) => unknown);

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
        title: 'The Matrix Resurrections',
        rating: 2.6,
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
      (item: number) => item,
      undefined,
    ],
    [
      [],
      (item: number) => -item,
      undefined,
    ],
    [
      [0],
      undefined,
      0,
    ],
    [
      [0],
      (item: number) => item,
      0,
    ],
    [
      [0],
      (item: number) => -item,
      0,
    ],
    [
      [Infinity],
      undefined,
      Infinity,
    ],
    [
      [Infinity],
      (item: number) => item,
      Infinity,
    ],
    [
      [Infinity],
      (item: number) => -item,
      Infinity,
    ],
    [
      [-Infinity],
      undefined,
      -Infinity,
    ],
    [
      [-Infinity],
      (item: number) => item,
      -Infinity,
    ],
    [
      [-Infinity],
      (item: number) => -item,
      -Infinity,
    ],
    [
      [Infinity, -Infinity],
      undefined,
      -Infinity,
    ],
    [
      [Infinity, -Infinity],
      (item: number) => item,
      -Infinity,
    ],
    [
      [Infinity, -Infinity],
      (item: number) => -item,
      Infinity,
    ],
    [
      [Infinity, -Infinity, 10, -1],
      undefined,
      -Infinity,
    ],
    [
      [Infinity, -Infinity, 10, -1],
      (item: number) => item,
      -Infinity,
    ],
    [
      [Infinity, -Infinity, 10, -1],
      (item: number) => -item,
      Infinity,
    ],
    [
      [1, 2, 3],
      undefined,
      1,
    ],
    [
      [1, 2, 3],
      (item: number) => item,
      1,
    ],
    [
      [1, 2, 3],
      (item: number) => -item,
      3,
    ],
    [
      [3, 2, 1],
      undefined,
      1,
    ],
    [
      [3, 2, 1],
      (item: number) => item,
      1,
    ],
    [
      [3, 2, 1],
      (item: number) => -item,
      3,
    ],
    [
      [3, 2, 1],
      undefined,
      1,
    ],
    [
      [3, 2, 1],
      (item: number) => item,
      1,
    ],
    [
      [3, 2, 1],
      (item: number) => -item,
      3,
    ],
    [
      [2.1, 1],
      undefined,
      1,
    ],
    [
      [2.1, 1],
      (item: number) => item,
      1,
    ],
    [
      [2.1, 1],
      (item: number) => -item,
      2.1,
    ],
    [
      [2, 1.1],
      undefined,
      1.1,
    ],
    [
      [2, 1.1],
      (item: number) => item,
      1.1,
    ],
    [
      [2, 1.1],
      (item: number) => -item,
      2,
    ],
    [
      [2.2, 1.1],
      undefined,
      1.1,
    ],
    [
      [2.2, 1.1],
      (item: number) => item,
      1.1,
    ],
    [
      [2.2, 1.1],
      (item: number) => -item,
      2.2,
    ],
    [
      [1.1, 2.2],
      undefined,
      1.1,
    ],
    [
      [1.1, 2.2],
      (item: number) => item,
      1.1,
    ],
    [
      [1.1, 2.2],
      (item: number) => -item,
      2.2,
    ],
    [
      ['a', 'b', 'c'],
      undefined,
      'a',
    ],
    [
      ['a', 'b', 'c'],
      (item: string) => item,
      'a',
    ],
    [
      ['a', 'b', 'c'],
      (item: string) => -item.charCodeAt(0),
      'c',
    ],
    [
      ['b', 'c', 'a'],
      undefined,
      'a',
    ],
    [
      ['b', 'c', 'a'],
      (item: string) => item,
      'a',
    ],
    [
      ['b', 'c', 'a'],
      (item: string) => -item.charCodeAt(0),
      'c',
    ],
    [
      ['c', 'b', 'a'],
      undefined,
      'a',
    ],
    [
      ['c', 'b', 'a'],
      (item: string) => item,
      'a',
    ],
    [
      ['c', 'b', 'a'],
      (item: string) => -item.charCodeAt(0),
      'c',
    ],
    [
      ['ab', 'ba', 'b'],
      undefined,
      'ab',
    ],
    [
      ['ab', 'ba', 'b'],
      (item: string) => item,
      'ab',
    ],
    [
      ['ba', 'b', 'ab'],
      undefined,
      'ab',
    ],
    [
      ['ba', 'b', 'ab'],
      (item: string) => item,
      'ab',
    ],
    [
      [[]],
      undefined,
      [],
    ],
    [
      [[]],
      (item: Array<unknown>) => item,
      [],
    ],
    [
      [[2]],
      undefined,
      [2],
    ],
    [
      [[2]],
      (item: Array<unknown>) => item,
      [2],
    ],
    [
      [[], []],
      undefined,
      [],
    ],
    [
      [[], []],
      (item: Array<unknown>) => item,
      [],
    ],
    [
      [[], [2]],
      undefined,
      [],
    ],
    [
      [[], [2]],
      (item: Array<unknown>) => item,
      [],
    ],
    [
      [[2], []],
      undefined,
      [],
    ],
    [
      [[2], []],
      (item: Array<unknown>) => item,
      [],
    ],
    [
      [[], [null]],
      undefined,
      [],
    ],
    [
      [[], [null]],
      (item: Array<unknown>) => item,
      [],
    ],
    [
      [[null], [null]],
      undefined,
      [null],
    ],
    [
      [[null], [null]],
      (item: Array<unknown>) => item,
      [null],
    ],
    [
      [[1, 2], [2]],
      undefined,
      [1, 2],
    ],
    [
      [[1, 2], [2]],
      (item: Array<unknown>) => item,
      [1, 2],
    ],
    [
      [[3, 2], [2]],
      undefined,
      [2],
    ],
    [
      [[3, 2], [2]],
      (item: Array<unknown>) => item,
      [2],
    ],
    [
      [[1, 2], [2, 1]],
      undefined,
      [1, 2],
    ],
    [
      [[1, 2], [2, 1]],
      (item: Array<unknown>) => item,
      [1, 2],
    ],
    [
      [[2, 1], [1, 2]],
      undefined,
      [1, 2],
    ],
    [
      [[2, 1], [1, 2]],
      (item: Array<unknown>) => item,
      [1, 2],
    ],
    [
      [['a'], ['b']],
      undefined,
      ['a'],
    ],
    [
      [['a'], ['b']],
      (item: Array<unknown>) => item,
      ['a'],
    ],
    [
      [['a', 'a'], ['b']],
      undefined,
      ['a', 'a'],
    ],
    [
      [['a', 'a'], ['b']],
      (item: Array<unknown>) => item,
      ['a', 'a'],
    ],
    [
      [[1, 2, 3], [2, 0, 3], [2, 1, 3]],
      undefined,
      [1, 2, 3],
    ],
    [
      [[1, 2, 3], [2, 0, 3], [2, 1, 3]],
      (item: Array<unknown>) => item,
      [1, 2, 3],
    ],
    [
      [[1, 2, 3], [2, 0, 3], [2, 1, 3]],
      (item: Array<unknown>) => item[1],
      [2, 0, 3],
    ],
    [
      [[1, 2, 3], [2, 0, 3], [2, 1, 3]],
      (item: Array<unknown>) => -(item[1] as number),
      [1, 2, 3],
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
      (item: number) => item,
      undefined,
    ],
    [
      createGeneratorFixture([]),
      (item: number) => -item,
      undefined,
    ],
    [
      createGeneratorFixture([0]),
      undefined,
      0,
    ],
    [
      createGeneratorFixture([0]),
      (item: number) => item,
      0,
    ],
    [
      createGeneratorFixture([0]),
      (item: number) => -item,
      0,
    ],
    [
      createGeneratorFixture([Infinity]),
      undefined,
      Infinity,
    ],
    [
      createGeneratorFixture([Infinity]),
      (item: number) => item,
      Infinity,
    ],
    [
      createGeneratorFixture([Infinity]),
      (item: number) => -item,
      Infinity,
    ],
    [
      createGeneratorFixture([-Infinity]),
      undefined,
      -Infinity,
    ],
    [
      createGeneratorFixture([-Infinity]),
      (item: number) => item,
      -Infinity,
    ],
    [
      createGeneratorFixture([-Infinity]),
      (item: number) => -item,
      -Infinity,
    ],
    [
      createGeneratorFixture([Infinity, -Infinity]),
      undefined,
      -Infinity,
    ],
    [
      createGeneratorFixture([Infinity, -Infinity]),
      (item: number) => item,
      -Infinity,
    ],
    [
      createGeneratorFixture([Infinity, -Infinity]),
      (item: number) => -item,
      Infinity,
    ],
    [
      createGeneratorFixture([Infinity, -Infinity, 10, -1]),
      undefined,
      -Infinity,
    ],
    [
      createGeneratorFixture([Infinity, -Infinity, 10, -1]),
      (item: number) => item,
      -Infinity,
    ],
    [
      createGeneratorFixture([Infinity, -Infinity, 10, -1]),
      (item: number) => -item,
      Infinity,
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      undefined,
      1,
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (item: number) => item,
      1,
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (item: number) => -item,
      3,
    ],
    [
      createGeneratorFixture([3, 2, 1]),
      undefined,
      1,
    ],
    [
      createGeneratorFixture([3, 2, 1]),
      (item: number) => item,
      1,
    ],
    [
      createGeneratorFixture([3, 2, 1]),
      (item: number) => -item,
      3,
    ],
    [
      createGeneratorFixture([3, 2, 1]),
      undefined,
      1,
    ],
    [
      createGeneratorFixture([3, 2, 1]),
      (item: number) => item,
      1,
    ],
    [
      createGeneratorFixture([3, 2, 1]),
      (item: number) => -item,
      3,
    ],
    [
      createGeneratorFixture([2.1, 1]),
      undefined,
      1,
    ],
    [
      createGeneratorFixture([2.1, 1]),
      (item: number) => item,
      1,
    ],
    [
      createGeneratorFixture([2.1, 1]),
      (item: number) => -item,
      2.1,
    ],
    [
      createGeneratorFixture([2, 1.1]),
      undefined,
      1.1,
    ],
    [
      createGeneratorFixture([2, 1.1]),
      (item: number) => item,
      1.1,
    ],
    [
      createGeneratorFixture([2, 1.1]),
      (item: number) => -item,
      2,
    ],
    [
      createGeneratorFixture([2.2, 1.1]),
      undefined,
      1.1,
    ],
    [
      createGeneratorFixture([2.2, 1.1]),
      (item: number) => item,
      1.1,
    ],
    [
      createGeneratorFixture([2.2, 1.1]),
      (item: number) => -item,
      2.2,
    ],
    [
      createGeneratorFixture([1.1, 2.2]),
      undefined,
      1.1,
    ],
    [
      createGeneratorFixture([1.1, 2.2]),
      (item: number) => item,
      1.1,
    ],
    [
      createGeneratorFixture([1.1, 2.2]),
      (item: number) => -item,
      2.2,
    ],
    [
      createGeneratorFixture(['a', 'b', 'c']),
      undefined,
      'a',
    ],
    [
      createGeneratorFixture(['a', 'b', 'c']),
      (item: string) => item,
      'a',
    ],
    [
      createGeneratorFixture(['a', 'b', 'c']),
      (item: string) => -item.charCodeAt(0),
      'c',
    ],
    [
      createGeneratorFixture(['b', 'c', 'a']),
      undefined,
      'a',
    ],
    [
      createGeneratorFixture(['b', 'c', 'a']),
      (item: string) => item,
      'a',
    ],
    [
      createGeneratorFixture(['b', 'c', 'a']),
      (item: string) => -item.charCodeAt(0),
      'c',
    ],
    [
      createGeneratorFixture(['c', 'b', 'a']),
      undefined,
      'a',
    ],
    [
      createGeneratorFixture(['c', 'b', 'a']),
      (item: string) => item,
      'a',
    ],
    [
      createGeneratorFixture(['c', 'b', 'a']),
      (item: string) => -item.charCodeAt(0),
      'c',
    ],
    [
      createGeneratorFixture(['ab', 'ba', 'b']),
      undefined,
      'ab',
    ],
    [
      createGeneratorFixture(['ab', 'ba', 'b']),
      (item: string) => item,
      'ab',
    ],
    [
      createGeneratorFixture(['ba', 'b', 'ab']),
      undefined,
      'ab',
    ],
    [
      createGeneratorFixture(['ba', 'b', 'ab']),
      (item: string) => item,
      'ab',
    ],
    [
      createGeneratorFixture([[]]),
      undefined,
      [],
    ],
    [
      createGeneratorFixture([[]]),
      (item: Array<unknown>) => item,
      [],
    ],
    [
      createGeneratorFixture([[2]]),
      undefined,
      [2],
    ],
    [
      createGeneratorFixture([[2]]),
      (item: Array<unknown>) => item,
      [2],
    ],
    [
      createGeneratorFixture([[], []]),
      undefined,
      [],
    ],
    [
      createGeneratorFixture([[], []]),
      (item: Array<unknown>) => item,
      [],
    ],
    [
      createGeneratorFixture([[], [2]]),
      undefined,
      [],
    ],
    [
      createGeneratorFixture([[], [2]]),
      (item: Array<unknown>) => item,
      [],
    ],
    [
      createGeneratorFixture([[2], []]),
      undefined,
      [],
    ],
    [
      createGeneratorFixture([[2], []]),
      (item: Array<unknown>) => item,
      [],
    ],
    [
      createGeneratorFixture([[], [null]]),
      undefined,
      [],
    ],
    [
      createGeneratorFixture([[], [null]]),
      (item: Array<unknown>) => item,
      [],
    ],
    [
      createGeneratorFixture([[null], [null]]),
      undefined,
      [null],
    ],
    [
      createGeneratorFixture([[null], [null]]),
      (item: Array<unknown>) => item,
      [null],
    ],
    [
      createGeneratorFixture([[1, 2], [2]]),
      undefined,
      [1, 2],
    ],
    [
      createGeneratorFixture([[1, 2], [2]]),
      (item: Array<unknown>) => item,
      [1, 2],
    ],
    [
      createGeneratorFixture([[3, 2], [2]]),
      undefined,
      [2],
    ],
    [
      createGeneratorFixture([[3, 2], [2]]),
      (item: Array<unknown>) => item,
      [2],
    ],
    [
      createGeneratorFixture([[1, 2], [2, 1]]),
      undefined,
      [1, 2],
    ],
    [
      createGeneratorFixture([[1, 2], [2, 1]]),
      (item: Array<unknown>) => item,
      [1, 2],
    ],
    [
      createGeneratorFixture([[2, 1], [1, 2]]),
      undefined,
      [1, 2],
    ],
    [
      createGeneratorFixture([[2, 1], [1, 2]]),
      (item: Array<unknown>) => item,
      [1, 2],
    ],
    [
      createGeneratorFixture([['a'], ['b']]),
      undefined,
      ['a'],
    ],
    [
      createGeneratorFixture([['a'], ['b']]),
      (item: Array<unknown>) => item,
      ['a'],
    ],
    [
      createGeneratorFixture([['a', 'a'], ['b']]),
      undefined,
      ['a', 'a'],
    ],
    [
      createGeneratorFixture([['a', 'a'], ['b']]),
      (item: Array<unknown>) => item,
      ['a', 'a'],
    ],
    [
      createGeneratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      undefined,
      [1, 2, 3],
    ],
    [
      createGeneratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => item,
      [1, 2, 3],
    ],
    [
      createGeneratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => item[1],
      [2, 0, 3],
    ],
    [
      createGeneratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => -(item[1] as number),
      [1, 2, 3],
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
      (item: number) => item,
      undefined,
    ],
    [
      createIterableFixture([]),
      (item: number) => -item,
      undefined,
    ],
    [
      createIterableFixture([0]),
      undefined,
      0,
    ],
    [
      createIterableFixture([0]),
      (item: number) => item,
      0,
    ],
    [
      createIterableFixture([0]),
      (item: number) => -item,
      0,
    ],
    [
      createIterableFixture([Infinity]),
      undefined,
      Infinity,
    ],
    [
      createIterableFixture([Infinity]),
      (item: number) => item,
      Infinity,
    ],
    [
      createIterableFixture([Infinity]),
      (item: number) => -item,
      Infinity,
    ],
    [
      createIterableFixture([-Infinity]),
      undefined,
      -Infinity,
    ],
    [
      createIterableFixture([-Infinity]),
      (item: number) => item,
      -Infinity,
    ],
    [
      createIterableFixture([-Infinity]),
      (item: number) => -item,
      -Infinity,
    ],
    [
      createIterableFixture([Infinity, -Infinity]),
      undefined,
      -Infinity,
    ],
    [
      createIterableFixture([Infinity, -Infinity]),
      (item: number) => item,
      -Infinity,
    ],
    [
      createIterableFixture([Infinity, -Infinity]),
      (item: number) => -item,
      Infinity,
    ],
    [
      createIterableFixture([Infinity, -Infinity, 10, -1]),
      undefined,
      -Infinity,
    ],
    [
      createIterableFixture([Infinity, -Infinity, 10, -1]),
      (item: number) => item,
      -Infinity,
    ],
    [
      createIterableFixture([Infinity, -Infinity, 10, -1]),
      (item: number) => -item,
      Infinity,
    ],
    [
      createIterableFixture([1, 2, 3]),
      undefined,
      1,
    ],
    [
      createIterableFixture([1, 2, 3]),
      (item: number) => item,
      1,
    ],
    [
      createIterableFixture([1, 2, 3]),
      (item: number) => -item,
      3,
    ],
    [
      createIterableFixture([3, 2, 1]),
      undefined,
      1,
    ],
    [
      createIterableFixture([3, 2, 1]),
      (item: number) => item,
      1,
    ],
    [
      createIterableFixture([3, 2, 1]),
      (item: number) => -item,
      3,
    ],
    [
      createIterableFixture([3, 2, 1]),
      undefined,
      1,
    ],
    [
      createIterableFixture([3, 2, 1]),
      (item: number) => item,
      1,
    ],
    [
      createIterableFixture([3, 2, 1]),
      (item: number) => -item,
      3,
    ],
    [
      createIterableFixture([2.1, 1]),
      undefined,
      1,
    ],
    [
      createIterableFixture([2.1, 1]),
      (item: number) => item,
      1,
    ],
    [
      createIterableFixture([2.1, 1]),
      (item: number) => -item,
      2.1,
    ],
    [
      createIterableFixture([2, 1.1]),
      undefined,
      1.1,
    ],
    [
      createIterableFixture([2, 1.1]),
      (item: number) => item,
      1.1,
    ],
    [
      createIterableFixture([2, 1.1]),
      (item: number) => -item,
      2,
    ],
    [
      createIterableFixture([2.2, 1.1]),
      undefined,
      1.1,
    ],
    [
      createIterableFixture([2.2, 1.1]),
      (item: number) => item,
      1.1,
    ],
    [
      createIterableFixture([2.2, 1.1]),
      (item: number) => -item,
      2.2,
    ],
    [
      createIterableFixture([1.1, 2.2]),
      undefined,
      1.1,
    ],
    [
      createIterableFixture([1.1, 2.2]),
      (item: number) => item,
      1.1,
    ],
    [
      createIterableFixture([1.1, 2.2]),
      (item: number) => -item,
      2.2,
    ],
    [
      createIterableFixture(['a', 'b', 'c']),
      undefined,
      'a',
    ],
    [
      createIterableFixture(['a', 'b', 'c']),
      (item: string) => item,
      'a',
    ],
    [
      createIterableFixture(['a', 'b', 'c']),
      (item: string) => -item.charCodeAt(0),
      'c',
    ],
    [
      createIterableFixture(['b', 'c', 'a']),
      undefined,
      'a',
    ],
    [
      createIterableFixture(['b', 'c', 'a']),
      (item: string) => item,
      'a',
    ],
    [
      createIterableFixture(['b', 'c', 'a']),
      (item: string) => -item.charCodeAt(0),
      'c',
    ],
    [
      createIterableFixture(['c', 'b', 'a']),
      undefined,
      'a',
    ],
    [
      createIterableFixture(['c', 'b', 'a']),
      (item: string) => item,
      'a',
    ],
    [
      createIterableFixture(['c', 'b', 'a']),
      (item: string) => -item.charCodeAt(0),
      'c',
    ],
    [
      createIterableFixture(['ab', 'ba', 'b']),
      undefined,
      'ab',
    ],
    [
      createIterableFixture(['ab', 'ba', 'b']),
      (item: string) => item,
      'ab',
    ],
    [
      createIterableFixture(['ba', 'b', 'ab']),
      undefined,
      'ab',
    ],
    [
      createIterableFixture(['ba', 'b', 'ab']),
      (item: string) => item,
      'ab',
    ],
    [
      createIterableFixture([[]]),
      undefined,
      [],
    ],
    [
      createIterableFixture([[]]),
      (item: Array<unknown>) => item,
      [],
    ],
    [
      createIterableFixture([[2]]),
      undefined,
      [2],
    ],
    [
      createIterableFixture([[2]]),
      (item: Array<unknown>) => item,
      [2],
    ],
    [
      createIterableFixture([[], []]),
      undefined,
      [],
    ],
    [
      createIterableFixture([[], []]),
      (item: Array<unknown>) => item,
      [],
    ],
    [
      createIterableFixture([[], [2]]),
      undefined,
      [],
    ],
    [
      createIterableFixture([[], [2]]),
      (item: Array<unknown>) => item,
      [],
    ],
    [
      createIterableFixture([[2], []]),
      undefined,
      [],
    ],
    [
      createIterableFixture([[2], []]),
      (item: Array<unknown>) => item,
      [],
    ],
    [
      createIterableFixture([[], [null]]),
      undefined,
      [],
    ],
    [
      createIterableFixture([[], [null]]),
      (item: Array<unknown>) => item,
      [],
    ],
    [
      createIterableFixture([[null], [null]]),
      undefined,
      [null],
    ],
    [
      createIterableFixture([[null], [null]]),
      (item: Array<unknown>) => item,
      [null],
    ],
    [
      createIterableFixture([[1, 2], [2]]),
      undefined,
      [1, 2],
    ],
    [
      createIterableFixture([[1, 2], [2]]),
      (item: Array<unknown>) => item,
      [1, 2],
    ],
    [
      createIterableFixture([[3, 2], [2]]),
      undefined,
      [2],
    ],
    [
      createIterableFixture([[3, 2], [2]]),
      (item: Array<unknown>) => item,
      [2],
    ],
    [
      createIterableFixture([[1, 2], [2, 1]]),
      undefined,
      [1, 2],
    ],
    [
      createIterableFixture([[1, 2], [2, 1]]),
      (item: Array<unknown>) => item,
      [1, 2],
    ],
    [
      createIterableFixture([[2, 1], [1, 2]]),
      undefined,
      [1, 2],
    ],
    [
      createIterableFixture([[2, 1], [1, 2]]),
      (item: Array<unknown>) => item,
      [1, 2],
    ],
    [
      createIterableFixture([['a'], ['b']]),
      undefined,
      ['a'],
    ],
    [
      createIterableFixture([['a'], ['b']]),
      (item: Array<unknown>) => item,
      ['a'],
    ],
    [
      createIterableFixture([['a', 'a'], ['b']]),
      undefined,
      ['a', 'a'],
    ],
    [
      createIterableFixture([['a', 'a'], ['b']]),
      (item: Array<unknown>) => item,
      ['a', 'a'],
    ],
    [
      createIterableFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      undefined,
      [1, 2, 3],
    ],
    [
      createIterableFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => item,
      [1, 2, 3],
    ],
    [
      createIterableFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => item[1],
      [2, 0, 3],
    ],
    [
      createIterableFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => -(item[1] as number),
      [1, 2, 3],
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
      (item: number) => item,
      undefined,
    ],
    [
      createIteratorFixture([]),
      (item: number) => -item,
      undefined,
    ],
    [
      createIteratorFixture([0]),
      undefined,
      0,
    ],
    [
      createIteratorFixture([0]),
      (item: number) => item,
      0,
    ],
    [
      createIteratorFixture([0]),
      (item: number) => -item,
      0,
    ],
    [
      createIteratorFixture([Infinity]),
      undefined,
      Infinity,
    ],
    [
      createIteratorFixture([Infinity]),
      (item: number) => item,
      Infinity,
    ],
    [
      createIteratorFixture([Infinity]),
      (item: number) => -item,
      Infinity,
    ],
    [
      createIteratorFixture([-Infinity]),
      undefined,
      -Infinity,
    ],
    [
      createIteratorFixture([-Infinity]),
      (item: number) => item,
      -Infinity,
    ],
    [
      createIteratorFixture([-Infinity]),
      (item: number) => -item,
      -Infinity,
    ],
    [
      createIteratorFixture([Infinity, -Infinity]),
      undefined,
      -Infinity,
    ],
    [
      createIteratorFixture([Infinity, -Infinity]),
      (item: number) => item,
      -Infinity,
    ],
    [
      createIteratorFixture([Infinity, -Infinity]),
      (item: number) => -item,
      Infinity,
    ],
    [
      createIteratorFixture([Infinity, -Infinity, 10, -1]),
      undefined,
      -Infinity,
    ],
    [
      createIteratorFixture([Infinity, -Infinity, 10, -1]),
      (item: number) => item,
      -Infinity,
    ],
    [
      createIteratorFixture([Infinity, -Infinity, 10, -1]),
      (item: number) => -item,
      Infinity,
    ],
    [
      createIteratorFixture([1, 2, 3]),
      undefined,
      1,
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (item: number) => item,
      1,
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (item: number) => -item,
      3,
    ],
    [
      createIteratorFixture([3, 2, 1]),
      undefined,
      1,
    ],
    [
      createIteratorFixture([3, 2, 1]),
      (item: number) => item,
      1,
    ],
    [
      createIteratorFixture([3, 2, 1]),
      (item: number) => -item,
      3,
    ],
    [
      createIteratorFixture([3, 2, 1]),
      undefined,
      1,
    ],
    [
      createIteratorFixture([3, 2, 1]),
      (item: number) => item,
      1,
    ],
    [
      createIteratorFixture([3, 2, 1]),
      (item: number) => -item,
      3,
    ],
    [
      createIteratorFixture([2.1, 1]),
      undefined,
      1,
    ],
    [
      createIteratorFixture([2.1, 1]),
      (item: number) => item,
      1,
    ],
    [
      createIteratorFixture([2.1, 1]),
      (item: number) => -item,
      2.1,
    ],
    [
      createIteratorFixture([2, 1.1]),
      undefined,
      1.1,
    ],
    [
      createIteratorFixture([2, 1.1]),
      (item: number) => item,
      1.1,
    ],
    [
      createIteratorFixture([2, 1.1]),
      (item: number) => -item,
      2,
    ],
    [
      createIteratorFixture([2.2, 1.1]),
      undefined,
      1.1,
    ],
    [
      createIteratorFixture([2.2, 1.1]),
      (item: number) => item,
      1.1,
    ],
    [
      createIteratorFixture([2.2, 1.1]),
      (item: number) => -item,
      2.2,
    ],
    [
      createIteratorFixture([1.1, 2.2]),
      undefined,
      1.1,
    ],
    [
      createIteratorFixture([1.1, 2.2]),
      (item: number) => item,
      1.1,
    ],
    [
      createIteratorFixture([1.1, 2.2]),
      (item: number) => -item,
      2.2,
    ],
    [
      createIteratorFixture(['a', 'b', 'c']),
      undefined,
      'a',
    ],
    [
      createIteratorFixture(['a', 'b', 'c']),
      (item: string) => item,
      'a',
    ],
    [
      createIteratorFixture(['a', 'b', 'c']),
      (item: string) => -item.charCodeAt(0),
      'c',
    ],
    [
      createIteratorFixture(['b', 'c', 'a']),
      undefined,
      'a',
    ],
    [
      createIteratorFixture(['b', 'c', 'a']),
      (item: string) => item,
      'a',
    ],
    [
      createIteratorFixture(['b', 'c', 'a']),
      (item: string) => -item.charCodeAt(0),
      'c',
    ],
    [
      createIteratorFixture(['c', 'b', 'a']),
      undefined,
      'a',
    ],
    [
      createIteratorFixture(['c', 'b', 'a']),
      (item: string) => item,
      'a',
    ],
    [
      createIteratorFixture(['c', 'b', 'a']),
      (item: string) => -item.charCodeAt(0),
      'c',
    ],
    [
      createIteratorFixture(['ab', 'ba', 'b']),
      undefined,
      'ab',
    ],
    [
      createIteratorFixture(['ab', 'ba', 'b']),
      (item: string) => item,
      'ab',
    ],
    [
      createIteratorFixture(['ba', 'b', 'ab']),
      undefined,
      'ab',
    ],
    [
      createIteratorFixture(['ba', 'b', 'ab']),
      (item: string) => item,
      'ab',
    ],
    [
      createIteratorFixture([[]]),
      undefined,
      [],
    ],
    [
      createIteratorFixture([[]]),
      (item: Array<unknown>) => item,
      [],
    ],
    [
      createIteratorFixture([[2]]),
      undefined,
      [2],
    ],
    [
      createIteratorFixture([[2]]),
      (item: Array<unknown>) => item,
      [2],
    ],
    [
      createIteratorFixture([[], []]),
      undefined,
      [],
    ],
    [
      createIteratorFixture([[], []]),
      (item: Array<unknown>) => item,
      [],
    ],
    [
      createIteratorFixture([[], [2]]),
      undefined,
      [],
    ],
    [
      createIteratorFixture([[], [2]]),
      (item: Array<unknown>) => item,
      [],
    ],
    [
      createIteratorFixture([[2], []]),
      undefined,
      [],
    ],
    [
      createIteratorFixture([[2], []]),
      (item: Array<unknown>) => item,
      [],
    ],
    [
      createIteratorFixture([[], [null]]),
      undefined,
      [],
    ],
    [
      createIteratorFixture([[], [null]]),
      (item: Array<unknown>) => item,
      [],
    ],
    [
      createIteratorFixture([[null], [null]]),
      undefined,
      [null],
    ],
    [
      createIteratorFixture([[null], [null]]),
      (item: Array<unknown>) => item,
      [null],
    ],
    [
      createIteratorFixture([[1, 2], [2]]),
      undefined,
      [1, 2],
    ],
    [
      createIteratorFixture([[1, 2], [2]]),
      (item: Array<unknown>) => item,
      [1, 2],
    ],
    [
      createIteratorFixture([[3, 2], [2]]),
      undefined,
      [2],
    ],
    [
      createIteratorFixture([[3, 2], [2]]),
      (item: Array<unknown>) => item,
      [2],
    ],
    [
      createIteratorFixture([[1, 2], [2, 1]]),
      undefined,
      [1, 2],
    ],
    [
      createIteratorFixture([[1, 2], [2, 1]]),
      (item: Array<unknown>) => item,
      [1, 2],
    ],
    [
      createIteratorFixture([[2, 1], [1, 2]]),
      undefined,
      [1, 2],
    ],
    [
      createIteratorFixture([[2, 1], [1, 2]]),
      (item: Array<unknown>) => item,
      [1, 2],
    ],
    [
      createIteratorFixture([['a'], ['b']]),
      undefined,
      ['a'],
    ],
    [
      createIteratorFixture([['a'], ['b']]),
      (item: Array<unknown>) => item,
      ['a'],
    ],
    [
      createIteratorFixture([['a', 'a'], ['b']]),
      undefined,
      ['a', 'a'],
    ],
    [
      createIteratorFixture([['a', 'a'], ['b']]),
      (item: Array<unknown>) => item,
      ['a', 'a'],
    ],
    [
      createIteratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      undefined,
      [1, 2, 3],
    ],
    [
      createIteratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => item,
      [1, 2, 3],
    ],
    [
      createIteratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => item[1],
      [2, 0, 3],
    ],
    [
      createIteratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => -(item[1] as number),
      [1, 2, 3],
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      ['a', 'b', 'c'],
      undefined,
      'a',
    ],
    [
      ['b', 'c', 'a'],
      undefined,
      'a',
    ],
    [
      ['c', 'b', 'a'],
      undefined,
      'a',
    ],
    [
      ['ab', 'ba', 'b'],
      undefined,
      'ab',
    ],
    [
      ['ba', 'b', 'ab'],
      undefined,
      'ab',
    ],
    [
      ['ac', 'b', 'ab'],
      undefined,
      'ab',
    ],
    [
      [['a'], ['b']],
      undefined,
      ['a'],
    ],
    [
      [['a', 'a'], ['b']],
      undefined,
      ['a', 'a'],
    ],
  ]
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
      (item: number) => item,
      undefined,
    ],
    [
      new Set([]),
      (item: number) => -item,
      undefined,
    ],
    [
      new Set([0]),
      undefined,
      0,
    ],
    [
      new Set([0]),
      (item: number) => item,
      0,
    ],
    [
      new Set([0]),
      (item: number) => -item,
      0,
    ],
    [
      new Set([Infinity]),
      undefined,
      Infinity,
    ],
    [
      new Set([Infinity]),
      (item: number) => item,
      Infinity,
    ],
    [
      new Set([Infinity]),
      (item: number) => -item,
      Infinity,
    ],
    [
      new Set([-Infinity]),
      undefined,
      -Infinity,
    ],
    [
      new Set([-Infinity]),
      (item: number) => item,
      -Infinity,
    ],
    [
      new Set([-Infinity]),
      (item: number) => -item,
      -Infinity,
    ],
    [
      new Set([Infinity, -Infinity]),
      undefined,
      -Infinity,
    ],
    [
      new Set([Infinity, -Infinity]),
      (item: number) => item,
      -Infinity,
    ],
    [
      new Set([Infinity, -Infinity]),
      (item: number) => -item,
      Infinity,
    ],
    [
      new Set([Infinity, -Infinity, 10, -1]),
      undefined,
      -Infinity,
    ],
    [
      new Set([Infinity, -Infinity, 10, -1]),
      (item: number) => item,
      -Infinity,
    ],
    [
      new Set([Infinity, -Infinity, 10, -1]),
      (item: number) => -item,
      Infinity,
    ],
    [
      new Set([1, 2, 3]),
      undefined,
      1,
    ],
    [
      new Set([1, 2, 3]),
      (item: number) => item,
      1,
    ],
    [
      new Set([1, 2, 3]),
      (item: number) => -item,
      3,
    ],
    [
      new Set([3, 2, 1]),
      undefined,
      1,
    ],
    [
      new Set([3, 2, 1]),
      (item: number) => item,
      1,
    ],
    [
      new Set([3, 2, 1]),
      (item: number) => -item,
      3,
    ],
    [
      new Set([3, 2, 1]),
      undefined,
      1,
    ],
    [
      new Set([3, 2, 1]),
      (item: number) => item,
      1,
    ],
    [
      new Set([3, 2, 1]),
      (item: number) => -item,
      3,
    ],
    [
      new Set([2.1, 1]),
      undefined,
      1,
    ],
    [
      new Set([2.1, 1]),
      (item: number) => item,
      1,
    ],
    [
      new Set([2.1, 1]),
      (item: number) => -item,
      2.1,
    ],
    [
      new Set([2, 1.1]),
      undefined,
      1.1,
    ],
    [
      new Set([2, 1.1]),
      (item: number) => item,
      1.1,
    ],
    [
      new Set([2, 1.1]),
      (item: number) => -item,
      2,
    ],
    [
      new Set([2.2, 1.1]),
      undefined,
      1.1,
    ],
    [
      new Set([2.2, 1.1]),
      (item: number) => item,
      1.1,
    ],
    [
      new Set([2.2, 1.1]),
      (item: number) => -item,
      2.2,
    ],
    [
      new Set([1.1, 2.2]),
      undefined,
      1.1,
    ],
    [
      new Set([1.1, 2.2]),
      (item: number) => item,
      1.1,
    ],
    [
      new Set([1.1, 2.2]),
      (item: number) => -item,
      2.2,
    ],
    [
      new Set(['a', 'b', 'c']),
      undefined,
      'a',
    ],
    [
      new Set(['a', 'b', 'c']),
      (item: string) => item,
      'a',
    ],
    [
      new Set(['a', 'b', 'c']),
      (item: string) => -item.charCodeAt(0),
      'c',
    ],
    [
      new Set(['b', 'c', 'a']),
      undefined,
      'a',
    ],
    [
      new Set(['b', 'c', 'a']),
      (item: string) => item,
      'a',
    ],
    [
      new Set(['b', 'c', 'a']),
      (item: string) => -item.charCodeAt(0),
      'c',
    ],
    [
      new Set(['c', 'b', 'a']),
      undefined,
      'a',
    ],
    [
      new Set(['c', 'b', 'a']),
      (item: string) => item,
      'a',
    ],
    [
      new Set(['c', 'b', 'a']),
      (item: string) => -item.charCodeAt(0),
      'c',
    ],
    [
      new Set(['ab', 'ba', 'b']),
      undefined,
      'ab',
    ],
    [
      new Set(['ab', 'ba', 'b']),
      (item: string) => item,
      'ab',
    ],
    [
      new Set(['ba', 'b', 'ab']),
      undefined,
      'ab',
    ],
    [
      new Set(['ba', 'b', 'ab']),
      (item: string) => item,
      'ab',
    ],
    [
      new Set([[]]),
      undefined,
      [],
    ],
    [
      new Set([[]]),
      (item: Array<unknown>) => item,
      [],
    ],
    [
      new Set([[2]]),
      undefined,
      [2],
    ],
    [
      new Set([[2]]),
      (item: Array<unknown>) => item,
      [2],
    ],
    [
      new Set([[], []]),
      undefined,
      [],
    ],
    [
      new Set([[], []]),
      (item: Array<unknown>) => item,
      [],
    ],
    [
      new Set([[], [2]]),
      undefined,
      [],
    ],
    [
      new Set([[], [2]]),
      (item: Array<unknown>) => item,
      [],
    ],
    [
      new Set([[2], []]),
      undefined,
      [],
    ],
    [
      new Set([[2], []]),
      (item: Array<unknown>) => item,
      [],
    ],
    [
      new Set([[], [null]]),
      undefined,
      [],
    ],
    [
      new Set([[], [null]]),
      (item: Array<unknown>) => item,
      [],
    ],
    [
      new Set([[null], [null]]),
      undefined,
      [null],
    ],
    [
      new Set([[null], [null]]),
      (item: Array<unknown>) => item,
      [null],
    ],
    [
      new Set([[1, 2], [2]]),
      undefined,
      [1, 2],
    ],
    [
      new Set([[1, 2], [2]]),
      (item: Array<unknown>) => item,
      [1, 2],
    ],
    [
      new Set([[3, 2], [2]]),
      undefined,
      [2],
    ],
    [
      new Set([[3, 2], [2]]),
      (item: Array<unknown>) => item,
      [2],
    ],
    [
      new Set([[1, 2], [2, 1]]),
      undefined,
      [1, 2],
    ],
    [
      new Set([[1, 2], [2, 1]]),
      (item: Array<unknown>) => item,
      [1, 2],
    ],
    [
      new Set([[2, 1], [1, 2]]),
      undefined,
      [1, 2],
    ],
    [
      new Set([[2, 1], [1, 2]]),
      (item: Array<unknown>) => item,
      [1, 2],
    ],
    [
      new Set([['a'], ['b']]),
      undefined,
      ['a'],
    ],
    [
      new Set([['a'], ['b']]),
      (item: Array<unknown>) => item,
      ['a'],
    ],
    [
      new Set([['a', 'a'], ['b']]),
      undefined,
      ['a', 'a'],
    ],
    [
      new Set([['a', 'a'], ['b']]),
      (item: Array<unknown>) => item,
      ['a', 'a'],
    ],
    [
      new Set([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      undefined,
      [1, 2, 3],
    ],
    [
      new Set([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => item,
      [1, 2, 3],
    ],
    [
      new Set([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => item[1],
      [2, 0, 3],
    ],
    [
      new Set([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => -(item[1] as number),
      [1, 2, 3],
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
      (item: [number, number]) => item[1],
      undefined,
    ],
    [
      createMapFixture([]),
      (item: [number, number]) => -item[1],
      undefined,
    ],
    [
      createMapFixture([0]),
      undefined,
      [0, 0],
    ],
    [
      createMapFixture([0]),
      (item: [number, number]) => item[1],
      [0, 0],
    ],
    [
      createMapFixture([0]),
      (item: [number, number]) => -item[1],
      [0, 0],
    ],
    [
      createMapFixture([Infinity]),
      undefined,
      [0, Infinity],
    ],
    [
      createMapFixture([Infinity]),
      (item: [number, number]) => item[1],
      [0, Infinity],
    ],
    [
      createMapFixture([Infinity]),
      (item: [number, number]) => -item[1],
      [0, Infinity],
    ],
    [
      createMapFixture([-Infinity]),
      undefined,
      [0, -Infinity],
    ],
    [
      createMapFixture([-Infinity]),
      (item: [number, number]) => item[1],
      [0, -Infinity],
    ],
    [
      createMapFixture([-Infinity]),
      (item: [number, number]) => -item[1],
      [0, -Infinity],
    ],
    [
      createMapFixture([Infinity, -Infinity]),
      undefined,
      [0, Infinity],
    ],
    [
      createMapFixture([Infinity, -Infinity]),
      (item: [number, number]) => item[1],
      [1, -Infinity],
    ],
    [
      createMapFixture([Infinity, -Infinity]),
      (item: [number, number]) => -item[1],
      [0, Infinity],
    ],
    [
      createMapFixture([Infinity, -Infinity, 10, -1]),
      undefined,
      [0, Infinity],
    ],
    [
      createMapFixture([Infinity, -Infinity, 10, -1]),
      (item: [number, number]) => item[1],
      [1, -Infinity],
    ],
    [
      createMapFixture([Infinity, -Infinity, 10, -1]),
      (item: [number, number]) => -item[1],
      [0, Infinity],
    ],
    [
      createMapFixture([1, 2, 3]),
      undefined,
      [0, 1],
    ],
    [
      createMapFixture([1, 2, 3]),
      (item: [number, number]) => item[1],
      [0, 1],
    ],
    [
      createMapFixture([1, 2, 3]),
      (item: [number, number]) => -item[1],
      [2, 3],
    ],
    [
      createMapFixture([3, 2, 1]),
      undefined,
      [0, 3],
    ],
    [
      createMapFixture([3, 2, 1]),
      (item: [number, number]) => item[1],
      [2, 1],
    ],
    [
      createMapFixture([3, 2, 1]),
      (item: [number, number]) => -item[1],
      [0, 3],
    ],
    [
      createMapFixture([3, 2, 1]),
      undefined,
      [0, 3],
    ],
    [
      createMapFixture([3, 2, 1]),
      (item: [number, number]) => item[1],
      [2, 1],
    ],
    [
      createMapFixture([3, 2, 1]),
      (item: [number, number]) => -item[1],
      [0, 3],
    ],
    [
      createMapFixture([2.1, 1]),
      undefined,
      [0, 2.1],
    ],
    [
      createMapFixture([2.1, 1]),
      (item: [number, number]) => item[1],
      [1, 1],
    ],
    [
      createMapFixture([2.1, 1]),
      (item: [number, number]) => -item[1],
      [0, 2.1],
    ],
    [
      createMapFixture([2, 1.1]),
      undefined,
      [0, 2],
    ],
    [
      createMapFixture([2, 1.1]),
      (item: [number, number]) => item[1],
      [1, 1.1],
    ],
    [
      createMapFixture([2, 1.1]),
      (item: [number, number]) => -item[1],
      [0, 2],
    ],
    [
      createMapFixture([2.2, 1.1]),
      undefined,
      [0, 2.2],
    ],
    [
      createMapFixture([2.2, 1.1]),
      (item: [number, number]) => item[1],
      [1, 1.1],
    ],
    [
      createMapFixture([2.2, 1.1]),
      (item: [number, number]) => -item[1],
      [0, 2.2],
    ],
    [
      createMapFixture([1.1, 2.2]),
      undefined,
      [0, 1.1],
    ],
    [
      createMapFixture([1.1, 2.2]),
      (item: [number, number]) => item[1],
      [0, 1.1],
    ],
    [
      createMapFixture([1.1, 2.2]),
      (item: [number, number]) => -item[1],
      [1, 2.2],
    ],
    [
      createMapFixture(['a', 'b', 'c']),
      undefined,
      [0, 'a'],
    ],
    [
      createMapFixture(['a', 'b', 'c']),
      (item: [number, string]) => item[1],
      [0, 'a'],
    ],
    [
      createMapFixture(['a', 'b', 'c']),
      (item: [number, string]) => -item[1].charCodeAt(0),
      [2, 'c'],
    ],
    [
      createMapFixture(['b', 'c', 'a']),
      undefined,
      [0, 'b'],
    ],
    [
      createMapFixture(['b', 'c', 'a']),
      (item: [number, string]) => item[1],
      [2, 'a'],
    ],
    [
      createMapFixture(['b', 'c', 'a']),
      (item: [number, string]) => -item[1].charCodeAt(0),
      [1, 'c'],
    ],
    [
      createMapFixture(['c', 'b', 'a']),
      undefined,
      [0, 'c'],
    ],
    [
      createMapFixture(['c', 'b', 'a']),
      (item: [number, string]) => item[1],
      [2, 'a'],
    ],
    [
      createMapFixture(['c', 'b', 'a']),
      (item: [number, string]) => -item[1].charCodeAt(0),
      [0, 'c'],
    ],
    [
      createMapFixture(['ab', 'ba', 'b']),
      undefined,
      [0, 'ab'],
    ],
    [
      createMapFixture(['ab', 'ba', 'b']),
      (item: [number, string]) => item[1],
      [0, 'ab'],
    ],
    [
      createMapFixture(['ba', 'b', 'ab']),
      undefined,
      [0, 'ba'],
    ],
    [
      createMapFixture(['ba', 'b', 'ab']),
      (item: [number, string]) => item[1],
      [2, 'ab'],
    ],
    [
      createMapFixture( [[]]),
      undefined,
      [0, []],
    ],
    [
      createMapFixture([[]]),
      (item: [number, Array<number>]) => item[1],
      [0, []],
    ],
    [
      createMapFixture([[2]]),
      undefined,
      [0, [2]],
    ],
    [
      createMapFixture([[2]]),
      (item: [number, Array<number>]) => item[1],
      [0, [2]],
    ],
    [
      createMapFixture([[], []]),
      undefined,
      [0, []],
    ],
    [
      createMapFixture([[], []]),
      (item: [number, Array<number>]) => item[1],
      [0, []],
    ],
    [
      createMapFixture( [[], [2]]),
      undefined,
      [0, []],
    ],
    [
      createMapFixture( [[], [2]]),
      (item: [number, Array<number>]) => item[1],
      [0, []],
    ],
    [
      createMapFixture([[2], []]),
      undefined,
      [0, [2]],
    ],
    [
      createMapFixture([[2], []]),
      (item: [number, Array<number>]) => item[1],
      [1, []],
    ],
    [
      createMapFixture([[], [null]]),
      undefined,
      [0, []],
    ],
    [
      createMapFixture([[], [null]]),
      (item: [number, Array<number>]) => item[1],
      [0, []],
    ],
    [
      createMapFixture( [[null], [null]]),
      undefined,
      [0, [null]],
    ],
    [
      createMapFixture( [[null], [null]]),
      (item: [number, Array<number>]) => item[1],
      [0, [null]],
    ],
    [
      createMapFixture([[1, 2], [2]]),
      undefined,
      [0, [1, 2]],
    ],
    [
      createMapFixture([[1, 2], [2]]),
      (item: [number, Array<number>]) => item[1],
      [0, [1, 2]],
    ],
    [
      createMapFixture([[3, 2], [2]]),
      undefined,
      [0, [3, 2]],
    ],
    [
      createMapFixture( [[3, 2], [2]]),
      (item: [number, Array<number>]) => item[1],
      [1, [2]],
    ],
    [
      createMapFixture([[1, 2], [2, 1]]),
      undefined,
      [0, [1, 2]],
    ],
    [
      createMapFixture([[1, 2], [2, 1]]),
      (item: [number, Array<number>]) => item[1],
      [0, [1, 2]],
    ],
    [
      createMapFixture([[2, 1], [1, 2]]),
      undefined,
      [0, [2, 1]],
    ],
    [
      createMapFixture([[2, 1], [1, 2]]),
      (item: [number, Array<number>]) => item[1][1],
      [0, [2, 1]],
    ],
    [
      createMapFixture([['a'], ['b']]),
      undefined,
      [0, ['a']],
    ],
    [
      createMapFixture([['a'], ['b']]),
      (item: [number, Array<number>]) => item[1],
      [0, ['a']],
    ],
    [
      createMapFixture([['a', 'a'], ['b']]),
      undefined,
      [0, ['a', 'a']],
    ],
    [
      createMapFixture([['a', 'a'], ['b']]),
      (item: [number, Array<string>]) => item[1],
      [0, ['a', 'a']],
    ],
    [
      createMapFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      undefined,
      [0, [1, 2, 3]],
    ],
    [
      createMapFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: [number, Array<number>]) => item[1],
      [0, [1, 2, 3]],
    ],
    [
      createMapFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: [number, Array<number>]) => item[1][1],
      [1, [2, 0, 3]],
    ],
    [
      createMapFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: [number, Array<number>]) => -item[1][1],
      [0, [1, 2, 3]],
    ],
  ]
}
