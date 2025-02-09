// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { Stream, single } from '../../src';

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])(
  "Stream Single Test",
  (input, streamFactory, expected) => {
    it("", () => {
      // Given
      const result = streamFactory(input as any);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<[Array<any>, (iterable: Array<any>) => Array<any>, Array<any>]> {
  return [
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .filter((value) => value > 0)
        .compress([0, 1, 1])
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .filter((value) => value > 0)
        .compress([0, 1, 1])
        .toArray(),
      [2, 3],
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .filter((value) => value > 0)
        .compress([0, 1, 1])
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .filter((value) => value > 0)
        .compress([0, 1, 1])
        .toArray(),
      [2, 3],
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .filter((value) => value > 0)
        .compress([0, 1, 1])
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .filter((value) => value > 0)
        .compress([0, 1, 1])
        .toArray(),
      [2, 3],
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .dropWhile((value) => Math.abs(value) < 3)
        .compress([0, 1])
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .dropWhile((value) => Math.abs(value) < 3)
        .compress([0, 1])
        .toArray(),
      [-3],
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .takeWhile((value) => Math.abs(value) < 3)
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .takeWhile((value) => Math.abs(value) < 3)
        .toArray(),
      [1, -1, 2, -2],
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .takeWhile((value) => Math.abs(value) < 3)
        .compress([0, 1, 0, 1])
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .takeWhile((value) => Math.abs(value) < 3)
        .compress([0, 1, 0, 1])
        .toArray(),
      [-1, -2],
    ],
    [
      [],
      (iterable: Iterable<unknown> | Iterator<unknown>): Array<[number, unknown]> => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [],
    ],
    [
      [1],
      (iterable: Iterable<unknown> | Iterator<unknown>): Array<[number, unknown]> => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1]],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown> | Iterator<unknown>): Array<[number, unknown]> => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      [['a', 1], ['b', 2], ['c', 3]],
      (iterable: Array<[string, number]>): Array<string> => Stream.of(iterable)
        .keys()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      [],
      (iterable: Iterable<unknown> | Iterator<unknown>): Array<unknown> => Stream.of(iterable)
        .keys()
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<unknown> | Iterator<unknown>): Array<number> => Stream.of(iterable)
        .enumerate()
        .keys()
        .toArray(),
      [],
    ],
    [
      ['a', 'b', 'c'],
      (iterable: Iterable<unknown> | Iterator<unknown>): Array<number> => Stream.of(iterable)
        .enumerate()
        .keys()
        .toArray(),
      [0, 1, 2],
    ],
    [
      [['a', 1], ['b', 2], ['c', 3]],
      (iterable: Array<[string, number]>): Array<number> => Stream.of(iterable)
        .values()
        .toArray(),
      [1, 2, 3],
    ],
    [
      [],
      (iterable: Array<[unknown, unknown]>): Array<unknown> => Stream.of(iterable)
        .values()
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<unknown> | Iterator<unknown>): Array<unknown> => Stream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      [],
    ],
    [
      ['a', 'b', 'c'],
      (iterable: Iterable<string> | Iterator<string>): Array<string> => Stream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .filter((value) => value > 0)
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .filter((value) => value > 0)
        .toArray(),
      [1, 2, 3],
    ],
    [
      [],
      (): Array<number> => Stream.ofEmpty()
        .map((item) => Number(item) + 1)
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .map((item) => item + 1)
        .toArray(),
      [],
    ],
    [
      [1],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .map((item) => item + 1)
        .toArray(),
      [2],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .map((item) => item + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      ['a', 'b', 'c'],
      (iterable: Iterable<string> | Iterator<string>): Array<string> => Stream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      [[1], [2], [3]],
      (iterable: Array<number[]>): Array<number> => Stream.of(iterable)
        .map((item) => item[0])
        .toArray(),
      [1, 2, 3],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>): Array<unknown> => Stream.of(iterable)
        .flatMap((item) => single.repeat(item, Number(item) + 1))
        .toArray(),
      [1, 1, 2, 2, 2, 3, 3, 3, 3],
    ],
    [
      [1, 2, [3, 4], [5, 6], 7, 8],
      (iterable: Iterable<unknown> | Iterator<unknown>): Array<unknown> => Stream.of(iterable)
        .flatMap((item) => item)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      [1, 2, [3, 4], [5, 6], 7, 8],
      (iterable: Iterable<unknown> | Iterator<unknown>): Array<unknown> => Stream.of(iterable)
        .flatten()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      [1, 2, [3, 4], [5, 6], 7, 8],
      (iterable: Iterable<unknown> | Iterator<unknown>): Array<unknown> => Stream.of(iterable)
        .flatten(1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      [1, 2, [3, 4], [5, 6], 7, 8],
      (iterable: Iterable<unknown> | Iterator<unknown>): Array<unknown> => Stream.of(iterable)
        .flatten(2)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      [1, 2, [3, 4], [5, 6], 7, 8],
      (iterable: Iterable<unknown> | Iterator<unknown>): Array<unknown> => Stream.of(iterable)
        .flatten(0)
        .toArray(),
      [1, 2, [3, 4], [5, 6], 7, 8],
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value < 0)
        .chunkwise(2)
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number> | Iterator<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value < 0)
        .chunkwise(2)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<number> | Iterator<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value > 0)
        .chunkwise(2)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<number> | Iterator<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value >= 0)
        .chunkwise(2)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number> | Iterator<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number> | Iterator<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[-1, -2]],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number> | Iterator<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number> | Iterator<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<number> | Iterator<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value > 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<number> | Iterator<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value > 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[1, 2], [3, 4]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<number> | Iterator<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value > 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<number> | Iterator<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value > 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<number> | Iterator<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value >= 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<number> | Iterator<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value >= 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<number> | Iterator<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value >= 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<number> | Iterator<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value >= 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      (iterable: Iterable<number> | Iterator<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value >= 0)
        .chunkwiseOverlap(3, 1)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8], [8, 9]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      (iterable: Iterable<number> | Iterator<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value >= 0)
        .chunkwiseOverlap(3, 1, false)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      (iterable: Iterable<number> | Iterator<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value >= 0)
        .chunkwiseOverlap(3, 2)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      (iterable: Iterable<number> | Iterator<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value >= 0)
        .chunkwiseOverlap(3, 2, false)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Array<[number, number]> => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Array<[number, number]> => Stream.of(iterable)
        .filter((value) => value > 0)
        .pairwise()
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number> | Iterator<number>): Array<[number, number]> => Stream.of(iterable)
        .filter((value) => value > 0)
        .pairwise()
        .toArray(),
      [[1, 2], [2, 3]],
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Array<[number, number]> => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number> | Iterator<number>): Array<[number, number]> => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .pairwise()
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      [],
      (iterable: Iterable<unknown> | Iterator<unknown>): Array<unknown> => Stream.of(iterable)
        .limit(0)
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<unknown> | Iterator<unknown>): Array<unknown> => Stream.of(iterable)
        .limit(5)
        .toArray(),
      [],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .limit(5)
        .toArray(),
      [1, 2, 3, 4, 5],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .filter((x) => x < 5)
        .limit(2)
        .toArray(),
      [1, 2],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .filter((x) => x < 5)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4],
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .limit(0)
        .chainWith([1, 2, 3])
        .toArray(),
      [1, 2, 3],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .skip(0)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .skip(0, 1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .skip(10, 10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .skip(3)
        .toArray(),
      [4, 5, 6, 7, 8, 9, 10],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .skip(3, 2)
        .toArray(),
      [1, 2, 6, 7, 8, 9, 10],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .skip(10, 2)
        .toArray(),
      [1, 2],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .slice()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .slice(2)
        .toArray(),
      [3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .slice(2, 4)
        .toArray(),
      [3, 4, 5, 6],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .slice(2, undefined, 2)
        .toArray(),
      [3, 5, 7, 9],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<number> | Iterator<number>): Array<number> => Stream.of(iterable)
        .slice(2, 3, 2)
        .toArray(),
      [3, 5, 7],
    ],
    [
      [],
      // TODO fix type (Array<[string, number[]]> did not works)
      (iterable: Iterable<number> | Iterator<number>) => Stream.of(iterable)
        .filter((value) => value % 2 !== 0)
        .groupBy((item) => item > 0 ? 'pos' : 'neg')
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      // TODO fix type (Array<[string, number[]]> did not works)
      (iterable: Iterable<number> | Iterator<number>) => Stream.of(iterable)
        .filter((value) => value % 2 !== 0)
        .groupBy((item) => item > 0 ? 'pos' : 'neg')
        .toArray(),
      [['pos', [1, 3]], ['neg', [-1, -3]]],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number> | Iterator<number>): Array<[string, number[]]> => Stream.of(iterable)
        .filter((value) => value % 2 !== 0)
        .groupBy((item) => item > 0 ? 'pos' : 'neg', undefined)
        .toArray(),
      [['pos', [1, 3]], ['neg', [-1, -3]]],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number> | Iterator<number>): Array<[string, Record<string, number>]> => Stream.of(iterable)
        .filter((value) => value % 2 !== 0)
        .groupBy((item) => item > 0 ? 'pos' : 'neg', (x) => `${x}`)
        .toArray(),
      [['pos', {'1': 1, '3': 3}], ['neg', {'-1': -1, '-3': -3}]],
    ],
    [
      ['b', 'f', 'c', 'e', 'd', 'a'],
      (iterable: Iterable<string> | Iterator<string>): Array<string> => Stream.of(iterable)
        .sort()
        .toArray(),
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      [2, 3, 1, 2, -3, -2, 5, 7, 3],
      (iterable: Iterable<number> | Iterator<number>) => Stream.of(iterable)
        .sort((lhs, rhs) => lhs - rhs)
        .toArray(),
      [-3, -2, 1, 2, 2, 3, 3, 5, 7],
    ],
    [
      [2, 3, 1, 2, -3, -2, 5, 7, 3],
      (iterable: Iterable<number> | Iterator<number>) => Stream.of(iterable)
        .sort((lhs, rhs) => rhs - lhs)
        .toArray(),
      [7, 5, 3, 3, 2, 2, 1, -2, -3],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<any>, (iterable: Generator<any>) => Array<any>, Array<any>]> {
  return dataProviderForArrays().map((item) => [
    createGeneratorFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<any> | Iterator<any>) => Array<any>, Array<any>],
  ]);
}

