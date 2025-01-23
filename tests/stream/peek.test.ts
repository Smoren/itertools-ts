// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { NumericString, Stream } from '../../src';

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])(
  "Stream Peek Test",
  (input, leftChainFunc, rightChainFunc, expectedPeeked, expectedResult) => {
    it("", () => {
      // Given
      const stream = leftChainFunc(input as any);
      const peeked: Array<unknown> = [];

      // When
      stream.peek((item) => {
        peeked.push(item);
      });

      // And when
      const result = rightChainFunc(stream).toArray();

      // Then
      expect(peeked).toEqual(expectedPeeked);
      expect(result).toEqual(expectedResult);
    });
  }
);

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])(
  "Stream Peek Stream Test",
  (input, leftChainFunc, rightChainFunc, expectedPeeked, expectedResult) => {
    it("", () => {
      // Given
      const stream = leftChainFunc(input as any);
      const peeked: Array<unknown> = [];

      // When
      stream.peekStream((stream) => {
        for (const item of stream) {
          peeked.push(item);
        }
      });

      // And when
      const result = rightChainFunc(stream).toArray();

      // Then
      expect(peeked).toEqual(expectedPeeked);
      expect(result).toEqual(expectedResult);
    });
  }
);

function dataProviderForArrays(): Array<[Array<any>, (iterable: Array<any>) => Stream<any>, (stream: Stream<any>) => Stream<any>, any[], any[]]> {
  return [
    [
      [],
      (iterable: Array<number>): Stream<number> => Stream.of(iterable),
      (stream: Stream<number>): Stream<number> => stream,
      [],
      [],
    ],
    [
      [5, 4, 3, 2, 1],
      (iterable: Array<number>): Stream<number> => Stream.of(iterable),
      (stream: Stream<number>): Stream<number> => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      [],
      (iterable: Array<number>): Stream<number> => Stream.of(iterable),
      (stream: Stream<number>): Stream<number> => stream.sort(),
      [],
      [],
    ],
    [
      [5, 4, 3, 2, 1],
      (iterable: Array<number>): Stream<number> => Stream.of(iterable),
      (stream: Stream<number>): Stream<number> => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      [],
      (iterable: Array<number>): Stream<number> => Stream.of(iterable).sort(),
      (stream: Stream<number>): Stream<number> => stream,
      [],
      [],
    ],
    [
      [5, 4, 3, 2, 1],
      (iterable: Array<number>): Stream<number> => Stream.of(iterable).sort(),
      (stream: Stream<number>): Stream<number> => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      [],
      (iterable: Array<number>): Stream<[number, number]> => Stream.of(iterable).zipWith([11, 22, 33, 44, 55]),
      (stream: Stream<[number, number]>): Stream<[number, number]> => stream.limit(3),
      [],
      [],
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable: Array<number>): Stream<[number, number]> => Stream.of(iterable).zipWith([11, 22, 33, 44, 55]),
      (stream: Stream<[number, number]>): Stream<[number, number]> => stream.limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      [],
      (iterable: Array<number>): Stream<number> => Stream.of(iterable)
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream: Stream<number>): Stream<[number, number]> => stream
        .map((x) => x + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      [9, 8, 7, 6, 5, 4, 3, 2, 1],
      (iterable: Array<number>): Stream<number> => Stream.of(iterable)
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream: Stream<number>): Stream<[number, number]> => stream
        .map((x) => x + 1)
        .pairwise(),
      [1, 3, 5, 7, 9],
      [[2, 4], [4, 6], [6, 8], [8, 10]],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<any>, (iterable: Generator<any>) => Stream<any>, (stream: Stream<any>) => Stream<any>, any[], any[]]> {
  return dataProviderForArrays().map((item) => [
    createGeneratorFixture(item[0]),
    ...item.slice(1) as [(iterable: any) => Stream<any>, (stream: Stream<any>) => Stream<any>, any[], any[]],
  ]);
}

function dataProviderForIterables(): Array<[Iterable<any>, (iterable: Iterable<any>) => Stream<any>, (stream: Stream<any>) => Stream<any>, any[], any[]]> {
  return dataProviderForArrays().map((item) => [
    createIterableFixture(item[0]),
    ...item.slice(1) as [(iterable: any) => Stream<any>, (stream: Stream<any>) => Stream<any>, any[], any[]],
  ]);
}

