import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture,
  // @ts-ignore
} from "../fixture";
import { AsyncStream } from '../../src';

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
  "AsyncStream Peek Test",
  (input, leftChainFunc, rightChainFunc, expectedPeeked, expectedResult) => {
    it("", async () => {
      // Given
      const stream = leftChainFunc(input as any);
      const peeked: Array<unknown> = [];

      // When
      stream.peek((item) => {
        peeked.push(item);
      });

      // And when
      const result = await rightChainFunc(stream).toArray();

      // Then
      expect(peeked).toEqual(expectedPeeked);
      expect(result).toEqual(expectedResult);
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
  "AsyncStream Peek Stream Test",
  (input, leftChainFunc, rightChainFunc, expectedPeeked, expectedResult) => {
    it("", async () => {
      // Given
      const stream = leftChainFunc(input as any);
      const peeked: Array<unknown> = [];

      // When
      stream.peekStream(async (stream) => {
        for await (const item of stream) {
          peeked.push(item);
        }
      });

      // And when
      const result = await rightChainFunc(stream).toArray();

      // Then
      expect(peeked).toEqual(expectedPeeked);
      expect(result).toEqual(expectedResult);
    });
  }
);

function dataProviderForArrays(): Array<[Array<any>, (iterable: Array<any>) => AsyncStream<any>, (stream: AsyncStream<any>) => AsyncStream<any>, any[], any[]]> {
  return [
    [
      [],
      (iterable: Array<number>): AsyncStream<number> => AsyncStream.of(iterable),
      (stream: AsyncStream<number>): AsyncStream<number> => stream,
      [],
      [],
    ],
    [
      [5, 4, 3, 2, 1],
      (iterable: Array<number>): AsyncStream<number> => AsyncStream.of(iterable),
      (stream: AsyncStream<number>): AsyncStream<number> => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      [],
      (iterable: Array<number>): AsyncStream<number> => AsyncStream.of(iterable),
      (stream: AsyncStream<number>): AsyncStream<number> => stream.sort(),
      [],
      [],
    ],
    [
      [5, 4, 3, 2, 1],
      (iterable: Array<number>): AsyncStream<number> => AsyncStream.of(iterable),
      (stream: AsyncStream<number>): AsyncStream<number> => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      [],
      (iterable: Array<number>): AsyncStream<number> => AsyncStream.of(iterable).sort(),
      (stream: AsyncStream<number>): AsyncStream<number> => stream,
      [],
      [],
    ],
    [
      [5, 4, 3, 2, 1],
      (iterable: Array<number>): AsyncStream<number> => AsyncStream.of(iterable).sort(),
      (stream: AsyncStream<number>): AsyncStream<number> => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      [],
      (iterable: Array<number>): AsyncStream<[number, number]> => AsyncStream.of(iterable).zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<[number, number]>): AsyncStream<[number, number]> => stream.limit(3),
      [],
      [],
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable: Array<number>): AsyncStream<[number, number]> => AsyncStream.of(iterable).zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<[number, number]>): AsyncStream<[number, number]> => stream.limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      [],
      (iterable: Array<number>): AsyncStream<number> => AsyncStream.of(iterable)
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream: AsyncStream<number>): AsyncStream<[number, number]> => stream
        .map((x) => x + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      [9, 8, 7, 6, 5, 4, 3, 2, 1],
      (iterable: Array<number>): AsyncStream<number> => AsyncStream.of(iterable)
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream: AsyncStream<number>): AsyncStream<[number, number]> => stream
        .map((x) => x + 1)
        .pairwise(),
      [1, 3, 5, 7, 9],
      [[2, 4], [4, 6], [6, 8], [8, 10]],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<any>, (iterable: Generator<any>) => AsyncStream<any>, (stream: AsyncStream<any>) => AsyncStream<any>, any[], any[]]> {
  return dataProviderForArrays().map((item) => [
    createGeneratorFixture(item[0]),
    ...item.slice(1) as [(iterable: any) => AsyncStream<any>, (stream: AsyncStream<any>) => AsyncStream<any>, any[], any[]],
  ]);
}