function dataProviderForIterables(): Array<[Iterable<any>, (iterable: Iterable<any>) => Array<any>, Array<any>]> {
  return dataProviderForArrays().map((item) => [
    createIterableFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<any> | Iterator<any>) => Array<any>, Array<any>],
  ]);
}

function dataProviderForIterators(): Array<[Iterator<any>, (iterable: Iterator<any>) => Array<any>, Array<any>]> {
  return dataProviderForArrays().map((item) => [
    createIteratorFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<any> | Iterator<any>) => Array<any>, Array<any>],
  ]);
}

function dataProviderForStrings(): Array<[string, (iterable: string) => Array<any>, Array<any>]> {
  return [
    [
      '',
      (iterable): Array<string> => Stream.of(iterable)
        .dropWhile((value) => Math.abs(Number(value)) < 3)
        .compress([0, 1])
        .toArray(),
      [],
    ],
    [
      '12345',
      (iterable): Array<string> => Stream.of(iterable)
        .dropWhile((value) => Number(value) < 3)
        .compress([1, 0, 1])
        .toArray(),
      ['3', '5'],
    ],
    [
      '',
      (iterable): Array<string> => Stream.of(iterable)
        .takeWhile((value) => Number(value) < 3)
        .toArray(),
      [],
    ],
    [
      '12345',
      (iterable): Array<string> => Stream.of(iterable)
        .takeWhile((value) => Number(value) < 4)
        .toArray(),
      ['1', '2', '3'],
    ],
    [
      '',
      (iterable): Array<string> => Stream.of(iterable)
        .takeWhile((value) => Number(value) < 3)
        .compress([0, 1, 0, 1])
        .toArray(),
      [],
    ],
    [
      '12345',
      (iterable): Array<string> => Stream.of(iterable)
        .takeWhile((value) => Number(value) < 5)
        .compress([0, 1, 0, 1])
        .toArray(),
      ['2', '4'],
    ],
    [
      '',
      (iterable): Array<[number, string]> => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable): Array<[number, string]> => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, '1']],
    ],
    [
      '123',
      (iterable): Array<[number, string]> => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, '1'], [1, '2'], [2, '3']],
    ],
    [
      '',
      (iterable): Array<number> => Stream.of(iterable)
        .enumerate()
        .keys()
        .toArray(),
      [],
    ],
    [
      'abc',
      (iterable): Array<number> => Stream.of(iterable)
        .enumerate()
        .keys()
        .toArray(),
      [0, 1, 2],
    ],
    [
      '',
      (iterable): Array<string> => Stream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      [],
    ],
    [
      'abc',
      (iterable): Array<string> => Stream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      '',
      (iterable): Array<string> => Stream.of(iterable)
        .filter((value) => parseInt(value) > 0)
        .toArray(),
      [],
    ],
    [
      '123456',
      (iterable): Array<string> => Stream.of(iterable)
        .filter((value) => parseInt(value) % 2 === 0)
        .toArray(),
      ['2', '4', '6'],
    ],
    [
      '',
      (): Array<string> => Stream.ofEmpty()
        .map((item) => `[${item}]`)
        .toArray(),
      [],
    ],
    [
      '',
      (iterable): Array<string> => Stream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable): Array<string> => Stream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[1]'],
    ],
    [
      '123',
      (iterable): Array<string> => Stream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[1]', '[2]', '[3]'],
    ],
    [
      'abc',
      (iterable): Array<string> => Stream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      '123',
      (iterable): Array<unknown> => Stream.of(iterable)
        .flatMap((item) => single.repeat(parseInt(item as string), parseInt(item as string) + 1))
        .toArray(),
      [1, 1, 2, 2, 2, 3, 3, 3, 3],
    ],
    [
      'abc',
      (iterable): Array<unknown> => Stream.of(iterable)
        .flatten(1)
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      '',
      (iterable): Array<string[]> => Stream.of(iterable)
        .chunkwise(2)
        .toArray(),
      [],
    ],
    [
      'abc',
      (iterable): Array<string[]> => Stream.of(iterable)
        .chunkwise(2)
        .toArray(),
      [['a', 'b'], ['c']],
    ],
    [
      '012345',
      (iterable): Array<string[]> => Stream.of(iterable)
        .filter((value) => parseInt(value) > 0)
        .chunkwise(2)
        .toArray(),
      [['1', '2'], ['3', '4'], ['5']],
    ],
    [
      '012345',
      (iterable): Array<string[]> => Stream.of(iterable)
        .chunkwise(2)
        .toArray(),
      [['0', '1'], ['2', '3'], ['4', '5']],
    ],
    [
      '',
      (iterable): Array<string[]> => Stream.of(iterable)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [],
    ],
    [
      '',
      (iterable): Array<string[]> => Stream.of(iterable)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [],
    ],
    [
      '',
      (iterable): Array<string[]> => Stream.of(iterable)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [],
    ],
    [
      '',
      (iterable): Array<string[]> => Stream.of(iterable)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [],
    ],
    [
      'abc',
      (iterable): Array<string[]> => Stream.of(iterable)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [['a', 'b'], ['c']],
    ],
    [
      'abc',
      (iterable): Array<string[]> => Stream.of(iterable)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [['a', 'b']],
    ],
    [
      'abc',
      (iterable): Array<string[]> => Stream.of(iterable)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [['a', 'b'], ['b', 'c']],
    ],
    [
      'abc',
      (iterable): Array<string[]> => Stream.of(iterable)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [['a', 'b'], ['b', 'c']],
    ],
    [
      'abcde',
      (iterable): Array<string[]> => Stream.of(iterable)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [['a', 'b'], ['c', 'd'], ['e']],
    ],
    [
      'abcde',
      (iterable) => Stream.of(iterable)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [['a', 'b'], ['c', 'd']],
    ],
    [
      'abcde',
      (iterable): Array<string[]> => Stream.of(iterable)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']],
    ],
    [
      'abcde',
      (iterable): Array<string[]> => Stream.of(iterable)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']],
    ],
    [
      'abcdef',
      (iterable): Array<string[]> => Stream.of(iterable)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [['a', 'b'], ['c', 'd'], ['e', 'f']],
    ],
    [
      'abcdef',
      (iterable): Array<string[]> => Stream.of(iterable)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [['a', 'b'], ['c', 'd'], ['e', 'f']],
    ],
    [
      'abcdef',
      (iterable): Array<string[]> => Stream.of(iterable)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f']],
    ],
    [
      'abcdef',
      (iterable): Array<string[]> => Stream.of(iterable)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f']],
    ],
    [
      'abcdefghij',
      (iterable): Array<string[]> => Stream.of(iterable)
        .chunkwiseOverlap(3, 1)
        .toArray(),
      [['a', 'b', 'c'], ['c', 'd', 'e'], ['e', 'f', 'g'], ['g', 'h', 'i'], ['i', 'j']],
    ],
    [
      'abcdefghij',
      (iterable): Array<string[]> => Stream.of(iterable)
        .chunkwiseOverlap(3, 1, false)
        .toArray(),
      [['a', 'b', 'c'], ['c', 'd', 'e'], ['e', 'f', 'g'], ['g', 'h', 'i']],
    ],
    [
      'abcdefghij',
      (iterable): Array<string[]> => Stream.of(iterable)
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
      (iterable): Array<string[]> => Stream.of(iterable)
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
      (iterable): Array<[string, string]> => Stream.of(iterable)
        .pairwise()
        .toArray(),
      [],
    ],
    [
      'abc',
      (iterable): Array<[string, string]> => Stream.of(iterable)
        .pairwise()
        .toArray(),
      [['a', 'b'], ['b', 'c']],
    ],
    [
      'abcdef',
      (iterable): Array<[string, string]> => Stream.of(iterable)
        .pairwise()
        .toArray(),
      [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f']],
    ],
    [
      '',
      (iterable): Array<string> => Stream.of(iterable)
        .limit(0)
        .toArray(),
      [],
    ],
    [
      '',
      (iterable): Array<string> => Stream.of(iterable)
        .limit(5)
        .toArray(),
      [],
    ],
    [
      '1234567',
      (iterable): Array<string> => Stream.of(iterable)
        .limit(5)
        .toArray(),
      ['1', '2', '3', '4', '5'],
    ],
    [
      '1234567',
      (iterable): Array<string> => Stream.of(iterable)
        .limit(10)
        .toArray(),
      ['1', '2', '3', '4', '5', '6', '7'],
    ],
    [
      '1234567890',
      (iterable): Array<string> => Stream.of(iterable)
        .filter((x) => Number(x) < 5)
        .limit(2)
        .toArray(),
      ['1', '2'],
    ],
    [
      '1234567890',
      (iterable): Array<string> => Stream.of(iterable)
        .filter((x) => Number(x) < 5)
        .limit(10)
        .toArray(),
      ['1', '2', '3', '4', '0'],
    ],
    [
      '',
      (iterable): Array<string> => Stream.of(iterable)
        .limit(0)
        .chainWith('123')
        .toArray(),
      ['1', '2', '3'],
    ],
    [
      '123456789',
      (iterable): Array<string> => Stream.of(iterable)
        .skip(0)
        .toArray(),
      ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ],
    [
      '123456789',
      (iterable): Array<string> => Stream.of(iterable)
        .skip(0, 1)
        .toArray(),
      ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ],
    [
      '123456789',
      (iterable): Array<string> => Stream.of(iterable)
        .skip(10, 10)
        .toArray(),
      ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ],
    [
      '123456789',
      (iterable): Array<string> => Stream.of(iterable)
        .skip(3)
        .toArray(),
      ['4', '5', '6', '7', '8', '9'],
    ],
    [
      '123456789',
      (iterable): Array<string> => Stream.of(iterable)
        .skip(3, 2)
        .toArray(),
      ['1', '2', '6', '7', '8', '9'],
    ],
    [
      '123456789',
      (iterable): Array<string> => Stream.of(iterable)
        .skip(10, 2)
        .toArray(),
      ['1', '2'],
    ],
    [
      '1234567890',
      (iterable): Array<string> => Stream.of(iterable)
        .slice()
        .toArray(),
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ],
    [
      '1234567890',
      (iterable): Array<string> => Stream.of(iterable)
        .slice(2)
        .toArray(),
      ['3', '4', '5', '6', '7', '8', '9', '0'],
    ],
    [
      '1234567890',
      (iterable): Array<string> => Stream.of(iterable)
        .slice(2, 4)
        .toArray(),
      ['3', '4', '5', '6'],
    ],
    [
      '1234567890',
      (iterable): Array<string> => Stream.of(iterable)
        .slice(2, undefined, 2)
        .toArray(),
      ['3', '5', '7', '9'],
    ],
    [
      '1234567890',
      (iterable): Array<string> => Stream.of(iterable)
        .slice(2, 3, 2)
        .toArray(),
      ['3', '5', '7'],
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .groupBy((item) => Number(item as string) % 2 === 0 ? 'even' : 'odd')
        .toArray(),
      [],
    ],
    [
      '123456',
      (iterable) => Stream.of(iterable)
        .groupBy((item) => Number(item as string) % 2 === 0 ? 'even' : 'odd')
        .toArray(),
      [['odd', ['1', '3', '5']], ['even', ['2', '4', '6']]],
    ],
    [
      '123456',
      (iterable): Array<[string, string[]]> => Stream.of(iterable)
        .groupBy((item) => Number(item as string) % 2 === 0 ? 'even' : 'odd', undefined)
        .toArray(),
      [['odd', ['1', '3', '5']], ['even', ['2', '4', '6']]],
    ],
    [
      '123456',
      (iterable): Array<[string, Record<string, string>]> => Stream.of(iterable)
        .groupBy((item) => Number(item as string) % 2 === 0 ? 'even' : 'odd', (x) => `${x}`)
        .toArray(),
      [['odd', {'1': '1', '3': '3', '5': '5'}], ['even', {'2': '2', '4': '4', '6': '6'}]],
    ],
    [
      'bfceda',
      (iterable): Array<string> => Stream.of(iterable)
        .sort()
        .toArray(),
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      '231232573',
      (iterable): Array<string> => Stream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (lhs as number) - (rhs as number))
        .toArray(),
      ['1', '2', '2', '2', '3', '3', '3', '5', '7'],
    ],
    [
      '231232573',
      (iterable): Array<string> => Stream.of(iterable)
        .sort((lhs: unknown, rhs: unknown) => (rhs as number) - (lhs as number))
        .toArray(),
      ['7', '5', '3', '3', '3', '2', '2', '2', '1'],
    ],
  ];
}