function dataProviderForIterators(): Array<[Iterator<any>, (iterable: Iterator<any>) => Stream<any>, (stream: Stream<any>) => Stream<any>, any[], any[]]> {
  return dataProviderForArrays().map((item) => [
    createIteratorFixture(item[0]),
    ...item.slice(1) as [(iterable: any) => Stream<any>, (stream: Stream<any>) => Stream<any>, any[], any[]],
  ]);
}

function dataProviderForStrings(): Array<[string, (iterable: string) => Stream<any>, (stream: Stream<any>) => Stream<any>, any[], any[]]> {
  return [
    [
      '',
      (iterable: string): Stream<string> => Stream.of(iterable),
      (stream: Stream<string>): Stream<string> => stream,
      [],
      [],
    ],
    [
      '54321',
      (iterable: string): Stream<string> => Stream.of(iterable),
      (stream: Stream<string>): Stream<string> => stream,
      ['5', '4', '3', '2', '1'],
      ['5', '4', '3', '2', '1'],
    ],
    [
      '',
      (iterable: string): Stream<string> => Stream.of(iterable),
      (stream: Stream<string>): Stream<string> => stream.sort(),
      [],
      [],
    ],
    [
      '54321',
      (iterable: string): Stream<string> => Stream.of(iterable),
      (stream: Stream<string>): Stream<string> => stream.sort(),
      ['5', '4', '3', '2', '1'],
      ['1', '2', '3', '4', '5'],
    ],
    [
      '',
      (iterable: string): Stream<string> => Stream.of(iterable).sort(),
      (stream: Stream<string>): Stream<string> => stream,
      [],
      [],
    ],
    [
      '54321',
      (iterable: string): Stream<string> => Stream.of(iterable).sort(),
      (stream: Stream<string>): Stream<string> => stream,
      ['1', '2', '3', '4', '5'],
      ['1', '2', '3', '4', '5'],
    ],
    [
      '',
      (iterable: string): Stream<[string, number]> => Stream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: Stream<[string, number]>): Stream<[string, number]> => stream
        .limit(3),
      [],
      [],
    ],
    [
      '12345',
      (iterable: string): Stream<[string, string]> => Stream.of(iterable)
        .zipWith('abcde'),
      (stream: Stream<[string, string]>): Stream<[string, string]> => stream
        .limit(3),
      [['1', 'a'], ['2', 'b'], ['3', 'c'], ['4', 'd'], ['5', 'e']],
      [['1', 'a'], ['2', 'b'], ['3', 'c']],
    ],
    [
      '',
      (iterable: string): Stream<string> => Stream.of(iterable)
        .filter((x) => Number(x) % 2 !== 0)
        .sort(),
      (stream: Stream<number>): Stream<[number, number]> => stream
        .map((x) => x + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      '987654321',
      (iterable: string): Stream<string> => Stream.of(iterable)
        .filter((x) => Number(x) % 2 !== 0)
        .sort(),
      (stream: Stream<string>): Stream<[number, number]> => stream
        .map((x) => Number(x) + 1)
        .pairwise(),
      ['1', '3', '5', '7', '9'],
      [[2, 4], [4, 6], [6, 8], [8, 10]],
    ],
  ];
}

function dataProviderForSets(): Array<[Set<any>, (iterable: Set<any>) => Stream<any>, (stream: Stream<any>) => Stream<any>, any[], any[]]> {
  return [
    [
      new Set([]),
      (iterable: Set<number>): Stream<number> => Stream.of(iterable),
      (stream: Stream<number>): Stream<number> => stream,
      [],
      [],
    ],
    [
      new Set([5, 4, 3, 2, 1]),
      (iterable: Set<number>): Stream<number> => Stream.of(iterable),
      (stream: Stream<number>): Stream<number> => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      new Set([]),
      (iterable: Set<number>): Stream<number> => Stream.of(iterable),
      (stream: Stream<number>): Stream<number> => stream.sort(),
      [],
      [],
    ],
    [
      new Set([5, 4, 3, 2, 1]),
      (iterable: Set<number>): Stream<number> => Stream.of(iterable),
      (stream: Stream<number>): Stream<number> => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      new Set([]),
      (iterable: Set<number>): Stream<number> => Stream.of(iterable).sort(),
      (stream: Stream<number>): Stream<number> => stream,
      [],
      [],
    ],
    [
      new Set([5, 4, 3, 2, 1]),
      (iterable: Set<number>): Stream<number> => Stream.of(iterable).sort(),
      (stream: Stream<number>): Stream<number> => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      new Set([]),
      (iterable: Set<number>): Stream<[number, number]> => Stream.of(iterable).zipWith([11, 22, 33, 44, 55]),
      (stream: Stream<[number, number]>): Stream<[number, number]> => stream.limit(3),
      [],
      [],
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      (iterable: Set<number>): Stream<[number, number]> => Stream.of(iterable).zipWith([11, 22, 33, 44, 55]),
      (stream: Stream<[number, number]>): Stream<[number, number]> => stream.limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      new Set([]),
      (iterable: Set<number>): Stream<number> => Stream.of(iterable)
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream: Stream<number>): Stream<[number, number]> => stream
        .map((x) => x + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      new Set([9, 8, 7, 6, 5, 4, 3, 2, 1]),
      (iterable: Set<number>): Stream<number> => Stream.of(iterable)
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream: Stream<number>): Stream<[number, number]> => stream
        .map((x) => x + 1)
        .pairwise(),
      [1, 3, 5, 7, 9],
      [[2, 4], [4, 6], [6, 8], [8, 10]],
    ],
  ];
}

