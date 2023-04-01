import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture
  // @ts-ignore
} from "../fixture";
import { AsyncStream } from '../../src';

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

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toArray(),
      [1, 2, 3],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      [1, 1, 2, 2, 3, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([]),
    ],
    [
      [['a', 1], ['b', 2], ['c', 3]],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
    [
      [['a', 1], ['a', 2], ['a', 3]],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 3]]),
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toArray(),
      [1, 2, 3],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      createGeneratorFixture([1, 1, 2, 2, 3, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([]),
    ],
    [
      createGeneratorFixture([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
    [
      createGeneratorFixture([['a', 1], ['a', 2], ['a', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 3]]),
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      createIterableFixture([1, 1, 2, 2, 3, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([]),
    ],
    [
      createIterableFixture([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
    [
      createIterableFixture([['a', 1], ['a', 2], ['a', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 3]]),
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .toArray(),
      [1, 2, 3],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      createIteratorFixture([1, 1, 2, 2, 3, 3]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([]),
    ],
    [
      createIteratorFixture([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
    [
      createIteratorFixture([['a', 1], ['a', 2], ['a', 3]]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 3]]),
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toArray(),
      [],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toArray(),
      ['1', '2', '3'],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set(['1', '2', '3']),
    ],
    [
      '112233',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set(['1', '2', '3']),
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([]),
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set([]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      new Set([1, 1, 2, 2, 3, 3]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      new Set([]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([]),
    ],
    [
      new Set([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
    [
      new Set([['a', 1], ['a', 2], ['a', 3]]),
      (iterable: Iterator<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 3]]),
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toArray(),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([[0, 1], [1, 2], [2, 3]]),
    ],
    [
      createMapFixture([1, 1, 2, 2, 3, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([[0, 1], [1, 1], [2, 2], [3, 2], [4, 3], [5, 3]]),
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([]),
    ],
    [
      new Map([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
    [
      new Map([['a', 1], ['a', 2], ['a', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 3]]),
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toArray(),
      [],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      createAsyncGeneratorFixture([1, 1, 2, 2, 3, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([]),
    ],
    [
      createAsyncGeneratorFixture([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
    [
      createAsyncGeneratorFixture([['a', 1], ['a', 2], ['a', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 3]]),
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<unknown> {
  return [
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toArray(),
      [],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      createAsyncIterableFixture([1, 1, 2, 2, 3, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([]),
    ],
    [
      createAsyncIterableFixture([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
    [
      createAsyncIterableFixture([['a', 1], ['a', 2], ['a', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 3]]),
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<unknown> {
  return [
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toArray(),
      [],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toArray(),
      [1, 2, 3],
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      createAsyncIteratorFixture([1, 1, 2, 2, 3, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([]),
    ],
    [
      createAsyncIteratorFixture([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
    [
      createAsyncIteratorFixture([['a', 1], ['a', 2], ['a', 3]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 3]]),
    ],
  ];
}
