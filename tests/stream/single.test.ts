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
])("Stream Single Test", (input, streamFactory, expected) => {
  it("", () => {
    // Given
    const result = (streamFactory as (data: unknown) => Stream)(input);

    // Then
    expect(result).toEqual(expected);
  });
});

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [],
    ],
    [
      [1],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1]],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [1, 2, 3],
    ],
    [
      [],
      () => Stream.ofEmpty()
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      [1],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      ['a', 'b', 'c'],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      [[1], [2], [3]],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as Array<number>)[0])
        .toArray(),
      [1, 2, 3],
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
      [1, 2, [3, 4], [5, 6], 7, 8],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten(1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      [1, 2, [3, 4], [5, 6], 7, 8],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten(2)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      [1, 2, [3, 4], [5, 6], 7, 8],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten(0)
        .toArray(),
      [1, 2, [3, 4], [5, 6], 7, 8],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwise(2)
        .toArray(),
      [[1, 2], [3, 4], [5]],
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
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[-1, -2]],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[1, 2], [3, 4]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
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
      [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1, false)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2, false)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [],
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
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .limit(0)
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .limit(5)
        .toArray(),
      [],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .limit(5)
        .toArray(),
      [1, 2, 3, 4, 5],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(2)
        .toArray(),
      [1, 2],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .limit(0)
        .chainWith([1, 2, 3])
        .toArray(),
      [1, 2, 3],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2)
        .toArray(),
      [3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2, 4)
        .toArray(),
      [3, 4, 5, 6],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2, undefined, 2)
        .toArray(),
      [3, 5, 7, 9],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2, 3, 2)
        .toArray(),
      [3, 5, 7],
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1]],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [1, 2, 3],
    ],
    [
      createGeneratorFixture([]),
      () => Stream.ofEmpty()
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      createGeneratorFixture([[1], [2], [3]]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as Array<number>)[0])
        .toArray(),
      [1, 2, 3],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatMap((item) => single.repeat(item, (item as number) + 1))
        .toArray(),
      [1, 1, 2, 2, 2, 3, 3, 3, 3],
    ],
    [
      createGeneratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatMap((item) => item)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createGeneratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createGeneratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten(1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createGeneratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten(2)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createGeneratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten(0)
        .toArray(),
      [1, 2, [3, 4], [5, 6], 7, 8],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwise(2)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwise(2)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[-1, -2]],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[1, 2], [3, 4]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8], [8, 9]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1, false)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      createGeneratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2, false)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [[1, 2], [2, 3]],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .limit(0)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .limit(5)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .limit(5)
        .toArray(),
      [1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(2)
        .toArray(),
      [1, 2],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .limit(0)
        .chainWith([1, 2, 3])
        .toArray(),
      [1, 2, 3],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2)
        .toArray(),
      [3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2, 4)
        .toArray(),
      [3, 4, 5, 6],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2, undefined, 2)
        .toArray(),
      [3, 5, 7, 9],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2, 3, 2)
        .toArray(),
      [3, 5, 7],
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1]],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIterableFixture([]),
      () => Stream.ofEmpty()
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      createIterableFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      createIterableFixture([[1], [2], [3]]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as Array<number>)[0])
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatMap((item) => single.repeat(item, (item as number) + 1))
        .toArray(),
      [1, 1, 2, 2, 2, 3, 3, 3, 3],
    ],
    [
      createIterableFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatMap((item) => item)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createIterableFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createIterableFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten(1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createIterableFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten(2)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createIterableFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten(0)
        .toArray(),
      [1, 2, [3, 4], [5, 6], 7, 8],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwise(2)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwise(2)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[-1, -2]],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[1, 2], [3, 4]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8], [8, 9]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1, false)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      createIterableFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2, false)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [[1, 2], [2, 3]],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .limit(0)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .limit(5)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .limit(5)
        .toArray(),
      [1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(2)
        .toArray(),
      [1, 2],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .limit(0)
        .chainWith([1, 2, 3])
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2)
        .toArray(),
      [3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2, 4)
        .toArray(),
      [3, 4, 5, 6],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2, undefined, 2)
        .toArray(),
      [3, 5, 7, 9],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2, 3, 2)
        .toArray(),
      [3, 5, 7],
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1]],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIteratorFixture([]),
      () => Stream.ofEmpty()
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      createIteratorFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      createIteratorFixture([[1], [2], [3]]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as Array<number>)[0])
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatMap((item) => single.repeat(item, (item as number) + 1))
        .toArray(),
      [1, 1, 2, 2, 2, 3, 3, 3, 3],
    ],
    [
      createIteratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatMap((item) => item)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createIteratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createIteratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten(1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createIteratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten(2)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createIteratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten(0)
        .toArray(),
      [1, 2, [3, 4], [5, 6], 7, 8],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwise(2)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwise(2)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[-1, -2]],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[1, 2], [3, 4]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8], [8, 9]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1, false)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      createIteratorFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2, false)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [[1, 2], [2, 3]],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .limit(0)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .limit(5)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .limit(5)
        .toArray(),
      [1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(2)
        .toArray(),
      [1, 2],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .limit(0)
        .chainWith([1, 2, 3])
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2)
        .toArray(),
      [3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2, 4)
        .toArray(),
      [3, 4, 5, 6],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2, undefined, 2)
        .toArray(),
      [3, 5, 7, 9],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2, 3, 2)
        .toArray(),
      [3, 5, 7],
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, '1']],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, '1'], [1, '2'], [2, '3']],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => parseInt(value as string) > 0)
        .toArray(),
      [],
    ],
    [
      '123456',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => parseInt(value as string) % 2 === 0)
        .toArray(),
      ['2', '4', '6'],
    ],
    [
      '',
      () => Stream.ofEmpty()
        .map((item) => `[${item}]`)
        .toArray(),
      [],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[1]'],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[1]', '[2]', '[3]'],
    ],
    [
      'abc',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatMap((item) => single.repeat(parseInt(item as string), parseInt(item as string) + 1))
        .toArray(),
      [1, 1, 2, 2, 2, 3, 3, 3, 3],
    ],
    [
      createGeneratorFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      'abc',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten(1)
        .toArray(),
      ['a', 'b', 'c'],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .chunkwise(2)
        .toArray(),
      [],
    ],
    [
      'abc',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .chunkwise(2)
        .toArray(),
      [['a', 'b'], ['c']],
    ],
    [
      '012345',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => parseInt(value as string) > 0)
        .chunkwise(2)
        .toArray(),
      [['1', '2'], ['3', '4'], ['5']],
    ],
    [
      '012345',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .chunkwise(2)
        .toArray(),
      [['0', '1'], ['2', '3'], ['4', '5']],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [],
    ],
    [
      'abc',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [['a', 'b'], ['c']],
    ],
    [
      'abc',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [['a', 'b']],
    ],
    [
      'abc',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [['a', 'b'], ['b', 'c']],
    ],
    [
      'abc',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [['a', 'b'], ['b', 'c']],
    ],
    [
      'abcde',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [['a', 'b'], ['c', 'd'], ['e']],
    ],
    [
      'abcde',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [['a', 'b'], ['c', 'd']],
    ],
    [
      'abcde',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']],
    ],
    [
      'abcde',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']],
    ],
    [
      'abcdef',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [['a', 'b'], ['c', 'd'], ['e', 'f']],
    ],
    [
      'abcdef',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [['a', 'b'], ['c', 'd'], ['e', 'f']],
    ],
    [
      'abcdef',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f']],
    ],
    [
      'abcdef',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f']],
    ],
    [
      'abcdefghij',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .chunkwiseOverlap(3, 1)
        .toArray(),
      [['a', 'b', 'c'], ['c', 'd', 'e'], ['e', 'f', 'g'], ['g', 'h', 'i'], ['i', 'j']],
    ],
    [
      'abcdefghij',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .chunkwiseOverlap(3, 1, false)
        .toArray(),
      [['a', 'b', 'c'], ['c', 'd', 'e'], ['e', 'f', 'g'], ['g', 'h', 'i']],
    ],
    [
      'abcdefghij',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .pairwise()
        .toArray(),
      [],
    ],
    [
      'abc',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .pairwise()
        .toArray(),
      [['a', 'b'], ['b', 'c']],
    ],
    [
      'abcdef',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .pairwise()
        .toArray(),
      [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f']],
    ],
    [
      '',
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .limit(0)
        .toArray(),
      [],
    ],
    [
      '',
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .limit(5)
        .toArray(),
      [],
    ],
    [
      '1234567',
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .limit(5)
        .toArray(),
      ['1', '2', '3', '4', '5'],
    ],
    [
      '1234567',
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .limit(10)
        .toArray(),
      ['1', '2', '3', '4', '5', '6', '7'],
    ],
    [
      '1234567890',
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(2)
        .toArray(),
      ['1', '2'],
    ],
    [
      '1234567890',
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(10)
        .toArray(),
      ['1', '2', '3', '4', '0'],
    ],
    [
      '',
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .limit(0)
        .chainWith('123')
        .toArray(),
      ['1', '2', '3'],
    ],
    [
      '1234567890',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice()
        .toArray(),
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ],
    [
      '1234567890',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2)
        .toArray(),
      ['3', '4', '5', '6', '7', '8', '9', '0'],
    ],
    [
      '1234567890',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2, 4)
        .toArray(),
      ['3', '4', '5', '6'],
    ],
    [
      '1234567890',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2, undefined, 2)
        .toArray(),
      ['3', '5', '7', '9'],
    ],
    [
      '1234567890',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2, 3, 2)
        .toArray(),
      ['3', '5', '7'],
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [],
    ],
    [
      new Set([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1]],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set([]),
      () => Stream.ofEmpty()
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      new Set([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      new Set(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      new Set([[1], [2], [3]]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as Array<number>)[0])
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatMap((item) => single.repeat(item, (item as number) + 1))
        .toArray(),
      [1, 1, 2, 2, 2, 3, 3, 3, 3],
    ],
    [
      new Set([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatMap((item) => item)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      new Set([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      new Set([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten(1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      new Set([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten(2)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      new Set([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten(0)
        .toArray(),
      [1, 2, [3, 4], [5, 6], 7, 8],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) < 0)
        .chunkwise(2)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwise(2)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwise(2)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[-1, -2], [-3]],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[-1, -2]],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[1, 2], [3, 4], [5]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[1, 2], [3, 4]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[0, 1], [2, 3], [4, 5]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8], [8, 9]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 1, false)
        .toArray(),
      [[0, 1, 2], [2, 3, 4], [4, 5, 6], [6, 7, 8]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      new Set([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) >= 0)
        .chunkwiseOverlap(3, 2, false)
        .toArray(),
      [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9]],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [[1, 2], [2, 3]],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [[-1, -2], [-2, -3]],
    ],
    [
      new Set([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .limit(0)
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .limit(5)
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .limit(5)
        .toArray(),
      [1, 2, 3, 4, 5],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(2)
        .toArray(),
      [1, 2],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((x) => (x as number) < 5)
        .limit(10)
        .toArray(),
      [1, 2, 3, 4],
    ],
    [
      new Set([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .limit(0)
        .chainWith([1, 2, 3])
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2)
        .toArray(),
      [3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2, 4)
        .toArray(),
      [3, 4, 5, 6],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2, undefined, 2)
        .toArray(),
      [3, 5, 7, 9],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2, 3, 2)
        .toArray(),
      [3, 5, 7],
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, [0, 1]]],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .enumerate()
        .toArray(),
      [[0, [0, 1]], [1, [1, 2]], [2, [2, 3]]],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as Array<number>)[1])
        .filter((value) => (value as number) > 0)
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as Array<number>)[1])
        .filter((value) => (value as number) > 0)
        .toArray(),
      [1, 2, 3],
    ],
    [
      createMapFixture([]),
      () => Stream.ofEmpty()
        .map((item) => (item as Array<number>)[1] + 1)
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as Array<number>)[1] + 1)
        .toArray(),
      [],
    ],
    [
      createMapFixture([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as Array<number>)[1] + 1)
        .toArray(),
      [2],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as Array<number>)[1] + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      createMapFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => `[${(item as Array<string>)[1]}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      createMapFixture([[1], [2], [3]]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as Array<Array<number>>)[1][0])
        .toArray(),
      [1, 2, 3],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatMap((item) => single.repeat((item as Array<unknown>)[1], ((item as Array<unknown>)[1] as number) + 1))
        .toArray(),
      [1, 1, 2, 2, 2, 3, 3, 3, 3],
    ],
    [
      createMapFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatMap((item) => (item as Array<unknown>)[1])
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createMapFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten()
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createMapFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten(1)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createMapFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten(2)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createMapFixture([1, 2, [3, 4], [5, 6], 7, 8]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .flatten(0)
        .toArray(),
      [1, 2, [3, 4], [5, 6], 7, 8],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as Array<number>)[1] < 0)
        .chunkwise(2)
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as Array<number>)[1] < 0)
        .chunkwise(2)
        .toArray(),
      [[[1, -1], [3, -2]], [[5, -3]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .chunkwise(2)
        .toArray(),
      [[[4, 1], [5, 2]], [[6, 3], [7, 4]], [[8, 5]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as Array<number>)[1] >= 0)
        .chunkwise(2)
        .toArray(),
      [[[3, 0], [4, 1]], [[5, 2], [6, 3]], [[7, 4], [8, 5]]],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as Array<number>)[1] > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as Array<number>)[1] > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as Array<number>)[1] > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as Array<number>)[1] > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as Array<number>)[1] > 0))
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[[1, -1], [3, -2]], [[5, -3]]],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as Array<number>)[1] > 0))
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[[1, -1], [3, -2]]],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as Array<number>)[1] > 0))
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[[1, -1], [3, -2]], [[3, -2], [5, -3]]],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as Array<number>)[1] > 0))
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[[1, -1], [3, -2]], [[3, -2], [5, -3]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[[4, 1], [5, 2]], [[6, 3], [7, 4]], [[8, 5]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[[4, 1], [5, 2]], [[6, 3], [7, 4]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[[4, 1], [5, 2]], [[5, 2], [6, 3]], [[6, 3], [7, 4]], [[7, 4], [8, 5]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[[4, 1], [5, 2]], [[5, 2], [6, 3]], [[6, 3], [7, 4]], [[7, 4], [8, 5]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as Array<number>)[1] >= 0)
        .chunkwiseOverlap(2, 0)
        .toArray(),
      [[[3, 0], [4, 1]], [[5, 2], [6, 3]], [[7, 4], [8, 5]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as Array<number>)[1] >= 0)
        .chunkwiseOverlap(2, 0, false)
        .toArray(),
      [[[3, 0], [4, 1]], [[5, 2], [6, 3]], [[7, 4], [8, 5]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as Array<number>)[1] >= 0)
        .chunkwiseOverlap(2, 1)
        .toArray(),
      [[[3, 0], [4, 1]], [[4, 1], [5, 2]], [[5, 2], [6, 3]], [[6, 3], [7, 4]], [[7, 4], [8, 5]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as Array<number>)[1] >= 0)
        .chunkwiseOverlap(2, 1, false)
        .toArray(),
      [[[3, 0], [4, 1]], [[4, 1], [5, 2]], [[5, 2], [6, 3]], [[6, 3], [7, 4]], [[7, 4], [8, 5]]],
    ],
    [
      createMapFixture([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
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
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => !((value as number) > 0))
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as number) > 0)
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .pairwise()
        .toArray(),
      [[[0, 1], [2, 2]], [[2, 2], [4, 3]]],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as Array<number>)[1] > 0)
        .pairwise()
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .filter((value) => (value as Array<number>)[1] < 0)
        .pairwise()
        .toArray(),
      [[[1, -1], [3, -2]], [[3, -2], [5, -3]]],
    ],
    [
      createMapFixture([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .limit(0)
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .limit(5)
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .limit(5)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .limit(10)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((x) => (x as Array<number>)[1] < 5)
        .limit(2)
        .toArray(),
      [[0, 1], [1, 2]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .filter((x) => (x as Array<number>)[1] < 5)
        .limit(10)
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4]],
    ],
    [
      createMapFixture([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .limit(0)
        .chainWith(createMapFixture([1, 2, 3]))
        .toArray(),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice()
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2)
        .toArray(),
      [[2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2, 4)
        .toArray(),
      [[2, 3], [3, 4], [4, 5], [5, 6]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2, undefined, 2)
        .toArray(),
      [[2, 3], [4, 5], [6, 7], [8, 9]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .slice(2, 3, 2)
        .toArray(),
      [[2, 3], [4, 5], [6, 7]],
    ],
  ];
}
