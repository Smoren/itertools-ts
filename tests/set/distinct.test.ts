import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture
  // @ts-ignore
} from "../fixture";
import { set, Comparable, Numeric } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])(
  "Set Distinct Test",
  (input, compareBy, expected) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of set.distinct(input, compareBy)) {
        result.push(item);
      }

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
  "Set Distinct Async Test",
  (input, compareBy, expected) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of set.distinctAsync(input, compareBy)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<[Array<any>, ((item: any) => Comparable) | undefined, Array<any>]> {
  return [
    [
      [],
      undefined,
      [],
    ],
    [
      [],
      (item: Comparable) => item,
      [],
    ],
    [
      [1],
      undefined,
      [1],
    ],
    [
      [1],
      (item: number) => item,
      [1],
    ],
    [
      [1, 1],
      undefined,
      [1],
    ],
    [
      [1, 1],
      (item: number) => item,
      [1],
    ],
    [
      [1, '1'],
      undefined,
      [1, '1'],
    ],
    [
      [1, '1'],
      (item: Numeric) => item,
      [1, '1'],
    ],
    [
      ['1', 1],
      undefined,
      ['1', 1],
    ],
    [
      ['1', 1],
      (item: Numeric) => item,
      ['1', 1],
    ],
    [
      ['aa', 'bb', 'aa'],
      undefined,
      ['aa', 'bb'],
    ],
    [
      ['aa', 'bb', 'aa'],
      (item: string) => item,
      ['aa', 'bb'],
    ],
    [
      [1, 2, 1, 2, 3],
      undefined,
      [1, 2, 3],
    ],
    [
      [1, 2, 1, 2, 3],
      (item: number) => item,
      [1, 2, 3],
    ],
    [
      ['1', 2, '1', '2', 3],
      undefined,
      ['1', 2, '2', 3],
    ],
    [
      ['1', 2, '1', '2', 3],
      (item: Numeric) => item,
      ['1', 2, '2', 3],
    ],
    [
      [false, null, undefined, 0, 0.0, ''],
      undefined,
      [false, null, undefined, 0, ''],
    ],
    [
      [false, null, undefined, 0, 0.0, ''],
      (item: Comparable) => item,
      [false, null, undefined, 0, ''],
    ],
    [
      [true, 1, '1', 1.0, '1.0'],
      undefined,
      [true, 1, '1', '1.0'],
    ],
    [
      [true, 1, '1', 1.0, '1.0'],
      (item: Comparable) => item,
      [true, 1, '1', '1.0'],
    ],
    [
      [true, 1, '1', 1.1, '1.1'],
      undefined,
      [true, 1, '1', 1.1, '1.1'],
    ],
    [
      [true, 1, '1', 1.1, '1.1'],
      (item: Comparable) => item,
      [true, 1, '1', 1.1, '1.1'],
    ],
    [
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ],
      (item: Comparable) => item,
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ],
      (item: Record<string, Comparable>) => item['id'],
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ],
      (item: Record<string, Comparable>) => item['name'],
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<any>, ((item: any) => Comparable) | undefined, Array<any>]> {
  return [
    [
      createGeneratorFixture([]),
      undefined,
      [],
    ],
    [
      createGeneratorFixture([]),
      (item: Comparable) => item,
      [],
    ],
    [
      createGeneratorFixture([1]),
      undefined,
      [1],
    ],
    [
      createGeneratorFixture([1]),
      (item: number) => item,
      [1],
    ],
    [
      createGeneratorFixture([1, 1]),
      undefined,
      [1],
    ],
    [
      createGeneratorFixture([1, 1]),
      (item: number) => item,
      [1],
    ],
    [
      createGeneratorFixture([1, '1']),
      undefined,
      [1, '1'],
    ],
    [
      createGeneratorFixture([1, '1']),
      (item: Numeric) => item,
      [1, '1'],
    ],
    [
      createGeneratorFixture(['1', 1]),
      undefined,
      ['1', 1],
    ],
    [
      createGeneratorFixture(['1', 1]),
      (item: Numeric) => item,
      ['1', 1],
    ],
    [
      createGeneratorFixture(['aa', 'bb', 'aa']),
      undefined,
      ['aa', 'bb'],
    ],
    [
      createGeneratorFixture(['aa', 'bb', 'aa']),
      (item: string) => item,
      ['aa', 'bb'],
    ],
    [
      createGeneratorFixture([1, 2, 1, 2, 3]),
      undefined,
      [1, 2, 3],
    ],
    [
      createGeneratorFixture([1, 2, 1, 2, 3]),
      (item: number) => item,
      [1, 2, 3],
    ],
    [
      createGeneratorFixture(['1', 2, '1', '2', 3]),
      undefined,
      ['1', 2, '2', 3],
    ],
    [
      createGeneratorFixture(['1', 2, '1', '2', 3]),
      (item: Numeric) => item,
      ['1', 2, '2', 3],
    ],
    [
      createGeneratorFixture([false, null, undefined, 0, 0.0, '']),
      undefined,
      [false, null, undefined, 0, ''],
    ],
    [
      createGeneratorFixture([false, null, undefined, 0, 0.0, '']),
      (item: Comparable) => item,
      [false, null, undefined, 0, ''],
    ],
    [
      createGeneratorFixture([true, 1, '1', 1.0, '1.0']),
      undefined,
      [true, 1, '1', '1.0'],
    ],
    [
      createGeneratorFixture([true, 1, '1', 1.0, '1.0']),
      (item: Comparable) => item,
      [true, 1, '1', '1.0'],
    ],
    [
      createGeneratorFixture([true, 1, '1', 1.1, '1.1']),
      undefined,
      [true, 1, '1', 1.1, '1.1'],
    ],
    [
      createGeneratorFixture([true, 1, '1', 1.1, '1.1']),
      (item: Comparable) => item,
      [true, 1, '1', 1.1, '1.1'],
    ],
    [
      createGeneratorFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (item: Comparable) => item,
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      createGeneratorFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (item: Record<string, Comparable>) => item['id'],
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      createGeneratorFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (item: Record<string, Comparable>) => item['name'],
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
  ];
}

function dataProviderForIterables(): Array<[Iterable<any>, ((item: any) => Comparable) | undefined, Array<any>]> {
  return [
    [
      createIterableFixture([]),
      undefined,
      [],
    ],
    [
      createIterableFixture([]),
      (item: Comparable) => item,
      [],
    ],
    [
      createIterableFixture([1]),
      undefined,
      [1],
    ],
    [
      createIterableFixture([1]),
      (item: number) => item,
      [1],
    ],
    [
      createIterableFixture([1, 1]),
      undefined,
      [1],
    ],
    [
      createIterableFixture([1, 1]),
      (item: number) => item,
      [1],
    ],
    [
      createIterableFixture([1, '1']),
      undefined,
      [1, '1'],
    ],
    [
      createIterableFixture([1, '1']),
      (item: Numeric) => item,
      [1, '1'],
    ],
    [
      createIterableFixture(['1', 1]),
      undefined,
      ['1', 1],
    ],
    [
      createIterableFixture(['1', 1]),
      (item: Numeric) => item,
      ['1', 1],
    ],
    [
      createIterableFixture(['aa', 'bb', 'aa']),
      undefined,
      ['aa', 'bb'],
    ],
    [
      createIterableFixture(['aa', 'bb', 'aa']),
      (item: string) => item,
      ['aa', 'bb'],
    ],
    [
      createIterableFixture([1, 2, 1, 2, 3]),
      undefined,
      [1, 2, 3],
    ],
    [
      createIterableFixture([1, 2, 1, 2, 3]),
      (item: number) => item,
      [1, 2, 3],
    ],
    [
      createIterableFixture(['1', 2, '1', '2', 3]),
      undefined,
      ['1', 2, '2', 3],
    ],
    [
      createIterableFixture(['1', 2, '1', '2', 3]),
      (item: Numeric) => item,
      ['1', 2, '2', 3],
    ],
    [
      createIterableFixture([false, null, undefined, 0, 0.0, '']),
      undefined,
      [false, null, undefined, 0, ''],
    ],
    [
      createIterableFixture([false, null, undefined, 0, 0.0, '']),
      (item: Comparable) => item,
      [false, null, undefined, 0, ''],
    ],
    [
      createIterableFixture([true, 1, '1', 1.0, '1.0']),
      undefined,
      [true, 1, '1', '1.0'],
    ],
    [
      createIterableFixture([true, 1, '1', 1.0, '1.0']),
      (item: Comparable) => item,
      [true, 1, '1', '1.0'],
    ],
    [
      createIterableFixture([true, 1, '1', 1.1, '1.1']),
      undefined,
      [true, 1, '1', 1.1, '1.1'],
    ],
    [
      createIterableFixture([true, 1, '1', 1.1, '1.1']),
      (item: Comparable) => item,
      [true, 1, '1', 1.1, '1.1'],
    ],
    [
      createIterableFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (item: Comparable) => item,
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      createIterableFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (item: Record<string, Comparable>) => item['id'],
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      createIterableFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (item: Record<string, Comparable>) => item['name'],
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
  ];
}

function dataProviderForIterators(): Array<[Iterator<any>, ((item: any) => Comparable) | undefined, Array<any>]> {
  return [
    [
      createIteratorFixture([]),
      undefined,
      [],
    ],
    [
      createIteratorFixture([]),
      (item: Comparable) => item,
      [],
    ],
    [
      createIteratorFixture([1]),
      undefined,
      [1],
    ],
    [
      createIteratorFixture([1]),
      (item: number) => item,
      [1],
    ],
    [
      createIteratorFixture([1, 1]),
      undefined,
      [1],
    ],
    [
      createIteratorFixture([1, 1]),
      (item: number) => item,
      [1],
    ],
    [
      createIteratorFixture([1, '1']),
      undefined,
      [1, '1'],
    ],
    [
      createIteratorFixture([1, '1']),
      (item: Numeric) => item,
      [1, '1'],
    ],
    [
      createIteratorFixture(['1', 1]),
      undefined,
      ['1', 1],
    ],
    [
      createIteratorFixture(['1', 1]),
      (item: Numeric) => item,
      ['1', 1],
    ],
    [
      createIteratorFixture(['aa', 'bb', 'aa']),
      undefined,
      ['aa', 'bb'],
    ],
    [
      createIteratorFixture(['aa', 'bb', 'aa']),
      (item: string) => item,
      ['aa', 'bb'],
    ],
    [
      createIteratorFixture([1, 2, 1, 2, 3]),
      undefined,
      [1, 2, 3],
    ],
    [
      createIteratorFixture([1, 2, 1, 2, 3]),
      (item: number) => item,
      [1, 2, 3],
    ],
    [
      createIteratorFixture(['1', 2, '1', '2', 3]),
      undefined,
      ['1', 2, '2', 3],
    ],
    [
      createIteratorFixture(['1', 2, '1', '2', 3]),
      (item: Numeric) => item,
      ['1', 2, '2', 3],
    ],
    [
      createIteratorFixture([false, null, undefined, 0, 0.0, '']),
      undefined,
      [false, null, undefined, 0, ''],
    ],
    [
      createIteratorFixture([false, null, undefined, 0, 0.0, '']),
      (item: Comparable) => item,
      [false, null, undefined, 0, ''],
    ],
    [
      createIteratorFixture([true, 1, '1', 1.0, '1.0']),
      undefined,
      [true, 1, '1', '1.0'],
    ],
    [
      createIteratorFixture([true, 1, '1', 1.0, '1.0']),
      (item: Comparable) => item,
      [true, 1, '1', '1.0'],
    ],
    [
      createIteratorFixture([true, 1, '1', 1.1, '1.1']),
      undefined,
      [true, 1, '1', 1.1, '1.1'],
    ],
    [
      createIteratorFixture([true, 1, '1', 1.1, '1.1']),
      (item: Comparable) => item,
      [true, 1, '1', 1.1, '1.1'],
    ],
    [
      createIteratorFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (item: Comparable) => item,
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      createIteratorFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (item: Record<string, Comparable>) => item['id'],
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      createIteratorFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (item: Record<string, Comparable>) => item['name'],
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
  ];
}

function dataProviderForStrings(): Array<[string, ((item: any) => Comparable) | undefined, Array<any>]> {
  return [
    [
      '',
      undefined,
      [],
    ],
    [
      '',
      (item: string) => item,
      [],
    ],
    [
      '1',
      undefined,
      ['1'],
    ],
    [
      '1',
      (item: string) => item,
      ['1'],
    ],
    [
      '11',
      undefined,
      ['1'],
    ],
    [
      '11',
      (item: string) => item,
      ['1'],
    ],
    [
      'aabacc',
      undefined,
      ['a', 'b', 'c'],
    ],
    [
      'aabacc',
      (item: string) => item,
      ['a', 'b', 'c'],
    ],
    [
      '12123',
      undefined,
      ['1', '2', '3'],
    ],
    [
      '12123',
      (item: string) => item,
      ['1', '2', '3'],
    ],
    [
      '12123',
      () => 1,
      ['1'],
    ],
  ];
}

function dataProviderForSets(): Array<[Set<any>, ((item: any) => Comparable) | undefined, Array<any>]> {
  return [
    [
      new Set([]),
      undefined,
      [],
    ],
    [
      new Set([]),
      (item: Comparable) => item,
      [],
    ],
    [
      new Set([1]),
      undefined,
      [1],
    ],
    [
      new Set([1]),
      (item: number) => item,
      [1],
    ],
    [
      new Set([1, 1]),
      undefined,
      [1],
    ],
    [
      new Set([1, 1]),
      (item: number) => item,
      [1],
    ],
    [
      new Set([1, '1']),
      undefined,
      [1, '1'],
    ],
    [
      new Set([1, '1']),
      (item: Numeric) => item,
      [1, '1'],
    ],
    [
      new Set(['1', 1]),
      undefined,
      ['1', 1],
    ],
    [
      new Set(['1', 1]),
      (item: Numeric) => item,
      ['1', 1],
    ],
    [
      new Set(['aa', 'bb', 'aa']),
      undefined,
      ['aa', 'bb'],
    ],
    [
      new Set(['aa', 'bb', 'aa']),
      (item: string) => item,
      ['aa', 'bb'],
    ],
    [
      new Set([1, 2, 1, 2, 3]),
      undefined,
      [1, 2, 3],
    ],
    [
      new Set([1, 2, 1, 2, 3]),
      (item: number) => item,
      [1, 2, 3],
    ],
    [
      new Set(['1', 2, '1', '2', 3]),
      undefined,
      ['1', 2, '2', 3],
    ],
    [
      new Set(['1', 2, '1', '2', 3]),
      (item: Numeric) => item,
      ['1', 2, '2', 3],
    ],
    [
      new Set([false, null, undefined, 0, 0.0, '']),
      undefined,
      [false, null, undefined, 0, ''],
    ],
    [
      new Set([false, null, undefined, 0, 0.0, '']),
      (item: Comparable) => item,
      [false, null, undefined, 0, ''],
    ],
    [
      new Set([true, 1, '1', 1.0, '1.0']),
      undefined,
      [true, 1, '1', '1.0'],
    ],
    [
      new Set([true, 1, '1', 1.0, '1.0']),
      (item: Comparable) => item,
      [true, 1, '1', '1.0'],
    ],
    [
      new Set([true, 1, '1', 1.1, '1.1']),
      undefined,
      [true, 1, '1', 1.1, '1.1'],
    ],
    [
      new Set([true, 1, '1', 1.1, '1.1']),
      (item: Comparable) => item,
      [true, 1, '1', 1.1, '1.1'],
    ],
    [
      new Set([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (item: Comparable) => item,
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      new Set([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (item: Record<string, Comparable>) => item['id'],
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      new Set([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (item: Record<string, Comparable>) => item['name'],
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
  ];
}

function dataProviderForMaps(): Array<[Map<any, any>, ((item: any) => Comparable) | undefined, Array<any>]> {
  return [
    [
      createMapFixture([]),
      undefined,
      [],
    ],
    [
      createMapFixture([]),
      (item: [unknown, Comparable]) => item[1],
      [],
    ],
    [
      createMapFixture([1]),
      undefined,
      [[0, 1]],
    ],
    [
      createMapFixture([1]),
      (item: [unknown, number]) => item[1],
      [[0, 1]],
    ],
    [
      createMapFixture([1, 1]),
      undefined,
      [[0, 1]],
    ],
    [
      createMapFixture([1, 1]),
      (item: [unknown, number]) => item[1],
      [[0, 1]],
    ],
    [
      createMapFixture([1, '1']),
      undefined,
      [[0, 1], [1, '1']],
    ],
    [
      createMapFixture([1, '1']),
      (item: [unknown, Numeric]) => item[1],
      [[0, 1], [1, '1']],
    ],
    [
      createMapFixture(['1', 1]),
      undefined,
      [[0, '1'], [1, 1]],
    ],
    [
      createMapFixture(['1', 1]),
      (item: [unknown, Numeric]) => item[1],
      [[0, '1'], [1, 1]],
    ],
    [
      createMapFixture(['aa', 'bb', 'aa']),
      undefined,
      [[0, 'aa'], [1, 'bb']],
    ],
    [
      createMapFixture(['aa', 'bb', 'aa']),
      (item: [unknown, string]) => item[1],
      [[0, 'aa'], [1, 'bb']],
    ],
    [
      createMapFixture([1, 2, 1, 2, 3]),
      undefined,
      [[0, 1], [1, 2], [4, 3]],
    ],
    [
      createMapFixture([1, 2, 1, 2, 3]),
      (item: [unknown, number]) => item[1],
      [[0, 1], [1, 2], [4, 3]],
    ],
    [
      createMapFixture(['1', 2, '1', '2', 3]),
      undefined,
      [[0, '1'], [1, 2], [3, '2'], [4, 3]],
    ],
    [
      createMapFixture(['1', 2, '1', '2', 3]),
      (item: [unknown, Numeric]) => item[1],
      [[0, '1'], [1, 2], [3, '2'], [4, 3]],
    ],
    [
      createMapFixture([false, null, undefined, 0, 0.0, '']),
      undefined,
      [[0, false], [1, null], [2, undefined], [3, 0], [5, '']],
    ],
    [
      createMapFixture([false, null, undefined, 0, 0.0, '']),
      (item: [unknown, Comparable]) => item[1],
      [[0, false], [1, null], [2, undefined], [3, 0], [5, '']],
    ],
    [
      createMapFixture([true, 1, '1', 1.0, '1.0']),
      undefined,
      [[0, true], [1, 1], [2, '1'], [4, '1.0']],
    ],
    [
      createMapFixture([true, 1, '1', 1.0, '1.0']),
      (item: [unknown, Comparable]) => item[1],
      [[0, true], [1, 1], [2, '1'], [4, '1.0']],
    ],
    [
      createMapFixture([true, 1, '1', 1.1, '1.1']),
      undefined,
      [[0, true], [1, 1], [2, '1'], [3, 1.1], [4, '1.1']],
    ],
    [
      createMapFixture([true, 1, '1', 1.1, '1.1']),
      (item: [unknown, Comparable]) => item[1],
      [[0, true], [1, 1], [2, '1'], [3, 1.1], [4, '1.1']],
    ],
    [
      createMapFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (item: [unknown, Comparable]) => item[1],
      [
        [0, { 'name': 'John', 'id': 1 }],
        [1, { 'name': 'Mary', 'id': 2 }],
        [2, { 'name': 'Mary', 'id': 3 }],
        [3, { 'name': 'John', 'id': 4 }],
        [4, { 'name': 'Jane', 'id': 5 }],
      ],
    ],
    [
      createMapFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (item: [unknown, Record<string, Comparable>]) => item[1]['id'],
      [
        [0, { 'name': 'John', 'id': 1 }],
        [1, { 'name': 'Mary', 'id': 2 }],
        [2, { 'name': 'Mary', 'id': 3 }],
        [3, { 'name': 'John', 'id': 4 }],
        [4, { 'name': 'Jane', 'id': 5 }],
      ],
    ],
    [
      createMapFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (item: [unknown, Record<string, Comparable>]) => item[1]['name'],
      [
        [0, { 'name': 'John', 'id': 1 }],
        [1, { 'name': 'Mary', 'id': 2 }],
        [4, { 'name': 'Jane', 'id': 5 }],
      ],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[AsyncGenerator<any>, ((item: any) => Comparable) | undefined, Array<any>]> {
  return [
    [
      createAsyncGeneratorFixture([]),
      undefined,
      [],
    ],
    [
      createAsyncGeneratorFixture([]),
      (item: Comparable) => item,
      [],
    ],
    [
      createAsyncGeneratorFixture([1]),
      undefined,
      [1],
    ],
    [
      createAsyncGeneratorFixture([1]),
      (item: number) => item,
      [1],
    ],
    [
      createAsyncGeneratorFixture([1, 1]),
      undefined,
      [1],
    ],
    [
      createAsyncGeneratorFixture([1, 1]),
      (item: number) => item,
      [1],
    ],
    [
      createAsyncGeneratorFixture([1, '1']),
      undefined,
      [1, '1'],
    ],
    [
      createAsyncGeneratorFixture([1, '1']),
      (item: Numeric) => item,
      [1, '1'],
    ],
    [
      createAsyncGeneratorFixture(['1', 1]),
      undefined,
      ['1', 1],
    ],
    [
      createAsyncGeneratorFixture(['1', 1]),
      (item: Numeric) => item,
      ['1', 1],
    ],
    [
      createAsyncGeneratorFixture(['aa', 'bb', 'aa']),
      undefined,
      ['aa', 'bb'],
    ],
    [
      createAsyncGeneratorFixture(['aa', 'bb', 'aa']),
      (item: string) => item,
      ['aa', 'bb'],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 1, 2, 3]),
      undefined,
      [1, 2, 3],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 1, 2, 3]),
      (item: number) => item,
      [1, 2, 3],
    ],
    [
      createAsyncGeneratorFixture(['1', 2, '1', '2', 3]),
      undefined,
      ['1', 2, '2', 3],
    ],
    [
      createAsyncGeneratorFixture(['1', 2, '1', '2', 3]),
      (item: Numeric) => item,
      ['1', 2, '2', 3],
    ],
    [
      createAsyncGeneratorFixture([false, null, undefined, 0, 0.0, '']),
      undefined,
      [false, null, undefined, 0, ''],
    ],
    [
      createAsyncGeneratorFixture([false, null, undefined, 0, 0.0, '']),
      (item: Comparable) => item,
      [false, null, undefined, 0, ''],
    ],
    [
      createAsyncGeneratorFixture([true, 1, '1', 1.0, '1.0']),
      undefined,
      [true, 1, '1', '1.0'],
    ],
    [
      createAsyncGeneratorFixture([true, 1, '1', 1.0, '1.0']),
      (item: Comparable) => item,
      [true, 1, '1', '1.0'],
    ],
    [
      createAsyncGeneratorFixture([true, 1, '1', 1.1, '1.1']),
      undefined,
      [true, 1, '1', 1.1, '1.1'],
    ],
    [
      createAsyncGeneratorFixture([true, 1, '1', 1.1, '1.1']),
      (item: Comparable) => item,
      [true, 1, '1', 1.1, '1.1'],
    ],
    [
      createAsyncGeneratorFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (item: Comparable) => item,
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      createAsyncGeneratorFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (item: Record<string, Comparable>) => item['id'],
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      createAsyncGeneratorFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (item: Record<string, Comparable>) => item['name'],
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[AsyncIterable<any>, ((item: any) => Comparable) | undefined, Array<any>]> {
  return [
    [
      createAsyncIterableFixture([]),
      undefined,
      [],
    ],
    [
      createAsyncIterableFixture([]),
      (item: Comparable) => item,
      [],
    ],
    [
      createAsyncIterableFixture([1]),
      undefined,
      [1],
    ],
    [
      createAsyncIterableFixture([1]),
      (item: number) => item,
      [1],
    ],
    [
      createAsyncIterableFixture([1, 1]),
      undefined,
      [1],
    ],
    [
      createAsyncIterableFixture([1, 1]),
      (item: number) => item,
      [1],
    ],
    [
      createAsyncIterableFixture([1, '1']),
      undefined,
      [1, '1'],
    ],
    [
      createAsyncIterableFixture([1, '1']),
      (item: Numeric) => item,
      [1, '1'],
    ],
    [
      createAsyncIterableFixture(['1', 1]),
      undefined,
      ['1', 1],
    ],
    [
      createAsyncIterableFixture(['1', 1]),
      (item: Numeric) => item,
      ['1', 1],
    ],
    [
      createAsyncIterableFixture(['aa', 'bb', 'aa']),
      undefined,
      ['aa', 'bb'],
    ],
    [
      createAsyncIterableFixture(['aa', 'bb', 'aa']),
      (item: string) => item,
      ['aa', 'bb'],
    ],
    [
      createAsyncIterableFixture([1, 2, 1, 2, 3]),
      undefined,
      [1, 2, 3],
    ],
    [
      createAsyncIterableFixture([1, 2, 1, 2, 3]),
      (item: number) => item,
      [1, 2, 3],
    ],
    [
      createAsyncIterableFixture(['1', 2, '1', '2', 3]),
      undefined,
      ['1', 2, '2', 3],
    ],
    [
      createAsyncIterableFixture(['1', 2, '1', '2', 3]),
      (item: Numeric) => item,
      ['1', 2, '2', 3],
    ],
    [
      createAsyncIterableFixture([false, null, undefined, 0, 0.0, '']),
      undefined,
      [false, null, undefined, 0, ''],
    ],
    [
      createAsyncIterableFixture([false, null, undefined, 0, 0.0, '']),
      (item: Comparable) => item,
      [false, null, undefined, 0, ''],
    ],
    [
      createAsyncIterableFixture([true, 1, '1', 1.0, '1.0']),
      undefined,
      [true, 1, '1', '1.0'],
    ],
    [
      createAsyncIterableFixture([true, 1, '1', 1.0, '1.0']),
      (item: Comparable) => item,
      [true, 1, '1', '1.0'],
    ],
    [
      createAsyncIterableFixture([true, 1, '1', 1.1, '1.1']),
      undefined,
      [true, 1, '1', 1.1, '1.1'],
    ],
    [
      createAsyncIterableFixture([true, 1, '1', 1.1, '1.1']),
      (item: Comparable) => item,
      [true, 1, '1', 1.1, '1.1'],
    ],
    [
      createAsyncIterableFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (item: Comparable) => item,
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      createAsyncIterableFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (item: Record<string, Comparable>) => item['id'],
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      createAsyncIterableFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (item: Record<string, Comparable>) => item['name'],
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[AsyncIterator<any>, ((item: any) => Comparable) | undefined, Array<any>]> {
  return [
    [
      createAsyncIteratorFixture([]),
      undefined,
      [],
    ],
    [
      createAsyncIteratorFixture([]),
      (item: Comparable) => item,
      [],
    ],
    [
      createAsyncIteratorFixture([1]),
      undefined,
      [1],
    ],
    [
      createAsyncIteratorFixture([1]),
      (item: number) => item,
      [1],
    ],
    [
      createAsyncIteratorFixture([1, 1]),
      undefined,
      [1],
    ],
    [
      createAsyncIteratorFixture([1, 1]),
      (item: number) => item,
      [1],
    ],
    [
      createAsyncIteratorFixture([1, '1']),
      undefined,
      [1, '1'],
    ],
    [
      createAsyncIteratorFixture([1, '1']),
      (item: Numeric) => item,
      [1, '1'],
    ],
    [
      createAsyncIteratorFixture(['1', 1]),
      undefined,
      ['1', 1],
    ],
    [
      createAsyncIteratorFixture(['1', 1]),
      (item: Numeric) => item,
      ['1', 1],
    ],
    [
      createAsyncIteratorFixture(['aa', 'bb', 'aa']),
      undefined,
      ['aa', 'bb'],
    ],
    [
      createAsyncIteratorFixture(['aa', 'bb', 'aa']),
      (item: string) => item,
      ['aa', 'bb'],
    ],
    [
      createAsyncIteratorFixture([1, 2, 1, 2, 3]),
      undefined,
      [1, 2, 3],
    ],
    [
      createAsyncIteratorFixture([1, 2, 1, 2, 3]),
      (item: number) => item,
      [1, 2, 3],
    ],
    [
      createAsyncIteratorFixture(['1', 2, '1', '2', 3]),
      undefined,
      ['1', 2, '2', 3],
    ],
    [
      createAsyncIteratorFixture(['1', 2, '1', '2', 3]),
      (item: Numeric) => item,
      ['1', 2, '2', 3],
    ],
    [
      createAsyncIteratorFixture([false, null, undefined, 0, 0.0, '']),
      undefined,
      [false, null, undefined, 0, ''],
    ],
    [
      createAsyncIteratorFixture([false, null, undefined, 0, 0.0, '']),
      (item: Comparable) => item,
      [false, null, undefined, 0, ''],
    ],
    [
      createAsyncIteratorFixture([true, 1, '1', 1.0, '1.0']),
      undefined,
      [true, 1, '1', '1.0'],
    ],
    [
      createAsyncIteratorFixture([true, 1, '1', 1.0, '1.0']),
      (item: Comparable) => item,
      [true, 1, '1', '1.0'],
    ],
    [
      createAsyncIteratorFixture([true, 1, '1', 1.1, '1.1']),
      undefined,
      [true, 1, '1', 1.1, '1.1'],
    ],
    [
      createAsyncIteratorFixture([true, 1, '1', 1.1, '1.1']),
      (item: Comparable) => item,
      [true, 1, '1', 1.1, '1.1'],
    ],
    [
      createAsyncIteratorFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (item: Comparable) => item,
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      createAsyncIteratorFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (item: Record<string, Comparable>) => item['id'],
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      createAsyncIteratorFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (item: Record<string, Comparable>) => item['name'],
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
  ];
}
