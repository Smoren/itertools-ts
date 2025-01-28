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
  // ...dataProviderForStrings(),
  // ...dataProviderForSets(),
  // ...dataProviderForMaps(),
])(
  "Set Permutations Test",
  (input, len, expected) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of set.permutations(input, len)) {
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
  // ...dataProviderForStrings(),
  // ...dataProviderForSets(),
  // ...dataProviderForMaps(),
])(
  "Set Permutations Async Test",
  (input, len, expected) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of set.permutationsAsync(input, len)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<[Array<any>, number, Array<any>]> {
  return [
    [
      [],
      0,
      [[]],
    ],
    [
      [1],
      0,
      [[]],
    ],
    [
      [1, 2, 3],
      0,
      [[]],
    ],
    [
      [],
      1,
      [],
    ],
    [
      [1],
      1,
      [[1]],
    ],
    [
      [1, 2],
      1,
      [[1], [2]],
    ],
    [
      [1, 2],
      2,
      [[1, 2], [2, 1]],
    ],
    [
      [1, 2],
      3,
      [],
    ],
    [
      [1, 2, 3],
      1,
      [[1], [2], [3]],
    ],
    [
      [1, 2, 3],
      2,
      [[1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 2]],
    ],
    [
      [1, 2, 3],
      3,
      [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]],
    ],
    [
      [1, 2, 3],
      4,
      [],
    ],
    [
      [1, 1, 2],
      2,
      [[1, 1], [1, 2], [1, 1], [1, 2], [2, 1], [2, 1]],
    ],
    [
      [1, 1, 1],
      2,
      [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]],
    ],
    [
      ['A', 'B', 'C'],
      2,
      [
        ['A', 'B'],
        ['A', 'C'],
        ['B', 'A'],
        ['B', 'C'],
        ['C', 'A'],
        ['C', 'B'],
      ],
    ],
    [
      ['apple', 'banana', 'cherry'],
      2,
      [
        ['apple', 'banana'],
        ['apple', 'cherry'],
        ['banana', 'apple'],
        ['banana', 'cherry'],
        ['cherry', 'apple'],
        ['cherry', 'banana'],
      ],
    ],
    [
      [1, 'two', 3],
      2,
      [
        [1, 'two'],
        [1, 3],
        ['two', 1],
        ['two', 3],
        [3, 1],
        [3, 'two'],
      ],
    ],
    [
      [{ id: 1 }, { id: 2 }, { id: 3 }],
      2,
      [
        [{ id: 1 }, { id: 2 }],
        [{ id: 1 }, { id: 3 }],
        [{ id: 2 }, { id: 1 }],
        [{ id: 2 }, { id: 3 }],
        [{ id: 3 }, { id: 1 }],
        [{ id: 3 }, { id: 2 }],
      ],
    ],
    [
      [1, 2, 3, 4],
      2,
      [
        [1, 2],
        [1, 3],
        [1, 4],
        [2, 1],
        [2, 3],
        [2, 4],
        [3, 1],
        [3, 2],
        [3, 4],
        [4, 1],
        [4, 2],
        [4, 3],
      ],
    ],
    [
      [1, 2, 3, 4],
      3,
      [
        [1, 2, 3],
        [1, 2, 4],
        [1, 3, 2],
        [1, 3, 4],
        [1, 4, 2],
        [1, 4, 3],
        [2, 1, 3],
        [2, 1, 4],
        [2, 3, 1],
        [2, 3, 4],
        [2, 4, 1],
        [2, 4, 3],
        [3, 1, 2],
        [3, 1, 4],
        [3, 2, 1],
        [3, 2, 4],
        [3, 4, 1],
        [3, 4, 2],
        [4, 1, 2],
        [4, 1, 3],
        [4, 2, 1],
        [4, 2, 3],
        [4, 3, 1],
        [4, 3, 2],
      ],
    ],
    [
      ['a', 'b', 'c'],
      0,
      [[]],
    ],
    [
      [null, undefined, 0],
      2,
      [
        [null, undefined],
        [null, 0],
        [undefined, null],
        [undefined, 0],
        [0, null],
        [0, undefined],
      ],
    ],
    [
      [42, 42, 42],
      2,
      [
        [42, 42],
        [42, 42],
        [42, 42],
        [42, 42],
        [42, 42],
        [42, 42],
      ],
    ],
    [
      [true, false],
      2,
      [
        [true, false],
        [false, true],
      ],
    ],
    [
      [true, 'string', 123, null],
      1,
      [[true], ['string'], [123], [null]],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<any>, number, Array<any>]> {
  return dataProviderForArrays().map((item) => [
    createGeneratorFixture(item[0]),
    ...item.slice(1) as [number, Array<any>],
  ]);
}

function dataProviderForIterables(): Array<[Iterable<any>, number, Array<any>]> {
  return dataProviderForArrays().map((item) => [
    createIterableFixture(item[0]),
    ...item.slice(1) as [number, Array<any>],
  ]);
}

function dataProviderForIterators(): Array<[Iterator<any>, number, Array<any>]> {
  return dataProviderForArrays().map((item) => [
    createIteratorFixture(item[0]),
    ...item.slice(1) as [number, Array<any>],
  ]);
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

function dataProviderForAsyncGenerators(): Array<[AsyncGenerator<any>, number, Array<any>]> {
  return dataProviderForArrays().map((item) => [
    createAsyncGeneratorFixture(item[0]),
    ...item.slice(1) as [number, Array<any>],
  ]);
}

function dataProviderForAsyncIterables(): Array<[AsyncIterable<any>, number, Array<any>]> {
  return dataProviderForArrays().map((item) => [
    createAsyncIterableFixture(item[0]),
    ...item.slice(1) as [number, Array<any>],
  ]);
}

function dataProviderForAsyncIterators(): Array<[AsyncIterator<any>, number, Array<any>]> {
  return dataProviderForArrays().map((item) => [
    createAsyncIteratorFixture(item[0]),
    ...item.slice(1) as [number, Array<any>],
  ]);
}
