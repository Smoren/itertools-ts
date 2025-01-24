import { AsyncStream, multi } from '../../src';
import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture,
  // @ts-ignore
} from "../fixture";

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
])(
  "AsyncStream Transform Test",
  (input, streamFactory, expected) => {
    it("", async () => {
      // Given
      const result = await streamFactory(input as any);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForTee(),
])(
  "AsyncStream Transform Tee Test",
  (input, count, extraOperations, expected) => {
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

function dataProviderForArrays(): Array<[Array<any>, (data: Array<any>) => any, any]> {
  return [
    [
      [],
      (iterable: Iterable<unknown>): Promise<Array<unknown>> => AsyncStream.of(iterable)
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .toArray(),
      [1, 2, 3],
    ],
    [
      [],
      (iterable: Iterable<number>): Promise<Set<number>> => AsyncStream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number>): Promise<Set<number>> => AsyncStream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      [1, 1, 2, 2, 3, 3],
      (iterable: Iterable<number>): Promise<Set<number>> => AsyncStream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      [],
      (iterable: Iterable<[unknown, unknown]>): Promise<Map<unknown, unknown>> => AsyncStream.of(iterable)
        .toMap(),
      new Map([]),
    ],
    [
      [['a', 1], ['b', 2], ['c', 3]],
      (iterable: Iterable<[string, number]>): Promise<Map<string, number>> => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
    [
      [['a', 1], ['a', 2], ['a', 3]],
      (iterable: Iterable<[string, number]>): Promise<Map<string, number>> => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 3]]),
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<any>, (data: Generator<any>) => any, any]> {
  return dataProviderForArrays().map((item) => [
    createGeneratorFixture(item[0]),
    ...item.slice(1) as [(data: any) => any, any],
  ]);
}

function dataProviderForIterables(): Array<[Iterable<any>, (data: Iterable<any>) => any, any]> {
  return dataProviderForArrays().map((item) => [
    createIterableFixture(item[0]),
    ...item.slice(1) as [(data: any) => any, any],
  ]);
}

function dataProviderForIterators(): Array<[Iterator<any>, (data: Iterator<any>) => any, any]> {
  return dataProviderForArrays().map((item) => [
    createIteratorFixture(item[0]),
    ...item.slice(1) as [(data: any) => any, any],
  ]);
}

function dataProviderForStrings(): Array<[string, (data: string) => any, any]> {
  return [
    [
      '',
      (iterable): Promise<Array<string>> => AsyncStream.of(iterable)
        .toArray(),
      [],
    ],
    [
      '123',
      (iterable): Promise<Array<string>> => AsyncStream.of(iterable)
        .toArray(),
      ['1', '2', '3'],
    ],
    [
      '',
      (iterable): Promise<Set<string>> => AsyncStream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      '123',
      (iterable): Promise<Set<string>> => AsyncStream.of(iterable)
        .toSet(),
      new Set(['1', '2', '3']),
    ],
    [
      '112233',
      (iterable): Promise<Set<string>> => AsyncStream.of(iterable)
        .toSet(),
      new Set(['1', '2', '3']),
    ],
    [
      '',
      (iterable): Promise<Map<number, string>> => AsyncStream.of(iterable)
        .enumerate()
        .toMap(),
      new Map([]),
    ],
    [
      'abc',
      (iterable): Promise<Map<number, string>> => AsyncStream.of(iterable)
        .enumerate()
        .toMap(),
      new Map([[0, 'a'], [1, 'b'], [2, 'c']]),
    ],
  ];
}

function dataProviderForSets(): Array<[Set<any>, (data: Set<any>) => any, any]> {
  return [
    [
      new Set([]),
      (iterable: Set<unknown>): Promise<Array<unknown>> => AsyncStream.of(iterable)
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Set<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set([]),
      (iterable: Set<number>): Promise<Set<number>> => AsyncStream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Set<number>): Promise<Set<number>> => AsyncStream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      new Set([1, 1, 2, 2, 3, 3]),
      (iterable: Set<number>): Promise<Set<number>> => AsyncStream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      new Set([]),
      (iterable: Set<number>): Promise<Map<number, number>> => AsyncStream.of(iterable)
        .enumerate()
        .toMap(),
      new Map([]),
    ],
    [
      new Set(['a', 'b', 'c']),
      (iterable: Set<string>): Promise<Map<number, string>> => AsyncStream.of(iterable)
        .enumerate()
        .toMap(),
      new Map([[0, 'a'], [1, 'b'], [2, 'c']]),
    ],
    [
      new Set([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Set<[string, number]>): Promise<Map<string, number>> => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
    [
      new Set([['a', 1], ['a', 2], ['a', 3]]),
      (iterable: Set<[string, number]>): Promise<Map<string, number>> => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 3]]),
    ],
  ];
}

function dataProviderForMaps(): Array<[Map<any, any>, (data: Map<any, any>) => any, any]> {
  return [
    [
      createMapFixture([]),
      (iterable: Map<unknown, unknown>): Promise<Array<[unknown, unknown]>> => AsyncStream.of(iterable)
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<number, number>): Promise<Array<[number, number]>> => AsyncStream.of(iterable)
        .toArray(),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>): Promise<Set<[unknown, number]>> => AsyncStream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<number, number>): Promise<Set<[number, number]>> => AsyncStream.of(iterable)
        .toSet(),
      new Set([[0, 1], [1, 2], [2, 3]]),
    ],
    [
      createMapFixture([1, 1, 2, 2, 3, 3]),
      (iterable: Map<number, number>): Promise<Set<[number, number]>> => AsyncStream.of(iterable)
        .toSet(),
      new Set([[0, 1], [1, 1], [2, 2], [3, 2], [4, 3], [5, 3]]),
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, unknown>): Promise<Map<number, unknown>> => AsyncStream.of(iterable)
        .toMap(),
      new Map([]),
    ],
    [
      new Map([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Map<string, number>): Promise<Map<string, number>> => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
    [
      new Map([['a', 1], ['a', 2], ['a', 3]]),
      (iterable: Map<string, number>): Promise<Map<string, number>> => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 3]]),
    ],
  ];
}

