import {
  asyncTimeout,
  createAsyncGeneratorFixture, createAsyncIterableFixture, createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture,
  // @ts-ignore
} from "../fixture";
import { AsyncStream, single } from '../../src';

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

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress([0, 1, 1])
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress([0, 1, 1])
        .toArray(),
      [2, 3],
    ],
    [
      [],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress([0, 1, 1])
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress([0, 1, 1])
        .toArray(),
      [2, 3],
    ],
    [
      [],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress([0, 1, 1])
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress([0, 1, 1])
        .toArray(),
      [2, 3],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .dropWhile((value) => Math.abs(value as number) < 3)
        .compress([0, 1])
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .dropWhile((value) => Math.abs(value as number) < 3)
        .compress([0, 1])
        .toArray(),
      [-3],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .toArray(),
      [1, -1, 2, -2],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .compress([0, 1, 0, 1])
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .compress([0, 1, 0, 1])
        .toArray(),
      [-1, -2],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [],
    ],
    [
      [1],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1]],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      [['a', 1], ['b', 2], ['c', 3]],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .keys()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .keys()
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .keys()
        .toArray(),
      [],
    ],
    [
      ['a', 'b', 'c'],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .keys()
        .toArray(),
      [0, 1, 2],
    ],
    [
      [['a', 1], ['b', 2], ['c', 3]],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .toArray(),
      [1, 2, 3],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      [],
    ],
    [
      ['a', 'b', 'c'],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [1, 2, 3],
    ],
    [
      [],
      () => AsyncStream.ofEmpty()
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      [1],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      ['a', 'b', 'c'],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      [[1], [2], [3]],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as Array<number>)[0])
        .toArray(),
      [1, 2, 3],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatMap((item) => single.repeat(item, (item as number) + 1))
        .toArray(),
      [1, 1, 2, 2, 2, 3, 3, 3, 3],
    ],
    [
      [1, 2, [3, 4], [5, 6], 7, 8],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatMap((item) => item)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      [1, 2, [3, 4], [5, 6], 7, 8],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      [1, 2, [3, 4], [5, 6], 7, 8],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      [1, 2, [3, 4], [5, 6], 7, 8],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(2)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      [1, 2, [3, 4], [5, 6], 7, 8],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(0)
        .toArray(),
      [1, 2, [3, 4], [5, 6], 7, 8],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwise(2)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwise(2)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[-1, -2]],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[1, 2], [3, 4]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8], [8, 9]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1, false)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2, false)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [[1, 2], [2, 3]],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(0)
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(5)
        .toArray(),
      [],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(5)
        .toArray(),
      [1, 2, 3, 4, 5],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(2)
        .toArray(),
      [1, 2],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(0)
        .chainWith([1, 2, 3])
        .toArray(),
      [1, 2, 3],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(0)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(0, 1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(10, 10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(3)
        .toArray(),
      [4, 5, 6, 7, 8, 9, 10],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(3, 2)
        .toArray(),
      [1, 2, 6, 7, 8, 9, 10],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(10, 2)
        .toArray(),
      [1, 2],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2)
        .toArray(),
      [3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, 4)
        .toArray(),
      [3, 4, 5, 6],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, undefined, 2)
        .toArray(),
      [3, 5, 7, 9],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, 3, 2)
        .toArray(),
      [3, 5, 7],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) % 2 !== 0)
        .groupBy((item) => (item as number) > 0 ? 'pos' : 'neg')
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) % 2 !== 0)
        .groupBy((item) => (item as number) > 0 ? 'pos' : 'neg')
        .toArray(),
      [['pos', [1, 3]], ['neg', [-1, -3]]],
    ],
    [
      ['b', 'f', 'c', 'e', 'd', 'a'],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort()
        .toArray(),
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      [2, 3, 1, 2, -3, -2, 5, 7, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (lhs as number) - (rhs as number))
        .toArray(),
      [-3, -2, 1, 2, 2, 3, 3, 5, 7],
    ],
    [
      [2, 3, 1, 2, -3, -2, 5, 7, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (rhs as number) - (lhs as number))
        .toArray(),
      [7, 5, 3, 3, 2, 2, 1, -2, -3],
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createGeneratorFixture([0, 1, 1]))
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createGeneratorFixture([0, 1, 1]))
        .toArray(),
      [2, 3],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createGeneratorFixture([0, 1, 1]))
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createGeneratorFixture([0, 1, 1]))
        .toArray(),
      [2, 3],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createGeneratorFixture([0, 1, 1]))
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createGeneratorFixture([0, 1, 1]))
        .toArray(),
      [2, 3],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .dropWhile((value) => Math.abs(value as number) < 3)
        .compress(createGeneratorFixture([0, 1]))
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .dropWhile((value) => Math.abs(value as number) < 3)
        .compress(createGeneratorFixture([0, 1]))
        .toArray(),
      [-3],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .toArray(),
      [1, -1, 2, -2],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .compress(createGeneratorFixture([0, 1, 0, 1]))
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .compress(createGeneratorFixture([0, 1, 0, 1]))
        .toArray(),
      [-1, -2],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1]],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      createGeneratorFixture([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .keys()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .keys()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .keys()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .keys()
        .toArray(),
      [0, 1, 2],
    ],
    [
      createGeneratorFixture([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [1, 2, 3],
    ],
    [
      createGeneratorFixture([]),
      () => AsyncStream.ofEmpty()
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      createGeneratorFixture([[1], [2], [3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as Array<number>)[0])
        .toArray(),
      [1, 2, 3],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatMap((item) => single.repeat(item, (item as number) + 1))
        .toArray(),
      [1, 1, 2, 2, 2, 3, 3, 3, 3],
    ],
    [
      createGeneratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatMap((item) => item)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createGeneratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createGeneratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createGeneratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(2)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createGeneratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(0)
        .toArray(),
      [1, 2, [3, 4], [5, 6], 7, 8],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwise(2)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwise(2)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[-1, -2]],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[1, 2], [3, 4]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8], [8, 9]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1, false)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2, false)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [[1, 2], [2, 3]],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(0)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(5)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(5)
        .toArray(),
      [1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(2)
        .toArray(),
      [1, 2],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(0)
        .chainWith([1, 2, 3])
        .toArray(),
      [1, 2, 3],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(0)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(0, 1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(10, 10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(3)
        .toArray(),
      [4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(3, 2)
        .toArray(),
      [1, 2, 6, 7, 8, 9, 10],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(10, 2)
        .toArray(),
      [1, 2],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2)
        .toArray(),
      [3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, 4)
        .toArray(),
      [3, 4, 5, 6],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, undefined, 2)
        .toArray(),
      [3, 5, 7, 9],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, 3, 2)
        .toArray(),
      [3, 5, 7],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) % 2 !== 0)
        .groupBy((item) => (item as number) > 0 ? 'pos' : 'neg')
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) % 2 !== 0)
        .groupBy((item) => (item as number) > 0 ? 'pos' : 'neg')
        .toArray(),
      [['pos', [1, 3]], ['neg', [-1, -3]]],
    ],
    [
      createGeneratorFixture(['b', 'f', 'c', 'e', 'd', 'a']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort()
        .toArray(),
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createGeneratorFixture([2, 3, 1, 2, -3, -2, 5, 7, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (lhs as number) - (rhs as number))
        .toArray(),
      [-3, -2, 1, 2, 2, 3, 3, 5, 7],
    ],
    [
      createGeneratorFixture([2, 3, 1, 2, -3, -2, 5, 7, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (rhs as number) - (lhs as number))
        .toArray(),
      [7, 5, 3, 3, 2, 2, 1, -2, -3],
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createIterableFixture([0, 1, 1]))
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createIterableFixture([0, 1, 1]))
        .toArray(),
      [2, 3],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createIterableFixture([0, 1, 1]))
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createIterableFixture([0, 1, 1]))
        .toArray(),
      [2, 3],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createIterableFixture([0, 1, 1]))
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createIterableFixture([0, 1, 1]))
        .toArray(),
      [2, 3],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .dropWhile((value) => Math.abs(value as number) < 3)
        .compress(createIterableFixture([0, 1]))
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .dropWhile((value) => Math.abs(value as number) < 3)
        .compress(createIterableFixture([0, 1]))
        .toArray(),
      [-3],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .toArray(),
      [1, -1, 2, -2],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .compress(createIterableFixture([0, 1, 0, 1]))
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .compress(createIterableFixture([0, 1, 0, 1]))
        .toArray(),
      [-1, -2],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1]],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      createIterableFixture([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .keys()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .keys()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .keys()
        .toArray(),
      [],
    ],
    [
      createIterableFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .keys()
        .toArray(),
      [0, 1, 2],
    ],
    [
      createIterableFixture([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      [],
    ],
    [
      createIterableFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIterableFixture([]),
      () => AsyncStream.ofEmpty()
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      createIterableFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      createIterableFixture([[1], [2], [3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as Array<number>)[0])
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatMap((item) => single.repeat(item, (item as number) + 1))
        .toArray(),
      [1, 1, 2, 2, 2, 3, 3, 3, 3],
    ],
    [
      createIterableFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatMap((item) => item)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createIterableFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createIterableFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createIterableFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(2)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createIterableFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(0)
        .toArray(),
      [1, 2, [3, 4], [5, 6], 7, 8],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwise(2)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwise(2)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[-1, -2]],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[1, 2], [3, 4]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8], [8, 9]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1, false)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2, false)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [[1, 2], [2, 3]],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(0)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(5)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(5)
        .toArray(),
      [1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(2)
        .toArray(),
      [1, 2],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(0)
        .chainWith([1, 2, 3])
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(0)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(0, 1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(10, 10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(3)
        .toArray(),
      [4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(3, 2)
        .toArray(),
      [1, 2, 6, 7, 8, 9, 10],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(10, 2)
        .toArray(),
      [1, 2],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2)
        .toArray(),
      [3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, 4)
        .toArray(),
      [3, 4, 5, 6],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, undefined, 2)
        .toArray(),
      [3, 5, 7, 9],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, 3, 2)
        .toArray(),
      [3, 5, 7],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) % 2 !== 0)
        .groupBy((item) => (item as number) > 0 ? 'pos' : 'neg')
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) % 2 !== 0)
        .groupBy((item) => (item as number) > 0 ? 'pos' : 'neg')
        .toArray(),
      [['pos', [1, 3]], ['neg', [-1, -3]]],
    ],
    [
      createIterableFixture(['b', 'f', 'c', 'e', 'd', 'a']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort()
        .toArray(),
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createIterableFixture([2, 3, 1, 2, -3, -2, 5, 7, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (lhs as number) - (rhs as number))
        .toArray(),
      [-3, -2, 1, 2, 2, 3, 3, 5, 7],
    ],
    [
      createIterableFixture([2, 3, 1, 2, -3, -2, 5, 7, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (rhs as number) - (lhs as number))
        .toArray(),
      [7, 5, 3, 3, 2, 2, 1, -2, -3],
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createIteratorFixture([0, 1, 1]))
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createIteratorFixture([0, 1, 1]))
        .toArray(),
      [2, 3],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createIteratorFixture([0, 1, 1]))
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createIteratorFixture([0, 1, 1]))
        .toArray(),
      [2, 3],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createIteratorFixture([0, 1, 1]))
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createIteratorFixture([0, 1, 1]))
        .toArray(),
      [2, 3],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .dropWhile((value) => Math.abs(value as number) < 3)
        .compress(createIteratorFixture([0, 1]))
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .dropWhile((value) => Math.abs(value as number) < 3)
        .compress(createIteratorFixture([0, 1]))
        .toArray(),
      [-3],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .toArray(),
      [1, -1, 2, -2],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .compress(createIteratorFixture([0, 1, 0, 1]))
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .compress(createIteratorFixture([0, 1, 0, 1]))
        .toArray(),
      [-1, -2],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1]],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      createIteratorFixture([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .keys()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .keys()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .keys()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .keys()
        .toArray(),
      [0, 1, 2],
    ],
    [
      createIteratorFixture([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIteratorFixture([]),
      () => AsyncStream.ofEmpty()
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      createIteratorFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      createIteratorFixture([[1], [2], [3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as Array<number>)[0])
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatMap((item) => single.repeat(item, (item as number) + 1))
        .toArray(),
      [1, 1, 2, 2, 2, 3, 3, 3, 3],
    ],
    [
      createIteratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatMap((item) => item)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createIteratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createIteratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createIteratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(2)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createIteratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(0)
        .toArray(),
      [1, 2, [3, 4], [5, 6], 7, 8],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwise(2)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwise(2)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[-1, -2]],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[1, 2], [3, 4]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8], [8, 9]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1, false)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2, false)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [[1, 2], [2, 3]],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .limit(0)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .limit(5)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .limit(5)
        .toArray(),
      [1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(2)
        .toArray(),
      [1, 2],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .limit(0)
        .chainWith([1, 2, 3])
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(0)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(0, 1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(10, 10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(3)
        .toArray(),
      [4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(3, 2)
        .toArray(),
      [1, 2, 6, 7, 8, 9, 10],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(10, 2)
        .toArray(),
      [1, 2],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2)
        .toArray(),
      [3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, 4)
        .toArray(),
      [3, 4, 5, 6],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, undefined, 2)
        .toArray(),
      [3, 5, 7, 9],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, 3, 2)
        .toArray(),
      [3, 5, 7],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) % 2 !== 0)
        .groupBy((item) => (item as number) > 0 ? 'pos' : 'neg')
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) % 2 !== 0)
        .groupBy((item) => (item as number) > 0 ? 'pos' : 'neg')
        .toArray(),
      [['pos', [1, 3]], ['neg', [-1, -3]]],
    ],
    [
      createIteratorFixture(['b', 'f', 'c', 'e', 'd', 'a']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort()
        .toArray(),
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createIteratorFixture([2, 3, 1, 2, -3, -2, 5, 7, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (lhs as number) - (rhs as number))
        .toArray(),
      [-3, -2, 1, 2, 2, 3, 3, 5, 7],
    ],
    [
      createIteratorFixture([2, 3, 1, 2, -3, -2, 5, 7, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (rhs as number) - (lhs as number))
        .toArray(),
      [7, 5, 3, 3, 2, 2, 1, -2, -3],
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .dropWhile((value) => Math.abs(value as number) < 3)
        .compress([0, 1])
        .toArray(),
      [],
    ],
    [
      '12345',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .dropWhile((value) => Number(value as string) < 3)
        .compress([1, 0, 1])
        .toArray(),
      ['3', '5'],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Number(value as string) < 3)
        .toArray(),
      [],
    ],
    [
      '12345',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Number(value as string) < 4)
        .toArray(),
      ['1', '2', '3'],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Number(value as string) < 3)
        .compress([0, 1, 0, 1])
        .toArray(),
      [],
    ],
    [
      '12345',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Number(value as string) < 5)
        .compress([0, 1, 0, 1])
        .toArray(),
      ['2', '4'],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, '1']],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, '1'], [1, '2'], [2, '3']],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .keys()
        .toArray(),
      [],
    ],
    [
      'abc',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .keys()
        .toArray(),
      [0, 1, 2],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      [],
    ],
    [
      'abc',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => parseInt(value as string) > 0)
        .toArray(),
      [],
    ],
    [
      '123456',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => parseInt(value as string) % 2 === 0)
        .toArray(),
      ['2', '4', '6'],
    ],
    [
      '',
      () => AsyncStream.ofEmpty()
        .map((item) => `[${item}]`)
        .toArray(),
      [],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[1]'],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[1]', '[2]', '[3]'],
    ],
    [
      'abc',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatMap((item) => single.repeat(parseInt(item as string), parseInt(item as string) + 1))
        .toArray(),
      [1, 1, 2, 2, 2, 3, 3, 3, 3],
    ],
    [
      createGeneratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      'abc',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(1)
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chunkwise(2)
        .toArray(),
      [],
    ],
    [
      'abc',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chunkwise(2)
        .toArray(),
      [['a', 'b'], ['c']],
    ],
    [
      '012345',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => parseInt(value as string) > 0)
        .chunkwise(2)
        .toArray(),
      [['1', '2'], ['3', '4'], ['5']],
    ],
    [
      '012345',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chunkwise(2)
        .toArray(),
      [['0', '1'], ['2', '3'], ['4', '5']],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [],
    ],
    [
      'abc',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [['a', 'b'], ['c']],
    ],
    [
      'abc',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [['a', 'b']],
    ],
    [
      'abc',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [['a', 'b'], ['b', 'c']],
    ],
    [
      'abc',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [['a', 'b'], ['b', 'c']],
    ],
    [
      'abcde',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [['a', 'b'], ['c', 'd'], ['e']],
    ],
    [
      'abcde',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [['a', 'b'], ['c', 'd']],
    ],
    [
      'abcde',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']],
    ],
    [
      'abcde',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']],
    ],
    [
      'abcdef',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [['a', 'b'], ['c', 'd'], ['e', 'f']],
    ],
    [
      'abcdef',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [['a', 'b'], ['c', 'd'], ['e', 'f']],
    ],
    [
      'abcdef',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f']],
    ],
    [
      'abcdef',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f']],
    ],
    [
      'abcdefghij',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chunkwiseOverlap(3, 1)
        .toArray(),
      [['a', 'b', 'c'], ['c', 'd', 'e'], ['e', 'f', 'g'], ['g', 'h', 'i'], ['i', 'j']],
    ],
    [
      'abcdefghij',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chunkwiseOverlap(3, 1, false)
        .toArray(),
      [['a', 'b', 'c'], ['c', 'd', 'e'], ['e', 'f', 'g'], ['g', 'h', 'i']],
    ],
    [
      'abcdefghij',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chunkwiseOverlap(3, 2)
        .toArray(),
      [
        ['a', 'b', 'c'],
        ['b', 'c', 'd'],
        ['c', 'd', 'e'],
        ['d', 'e', 'f'],
        ['e', 'f', 'g'],
        ['f', 'g', 'h'],
        ['g', 'h', 'i'],
        ['h', 'i', 'j'],
      ],
    ],
    [
      'abcdefghij',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .chunkwiseOverlap(3, 2, false)
        .toArray(),
      [
        ['a', 'b', 'c'],
        ['b', 'c', 'd'],
        ['c', 'd', 'e'],
        ['d', 'e', 'f'],
        ['e', 'f', 'g'],
        ['f', 'g', 'h'],
        ['g', 'h', 'i'],
        ['h', 'i', 'j'],
      ],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .pairwise()
        .toArray(),
      [],
    ],
    [
      'abc',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .pairwise()
        .toArray(),
      [['a', 'b'], ['b', 'c']],
    ],
    [
      'abcdef',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .pairwise()
        .toArray(),
      [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f']],
    ],
    [
      '',
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .limit(0)
        .toArray(),
      [],
    ],
    [
      '',
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .limit(5)
        .toArray(),
      [],
    ],
    [
      '1234567',
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .limit(5)
        .toArray(),
      ['1', '2', '3', '4', '5'],
    ],
    [
      '1234567',
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .limit(10)
        .toArray(),
      ['1', '2', '3', '4', '5', '6', '7'],
    ],
    [
      '1234567890',
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(2)
        .toArray(),
      ['1', '2'],
    ],
    [
      '1234567890',
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(10)
        .toArray(),
      ['1', '2', '3', '4', '0'],
    ],
    [
      '',
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .limit(0)
        .chainWith('123')
        .toArray(),
      ['1', '2', '3'],
    ],
    [
      '123456789',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(0)
        .toArray(),
      ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ],
    [
      '123456789',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(0, 1)
        .toArray(),
      ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ],
    [
      '123456789',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(10, 10)
        .toArray(),
      ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ],
    [
      '123456789',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(3)
        .toArray(),
      ['4', '5', '6', '7', '8', '9'],
    ],
    [
      '123456789',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(3, 2)
        .toArray(),
      ['1', '2', '6', '7', '8', '9'],
    ],
    [
      '123456789',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(10, 2)
        .toArray(),
      ['1', '2'],
    ],
    [
      '1234567890',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice()
        .toArray(),
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ],
    [
      '1234567890',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2)
        .toArray(),
      ['3', '4', '5', '6', '7', '8', '9', '0'],
    ],
    [
      '1234567890',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, 4)
        .toArray(),
      ['3', '4', '5', '6'],
    ],
    [
      '1234567890',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, undefined, 2)
        .toArray(),
      ['3', '5', '7', '9'],
    ],
    [
      '1234567890',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, 3, 2)
        .toArray(),
      ['3', '5', '7'],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .groupBy((item) => Number(item as string) % 2 === 0 ? 'even' : 'odd')
        .toArray(),
      [],
    ],
    [
      '123456',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .groupBy((item) => Number(item as string) % 2 === 0 ? 'even' : 'odd')
        .toArray(),
      [['odd', ['1', '3', '5']], ['even', ['2', '4', '6']]],
    ],
    [
      'bfceda',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort()
        .toArray(),
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      '231232573',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (lhs as number) - (rhs as number))
        .toArray(),
      ['1', '2', '2', '2', '3', '3', '3', '5', '7'],
    ],
    [
      '231232573',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (rhs as number) - (lhs as number))
        .toArray(),
      ['7', '5', '3', '3', '3', '2', '2', '2', '1'],
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .dropWhile((value) => Math.abs(value as number) < 3)
        .compress(new Set([0, 1]))
        .toArray(),
      [],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .dropWhile((value) => Math.abs(value as number) < 3)
        .compress(new Set([0, 1]))
        .toArray(),
      [-3],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .toArray(),
      [],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .toArray(),
      [1, -1, 2, -2],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .compress([0, 1, 0, 1])
        .toArray(),
      [],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .compress([0, 1, 0, 1])
        .toArray(),
      [-1, -2],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [],
    ],
    [
      new Set([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1]],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      new Set([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .keys()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .keys()
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .keys()
        .toArray(),
      [],
    ],
    [
      new Set(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .keys()
        .toArray(),
      [0, 1, 2],
    ],
    [
      new Set([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      [],
    ],
    [
      new Set(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set([]),
      () => AsyncStream.ofEmpty()
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      new Set([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      new Set(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      new Set([[1], [2], [3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as Array<number>)[0])
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatMap((item) => single.repeat(item, (item as number) + 1))
        .toArray(),
      [1, 1, 2, 2, 2, 3, 3, 3, 3],
    ],
    [
      new Set([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatMap((item) => item)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      new Set([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      new Set([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      new Set([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(2)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      new Set([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(0)
        .toArray(),
      [1, 2, [3, 4], [5, 6], 7, 8],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwise(2)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwise(2)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[-1, -2]],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[1, 2], [3, 4]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8], [8, 9]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1, false)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2, false)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [[1, 2], [2, 3]],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      new Set([]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .limit(0)
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .limit(5)
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .limit(5)
        .toArray(),
      [1, 2, 3, 4, 5],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(2)
        .toArray(),
      [1, 2],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4],
    ],
    [
      new Set([]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .limit(0)
        .chainWith([1, 2, 3])
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(0)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(0, 1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(10, 10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(3)
        .toArray(),
      [4, 5, 6, 7, 8, 9, 10],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(3, 2)
        .toArray(),
      [1, 2, 6, 7, 8, 9, 10],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(10, 2)
        .toArray(),
      [1, 2],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2)
        .toArray(),
      [3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, 4)
        .toArray(),
      [3, 4, 5, 6],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, undefined, 2)
        .toArray(),
      [3, 5, 7, 9],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, 3, 2)
        .toArray(),
      [3, 5, 7],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) % 2 !== 0)
        .groupBy((item) => (item as number) > 0 ? 'pos' : 'neg')
        .toArray(),
      [],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) % 2 !== 0)
        .groupBy((item) => (item as number) > 0 ? 'pos' : 'neg')
        .toArray(),
      [['pos', [1, 3]], ['neg', [-1, -3]]],
    ],
    [
      new Set(['b', 'f', 'c', 'e', 'd', 'a']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort()
        .toArray(),
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      new Set([2, 3, 1, -3, -2, 5, 7]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (lhs as number) - (rhs as number))
        .toArray(),
      [-3, -2, 1, 2, 3, 5, 7],
    ],
    [
      new Set([2, 3, 1, -3, -2, 5, 7]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (rhs as number) - (lhs as number))
        .toArray(),
      [7, 5, 3, 2, 1, -2, -3],
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .values()
        .filter((value) => (value as number) > 0)
        .compress([0, 1, 1])
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .values()
        .filter((value) => (value as number) > 0)
        .compress([0, 1, 1])
        .toArray(),
      [2, 3],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .values()
        .filter((value) => (value as number) > 0)
        .compress([0, 1, 1])
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .values()
        .filter((value) => (value as number) > 0)
        .compress([0, 1, 1])
        .toArray(),
      [2, 3],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .values()
        .filter((value) => (value as number) > 0)
        .compress([0, 1, 1])
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .values()
        .filter((value) => (value as number) > 0)
        .compress([0, 1, 1])
        .toArray(),
      [2, 3],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .dropWhile((value) => Math.abs((value as [number, number])[1]) < 3)
        .compress([0, 1])
        .values()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .dropWhile((value) => Math.abs((value as [number, number])[1]) < 3)
        .compress([0, 1])
        .values()
        .toArray(),
      [-3],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs((value as [number, number])[1]) < 3)
        .values()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs((value as [number, number])[1]) < 3)
        .values()
        .toArray(),
      [1, -1, 2, -2],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs((value as [number, number])[1]) < 3)
        .compress([0, 1, 0, 1])
        .values()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs((value as [number, number])[1]) < 3)
        .compress([0, 1, 0, 1])
        .values()
        .toArray(),
      [-1, -2],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, [0, 1]]],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, [0, 1]], [1, [1, 2]], [2, [2, 3]]],
    ],
    [
      new Map([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .keys()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      new Map([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .keys()
        .toArray(),
      [],
    ],
    [
      new Map([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Map([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as Array<number>)[1])
        .filter((value) => (value as number) > 0)
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as Array<number>)[1])
        .filter((value) => (value as number) > 0)
        .toArray(),
      [1, 2, 3],
    ],
    [
      createMapFixture([]),
      () => AsyncStream.ofEmpty()
        .map((item) => (item as Array<number>)[1] + 1)
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as Array<number>)[1] + 1)
        .toArray(),
      [],
    ],
    [
      createMapFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as Array<number>)[1] + 1)
        .toArray(),
      [2],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as Array<number>)[1] + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      createMapFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => `[${(item as Array<string>)[1]}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      createMapFixture([[1], [2], [3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as Array<Array<number>>)[1][0])
        .toArray(),
      [1, 2, 3],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatMap((item) => single.repeat((item as Array<unknown>)[1], ((item as Array<unknown>)[1] as number) + 1))
        .toArray(),
      [1, 1, 2, 2, 2, 3, 3, 3, 3],
    ],
    [
      createMapFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatMap((item) => (item as Array<unknown>)[1])
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createMapFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .flatten()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createMapFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .flatten(1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createMapFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .flatten(2)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createMapFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .flatten(0)
        .toArray(),
      [1, 2, [3, 4], [5, 6], 7, 8],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as Array<number>)[1] < 0)
        .chunkwise(2)
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as Array<number>)[1] < 0)
        .chunkwise(2)
        .toArray(),
      [[[1, -1], [3, -2]], [[5, -3]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .chunkwise(2)
        .toArray(),
      [[[4, 1], [5, 2]], [[6, 3], [7, 4]], [[8, 5]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as Array<number>)[1] >= 0)
        .chunkwise(2)
        .toArray(),
      [[[3, 0], [4, 1]], [[5, 2], [6, 3]], [[7, 4], [8, 5]]],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as Array<number>)[1] > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as Array<number>)[1] > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as Array<number>)[1] > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as Array<number>)[1] > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as Array<number>)[1] > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[[1, -1], [3, -2]], [[5, -3]]],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as Array<number>)[1] > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[[1, -1], [3, -2]]],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as Array<number>)[1] > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[[1, -1], [3, -2]], [[3, -2], [5, -3]]],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as Array<number>)[1] > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[[1, -1], [3, -2]], [[3, -2], [5, -3]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[[4, 1], [5, 2]], [[6, 3], [7, 4]], [[8, 5]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[[4, 1], [5, 2]], [[6, 3], [7, 4]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[[4, 1], [5, 2]], [[5, 2], [6, 3]], [[6, 3], [7, 4]], [[7, 4], [8, 5]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[[4, 1], [5, 2]], [[5, 2], [6, 3]], [[6, 3], [7, 4]], [[7, 4], [8, 5]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as Array<number>)[1] >= 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[[3, 0], [4, 1]], [[5, 2], [6, 3]], [[7, 4], [8, 5]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as Array<number>)[1] >= 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[[3, 0], [4, 1]], [[5, 2], [6, 3]], [[7, 4], [8, 5]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as Array<number>)[1] >= 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[[3, 0], [4, 1]], [[4, 1], [5, 2]], [[5, 2], [6, 3]], [[6, 3], [7, 4]], [[7, 4], [8, 5]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as Array<number>)[1] >= 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[[3, 0], [4, 1]], [[4, 1], [5, 2]], [[5, 2], [6, 3]], [[6, 3], [7, 4]], [[7, 4], [8, 5]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as Array<number>)[1] >= 0)
        .chunkwiseOverlap(3, 1)
        .toArray(),
      [
        [[3, 0], [4, 1], [5, 2]],
        [[5, 2], [6, 3], [7, 4]],
        [[7, 4], [8, 5], [9, 6]],
        [[9, 6], [10, 7], [11, 8]],
        [[11, 8], [12, 9]],
      ],
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8], [8, 9]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as Array<number>)[1] >= 0)
        .chunkwiseOverlap(3, 1, false)
        .toArray(),
      [
        [[3, 0], [4, 1], [5, 2]],
        [[5, 2], [6, 3], [7, 4]],
        [[7, 4], [8, 5], [9, 6]],
        [[9, 6], [10, 7], [11, 8]],
      ],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as Array<number>)[1] >= 0)
        .chunkwiseOverlap(3, 2)
        .toArray(),
      [
        [[3, 0], [4, 1], [5, 2]],
        [[4, 1], [5, 2], [6, 3]],
        [[5, 2], [6, 3], [7, 4]],
        [[6, 3], [7, 4], [8, 5]],
        [[7, 4], [8, 5], [9, 6]],
        [[8, 5], [9, 6], [10, 7]],
        [[9, 6], [10, 7], [11, 8]],
        [[10, 7], [11, 8], [12, 9]],
      ],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as Array<number>)[1] >= 0)
        .chunkwiseOverlap(3, 2, false)
        .toArray(),
      [
        [[3, 0], [4, 1], [5, 2]],
        [[4, 1], [5, 2], [6, 3]],
        [[5, 2], [6, 3], [7, 4]],
        [[6, 3], [7, 4], [8, 5]],
        [[7, 4], [8, 5], [9, 6]],
        [[8, 5], [9, 6], [10, 7]],
        [[9, 6], [10, 7], [11, 8]],
        [[10, 7], [11, 8], [12, 9]],
      ],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .pairwise()
        .toArray(),
      [[[0, 1], [2, 2]], [[2, 2], [4, 3]]],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as Array<number>)[1] < 0)
        .pairwise()
        .toArray(),
      [[[1, -1], [3, -2]], [[3, -2], [5, -3]]],
    ],
    [
      createMapFixture([]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .limit(0)
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .limit(5)
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .limit(5)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .limit(10)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as Array<number>)[1] < 5)
        .limit(2)
        .toArray(),
      [[0, 1], [1, 2]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as Array<number>)[1] < 5)
        .limit(10)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4]],
    ],
    [
      createMapFixture([]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .limit(0)
        .chainWith(createMapFixture([1, 2, 3]))
        .toArray(),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(0)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(0, 1)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(10, 10)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(3)
        .toArray(),
      [[3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(3, 2)
        .toArray(),
      [[0, 1], [1, 2], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(10, 2)
        .toArray(),
      [[0, 1], [1, 2]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice()
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2)
        .toArray(),
      [[2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, 4)
        .toArray(),
      [[2, 3], [3, 4], [4, 5], [5, 6]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, undefined, 2)
        .toArray(),
      [[2, 3], [4, 5], [6, 7], [8, 9]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, 3, 2)
        .toArray(),
      [[2, 3], [4, 5], [6, 7]],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) % 2 !== 0)
        .groupBy((item) => (item as number) > 0 ? 'pos' : 'neg')
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as [number, number])[1] % 2 !== 0)
        .groupBy((item) => (item as [number, number])[1] > 0 ? 'pos' : 'neg')
        .toArray(),
      [['pos', [[0, 1], [4, 3]]], ['neg', [[1, -1], [5, -3]]]],
    ],
    [
      createMapFixture(['b', 'f', 'c', 'e', 'd', 'a']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .sort()
        .toArray(),
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createMapFixture([2, 3, 1, 2, -3, -2, 5, 7, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .sort((lhs: unknown, rhs: unknown) => (lhs as number) - (rhs as number))
        .toArray(),
      [-3, -2, 1, 2, 2, 3, 3, 5, 7],
    ],
    [
      createMapFixture([2, 3, 1, 2, -3, -2, 5, 7, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .sort((lhs: unknown, rhs: unknown) => (rhs as number) - (lhs as number))
        .toArray(),
      [7, 5, 3, 3, 2, 2, 1, -2, -3],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter(async (value) => {
          await asyncTimeout(1);
          return (value as number) > 0;
        })
        .compress(createAsyncGeneratorFixture([0, 1, 1]))
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createAsyncGeneratorFixture([0, 1, 1]))
        .toArray(),
      [2, 3],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createAsyncGeneratorFixture([0, 1, 1]))
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createAsyncGeneratorFixture([0, 1, 1]))
        .toArray(),
      [2, 3],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createAsyncGeneratorFixture([0, 1, 1]))
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createAsyncGeneratorFixture([0, 1, 1]))
        .toArray(),
      [2, 3],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .dropWhile(async (value) => {
          await asyncTimeout(1);
          return Math.abs(value as number) < 3;
        })
        .compress(createAsyncGeneratorFixture([0, 1]))
        .toArray(),
      [],
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
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile(async (value) => {
          await asyncTimeout(1);
          return Math.abs(value as number) < 3;
        })
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .toArray(),
      [1, -1, 2, -2],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .compress(createAsyncGeneratorFixture([0, 1, 0, 1]))
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .compress(createAsyncGeneratorFixture([0, 1, 0, 1]))
        .toArray(),
      [-1, -2],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1]],
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
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .keys()
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .keys()
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .keys()
        .toArray(),
      [0, 1, 2],
    ],
    [
      createAsyncGeneratorFixture([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncGeneratorFixture([]),
      () => AsyncStream.ofEmpty()
        .map(async (item) => {
          await asyncTimeout(1);
          return (item as number) + 1;
        })
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      createAsyncGeneratorFixture([[1], [2], [3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as Array<number>)[0])
        .toArray(),
      [1, 2, 3],
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
        .flatMap((item) => item)
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
      createAsyncGeneratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createAsyncGeneratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(2)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createAsyncGeneratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(0)
        .toArray(),
      [1, 2, [3, 4], [5, 6], 7, 8],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [[-1, -2], [-3]],
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
      createAsyncGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwise(2)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[-1, -2]],
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createAsyncGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      createAsyncGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[1, 2], [3, 4]],
    ],
    [
      createAsyncGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createAsyncGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createAsyncGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createAsyncGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createAsyncGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createAsyncGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
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
      createAsyncGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1, false)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8]],
    ],
    [
      createAsyncGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      createAsyncGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2, false)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [],
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
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(0)
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(5)
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(5)
        .toArray(),
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(2)
        .toArray(),
      [1, 2],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4],
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
        .skip(0)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(0, 1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(10, 10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(3)
        .toArray(),
      [4, 5, 6, 7, 8, 9, 10],
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
        .skip(10, 2)
        .toArray(),
      [1, 2],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2)
        .toArray(),
      [3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, 4)
        .toArray(),
      [3, 4, 5, 6],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, undefined, 2)
        .toArray(),
      [3, 5, 7, 9],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, 3, 2)
        .toArray(),
      [3, 5, 7],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) % 2 !== 0)
        .groupBy(async (item) => {
          await asyncTimeout(1);
          return (item as number) > 0 ? 'pos' : 'neg';
        })
        .toArray(),
      [],
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
      createAsyncGeneratorFixture(['b', 'f', 'c', 'e', 'd', 'a']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort()
        .toArray(),
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createAsyncGeneratorFixture([2, 3, 1, 2, -3, -2, 5, 7, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (lhs as number) - (rhs as number))
        .toArray(),
      [-3, -2, 1, 2, 2, 3, 3, 5, 7],
    ],
    [
      createAsyncGeneratorFixture([2, 3, 1, 2, -3, -2, 5, 7, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (rhs as number) - (lhs as number))
        .toArray(),
      [7, 5, 3, 3, 2, 2, 1, -2, -3],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<unknown> {
  return [
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter(async (value) => {
          await asyncTimeout(1);
          return (value as number) > 0;
        })
        .compress(createAsyncIterableFixture([0, 1, 1]))
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createAsyncIterableFixture([0, 1, 1]))
        .toArray(),
      [2, 3],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createAsyncIterableFixture([0, 1, 1]))
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createAsyncIterableFixture([0, 1, 1]))
        .toArray(),
      [2, 3],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createAsyncIterableFixture([0, 1, 1]))
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createAsyncIterableFixture([0, 1, 1]))
        .toArray(),
      [2, 3],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .dropWhile(async (value) => {
          await asyncTimeout(1);
          return Math.abs(value as number) < 3;
        })
        .compress(createAsyncIterableFixture([0, 1]))
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .dropWhile((value) => Math.abs(value as number) < 3)
        .compress(createAsyncIterableFixture([0, 1]))
        .toArray(),
      [-3],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile(async (value) => {
          await asyncTimeout(1);
          return Math.abs(value as number) < 3;
        })
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .toArray(),
      [1, -1, 2, -2],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .compress(createAsyncIterableFixture([0, 1, 0, 1]))
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .compress(createAsyncIterableFixture([0, 1, 0, 1]))
        .toArray(),
      [-1, -2],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1]],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      createAsyncIterableFixture([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .keys()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .keys()
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .keys()
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .keys()
        .toArray(),
      [0, 1, 2],
    ],
    [
      createAsyncIterableFixture([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncIterableFixture([]),
      () => AsyncStream.ofEmpty()
        .map(async (item) => {
          await asyncTimeout(1);
          return (item as number) + 1;
        })
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      createAsyncIterableFixture([[1], [2], [3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as Array<number>)[0])
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatMap((item) => single.repeatAsync(item, (item as number) + 1))
        .toArray(),
      [1, 1, 2, 2, 2, 3, 3, 3, 3],
    ],
    [
      createAsyncIterableFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatMap(async (item) => {
          await asyncTimeout(1);
          return item;
        })
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createAsyncIterableFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatMap((item) => item)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createAsyncIterableFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createAsyncIterableFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createAsyncIterableFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(2)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createAsyncIterableFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(0)
        .toArray(),
      [1, 2, [3, 4], [5, 6], 7, 8],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      createAsyncIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwise(2)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      createAsyncIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwise(2)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[-1, -2]],
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createAsyncIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      createAsyncIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[1, 2], [3, 4]],
    ],
    [
      createAsyncIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createAsyncIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createAsyncIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createAsyncIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createAsyncIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createAsyncIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createAsyncIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8], [8, 9]],
    ],
    [
      createAsyncIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1, false)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8]],
    ],
    [
      createAsyncIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      createAsyncIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2, false)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [[1, 2], [2, 3]],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(0)
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(5)
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(5)
        .toArray(),
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(2)
        .toArray(),
      [1, 2],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(0)
        .chainWith(createAsyncIterableFixture([1, 2, 3]))
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(0)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(0, 1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(10, 10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(3)
        .toArray(),
      [4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(3, 2)
        .toArray(),
      [1, 2, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(10, 2)
        .toArray(),
      [1, 2],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2)
        .toArray(),
      [3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, 4)
        .toArray(),
      [3, 4, 5, 6],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, undefined, 2)
        .toArray(),
      [3, 5, 7, 9],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, 3, 2)
        .toArray(),
      [3, 5, 7],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) % 2 !== 0)
        .groupBy(async (item) => {
          await asyncTimeout(1);
          return (item as number) > 0 ? 'pos' : 'neg';
        })
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) % 2 !== 0)
        .groupBy((item) => (item as number) > 0 ? 'pos' : 'neg')
        .toArray(),
      [['pos', [1, 3]], ['neg', [-1, -3]]],
    ],
    [
      createAsyncIterableFixture(['b', 'f', 'c', 'e', 'd', 'a']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort()
        .toArray(),
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createAsyncIterableFixture([2, 3, 1, 2, -3, -2, 5, 7, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (lhs as number) - (rhs as number))
        .toArray(),
      [-3, -2, 1, 2, 2, 3, 3, 5, 7],
    ],
    [
      createAsyncIterableFixture([2, 3, 1, 2, -3, -2, 5, 7, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (rhs as number) - (lhs as number))
        .toArray(),
      [7, 5, 3, 3, 2, 2, 1, -2, -3],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<unknown> {
  return [
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter(async (value) => {
          await asyncTimeout(1);
          return (value as number) > 0;
        })
        .compress(createAsyncIteratorFixture([0, 1, 1]))
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createAsyncIteratorFixture([0, 1, 1]))
        .toArray(),
      [2, 3],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createAsyncIteratorFixture([0, 1, 1]))
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createAsyncIteratorFixture([0, 1, 1]))
        .toArray(),
      [2, 3],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createAsyncIteratorFixture([0, 1, 1]))
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .compress(createAsyncIteratorFixture([0, 1, 1]))
        .toArray(),
      [2, 3],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .dropWhile(async (value) => {
          await asyncTimeout(1);
          return Math.abs(value as number) < 3;
        })
        .compress(createAsyncIteratorFixture([0, 1]))
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .dropWhile((value) => Math.abs(value as number) < 3)
        .compress(createAsyncIteratorFixture([0, 1]))
        .toArray(),
      [-3],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile(async (value) => {
          await asyncTimeout(1);
          return Math.abs(value as number) < 3;
        })
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .toArray(),
      [1, -1, 2, -2],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .compress(createAsyncIteratorFixture([0, 1, 0, 1]))
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .takeWhile((value) => Math.abs(value as number) < 3)
        .compress(createAsyncIteratorFixture([0, 1, 0, 1]))
        .toArray(),
      [-1, -2],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1]],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      createAsyncIteratorFixture([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .keys()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .keys()
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .keys()
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .keys()
        .toArray(),
      [0, 1, 2],
    ],
    [
      createAsyncIteratorFixture([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .values()
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncIteratorFixture([]),
      () => AsyncStream.ofEmpty()
        .map(async (item) => {
          await asyncTimeout(1);
          return (item as number) + 1;
        })
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      createAsyncIteratorFixture([[1], [2], [3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as Array<number>)[0])
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatMap((item) => single.repeatAsync(item, (item as number) + 1))
        .toArray(),
      [1, 1, 2, 2, 2, 3, 3, 3, 3],
    ],
    [
      createAsyncIteratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatMap(async (item) => {
          await asyncTimeout(1);
          return item;
        })
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createAsyncIteratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatMap((item) => item)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createAsyncIteratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createAsyncIteratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createAsyncIteratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(2)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createAsyncIteratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .flatten(0)
        .toArray(),
      [1, 2, [3, 4], [5, 6], 7, 8],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      createAsyncIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwise(2)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      createAsyncIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwise(2)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[-1, -2]],
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createAsyncIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      createAsyncIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[1, 2], [3, 4]],
    ],
    [
      createAsyncIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createAsyncIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createAsyncIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createAsyncIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createAsyncIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createAsyncIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createAsyncIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8], [8, 9]],
    ],
    [
      createAsyncIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1, false)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8]],
    ],
    [
      createAsyncIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      createAsyncIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2, false)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [[1, 2], [2, 3]],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(0)
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(5)
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(5)
        .toArray(),
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(2)
        .toArray(),
      [1, 2],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .limit(0)
        .chainWith(createAsyncIteratorFixture([1, 2, 3]))
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(0)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(0, 1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(10, 10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(3)
        .toArray(),
      [4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(3, 2)
        .toArray(),
      [1, 2, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .skip(10, 2)
        .toArray(),
      [1, 2],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2)
        .toArray(),
      [3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, 4)
        .toArray(),
      [3, 4, 5, 6],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, undefined, 2)
        .toArray(),
      [3, 5, 7, 9],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .slice(2, 3, 2)
        .toArray(),
      [3, 5, 7],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) % 2 !== 0)
        .groupBy(async (item) => {
          await asyncTimeout(1);
          return (item as number) > 0 ? 'pos' : 'neg';
        })
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .filter((value) => (value as number) % 2 !== 0)
        .groupBy((item) => (item as number) > 0 ? 'pos' : 'neg')
        .toArray(),
      [['pos', [1, 3]], ['neg', [-1, -3]]],
    ],
    [
      createAsyncIteratorFixture(['b', 'f', 'c', 'e', 'd', 'a']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort()
        .toArray(),
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createAsyncIteratorFixture([2, 3, 1, 2, -3, -2, 5, 7, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (lhs as number) - (rhs as number))
        .toArray(),
      [-3, -2, 1, 2, 2, 3, 3, 5, 7],
    ],
    [
      createAsyncIteratorFixture([2, 3, 1, 2, -3, -2, 5, 7, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (rhs as number) - (lhs as number))
        .toArray(),
      [7, 5, 3, 3, 2, 2, 1, -2, -3],
    ],
  ];
}
