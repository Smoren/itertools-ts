// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { Stream, multi } from '../../src';

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])(
  "Stream Transform Test",
  (input, streamFactory, expected) => {
    it("", () => {
      // Given
      const result = streamFactory(input as any);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForTee(),
])(
  "Stream Transform Tee Test",
  (input, count, extraOperations, expected) => {
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

describe.each([
  ...dataProviderForDivide(),
])(
  "Stream Transform Divide Test",
  (input, count, expected) => {
    it(`divides input into ${count} chunks`, () => {
      // Given
      const inputStream = Stream.of(input);
      const result: any[] = [];

      // When
      const chunks = inputStream.divide(count); // returns Stream[]

      for (const chunk of chunks) {
        // Collect items manually from each Stream
        result.push(Array.from(chunk));
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);




function dataProviderForArrays(): Array<[Array<any>, (data: Array<any>) => any, any]> {
  return [
    [
      [],
      (iterable: Iterable<unknown>): Array<unknown> => Stream.of(iterable)
        .toArray(),
      [],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number>): Array<number> => Stream.of(iterable)
        .toArray(),
      [1, 2, 3],
    ],
    [
      [],
      (iterable: Iterable<number>): Set<number> => Stream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number>): Set<number> => Stream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      [1, 1, 2, 2, 3, 3],
      (iterable: Iterable<number>): Set<number> => Stream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      [],
      (iterable: Iterable<[unknown, unknown]>): Map<unknown, unknown> => Stream.of(iterable)
        .toMap(),
      new Map([]),
    ],
    [
      [['a', 1], ['b', 2], ['c', 3]],
      (iterable: Iterable<[string, number]>): Map<string, number> => Stream.of(iterable)
        .toMap(),
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
    [
      [['a', 1], ['a', 2], ['a', 3]],
      (iterable: Iterable<[string, number]>): Map<string, number> => Stream.of(iterable)
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
      (iterable): Array<string> => Stream.of(iterable)
        .toArray(),
      [],
    ],
    [
      '123',
      (iterable): Array<string> => Stream.of(iterable)
        .toArray(),
      ['1', '2', '3'],
    ],
    [
      '',
      (iterable): Set<string> => Stream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      '123',
      (iterable): Set<string> => Stream.of(iterable)
        .toSet(),
      new Set(['1', '2', '3']),
    ],
    [
      '112233',
      (iterable): Set<string> => Stream.of(iterable)
        .toSet(),
      new Set(['1', '2', '3']),
    ],
    [
      '',
      (iterable): Map<number, string> => Stream.of(iterable)
        .enumerate()
        .toMap(),
      new Map([]),
    ],
    [
      'abc',
      (iterable): Map<number, string> => Stream.of(iterable)
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
      (iterable: Set<unknown>): Array<unknown> => Stream.of(iterable)
        .toArray(),
      [],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Set<number>): Array<number> => Stream.of(iterable)
        .toArray(),
      [1, 2, 3],
    ],
    [
      new Set([]),
      (iterable: Set<number>): Set<number> => Stream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Set<number>): Set<number> => Stream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      new Set([1, 1, 2, 2, 3, 3]),
      (iterable: Set<number>): Set<number> => Stream.of(iterable)
        .toSet(),
      new Set([1, 2, 3]),
    ],
    [
      new Set([]),
      (iterable: Set<number>): Map<number, number> => Stream.of(iterable)
        .enumerate()
        .toMap(),
      new Map([]),
    ],
    [
      new Set(['a', 'b', 'c']),
      (iterable: Set<string>): Map<number, string> => Stream.of(iterable)
        .enumerate()
        .toMap(),
      new Map([[0, 'a'], [1, 'b'], [2, 'c']]),
    ],
    [
      new Set([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Set<[string, number]>): Map<string, number> => Stream.of(iterable)
        .toMap(),
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
    [
      new Set([['a', 1], ['a', 2], ['a', 3]]),
      (iterable: Set<[string, number]>): Map<string, number> => Stream.of(iterable)
        .toMap(),
      new Map([['a', 3]]),
    ],
  ];
}

function dataProviderForMaps(): Array<[Map<any, any>, (data: Map<any, any>) => any, any]> {
  return [
    [
      createMapFixture([]),
      (iterable: Map<unknown, unknown>): Array<[unknown, unknown]> => Stream.of(iterable)
        .toArray(),
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<number, number>): Array<[number, number]> => Stream.of(iterable)
        .toArray(),
      [[0, 1], [1, 2], [2, 3]],
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>): Set<[unknown, number]> => Stream.of(iterable)
        .toSet(),
      new Set([]),
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<number, number>): Set<[number, number]> => Stream.of(iterable)
        .toSet(),
      new Set([[0, 1], [1, 2], [2, 3]]),
    ],
    [
      createMapFixture([1, 1, 2, 2, 3, 3]),
      (iterable: Map<number, number>): Set<[number, number]> => Stream.of(iterable)
        .toSet(),
      new Set([[0, 1], [1, 1], [2, 2], [3, 2], [4, 3], [5, 3]]),
    ],
    [
      createMapFixture([]),
      (iterable: Map<number, unknown>): Map<number, unknown> => Stream.of(iterable)
        .toMap(),
      new Map([]),
    ],
    [
      new Map([['a', 1], ['b', 2], ['c', 3]]),
      (iterable: Map<string, number>): Map<string, number> => Stream.of(iterable)
        .toMap(),
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
    [
      new Map([['a', 1], ['a', 2], ['a', 3]]),
      (iterable: Map<string, number>): Map<string, number> => Stream.of(iterable)
        .toMap(),
      new Map([['a', 3]]),
    ],
  ];
}

function dataProviderForTee(): Array<[Iterable<any>, number, Array<(stream: Stream<any>) => Stream<any>>, any]> {
  // input, count, extraOperations, expected
  return [
    [
      [],
      1,
      [
        (stream: Stream<unknown>): Stream<unknown> => stream,
      ],
      [
        [],
      ],
    ],
    [
      [],
      2,
      [
        (stream: Stream<unknown>): Stream<unknown> => stream,
        (stream: Stream<unknown>): Stream<unknown> => stream,
      ],
      [
        [],
        [],
      ],
    ],
    [
      [1, 2, 3],
      1,
      [
        (stream: Stream<number>): Stream<number> => stream,
      ],
      [
        [1, 2, 3],
      ],
    ],
    [
      [1, 2, 3],
      1,
      [
        (stream: Stream<number>): Stream<number> => stream.map((datum) => datum * 2),
      ],
      [
        [2, 4, 6],
      ],
    ],
    [
      [1, 2, 3],
      2,
      [
        (stream: Stream<number>): Stream<number> => stream,
        (stream: Stream<number>): Stream<number> => stream,
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
        (stream: Stream<number>): Stream<number> => stream,
        (stream: Stream<number>): Stream<number> => stream.map((datum) => datum * 2),
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
        (stream: Stream<number>): Stream<number> => stream,
        (stream: Stream<number>): Stream<number> => stream.map((datum) => datum * 2),
        (stream: Stream<number>): Stream<number> => stream.map((datum) => datum ** 3),
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
        (stream: Stream<number>): Stream<number> => stream,
        (stream: Stream<number>): Stream<number> => stream
          .map((datum) => datum * 2),
        (stream: Stream<number>): Stream<number> => stream
          .map((datum) => datum ** 3)
          .filter((datum) => datum < 10),
      ],
      [
        [1, 2, 3],
        [2, 4, 6],
        [1, 8],
      ],
    ],
  ];
}



function dataProviderForDivide(): Array<[any, number, any[]]> {
  return [
    // Arrays
    [[], 2, [[], []]],                       // divide empty array into 2 chunks
    [[1], 2, [[1], []]],                     // single element into 2 chunks
    [[1, 2], 2, [[1], [2]]],
    [[1, 2, 3, 4], 2, [[1, 2], [3, 4]]],
    [[1, 2, 3, 4, 5], 2, [[1, 2, 3], [4, 5]]],
    [[1, 2, 3, 4], 3, [[1, 2], [3], [4]]],
    [[1, 2, 3], 5, [[1], [2], [3], [], []]],

    // Strings
    ['', 2, [[], []]],
    ['abcd', 2, [['a', 'b'], ['c', 'd']]],
    ['abc', 3, [['a'], ['b'], ['c']]],
    ['abc', 5, [['a'], ['b'], ['c'], [], []]],

    // Sets
    [new Set([]), 2, [[], []]],
    [new Set([1, 2, 3, 4]), 2, [[1, 2], [3, 4]]],
    [new Set(['a', 'b', 'c']), 3, [['a'], ['b'], ['c']]],

    // Maps (divide on entries)
    [new Map([]), 2, [[], []]],
    [new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4]]), 2,
      [[['a', 1], ['b', 2]], [['c', 3], ['d', 4]]]],
    [new Map([['a', 1], ['b', 2], ['c', 3]]), 3,
      [[['a', 1]], [['b', 2]], [['c', 3]]]],

    // Generators
    [createGeneratorFixture([1, 2, 3, 4]), 2, [[1, 2], [3, 4]]],

    // Iterables
    [createIterableFixture([1, 2, 3]), 2, [[1, 2], [3]]],

    // Iterators
    [createIteratorFixture([1, 2, 3, 4, 5]), 3, [[1, 2], [3, 4], [5]]],
  ];
}

