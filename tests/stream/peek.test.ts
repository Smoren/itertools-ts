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
      const stream = leftChainFunc(input as Iterable<any>);
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
      const stream = leftChainFunc(input as Iterable<any>);
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

function dataProviderForArrays(): Array<[Array<unknown>, (iterable: Iterable<any> | Iterator<any>) => Stream<any>, (stream: Stream<any>) => Stream<any>, unknown[], unknown[]]> {
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
      (iterable: Iterable<number> | Iterator<number>) => Stream.of(iterable)
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
      (stream: Stream<number>) => (stream as Stream<number>)
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

function dataProviderForGenerators(): Array<[Generator<unknown>, (iterable: Iterable<any> | Iterator<any>) => Stream<any>, (stream: Stream<any>) => Stream<any>, unknown[], unknown[]]> {
  return dataProviderForArrays().map((item) => [
    createGeneratorFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<any> | Iterator<any>) => Stream<any>, (stream: Stream<any>) => Stream<any>, unknown[], unknown[]],
  ]);
}

function dataProviderForIterables(): Array<[Iterable<unknown>, (iterable: Iterable<any> | Iterator<any>) => Stream<any>, (stream: Stream<any>) => Stream<any>, unknown[], unknown[]]> {
  return dataProviderForArrays().map((item) => [
    createIterableFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<any> | Iterator<any>) => Stream<any>, (stream: Stream<any>) => Stream<any>, unknown[], unknown[]],
  ]);
}

function dataProviderForIterators(): Array<[Iterator<unknown>, (iterable: Iterable<any> | Iterator<any>) => Stream<any>, (stream: Stream<any>) => Stream<any>, unknown[], unknown[]]> {
  return dataProviderForArrays().map((item) => [
    createIteratorFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<any> | Iterator<any>) => Stream<any>, (stream: Stream<any>) => Stream<any>, unknown[], unknown[]],
  ]);
}

function dataProviderForStrings(): Array<[string, (iterable: Iterable<any> | Iterator<any>) => Stream<any>, (stream: Stream<any>) => Stream<any>, unknown[], unknown[]]> {
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
      (stream: Stream<number>) => stream
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

function dataProviderForSets(): Array<[Set<unknown>, (iterable: Iterable<any> | Iterator<any>) => Stream<any>, (stream: Stream<any>) => Stream<any>, unknown[], unknown[]]> {
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
      (stream: Stream<number>) => stream
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
      (stream: Stream<number>) => stream
        .map((x) => x + 1)
        .pairwise(),
      [1, 3, 5, 7, 9],
      [[2, 4], [4, 6], [6, 8], [8, 10]],
    ],
  ];
}

function dataProviderForMaps(): Array<[Map<unknown, unknown>, (iterable: Iterable<any>) => Stream<any>, (stream: Stream<any>) => Stream<any>, unknown[], unknown[]]> {
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
      (stream: Stream<[unknown, number]>) => stream.sort((lhs, rhs) => lhs[1] - rhs[1]),
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
      (iterable: Iterable<[unknown, number]>) => Stream.of(iterable)
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
      (iterable: Iterable<[unknown, number]>) => Stream.of(iterable)
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
      (iterable: Iterable<[unknown, number]>) => Stream.of(iterable)
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
