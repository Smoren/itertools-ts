import {
  asyncTimeout,
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture
  // @ts-ignore
} from "../fixture";
import { reduce, Comparable } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])(
  "Reduce To Min Max Test",
  (input, compareBy, expected) => {
    it("", () => {
      // When
      const result = reduce.toMinMax(input, compareBy);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForAsyncGenerators(),
  ...dataProviderForAsyncIterables(),
  ...dataProviderForAsyncIterators(),
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])(
  "Reduce To Min Max Async Test",
  (input, compareBy, expected) => {
    it("", async () => {
      // When
      const result = await reduce.toMinMaxAsync(input, compareBy);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForUsingCustomComparator(),
])(
  "Reduce To Min Max Using Custom Comparator Test",
  (input, compareBy, expected) => {
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
  ...dataProviderForUsingCustomComparatorAsync(),
])(
  "Reduce To Min Max Async Using Custom Comparator Test",
  (input, compareBy, expected) => {
    it("", async () => {
      // When
      const result = await reduce.toMinMaxAsync(input, compareBy);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForUsingCustomComparator(): Array<[Array<Record<string, unknown>>, (movie: Record<string, unknown>) => number, [Record<string, unknown>, Record<string, unknown>]]> {
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

function dataProviderForUsingCustomComparatorAsync(): Array<[Array<Record<string, unknown>>, (movie: Record<string, unknown>) => Promise<number>, [Record<string, unknown>, Record<string, unknown>]]> {
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
      async (movie: Record<string, unknown>): Promise<number> => {
        await asyncTimeout(1);
        return movie['rating'] as number;
      },
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

function dataProviderForArrays(): Array<[Array<any>, ((item: any) => any) | undefined, [any, any]]> {
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

function dataProviderForGenerators(): Array<[Generator<any>, ((item: any) => any) | undefined, [any, any]]> {
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

function dataProviderForIterables(): Array<[Iterable<any>, ((item: any) => any) | undefined, [any, any]]> {
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

function dataProviderForIterators(): Array<[Iterator<any>, ((item: any) => any) | undefined, [any, any]]> {
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

function dataProviderForStrings(): Array<[string, ((item: any) => any) | undefined, [any, any]]> {
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

function dataProviderForSets(): Array<[Set<any>, ((item: any) => any) | undefined, [any, any]]> {
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

function dataProviderForMaps(): Array<[Map<any, any>, ((item: any) => any) | undefined, [any, any]]> {
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

function dataProviderForAsyncGenerators(): Array<[AsyncGenerator<any>, ((item: any) => any) | undefined, [any, any]]> {
  return [
    [
      createAsyncGeneratorFixture([]),
      undefined,
      [undefined, undefined],
    ],
    [
      createAsyncGeneratorFixture([]),
      (item: number) => item,
      [undefined, undefined],
    ],
    [
      createAsyncGeneratorFixture([]),
      (item: number) => -item,
      [undefined, undefined],
    ],
    [
      createAsyncGeneratorFixture([0]),
      undefined,
      [0, 0],
    ],
    [
      createAsyncGeneratorFixture([0]),
      (item: number) => item,
      [0, 0],
    ],
    [
      createAsyncGeneratorFixture([0]),
      (item: number) => -item,
      [0, 0],
    ],
    [
      createAsyncGeneratorFixture([Infinity]),
      undefined,
      [Infinity, Infinity],
    ],
    [
      createAsyncGeneratorFixture([Infinity]),
      (item: number) => item,
      [Infinity, Infinity],
    ],
    [
      createAsyncGeneratorFixture([Infinity]),
      (item: number) => -item,
      [Infinity, Infinity],
    ],
    [
      createAsyncGeneratorFixture([-Infinity]),
      undefined,
      [-Infinity, -Infinity],
    ],
    [
      createAsyncGeneratorFixture([-Infinity]),
      (item: number) => item,
      [-Infinity, -Infinity],
    ],
    [
      createAsyncGeneratorFixture([-Infinity]),
      (item: number) => -item,
      [-Infinity, -Infinity],
    ],
    [
      createAsyncGeneratorFixture([Infinity, -Infinity]),
      undefined,
      [-Infinity, Infinity],
    ],
    [
      createAsyncGeneratorFixture([Infinity, -Infinity]),
      (item: number) => item,
      [-Infinity, Infinity],
    ],
    [
      createAsyncGeneratorFixture([Infinity, -Infinity]),
      (item: number) => -item,
      [Infinity, -Infinity],
    ],
    [
      createAsyncGeneratorFixture([Infinity, -Infinity, 10, -1]),
      undefined,
      [-Infinity, Infinity],
    ],
    [
      createAsyncGeneratorFixture([Infinity, -Infinity, 10, -1]),
      (item: number) => item,
      [-Infinity, Infinity],
    ],
    [
      createAsyncGeneratorFixture([Infinity, -Infinity, 10, -1]),
      (item: number) => -item,
      [Infinity, -Infinity],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      undefined,
      [1, 3],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (item: number) => item,
      [1, 3],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (item: number) => -item,
      [3, 1],
    ],
    [
      createAsyncGeneratorFixture([3, 2, 1]),
      undefined,
      [1, 3],
    ],
    [
      createAsyncGeneratorFixture([3, 2, 1]),
      (item: number) => item,
      [1, 3],
    ],
    [
      createAsyncGeneratorFixture([3, 2, 1]),
      (item: number) => -item,
      [3, 1],
    ],
    [
      createAsyncGeneratorFixture([3, 2, 1]),
      undefined,
      [1, 3],
    ],
    [
      createAsyncGeneratorFixture([3, 2, 1]),
      (item: number) => item,
      [1, 3],
    ],
    [
      createAsyncGeneratorFixture([3, 2, 1]),
      (item: number) => -item,
      [3, 1],
    ],
    [
      createAsyncGeneratorFixture([2.1, 1]),
      undefined,
      [1, 2.1],
    ],
    [
      createAsyncGeneratorFixture([2.1, 1]),
      (item: number) => item,
      [1, 2.1],
    ],
    [
      createAsyncGeneratorFixture([2.1, 1]),
      (item: number) => -item,
      [2.1, 1],
    ],
    [
      createAsyncGeneratorFixture([2, 1.1]),
      undefined,
      [1.1, 2],
    ],
    [
      createAsyncGeneratorFixture([2, 1.1]),
      (item: number) => item,
      [1.1, 2],
    ],
    [
      createAsyncGeneratorFixture([2, 1.1]),
      (item: number) => -item,
      [2, 1.1],
    ],
    [
      createAsyncGeneratorFixture([2.2, 1.1]),
      undefined,
      [1.1, 2.2],
    ],
    [
      createAsyncGeneratorFixture([2.2, 1.1]),
      (item: number) => item,
      [1.1, 2.2],
    ],
    [
      createAsyncGeneratorFixture([2.2, 1.1]),
      (item: number) => -item,
      [2.2, 1.1],
    ],
    [
      createAsyncGeneratorFixture([1.1, 2.2]),
      undefined,
      [1.1, 2.2],
    ],
    [
      createAsyncGeneratorFixture([1.1, 2.2]),
      (item: number) => item,
      [1.1, 2.2],
    ],
    [
      createAsyncGeneratorFixture([1.1, 2.2]),
      (item: number) => -item,
      [2.2, 1.1],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c']),
      undefined,
      ['a', 'c'],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c']),
      (item: string) => item,
      ['a', 'c'],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c']),
      (item: string) => -item.charCodeAt(0),
      ['c', 'a'],
    ],
    [
      createAsyncGeneratorFixture(['b', 'c', 'a']),
      undefined,
      ['a', 'c'],
    ],
    [
      createAsyncGeneratorFixture(['b', 'c', 'a']),
      (item: string) => item,
      ['a', 'c'],
    ],
    [
      createAsyncGeneratorFixture(['b', 'c', 'a']),
      (item: string) => -item.charCodeAt(0),
      ['c', 'a'],
    ],
    [
      createAsyncGeneratorFixture(['c', 'b', 'a']),
      undefined,
      ['a', 'c'],
    ],
    [
      createAsyncGeneratorFixture(['c', 'b', 'a']),
      (item: string) => item,
      ['a', 'c'],
    ],
    [
      createAsyncGeneratorFixture(['c', 'b', 'a']),
      (item: string) => -item.charCodeAt(0),
      ['c', 'a'],
    ],
    [
      createAsyncGeneratorFixture(['ab', 'ba', 'b']),
      undefined,
      ['ab', 'ba'],
    ],
    [
      createAsyncGeneratorFixture(['ab', 'ba', 'b']),
      (item: string) => item,
      ['ab', 'ba'],
    ],
    [
      createAsyncGeneratorFixture(['ba', 'b', 'ab']),
      undefined,
      ['ab', 'ba'],
    ],
    [
      createAsyncGeneratorFixture(['ba', 'b', 'ab']),
      (item: string) => item,
      ['ab', 'ba'],
    ],
    [
      createAsyncGeneratorFixture([[]]),
      undefined,
      [[], []],
    ],
    [
      createAsyncGeneratorFixture([[]]),
      (item: Array<unknown>) => item,
      [[], []],
    ],
    [
      createAsyncGeneratorFixture([[2]]),
      undefined,
      [[2], [2]],
    ],
    [
      createAsyncGeneratorFixture([[2]]),
      (item: Array<unknown>) => item,
      [[2], [2]],
    ],
    [
      createAsyncGeneratorFixture([[], []]),
      undefined,
      [[], []],
    ],
    [
      createAsyncGeneratorFixture([[], []]),
      (item: Array<unknown>) => item,
      [[], []],
    ],
    [
      createAsyncGeneratorFixture([[], [2]]),
      undefined,
      [[], [2]],
    ],
    [
      createAsyncGeneratorFixture([[], [2]]),
      (item: Array<unknown>) => item,
      [[], [2]],
    ],
    [
      createAsyncGeneratorFixture([[2], []]),
      undefined,
      [[], [2]],
    ],
    [
      createAsyncGeneratorFixture([[2], []]),
      (item: Array<unknown>) => item,
      [[], [2]],
    ],
    [
      createAsyncGeneratorFixture([[null], [null]]),
      undefined,
      [[null], [null]],
    ],
    [
      createAsyncGeneratorFixture([[null], [null]]),
      (item: Array<unknown>) => item,
      [[null], [null]],
    ],
    [
      createAsyncGeneratorFixture([[1, 2], [2]]),
      undefined,
      [[1, 2], [2]],
    ],
    [
      createAsyncGeneratorFixture([[1, 2], [2]]),
      (item: Array<unknown>) => item,
      [[1, 2], [2]],
    ],
    [
      createAsyncGeneratorFixture([[3, 2], [2]]),
      undefined,
      [[2], [3, 2]],
    ],
    [
      createAsyncGeneratorFixture([[3, 2], [2]]),
      (item: Array<unknown>) => item,
      [[2], [3, 2]],
    ],
    [
      createAsyncGeneratorFixture([[1, 2], [2, 1]]),
      undefined,
      [[1, 2], [2, 1]],
    ],
    [
      createAsyncGeneratorFixture([[1, 2], [2, 1]]),
      (item: Array<unknown>) => item,
      [[1, 2], [2, 1]],
    ],
    [
      createAsyncGeneratorFixture([[2, 1], [1, 2]]),
      undefined,
      [[1, 2], [2, 1]],
    ],
    [
      createAsyncGeneratorFixture([[2, 1], [1, 2]]),
      (item: Array<unknown>) => item,
      [[1, 2], [2, 1]],
    ],
    [
      createAsyncGeneratorFixture([['a'], ['b']]),
      undefined,
      [['a'], ['b']],
    ],
    [
      createAsyncGeneratorFixture([['a'], ['b']]),
      (item: Array<unknown>) => item,
      [['a'], ['b']],
    ],
    [
      createAsyncGeneratorFixture([['a', 'a'], ['b']]),
      undefined,
      [['a', 'a'], ['b']],
    ],
    [
      createAsyncGeneratorFixture([['a', 'a'], ['b']]),
      (item: Array<unknown>) => item,
      [['a', 'a'], ['b']],
    ],
    [
      createAsyncGeneratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      undefined,
      [[1, 2, 3], [2, 1, 3]],
    ],
    [
      createAsyncGeneratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => item,
      [[1, 2, 3], [2, 1, 3]],
    ],
    [
      createAsyncGeneratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => item[1],
      [[2, 0, 3], [1, 2, 3]],
    ],
    [
      createAsyncGeneratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => -(item[1] as number),
      [[1, 2, 3], [2, 0, 3]],
    ],
    [
      createAsyncGeneratorFixture([2, 3, 0, 1]),
      async (item: number) => {
        await asyncTimeout(1);
        return item;
      },
      [0, 3],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[AsyncIterable<any>, ((item: any) => any) | undefined, [any, any]]> {
  return [
    [
      createAsyncIterableFixture([]),
      undefined,
      [undefined, undefined],
    ],
    [
      createAsyncIterableFixture([]),
      (item: number) => item,
      [undefined, undefined],
    ],
    [
      createAsyncIterableFixture([]),
      (item: number) => -item,
      [undefined, undefined],
    ],
    [
      createAsyncIterableFixture([0]),
      undefined,
      [0, 0],
    ],
    [
      createAsyncIterableFixture([0]),
      (item: number) => item,
      [0, 0],
    ],
    [
      createAsyncIterableFixture([0]),
      (item: number) => -item,
      [0, 0],
    ],
    [
      createAsyncIterableFixture([Infinity]),
      undefined,
      [Infinity, Infinity],
    ],
    [
      createAsyncIterableFixture([Infinity]),
      (item: number) => item,
      [Infinity, Infinity],
    ],
    [
      createAsyncIterableFixture([Infinity]),
      (item: number) => -item,
      [Infinity, Infinity],
    ],
    [
      createAsyncIterableFixture([-Infinity]),
      undefined,
      [-Infinity, -Infinity],
    ],
    [
      createAsyncIterableFixture([-Infinity]),
      (item: number) => item,
      [-Infinity, -Infinity],
    ],
    [
      createAsyncIterableFixture([-Infinity]),
      (item: number) => -item,
      [-Infinity, -Infinity],
    ],
    [
      createAsyncIterableFixture([Infinity, -Infinity]),
      undefined,
      [-Infinity, Infinity],
    ],
    [
      createAsyncIterableFixture([Infinity, -Infinity]),
      (item: number) => item,
      [-Infinity, Infinity],
    ],
    [
      createAsyncIterableFixture([Infinity, -Infinity]),
      (item: number) => -item,
      [Infinity, -Infinity],
    ],
    [
      createAsyncIterableFixture([Infinity, -Infinity, 10, -1]),
      undefined,
      [-Infinity, Infinity],
    ],
    [
      createAsyncIterableFixture([Infinity, -Infinity, 10, -1]),
      (item: number) => item,
      [-Infinity, Infinity],
    ],
    [
      createAsyncIterableFixture([Infinity, -Infinity, 10, -1]),
      (item: number) => -item,
      [Infinity, -Infinity],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      undefined,
      [1, 3],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      (item: number) => item,
      [1, 3],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      (item: number) => -item,
      [3, 1],
    ],
    [
      createAsyncIterableFixture([3, 2, 1]),
      undefined,
      [1, 3],
    ],
    [
      createAsyncIterableFixture([3, 2, 1]),
      (item: number) => item,
      [1, 3],
    ],
    [
      createAsyncIterableFixture([3, 2, 1]),
      (item: number) => -item,
      [3, 1],
    ],
    [
      createAsyncIterableFixture([3, 2, 1]),
      undefined,
      [1, 3],
    ],
    [
      createAsyncIterableFixture([3, 2, 1]),
      (item: number) => item,
      [1, 3],
    ],
    [
      createAsyncIterableFixture([3, 2, 1]),
      (item: number) => -item,
      [3, 1],
    ],
    [
      createAsyncIterableFixture([2.1, 1]),
      undefined,
      [1, 2.1],
    ],
    [
      createAsyncIterableFixture([2.1, 1]),
      (item: number) => item,
      [1, 2.1],
    ],
    [
      createAsyncIterableFixture([2.1, 1]),
      (item: number) => -item,
      [2.1, 1],
    ],
    [
      createAsyncIterableFixture([2, 1.1]),
      undefined,
      [1.1, 2],
    ],
    [
      createAsyncIterableFixture([2, 1.1]),
      (item: number) => item,
      [1.1, 2],
    ],
    [
      createAsyncIterableFixture([2, 1.1]),
      (item: number) => -item,
      [2, 1.1],
    ],
    [
      createAsyncIterableFixture([2.2, 1.1]),
      undefined,
      [1.1, 2.2],
    ],
    [
      createAsyncIterableFixture([2.2, 1.1]),
      (item: number) => item,
      [1.1, 2.2],
    ],
    [
      createAsyncIterableFixture([2.2, 1.1]),
      (item: number) => -item,
      [2.2, 1.1],
    ],
    [
      createAsyncIterableFixture([1.1, 2.2]),
      undefined,
      [1.1, 2.2],
    ],
    [
      createAsyncIterableFixture([1.1, 2.2]),
      (item: number) => item,
      [1.1, 2.2],
    ],
    [
      createAsyncIterableFixture([1.1, 2.2]),
      (item: number) => -item,
      [2.2, 1.1],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c']),
      undefined,
      ['a', 'c'],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c']),
      (item: string) => item,
      ['a', 'c'],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c']),
      (item: string) => -item.charCodeAt(0),
      ['c', 'a'],
    ],
    [
      createAsyncIterableFixture(['b', 'c', 'a']),
      undefined,
      ['a', 'c'],
    ],
    [
      createAsyncIterableFixture(['b', 'c', 'a']),
      (item: string) => item,
      ['a', 'c'],
    ],
    [
      createAsyncIterableFixture(['b', 'c', 'a']),
      (item: string) => -item.charCodeAt(0),
      ['c', 'a'],
    ],
    [
      createAsyncIterableFixture(['c', 'b', 'a']),
      undefined,
      ['a', 'c'],
    ],
    [
      createAsyncIterableFixture(['c', 'b', 'a']),
      (item: string) => item,
      ['a', 'c'],
    ],
    [
      createAsyncIterableFixture(['c', 'b', 'a']),
      (item: string) => -item.charCodeAt(0),
      ['c', 'a'],
    ],
    [
      createAsyncIterableFixture(['ab', 'ba', 'b']),
      undefined,
      ['ab', 'ba'],
    ],
    [
      createAsyncIterableFixture(['ab', 'ba', 'b']),
      (item: string) => item,
      ['ab', 'ba'],
    ],
    [
      createAsyncIterableFixture(['ba', 'b', 'ab']),
      undefined,
      ['ab', 'ba'],
    ],
    [
      createAsyncIterableFixture(['ba', 'b', 'ab']),
      (item: string) => item,
      ['ab', 'ba'],
    ],
    [
      createAsyncIterableFixture([[]]),
      undefined,
      [[], []],
    ],
    [
      createAsyncIterableFixture([[]]),
      (item: Array<unknown>) => item,
      [[], []],
    ],
    [
      createAsyncIterableFixture([[2]]),
      undefined,
      [[2], [2]],
    ],
    [
      createAsyncIterableFixture([[2]]),
      (item: Array<unknown>) => item,
      [[2], [2]],
    ],
    [
      createAsyncIterableFixture([[], []]),
      undefined,
      [[], []],
    ],
    [
      createAsyncIterableFixture([[], []]),
      (item: Array<unknown>) => item,
      [[], []],
    ],
    [
      createAsyncIterableFixture([[], [2]]),
      undefined,
      [[], [2]],
    ],
    [
      createAsyncIterableFixture([[], [2]]),
      (item: Array<unknown>) => item,
      [[], [2]],
    ],
    [
      createAsyncIterableFixture([[2], []]),
      undefined,
      [[], [2]],
    ],
    [
      createAsyncIterableFixture([[2], []]),
      (item: Array<unknown>) => item,
      [[], [2]],
    ],
    [
      createAsyncIterableFixture([[null], [null]]),
      undefined,
      [[null], [null]],
    ],
    [
      createAsyncIterableFixture([[null], [null]]),
      (item: Array<unknown>) => item,
      [[null], [null]],
    ],
    [
      createAsyncIterableFixture([[1, 2], [2]]),
      undefined,
      [[1, 2], [2]],
    ],
    [
      createAsyncIterableFixture([[1, 2], [2]]),
      (item: Array<unknown>) => item,
      [[1, 2], [2]],
    ],
    [
      createAsyncIterableFixture([[3, 2], [2]]),
      undefined,
      [[2], [3, 2]],
    ],
    [
      createAsyncIterableFixture([[3, 2], [2]]),
      (item: Array<unknown>) => item,
      [[2], [3, 2]],
    ],
    [
      createAsyncIterableFixture([[1, 2], [2, 1]]),
      undefined,
      [[1, 2], [2, 1]],
    ],
    [
      createAsyncIterableFixture([[1, 2], [2, 1]]),
      (item: Array<unknown>) => item,
      [[1, 2], [2, 1]],
    ],
    [
      createAsyncIterableFixture([[2, 1], [1, 2]]),
      undefined,
      [[1, 2], [2, 1]],
    ],
    [
      createAsyncIterableFixture([[2, 1], [1, 2]]),
      (item: Array<unknown>) => item,
      [[1, 2], [2, 1]],
    ],
    [
      createAsyncIterableFixture([['a'], ['b']]),
      undefined,
      [['a'], ['b']],
    ],
    [
      createAsyncIterableFixture([['a'], ['b']]),
      (item: Array<unknown>) => item,
      [['a'], ['b']],
    ],
    [
      createAsyncIterableFixture([['a', 'a'], ['b']]),
      undefined,
      [['a', 'a'], ['b']],
    ],
    [
      createAsyncIterableFixture([['a', 'a'], ['b']]),
      (item: Array<unknown>) => item,
      [['a', 'a'], ['b']],
    ],
    [
      createAsyncIterableFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      undefined,
      [[1, 2, 3], [2, 1, 3]],
    ],
    [
      createAsyncIterableFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => item,
      [[1, 2, 3], [2, 1, 3]],
    ],
    [
      createAsyncIterableFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => item[1],
      [[2, 0, 3], [1, 2, 3]],
    ],
    [
      createAsyncIterableFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => -(item[1] as number),
      [[1, 2, 3], [2, 0, 3]],
    ],
    [
      createAsyncIterableFixture([2, 3, 0, 1]),
      async (item: number) => {
        await asyncTimeout(1);
        return item;
      },
      [0, 3],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[AsyncIterator<any>, ((item: any) => any) | undefined, [any, any]]> {
  return [
    [
      createAsyncIteratorFixture([]),
      undefined,
      [undefined, undefined],
    ],
    [
      createAsyncIteratorFixture([]),
      (item: number) => item,
      [undefined, undefined],
    ],
    [
      createAsyncIteratorFixture([]),
      (item: number) => -item,
      [undefined, undefined],
    ],
    [
      createAsyncIteratorFixture([0]),
      undefined,
      [0, 0],
    ],
    [
      createAsyncIteratorFixture([0]),
      (item: number) => item,
      [0, 0],
    ],
    [
      createAsyncIteratorFixture([0]),
      (item: number) => -item,
      [0, 0],
    ],
    [
      createAsyncIteratorFixture([Infinity]),
      undefined,
      [Infinity, Infinity],
    ],
    [
      createAsyncIteratorFixture([Infinity]),
      (item: number) => item,
      [Infinity, Infinity],
    ],
    [
      createAsyncIteratorFixture([Infinity]),
      (item: number) => -item,
      [Infinity, Infinity],
    ],
    [
      createAsyncIteratorFixture([-Infinity]),
      undefined,
      [-Infinity, -Infinity],
    ],
    [
      createAsyncIteratorFixture([-Infinity]),
      (item: number) => item,
      [-Infinity, -Infinity],
    ],
    [
      createAsyncIteratorFixture([-Infinity]),
      (item: number) => -item,
      [-Infinity, -Infinity],
    ],
    [
      createAsyncIteratorFixture([Infinity, -Infinity]),
      undefined,
      [-Infinity, Infinity],
    ],
    [
      createAsyncIteratorFixture([Infinity, -Infinity]),
      (item: number) => item,
      [-Infinity, Infinity],
    ],
    [
      createAsyncIteratorFixture([Infinity, -Infinity]),
      (item: number) => -item,
      [Infinity, -Infinity],
    ],
    [
      createAsyncIteratorFixture([Infinity, -Infinity, 10, -1]),
      undefined,
      [-Infinity, Infinity],
    ],
    [
      createAsyncIteratorFixture([Infinity, -Infinity, 10, -1]),
      (item: number) => item,
      [-Infinity, Infinity],
    ],
    [
      createAsyncIteratorFixture([Infinity, -Infinity, 10, -1]),
      (item: number) => -item,
      [Infinity, -Infinity],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      undefined,
      [1, 3],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      (item: number) => item,
      [1, 3],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      (item: number) => -item,
      [3, 1],
    ],
    [
      createAsyncIteratorFixture([3, 2, 1]),
      undefined,
      [1, 3],
    ],
    [
      createAsyncIteratorFixture([3, 2, 1]),
      (item: number) => item,
      [1, 3],
    ],
    [
      createAsyncIteratorFixture([3, 2, 1]),
      (item: number) => -item,
      [3, 1],
    ],
    [
      createAsyncIteratorFixture([3, 2, 1]),
      undefined,
      [1, 3],
    ],
    [
      createAsyncIteratorFixture([3, 2, 1]),
      (item: number) => item,
      [1, 3],
    ],
    [
      createAsyncIteratorFixture([3, 2, 1]),
      (item: number) => -item,
      [3, 1],
    ],
    [
      createAsyncIteratorFixture([2.1, 1]),
      undefined,
      [1, 2.1],
    ],
    [
      createAsyncIteratorFixture([2.1, 1]),
      (item: number) => item,
      [1, 2.1],
    ],
    [
      createAsyncIteratorFixture([2.1, 1]),
      (item: number) => -item,
      [2.1, 1],
    ],
    [
      createAsyncIteratorFixture([2, 1.1]),
      undefined,
      [1.1, 2],
    ],
    [
      createAsyncIteratorFixture([2, 1.1]),
      (item: number) => item,
      [1.1, 2],
    ],
    [
      createAsyncIteratorFixture([2, 1.1]),
      (item: number) => -item,
      [2, 1.1],
    ],
    [
      createAsyncIteratorFixture([2.2, 1.1]),
      undefined,
      [1.1, 2.2],
    ],
    [
      createAsyncIteratorFixture([2.2, 1.1]),
      (item: number) => item,
      [1.1, 2.2],
    ],
    [
      createAsyncIteratorFixture([2.2, 1.1]),
      (item: number) => -item,
      [2.2, 1.1],
    ],
    [
      createAsyncIteratorFixture([1.1, 2.2]),
      undefined,
      [1.1, 2.2],
    ],
    [
      createAsyncIteratorFixture([1.1, 2.2]),
      (item: number) => item,
      [1.1, 2.2],
    ],
    [
      createAsyncIteratorFixture([1.1, 2.2]),
      (item: number) => -item,
      [2.2, 1.1],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c']),
      undefined,
      ['a', 'c'],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c']),
      (item: string) => item,
      ['a', 'c'],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c']),
      (item: string) => -item.charCodeAt(0),
      ['c', 'a'],
    ],
    [
      createAsyncIteratorFixture(['b', 'c', 'a']),
      undefined,
      ['a', 'c'],
    ],
    [
      createAsyncIteratorFixture(['b', 'c', 'a']),
      (item: string) => item,
      ['a', 'c'],
    ],
    [
      createAsyncIteratorFixture(['b', 'c', 'a']),
      (item: string) => -item.charCodeAt(0),
      ['c', 'a'],
    ],
    [
      createAsyncIteratorFixture(['c', 'b', 'a']),
      undefined,
      ['a', 'c'],
    ],
    [
      createAsyncIteratorFixture(['c', 'b', 'a']),
      (item: string) => item,
      ['a', 'c'],
    ],
    [
      createAsyncIteratorFixture(['c', 'b', 'a']),
      (item: string) => -item.charCodeAt(0),
      ['c', 'a'],
    ],
    [
      createAsyncIteratorFixture(['ab', 'ba', 'b']),
      undefined,
      ['ab', 'ba'],
    ],
    [
      createAsyncIteratorFixture(['ab', 'ba', 'b']),
      (item: string) => item,
      ['ab', 'ba'],
    ],
    [
      createAsyncIteratorFixture(['ba', 'b', 'ab']),
      undefined,
      ['ab', 'ba'],
    ],
    [
      createAsyncIteratorFixture(['ba', 'b', 'ab']),
      (item: string) => item,
      ['ab', 'ba'],
    ],
    [
      createAsyncIteratorFixture([[]]),
      undefined,
      [[], []],
    ],
    [
      createAsyncIteratorFixture([[]]),
      (item: Array<unknown>) => item,
      [[], []],
    ],
    [
      createAsyncIteratorFixture([[2]]),
      undefined,
      [[2], [2]],
    ],
    [
      createAsyncIteratorFixture([[2]]),
      (item: Array<unknown>) => item,
      [[2], [2]],
    ],
    [
      createAsyncIteratorFixture([[], []]),
      undefined,
      [[], []],
    ],
    [
      createAsyncIteratorFixture([[], []]),
      (item: Array<unknown>) => item,
      [[], []],
    ],
    [
      createAsyncIteratorFixture([[], [2]]),
      undefined,
      [[], [2]],
    ],
    [
      createAsyncIteratorFixture([[], [2]]),
      (item: Array<unknown>) => item,
      [[], [2]],
    ],
    [
      createAsyncIteratorFixture([[2], []]),
      undefined,
      [[], [2]],
    ],
    [
      createAsyncIteratorFixture([[2], []]),
      (item: Array<unknown>) => item,
      [[], [2]],
    ],
    [
      createAsyncIteratorFixture([[null], [null]]),
      undefined,
      [[null], [null]],
    ],
    [
      createAsyncIteratorFixture([[null], [null]]),
      (item: Array<unknown>) => item,
      [[null], [null]],
    ],
    [
      createAsyncIteratorFixture([[1, 2], [2]]),
      undefined,
      [[1, 2], [2]],
    ],
    [
      createAsyncIteratorFixture([[1, 2], [2]]),
      (item: Array<unknown>) => item,
      [[1, 2], [2]],
    ],
    [
      createAsyncIteratorFixture([[3, 2], [2]]),
      undefined,
      [[2], [3, 2]],
    ],
    [
      createAsyncIteratorFixture([[3, 2], [2]]),
      (item: Array<unknown>) => item,
      [[2], [3, 2]],
    ],
    [
      createAsyncIteratorFixture([[1, 2], [2, 1]]),
      undefined,
      [[1, 2], [2, 1]],
    ],
    [
      createAsyncIteratorFixture([[1, 2], [2, 1]]),
      (item: Array<unknown>) => item,
      [[1, 2], [2, 1]],
    ],
    [
      createAsyncIteratorFixture([[2, 1], [1, 2]]),
      undefined,
      [[1, 2], [2, 1]],
    ],
    [
      createAsyncIteratorFixture([[2, 1], [1, 2]]),
      (item: Array<unknown>) => item,
      [[1, 2], [2, 1]],
    ],
    [
      createAsyncIteratorFixture([['a'], ['b']]),
      undefined,
      [['a'], ['b']],
    ],
    [
      createAsyncIteratorFixture([['a'], ['b']]),
      (item: Array<unknown>) => item,
      [['a'], ['b']],
    ],
    [
      createAsyncIteratorFixture([['a', 'a'], ['b']]),
      undefined,
      [['a', 'a'], ['b']],
    ],
    [
      createAsyncIteratorFixture([['a', 'a'], ['b']]),
      (item: Array<unknown>) => item,
      [['a', 'a'], ['b']],
    ],
    [
      createAsyncIteratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      undefined,
      [[1, 2, 3], [2, 1, 3]],
    ],
    [
      createAsyncIteratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => item,
      [[1, 2, 3], [2, 1, 3]],
    ],
    [
      createAsyncIteratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => item[1],
      [[2, 0, 3], [1, 2, 3]],
    ],
    [
      createAsyncIteratorFixture([[1, 2, 3], [2, 0, 3], [2, 1, 3]]),
      (item: Array<unknown>) => -(item[1] as number),
      [[1, 2, 3], [2, 0, 3]],
    ],
    [
      createAsyncIteratorFixture([2, 3, 0, 1]),
      async (item: number) => {
        await asyncTimeout(1);
        return item;
      },
      [0, 3],
    ],
  ];
}