function dataProviderForMaps(): Array<[Map<any, any>, (iterable: Map<any, any>) => Stream<any>, (stream: Stream<any>) => Stream<any>, any[], any[]]> {
  return [
    [
      createMapFixture([]),
      (iterable: Map<number, number>): Stream<[number, number]> => Stream.of(iterable),
      (stream: Stream<[number, number]>): Stream<[number, number]> => stream,
      [],
      [],
    ],
    [
      createMapFixture([5, 4, 3, 2, 1]),
      (iterable: Map<number, number>): Stream<[number, number]> => Stream.of(iterable),
      (stream: Stream<[number, number]>): Stream<[number, number]> => stream,
      [[0, 5], [1, 4], [2, 3], [3, 2], [4, 1]],
      [[0, 5], [1, 4], [2, 3], [3, 2], [4, 1]],
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, number>): Stream<[number, number]> => Stream.of(iterable),
      (stream: Stream<[number, number]>): Stream<[number, number]> => stream.sort((lhs, rhs) => lhs[1] - rhs[1]),
      [],
      [],
    ],
    [
      createMapFixture([5, 4, 3, 2, 1]),
      (iterable: Map<number, number>): Stream<[number, number]> => Stream.of(iterable),
      (stream: Stream<[number, number]>): Stream<[number, number]> => stream.sort((lhs, rhs) => lhs[1] - rhs[1]),
      [[0, 5], [1, 4], [2, 3], [3, 2], [4, 1]],
      [[4, 1], [3, 2], [2, 3], [1, 4], [0, 5]],
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, number>): Stream<[number, number]> => Stream.of(iterable)
        .sort((lhs, rhs) => lhs[1] - rhs[1]),
      (stream: Stream<[number, number]>): Stream<[number, number]> => stream,
      [],
      [],
    ],
    [
      createMapFixture([5, 4, 3, 2, 1]),
      (iterable: Map<number, number>): Stream<[number, number]> => Stream.of(iterable)
        .sort((lhs, rhs) => lhs[1] - rhs[1]),
      (stream: Stream<[number, number]>): Stream<[number, number]> => stream,
      [[4, 1], [3, 2], [2, 3], [1, 4], [0, 5]],
      [[4, 1], [3, 2], [2, 3], [1, 4], [0, 5]],
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, number>): Stream<[[number, number], number]> => Stream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: Stream<[number, number]>): Stream<[number, number]> => stream
        .limit(3),
      [],
      [],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable: Map<number, number>): Stream<[number, number]> => Stream.of(iterable)
        .values()
        .zipWith([11, 22, 33, 44, 55]),
      (stream: Stream<[number, number]>): Stream<[number, number]> => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, number>): Stream<number> => Stream.of(iterable)
        .values()
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream: Stream<number>): Stream<[number, number]> => stream
        .map((x) => x + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      createMapFixture([9, 8, 7, 6, 5, 4, 3, 2, 1]),
      (iterable: Map<number, number>): Stream<number> => Stream.of(iterable)
        .values()
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream: Stream<number>): Stream<[number, number]> => stream
        .map((x) => x + 1)
        .pairwise(),
      [1, 3, 5, 7, 9],
      [[2, 4], [4, 6], [6, 8], [8, 10]],
    ],
  ];
}
