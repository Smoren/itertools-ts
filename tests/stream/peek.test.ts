// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { Stream } from '../../src';

describe.each([
  ...dataProviderForArrays(),
  // ...dataProviderForGenerators(),
  // ...dataProviderForIterables(),
  // ...dataProviderForIterators(),
  // ...dataProviderForStrings(),
  // ...dataProviderForSets(),
  // ...dataProviderForMaps(),
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
    // [
    //   [],
    //   (iterable: Iterable<unknown>) => Stream.of(iterable),
    //   (stream: Stream) => stream.sort(),
    //   [],
    //   [],
    // ],
    // [
    //   [5, 4, 3, 2, 1],
    //   (iterable: Iterable<unknown>) => Stream.of(iterable),
    //   (stream: Stream) => stream.sort(),
    //   [5, 4, 3, 2, 1],
    //   [1, 2, 3, 4, 5],
    // ],
    // [
    //   [],
    //   (iterable: Iterable<unknown>) => Stream.of(iterable).sort(),
    //   (stream: Stream) => stream,
    //   [],
    //   [],
    // ],
    // [
    //   [5, 4, 3, 2, 1],
    //   (iterable: Iterable<unknown>) => Stream.of(iterable).sort(),
    //   (stream: Stream) => stream,
    //   [1, 2, 3, 4, 5],
    //   [1, 2, 3, 4, 5],
    // ],
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
    // [
    //   [],
    //   (iterable: Iterable<unknown>) => Stream.of(iterable)
    //     .filter((x) => (x as number) % 2 !== 0)
    //     .sort(),
    //   (stream: Stream) => stream
    //     .map((x) => x + 1)
    //     .pairwise(),
    //   [],
    //   [],
    // ],
    // [
    //   [9, 8, 7, 6, 5, 4, 3, 2, 1],
    //   (iterable: Iterable<unknown>) => Stream.of(iterable)
    //     .filter((x) => x % 2 !== 0)
    //     .sort(),
    //   (stream: Stream) => stream
    //     .map((x) => x + 1)
    //     .pairwise(),
    //   [1, 3, 5, 7, 9],
    //   [[2, 4], [4, 6], [6, 8], [8, 10]],
    // ],
  ];
}