function dataProviderForIterables(): Array<[Iterable<any>, (iterable: Iterable<any>) => AsyncStream<any>, (stream: AsyncStream<any>) => AsyncStream<any>, any[], any[]]> {
  return dataProviderForArrays().map((item) => [
    createIterableFixture(item[0]),
    ...item.slice(1) as [(iterable: any) => AsyncStream<any>, (stream: AsyncStream<any>) => AsyncStream<any>, any[], any[]],
  ]);
}

function dataProviderForIterators(): Array<[Iterator<any>, (iterable: Iterator<any>) => AsyncStream<any>, (stream: AsyncStream<any>) => AsyncStream<any>, any[], any[]]> {
  return dataProviderForArrays().map((item) => [
    createIteratorFixture(item[0]),
    ...item.slice(1) as [(iterable: any) => AsyncStream<any>, (stream: AsyncStream<any>) => AsyncStream<any>, any[], any[]],
  ]);
}

function dataProviderForStrings(): Array<[string, (iterable: string) => AsyncStream<any>, (stream: AsyncStream<any>) => AsyncStream<any>, any[], any[]]> {
  return [
    [
      '',
      (iterable: string): AsyncStream<string> => AsyncStream.of(iterable),
      (stream: AsyncStream<string>): AsyncStream<string> => stream,
      [],
      [],
    ],
    [
      '54321',
      (iterable: string): AsyncStream<string> => AsyncStream.of(iterable),
      (stream: AsyncStream<string>): AsyncStream<string> => stream,
      ['5', '4', '3', '2', '1'],
      ['5', '4', '3', '2', '1'],
    ],
    [
      '',
      (iterable: string): AsyncStream<string> => AsyncStream.of(iterable),
      (stream: AsyncStream<string>): AsyncStream<string> => stream.sort(),
      [],
      [],
    ],
    [
      '54321',
      (iterable: string): AsyncStream<string> => AsyncStream.of(iterable),
      (stream: AsyncStream<string>): AsyncStream<string> => stream.sort(),
      ['5', '4', '3', '2', '1'],
      ['1', '2', '3', '4', '5'],
    ],
    [
      '',
      (iterable: string): AsyncStream<string> => AsyncStream.of(iterable).sort(),
      (stream: AsyncStream<string>): AsyncStream<string> => stream,
      [],
      [],
    ],
    [
      '54321',
      (iterable: string): AsyncStream<string> => AsyncStream.of(iterable).sort(),
      (stream: AsyncStream<string>): AsyncStream<string> => stream,
      ['1', '2', '3', '4', '5'],
      ['1', '2', '3', '4', '5'],
    ],
    [
      '',
      (iterable: string): AsyncStream<[string, number]> => AsyncStream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<[string, number]>): AsyncStream<[string, number]> => stream
        .limit(3),
      [],
      [],
    ],
    [
      '12345',
      (iterable: string): AsyncStream<[string, string]> => AsyncStream.of(iterable)
        .zipWith('abcde'),
      (stream: AsyncStream<[string, string]>): AsyncStream<[string, string]> => stream
        .limit(3),
      [['1', 'a'], ['2', 'b'], ['3', 'c'], ['4', 'd'], ['5', 'e']],
      [['1', 'a'], ['2', 'b'], ['3', 'c']],
    ],
    [
      '',
      (iterable: string): AsyncStream<string> => AsyncStream.of(iterable)
        .filter((x) => Number(x) % 2 !== 0)
        .sort(),
      (stream: AsyncStream<number>): AsyncStream<[number, number]> => stream
        .map((x) => x + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      '987654321',
      (iterable: string): AsyncStream<string> => AsyncStream.of(iterable)
        .filter((x) => Number(x) % 2 !== 0)
        .sort(),
      (stream: AsyncStream<string>): AsyncStream<[number, number]> => stream
        .map((x) => Number(x) + 1)
        .pairwise(),
      ['1', '3', '5', '7', '9'],
      [[2, 4], [4, 6], [6, 8], [8, 10]],
    ],
  ];
}

