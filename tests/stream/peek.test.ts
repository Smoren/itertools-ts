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
])(
  "Stream Peek Stream Test",
  (input, leftChainFunc, rightChainFunc, expectedPeeked, expectedResult) => {
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

function dataProviderForArrays(): Array<[Array<unknown>, (iterable: Iterable<unknown> | Iterator<unknown>) => Stream<unknown>, (stream: Stream<unknown>) => Stream<unknown>, unknown[], unknown[]]> {
  return [
    [
      [],
      (iterable) => Stream.of(iterable),
      (stream) => stream,
      [],
      [],
    ],
    [
      [5, 4, 3, 2, 1],
      (iterable) => Stream.of(iterable),
      (stream) => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      [],
      (iterable) => Stream.of(iterable),
      (stream) => stream.sort(),
      [],
      [],
    ],
    [
      [5, 4, 3, 2, 1],
      (iterable) => Stream.of(iterable),
      (stream) => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      [],
      (iterable) => Stream.of(iterable).sort(),
      (stream) => stream,
      [],
      [],
    ],
    [
      [5, 4, 3, 2, 1],
      (iterable) => Stream.of(iterable).sort(),
      (stream) => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      [],
      (iterable) => Stream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream) => stream
        .limit(3),
      [],
      [],
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable) => Stream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      [],
      (iterable) => Stream.of(iterable as number[])
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream) => (stream as Stream<number>)
        .map((x) => x + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      [9, 8, 7, 6, 5, 4, 3, 2, 1],
      (iterable) => Stream.of(iterable as number[])
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream) => (stream as Stream<number>)
        .map((x) => x + 1)
        .pairwise(),
      [1, 3, 5, 7, 9],
      [[2, 4], [4, 6], [6, 8], [8, 10]],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<unknown>, (iterable: Iterable<unknown> | Iterator<unknown>) => Stream<unknown>, (stream: Stream<unknown>) => Stream<unknown>, unknown[], unknown[]]> {
  return [
    [
      createGeneratorFixture([]),
      (iterable) => Stream.of(iterable),
      (stream) => stream,
      [],
      [],
    ],
    [
      createGeneratorFixture([5, 4, 3, 2, 1]),
      (iterable) => Stream.of(iterable),
      (stream) => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      createGeneratorFixture([]),
      (iterable) => Stream.of(iterable),
      (stream) => stream.sort(),
      [],
      [],
    ],
    [
      createGeneratorFixture([5, 4, 3, 2, 1]),
      (iterable) => Stream.of(iterable),
      (stream) => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([]),
      (iterable) => Stream.of(iterable).sort(),
      (stream) => stream,
      [],
      [],
    ],
    [
      createGeneratorFixture([5, 4, 3, 2, 1]),
      (iterable) => Stream.of(iterable).sort(),
      (stream) => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([]),
      (iterable) => Stream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream) => stream
        .limit(3),
      [],
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5]),
      (iterable) => Stream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      createGeneratorFixture([]),
      (iterable) => Stream.of(iterable as Generator<number>)
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream) => (stream as Stream<number>)
        .map((x) => x + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      createGeneratorFixture([9, 8, 7, 6, 5, 4, 3, 2, 1]),
      (iterable) => Stream.of(iterable as Generator<number>)
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream) => (stream as Stream<number>)
        .map((x) => x + 1)
        .pairwise(),
      [1, 3, 5, 7, 9],
      [[2, 4], [4, 6], [6, 8], [8, 10]],
    ],
  ];
}

function dataProviderForIterables(): Array<[Iterable<unknown>, (iterable: Iterable<unknown> | Iterator<unknown>) => Stream<unknown>, (stream: Stream<unknown>) => Stream<unknown>, unknown[], unknown[]]> {
  return [
    [
      createIterableFixture([]),
      (iterable) => Stream.of(iterable),
      (stream) => stream,
      [],
      [],
    ],
    [
      createIterableFixture([5, 4, 3, 2, 1]),
      (iterable) => Stream.of(iterable),
      (stream) => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      createIterableFixture([]),
      (iterable) => Stream.of(iterable),
      (stream) => stream.sort(),
      [],
      [],
    ],
    [
      createIterableFixture([5, 4, 3, 2, 1]),
      (iterable) => Stream.of(iterable),
      (stream) => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture([]),
      (iterable) => Stream.of(iterable).sort(),
      (stream) => stream,
      [],
      [],
    ],
    [
      createIterableFixture([5, 4, 3, 2, 1]),
      (iterable) => Stream.of(iterable).sort(),
      (stream) => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture([]),
      (iterable) => Stream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream) => stream
        .limit(3),
      [],
      [],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5]),
      (iterable) => Stream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      createIterableFixture([]),
      (iterable) => Stream.of(iterable as Iterable<number>)
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream) => (stream as Stream<number>)
        .map((x) => x + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      createIterableFixture([9, 8, 7, 6, 5, 4, 3, 2, 1]),
      (iterable) => Stream.of(iterable as Iterable<number>)
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream) => (stream as Stream<number>)
        .map((x) => x + 1)
        .pairwise(),
      [1, 3, 5, 7, 9],
      [[2, 4], [4, 6], [6, 8], [8, 10]],
    ],
  ];
}