function dataProviderForAsync(): Array<[Array<any>, (data: AsyncGenerator<any>) => any, any]> {
  return [
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>): Promise<Array<unknown>> => AsyncStream.of(iterable)
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<number> | AsyncIterator<number>): Promise<Array<number>> => AsyncStream.of(iterable)
        .toArray(),
      [1, 2, 3],
    ],
    [
      [],
      (iterable: AsyncIterable<number> | AsyncIterator<number>): Promise<Set<number>> => AsyncStream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<number> | AsyncIterator<number>): Promise<Set<number>> => AsyncStream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      [1, 1, 2, 2, 3, 3],
      (iterable: AsyncIterable<number> | AsyncIterator<number>): Promise<Set<number>> => AsyncStream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      [],
      (iterable: AsyncIterable<[number, number]> | AsyncIterator<[number, number]>): Promise<Map<number, number>> => AsyncStream.of(iterable)
        .toMap(),
      new Map([]),
    ],
    [
      [['a', 1], ['b', 2], ['c', 3]],
      (iterable: AsyncIterable<[string, number]> | AsyncIterator<[string, number]>): Promise<Map<string, number>> => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
    [
      [['a', 1], ['a', 2], ['a', 3]],
      (iterable: AsyncIterable<[string, number]> | AsyncIterator<[string, number]>): Promise<Map<string, number>> => AsyncStream.of(iterable)
        .toMap(),
      new Map([['a', 3]]),
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[AsyncGenerator<any>, (data: AsyncGenerator<any>) => any, any]> {
  return dataProviderForAsync().map((item) => [
    createAsyncGeneratorFixture(item[0]),
    ...item.slice(1) as [(data: any) => any, any],
  ]);
}

function dataProviderForAsyncIterables(): Array<[AsyncIterable<any>, (data: AsyncIterable<any>) => any, any]> {
  return dataProviderForAsync().map((item) => [
    createAsyncIterableFixture(item[0]),
    ...item.slice(1) as [(data: any) => any, any],
  ]);
}

function dataProviderForAsyncIterators(): Array<[AsyncIterator<any>, (data: AsyncIterator<any>) => any, any]> {
  return dataProviderForAsync().map((item) => [
    createAsyncIteratorFixture(item[0]),
    ...item.slice(1) as [(data: any) => any, any],
  ]);
}

function dataProviderForTee(): Array<[AsyncIterable<any> | AsyncIterator<any> | Iterable<any> | Iterator<any>, number, Array<(stream: AsyncStream<any>) => AsyncStream<any>>, any]> {
  return [
    [
      createAsyncGeneratorFixture([]),
      1,
      [
        (stream: AsyncStream<unknown>) => stream,
      ],
      [
        [],
      ],
    ],
    [
      createAsyncIterableFixture([]),
      2,
      [
        (stream: AsyncStream<unknown>) => stream,
        (stream: AsyncStream<unknown>) => stream,
      ],
      [
        [],
        [],
      ],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      1,
      [
        (stream: AsyncStream<unknown>) => stream,
      ],
      [
        [1, 2, 3],
      ],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      1,
      [
        (stream: AsyncStream<unknown>) => stream
          .map((datum) => (datum as number) * 2),
      ],
      [
        [2, 4, 6],
      ],
    ],
    [
      [1, 2, 3],
      2,
      [
        (stream: AsyncStream<unknown>) => stream,
        (stream: AsyncStream<unknown>) => stream,
      ],
      [
        [1, 2, 3],
        [1, 2, 3],
      ],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      2,
      [
        (stream: AsyncStream<unknown>) => stream,
        (stream: AsyncStream<unknown>) => stream
          .map((datum) => (datum as number) * 2),
      ],
      [
        [1, 2, 3],
        [2, 4, 6],
      ],
    ],
    [
      createIterableFixture([1, 2, 3]),
      3,
      [
        (stream: AsyncStream<unknown>) => stream,
        (stream: AsyncStream<unknown>) => stream
          .map((datum) => (datum as number) * 2),
        (stream: AsyncStream<unknown>) => stream
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
        (stream: AsyncStream<unknown>) => stream,
        (stream: AsyncStream<unknown>) => stream
          .map((datum) => (datum as number) * 2),
        (stream: AsyncStream<unknown>) => stream
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
