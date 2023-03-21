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
] as Array<[Iterable<unknown>|Iterator<unknown>, (data: unknown) => Stream, Array<unknown>]>)(
  "Stream Transform Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    streamFactory: (data: unknown) => Stream,
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

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toArray(),
      [1, 2, 3],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      [1, 1, 2, 2, 3, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMap(),
      new Map([]),
    ],
    [
      [['a', 1], ['b', 2], ['c', 3]],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMap(),
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
    [
      [['a', 1], ['a', 2], ['a', 3]],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMap(),
      new Map([['a', 3]]),
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toArray(),
      [1, 2, 3],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      createGeneratorFixture([1, 1, 2, 2, 3, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMap(),
      new Map([]),
    ],
    [
      createGeneratorFixture([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMap(),
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
    [
      createGeneratorFixture([['a', 1], ['a', 2], ['a', 3]]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMap(),
      new Map([['a', 3]]),
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      createIterableFixture([1, 1, 2, 2, 3, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMap(),
      new Map([]),
    ],
    [
      createIterableFixture([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMap(),
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
    [
      createIterableFixture([['a', 1], ['a', 2], ['a', 3]]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMap(),
      new Map([['a', 3]]),
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      createIteratorFixture([1, 1, 2, 2, 3, 3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toMap(),
      new Map([]),
    ],
    [
      createIteratorFixture([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toMap(),
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
    [
      createIteratorFixture([['a', 1], ['a', 2], ['a', 3]]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toMap(),
      new Map([['a', 3]]),
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toArray(),
      [],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toArray(),
      ['1', '2', '3'],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toSet(),
      new Set(['1', '2', '3']),
    ],
    [
      '112233',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toSet(),
      new Set(['1', '2', '3']),
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMap(),
      new Map([]),
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      new Set([1, 1, 2, 2, 3, 3]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      new Set([]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toMap(),
      new Map([]),
    ],
    [
      new Set([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toMap(),
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
    [
      new Set([['a', 1], ['a', 2], ['a', 3]]),
      (iterable: Iterator<unknown>) => Stream.of(iterable)
        .toMap(),
      new Map([['a', 3]]),
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toArray(),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toSet(),
      new Set([[0, 1], [1, 2], [2, 3]]),
    ],
    [
      createMapFixture([1, 1, 2, 2, 3, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toSet(),
      new Set([[0, 1], [1, 1], [2, 2], [3, 2], [4, 3], [5, 3]]),
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMap(),
      new Map([]),
    ],
    [
      new Map([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMap(),
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
    [
      new Map([['a', 1], ['a', 2], ['a', 3]]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .toMap(),
      new Map([['a', 3]]),
    ],
  ];
}