function dataProviderForIterators(): Array<[Iterator<unknown>, (iterable: Iterable<unknown> | Iterator<unknown>) => Stream<unknown>, (stream: Stream<unknown>) => Stream<unknown>, unknown[], unknown[]]> {
  return [
    [
      createIteratorFixture([]),
      (iterable) => Stream.of(iterable),
      (stream) => stream,
      [],
      [],
    ],
    [
      createIteratorFixture([5, 4, 3, 2, 1]),
      (iterable) => Stream.of(iterable),
      (stream) => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      createIteratorFixture([]),
      (iterable) => Stream.of(iterable),
      (stream) => stream.sort(),
      [],
      [],
    ],
    [
      createIteratorFixture([5, 4, 3, 2, 1]),
      (iterable) => Stream.of(iterable),
      (stream) => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture([]),
      (iterable) => Stream.of(iterable).sort(),
      (stream) => stream,
      [],
      [],
    ],
    [
      createIteratorFixture([5, 4, 3, 2, 1]),
      (iterable) => Stream.of(iterable).sort(),
      (stream) => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture([]),
      (iterable) => Stream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream) => stream
        .limit(3),
      [],
      [],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5]),
      (iterable) => Stream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      createIteratorFixture([]),
      (iterable) => Stream.of(iterable as Iterator<number>)
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream) => (stream as Stream<number>)
        .map((x) => x + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      createIteratorFixture([9, 8, 7, 6, 5, 4, 3, 2, 1]),
      (iterable) => Stream.of(iterable as Iterator<number>)
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream) => (stream as Stream<number>)
        .map((x) => x + 1)
        .pairwise(),
      [1, 3, 5, 7, 9],
      [[2, 4], [4, 6], [6, 8], [8, 10]],
    ],
  ];
}

function dataProviderForStrings(): Array<[string, (iterable: Iterable<unknown> | Iterator<unknown>) => Stream<unknown>, (stream: Stream<unknown>) => Stream<unknown>, unknown[], unknown[]]> {
  return [
    [
      '',
      (iterable) => Stream.of(iterable),
      (stream) => stream,
      [],
      [],
    ],
    [
      '54321',
      (iterable) => Stream.of(iterable),
      (stream) => stream,
      ['5', '4', '3', '2', '1'],
      ['5', '4', '3', '2', '1'],
    ],
    [
      '',
      (iterable) => Stream.of(iterable),
      (stream) => stream.sort(),
      [],
      [],
    ],
    [
      '54321',
      (iterable) => Stream.of(iterable),
      (stream) => stream.sort(),
      ['5', '4', '3', '2', '1'],
      ['1', '2', '3', '4', '5'],
    ],
    [
      '',
      (iterable) => Stream.of(iterable).sort(),
      (stream) => stream,
      [],
      [],
    ],
    [
      '54321',
      (iterable) => Stream.of(iterable).sort(),
      (stream) => stream,
      ['1', '2', '3', '4', '5'],
      ['1', '2', '3', '4', '5'],
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream) => stream
        .limit(3),
      [],
      [],
    ],
    [
      '12345',
      (iterable) => Stream.of(iterable)
        .zipWith('abcde'),
      (stream) => stream
        .limit(3),
      [['1', 'a'], ['2', 'b'], ['3', 'c'], ['4', 'd'], ['5', 'e']],
      [['1', 'a'], ['2', 'b'], ['3', 'c']],
    ],
    [
      '',
      (iterable) => Stream.of(iterable as Iterable<number>)
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream) => (stream as Stream<number>)
        .map((x) => x + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      '987654321',
      (iterable) => Stream.of(iterable as Iterable<number>)
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream) => stream
        .map((x) => Number(x) + 1)
        .pairwise(),
      ['1', '3', '5', '7', '9'],
      [[2, 4], [4, 6], [6, 8], [8, 10]],
    ],
  ];
}

