import {
  asyncTimeout,
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture,
  expectToBeCloseToArray,
  // @ts-ignore
} from "../fixture";
import { AsyncStream, Comparable, multi, single, Stream } from "../../src";

describe.each([
  ...dataProviderForOfCount(),
] as Array<[Array<number>, number, Array<number>]>)(
  "Stream Infinite Of Count Test",
  (
    inputParams: Array<number>,
    limit: number,
    expected: Array<number>
  ) => {
    it("", async () => {
      // When
      const stream = AsyncStream.ofCount(...inputParams);
      const result = await stream.limit(limit).toArray() as Array<number>;

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
    it("", async () => {
      // When
      const stream = AsyncStream.ofCycle(iterable);
      const result = await stream.limit(limit).toArray() as Array<number>;

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
    it("", async () => {
      // When
      const stream = AsyncStream.ofRepeat(itemToRepeat);
      const result = await stream.limit(limit).toArray() as Array<number>;

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForOfCount(): Array<unknown> {
  return [
    [
      [1, 2],
      5,
      [1, 3, 5, 7, 9],
    ],
    [
      [0, -1],
      5,
      [0, -1, -2, -3, -4],
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
  ];
}

function dataProviderForOfRepeat(): Array<unknown> {
  return [
    [
      1,
      5,
      [1, 1, 1, 1, 1],
    ],
  ];
}

describe.each([
  ...dataProviderForMath(),
] as Array<[
    AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  (data: unknown) => AsyncStream,
  Array<unknown>
]>)(
  "AsyncStream Math Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    streamFactory: (data: unknown) => AsyncStream,
    expected: Array<unknown>
  ) => {
    it("", async () => {
      // Given
      const result = await streamFactory(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForMath(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningAverage()
        .toArray(),
      [1, 1.5, 2],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningDifference()
        .toArray(),
      [-1, -3, -6],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMax(1)
        .toArray(),
      [1, 1, 2, 3],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningMin(1)
        .toArray(),
      [1, 1, 1, 1],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningProduct()
        .toArray(),
      [1, 2, 6],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .toArray(),
      [1, 3, 6],
    ],
  ];
}

describe.each([
  ...dataProviderForMulti(),
] as Array<[
    AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  (data: unknown) => AsyncStream,
  Array<unknown>
]>)(
  "AsyncStream Multi Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    streamFactory: (data: unknown) => AsyncStream,
    expected: Array<unknown>
  ) => {
    it("", async () => {
      // Given
      const result = await streamFactory(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForMulti(): Array<unknown> {
  return [
    [
      [1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .zipWith(
          createAsyncGeneratorFixture([11, 22, 33]),
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
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .zipLongestWith(
          createGeneratorFixture([11, 22, 33]),
          createAsyncIterableFixture([111, 222, 333, 444]),
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
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .zipFilledWith(
          'filler',
          createAsyncGeneratorFixture([11, 22, 33]),
          createAsyncIterableFixture([111, 222, 333, 444]),
          createAsyncIteratorFixture([1111, 2222, 3333]),
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
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .zipEqualWith(
          createGeneratorFixture([11, 22, 33]),
          createAsyncIterableFixture([111, 222, 333]),
          createAsyncIteratorFixture([1111, 2222, 3333]),
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
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chainWith(createAsyncGeneratorFixture([3, 4]))
        .chainWith(createAsyncIterableFixture([5]))
        .chainWith(createAsyncIteratorFixture([6]))
        .chainWith(new Set([7]))
        .chainWith(AsyncStream.of(createMapFixture([8, 9])).map((item) => (item as Array<unknown>)[1]))
        .chainWith('abc')
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c'],
    ],
    [
      [1, 2],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chainWith(createGeneratorFixture([3, 4]))
        .chainWith(createAsyncIterableFixture([5]))
        .chainWith(createAsyncIteratorFixture([6]))
        .chainWith(new Set([7]))
        .chainWith(AsyncStream.of(createMapFixture([8])).map((item) => (item as Array<unknown>)[1]))
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
    AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  (data: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>) => AsyncStream,
  (stream: AsyncStream) => AsyncStream,
  Array<unknown>,
  Array<unknown>,
]>)(
  "AsyncStream Peek Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    leftChainFunc: (data: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>) => AsyncStream,
    rightChainFunc: (stream: AsyncStream) => AsyncStream,
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
  ...dataProviderForPeek(),
] as Array<[
    AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  (data: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>) => AsyncStream,
  (stream: AsyncStream) => AsyncStream,
  Array<unknown>,
  Array<unknown>,
]>)(
  "AsyncStream Peek Stream Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    leftChainFunc: (data: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>) => AsyncStream,
    rightChainFunc: (stream: AsyncStream) => AsyncStream,
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

function dataProviderForPeek(): Array<unknown> {
  return [
    [
      createAsyncIterableFixture([5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable),
      (stream: AsyncStream) => stream,
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .zipWith([11, 22, 33, 44, 55]),
      (stream: AsyncStream) => stream
        .limit(3),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55]],
      [[1, 11], [2, 22], [3, 33]],
    ],
    [
      createAsyncIterableFixture([9, 8, 7, 6, 5, 4, 3, 2, 1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) % 2 !== 0)
        .sort(),
      (stream: AsyncStream) => stream
        .map((x) => (x as number) + 1)
        .pairwise(),
      [1, 3, 5, 7, 9],
      [[2, 4], [4, 6], [6, 8], [8, 10]],
    ],
  ];
}

describe.each([
  ...dataProviderForReduce(),
] as Array<[
    AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  (data: unknown) => AsyncStream,
  Array<unknown>
]>)(
  "AsyncStream Reduce Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    streamFactory: (data: unknown) => AsyncStream,
    expected: Array<unknown>
  ) => {
    it("", async () => {
      // Given
      const result = await (streamFactory as (data: unknown) => AsyncStream)(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForReduce(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toValue(function (carry, item) {
          return (carry as number) + (item as number);
        }, 0),
      0,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toAverage(),
      0,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toRange(),
      6,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toCount(),
      6,
    ],
    [
      createAsyncGeneratorFixture([2, 1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirst(),
      2,
    ],
    [
      createAsyncGeneratorFixture([2, 1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toFirstAndLast(),
      [2, 5],
    ],
    [
      createAsyncGeneratorFixture([2, 3, 1, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toLast(),
      5,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMax(),
      3,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMin(),
      -3,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMinMax((item) => -(item as number)),
      [3, -3],
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable).toProduct(),
      -36,
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toSum(),
      6,
    ],
  ];
}

describe.each([
  ...dataProviderForSet(),
] as Array<[
    AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  (data: unknown) => AsyncStream,
  Array<unknown>
]>)(
  "AsyncStream Set Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    streamFactory: (data: unknown) => AsyncStream,
    expected: Array<unknown>
  ) => {
    it("", async () => {
      // Given
      const result = await streamFactory(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForPartialIntersection(),
] as Array<[
    AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  number,
  (minIntersectionCount: number, data: unknown) => Promise<AsyncStream>,
  Array<unknown>
]>)(
  "AsyncStream Set Partial Intersection Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    minIntersectionCount: number,
    streamFactory: (minIntersectionCount: number, data: unknown) => Promise<AsyncStream>,
    expected: Array<unknown>
  ) => {
    it("", async () => {
      // Given
      const result = await streamFactory(
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
      createAsyncGeneratorFixture([1, 2, 3, '1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct()
        .toArray(),
      [1, 2, 3, '1', '2', '3'],
    ],
    [
      createAsyncGeneratorFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
        createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
        createAsyncGeneratorFixture([2, 3, 4, 5, 6, 7]),
        createAsyncGeneratorFixture(['3', 4, 5, 6, 7, 8, 9]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .intersectionWith(...iterables)
        .toArray(),
      [4, 5],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
        createAsyncGeneratorFixture([3, 4, 5, 6, 7, 8]),
        createAsyncGeneratorFixture([5, 6, 7, 8, 9, 10]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .symmetricDifferenceWith(...iterables)
        .toArray(),
      [1, 2, 9, 10],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
        createAsyncGeneratorFixture([2, 3, 4, 5, 6]),
        createAsyncGeneratorFixture([3, 4, 5, 6, 7]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .unionWith(...iterables)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture([11, 22]),
        createAsyncGeneratorFixture(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
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
        createAsyncGeneratorFixture([1, 2]),
        createAsyncIterableFixture([2, 3, 4]),
        [2, 3, 4, 5, 6],
      ],
      3,
      (minIntersectionCount: number, iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .partialIntersectionWith(minIntersectionCount, ...iterables)
        .toArray(),
      [2],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        createAsyncGeneratorFixture(['1', '2', 3, 4, 5, 6, 7, '8', '9']),
        [1, 3, 5, 7, 9, 11],
      ],
      2,
      (minIntersectionCount: number, iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .partialIntersectionWith(minIntersectionCount, ...iterables)
        .toArray(),
      [1, 3, 4, 5, 6, 7, 9],
    ],
  ];
}

describe.each([
  ...dataProviderForSingle(),
] as Array<[
    AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  (data: unknown) => AsyncStream,
  Array<unknown>
]>)(
  "AsyncStream Single Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    streamFactory: (data: unknown) => AsyncStream,
    expected: Array<unknown>
  ) => {
    it("", async () => {
      // Given
      const result = await streamFactory(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);
function dataProviderForSingle(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createAsyncGeneratorFixture([0, 1, 1]))
        .toArray(),
      [2, 3],
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .dropWhile((value) => Math.abs(value as number) < 3)
        .compress(createAsyncGeneratorFixture([0, 1]))
        .toArray(),
      [-3],
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .toArray(),
      [1, -1, 2, -2],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      createAsyncGeneratorFixture([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .keys()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      createAsyncGeneratorFixture([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatMap((item) => single.repeatAsync(item, (item as number) + 1))
        .toArray(),
      [1, 1, 2, 2, 2, 3, 3, 3, 3],
    ],
    [
      createAsyncGeneratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatMap(async (item) => {
          await asyncTimeout(1);
          return item;
        })
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createAsyncGeneratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createAsyncGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwise(2)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      createAsyncGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8], [8, 9]],
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [[1, 2], [2, 3]],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(5)
        .toArray(),
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(0)
        .chainWith(createAsyncGeneratorFixture([1, 2, 3]))
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(3, 2)
        .toArray(),
      [1, 2, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, 4)
        .toArray(),
      [3, 4, 5, 6],
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) % 2 !== 0)
        .groupBy((item) => (item as number) > 0 ? 'pos' : 'neg')
        .toArray(),
      [['pos', [1, 3]], ['neg', [-1, -3]]],
    ],
    [
      createAsyncGeneratorFixture([2, 3, 1, 2, -3, -2, 5, 7, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (lhs as number) - (rhs as number))
        .toArray(),
      [-3, -2, 1, 2, 2, 3, 3, 5, 7],
    ],
  ];
}

describe.each([
  ...dataProviderForSummaryTrue(),
] as Array<[
    AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  (data: unknown) => AsyncStream
]>)(
  "AsyncStream Summary Test True",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    streamFactory: (data: unknown) => AsyncStream
  ) => {
    it("", async () => {
      // Given
      const result = await streamFactory(input);

      // Then
      expect(result).toBeTruthy();
    });
  }
);

describe.each([
  ...dataProviderForSummaryFalse(),
] as Array<[
    AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  (data: unknown) => AsyncStream
]>)(
  "AsyncStream Summary Test False",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    streamFactory: (data: unknown) => AsyncStream
  ) => {
    it("", async () => {
      // Given
      const result = await streamFactory(input);

      // Then
      expect(result).toBeFalsy();
    });
  }
);

function dataProviderForSummaryTrue(): Array<unknown> {
  return [
    [
      createAsyncIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createAsyncIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch(async (x) => {
          await asyncTimeout(1);
          return (x as number) === 3;
        }),
    ],
    [
      createAsyncIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) > 0),
    ],
    [
      createAsyncIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(3),
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((item) => (item as number) > 0)
        .runningTotal()
        .isSorted(),
    ],
    [
      createAsyncIterableFixture([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((item) => (item as number) > 0)
        .isReversed(),
    ],
    [
      createAsyncIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch((x) => (x as number) === 9),
    ],
    [
      createAsyncIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      createAsyncIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForSummaryFalse(): Array<unknown> {
  return [
    [
      createAsyncIterableFixture([1, 3, -5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch(async (x) => {
          await asyncTimeout(1);
          return (x as number) > 0;
        }),
    ],
    [
      createAsyncIterableFixture([1, 2, 1, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createAsyncIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) > 10),
    ],
    [
      createAsyncIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(4),
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .isSorted(),
    ],
    [
      createAsyncIterableFixture([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .isReversed(),
    ],
    [
      createAsyncIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch(async (x) => {
          await asyncTimeout(1);
          return (x as number) === 3;
        }),
    ],
    [
      createAsyncIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
  ];
}

describe.each([
  ...dataProviderForTransform(),
] as Array<[
    AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  (data: unknown) => AsyncStream,
  Array<unknown>
]>)(
  "AsyncStream Transform Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    streamFactory: (data: unknown) => AsyncStream,
    expected: Array<unknown>
  ) => {
    it("", async () => {
      // Given
      const result = await streamFactory(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForTee(),
] as Array<[
    AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  number,
  Array<(stream: AsyncStream) => AsyncStream>,
  Array<unknown>
]>)(
  "AsyncStream Transform Tee Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    count: number,
    extraOperations: Array<(stream: AsyncStream) => AsyncStream>,
    expected: Array<unknown>
  ) => {
    it("", async () => {
      // Given
      const inputStream = AsyncStream.of(input);
      const result = [];

      // When
      const streams = inputStream.tee(count);
      for (const [stream, func] of multi.zipEqual(streams, extraOperations)) {
        result.push(await func(stream).toArray());
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
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncGeneratorFixture([1, 1, 2, 2, 3, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      createAsyncGeneratorFixture([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
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
        (stream: Stream) => stream,
        (stream: Stream) => stream
          .map((datum) => (datum as number) * 2),
        (stream: Stream) => stream
          .map((datum) => (datum as number) ** 3),
      ],
      [
        [1, 2, 3],
        [2, 4, 6],
        [1, 8, 27],
      ],
    ],
    [
      new Set([1, 2, 3]),
      3,
      [
        (stream: Stream) => stream,
        (stream: Stream) => stream
          .map((datum) => (datum as number) * 2),
        (stream: Stream) => stream
          .map((datum) => (datum as number) ** 3)
          .filter((datum) => (datum as number) < 10),
      ],
      [
        [1, 2, 3],
        [2, 4, 6],
        [1, 8],
      ],
    ],
  ];
}
