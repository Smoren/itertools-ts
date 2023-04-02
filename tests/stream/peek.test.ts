// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { Stream } from '../../src';

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
] as Array<[
  Iterable<unknown>|Iterator<unknown>,
  (data: Iterable<unknown>|Iterator<unknown>) => Stream,
  (stream: Stream) => Stream,
  Array<unknown>,
  Array<unknown>,
]>)(
  "Stream Peek Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    leftChainFunc: (data: Iterable<unknown>|Iterator<unknown>) => Stream,
    rightChainFunc: (stream: Stream) => Stream,
    expectedPeeked: Array<unknown>,
    expectedResult: Array<unknown>,
  ) => {
    it("", () => {
      // Given
      const stream = leftChainFunc(input);
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
] as Array<[
    Iterable<unknown>|Iterator<unknown>,
  (data: Iterable<unknown>|Iterator<unknown>) => Stream,
  (stream: Stream) => Stream,
  Array<unknown>,
  Array<unknown>,
]>)(
  "Stream Peek Stream Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    leftChainFunc: (data: Iterable<unknown>|Iterator<unknown>) => Stream,
    rightChainFunc: (stream: Stream) => Stream,
    expectedPeeked: Array<unknown>,
    expectedResult: Array<unknown>,
  ) => {
    it("", () => {
      // Given
      const stream = leftChainFunc(input);
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

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable),
      (stream: Stream) => stream,
      [],
      [],
    ],
    [
      [5, 4, 3, 2, 1],
      (iterable: Iterable<unknown>) => Stream.of(iterable),
      (stream: Stream) => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable),
      (stream: Stream) => stream.sort(),
      [],
      [],
    ],
    [
      [5, 4, 3, 2, 1],
      (iterable: Iterable<unknown>) => Stream.of(iterable),
      (stream: Stream) => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable).sort(),
      (stream: Stream) => stream,
      [],
      [],
    ],
    [
      [5, 4, 3, 2, 1],
      (iterable: Iterable<unknown>) => Stream.of(iterable).sort(),
      (stream: Stream) => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: Stream) => stream
        .limit(3),
      [],
      [],
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: Stream) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: Stream) => stream
        .map((x) => (x as number) + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      [9, 8, 7, 6, 5, 4, 3, 2, 1],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: Stream) => stream
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
      (iterable: Iterable<unknown>) => Stream.of(iterable),
      (stream: Stream) => stream,
      [],
      [],
    ],
    [
      createGeneratorFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable),
      (stream: Stream) => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable),
      (stream: Stream) => stream.sort(),
      [],
      [],
    ],
    [
      createGeneratorFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable),
      (stream: Stream) => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable).sort(),
      (stream: Stream) => stream,
      [],
      [],
    ],
    [
      createGeneratorFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable).sort(),
      (stream: Stream) => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: Stream) => stream
        .limit(3),
      [],
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: Stream) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: Stream) => stream
        .map((x) => (x as number) + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      createGeneratorFixture([9, 8, 7, 6, 5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: Stream) => stream
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
      (iterable: Iterable<unknown>) => Stream.of(iterable),
      (stream: Stream) => stream,
      [],
      [],
    ],
    [
      createIterableFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable),
      (stream: Stream) => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable),
      (stream: Stream) => stream.sort(),
      [],
      [],
    ],
    [
      createIterableFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable),
      (stream: Stream) => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable).sort(),
      (stream: Stream) => stream,
      [],
      [],
    ],
    [
      createIterableFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable).sort(),
      (stream: Stream) => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: Stream) => stream
        .limit(3),
      [],
      [],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: Stream) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: Stream) => stream
        .map((x) => (x as number) + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      createIterableFixture([9, 8, 7, 6, 5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: Stream) => stream
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
      (Iterator: Iterator<unknown>) => Stream.of(Iterator),
      (stream: Stream) => stream,
      [],
      [],
    ],
    [
      createIteratorFixture([5, 4, 3, 2, 1]),
      (Iterator: Iterator<unknown>) => Stream.of(Iterator),
      (stream: Stream) => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      createIteratorFixture([]),
      (Iterator: Iterator<unknown>) => Stream.of(Iterator),
      (stream: Stream) => stream.sort(),
      [],
      [],
    ],
    [
      createIteratorFixture([5, 4, 3, 2, 1]),
      (Iterator: Iterator<unknown>) => Stream.of(Iterator),
      (stream: Stream) => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture([]),
      (Iterator: Iterator<unknown>) => Stream.of(Iterator).sort(),
      (stream: Stream) => stream,
      [],
      [],
    ],
    [
      createIteratorFixture([5, 4, 3, 2, 1]),
      (Iterator: Iterator<unknown>) => Stream.of(Iterator).sort(),
      (stream: Stream) => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture([]),
      (Iterator: Iterator<unknown>) => Stream.of(Iterator)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: Stream) => stream
        .limit(3),
      [],
      [],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5]),
      (Iterator: Iterator<unknown>) => Stream.of(Iterator)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: Stream) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      createIteratorFixture([]),
      (Iterator: Iterator<unknown>) => Stream.of(Iterator)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: Stream) => stream
        .map((x) => (x as number) + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      createIteratorFixture([9, 8, 7, 6, 5, 4, 3, 2, 1]),
      (Iterator: Iterator<unknown>) => Stream.of(Iterator)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: Stream) => stream
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
      (iterable: Iterable<unknown>) => Stream.of(iterable),
      (stream: Stream) => stream,
      [],
      [],
    ],
    [
      '54321',
      (iterable: Iterable<unknown>) => Stream.of(iterable),
      (stream: Stream) => stream,
      ['5', '4', '3', '2', '1'],
      ['5', '4', '3', '2', '1'],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable),
      (stream: Stream) => stream.sort(),
      [],
      [],
    ],
    [
      '54321',
      (iterable: Iterable<unknown>) => Stream.of(iterable),
      (stream: Stream) => stream.sort(),
      ['5', '4', '3', '2', '1'],
      ['1', '2', '3', '4', '5'],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable).sort(),
      (stream: Stream) => stream,
      [],
      [],
    ],
    [
      '54321',
      (iterable: Iterable<unknown>) => Stream.of(iterable).sort(),
      (stream: Stream) => stream,
      ['1', '2', '3', '4', '5'],
      ['1', '2', '3', '4', '5'],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: Stream) => stream
        .limit(3),
      [],
      [],
    ],
    [
      '12345',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .zipWith('abcde'),
      (stream: Stream) => stream
        .limit(3),
      [['1', 'a'], ['2', 'b'], ['3', 'c'], ['4', 'd'], ['5', 'e']],
      [['1', 'a'], ['2', 'b'], ['3', 'c']],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: Stream) => stream
        .map((x) => (x as number) + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      '987654321',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: Stream) => stream
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
      (Iterator: Iterator<unknown>) => Stream.of(Iterator),
      (stream: Stream) => stream,
      [],
      [],
    ],
    [
      new Set([5, 4, 3, 2, 1]),
      (Iterator: Iterator<unknown>) => Stream.of(Iterator),
      (stream: Stream) => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      new Set([]),
      (Iterator: Iterator<unknown>) => Stream.of(Iterator),
      (stream: Stream) => stream.sort(),
      [],
      [],
    ],
    [
      new Set([5, 4, 3, 2, 1]),
      (Iterator: Iterator<unknown>) => Stream.of(Iterator),
      (stream: Stream) => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      new Set([]),
      (Iterator: Iterator<unknown>) => Stream.of(Iterator).sort(),
      (stream: Stream) => stream,
      [],
      [],
    ],
    [
      new Set([5, 4, 3, 2, 1]),
      (Iterator: Iterator<unknown>) => Stream.of(Iterator).sort(),
      (stream: Stream) => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      new Set([]),
      (Iterator: Iterator<unknown>) => Stream.of(Iterator)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: Stream) => stream
        .limit(3),
      [],
      [],
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      (Iterator: Iterator<unknown>) => Stream.of(Iterator)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: Stream) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      new Set([]),
      (Iterator: Iterator<unknown>) => Stream.of(Iterator)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: Stream) => stream
        .map((x) => (x as number) + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      new Set([9, 8, 7, 6, 5, 4, 3, 2, 1]),
      (Iterator: Iterator<unknown>) => Stream.of(Iterator)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: Stream) => stream
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
      (iterable: Iterable<unknown>) => Stream.of(iterable),
      (stream: Stream) => stream,
      [],
      [],
    ],
    [
      createMapFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable),
      (stream: Stream) => stream,
      [[0, 5], [1, 4], [2, 3], [3, 2], [4, 1]],
      [[0, 5], [1, 4], [2, 3], [3, 2], [4, 1]],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable),
      (stream: Stream) => stream.sort((lhs: unknown, rhs: unknown) => (lhs as number[])[1] - (rhs as number[])[1]),
      [],
      [],
    ],
    [
      createMapFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable),
      (stream: Stream) => stream.sort((lhs: unknown, rhs: unknown) => (lhs as number[])[1] - (rhs as number[])[1]),
      [[0, 5], [1, 4], [2, 3], [3, 2], [4, 1]],
      [[4, 1], [3, 2], [2, 3], [1, 4], [0, 5]],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (lhs as number[])[1] - (rhs as number[])[1]),
      (stream: Stream) => stream,
      [],
      [],
    ],
    [
      createMapFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (lhs as number[])[1] - (rhs as number[])[1]),
      (stream: Stream) => stream,
      [[4, 1], [3, 2], [2, 3], [1, 4], [0, 5]],
      [[4, 1], [3, 2], [2, 3], [1, 4], [0, 5]],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: Stream) => stream
        .limit(3),
      [],
      [],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .values()
        .zipWith([11, 22, 33, 44, 55]),
      (stream: Stream) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .values()
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: Stream) => stream
        .map((x) => (x as number) + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      createMapFixture([9, 8, 7, 6, 5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .values()
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: Stream) => stream
        .map((x) => (x as number) + 1)
        .pairwise(),
      [1, 3, 5, 7, 9],
      [[2, 4], [4, 6], [6, 8], [8, 10]],
    ],
  ];
}