function dataProviderForSets(): Array<[Set<unknown>, (iterable: Iterable<unknown> | Iterator<unknown>) => Stream<unknown>, (stream: Stream<unknown>) => Stream<unknown>, unknown[], unknown[]]> {
  return [
    [
      new Set([]),
      (iterable) => Stream.of(iterable),
      (stream) => stream,
      [],
      [],
    ],
    [
      new Set([5, 4, 3, 2, 1]),
      (iterable) => Stream.of(iterable),
      (stream) => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable),
      (stream) => stream.sort(),
      [],
      [],
    ],
    [
      new Set([5, 4, 3, 2, 1]),
      (iterable) => Stream.of(iterable),
      (stream) => stream.sort(),
      [5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5],
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable).sort(),
      (stream) => stream,
      [],
      [],
    ],
    [
      new Set([5, 4, 3, 2, 1]),
      (iterable) => Stream.of(iterable).sort(),
      (stream) => stream,
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream) => stream
        .limit(3),
      [],
      [],
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      (iterable) => Stream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable as Set<number>)
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream) => (stream as Stream<number>)
        .map((x) => x + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      new Set([9, 8, 7, 6, 5, 4, 3, 2, 1]),
      (iterable) => Stream.of(iterable as Set<number>)
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream) => (stream as Stream<number>)
        .map((x) => x + 1)
        .pairwise(),
      [1, 3, 5, 7, 9],
      [[2, 4], [4, 6], [6, 8], [8, 10]],
    ],
  ];
}

function dataProviderForMaps(): Array<[Map<unknown, unknown>, (iterable: Iterable<unknown> | Iterator<unknown>) => Stream<unknown>, (stream: Stream<unknown>) => Stream<unknown>, unknown[], unknown[]]> {
  return [
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable),
      (stream) => stream,
      [],
      [],
    ],
    [
      createMapFixture([5, 4, 3, 2, 1]),
      (iterable) => Stream.of(iterable),
      (stream) => stream,
      [[0, 5], [1, 4], [2, 3], [3, 2], [4, 1]],
      [[0, 5], [1, 4], [2, 3], [3, 2], [4, 1]],
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable),
      (stream) => (stream as Stream<[unknown, number]>).sort((lhs, rhs) => lhs[1] - rhs[1]),
      [],
      [],
    ],
    [
      createMapFixture([5, 4, 3, 2, 1]),
      (iterable) => Stream.of(iterable),
      (stream) => (stream as Stream<[unknown, number]>).sort((lhs, rhs) => lhs[1] - rhs[1]),
      [[0, 5], [1, 4], [2, 3], [3, 2], [4, 1]],
      [[4, 1], [3, 2], [2, 3], [1, 4], [0, 5]],
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable as Map<unknown, number>)
        .sort((lhs, rhs) => lhs[1] - rhs[1]),
      (stream) => stream,
      [],
      [],
    ],
    [
      createMapFixture([5, 4, 3, 2, 1]),
      (iterable) => Stream.of(iterable as Map<unknown, number>)
        .sort((lhs, rhs) => lhs[1] - rhs[1]),
      (stream) => stream,
      [[4, 1], [3, 2], [2, 3], [1, 4], [0, 5]],
      [[4, 1], [3, 2], [2, 3], [1, 4], [0, 5]],
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream) => stream
        .limit(3),
      [],
      [],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable) => Stream.of(iterable)
        .values()
        .zipWith([11, 22, 33, 44, 55]),
      (stream) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable)
        .values()
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream) => (stream as Stream<number>)
        .map((x) => x + 1)
        .pairwise(),
      [],
      [],
    ],
    [
      createMapFixture([9, 8, 7, 6, 5, 4, 3, 2, 1]),
      (iterable) => Stream.of(iterable as Map<unknown, number>)
        .values()
        .filter((x) => x % 2 !== 0)
        .sort(),
      (stream) => (stream as Stream<number>)
        .map((x) => x + 1)
        .pairwise(),
      [1, 3, 5, 7, 9],
      [[2, 4], [4, 6], [6, 8], [8, 10]],
    ],
  ];
}