function dataProviderForSets(): Array<[Set<any>, (iterable: Set<any>) => AsyncStream<any>, (stream: AsyncStream<any>) => AsyncStream<any>, any[], any[]]> {
  return [
    [
      new Set([]),
      (iterable: Set<number>): AsyncStream<number> => AsyncStream.of(iterable),
      (stream: AsyncStream<number>): AsyncStream<number> => stream,
      [],
      [],
    ],
    [
      new Set([5, 4, 3, 2, 1]),
      (iterable: Set<number>): AsyncStream<number> => AsyncStream.of(iterable),
      (stream: AsyncStream<number>): AsyncStream<number> => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      new Set([]),
      (iterable: Set<number>): AsyncStream<number> => AsyncStream.of(iterable),
      (stream: AsyncStream<number>): AsyncStream<number> => stream.sort(),
      [],
      [],
    ],
    [
      new Set([5, 4, 3, 2, 1]),
      (iterable: Set<number>): AsyncStream<number> => AsyncStream.of(iterable),
      (stream: AsyncStream<number>): AsyncStream<number> => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      new Set([]),
      (iterable: Set<number>): AsyncStream<number> => AsyncStream.of(iterable).sort(),
      (stream: AsyncStream<number>): AsyncStream<number> => stream,
      [],
      [],
    ],
    [
      new Set([5, 4, 3, 2, 1]),
      (iterable: Set<number>): AsyncStream<number> => AsyncStream.of(iterable).sort(),
      (stream: AsyncStream<number>): AsyncStream<number> => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      new Set([]),
      (iterable: Set<number>): AsyncStream<[number, number]> => AsyncStream.of(iterable).zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<[number, number]>): AsyncStream<[number, number]> => stream.limit(3),
      [],
      [],
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      (iterable: Set<number>): AsyncStream<[number, number]> => AsyncStream.of(iterable).zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<[number, number]>): AsyncStream<[number, number]> => stream.limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      new Set([]),
      (iterable: Set<number>): AsyncStream<number> => AsyncStream.of(iterable)
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream: AsyncStream<number>): AsyncStream<[number, number]> => stream
        .map((x) => x + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      new Set([9, 8, 7, 6, 5, 4, 3, 2, 1]),
      (iterable: Set<number>): AsyncStream<number> => AsyncStream.of(iterable)
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream: AsyncStream<number>): AsyncStream<[number, number]> => stream
        .map((x) => x + 1)
        .pairwise(),
      [1, 3, 5, 7, 9],
      [[2, 4], [4, 6], [6, 8], [8, 10]],
    ],
  ];
}

