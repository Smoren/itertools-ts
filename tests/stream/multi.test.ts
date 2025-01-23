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
  ...dataProviderForMixed(),
])(
  "Stream Multi Test",
  (input, streamFactory, expected) => {
    it("", () => {
      // Given
      const result = streamFactory(input as any);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<[Array<any>, (data: Array<any>) => Array<any>, Array<any>]> {
  return [
    [
      [],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .zipWith([], [])
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .zipEqualWith([], [])
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .zipLongestWith([], [])
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .zipWith(
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<number>) => Stream.of(iterable)
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
      (iterable: Iterable<number>) => Stream.of(iterable)
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
      (iterable: Iterable<number>) => Stream.of(iterable)
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
      (iterable: Iterable<number>) => Stream.of(iterable)
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
      (iterable: Iterable<number>) => Stream.of(iterable)
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
      (iterable: Iterable<number>) => Stream.of(iterable)
        .chainWith([4, 5, 6])
        .toArray(),
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [1, 2],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .chainWith([3, 4, 5])
        .chainWith([6, 7, 8, 9])
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<any>, (data: Generator<any>) => Array<any>, Array<any>]> {
  return dataProviderForArrays().map((item) => [
    createGeneratorFixture(item[0]),
    ...item.slice(1) as [(data: Iterable<unknown> | Iterator<unknown>) => Array<unknown>, Array<unknown>],
  ]);
}

function dataProviderForIterables(): Array<[Iterable<any>, (data: Iterable<any>) => Array<any>, Array<any>]> {
  return dataProviderForArrays().map((item) => [
    createIterableFixture(item[0]),
    ...item.slice(1) as [(data: Iterable<unknown> | Iterator<unknown>) => Array<unknown>, Array<unknown>],
  ]);
}

function dataProviderForIterators(): Array<[Iterator<any>, (data: Iterator<any>) => Array<any>, Array<any>]> {
  return dataProviderForArrays().map((item) => [
    createIteratorFixture(item[0]),
    ...item.slice(1) as [(data: Iterable<unknown> | Iterator<unknown>) => Array<unknown>, Array<unknown>],
  ]);
}

function dataProviderForStrings(): Array<[string, (data: string) => Array<any>, Array<any>]> {
  return [
    [
      '',
      (iterable) => Stream.of(iterable)
        .zipWith([], [])
        .toArray(),
      [],
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .zipEqualWith([], [])
        .toArray(),
      [],
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .zipLongestWith([], [])
        .toArray(),
      [],
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .zipWith(
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [],
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
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
      (iterable) => Stream.of(iterable)
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
      (iterable) => Stream.of(iterable)
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
      (iterable) => Stream.of(iterable)
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
      (iterable) => Stream.of(iterable)
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
      (iterable) => Stream.of(iterable)
        .map((item) => parseInt(item as string))
        .chainWith([4, 5, 6])
        .toArray(),
      [1, 2, 3, 4, 5, 6],
    ],
    [
      '12',
      (iterable) => Stream.of(iterable)
        .map((item) => parseInt(item as string))
        .chainWith([3, 4, 5])
        .chainWith([6, 7, 8, 9])
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
  ];
}

function dataProviderForSets(): Array<[Set<any>, (data: Set<any>) => Array<any>, Array<any>]> {
  return [
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .zipWith([], [])
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .zipEqualWith([], [])
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .zipLongestWith([], [])
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
        .zipWith(
          [11, 22, 33],
          [111, 222, 333, 444],
        )
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable) => Stream.of(iterable)
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
      (iterable) => Stream.of(iterable)
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
      (iterable) => Stream.of(iterable)
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
      (iterable) => Stream.of(iterable)
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
      (iterable) => Stream.of(iterable)
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
      (iterable) => Stream.of(iterable)
        .chainWith([4, 5, 6])
        .toArray(),
      [1, 2, 3, 4, 5, 6],
    ],
    [
      new Set([1, 2]),
      (iterable) => Stream.of(iterable)
        .chainWith([3, 4, 5])
        .chainWith([6, 7, 8, 9])
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
  ];
}

function dataProviderForMaps(): Array<[Map<any, any>, (data: Map<any, any>) => Array<any>, Array<any>]> {
  return [
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable as Map<unknown, number>)
        .map((item) => item[1])
        .zipWith([], [])
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable as Map<unknown, number>)
        .map((item) => item[1])
        .zipEqualWith([], [])
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable as Map<unknown, number>)
        .map((item) => item[1])
        .zipLongestWith([], [])
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable) => Stream.of(iterable as Map<unknown, number>)
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
      (iterable) => Stream.of(iterable as Map<unknown, number>)
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
      (iterable) => Stream.of(iterable)
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
      (iterable) => Stream.of(iterable as Map<unknown, number>)
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
      (iterable) => Stream.of(iterable as Map<unknown, number>)
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
      (iterable) => Stream.of(iterable as Map<unknown, number>)
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
      (iterable) => Stream.of(iterable as Map<unknown, number>)
        .map((item) => item[1])
        .chainWith([4, 5, 6])
        .toArray(),
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createMapFixture([1, 2]),
      (iterable) => Stream.of(iterable as Map<unknown, number>)
        .map((item) => item[1])
        .chainWith([3, 4, 5])
        .chainWith([6, 7, 8, 9])
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
  ];
}

function dataProviderForMixed(): Array<[Iterable<any> | Iterator<any>, (data: Iterable<any> | Iterator<any>) => Array<any>, Array<any>]> {
  return [
    [
      [1, 2, 3, 4, 5],
      (iterable) => Stream.of(iterable)
        .zipWith(
          createGeneratorFixture([11, 22, 33]),
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
      (iterable) => Stream.of(iterable)
        .zipLongestWith(
          createGeneratorFixture([11, 22, 33]),
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
        [4, undefined, 444, undefined, undefined, 'd'],
        [5, undefined, undefined, undefined, undefined, 'e'],
        [undefined, undefined, undefined, undefined, undefined, 'f'],
        [undefined, undefined, undefined, undefined, undefined, 'g'],
      ],
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable) => Stream.of(iterable)
        .zipFilledWith(
          'filler',
          createGeneratorFixture([11, 22, 33]),
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
        [4, 'filler', 444, 'filler', 'filler', 'd'],
        [5, 'filler', 'filler', 'filler', 'filler', 'e'],
        ['filler', 'filler', 'filler', 'filler', 'filler', 'f'],
        ['filler', 'filler', 'filler', 'filler', 'filler', 'g'],
      ],
    ],
    [
      [1, 2, 3],
      (iterable) => Stream.of(iterable)
        .zipEqualWith(
          createGeneratorFixture([11, 22, 33]),
          createIterableFixture([111, 222, 333]),
          createIteratorFixture([1111, 2222, 3333]),
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
      (iterable) => Stream.of(iterable)
        .chainWith(createGeneratorFixture([3, 4]))
        .chainWith(createIterableFixture([5]))
        .chainWith(createIteratorFixture([6]))
        .chainWith(new Set([7]))
        .chainWith(Stream.of(createMapFixture([8, 9])).map((item) => item[1]))
        .chainWith('abc')
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c'],
    ],
    [
      [1, 2],
      (iterable) => Stream.of(iterable)
        .chainWith(createGeneratorFixture([3, 4]))
        .chainWith(createIterableFixture([5]))
        .chainWith(createIteratorFixture([6]))
        .chainWith(new Set([7]))
        .chainWith(Stream.of(createMapFixture([8])).map((item) => item[1]))
        .chainWith('abc')
        .zipWith([11, 22, 33, 44, 55, 66, 77, 88, 'x', 'y', 'z'])
        .toArray(),
      [[1, 11], [2, 22], [3, 33], [4, 44], [5, 55], [6, 66], [7, 77], [8, 88], ['a', 'x'], ['b', 'y'], ['c', 'z']],
    ],
  ];
}