function dataProviderForSets(): Array<[Set<any>, (iterable: Set<any>) => Array<any>, Array<any>]> {
  return [
    [
      new Set([]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .dropWhile((value) => Math.abs(value) < 3)
        .compress(new Set([0, 1]))
        .toArray(),
      [],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .dropWhile((value) => Math.abs(value) < 3)
        .compress(new Set([0, 1]))
        .toArray(),
      [-3],
    ],
    [
      new Set([]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .takeWhile((value) => Math.abs(value) < 3)
        .toArray(),
      [],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .takeWhile((value) => Math.abs(value) < 3)
        .toArray(),
      [1, -1, 2, -2],
    ],
    [
      new Set([]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .takeWhile((value) => Math.abs(value) < 3)
        .compress([0, 1, 0, 1])
        .toArray(),
      [],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .takeWhile((value) => Math.abs(value) < 3)
        .compress([0, 1, 0, 1])
        .toArray(),
      [-1, -2],
    ],
    [
      new Set([]),
      (iterable: Set<unknown>): Array<[number, unknown]> => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [],
    ],
    [
      new Set([1]),
      (iterable: Set<number>): Array<[number, number]> => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1]],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Set<number>): Array<[number, number]> => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      new Set([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Set<[string, number]>): Array<string> => Stream.of(iterable)
        .keys()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      new Set([]),
      (iterable: Set<[string, number]>): Array<string> => Stream.of(iterable)
        .keys()
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable: Set<unknown>): Array<number> => Stream.of(iterable)
        .enumerate()
        .keys()
        .toArray(),
      [],
    ],
    [
      new Set(['a', 'b', 'c']),
      (iterable: Set<unknown>): Array<number> => Stream.of(iterable)
        .enumerate()
        .keys()
        .toArray(),
      [0, 1, 2],
    ],
    [
      new Set([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Set<[string, number]>): Array<number> => Stream.of(iterable)
        .values()
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set([]),
      (iterable: Set<[unknown, unknown]>): Array<unknown> => Stream.of(iterable)
        .values()
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable: Set<unknown>): Array<unknown> => Stream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      [],
    ],
    [
      new Set(['a', 'b', 'c']),
      (iterable: Set<string>): Array<string> => Stream.of(iterable)
        .enumerate()
        .values()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      new Set([]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .filter((value) => value > 0)
        .toArray(),
      [],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .filter((value) => value > 0)
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set([]),
      (): Array<number> => Stream.ofEmpty()
        .map((item) => Number(item) + 1)
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .map((item) => item + 1)
        .toArray(),
      [],
    ],
    [
      new Set([1]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .map((item) => item + 1)
        .toArray(),
      [2],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .map((item) => item + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      new Set(['a', 'b', 'c']),
      (iterable: Set<string>): Array<string> => Stream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      new Set([[1], [2], [3]]),
      (iterable: Set<[number]>): Array<number> => Stream.of(iterable)
        .map((item) => item[0])
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Set<number>): Array<unknown> => Stream.of(iterable)
        .flatMap((item) => single.repeat(item, Number(item) + 1))
        .toArray(),
      [1, 1, 2, 2, 2, 3, 3, 3, 3],
    ],
    [
      new Set([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Set<unknown>): Array<unknown> => Stream.of(iterable)
        .flatMap((item) => item)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      new Set([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Set<unknown>): Array<unknown> => Stream.of(iterable)
        .flatten()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      new Set([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Set<unknown>): Array<unknown> => Stream.of(iterable)
        .flatten(1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      new Set([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Set<unknown>): Array<unknown> => Stream.of(iterable)
        .flatten(2)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      new Set([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Set<unknown>): Array<unknown> => Stream.of(iterable)
        .flatten(0)
        .toArray(),
      [1, 2, [3, 4], [5, 6], 7, 8],
    ],
    [
      new Set([]),
      (iterable: Set<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value < 0)
        .chunkwise(2)
        .toArray(),
      [],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Set<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value < 0)
        .chunkwise(2)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Set<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value > 0)
        .chunkwise(2)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Set<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value >= 0)
        .chunkwise(2)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      new Set([]),
      (iterable: Set<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable: Set<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable: Set<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable: Set<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Set<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Set<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[-1, -2]],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Set<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Set<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Set<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value > 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Set<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value > 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[1, 2], [3, 4]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Set<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value > 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Set<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value > 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Set<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value >= 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Set<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value >= 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Set<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value >= 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Set<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value >= 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Set<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value >= 0)
        .chunkwiseOverlap(3, 1)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8], [8, 9]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Set<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value >= 0)
        .chunkwiseOverlap(3, 1, false)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Set<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value >= 0)
        .chunkwiseOverlap(3, 2)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Set<number>): Array<number[]> => Stream.of(iterable)
        .filter((value) => value >= 0)
        .chunkwiseOverlap(3, 2, false)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      new Set([]),
      (iterable: Set<number>): Array<[number, number]> => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable: Set<number>): Array<[number, number]> => Stream.of(iterable)
        .filter((value) => value > 0)
        .pairwise()
        .toArray(),
      [],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Set<number>): Array<[number, number]> => Stream.of(iterable)
        .filter((value) => value > 0)
        .pairwise()
        .toArray(),
      [[1, 2], [2, 3]],
    ],
    [
      new Set([]),
      (iterable: Set<number>): Array<[number, number]> => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Set<number>): Array<[number, number]> => Stream.of(iterable)
        .filter((value) => !(value > 0))
        .pairwise()
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      new Set([]),
      (iterable: Set<unknown>): Array<unknown> => Stream.of(iterable)
        .limit(0)
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable: Set<unknown>): Array<unknown> => Stream.of(iterable)
        .limit(5)
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .limit(5)
        .toArray(),
      [1, 2, 3, 4, 5],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .filter((x) => x < 5)
        .limit(2)
        .toArray(),
      [1, 2],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .filter((x) => x < 5)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4],
    ],
    [
      new Set([]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .limit(0)
        .chainWith([1, 2, 3])
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .skip(0)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .skip(0, 1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .skip(10, 10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .skip(3)
        .toArray(),
      [4, 5, 6, 7, 8, 9, 10],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .skip(3, 2)
        .toArray(),
      [1, 2, 6, 7, 8, 9, 10],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .skip(10, 2)
        .toArray(),
      [1, 2],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .slice()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .slice(2)
        .toArray(),
      [3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .slice(2, 4)
        .toArray(),
      [3, 4, 5, 6],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .slice(2, undefined, 2)
        .toArray(),
      [3, 5, 7, 9],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .slice(2, 3, 2)
        .toArray(),
      [3, 5, 7],
    ],
    [
      new Set([]),
      // TODO repair
      (iterable: Set<number>) => Stream.of(iterable)
        .filter((value) => value % 2 !== 0)
        .groupBy((item) => item > 0 ? 'pos' : 'neg')
        .toArray(),
      [],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      // TODO repair
      (iterable: Set<number>) => Stream.of(iterable)
        .filter((value) => value % 2 !== 0)
        .groupBy((item) => item > 0 ? 'pos' : 'neg')
        .toArray(),
      [['pos', [1, 3]], ['neg', [-1, -3]]],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Set<number>): Array<[string, number[]]> => Stream.of(iterable)
        .filter((value) => value % 2 !== 0)
        .groupBy((item) => item > 0 ? 'pos' : 'neg', undefined)
        .toArray(),
      [['pos', [1, 3]], ['neg', [-1, -3]]],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Set<number>): Array<[string, Record<string, number>]> => Stream.of(iterable)
        .filter((value) => value % 2 !== 0)
        .groupBy((item) => item > 0 ? 'pos' : 'neg', (x) => `${x}`)
        .toArray(),
      [['pos', {'1': 1, '3': 3}], ['neg', {'-1': -1, '-3': -3}]],
    ],
    [
      new Set(['b', 'f', 'c', 'e', 'd', 'a']),
      (iterable: Set<string>): Array<string> => Stream.of(iterable)
        .sort()
        .toArray(),
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      new Set([2, 3, 1, -3, -2, 5, 7]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .sort((lhs, rhs) => lhs - rhs)
        .toArray(),
      [-3, -2, 1, 2, 3, 5, 7],
    ],
    [
      new Set([2, 3, 1, -3, -2, 5, 7]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .sort((lhs, rhs) => rhs - lhs)
        .toArray(),
      [7, 5, 3, 2, 1, -2, -3],
    ],
  ];
}

function dataProviderForMaps(): Array<[Map<any, any>, (iterable: Map<any, any>) => Array<any>, Array<any>]> {
  return [
    [
      createMapFixture([]),
      (iterable: Map<number, number>): Array<number> => Stream.of(iterable)
        .values()
        .filter((value) => value > 0)
        .compress([0, 1, 1])
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Map<number, number>): Array<number> => Stream.of(iterable)
        .values()
        .filter((value) => value > 0)
        .compress([0, 1, 1])
        .toArray(),
      [2, 3],
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, number>): Array<number> => Stream.of(iterable)
        .values()
        .filter((value) => value > 0)
        .compress([0, 1, 1])
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Map<number, number>): Array<number> => Stream.of(iterable)
        .values()
        .filter((value) => value > 0)
        .compress([0, 1, 1])
        .toArray(),
      [2, 3],
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, number>): Array<number> => Stream.of(iterable)
        .values()
        .filter((value) => value > 0)
        .compress([0, 1, 1])
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Map<number, number>): Array<number> => Stream.of(iterable)
        .values()
        .filter((value) => value > 0)
        .compress([0, 1, 1])
        .toArray(),
      [2, 3],
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, number>): Array<number> => Stream.of(iterable)
        .dropWhile((value) => Math.abs(value[1]) < 3)
        .compress([0, 1])
        .values()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Map<number, number>): Array<number> => Stream.of(iterable)
        .dropWhile((value) => Math.abs(value[1]) < 3)
        .compress([0, 1])
        .values()
        .toArray(),
      [-3],
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, number>): Array<number> => Stream.of(iterable)
        .takeWhile((value) => Math.abs(value[1]) < 3)
        .values()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Map<number, number>): Array<number> => Stream.of(iterable)
        .takeWhile((value) => Math.abs(value[1]) < 3)
        .values()
        .toArray(),
      [1, -1, 2, -2],
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, number>): Array<number> => Stream.of(iterable)
        .takeWhile((value) => Math.abs(value[1]) < 3)
        .compress([0, 1, 0, 1])
        .values()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Map<number, number>): Array<number> => Stream.of(iterable)
        .takeWhile((value) => Math.abs(value[1]) < 3)
        .compress([0, 1, 0, 1])
        .values()
        .toArray(),
      [-1, -2],
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, unknown>): Array<[number, [number, unknown]]> => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1]),
      (iterable: Map<number, unknown>): Array<[number, [number, unknown]]> => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, [0, 1]]],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<number, unknown>): Array<[number, [number, unknown]]> => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, [0, 1]], [1, [1, 2]], [2, [2, 3]]],
    ],
    [
      new Map([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Map<string, number>): Array<string> => Stream.of(iterable)
        .keys()
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      new Map([]),
      (iterable: Map<number, unknown>): Array<number> => Stream.of(iterable)
        .keys()
        .toArray(),
      [],
    ],
    [
      new Map([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Map<string, number>): Array<number> => Stream.of(iterable)
        .values()
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Map([]),
      (iterable: Map<number, unknown>): Array<unknown> => Stream.of(iterable)
        .values()
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, number>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .filter((value) => value > 0)
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Map<number, number>): Array<number> => Stream.of(iterable)
        .map((item) => item[1])
        .filter((value) => value > 0)
        .toArray(),
      [1, 2, 3],
    ],
    [
      createMapFixture([]),
      (): Array<number> => Stream.ofEmpty()
        .map((item) => item[1] + 1)
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, number>): Array<number> => Stream.of(iterable)
        .map((item) => item[1] + 1)
        .toArray(),
      [],
    ],
    [
      createMapFixture([1]),
      (iterable: Map<number, number>): Array<number> => Stream.of(iterable)
        .map((item) => item[1] + 1)
        .toArray(),
      [2],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<number, number>): Array<number> => Stream.of(iterable)
        .map((item) => item[1] + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      createMapFixture(['a', 'b', 'c']),
      (iterable: Map<number, string>): Array<string> => Stream.of(iterable)
        .map((item) => `[${item[1]}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      createMapFixture([[1], [2], [3]]),
      (iterable: Map<number, [number]>): Array<number> => Stream.of(iterable)
        .map((item) => item[1][0])
        .toArray(),
      [1, 2, 3],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<number, unknown>): Array<unknown> => Stream.of(iterable)
        .flatMap((item) => single.repeat((item as Array<unknown>)[1], ((item as Array<unknown>)[1] as number) + 1))
        .toArray(),
      [1, 1, 2, 2, 2, 3, 3, 3, 3],
    ],
    [
      createMapFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Map<number, unknown>): Array<unknown> => Stream.of(iterable)
        .flatMap((item) => (item as Array<unknown>)[1])
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createMapFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Map<number, unknown>): Array<unknown> => Stream.of(iterable)
        .flatten()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createMapFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Map<number, unknown>): Array<unknown> => Stream.of(iterable)
        .flatten(1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createMapFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Map<number, unknown>): Array<unknown> => Stream.of(iterable)
        .flatten(2)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createMapFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Map<number, unknown>): Array<unknown> => Stream.of(iterable)
        .flatten(0)
        .toArray(),
      [1, 2, [3, 4], [5, 6], 7, 8],
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => value[1] < 0)
        .chunkwise(2)
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => value[1] < 0)
        .chunkwise(2)
        .toArray(),
      [[[1, -1], [3, -2]], [[5, -3]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => value[1] > 0)
        .chunkwise(2)
        .toArray(),
      [[[4, 1], [5, 2]], [[6, 3], [7, 4]], [[8, 5]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => value[1] >= 0)
        .chunkwise(2)
        .toArray(),
      [[[3, 0], [4, 1]], [[5, 2], [6, 3]], [[7, 4], [8, 5]]],
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => !(value[1] > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => !(value[1] > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => !(value[1] > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => !(value[1] > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => !(value[1] > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[[1, -1], [3, -2]], [[5, -3]]],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => !(value[1] > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[[1, -1], [3, -2]]],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => !(value[1] > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[[1, -1], [3, -2]], [[3, -2], [5, -3]]],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => !(value[1] > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[[1, -1], [3, -2]], [[3, -2], [5, -3]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => value[1] > 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[[4, 1], [5, 2]], [[6, 3], [7, 4]], [[8, 5]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => value[1] > 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[[4, 1], [5, 2]], [[6, 3], [7, 4]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => value[1] > 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[[4, 1], [5, 2]], [[5, 2], [6, 3]], [[6, 3], [7, 4]], [[7, 4], [8, 5]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => value[1] > 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[[4, 1], [5, 2]], [[5, 2], [6, 3]], [[6, 3], [7, 4]], [[7, 4], [8, 5]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => value[1] >= 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[[3, 0], [4, 1]], [[5, 2], [6, 3]], [[7, 4], [8, 5]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => value[1] >= 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[[3, 0], [4, 1]], [[5, 2], [6, 3]], [[7, 4], [8, 5]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => value[1] >= 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[[3, 0], [4, 1]], [[4, 1], [5, 2]], [[5, 2], [6, 3]], [[6, 3], [7, 4]], [[7, 4], [8, 5]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => value[1] >= 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[[3, 0], [4, 1]], [[4, 1], [5, 2]], [[5, 2], [6, 3]], [[6, 3], [7, 4]], [[7, 4], [8, 5]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => value[1] >= 0)
        .chunkwiseOverlap(3, 1)
        .toArray(),
      [
        [[3, 0], [4, 1], [5, 2]],
        [[5, 2], [6, 3], [7, 4]],
        [[7, 4], [8, 5], [9, 6]],
        [[9, 6], [10, 7], [11, 8]],
        [[11, 8], [12, 9]],
      ],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => value[1] >= 0)
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
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => value[1] >= 0)
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
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => value[1] >= 0)
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
      (iterable: Map<number, number>): Array<[number, number][]> => Stream.of(iterable)
        .filter((value) => !(value[0] > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, number>): Array<[[number, number], [number, number]]> => Stream.of(iterable)
        .filter((value) => value[0] > 0)
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Map<number, number>): Array<[[number, number], [number, number]]> => Stream.of(iterable)
        .filter((value) => value[1] > 0)
        .pairwise()
        .toArray(),
      [[[0, 1], [2, 2]], [[2, 2], [4, 3]]],
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, number>): Array<[[number, number], [number, number]]> => Stream.of(iterable)
        .filter((value) => value[1] > 0)
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Map<number, number>): Array<[[number, number], [number, number]]> => Stream.of(iterable)
        .filter((value) => value[1] < 0)
        .pairwise()
        .toArray(),
      [[[1, -1], [3, -2]], [[3, -2], [5, -3]]],
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, unknown>): Array<[unknown, unknown]> => Stream.of(iterable)
        .limit(0)
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>): Array<[unknown, number]> => Stream.of(iterable)
        .limit(5)
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Map<unknown, number>): Array<[unknown, number]> => Stream.of(iterable)
        .limit(5)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Map<unknown, number>): Array<[unknown, number]> => Stream.of(iterable)
        .limit(10)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Map<unknown, number>): Array<[unknown, number]> => Stream.of(iterable)
        .filter((x) => x[1] < 5)
        .limit(2)
        .toArray(),
      [[0, 1], [1, 2]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Map<unknown, number>): Array<[unknown, number]> => Stream.of(iterable)
        .filter((x) => x[1] < 5)
        .limit(10)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4]],
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, unknown>): Array<[unknown, unknown]> => Stream.of(iterable)
        .limit(0)
        .chainWith(createMapFixture([1, 2, 3]))
        .toArray(),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Map<number, number>): Array<[unknown, number]> => Stream.of(iterable)
        .skip(0)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Map<number, number>): Array<[unknown, number]> => Stream.of(iterable)
        .skip(0, 1)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Map<number, number>): Array<[unknown, number]> => Stream.of(iterable)
        .skip(10, 10)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Map<number, number>): Array<[unknown, number]> => Stream.of(iterable)
        .skip(3)
        .toArray(),
      [[3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Map<number, number>): Array<[unknown, number]> => Stream.of(iterable)
        .skip(3, 2)
        .toArray(),
      [[0, 1], [1, 2], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Map<number, number>): Array<[unknown, number]> => Stream.of(iterable)
        .skip(10, 2)
        .toArray(),
      [[0, 1], [1, 2]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Map<number, number>): Array<[unknown, number]> => Stream.of(iterable)
        .slice()
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Map<number, number>): Array<[unknown, number]> => Stream.of(iterable)
        .slice(2)
        .toArray(),
      [[2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Map<number, number>): Array<[unknown, number]> => Stream.of(iterable)
        .slice(2, 4)
        .toArray(),
      [[2, 3], [3, 4], [4, 5], [5, 6]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Map<number, number>): Array<[unknown, number]> => Stream.of(iterable)
        .slice(2, undefined, 2)
        .toArray(),
      [[2, 3], [4, 5], [6, 7], [8, 9]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Map<number, number>): Array<[unknown, number]> => Stream.of(iterable)
        .slice(2, 3, 2)
        .toArray(),
      [[2, 3], [4, 5], [6, 7]],
    ],
    [
      createMapFixture([]),
      // TODO repair type
      (iterable: Map<number, number>) => Stream.of(iterable)
        .filter((value) => value[1] % 2 !== 0)
        .groupBy((item) => item[1] > 0 ? 'pos' : 'neg')
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      // TODO repair type
      (iterable: Map<number, number>) => Stream.of(iterable)
        .filter((value) => value[1] % 2 !== 0)
        .groupBy((item) => item[1] > 0 ? 'pos' : 'neg')
        .toArray(),
      [['pos', [[0, 1], [4, 3]]], ['neg', [[1, -1], [5, -3]]]],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Map<number, number>): Array<[string, Array<[number, number]>]> => Stream.of(iterable)
        .filter((value) => value[1] % 2 !== 0)
        .groupBy((item) => item[1] > 0 ? 'pos' : 'neg', undefined)
        .toArray(),
      [['pos', [[0, 1], [4, 3]]], ['neg', [[1, -1], [5, -3]]]],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Map<number, number>): Array<[string, Record<string, [number, number]>]> => Stream.of(iterable)
        .filter((value) => value[1] % 2 !== 0)
        .groupBy((item) => item[1] > 0 ? 'pos' : 'neg', (x) => `${x[0]}`)
        .toArray(),
      [['pos', {'0': [0, 1], '4': [4, 3]}], ['neg', {'1': [1, -1], '5': [5, -3]}]],
    ],
    [
      createMapFixture(['b', 'f', 'c', 'e', 'd', 'a']),
      (iterable: Map<number, string>): Array<string> => Stream.of(iterable)
        .values()
        .sort()
        .toArray(),
      ['a', 'b', 'c', 'd', 'e', 'f'],
    ],
    [
      createMapFixture([2, 3, 1, 2, -3, -2, 5, 7, 3]),
      (iterable: Map<number, number>): Array<number> => Stream.of(iterable)
        .values()
        .sort((lhs, rhs) => lhs - rhs)
        .toArray(),
      [-3, -2, 1, 2, 2, 3, 3, 5, 7],
    ],
    [
      createMapFixture([2, 3, 1, 2, -3, -2, 5, 7, 3]),
      (iterable: Map<number, number>): Array<number> => Stream.of(iterable)
        .values()
        .sort((lhs, rhs) => rhs - lhs)
        .toArray(),
      [7, 5, 3, 3, 2, 2, 1, -2, -3],
    ],
  ];
}