function dataProviderForMaps(): Array<[Map<any, any>, (iterable: Map<any, any>) => AsyncStream<any>, (stream: AsyncStream<any>) => AsyncStream<any>, any[], any[]]> {
  return [
    [
      createMapFixture([]),
      (iterable: Map<number, number>): AsyncStream<[number, number]> => AsyncStream.of(iterable),
      (stream: AsyncStream<[number, number]>): AsyncStream<[number, number]> => stream,
      [],
      [],
    ],
    [
      createMapFixture([5, 4, 3, 2, 1]),
      (iterable: Map<number, number>): AsyncStream<[number, number]> => AsyncStream.of(iterable),
      (stream: AsyncStream<[number, number]>): AsyncStream<[number, number]> => stream,
      [[0, 5], [1, 4], [2, 3], [3, 2], [4, 1]],
      [[0, 5], [1, 4], [2, 3], [3, 2], [4, 1]],
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, number>): AsyncStream<[number, number]> => AsyncStream.of(iterable),
      (stream: AsyncStream<[number, number]>): AsyncStream<[number, number]> => stream.sort((lhs, rhs) => lhs[1] - rhs[1]),
      [],
      [],
    ],
    [
      createMapFixture([5, 4, 3, 2, 1]),
      (iterable: Map<number, number>): AsyncStream<[number, number]> => AsyncStream.of(iterable),
      (stream: AsyncStream<[number, number]>): AsyncStream<[number, number]> => stream.sort((lhs, rhs) => lhs[1] - rhs[1]),
      [[0, 5], [1, 4], [2, 3], [3, 2], [4, 1]],
      [[4, 1], [3, 2], [2, 3], [1, 4], [0, 5]],
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, number>): AsyncStream<[number, number]> => AsyncStream.of(iterable)
        .sort((lhs, rhs) => lhs[1] - rhs[1]),
      (stream: AsyncStream<[number, number]>): AsyncStream<[number, number]> => stream,
      [],
      [],
    ],
    [
      createMapFixture([5, 4, 3, 2, 1]),
      (iterable: Map<number, number>): AsyncStream<[number, number]> => AsyncStream.of(iterable)
        .sort((lhs, rhs) => lhs[1] - rhs[1]),
      (stream: AsyncStream<[number, number]>): AsyncStream<[number, number]> => stream,
      [[4, 1], [3, 2], [2, 3], [1, 4], [0, 5]],
      [[4, 1], [3, 2], [2, 3], [1, 4], [0, 5]],
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, number>): AsyncStream<[[number, number], number]> => AsyncStream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<[number, number]>): AsyncStream<[number, number]> => stream
        .limit(3),
      [],
      [],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable: Map<number, number>): AsyncStream<[number, number]> => AsyncStream.of(iterable)
        .values()
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<[number, number]>): AsyncStream<[number, number]> => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, number>): AsyncStream<number> => AsyncStream.of(iterable)
        .values()
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream: AsyncStream<number>): AsyncStream<[number, number]> => stream
        .map((x) => x + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      createMapFixture([9, 8, 7, 6, 5, 4, 3, 2, 1]),
      (iterable: Map<number, number>): AsyncStream<number> => AsyncStream.of(iterable)
        .values()
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream: AsyncStream<number>): AsyncStream<[number, number]> => stream
        .map((x) => x + 1)
        .pairwise(),
      [1, 3, 5, 7, 9],
      [[2, 4], [4, 6], [6, 8], [8, 10]],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[AsyncGenerator<any>, (iterable: AsyncGenerator<any>) => AsyncStream<any>, (stream: AsyncStream<any>) => AsyncStream<any>, any[], any[]]> {
  return [
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      createAsyncGeneratorFixture([5, 4, 3, 2, 1]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream.sort(),
      [],
      [],
    ],
    [
      createAsyncGeneratorFixture([5, 4, 3, 2, 1]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable).sort(),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      createAsyncGeneratorFixture([5, 4, 3, 2, 1]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable).sort(),
      (stream: AsyncStream<unknown>) => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [],
      [],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: AsyncStream<unknown>) => stream
        .map((x) => (x as number) + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      createAsyncGeneratorFixture([9, 8, 7, 6, 5, 4, 3, 2, 1]),
      (iterable: AsyncGenerator<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: AsyncStream<unknown>) => stream
        .map((x) => (x as number) + 1)
        .pairwise(),
      [1, 3, 5, 7, 9],
      [[2, 4], [4, 6], [6, 8], [8, 10]],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[AsyncIterable<any>, (iterable: AsyncIterable<any>) => AsyncStream<any>, (stream: AsyncStream<any>) => AsyncStream<any>, any[], any[]]> {
  return [
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      createAsyncIterableFixture([5, 4, 3, 2, 1]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream.sort(),
      [],
      [],
    ],
    [
      createAsyncIterableFixture([5, 4, 3, 2, 1]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable).sort(),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      createAsyncIterableFixture([5, 4, 3, 2, 1]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable).sort(),
      (stream: AsyncStream<unknown>) => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [],
      [],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: AsyncStream<unknown>) => stream
        .map((x) => (x as number) + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      createAsyncIterableFixture([9, 8, 7, 6, 5, 4, 3, 2, 1]),
      (iterable: AsyncIterable<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: AsyncStream<unknown>) => stream
        .map((x) => (x as number) + 1)
        .pairwise(),
      [1, 3, 5, 7, 9],
      [[2, 4], [4, 6], [6, 8], [8, 10]],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[AsyncIterator<any>, (iterable: AsyncIterator<any>) => AsyncStream<any>, (stream: AsyncStream<any>) => AsyncStream<any>, any[], any[]]> {
  return [
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      createAsyncIteratorFixture([5, 4, 3, 2, 1]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream.sort(),
      [],
      [],
    ],
    [
      createAsyncIteratorFixture([5, 4, 3, 2, 1]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable).sort(),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      createAsyncIteratorFixture([5, 4, 3, 2, 1]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable).sort(),
      (stream: AsyncStream<unknown>) => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [],
      [],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: AsyncStream<unknown>) => stream
        .map((x) => (x as number) + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      createAsyncIteratorFixture([9, 8, 7, 6, 5, 4, 3, 2, 1]),
      (iterable: AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: AsyncStream<unknown>) => stream
        .map((x) => (x as number) + 1)
        .pairwise(),
      [1, 3, 5, 7, 9],
      [[2, 4], [4, 6], [6, 8], [8, 10]],
    ],
  ];
}
