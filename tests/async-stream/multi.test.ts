import { AsyncStream } from '../../src';
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
  ...dataProviderForMixed(),
])(
  "AsyncStream Multi Test",
  (input, streamFactory, expected) => {
    it("", async () => {
      // Given
      const result = await streamFactory(input as any);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<[Array<any>, (data: Array<any>) => Promise<Array<any>>, Array<any>]> {
  return [
    [
      [],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .zipWith([], [])
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .zipEqualWith([], [])
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .zipLongestWith([], [])
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .zipWith(
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .zipLongestWith(
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [
        [undefined, 11, 111],
        [undefined, 22, 222],
        [undefined, 33, 333],
        [undefined, undefined, 444],
      ],
    ],
    [
      [],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .zipFilledWith(
          'filler',
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [
        ['filler', 11, 111],
        ['filler', 22, 222],
        ['filler', 33, 333],
        ['filler', 'filler', 444],
      ],
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .zipWith(
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [
        [1, 11, 111],
        [2, 22, 222],
        [3, 33, 333],
      ],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .zipEqualWith(
          [11, 22, 33],
          [111, 222, 333],
        )
        .toArray(),
      [
        [1, 11, 111],
        [2, 22, 222],
        [3, 33, 333],
      ],
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .zipLongestWith(
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [
        [1, 11, 111],
        [2, 22, 222],
        [3, 33, 333],
        [4, undefined, 444],
        [5, undefined, undefined],
      ],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .chainWith([4, 5, 6])
        .toArray(),
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [1, 2],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .chainWith([3, 4, 5])
        .chainWith([6, 7, 8, 9])
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<any>, (data: Generator<any>) => Promise<Array<any>>, Array<any>]> {
  return dataProviderForArrays().map((item) => [
    createGeneratorFixture(item[0]),
    ...item.slice(1) as [(data: Iterable<unknown> | Iterator<unknown>) => Promise<Array<any>>, Array<unknown>],
  ]);
}

function dataProviderForIterables(): Array<[Iterable<any>, (data: Iterable<any>) => Promise<Array<any>>, Array<any>]> {
  return dataProviderForArrays().map((item) => [
    createIterableFixture(item[0]),
    ...item.slice(1) as [(data: Iterable<unknown> | Iterator<unknown>) => Promise<Array<any>>, Array<unknown>],
  ]);
}

function dataProviderForIterators(): Array<[Iterator<any>, (data: Iterator<any>) => Promise<Array<any>>, Array<any>]> {
  return dataProviderForArrays().map((item) => [
    createIteratorFixture(item[0]),
    ...item.slice(1) as [(data: Iterable<unknown> | Iterator<unknown>) => Promise<Array<any>>, Array<unknown>],
  ]);
}

function dataProviderForStrings(): Array<[string, (data: string) => Promise<Array<any>>, Array<any>]> {
  return [
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .zipWith([], [])
        .toArray(),
      [],
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .zipEqualWith([], [])
        .toArray(),
      [],
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .zipLongestWith([], [])
        .toArray(),
      [],
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .zipWith(
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [],
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .zipLongestWith(
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [
        [undefined, 11, 111],
        [undefined, 22, 222],
        [undefined, 33, 333],
        [undefined, undefined, 444],
      ],
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .zipFilledWith(
          'filler',
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [
        ['filler', 11, 111],
        ['filler', 22, 222],
        ['filler', 33, 333],
        ['filler', 'filler', 444],
      ],
    ],
    [
      '12345',
      (iterable) => AsyncStream.of(iterable)
        .map((item) => parseInt(item as string))
        .zipWith(
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [
        [1, 11, 111],
        [2, 22, 222],
        [3, 33, 333],
      ],
    ],
    [
      '123',
      (iterable) => AsyncStream.of(iterable)
        .map((item) => parseInt(item as string))
        .zipEqualWith(
          [11, 22, 33],
          [111, 222, 333],
        )
        .toArray(),
      [
        [1, 11, 111],
        [2, 22, 222],
        [3, 33, 333],
      ],
    ],
    [
      '12345',
      (iterable) => AsyncStream.of(iterable)
        .map((item) => parseInt(item as string))
        .zipLongestWith(
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [
        [1, 11, 111],
        [2, 22, 222],
        [3, 33, 333],
        [4, undefined, 444],
        [5, undefined, undefined],
      ],
    ],
    [
      '123',
      (iterable) => AsyncStream.of(iterable)
        .map((item) => parseInt(item as string))
        .chainWith([4, 5, 6])
        .toArray(),
      [1, 2, 3, 4, 5, 6],
    ],
    [
      '12',
      (iterable) => AsyncStream.of(iterable)
        .map((item) => parseInt(item as string))
        .chainWith([3, 4, 5])
        .chainWith([6, 7, 8, 9])
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
  ];
}

function dataProviderForSets(): Array<[Set<any>, (data: Set<any>) => Promise<Array<any>>, Array<any>]> {
  return [
    [
      new Set([]),
      (iterable) => AsyncStream.of(iterable)
        .zipWith([], [])
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable) => AsyncStream.of(iterable)
        .zipEqualWith([], [])
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable) => AsyncStream.of(iterable)
        .zipLongestWith([], [])
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable) => AsyncStream.of(iterable)
        .zipWith(
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable) => AsyncStream.of(iterable)
        .zipLongestWith(
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [
        [undefined, 11, 111],
        [undefined, 22, 222],
        [undefined, 33, 333],
        [undefined, undefined, 444],
      ],
    ],
    [
      new Set([]),
      (iterable) => AsyncStream.of(iterable)
        .zipFilledWith(
          'filler',
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [
        ['filler', 11, 111],
        ['filler', 22, 222],
        ['filler', 33, 333],
        ['filler', 'filler', 444],
      ],
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      (iterable) => AsyncStream.of(iterable)
        .zipWith(
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [
        [1, 11, 111],
        [2, 22, 222],
        [3, 33, 333],
      ],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => AsyncStream.of(iterable)
        .zipEqualWith(
          [11, 22, 33],
          [111, 222, 333],
        )
        .toArray(),
      [
        [1, 11, 111],
        [2, 22, 222],
        [3, 33, 333],
      ],
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      (iterable) => AsyncStream.of(iterable)
        .zipLongestWith(
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [
        [1, 11, 111],
        [2, 22, 222],
        [3, 33, 333],
        [4, undefined, 444],
        [5, undefined, undefined],
      ],
    ],
    [
      new Set([1, 2, 3]),
      (iterable) => AsyncStream.of(iterable)
        .chainWith([4, 5, 6])
        .toArray(),
      [1, 2, 3, 4, 5, 6],
    ],
    [
      new Set([1, 2]),
      (iterable) => AsyncStream.of(iterable)
        .chainWith([3, 4, 5])
        .chainWith([6, 7, 8, 9])
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
  ];
}

function dataProviderForMaps(): Array<[Map<any, any>, (data: Map<any, any>) => Promise<Array<any>>, Array<any>]> {
  return [
    [
      createMapFixture([]),
      (iterable) => AsyncStream.of(iterable as Map<unknown, number>)
        .map((item) => item[1])
        .zipWith([], [])
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable) => AsyncStream.of(iterable as Map<unknown, number>)
        .map((item) => item[1])
        .zipEqualWith([], [])
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable) => AsyncStream.of(iterable as Map<unknown, number>)
        .map((item) => item[1])
        .zipLongestWith([], [])
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable) => AsyncStream.of(iterable as Map<unknown, number>)
        .map((item) => item[1])
        .zipWith(
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable) => AsyncStream.of(iterable as Map<unknown, number>)
        .map((item) => item[1])
        .zipLongestWith(
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [
        [undefined, 11, 111],
        [undefined, 22, 222],
        [undefined, 33, 333],
        [undefined, undefined, 444],
      ],
    ],
    [
      createMapFixture([]),
      (iterable) => AsyncStream.of(iterable)
        .zipFilledWith(
          'filler',
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [
        ['filler', 11, 111],
        ['filler', 22, 222],
        ['filler', 33, 333],
        ['filler', 'filler', 444],
      ],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable) => AsyncStream.of(iterable as Map<unknown, number>)
        .map((item) => item[1])
        .zipWith(
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [
        [1, 11, 111],
        [2, 22, 222],
        [3, 33, 333],
      ],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => AsyncStream.of(iterable as Map<unknown, number>)
        .map((item) => item[1])
        .zipEqualWith(
          [11, 22, 33],
          [111, 222, 333],
        )
        .toArray(),
      [
        [1, 11, 111],
        [2, 22, 222],
        [3, 33, 333],
      ],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable) => AsyncStream.of(iterable as Map<unknown, number>)
        .map((item) => item[1])
        .zipLongestWith(
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [
        [1, 11, 111],
        [2, 22, 222],
        [3, 33, 333],
        [4, undefined, 444],
        [5, undefined, undefined],
      ],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable) => AsyncStream.of(iterable as Map<unknown, number>)
        .map((item) => item[1])
        .chainWith([4, 5, 6])
        .toArray(),
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createMapFixture([1, 2]),
      (iterable) => AsyncStream.of(iterable as Map<unknown, number>)
        .map((item) => item[1])
        .chainWith([3, 4, 5])
        .chainWith([6, 7, 8, 9])
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
  ];
}

function dataProviderForAsync(): Array<[Array<any>, (data: AsyncIterable<any> | AsyncIterator<any>) => Promise<Array<any>>, Array<any>]> {
  return [
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .zipWith([], [])
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .zipEqualWith([], [])
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .zipLongestWith([], [])
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .zipWith(
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .zipLongestWith(
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [
        [undefined, 11, 111],
        [undefined, 22, 222],
        [undefined, 33, 333],
        [undefined, undefined, 444],
      ],
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .zipFilledWith(
          'filler',
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [
        ['filler', 11, 111],
        ['filler', 22, 222],
        ['filler', 33, 333],
        ['filler', 'filler', 444],
      ],
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .zipWith(
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [
        [1, 11, 111],
        [2, 22, 222],
        [3, 33, 333],
      ],
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .zipEqualWith(
          [11, 22, 33],
          [111, 222, 333],
        )
        .toArray(),
      [
        [1, 11, 111],
        [2, 22, 222],
        [3, 33, 333],
      ],
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .zipLongestWith(
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [
        [1, 11, 111],
        [2, 22, 222],
        [3, 33, 333],
        [4, undefined, 444],
        [5, undefined, undefined],
      ],
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .chainWith([4, 5, 6])
        .toArray(),
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [1, 2],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .chainWith([3, 4, 5])
        .chainWith([6, 7, 8, 9])
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[AsyncGenerator<any>, (data: AsyncGenerator<any>) => Promise<Array<any>>, Array<any>]> {
  return dataProviderForAsync().map((item) => [
    createAsyncGeneratorFixture(item[0]),
    ...item.slice(1) as [(data: AsyncIterable<unknown> | AsyncIterator<unknown>) => Promise<Array<any>>, Array<unknown>],
  ]);
}

function dataProviderForAsyncIterables(): Array<[AsyncIterable<any>, (data: AsyncIterable<any>) => Promise<Array<any>>, Array<any>]> {
  return dataProviderForAsync().map((item) => [
    createAsyncIterableFixture(item[0]),
    ...item.slice(1) as [(data: AsyncIterable<unknown> | AsyncIterator<unknown>) => Promise<Array<any>>, Array<unknown>],
  ]);
}

function dataProviderForAsyncIterators(): Array<[AsyncIterator<any>, (data: AsyncIterator<any>) => Promise<Array<any>>, Array<any>]> {
  return dataProviderForAsync().map((item) => [
    createAsyncIteratorFixture(item[0]),
    ...item.slice(1) as [(data: AsyncIterable<unknown> | AsyncIterator<unknown>) => Promise<Array<any>>, Array<unknown>],
  ]);
}

function dataProviderForMixed(): Array<[Iterable<any> | Iterator<any> | AsyncIterable<any> | AsyncIterator<any>, (data: Iterable<any> | Iterator<any> | AsyncIterable<any> | AsyncIterator<any>) => Promise<Array<any>>, Array<any>]> {
  return [
    [
      [1, 2, 3, 4, 5],
      (iterable: Iterable<unknown> | Iterator<unknown> | AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
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
      (iterable: Iterable<unknown> | Iterator<unknown> | AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
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
      (iterable: Iterable<unknown> | Iterator<unknown> | AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
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
      (iterable: Iterable<unknown> | Iterator<unknown> | AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
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
      (iterable: Iterable<unknown> | Iterator<unknown> | AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
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
      (iterable: Iterable<unknown> | Iterator<unknown> | AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
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
