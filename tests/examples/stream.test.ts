import {
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture,
  expectToBeCloseToArray,
  // @ts-ignore
} from "../fixture";
import { Comparable, multi, single, Stream } from "../../src";

describe.each([
  ...dataProviderForOfCount(),
] as Array<[Array<number>, number, Array<number>]>)(
  "Stream Infinite Of Count Test",
  (
    inputParams: Array<number>,
    limit: number,
    expected: Array<number>
  ) => {
    it("", () => {
      // When
      const stream = Stream.ofCount(...inputParams);
      const result = stream.limit(limit).toArray() as Array<number>;

      // Then
      expectToBeCloseToArray(result, expected);
    });
  }
);

describe.each([
  ...dataProviderForOfCycle(),
] as Array<[Array<number>, number, Array<number>]>)(
  "Stream Infinite Of Cycle Test",
  (
    iterable: Iterable<unknown>,
    limit: number,
    expected: Array<number>
  ) => {
    it("", () => {
      // When
      const stream = Stream.ofCycle(iterable);
      const result = stream.limit(limit).toArray() as Array<number>;

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForOfRepeat(),
] as Array<[Array<number>, number, Array<number>]>)(
  "Stream Infinite Of Repeat Test",
  (
    itemToRepeat: unknown,
    limit: number,
    expected: Array<number>
  ) => {
    it("", () => {
      // When
      const stream = Stream.ofRepeat(itemToRepeat);
      const result = stream.limit(limit).toArray() as Array<number>;

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForOfCount(): Array<unknown> {
  return [
    [
      [2, 0.1],
      5,
      [2, 2.1, 2.2, 2.3, 2.4],
    ],
    [
      [-2.2, -1.2],
      5,
      [-2.2, -3.4, -4.6, -5.8, -7],
    ],
  ];
}

function dataProviderForOfCycle(): Array<unknown> {
  return [
    [
      [0, 1, 2],
      10,
      [0, 1, 2, 0, 1, 2, 0, 1, 2, 0],
    ],
    [
      [1, 1],
      6,
      [1, 1, 1, 1, 1, 1],
    ],
  ];
}

function dataProviderForOfRepeat(): Array<unknown> {
  return [
    [
      0,
      5,
      [0, 0, 0, 0, 0],
    ],
    [
      1,
      5,
      [1, 1, 1, 1, 1],
    ],
  ];
}

describe.each([
  ...dataProviderForMath(),
] as Array<[Iterable<unknown>|Iterator<unknown>, (data: unknown) => Stream<unknown>, Array<unknown>]>)(
  "Stream Math Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    streamFactory: (data: unknown) => Stream<unknown>,
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const result = streamFactory(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForMath(): Array<unknown> {
  return [
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMax()
        .toArray(),
      [1, 2, 3],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningMin()
        .toArray(),
      [1, 1, 1],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
  ];
}

describe.each([
  ...dataProviderForMulti(),
] as Array<[Iterable<unknown>|Iterator<unknown>, (data: unknown) => Stream<unknown>, Array<unknown>]>)(
  "Stream Multi Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    streamFactory: (data: unknown) => Stream<unknown>,
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const result = streamFactory(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForMulti(): Array<unknown> {
  return [
    [
      [1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .zipWith(
          createGeneratorFixture([11, 22, 33]),
          createIterableFixture([111, 222, 333, 444]),
          createIteratorFixture([1111, 2222, 3333]),
          new Set([11111, 22222, 33333]),
          'abcdefg',
        )
        .toArray(),
      [
        [1, 11, 111, 1111, 11111, 'a'],
        [2, 22, 222, 2222, 22222, 'b'],
        [3, 33, 333, 3333, 33333, 'c'],
      ],
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .zipLongestWith(
          createGeneratorFixture([11, 22, 33]),
          createIterableFixture([111, 222, 333, 444]),
          createIteratorFixture([1111, 2222, 3333]),
          new Set([11111, 22222, 33333]),
          'abcdefg',
        )
        .toArray(),
      [
        [1, 11, 111, 1111, 11111, 'a'],
        [2, 22, 222, 2222, 22222, 'b'],
        [3, 33, 333, 3333, 33333, 'c'],
        [4, undefined, 444, undefined, undefined, 'd'],
        [5, undefined, undefined, undefined, undefined, 'e'],
        [undefined, undefined, undefined, undefined, undefined, 'f'],
        [undefined, undefined, undefined, undefined, undefined, 'g'],
      ],
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .zipFilledWith(
          'filler',
          createGeneratorFixture([11, 22, 33]),
          createIterableFixture([111, 222, 333, 444]),
          createIteratorFixture([1111, 2222, 3333]),
          new Set([11111, 22222, 33333]),
          'abcdefg',
        )
        .toArray(),
      [
        [1, 11, 111, 1111, 11111, 'a'],
        [2, 22, 222, 2222, 22222, 'b'],
        [3, 33, 333, 3333, 33333, 'c'],
        [4, 'filler', 444, 'filler', 'filler', 'd'],
        [5, 'filler', 'filler', 'filler', 'filler', 'e'],
        ['filler', 'filler', 'filler', 'filler', 'filler', 'f'],
        ['filler', 'filler', 'filler', 'filler', 'filler', 'g'],
      ],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .zipEqualWith(
          createGeneratorFixture([11, 22, 33]),
          createIterableFixture([111, 222, 333]),
          createIteratorFixture([1111, 2222, 3333]),
          new Set([11111, 22222, 33333]),
          'abc',
        )
        .toArray(),
      [
        [1, 11, 111, 1111, 11111, 'a'],
        [2, 22, 222, 2222, 22222, 'b'],
        [3, 33, 333, 3333, 33333, 'c'],
      ],
    ],
    [
      [1, 2],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .chainWith(createGeneratorFixture([3, 4]))
        .chainWith(createIterableFixture([5]))
        .chainWith(createIteratorFixture([6]))
        .chainWith(new Set([7]))
        .chainWith(Stream.of(createMapFixture([8, 9])).map((item) => (item as Array<unknown>)[1]))
        .chainWith('abc')
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c'],
    ],
    [
      [1, 2],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .chainWith(createGeneratorFixture([3, 4]))
        .chainWith(createIterableFixture([5]))
        .chainWith(createIteratorFixture([6]))
        .chainWith(new Set([7]))
        .chainWith(Stream.of(createMapFixture([8])).map((item) => (item as Array<unknown>)[1]))
        .chainWith('abc')
        .zipWith([11, 22, 33, 44, 55, 66, 77, 88, 'x', 'y', 'z'])
        .toArray(),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55], [6, 66], [7, 77], [8, 88], ['a', 'x'], ['b', 'y'], ['c', 'z']],
    ],
  ];
}

describe.each([
  ...dataProviderForPeek(),
] as Array<[
    Iterable<unknown>|Iterator<unknown>,
  (data: Iterable<unknown>|Iterator<unknown>) => Stream<unknown>,
  (stream: Stream<unknown>) => Stream<unknown>,
  Array<unknown>,
  Array<unknown>,
]>)(
  "Stream Peek Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    leftChainFunc: (data: Iterable<unknown>|Iterator<unknown>) => Stream<unknown>,
    rightChainFunc: (stream: Stream<unknown>) => Stream<unknown>,
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
  ...dataProviderForPeek(),
] as Array<[
    Iterable<unknown>|Iterator<unknown>,
  (data: Iterable<unknown>|Iterator<unknown>) => Stream<unknown>,
  (stream: Stream<unknown>) => Stream<unknown>,
  Array<unknown>,
  Array<unknown>,
]>)(
  "Stream Peek Stream Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    leftChainFunc: (data: Iterable<unknown>|Iterator<unknown>) => Stream<unknown>,
    rightChainFunc: (stream: Stream<unknown>) => Stream<unknown>,
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

function dataProviderForPeek(): Array<unknown> {
  return [
    [
      [5, 4, 3, 2, 1],
      (iterable: Iterable<unknown>) => Stream.of(iterable),
      (stream: Stream<unknown>) => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: Stream<unknown>) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      [9, 8, 7, 6, 5, 4, 3, 2, 1],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: Stream<unknown>) => stream
        .map((x) => (x as number) + 1)
        .pairwise(),
      [1, 3, 5, 7, 9],
      [[2, 4], [4, 6], [6, 8], [8, 10]],
    ],
  ];
}

describe.each([
  ...dataProviderForReduce(),
] as Array<[Iterable<unknown>|Iterator<unknown>, (data: unknown) => Stream<unknown>, Array<unknown>]>)(
  "Stream Reduce Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    streamFactory: (data: unknown) => Stream<unknown>,
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const result = (streamFactory as (data: unknown) => Stream<unknown>)(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForReduce(): Array<unknown> {
  return [
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 0),
      0,
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .zipLongestWith(
          [10, 20, 30],
          [100, 200, 300]
        )
        .toValue(function (carry, item) {
          return (carry as number) + (item as Array<number>)
            .reduce((accumulator, current) => accumulator + (current ?? 0));
        }, 0),
      675,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toRange(),
      6,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toCount(),
      6,
    ],
    [
      [2, 1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toFirst(),
      2,
    ],
    [
      [2, 1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toFirstAndLast(),
      [2, 5],
    ],
    [
      [2, 3, 1, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toLast(),
      5,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMax(),
      3,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMin(),
      -3,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMinMax((item) => -(item as number)),
      [3, -3],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number>) => Stream.of(iterable).toProduct(),
      -36,
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number>) => Stream.of(iterable).toSum(),
      0,
    ],
  ];
}

describe.each([
  ...dataProviderForSet(),
] as Array<[Iterable<unknown>|Iterator<unknown>, (data: unknown) => Stream<unknown>, Array<unknown>]>)(
  "Stream Set Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    streamFactory: (data: unknown) => Stream<unknown>,
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const result = streamFactory(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForPartialIntersection(),
] as Array<[
    Iterable<unknown>|Iterator<unknown>,
  number,
  (minIntersectionCount: number, data: unknown) => Stream<unknown>,
  Array<unknown>
]>)(
  "Stream Set Partial Intersection Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    minIntersectionCount: number,
    streamFactory: (minIntersectionCount: number, data: unknown) => Stream<unknown>,
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const result = streamFactory(
        minIntersectionCount as number,
        input as Array<Iterable<unknown>>
      );

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForSet(): Array<unknown> {
  return [
    [
      [1, 2, 3, '1', '2', '3'],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .distinct()
        .toArray(),
      [1, 2, 3, '1', '2', '3'],
    ],
    [
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .distinct((datum: unknown) => (datum as Record<string, unknown>)['name'] as Comparable)
        .toArray(),
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      [
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6, 7],
        ['3', 4, 5, 6, 7, 8, 9],
      ],
      (iterables: Array<Iterable<unknown>>) => Stream.of(iterables.shift() as Iterable<unknown>)
        .intersectionWith(...iterables)
        .toArray(),
      [4, 5],
    ],
    [
      [
        [1, 2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7, 8],
        [5, 6, 7, 8, 9, 10],
      ],
      (iterables: Array<Iterable<unknown>>) => Stream.of(iterables.shift() as Iterable<unknown>)
        .symmetricDifferenceWith(...iterables)
        .toArray(),
      [1, 2, 9, 10],
    ],
    [
      [
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7],
      ],
      (iterables: Array<Iterable<unknown>>) => Stream.of(iterables.shift() as Iterable<unknown>)
        .unionWith(...iterables)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      [
        [1, 2, 3],
        [11, 22],
        ['a', 'b'],
      ],
      (iterables: Array<Iterable<unknown>>) => Stream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [
        [1, 11, 'a'],
        [1, 11, 'b'],
        [1, 22, 'a'],
        [1, 22, 'b'],
        [2, 11, 'a'],
        [2, 11, 'b'],
        [2, 22, 'a'],
        [2, 22, 'b'],
        [3, 11, 'a'],
        [3, 11, 'b'],
        [3, 22, 'a'],
        [3, 22, 'b'],
      ],
    ],
  ];
}

function dataProviderForPartialIntersection(): Array<unknown> {
  return [
    [
      [
        createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        createGeneratorFixture(['1', '2', 3, 4, 5, 6, 7, '8', '9']),
        [1, 3, 5, 7, 9, 11],
      ],
      2,
      (minIntersectionCount: number, iterables: Array<Iterable<unknown>>) => Stream.of(iterables.shift() as Iterable<unknown>)
        .partialIntersectionWith(minIntersectionCount, ...iterables)
        .toArray(),
      [1, 3, 4, 5, 6, 7, 9],
    ],
  ];
}

describe.each([
  ...dataProviderForSingle(),
] as Array<[Iterable<unknown>|Iterator<unknown>, (data: unknown) => Stream<unknown>, Array<unknown>]>)(
  "Stream Single Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    streamFactory: (data: unknown) => Stream<unknown>,
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const result = streamFactory(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForSingle(): Array<unknown> {
  return [
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress([0, 1, 1])
        .toArray(),
      [2, 3],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .toArray(),
      [1, -1, 2, -2],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      [['a', 1], ['b', 2], ['c', 3]],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .keys()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      ['a', 'b', 'c'],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [1, 2, 3],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatMap((item) => single.repeat(item, (item as number) + 1))
        .toArray(),
      [1, 1, 2, 2, 2, 3, 3, 3, 3],
    ],
    [
      [1, 2, [3, 4], [5, 6], 7, 8],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatMap((item) => item)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      [1, 2, [3, 4], [5, 6], 7, 8],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwise(2)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8], [8, 9]],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [[1, 2], [2, 3]],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .limit(5)
        .toArray(),
      [1, 2, 3, 4, 5],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .skip(3, 2)
        .toArray(),
      [1, 2, 6, 7, 8, 9, 10],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2, 4)
        .toArray(),
      [3, 4, 5, 6],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) % 2 !== 0)
        .groupBy((item) => (item as number) > 0 ? 'pos' : 'neg')
        .toArray(),
      [['pos', [1, 3]], ['neg', [-1, -3]]],
    ],
    [
      [2, 3, 1, 2, -3, -2, 5, 7, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (lhs as number) - (rhs as number))
        .toArray(),
      [-3, -2, 1, 2, 2, 3, 3, 5, 7],
    ],
  ];
}

describe.each([
  ...dataProviderForSummaryTrue(),
] as Array<[Iterable<unknown>|Iterator<unknown>, (data: unknown) => Stream<unknown>]>)(
  "Stream Summary Test True",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    streamFactory: (data: unknown) => Stream<unknown>
  ) => {
    it("", () => {
      // Given
      const result = streamFactory(input);

      // Then
      expect(result).toBeTruthy();
    });
  }
);


describe.each([
  ...dataProviderForSummaryFalse(),
] as Array<[Iterable<unknown>|Iterator<unknown>, (data: unknown) => Stream<unknown>]>)(
  "Stream Summary Test False",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    streamFactory: (data: unknown) => Stream<unknown>
  ) => {
    it("", () => {
      // Given
      const result = streamFactory(input);

      // Then
      expect(result).toBeFalsy();
    });
  }
);

function dataProviderForSummaryTrue(): Array<unknown> {
  return [
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allUnique(),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch((x) => (x as number) === 3),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .exactlyN(3),
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((item) => (item as number) > 0)
        .runningTotal()
        .isSorted(),
    ],
    [
      [5, -1, 4, -2, 3, -3, 2, -4, 1, -5],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .filter((item) => (item as number) > 0)
        .isReversed(),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .noneMatch((x) => (x as number) === 9),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForSummaryFalse(): Array<unknown> {
  return [
    [
      [1, 3, -5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      [1, 2, 1, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allUnique(),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch((x) => (x as number) > 10),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .exactlyN(4),
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .runningTotal()
        .isSorted(),
    ],
    [
      [5, -1, 4, -2, 3, -3, 2, -4, 1, -5],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .isReversed(),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .noneMatch((x) => (x as number) === 3),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}

describe.each([
  ...dataProviderForTransform(),
] as Array<[Iterable<unknown> | Iterator<unknown>, (data: unknown) => Stream<unknown>, Array<unknown>]>)(
  "Stream Transform Test",
  (
    input: Iterable<unknown> | Iterator<unknown>,
    streamFactory: (data: unknown) => Stream<unknown>,
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const result = streamFactory(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForTee(),
] as Array<[
    Iterable<unknown> | Iterator<unknown>,
  number,
  Array<(stream: Stream<unknown>) => Stream<unknown>>,
  Array<unknown>
]>)(
  "Stream Transform Tee Test",
  (
    input: Iterable<unknown> | Iterator<unknown>,
    count: number,
    extraOperations: Array<(stream: Stream<unknown>) => Stream<unknown>>,
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const inputStream = Stream.of(input);
      const result = [];

      // When
      const streams = inputStream.tee(count);
      for (const [stream, func] of multi.zipEqual(streams, extraOperations)) {
        result.push(func(stream).toArray());
      }

      // Then
      expect(streams.length).toEqual(count);
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForTransform(): Array<unknown> {
  return [
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toArray(),
      [1, 2, 3],
    ],
    [
      [1, 1, 2, 2, 3, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      [['a', 1], ['b', 2], ['c', 3]],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMap(),
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
  ];
}

function dataProviderForTee(): Array<unknown> {
  return [
    [
      createIterableFixture([1, 2, 3]),
      3,
      [
        (stream: Stream<unknown>) => stream,
        (stream: Stream<unknown>) => stream
          .map((datum) => (datum as number) * 2),
        (stream: Stream<unknown>) => stream
          .map((datum) => (datum as number) ** 3),
      ],
      [
        [1, 2, 3],
        [2, 4, 6],
        [1, 8, 27],
      ],
    ],
  ];
}
