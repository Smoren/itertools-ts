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
] as Array<[
  AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  (data: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>) => AsyncStream<unknown>,
  (stream: AsyncStream<unknown>) => AsyncStream<unknown>,
  Array<unknown>,
  Array<unknown>,
]>)(
  "AsyncStream Peek Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    leftChainFunc: (data: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>) => AsyncStream<unknown>,
    rightChainFunc: (stream: AsyncStream<unknown>) => AsyncStream<unknown>,
    expectedPeeked: Array<unknown>,
    expectedResult: Array<unknown>,
  ) => {
    it("", async () => {
      // Given
      const stream = leftChainFunc(input);
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
] as Array<[
    AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  (data: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>) => AsyncStream<unknown>,
  (stream: AsyncStream<unknown>) => AsyncStream<unknown>,
  Array<unknown>,
  Array<unknown>,
]>)(
  "AsyncStream Peek Stream Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    leftChainFunc: (data: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>) => AsyncStream<unknown>,
    rightChainFunc: (stream: AsyncStream<unknown>) => AsyncStream<unknown>,
    expectedPeeked: Array<unknown>,
    expectedResult: Array<unknown>,
  ) => {
    it("", async () => {
      // Given
      const stream = leftChainFunc(input);
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

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      [5, 4, 3, 2, 1],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream.sort(),
      [],
      [],
    ],
    [
      [5, 4, 3, 2, 1],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable).sort(),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      [5, 4, 3, 2, 1],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable).sort(),
      (stream: AsyncStream<unknown>) => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [],
      [],
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: AsyncStream<unknown>) => stream
        .map((x) => (x as number) + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      [9, 8, 7, 6, 5, 4, 3, 2, 1],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      createGeneratorFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream.sort(),
      [],
      [],
    ],
    [
      createGeneratorFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable).sort(),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      createGeneratorFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable).sort(),
      (stream: AsyncStream<unknown>) => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [],
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: AsyncStream<unknown>) => stream
        .map((x) => (x as number) + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      createGeneratorFixture([9, 8, 7, 6, 5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      createIterableFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream.sort(),
      [],
      [],
    ],
    [
      createIterableFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable).sort(),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      createIterableFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable).sort(),
      (stream: AsyncStream<unknown>) => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [],
      [],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: AsyncStream<unknown>) => stream
        .map((x) => (x as number) + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      createIterableFixture([9, 8, 7, 6, 5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      createIteratorFixture([5, 4, 3, 2, 1]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator),
      (stream: AsyncStream<unknown>) => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      createIteratorFixture([]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator),
      (stream: AsyncStream<unknown>) => stream.sort(),
      [],
      [],
    ],
    [
      createIteratorFixture([5, 4, 3, 2, 1]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator),
      (stream: AsyncStream<unknown>) => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture([]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator).sort(),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      createIteratorFixture([5, 4, 3, 2, 1]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator).sort(),
      (stream: AsyncStream<unknown>) => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture([]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [],
      [],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      createIteratorFixture([]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: AsyncStream<unknown>) => stream
        .map((x) => (x as number) + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      createIteratorFixture([9, 8, 7, 6, 5, 4, 3, 2, 1]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator)
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

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      '54321',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream,
      ['5', '4', '3', '2', '1'],
      ['5', '4', '3', '2', '1'],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream.sort(),
      [],
      [],
    ],
    [
      '54321',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream.sort(),
      ['5', '4', '3', '2', '1'],
      ['1', '2', '3', '4', '5'],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable).sort(),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      '54321',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable).sort(),
      (stream: AsyncStream<unknown>) => stream,
      ['1', '2', '3', '4', '5'],
      ['1', '2', '3', '4', '5'],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [],
      [],
    ],
    [
      '12345',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .zipWith('abcde'),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [['1', 'a'], ['2', 'b'], ['3', 'c'], ['4', 'd'], ['5', 'e']],
      [['1', 'a'], ['2', 'b'], ['3', 'c']],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: AsyncStream<unknown>) => stream
        .map((x) => (x as number) + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      '987654321',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: AsyncStream<unknown>) => stream
        .map((x) => Number(x) + 1)
        .pairwise(),
      ['1', '3', '5', '7', '9'],
      [[2, 4], [4, 6], [6, 8], [8, 10]],
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      new Set([5, 4, 3, 2, 1]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator),
      (stream: AsyncStream<unknown>) => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      new Set([]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator),
      (stream: AsyncStream<unknown>) => stream.sort(),
      [],
      [],
    ],
    [
      new Set([5, 4, 3, 2, 1]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator),
      (stream: AsyncStream<unknown>) => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      new Set([]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator).sort(),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      new Set([5, 4, 3, 2, 1]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator).sort(),
      (stream: AsyncStream<unknown>) => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      new Set([]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [],
      [],
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      new Set([]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: AsyncStream<unknown>) => stream
        .map((x) => (x as number) + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      new Set([9, 8, 7, 6, 5, 4, 3, 2, 1]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator)
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

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      createMapFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream,
      [[0, 5], [1, 4], [2, 3], [3, 2], [4, 1]],
      [[0, 5], [1, 4], [2, 3], [3, 2], [4, 1]],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream.sort((lhs: unknown, rhs: unknown) => (lhs as number[])[1] - (rhs as number[])[1]),
      [],
      [],
    ],
    [
      createMapFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream.sort((lhs: unknown, rhs: unknown) => (lhs as number[])[1] - (rhs as number[])[1]),
      [[0, 5], [1, 4], [2, 3], [3, 2], [4, 1]],
      [[4, 1], [3, 2], [2, 3], [1, 4], [0, 5]],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (lhs as number[])[1] - (rhs as number[])[1]),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      createMapFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (lhs as number[])[1] - (rhs as number[])[1]),
      (stream: AsyncStream<unknown>) => stream,
      [[4, 1], [3, 2], [2, 3], [1, 4], [0, 5]],
      [[4, 1], [3, 2], [2, 3], [1, 4], [0, 5]],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [],
      [],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: AsyncStream<unknown>) => stream
        .map((x) => (x as number) + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      createMapFixture([9, 8, 7, 6, 5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
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

function dataProviderForAsyncGenerators(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      createAsyncGeneratorFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream.sort(),
      [],
      [],
    ],
    [
      createAsyncGeneratorFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable).sort(),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      createAsyncGeneratorFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable).sort(),
      (stream: AsyncStream<unknown>) => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [],
      [],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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

function dataProviderForAsyncIterables(): Array<unknown> {
  return [
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      createAsyncIterableFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream.sort(),
      [],
      [],
    ],
    [
      createAsyncIterableFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream<unknown>) => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable).sort(),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      createAsyncIterableFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable).sort(),
      (stream: AsyncStream<unknown>) => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [],
      [],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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

function dataProviderForAsyncIterators(): Array<unknown> {
  return [
    [
      createAsyncIteratorFixture([]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      createAsyncIteratorFixture([5, 4, 3, 2, 1]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator),
      (stream: AsyncStream<unknown>) => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      createAsyncIteratorFixture([]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator),
      (stream: AsyncStream<unknown>) => stream.sort(),
      [],
      [],
    ],
    [
      createAsyncIteratorFixture([5, 4, 3, 2, 1]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator),
      (stream: AsyncStream<unknown>) => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator).sort(),
      (stream: AsyncStream<unknown>) => stream,
      [],
      [],
    ],
    [
      createAsyncIteratorFixture([5, 4, 3, 2, 1]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator).sort(),
      (stream: AsyncStream<unknown>) => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [],
      [],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream<unknown>) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      createAsyncIteratorFixture([]),
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator)
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
      (Iterator: Iterator<unknown>) => AsyncStream.of(Iterator)
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
