// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { reduce, Comparable } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
] as Array<[Iterable<unknown>|Iterator<unknown>, ((datum: unknown) => Comparable)|undefined, unknown]>)(
  "Reduce To Min Max Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    compareBy: ((datum: unknown) => Comparable)|undefined,
    expected: unknown
  ) => {
    it("", () => {
      // When
      const result = reduce.toMinMax(input, compareBy);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForUsingCustomComparator(),
] as Array<[Iterable<unknown>|Iterator<unknown>, ((datum: unknown) => Comparable)|undefined, unknown]>)(
  "Reduce To Min Max Using Custom Comparator Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    compareBy: ((datum: unknown) => Comparable)|undefined,
    expected: unknown
  ) => {
    it("", () => {
      // When
      const result = reduce.toMinMax(input, compareBy);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

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
      [
        {
          title: 'The Matrix Resurrections',
          rating: 2.6,
        },
        {
          title: 'The Matrix',
          rating: 4.7,
        },
      ]
    ],
  ];
}

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [],
      undefined,
      [undefined, undefined],
    ],
    [
      [],
      (item: number) => item,
      [undefined, undefined],
    ],
    [
      [],
      (item: number) => -item,
      [undefined, undefined],
    ],
    [
      [0],
      undefined,
      [0, 0],
    ],
    [
      [0],
      (item: number) => item,
      [0, 0],
    ],
    [
      [0],
      (item: number) => -item,
      [0, 0],
    ],
    [
      [Infinity],
      undefined,
      [Infinity, Infinity],
    ],
    [
      [Infinity],
      (item: number) => item,
      [Infinity, Infinity],
    ],
    [
      [Infinity],
      (item: number) => -item,
      [Infinity, Infinity],
    ],
    [
      [-Infinity],
      undefined,
      [-Infinity, -Infinity],
    ],
    [
      [-Infinity],
      (item: number) => item,
      [-Infinity, -Infinity],
    ],
    [
      [-Infinity],
      (item: number) => -item,
      [-Infinity, -Infinity],
    ],
    [
      [Infinity, -Infinity],
      undefined,
      [-Infinity, Infinity],
    ],
    [
      [Infinity, -Infinity],
      (item: number) => item,
      [-Infinity, Infinity],
    ],
    [
      [Infinity, -Infinity],
      (item: number) => -item,
      [Infinity, -Infinity],
    ],
    [
      [Infinity, -Infinity, 10, -1],
      undefined,
      [-Infinity, Infinity],
    ],
    [
      [Infinity, -Infinity, 10, -1],
      (item: number) => item,
      [-Infinity, Infinity],
    ],
    [
      [Infinity, -Infinity, 10, -1],
      (item: number) => -item,
      [Infinity, -Infinity],
    ],
    [
      [1, 2, 3],
      undefined,
      [1, 3],
    ],
    [
      [1, 2, 3],
      (item: number) => item,
      [1, 3],
    ],
    [
      [1, 2, 3],
      (item: number) => -item,
      [3, 1],
    ],
    [
      [3, 2, 1],
      undefined,
      [1, 3],
    ],
    [
      [3, 2, 1],
      (item: number) => item,
      [1, 3],
    ],
    [
      [3, 2, 1],
      (item: number) => -item,
      [3, 1],
    ],
    [
      [3, 2, 1],
      undefined,
      [1, 3],
    ],
    [
      [3, 2, 1],
      (item: number) => item,
      [1, 3],
    ],
    [
      [3, 2, 1],
      (item: number) => -item,
      [3, 1],
    ],
    [
      [2.1, 1],
      undefined,
      [1, 2.1],
    ],
    [
      [2.1, 1],
      (item: number) => item,
      [1, 2.1],
    ],
    [
      [2.1, 1],
      (item: number) => -item,
      [2.1, 1],
    ],
    [
      [2, 1.1],
      undefined,
      [1.1, 2],
    ],
    [
      [2, 1.1],
      (item: number) => item,
      [1.1, 2],
    ],
    [
      [2, 1.1],
      (item: number) => -item,
      [2, 1.1],
    ],
    [
      [2.2, 1.1],
      undefined,
      [1.1, 2.2],
    ],
    [
      [2.2, 1.1],
      (item: number) => item,
      [1.1, 2.2],
    ],
    [
      [2.2, 1.1],
      (item: number) => -item,
      [2.2, 1.1],
    ],
    [
      [1.1, 2.2],
      undefined,
      [1.1, 2.2],
    ],
    [
      [1.1, 2.2],
      (item: number) => item,
      [1.1, 2.2],
    ],
    [
      [1.1, 2.2],
      (item: number) => -item,
      [2.2, 1.1],
    ],
    [
      ['a', 'b', 'c'],
      undefined,
      ['a', 'c'],
    ],
    [
      ['a', 'b', 'c'],
      (item: string) => item,
      ['a', 'c'],
    ],
    [
      ['a', 'b', 'c'],
      (item: string) => -item.charCodeAt(0),
      ['c', 'a'],
    ],
    [
      ['b', 'c', 'a'],
      undefined,
      ['a', 'c'],
    ],
    [
      ['b', 'c', 'a'],
      (item: string) => item,
      ['a', 'c'],
    ],
    [
      ['b', 'c', 'a'],
      (item: string) => -item.charCodeAt(0),
      ['c', 'a'],
    ],
    [
      ['c', 'b', 'a'],
      undefined,
      ['a', 'c'],
    ],
    [
      ['c', 'b', 'a'],
      (item: string) => item,
      ['a', 'c'],
    ],
    [
      ['c', 'b', 'a'],
      (item: string) => -item.charCodeAt(0),
      ['c', 'a'],
    ],
    [
      ['ab', 'ba', 'b'],
      undefined,
      ['ab', 'ba'],
    ],
    [
      ['ab', 'ba', 'b'],
      (item: string) => item,
      ['ab', 'ba'],
    ],
    [
      ['ba', 'b', 'ab'],
      undefined,
      ['ab', 'ba'],
    ],
    [
      ['ba', 'b', 'ab'],
      (item: string) => item,
      ['ab', 'ba'],
    ],
    [
      [[]],
      undefined,
      [[], []],
    ],
    [
      [[]],
      (item: Array<unknown>) => item,
      [[], []],
    ],
    [
      [[2]],
      undefined,
      [[2], [2]],
    ],
    [
      [[2]],
      (item: Array<unknown>) => item,
      [[2], [2]],
    ],
    [
      [[], []],
      undefined,
      [[], []],
    ],
    [
      [[], []],
      (item: Array<unknown>) => item,
      [[], []],
    ],
    [
      [[], [2]],
      undefined,
      [[], [2]],
    ],
    [
      [[], [2]],
      (item: Array<unknown>) => item,
      [[], [2]],
    ],
    [
      [[2], []],
      undefined,
      [[], [2]],
    ],
    [
      [[2], []],
      (item: Array<unknown>) => item,
      [[], [2]],
    ],
    [
      [[null], [null]],
      undefined,
      [[null], [null]],
    ],
    [
      [[null], [null]],
      (item: Array<unknown>) => item,
      [[null], [null]],
    ],
    [
      [[1, 2], [2]],
      undefined,
      [[1, 2], [2]],
    ],
    [
      [[1, 2], [2]],
      (item: Array<unknown>) => item,
      [[1, 2], [2]],
    ],
    [
      [[3, 2], [2]],
      undefined,
      [[2], [3, 2]],
    ],
    [
      [[3, 2], [2]],
      (item: Array<unknown>) => item,
      [[2], [3, 2]],
    ],
    [
      [[1, 2], [2, 1]],
      undefined,
      [[1, 2], [2, 1]],
    ],
    [
      [[1, 2], [2, 1]],
      (item: Array<unknown>) => item,
      [[1, 2], [2, 1]],
    ],
    [
      [[2, 1], [1, 2]],
      undefined,
      [[1, 2], [2, 1]],
    ],
    [
      [[2, 1], [1, 2]],
      (item: Array<unknown>) => item,
      [[1, 2], [2, 1]],
    ],
    [
      [['a'], ['b']],
      undefined,
      [['a'], ['b']],
    ],
    [
      [['a'], ['b']],
      (item: Array<unknown>) => item,
      [['a'], ['b']],
    ],
    [
      [['a', 'a'], ['b']],
      undefined,
      [['a', 'a'], ['b']],
    ],
    [
      [['a', 'a'], ['b']],
      (item: Array<unknown>) => item,
      [['a', 'a'], ['b']],
    ],
    [
      [[1, 2, 3], [2, 0, 3], [2, 1, 3]],
      undefined,
      [[1, 2, 3], [2, 1, 3]],
    ],
    [
      [[1, 2, 3], [2, 0, 3], [2, 1, 3]],
      (item: Array<unknown>) => item,
      [[1, 2, 3], [2, 1, 3]],
    ],
    [
      [[1, 2, 3], [2, 0, 3], [2, 1, 3]],
      (item: Array<unknown>) => item[1],
      [[2, 0, 3], [1, 2, 3]],
    ],
    [
      [[1, 2, 3], [2, 0, 3], [2, 1, 3]],
      (item: Array<unknown>) => -(item[1] as number),
      [[1, 2, 3], [2, 0, 3]],
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      undefined,
      [undefined, undefined],
    ],
    [
      createGeneratorFixture([]),
      (item: number) => item,
      [undefined, undefined],
    ],
    [
      createGeneratorFixture([]),
      (item: number) => -item,
      [undefined, undefined],
    ],
    [
      createGeneratorFixture([0]),
      undefined,
      [0, 0],
    ],
    [
      createGeneratorFixture([0]),
      (item: number) => item,
      [0, 0],
    ],
    [
      createGeneratorFixture([0]),
      (item: number) => -item,
      [0, 0],
    ],
    [
      createGeneratorFixture([Infinity]),
      undefined,
      [Infinity, Infinity],
    ],
    [
      createGeneratorFixture([Infinity]),
      (item: number) => item,
      [Infinity, Infinity],
    ],
    [
      createGeneratorFixture([Infinity]),
      (item: number) => -item,
      [Infinity, Infinity],
    ],
    [
      createGeneratorFixture([-Infinity]),
      undefined,
      [-Infinity, -Infinity],
    ],
    [
      createGeneratorFixture([-Infinity]),
      (item: number) => item,
      [-Infinity, -Infinity],
    ],
    [
      createGeneratorFixture([-Infinity]),
      (item: number) => -item,
      [-Infinity, -Infinity],
    ],
    [
      createGeneratorFixture([Infinity, -Infinity]),
      undefined,
      [-Infinity, Infinity],
    ],
    [
      createGeneratorFixture([Infinity, -Infinity]),
      (item: number) => item,
      [-Infinity, Infinity],
    ],
    [
      createGeneratorFixture([Infinity, -Infinity]),
      (item: number) => -item,
      [Infinity, -Infinity],
    ],
    [
      createGeneratorFixture([Infinity, -Infinity, 10, -1]),
      undefined,
      [-Infinity, Infinity],
    ],
    [
      createGeneratorFixture([Infinity, -Infinity, 10, -1]),
      (item: number) => item,
      [-Infinity, Infinity],
    ],
    [
      createGeneratorFixture([Infinity, -Infinity, 10, -1]),
      (item: number) => -item,
      [Infinity, -Infinity],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      undefined,
      [1, 3],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (item: number) => item,
      [1, 3],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (item: number) => -item,
      [3, 1],
    ],
    [
      createGeneratorFixture([3, 2, 1]),
      undefined,
      [1, 3],
    ],
    [
      createGeneratorFixture([3, 2, 1]),
      (item: number) => item,
      [1, 3],
    ],
    [
      createGeneratorFixture([3, 2, 1]),
      (item: number) => -item,
      [3, 1],
    ],
    [
      createGeneratorFixture([3, 2, 1]),
      undefined,
      [1, 3],
    ],
    [
      createGeneratorFixture([3, 2, 1]),
      (item: number) => item,
      [1, 3],
    ],
    [
      createGeneratorFixture([3, 2, 1]),
      (item: number) => -item,
      [3, 1],
    ],
    [
      createGeneratorFixture([2.1, 1]),
      undefined,
      [1, 2.1],
    ],
    [
      createGeneratorFixture([2.1, 1]),
      (item: number) => item,
      [1, 2.1],
    ],
    [
      createGeneratorFixture([2.1, 1]),
      (item: number) => -item,
      [2.1, 1],
    ],
    [
      createGeneratorFixture([2, 1.1]),
      undefined,
      [1.1, 2],
    ],
    [
      createGeneratorFixture([2, 1.1]),
      (item: number) => item,
      [1.1, 2],
    ],
    [
      createGeneratorFixture([2, 1.1]),
      (item: number) => -item,
      [2, 1.1],
    ],
    [
      createGeneratorFixture([2.2, 1.1]),
      undefined,
      [1.1, 2.2],
    ],
    [
      createGeneratorFixture([2.2, 1.1]),
      (item: number) => item,
      [1.1, 2.2],
    ],
    [
      createGeneratorFixture([2.2, 1.1]),
      (item: number) => -item,
      [2.2, 1.1],
    ],
    [
      createGeneratorFixture([1.1, 2.2]),
      undefined,
      [1.1, 2.2],
    ],
    [
      createGeneratorFixture([1.1, 2.2]),
      (item: number) => item,
      [1.1, 2.2],
    ],
    [
      createGeneratorFixture([1.1, 2.2]),
      (item: number) => -item,
      [2.2, 1.1],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c']),
      undefined,
      ['a', 'c'],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c']),
      (item: string) => item,
      ['a', 'c'],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c']),
      (item: string) => -item.charCodeAt(0),
      ['c', 'a'],
    ],
    [
      createGeneratorFixture(['b', 'c', 'a']),
      undefined,
      ['a', 'c'],
    ],
    [
      createGeneratorFixture(['b', 'c', 'a']),
      (item: string) => item,
      ['a', 'c'],
    ],
    [
      createGeneratorFixture(['b', 'c', 'a']),
      (item: string) => -item.charCodeAt(0),
      ['c', 'a'],
    ],
    [
      createGeneratorFixture(['c', 'b', 'a']),
      undefined,
      ['a', 'c'],
    ],
    [
      createGeneratorFixture(['c', 'b', 'a']),
      (item: string) => item,
      ['a', 'c'],
    ],
    [
      createGeneratorFixture(['c', 'b', 'a']),
      (item: string) => -item.charCodeAt(0),
      ['c', 'a'],
    ],
    [
      createGeneratorFixture(['ab', 'ba', 'b']),
      undefined,
      ['ab', 'ba'],
    ],
    [
      createGeneratorFixture(['ab', 'ba', 'b']),
      (item: string) => item,
      ['ab', 'ba'],
    ],
    [
      createGeneratorFixture(['ba', 'b', 'ab']),
      undefined,
      ['ab', 'ba'],
    ],
    [
      createGeneratorFixture(['ba', 'b', 'ab']),
      (item: string) => item,
      ['ab', 'ba'],
    ],
    [
      createGeneratorFixture([[]]),
      undefined,
      [[], []],
    ],
    [
      createGeneratorFixture([[]]),
      (item: Array<unknown>) => item,
      [[], []],
    ],
    [
      createGeneratorFixture([[2]]),
      undefined,
      [[2], [2]],
    ],
    [
      createGeneratorFixture([[2]]),
      (item: Array<unknown>) => item,
      [[2], [2]],
    ],
    [
      createGeneratorFixture([[], []]),
      undefined,
      [[], []],
    ],
    [
      createGeneratorFixture([[], []]),
      (item: Array<unknown>) => item,
      [[], []],
    ],
    [
      createGeneratorFixture([[], [2]]),
      undefined,
      [[], [2]],
    ],
    [
      createGeneratorFixture([[], [2]]),
      (item: Array<unknown>) => item,
      [[], [2]],
    ],
    [
      createGeneratorFixture([[2], []]),
      undefined,
      [[], [2]],
    ],
    [
      createGeneratorFixture([[2], []]),
      (item: Array<unknown>) => item,
      [[], [2]],
    ],
    [
      createGeneratorFixture([[null], [null]]),
      undefined,
      [[null], [null]],
    ],
    [
      createGeneratorFixture([[null], [null]]),
      (item: Array<unknown>) => item,
      [[null], [null]],
    ],
    [
      createGeneratorFixture([[1, 2], [2]]),
      undefined,
      [[1, 2], [2]],
    ],
    [
      createGeneratorFixture([[1, 2], [2]]),
      (item: Array<unknown>) => item,
      [[1, 2], [2]],
    ],
    [
      createGeneratorFixture([[3, 2], [2]]),
      undefined,
      [[2], [3, 2]],
    ],
    [
      createGeneratorFixture([[3, 2], [2]]),
      (item: Array<unknown>) => item,
      [[2], [3, 2]],
    ],
    [
      createGeneratorFixture([[1, 2], [2, 1]]),
      undefined,
      [[1, 2], [2, 1]],
    ],
    [
      createGeneratorFixture([[1, 2], [2, 1]]),
      (item: Array<unknown>) => item,
      [[1, 2], [2, 1]],
    ],
    [
      createGeneratorFixture([[2, 1], [1, 2]]),
      undefined,
      [[1, 2], [2, 1]],
    ],
    [
      createGeneratorFixture([[2, 1], [1, 2]]),
      (item: Array<unknown>) => item,
      [[1, 2], [2, 1]],
    ],
    [
      createGeneratorFixture([['a'], ['b']]),
      undefined,
      [['a'], ['b']],
    ],
    [
      createGeneratorFixture([['a'], ['b']]),
      (item: Array<unknown>) => item,
      [['a'], ['b']],
    ],
    [
      createGeneratorFixture([['a', 'a'], ['b']]),
      undefined,
      [['a', 'a'], ['b']],
    ],
    [
      createGeneratorFixture([['a', 'a'], ['b']]),
      (item: Array<unknown>) => item,
      [['a', 'a'], ['b']],
    ],
    [
      createGeneratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      undefined,
      [[1, 2, 3], [2, 1, 3]],
    ],
    [
      createGeneratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => item,
      [[1, 2, 3], [2, 1, 3]],
    ],
    [
      createGeneratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => item[1],
      [[2, 0, 3], [1, 2, 3]],
    ],
    [
      createGeneratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => -(item[1] as number),
      [[1, 2, 3], [2, 0, 3]],
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      undefined,
      [undefined, undefined],
    ],
    [
      createIterableFixture([]),
      (item: number) => item,
      [undefined, undefined],
    ],
    [
      createIterableFixture([]),
      (item: number) => -item,
      [undefined, undefined],
    ],
    [
      createIterableFixture([0]),
      undefined,
      [0, 0],
    ],
    [
      createIterableFixture([0]),
      (item: number) => item,
      [0, 0],
    ],
    [
      createIterableFixture([0]),
      (item: number) => -item,
      [0, 0],
    ],
    [
      createIterableFixture([Infinity]),
      undefined,
      [Infinity, Infinity],
    ],
    [
      createIterableFixture([Infinity]),
      (item: number) => item,
      [Infinity, Infinity],
    ],
    [
      createIterableFixture([Infinity]),
      (item: number) => -item,
      [Infinity, Infinity],
    ],
    [
      createIterableFixture([-Infinity]),
      undefined,
      [-Infinity, -Infinity],
    ],
    [
      createIterableFixture([-Infinity]),
      (item: number) => item,
      [-Infinity, -Infinity],
    ],
    [
      createIterableFixture([-Infinity]),
      (item: number) => -item,
      [-Infinity, -Infinity],
    ],
    [
      createIterableFixture([Infinity, -Infinity]),
      undefined,
      [-Infinity, Infinity],
    ],
    [
      createIterableFixture([Infinity, -Infinity]),
      (item: number) => item,
      [-Infinity, Infinity],
    ],
    [
      createIterableFixture([Infinity, -Infinity]),
      (item: number) => -item,
      [Infinity, -Infinity],
    ],
    [
      createIterableFixture([Infinity, -Infinity, 10, -1]),
      undefined,
      [-Infinity, Infinity],
    ],
    [
      createIterableFixture([Infinity, -Infinity, 10, -1]),
      (item: number) => item,
      [-Infinity, Infinity],
    ],
    [
      createIterableFixture([Infinity, -Infinity, 10, -1]),
      (item: number) => -item,
      [Infinity, -Infinity],
    ],
    [
      createIterableFixture([1, 2, 3]),
      undefined,
      [1, 3],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (item: number) => item,
      [1, 3],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (item: number) => -item,
      [3, 1],
    ],
    [
      createIterableFixture([3, 2, 1]),
      undefined,
      [1, 3],
    ],
    [
      createIterableFixture([3, 2, 1]),
      (item: number) => item,
      [1, 3],
    ],
    [
      createIterableFixture([3, 2, 1]),
      (item: number) => -item,
      [3, 1],
    ],
    [
      createIterableFixture([3, 2, 1]),
      undefined,
      [1, 3],
    ],
    [
      createIterableFixture([3, 2, 1]),
      (item: number) => item,
      [1, 3],
    ],
    [
      createIterableFixture([3, 2, 1]),
      (item: number) => -item,
      [3, 1],
    ],
    [
      createIterableFixture([2.1, 1]),
      undefined,
      [1, 2.1],
    ],
    [
      createIterableFixture([2.1, 1]),
      (item: number) => item,
      [1, 2.1],
    ],
    [
      createIterableFixture([2.1, 1]),
      (item: number) => -item,
      [2.1, 1],
    ],
    [
      createIterableFixture([2, 1.1]),
      undefined,
      [1.1, 2],
    ],
    [
      createIterableFixture([2, 1.1]),
      (item: number) => item,
      [1.1, 2],
    ],
    [
      createIterableFixture([2, 1.1]),
      (item: number) => -item,
      [2, 1.1],
    ],
    [
      createIterableFixture([2.2, 1.1]),
      undefined,
      [1.1, 2.2],
    ],
    [
      createIterableFixture([2.2, 1.1]),
      (item: number) => item,
      [1.1, 2.2],
    ],
    [
      createIterableFixture([2.2, 1.1]),
      (item: number) => -item,
      [2.2, 1.1],
    ],
    [
      createIterableFixture([1.1, 2.2]),
      undefined,
      [1.1, 2.2],
    ],
    [
      createIterableFixture([1.1, 2.2]),
      (item: number) => item,
      [1.1, 2.2],
    ],
    [
      createIterableFixture([1.1, 2.2]),
      (item: number) => -item,
      [2.2, 1.1],
    ],
    [
      createIterableFixture(['a', 'b', 'c']),
      undefined,
      ['a', 'c'],
    ],
    [
      createIterableFixture(['a', 'b', 'c']),
      (item: string) => item,
      ['a', 'c'],
    ],
    [
      createIterableFixture(['a', 'b', 'c']),
      (item: string) => -item.charCodeAt(0),
      ['c', 'a'],
    ],
    [
      createIterableFixture(['b', 'c', 'a']),
      undefined,
      ['a', 'c'],
    ],
    [
      createIterableFixture(['b', 'c', 'a']),
      (item: string) => item,
      ['a', 'c'],
    ],
    [
      createIterableFixture(['b', 'c', 'a']),
      (item: string) => -item.charCodeAt(0),
      ['c', 'a'],
    ],
    [
      createIterableFixture(['c', 'b', 'a']),
      undefined,
      ['a', 'c'],
    ],
    [
      createIterableFixture(['c', 'b', 'a']),
      (item: string) => item,
      ['a', 'c'],
    ],
    [
      createIterableFixture(['c', 'b', 'a']),
      (item: string) => -item.charCodeAt(0),
      ['c', 'a'],
    ],
    [
      createIterableFixture(['ab', 'ba', 'b']),
      undefined,
      ['ab', 'ba'],
    ],
    [
      createIterableFixture(['ab', 'ba', 'b']),
      (item: string) => item,
      ['ab', 'ba'],
    ],
    [
      createIterableFixture(['ba', 'b', 'ab']),
      undefined,
      ['ab', 'ba'],
    ],
    [
      createIterableFixture(['ba', 'b', 'ab']),
      (item: string) => item,
      ['ab', 'ba'],
    ],
    [
      createIterableFixture([[]]),
      undefined,
      [[], []],
    ],
    [
      createIterableFixture([[]]),
      (item: Array<unknown>) => item,
      [[], []],
    ],
    [
      createIterableFixture([[2]]),
      undefined,
      [[2], [2]],
    ],
    [
      createIterableFixture([[2]]),
      (item: Array<unknown>) => item,
      [[2], [2]],
    ],
    [
      createIterableFixture([[], []]),
      undefined,
      [[], []],
    ],
    [
      createIterableFixture([[], []]),
      (item: Array<unknown>) => item,
      [[], []],
    ],
    [
      createIterableFixture([[], [2]]),
      undefined,
      [[], [2]],
    ],
    [
      createIterableFixture([[], [2]]),
      (item: Array<unknown>) => item,
      [[], [2]],
    ],
    [
      createIterableFixture([[2], []]),
      undefined,
      [[], [2]],
    ],
    [
      createIterableFixture([[2], []]),
      (item: Array<unknown>) => item,
      [[], [2]],
    ],
    [
      createIterableFixture([[null], [null]]),
      undefined,
      [[null], [null]],
    ],
    [
      createIterableFixture([[null], [null]]),
      (item: Array<unknown>) => item,
      [[null], [null]],
    ],
    [
      createIterableFixture([[1, 2], [2]]),
      undefined,
      [[1, 2], [2]],
    ],
    [
      createIterableFixture([[1, 2], [2]]),
      (item: Array<unknown>) => item,
      [[1, 2], [2]],
    ],
    [
      createIterableFixture([[3, 2], [2]]),
      undefined,
      [[2], [3, 2]],
    ],
    [
      createIterableFixture([[3, 2], [2]]),
      (item: Array<unknown>) => item,
      [[2], [3, 2]],
    ],
    [
      createIterableFixture([[1, 2], [2, 1]]),
      undefined,
      [[1, 2], [2, 1]],
    ],
    [
      createIterableFixture([[1, 2], [2, 1]]),
      (item: Array<unknown>) => item,
      [[1, 2], [2, 1]],
    ],
    [
      createIterableFixture([[2, 1], [1, 2]]),
      undefined,
      [[1, 2], [2, 1]],
    ],
    [
      createIterableFixture([[2, 1], [1, 2]]),
      (item: Array<unknown>) => item,
      [[1, 2], [2, 1]],
    ],
    [
      createIterableFixture([['a'], ['b']]),
      undefined,
      [['a'], ['b']],
    ],
    [
      createIterableFixture([['a'], ['b']]),
      (item: Array<unknown>) => item,
      [['a'], ['b']],
    ],
    [
      createIterableFixture([['a', 'a'], ['b']]),
      undefined,
      [['a', 'a'], ['b']],
    ],
    [
      createIterableFixture([['a', 'a'], ['b']]),
      (item: Array<unknown>) => item,
      [['a', 'a'], ['b']],
    ],
    [
      createIterableFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      undefined,
      [[1, 2, 3], [2, 1, 3]],
    ],
    [
      createIterableFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => item,
      [[1, 2, 3], [2, 1, 3]],
    ],
    [
      createIterableFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => item[1],
      [[2, 0, 3], [1, 2, 3]],
    ],
    [
      createIterableFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => -(item[1] as number),
      [[1, 2, 3], [2, 0, 3]],
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      undefined,
      [undefined, undefined],
    ],
    [
      createIteratorFixture([]),
      (item: number) => item,
      [undefined, undefined],
    ],
    [
      createIteratorFixture([]),
      (item: number) => -item,
      [undefined, undefined],
    ],
    [
      createIteratorFixture([0]),
      undefined,
      [0, 0],
    ],
    [
      createIteratorFixture([0]),
      (item: number) => item,
      [0, 0],
    ],
    [
      createIteratorFixture([0]),
      (item: number) => -item,
      [0, 0],
    ],
    [
      createIteratorFixture([Infinity]),
      undefined,
      [Infinity, Infinity],
    ],
    [
      createIteratorFixture([Infinity]),
      (item: number) => item,
      [Infinity, Infinity],
    ],
    [
      createIteratorFixture([Infinity]),
      (item: number) => -item,
      [Infinity, Infinity],
    ],
    [
      createIteratorFixture([-Infinity]),
      undefined,
      [-Infinity, -Infinity],
    ],
    [
      createIteratorFixture([-Infinity]),
      (item: number) => item,
      [-Infinity, -Infinity],
    ],
    [
      createIteratorFixture([-Infinity]),
      (item: number) => -item,
      [-Infinity, -Infinity],
    ],
    [
      createIteratorFixture([Infinity, -Infinity]),
      undefined,
      [-Infinity, Infinity],
    ],
    [
      createIteratorFixture([Infinity, -Infinity]),
      (item: number) => item,
      [-Infinity, Infinity],
    ],
    [
      createIteratorFixture([Infinity, -Infinity]),
      (item: number) => -item,
      [Infinity, -Infinity],
    ],
    [
      createIteratorFixture([Infinity, -Infinity, 10, -1]),
      undefined,
      [-Infinity, Infinity],
    ],
    [
      createIteratorFixture([Infinity, -Infinity, 10, -1]),
      (item: number) => item,
      [-Infinity, Infinity],
    ],
    [
      createIteratorFixture([Infinity, -Infinity, 10, -1]),
      (item: number) => -item,
      [Infinity, -Infinity],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      undefined,
      [1, 3],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (item: number) => item,
      [1, 3],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (item: number) => -item,
      [3, 1],
    ],
    [
      createIteratorFixture([3, 2, 1]),
      undefined,
      [1, 3],
    ],
    [
      createIteratorFixture([3, 2, 1]),
      (item: number) => item,
      [1, 3],
    ],
    [
      createIteratorFixture([3, 2, 1]),
      (item: number) => -item,
      [3, 1],
    ],
    [
      createIteratorFixture([3, 2, 1]),
      undefined,
      [1, 3],
    ],
    [
      createIteratorFixture([3, 2, 1]),
      (item: number) => item,
      [1, 3],
    ],
    [
      createIteratorFixture([3, 2, 1]),
      (item: number) => -item,
      [3, 1],
    ],
    [
      createIteratorFixture([2.1, 1]),
      undefined,
      [1, 2.1],
    ],
    [
      createIteratorFixture([2.1, 1]),
      (item: number) => item,
      [1, 2.1],
    ],
    [
      createIteratorFixture([2.1, 1]),
      (item: number) => -item,
      [2.1, 1],
    ],
    [
      createIteratorFixture([2, 1.1]),
      undefined,
      [1.1, 2],
    ],
    [
      createIteratorFixture([2, 1.1]),
      (item: number) => item,
      [1.1, 2],
    ],
    [
      createIteratorFixture([2, 1.1]),
      (item: number) => -item,
      [2, 1.1],
    ],
    [
      createIteratorFixture([2.2, 1.1]),
      undefined,
      [1.1, 2.2],
    ],
    [
      createIteratorFixture([2.2, 1.1]),
      (item: number) => item,
      [1.1, 2.2],
    ],
    [
      createIteratorFixture([2.2, 1.1]),
      (item: number) => -item,
      [2.2, 1.1],
    ],
    [
      createIteratorFixture([1.1, 2.2]),
      undefined,
      [1.1, 2.2],
    ],
    [
      createIteratorFixture([1.1, 2.2]),
      (item: number) => item,
      [1.1, 2.2],
    ],
    [
      createIteratorFixture([1.1, 2.2]),
      (item: number) => -item,
      [2.2, 1.1],
    ],
    [
      createIteratorFixture(['a', 'b', 'c']),
      undefined,
      ['a', 'c'],
    ],
    [
      createIteratorFixture(['a', 'b', 'c']),
      (item: string) => item,
      ['a', 'c'],
    ],
    [
      createIteratorFixture(['a', 'b', 'c']),
      (item: string) => -item.charCodeAt(0),
      ['c', 'a'],
    ],
    [
      createIteratorFixture(['b', 'c', 'a']),
      undefined,
      ['a', 'c'],
    ],
    [
      createIteratorFixture(['b', 'c', 'a']),
      (item: string) => item,
      ['a', 'c'],
    ],
    [
      createIteratorFixture(['b', 'c', 'a']),
      (item: string) => -item.charCodeAt(0),
      ['c', 'a'],
    ],
    [
      createIteratorFixture(['c', 'b', 'a']),
      undefined,
      ['a', 'c'],
    ],
    [
      createIteratorFixture(['c', 'b', 'a']),
      (item: string) => item,
      ['a', 'c'],
    ],
    [
      createIteratorFixture(['c', 'b', 'a']),
      (item: string) => -item.charCodeAt(0),
      ['c', 'a'],
    ],
    [
      createIteratorFixture(['ab', 'ba', 'b']),
      undefined,
      ['ab', 'ba'],
    ],
    [
      createIteratorFixture(['ab', 'ba', 'b']),
      (item: string) => item,
      ['ab', 'ba'],
    ],
    [
      createIteratorFixture(['ba', 'b', 'ab']),
      undefined,
      ['ab', 'ba'],
    ],
    [
      createIteratorFixture(['ba', 'b', 'ab']),
      (item: string) => item,
      ['ab', 'ba'],
    ],
    [
      createIteratorFixture([[]]),
      undefined,
      [[], []],
    ],
    [
      createIteratorFixture([[]]),
      (item: Array<unknown>) => item,
      [[], []],
    ],
    [
      createIteratorFixture([[2]]),
      undefined,
      [[2], [2]],
    ],
    [
      createIteratorFixture([[2]]),
      (item: Array<unknown>) => item,
      [[2], [2]],
    ],
    [
      createIteratorFixture([[], []]),
      undefined,
      [[], []],
    ],
    [
      createIteratorFixture([[], []]),
      (item: Array<unknown>) => item,
      [[], []],
    ],
    [
      createIteratorFixture([[], [2]]),
      undefined,
      [[], [2]],
    ],
    [
      createIteratorFixture([[], [2]]),
      (item: Array<unknown>) => item,
      [[], [2]],
    ],
    [
      createIteratorFixture([[2], []]),
      undefined,
      [[], [2]],
    ],
    [
      createIteratorFixture([[2], []]),
      (item: Array<unknown>) => item,
      [[], [2]],
    ],
    [
      createIteratorFixture([[null], [null]]),
      undefined,
      [[null], [null]],
    ],
    [
      createIteratorFixture([[null], [null]]),
      (item: Array<unknown>) => item,
      [[null], [null]],
    ],
    [
      createIteratorFixture([[1, 2], [2]]),
      undefined,
      [[1, 2], [2]],
    ],
    [
      createIteratorFixture([[1, 2], [2]]),
      (item: Array<unknown>) => item,
      [[1, 2], [2]],
    ],
    [
      createIteratorFixture([[3, 2], [2]]),
      undefined,
      [[2], [3, 2]],
    ],
    [
      createIteratorFixture([[3, 2], [2]]),
      (item: Array<unknown>) => item,
      [[2], [3, 2]],
    ],
    [
      createIteratorFixture([[1, 2], [2, 1]]),
      undefined,
      [[1, 2], [2, 1]],
    ],
    [
      createIteratorFixture([[1, 2], [2, 1]]),
      (item: Array<unknown>) => item,
      [[1, 2], [2, 1]],
    ],
    [
      createIteratorFixture([[2, 1], [1, 2]]),
      undefined,
      [[1, 2], [2, 1]],
    ],
    [
      createIteratorFixture([[2, 1], [1, 2]]),
      (item: Array<unknown>) => item,
      [[1, 2], [2, 1]],
    ],
    [
      createIteratorFixture([['a'], ['b']]),
      undefined,
      [['a'], ['b']],
    ],
    [
      createIteratorFixture([['a'], ['b']]),
      (item: Array<unknown>) => item,
      [['a'], ['b']],
    ],
    [
      createIteratorFixture([['a', 'a'], ['b']]),
      undefined,
      [['a', 'a'], ['b']],
    ],
    [
      createIteratorFixture([['a', 'a'], ['b']]),
      (item: Array<unknown>) => item,
      [['a', 'a'], ['b']],
    ],
    [
      createIteratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      undefined,
      [[1, 2, 3], [2, 1, 3]],
    ],
    [
      createIteratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => item,
      [[1, 2, 3], [2, 1, 3]],
    ],
    [
      createIteratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => item[1],
      [[2, 0, 3], [1, 2, 3]],
    ],
    [
      createIteratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => -(item[1] as number),
      [[1, 2, 3], [2, 0, 3]],
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      undefined,
      [undefined, undefined],
    ],
    [
      'abc',
      undefined,
      ['a', 'c'],
    ],
    [
      'bca',
      undefined,
      ['a', 'c'],
    ],
    [
      'cba',
      undefined,
      ['a', 'c'],
    ],
    [
      'abc',
      (item: unknown) => -(item as string).charCodeAt(0),
      ['c', 'a'],
    ],
  ]
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([]),
      undefined,
      [undefined, undefined],
    ],
    [
      new Set([]),
      (item: number) => item,
      [undefined, undefined],
    ],
    [
      new Set([]),
      (item: number) => -item,
      [undefined, undefined],
    ],
    [
      new Set([0]),
      undefined,
      [0, 0],
    ],
    [
      new Set([0]),
      (item: number) => item,
      [0, 0],
    ],
    [
      new Set([0]),
      (item: number) => -item,
      [0, 0],
    ],
    [
      new Set([Infinity]),
      undefined,
      [Infinity, Infinity],
    ],
    [
      new Set([Infinity]),
      (item: number) => item,
      [Infinity, Infinity],
    ],
    [
      new Set([Infinity]),
      (item: number) => -item,
      [Infinity, Infinity],
    ],
    [
      new Set([-Infinity]),
      undefined,
      [-Infinity, -Infinity],
    ],
    [
      new Set([-Infinity]),
      (item: number) => item,
      [-Infinity, -Infinity],
    ],
    [
      new Set([-Infinity]),
      (item: number) => -item,
      [-Infinity, -Infinity],
    ],
    [
      new Set([Infinity, -Infinity]),
      undefined,
      [-Infinity, Infinity],
    ],
    [
      new Set([Infinity, -Infinity]),
      (item: number) => item,
      [-Infinity, Infinity],
    ],
    [
      new Set([Infinity, -Infinity]),
      (item: number) => -item,
      [Infinity, -Infinity],
    ],
    [
      new Set([Infinity, -Infinity, 10, -1]),
      undefined,
      [-Infinity, Infinity],
    ],
    [
      new Set([Infinity, -Infinity, 10, -1]),
      (item: number) => item,
      [-Infinity, Infinity],
    ],
    [
      new Set([Infinity, -Infinity, 10, -1]),
      (item: number) => -item,
      [Infinity, -Infinity],
    ],
    [
      new Set([1, 2, 3]),
      undefined,
      [1, 3],
    ],
    [
      new Set([1, 2, 3]),
      (item: number) => item,
      [1, 3],
    ],
    [
      new Set([1, 2, 3]),
      (item: number) => -item,
      [3, 1],
    ],
    [
      new Set([3, 2, 1]),
      undefined,
      [1, 3],
    ],
    [
      new Set([3, 2, 1]),
      (item: number) => item,
      [1, 3],
    ],
    [
      new Set([3, 2, 1]),
      (item: number) => -item,
      [3, 1],
    ],
    [
      new Set([3, 2, 1]),
      undefined,
      [1, 3],
    ],
    [
      new Set([3, 2, 1]),
      (item: number) => item,
      [1, 3],
    ],
    [
      new Set([3, 2, 1]),
      (item: number) => -item,
      [3, 1],
    ],
    [
      new Set([2.1, 1]),
      undefined,
      [1, 2.1],
    ],
    [
      new Set([2.1, 1]),
      (item: number) => item,
      [1, 2.1],
    ],
    [
      new Set([2.1, 1]),
      (item: number) => -item,
      [2.1, 1],
    ],
    [
      new Set([2, 1.1]),
      undefined,
      [1.1, 2],
    ],
    [
      new Set([2, 1.1]),
      (item: number) => item,
      [1.1, 2],
    ],
    [
      new Set([2, 1.1]),
      (item: number) => -item,
      [2, 1.1],
    ],
    [
      new Set([2.2, 1.1]),
      undefined,
      [1.1, 2.2],
    ],
    [
      new Set([2.2, 1.1]),
      (item: number) => item,
      [1.1, 2.2],
    ],
    [
      new Set([2.2, 1.1]),
      (item: number) => -item,
      [2.2, 1.1],
    ],
    [
      new Set([1.1, 2.2]),
      undefined,
      [1.1, 2.2],
    ],
    [
      new Set([1.1, 2.2]),
      (item: number) => item,
      [1.1, 2.2],
    ],
    [
      new Set([1.1, 2.2]),
      (item: number) => -item,
      [2.2, 1.1],
    ],
    [
      new Set(['a', 'b', 'c']),
      undefined,
      ['a', 'c'],
    ],
    [
      new Set(['a', 'b', 'c']),
      (item: string) => item,
      ['a', 'c'],
    ],
    [
      new Set(['a', 'b', 'c']),
      (item: string) => -item.charCodeAt(0),
      ['c', 'a'],
    ],
    [
      new Set(['b', 'c', 'a']),
      undefined,
      ['a', 'c'],
    ],
    [
      new Set(['b', 'c', 'a']),
      (item: string) => item,
      ['a', 'c'],
    ],
    [
      new Set(['b', 'c', 'a']),
      (item: string) => -item.charCodeAt(0),
      ['c', 'a'],
    ],
    [
      new Set(['c', 'b', 'a']),
      undefined,
      ['a', 'c'],
    ],
    [
      new Set(['c', 'b', 'a']),
      (item: string) => item,
      ['a', 'c'],
    ],
    [
      new Set(['c', 'b', 'a']),
      (item: string) => -item.charCodeAt(0),
      ['c', 'a'],
    ],
    [
      new Set(['ab', 'ba', 'b']),
      undefined,
      ['ab', 'ba'],
    ],
    [
      new Set(['ab', 'ba', 'b']),
      (item: string) => item,
      ['ab', 'ba'],
    ],
    [
      new Set(['ba', 'b', 'ab']),
      undefined,
      ['ab', 'ba'],
    ],
    [
      new Set(['ba', 'b', 'ab']),
      (item: string) => item,
      ['ab', 'ba'],
    ],
    [
      new Set([[]]),
      undefined,
      [[], []],
    ],
    [
      new Set([[]]),
      (item: Array<unknown>) => item,
      [[], []],
    ],
    [
      new Set([[2]]),
      undefined,
      [[2], [2]],
    ],
    [
      new Set([[2]]),
      (item: Array<unknown>) => item,
      [[2], [2]],
    ],
    [
      new Set([[], []]),
      undefined,
      [[], []],
    ],
    [
      new Set([[], []]),
      (item: Array<unknown>) => item,
      [[], []],
    ],
    [
      new Set([[], [2]]),
      undefined,
      [[], [2]],
    ],
    [
      new Set([[], [2]]),
      (item: Array<unknown>) => item,
      [[], [2]],
    ],
    [
      new Set([[2], []]),
      undefined,
      [[], [2]],
    ],
    [
      new Set([[2], []]),
      (item: Array<unknown>) => item,
      [[], [2]],
    ],
    [
      new Set([[null], [null]]),
      undefined,
      [[null], [null]],
    ],
    [
      new Set([[null], [null]]),
      (item: Array<unknown>) => item,
      [[null], [null]],
    ],
    [
      new Set([[1, 2], [2]]),
      undefined,
      [[1, 2], [2]],
    ],
    [
      new Set([[1, 2], [2]]),
      (item: Array<unknown>) => item,
      [[1, 2], [2]],
    ],
    [
      new Set([[3, 2], [2]]),
      undefined,
      [[2], [3, 2]],
    ],
    [
      new Set([[3, 2], [2]]),
      (item: Array<unknown>) => item,
      [[2], [3, 2]],
    ],
    [
      new Set([[1, 2], [2, 1]]),
      undefined,
      [[1, 2], [2, 1]],
    ],
    [
      new Set([[1, 2], [2, 1]]),
      (item: Array<unknown>) => item,
      [[1, 2], [2, 1]],
    ],
    [
      new Set([[2, 1], [1, 2]]),
      undefined,
      [[1, 2], [2, 1]],
    ],
    [
      new Set([[2, 1], [1, 2]]),
      (item: Array<unknown>) => item,
      [[1, 2], [2, 1]],
    ],
    [
      new Set([['a'], ['b']]),
      undefined,
      [['a'], ['b']],
    ],
    [
      new Set([['a'], ['b']]),
      (item: Array<unknown>) => item,
      [['a'], ['b']],
    ],
    [
      new Set([['a', 'a'], ['b']]),
      undefined,
      [['a', 'a'], ['b']],
    ],
    [
      new Set([['a', 'a'], ['b']]),
      (item: Array<unknown>) => item,
      [['a', 'a'], ['b']],
    ],
    [
      new Set([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      undefined,
      [[1, 2, 3], [2, 1, 3]],
    ],
    [
      new Set([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => item,
      [[1, 2, 3], [2, 1, 3]],
    ],
    [
      new Set([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => item[1],
      [[2, 0, 3], [1, 2, 3]],
    ],
    [
      new Set([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => -(item[1] as number),
      [[1, 2, 3], [2, 0, 3]],
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      undefined,
      [undefined, undefined],
    ],
    [
      createMapFixture([]),
      (item: unknown) => item,
      [undefined, undefined],
    ],
    [
      createMapFixture([]),
      (item: unknown) => -(item as number),
      [undefined, undefined],
    ],
    [
      createMapFixture([0]),
      undefined,
      [[0, 0], [0, 0]],
    ],
    [
      createMapFixture([0]),
      (item: unknown) => item,
      [[0, 0], [0, 0]],
    ],
    [
      createMapFixture([0]),
      (item: unknown) => -(item as number),
      [[0, 0], [0, 0]],
    ],
    [
      createMapFixture([Infinity]),
      undefined,
      [[0, Infinity], [0, Infinity]],
    ],
    [
      createMapFixture([Infinity]),
      (item: unknown) => item,
      [[0, Infinity], [0, Infinity]],
    ],
    [
      createMapFixture([Infinity]),
      (item: unknown) => -(item as number),
      [[0, Infinity], [0, Infinity]],
    ],
    [
      createMapFixture([-Infinity]),
      undefined,
      [[0, -Infinity], [0, -Infinity]],
    ],
    [
      createMapFixture([-Infinity]),
      (item: [unknown, number]) => item[1],
      [[0, -Infinity], [0, -Infinity]],
    ],
    [
      createMapFixture([-Infinity]),
      (item: [unknown, number]) => -item[1],
      [[0, -Infinity], [0, -Infinity]],
    ],
    [
      createMapFixture([Infinity, -Infinity]),
      (item: [unknown, number]) => item[1],
      [[1, -Infinity], [0, Infinity]],
    ],
    [
      createMapFixture([Infinity, -Infinity]),
      (item: [unknown, number]) => -item[1],
      [[0, Infinity], [1, -Infinity]],
    ],
    [
      createMapFixture([Infinity, -Infinity, 10, -1]),
      (item: [unknown, number]) => item[1],
      [[1, -Infinity], [0, Infinity]],
    ],
    [
      createMapFixture([Infinity, -Infinity, 10, -1]),
      (item: [unknown, number]) => -item[1],
      [[0, Infinity], [1, -Infinity]],
    ],
    [
      createMapFixture([1, 2, 3]),
      (item: [unknown, number]) => item[1],
      [[0, 1], [2, 3]],
    ],
    [
      createMapFixture([1, 2, 3]),
      (item: [unknown, number]) => -item[1],
      [[2, 3], [0, 1]],
    ],
    [
      createMapFixture([3, 2, 1]),
      (item: [unknown, number]) => item[1],
      [[2, 1], [0, 3]],
    ],
    [
      createMapFixture([3, 2, 1]),
      (item: [unknown, number]) => -item[1],
      [[0, 3], [2, 1]],
    ],
    [
      createMapFixture([2, 3, 1]),
      (item: [unknown, number]) => item[1],
      [[2, 1], [1, 3]],
    ],
    [
      createMapFixture([2, 3, 1]),
      (item: [unknown, number]) => -item[1],
      [[1, 3], [2, 1]],
    ],
    [
      createMapFixture(['a', 'b', 'c']),
      (item: [unknown, string]) => item[1],
      [[0, 'a'], [2, 'c']],
    ],
    [
      createMapFixture(['a', 'b', 'c']),
      (item: [unknown, string]) => -item[1].charCodeAt(0),
      [[2, 'c'], [0, 'a']],
    ],
    [
      createMapFixture(['b', 'c', 'a']),
      (item: [unknown, string]) => item[1],
      [[2, 'a'], [1, 'c']],
    ],
    [
      createMapFixture(['b', 'c', 'a']),
      (item: [unknown, string]) => -item[1].charCodeAt(0),
      [[1, 'c'], [2, 'a']],
    ],
    [
      createMapFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: [unknown, Array<number>]) => item[1],
      [[0, [1, 2, 3]], [2, [2, 1, 3]]],
    ],
    [
      createMapFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: [unknown, Array<number>]) => item[1][1],
      [[1, [2, 0, 3]], [0, [1, 2, 3]]],
    ],
    [
      createMapFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: [unknown, Array<number>]) => -item[1][1],
      [[0, [1, 2, 3]], [1, [2, 0, 3]]],
    ],
  ];
}
