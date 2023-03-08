// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture } from "../fixture";
import { reduce } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  // ...dataProviderForIterators(),
  // ...dataProviderForStrings(),
  // ...dataProviderForSets(),
  // ...dataProviderForMaps(),
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
