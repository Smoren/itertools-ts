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
import { AsyncStream, Comparable, Stream } from '../../src';

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
  "AsyncStream Set Test",
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

describe.each([
  ...dataProviderForPartialIntersection(),
] as Array<[
  AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  number,
  (minIntersectionCount: number, data: unknown) => AsyncStream,
  Array<unknown>
]>)(
  "AsyncStream Set Partial Intersection Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    minIntersectionCount: number,
    streamFactory: (minIntersectionCount: number, data: unknown) => AsyncStream,
    expected: Array<unknown>
  ) => {
    it("", async () => {
      // Given
      const result = await streamFactory(
        minIntersectionCount as number,
        input as Array<Iterable<unknown>>
      );

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [1, 2, 3, '1', '2', '3'],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct()
        .toArray(),
      [1, 2, 3, '1', '2', '3'],
    ],
    [
      [1, 2, 3, '1', '2', '3', 1, '1'],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct()
        .toArray(),
      [1, 2, 3, '1', '2', '3'],
    ],
    [
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct((datum: unknown) => (datum as Record<string, unknown>)['name'] as Comparable)
        .toArray(),
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      [
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6, 7],
        ['3', 4, 5, 6, 7, 8, 9],
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .intersectionWith(...iterables)
        .toArray(),
      [4, 5],
    ],
    [
      [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        ['1', '2', 3, 4, 5, 6, 7, '8', '9'],
        [1, 3, 5, 7, 9, 11],
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .intersectionWith(...iterables)
        .toArray(),
      [3, 5, 7],
    ],
    [
      [
        [1, 2, 3],
        [1, 1, 1],
        ['11', '21', '31', '12', '13'],
        ['13', '11', '14', '21'],
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .zipWith(iterables.shift() as Iterable<unknown>)
        .map((values) => `${(values as Array<unknown>)[0]}${(values as Array<unknown>)[1]}`)
        .intersectionWith(...iterables)
        .toArray(),
      ['11', '21'],
    ],
    [
      [
        [1, 2, 3],
        ['a', 'b', 'c'],
        ['1a', '2b', '3c', 'a2', 'a3'],
        ['c3', '1a', 'd4', '2b'],
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .zipWith(iterables.shift() as Iterable<unknown>)
        .map((values) => `${(values as Array<unknown>)[0]}${(values as Array<unknown>)[1]}`)
        .intersectionWith(...iterables)
        .toArray(),
      ['1a', '2b'],
    ],
    [
      [
        [1, 2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7, 8],
        [5, 6, 7, 8, 9, 10],
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .symmetricDifferenceWith(...iterables)
        .toArray(),
      [1, 2, 9, 10],
    ],
    [
      [
        [1, 2, '3', 4, 5, 6],
        [3, 4, 5, 6, 7, 8],
        [5, 6, 7, 8, 9, 10],
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .symmetricDifferenceWith(...iterables)
        .toArray(),
      [1, 3, 2, '3', 9, 10],
    ],
    [
      [
        [],
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7],
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .unionWith(...iterables)
        .toArray(),
      [2, 3, 4, 5, 6, 7],
    ],
    [
      [
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7],
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .unionWith(...iterables)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      [
        [],
        [],
        [],
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        [],
        [11, 22],
        ['a', 'b'],
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        [1, 2],
        [],
        ['a', 'b'],
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        [1, 2, 3],
        [11, 22],
        ['a', 'b'],
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [
        [1, 11, 'a'],
        [1, 11, 'b'],
        [1, 22, 'a'],
        [1, 22, 'b'],
        [2, 11, 'a'],
        [2, 11, 'b'],
        [2, 22, 'a'],
        [2, 22, 'b'],
        [3, 11, 'a'],
        [3, 11, 'b'],
        [3, 22, 'a'],
        [3, 22, 'b'],
      ],
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([1, 2, 3, '1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct()
        .toArray(),
      [1, 2, 3, '1', '2', '3'],
    ],
    [
      createGeneratorFixture([1, 2, 3, '1', '2', '3', 1, '1']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct()
        .toArray(),
      [1, 2, 3, '1', '2', '3'],
    ],
    [
      createGeneratorFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct((datum: unknown) => (datum as Record<string, unknown>)['name'] as Comparable)
        .toArray(),
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3, 4, 5]),
        createGeneratorFixture([2, 3, 4, 5, 6, 7]),
        createGeneratorFixture(['3', 4, 5, 6, 7, 8, 9]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .intersectionWith(...iterables)
        .toArray(),
      [4, 5],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        createGeneratorFixture(['1', '2', 3, 4, 5, 6, 7, '8', '9']),
        createGeneratorFixture([1, 3, 5, 7, 9, 11]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .intersectionWith(...iterables)
        .toArray(),
      [3, 5, 7],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([1, 1, 1]),
        createGeneratorFixture(['11', '21', '31', '12', '13']),
        createGeneratorFixture(['13', '11', '14', '21']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .zipWith(iterables.shift() as Iterable<unknown>)
        .map((values) => `${(values as Array<unknown>)[0]}${(values as Array<unknown>)[1]}`)
        .intersectionWith(...iterables)
        .toArray(),
      ['11', '21'],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture(['a', 'b', 'c']),
        createGeneratorFixture(['1a', '2b', '3c', 'a2', 'a3']),
        createGeneratorFixture(['c3', '1a', 'd4', '2b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .zipWith(iterables.shift() as Iterable<unknown>)
        .map((values) => `${(values as Array<unknown>)[0]}${(values as Array<unknown>)[1]}`)
        .intersectionWith(...iterables)
        .toArray(),
      ['1a', '2b'],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3, 4, 5, 6]),
        createGeneratorFixture([3, 4, 5, 6, 7, 8]),
        createGeneratorFixture([5, 6, 7, 8, 9, 10]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .symmetricDifferenceWith(...iterables)
        .toArray(),
      [1, 2, 9, 10],
    ],
    [
      [
        createGeneratorFixture([1, 2, '3', 4, 5, 6]),
        createGeneratorFixture([3, 4, 5, 6, 7, 8]),
        createGeneratorFixture([5, 6, 7, 8, 9, 10]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .symmetricDifferenceWith(...iterables)
        .toArray(),
      [1, 3, 2, '3', 9, 10],
    ],
    [
      [
        createGeneratorFixture([]),
        createGeneratorFixture([2, 3, 4, 5, 6]),
        createGeneratorFixture([3, 4, 5, 6, 7]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .unionWith(...iterables)
        .toArray(),
      [2, 3, 4, 5, 6, 7],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3, 4, 5]),
        createGeneratorFixture([2, 3, 4, 5, 6]),
        createGeneratorFixture([3, 4, 5, 6, 7]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .unionWith(...iterables)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      [
        createGeneratorFixture([]),
        createGeneratorFixture([]),
        createGeneratorFixture([]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        createGeneratorFixture([]),
        createGeneratorFixture([11, 22]),
        createGeneratorFixture(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        createGeneratorFixture([1, 2]),
        createGeneratorFixture([]),
        createGeneratorFixture(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3]),
        createGeneratorFixture([11, 22]),
        createGeneratorFixture(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [
        [1, 11, 'a'],
        [1, 11, 'b'],
        [1, 22, 'a'],
        [1, 22, 'b'],
        [2, 11, 'a'],
        [2, 11, 'b'],
        [2, 22, 'a'],
        [2, 22, 'b'],
        [3, 11, 'a'],
        [3, 11, 'b'],
        [3, 22, 'a'],
        [3, 22, 'b'],
      ],
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([1, 2, 3, '1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct()
        .toArray(),
      [1, 2, 3, '1', '2', '3'],
    ],
    [
      createIterableFixture([1, 2, 3, '1', '2', '3', 1, '1']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct()
        .toArray(),
      [1, 2, 3, '1', '2', '3'],
    ],
    [
      createIterableFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct((datum: unknown) => (datum as Record<string, unknown>)['name'] as Comparable)
        .toArray(),
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      [
        createIterableFixture([1, 2, 3, 4, 5]),
        createIterableFixture([2, 3, 4, 5, 6, 7]),
        createIterableFixture(['3', 4, 5, 6, 7, 8, 9]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .intersectionWith(...iterables)
        .toArray(),
      [4, 5],
    ],
    [
      [
        createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        createIterableFixture(['1', '2', 3, 4, 5, 6, 7, '8', '9']),
        createIterableFixture([1, 3, 5, 7, 9, 11]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .intersectionWith(...iterables)
        .toArray(),
      [3, 5, 7],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([1, 1, 1]),
        createIterableFixture(['11', '21', '31', '12', '13']),
        createIterableFixture(['13', '11', '14', '21']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .zipWith(iterables.shift() as Iterable<unknown>)
        .map((values) => `${(values as Array<unknown>)[0]}${(values as Array<unknown>)[1]}`)
        .intersectionWith(...iterables)
        .toArray(),
      ['11', '21'],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture(['a', 'b', 'c']),
        createIterableFixture(['1a', '2b', '3c', 'a2', 'a3']),
        createIterableFixture(['c3', '1a', 'd4', '2b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .zipWith(iterables.shift() as Iterable<unknown>)
        .map((values) => `${(values as Array<unknown>)[0]}${(values as Array<unknown>)[1]}`)
        .intersectionWith(...iterables)
        .toArray(),
      ['1a', '2b'],
    ],
    [
      [
        createIterableFixture([1, 2, 3, 4, 5, 6]),
        createIterableFixture([3, 4, 5, 6, 7, 8]),
        createIterableFixture([5, 6, 7, 8, 9, 10]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .symmetricDifferenceWith(...iterables)
        .toArray(),
      [1, 2, 9, 10],
    ],
    [
      [
        createIterableFixture([1, 2, '3', 4, 5, 6]),
        createIterableFixture([3, 4, 5, 6, 7, 8]),
        createIterableFixture([5, 6, 7, 8, 9, 10]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .symmetricDifferenceWith(...iterables)
        .toArray(),
      [1, 3, 2, '3', 9, 10],
    ],
    [
      [
        createIterableFixture([]),
        createIterableFixture([2, 3, 4, 5, 6]),
        createIterableFixture([3, 4, 5, 6, 7]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .unionWith(...iterables)
        .toArray(),
      [2, 3, 4, 5, 6, 7],
    ],
    [
      [
        createIterableFixture([1, 2, 3, 4, 5]),
        createIterableFixture([2, 3, 4, 5, 6]),
        createIterableFixture([3, 4, 5, 6, 7]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .unionWith(...iterables)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      [
        createIterableFixture([]),
        createIterableFixture([11, 22]),
        createIterableFixture(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        createIterableFixture([1, 2]),
        createIterableFixture([]),
        createIterableFixture(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        createIterableFixture([1, 2, 3]),
        createIterableFixture([11, 22]),
        createIterableFixture(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [
        [1, 11, 'a'],
        [1, 11, 'b'],
        [1, 22, 'a'],
        [1, 22, 'b'],
        [2, 11, 'a'],
        [2, 11, 'b'],
        [2, 22, 'a'],
        [2, 22, 'b'],
        [3, 11, 'a'],
        [3, 11, 'b'],
        [3, 22, 'a'],
        [3, 22, 'b'],
      ],
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([1, 2, 3, '1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct()
        .toArray(),
      [1, 2, 3, '1', '2', '3'],
    ],
    [
      createIteratorFixture([1, 2, 3, '1', '2', '3', 1, '1']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct()
        .toArray(),
      [1, 2, 3, '1', '2', '3'],
    ],
    [
      createIteratorFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct((datum: unknown) => (datum as Record<string, unknown>)['name'] as Comparable)
        .toArray(),
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      [
        createIteratorFixture([1, 2, 3, 4, 5]),
        createIteratorFixture([2, 3, 4, 5, 6, 7]),
        createIteratorFixture(['3', 4, 5, 6, 7, 8, 9]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .intersectionWith(...iterables)
        .toArray(),
      [4, 5],
    ],
    [
      [
        createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        createIteratorFixture(['1', '2', 3, 4, 5, 6, 7, '8', '9']),
        createIteratorFixture([1, 3, 5, 7, 9, 11]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .intersectionWith(...iterables)
        .toArray(),
      [3, 5, 7],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([1, 1, 1]),
        createIteratorFixture(['11', '21', '31', '12', '13']),
        createIteratorFixture(['13', '11', '14', '21']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .zipWith(iterables.shift() as Iterable<unknown>)
        .map((values) => `${(values as Array<unknown>)[0]}${(values as Array<unknown>)[1]}`)
        .intersectionWith(...iterables)
        .toArray(),
      ['11', '21'],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture(['a', 'b', 'c']),
        createIteratorFixture(['1a', '2b', '3c', 'a2', 'a3']),
        createIteratorFixture(['c3', '1a', 'd4', '2b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .zipWith(iterables.shift() as Iterable<unknown>)
        .map((values) => `${(values as Array<unknown>)[0]}${(values as Array<unknown>)[1]}`)
        .intersectionWith(...iterables)
        .toArray(),
      ['1a', '2b'],
    ],
    [
      [
        createIteratorFixture([1, 2, 3, 4, 5, 6]),
        createIteratorFixture([3, 4, 5, 6, 7, 8]),
        createIteratorFixture([5, 6, 7, 8, 9, 10]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .symmetricDifferenceWith(...iterables)
        .toArray(),
      [1, 2, 9, 10],
    ],
    [
      [
        createIteratorFixture([1, 2, '3', 4, 5, 6]),
        createIteratorFixture([3, 4, 5, 6, 7, 8]),
        createIteratorFixture([5, 6, 7, 8, 9, 10]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .symmetricDifferenceWith(...iterables)
        .toArray(),
      [1, 3, 2, '3', 9, 10],
    ],
    [
      [
        createIteratorFixture([]),
        createIteratorFixture([2, 3, 4, 5, 6]),
        createIteratorFixture([3, 4, 5, 6, 7]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .unionWith(...iterables)
        .toArray(),
      [2, 3, 4, 5, 6, 7],
    ],
    [
      [
        createIteratorFixture([1, 2, 3, 4, 5]),
        createIteratorFixture([2, 3, 4, 5, 6]),
        createIteratorFixture([3, 4, 5, 6, 7]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .unionWith(...iterables)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      [
        createIteratorFixture([]),
        createIteratorFixture([11, 22]),
        createIteratorFixture(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        createIteratorFixture([1, 2]),
        createIteratorFixture([]),
        createIteratorFixture(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        createIteratorFixture([1, 2, 3]),
        createIteratorFixture([11, 22]),
        createIteratorFixture(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [
        [1, 11, 'a'],
        [1, 11, 'b'],
        [1, 22, 'a'],
        [1, 22, 'b'],
        [2, 11, 'a'],
        [2, 11, 'b'],
        [2, 22, 'a'],
        [2, 22, 'b'],
        [3, 11, 'a'],
        [3, 11, 'b'],
        [3, 22, 'a'],
        [3, 22, 'b'],
      ],
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      'a1b2c3abcd1234',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct()
        .toArray(),
      ['a', '1', 'b', '2', 'c', '3', 'd', '4'],
    ],
    [
      'a1b2c3abcd1234',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct((datum: unknown) => 1)
        .toArray(),
      ['a'],
    ],
    [
      [
        '12345',
        '23456',
        '345678',
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .intersectionWith(...iterables)
        .toArray(),
      ['3', '4', '5'],
    ],
    [
      [
        '12345',
        '23456',
        '345678',
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .symmetricDifferenceWith(...iterables)
        .toArray(),
      ['1', '7', '8'],
    ],
    [
      [
        '12345',
        '23456',
        '345678',
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .unionWith(...iterables)
        .toArray(),
      ['1', '2', '3', '4', '5', '6', '7', '8'],
    ],
    [
      [
        '123',
        'ab',
        '!?',
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [
        ['1', 'a', '!'],
        ['1', 'a', '?'],
        ['1', 'b', '!'],
        ['1', 'b', '?'],
        ['2', 'a', '!'],
        ['2', 'a', '?'],
        ['2', 'b', '!'],
        ['2', 'b', '?'],
        ['3', 'a', '!'],
        ['3', 'a', '?'],
        ['3', 'b', '!'],
        ['3', 'b', '?'],
      ],
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([1, 2, 3, '1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct()
        .toArray(),
      [1, 2, 3, '1', '2', '3'],
    ],
    [
      new Set([1, 2, 3, '1', '2', '3', 1, '1']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct()
        .toArray(),
      [1, 2, 3, '1', '2', '3'],
    ],
    [
      new Set([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct((datum: unknown) => (datum as Record<string, unknown>)['name'] as Comparable)
        .toArray(),
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      [
        new Set([1, 2, 3, 4, 5]),
        new Set([2, 3, 4, 5, 6, 7]),
        new Set(['3', 4, 5, 6, 7, 8, 9]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .intersectionWith(...iterables)
        .toArray(),
      [4, 5],
    ],
    [
      [
        new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        new Set(['1', '2', 3, 4, 5, 6, 7, '8', '9']),
        new Set([1, 3, 5, 7, 9, 11]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .intersectionWith(...iterables)
        .toArray(),
      [3, 5, 7],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set(['a', 'b', 'c']),
        new Set(['1a', '2b', '3c', 'a2', 'a3']),
        new Set(['c3', '1a', 'd4', '2b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .zipWith(iterables.shift() as Iterable<unknown>)
        .map((values) => `${(values as Array<unknown>)[0]}${(values as Array<unknown>)[1]}`)
        .intersectionWith(...iterables)
        .toArray(),
      ['1a', '2b'],
    ],
    [
      [
        new Set([1, 2, 3, 4, 5, 6]),
        new Set([3, 4, 5, 6, 7, 8]),
        new Set([5, 6, 7, 8, 9, 10]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .symmetricDifferenceWith(...iterables)
        .toArray(),
      [1, 2, 9, 10],
    ],
    [
      [
        new Set([1, 2, '3', 4, 5, 6]),
        new Set([3, 4, 5, 6, 7, 8]),
        new Set([5, 6, 7, 8, 9, 10]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .symmetricDifferenceWith(...iterables)
        .toArray(),
      [1, 3, 2, '3', 9, 10],
    ],
    [
      [
        new Set([]),
        new Set([2, 3, 4, 5, 6]),
        new Set([3, 4, 5, 6, 7]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .unionWith(...iterables)
        .toArray(),
      [2, 3, 4, 5, 6, 7],
    ],
    [
      [
        new Set([1, 2, 3, 4, 5]),
        new Set([2, 3, 4, 5, 6]),
        new Set([3, 4, 5, 6, 7]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .unionWith(...iterables)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      [
        new Set([]),
        new Set([11, 22]),
        new Set(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        new Set([1, 2]),
        new Set([]),
        new Set(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        new Set([1, 2, 3]),
        new Set([11, 22]),
        new Set(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [
        [1, 11, 'a'],
        [1, 11, 'b'],
        [1, 22, 'a'],
        [1, 22, 'b'],
        [2, 11, 'a'],
        [2, 11, 'b'],
        [2, 22, 'a'],
        [2, 22, 'b'],
        [3, 11, 'a'],
        [3, 11, 'b'],
        [3, 22, 'a'],
        [3, 22, 'b'],
      ],
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      createMapFixture([1, 2, 3, '1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct()
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, '1'], [4, '2'], [5, '3']],
    ],
    [
      createMapFixture([1, 2, 3, '1', '2', '3', 1, '1']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((datum: unknown) => (datum as [unknown, unknown])[1])
        .distinct()
        .toArray(),
      [1, 2, 3, '1', '2', '3'],
    ],
    [
      createMapFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct((datum: unknown) => (datum as [unknown, Record<string, unknown>])[1]['name'] as Comparable)
        .values()
        .toArray(),
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      [
        createMapFixture([1, 2, 3, 4, 5]),
        [2, 3, 4, 5, 6, 7],
        ['3', 4, 5, 6, 7, 8, 9],
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .map((item) => (item as Array<unknown>)[1])
        .intersectionWith(...iterables)
        .toArray(),
      [4, 5],
    ],
    [
      [
        createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        ['1', '2', 3, 4, 5, 6, 7, '8', '9'],
        [1, 3, 5, 7, 9, 11],
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .map((item) => (item as Array<unknown>)[1])
        .intersectionWith(...iterables)
        .toArray(),
      [3, 5, 7],
    ],
    [
      [
        createMapFixture([1, 2, 3, 4, 5, 6]),
        [3, 4, 5, 6, 7, 8],
        [5, 6, 7, 8, 9, 10],
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .map((item) => (item as Array<unknown>)[1])
        .symmetricDifferenceWith(...iterables)
        .toArray(),
      [1, 2, 9, 10],
    ],
    [
      [
        createMapFixture([1, 2, '3', 4, 5, 6]),
        [3, 4, 5, 6, 7, 8],
        [5, 6, 7, 8, 9, 10],
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .map((item) => (item as Array<unknown>)[1])
        .symmetricDifferenceWith(...iterables)
        .toArray(),
      [1, 3, 2, '3', 9, 10],
    ],
    [
      [
        createMapFixture([]),
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7],
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .map((item) => (item as Array<unknown>)[1])
        .unionWith(...iterables)
        .toArray(),
      [2, 3, 4, 5, 6, 7],
    ],
    [
      [
        createMapFixture([1, 2, 3, 4, 5]),
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7],
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .map((item) => (item as Array<unknown>)[1])
        .unionWith(...iterables)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      [
        createMapFixture([]),
        createMapFixture([11, 22]),
        createMapFixture(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => Stream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        createMapFixture([1, 2]),
        createMapFixture([]),
        createMapFixture(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => Stream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        createMapFixture([1, 2, 3]),
        createMapFixture([11, 22]),
        createMapFixture(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => Stream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [
        [[0, 1], [0, 11], [0, 'a']],
        [[0, 1], [0, 11], [1, 'b']],
        [[0, 1], [1, 22], [0, 'a']],
        [[0, 1], [1, 22], [1, 'b']],
        [[1, 2], [0, 11], [0, 'a']],
        [[1, 2], [0, 11], [1, 'b']],
        [[1, 2], [1, 22], [0, 'a']],
        [[1, 2], [1, 22], [1, 'b']],
        [[2, 3], [0, 11], [0, 'a']],
        [[2, 3], [0, 11], [1, 'b']],
        [[2, 3], [1, 22], [0, 'a']],
        [[2, 3], [1, 22], [1, 'b']],
      ],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([1, 2, 3, '1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct()
        .toArray(),
      [1, 2, 3, '1', '2', '3'],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, '1', '2', '3', 1, '1']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct()
        .toArray(),
      [1, 2, 3, '1', '2', '3'],
    ],
    [
      createAsyncGeneratorFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct((datum: unknown) => (datum as Record<string, unknown>)['name'] as Comparable)
        .toArray(),
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
        createAsyncGeneratorFixture([2, 3, 4, 5, 6, 7]),
        createAsyncGeneratorFixture(['3', 4, 5, 6, 7, 8, 9]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .intersectionWith(...iterables)
        .toArray(),
      [4, 5],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        createAsyncGeneratorFixture(['1', '2', 3, 4, 5, 6, 7, '8', '9']),
        createAsyncGeneratorFixture([1, 3, 5, 7, 9, 11]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .intersectionWith(...iterables)
        .toArray(),
      [3, 5, 7],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture([1, 1, 1]),
        createAsyncGeneratorFixture(['11', '21', '31', '12', '13']),
        createAsyncGeneratorFixture(['13', '11', '14', '21']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .zipWith(iterables.shift() as Iterable<unknown>)
        .map((values) => `${(values as Array<unknown>)[0]}${(values as Array<unknown>)[1]}`)
        .intersectionWith(...iterables)
        .toArray(),
      ['11', '21'],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture(['a', 'b', 'c']),
        createAsyncGeneratorFixture(['1a', '2b', '3c', 'a2', 'a3']),
        createAsyncGeneratorFixture(['c3', '1a', 'd4', '2b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .zipWith(iterables.shift() as Iterable<unknown>)
        .map((values) => `${(values as Array<unknown>)[0]}${(values as Array<unknown>)[1]}`)
        .intersectionWith(...iterables)
        .toArray(),
      ['1a', '2b'],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6]),
        createAsyncGeneratorFixture([3, 4, 5, 6, 7, 8]),
        createAsyncGeneratorFixture([5, 6, 7, 8, 9, 10]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .symmetricDifferenceWith(...iterables)
        .toArray(),
      [1, 2, 9, 10],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, '3', 4, 5, 6]),
        createAsyncGeneratorFixture([3, 4, 5, 6, 7, 8]),
        createAsyncGeneratorFixture([5, 6, 7, 8, 9, 10]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .symmetricDifferenceWith(...iterables)
        .toArray(),
      [1, 3, 2, '3', 9, 10],
    ],
    [
      [
        createAsyncGeneratorFixture([]),
        createAsyncGeneratorFixture([2, 3, 4, 5, 6]),
        createAsyncGeneratorFixture([3, 4, 5, 6, 7]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .unionWith(...iterables)
        .toArray(),
      [2, 3, 4, 5, 6, 7],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
        createAsyncGeneratorFixture([2, 3, 4, 5, 6]),
        createAsyncGeneratorFixture([3, 4, 5, 6, 7]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .unionWith(...iterables)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      [
        createAsyncGeneratorFixture([]),
        createAsyncGeneratorFixture([]),
        createAsyncGeneratorFixture([]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([]),
        createAsyncGeneratorFixture([11, 22]),
        createAsyncGeneratorFixture(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2]),
        createAsyncGeneratorFixture([]),
        createAsyncGeneratorFixture(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3]),
        createAsyncGeneratorFixture([11, 22]),
        createAsyncGeneratorFixture(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [
        [1, 11, 'a'],
        [1, 11, 'b'],
        [1, 22, 'a'],
        [1, 22, 'b'],
        [2, 11, 'a'],
        [2, 11, 'b'],
        [2, 22, 'a'],
        [2, 22, 'b'],
        [3, 11, 'a'],
        [3, 11, 'b'],
        [3, 22, 'a'],
        [3, 22, 'b'],
      ],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<unknown> {
  return [
    [
      createAsyncIterableFixture([1, 2, 3, '1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct()
        .toArray(),
      [1, 2, 3, '1', '2', '3'],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, '1', '2', '3', 1, '1']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct()
        .toArray(),
      [1, 2, 3, '1', '2', '3'],
    ],
    [
      createAsyncIterableFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct((datum: unknown) => (datum as Record<string, unknown>)['name'] as Comparable)
        .toArray(),
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3, 4, 5]),
        createAsyncIterableFixture([2, 3, 4, 5, 6, 7]),
        createAsyncIterableFixture(['3', 4, 5, 6, 7, 8, 9]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .intersectionWith(...iterables)
        .toArray(),
      [4, 5],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        createAsyncIterableFixture(['1', '2', 3, 4, 5, 6, 7, '8', '9']),
        createAsyncIterableFixture([1, 3, 5, 7, 9, 11]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .intersectionWith(...iterables)
        .toArray(),
      [3, 5, 7],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture([1, 1, 1]),
        createAsyncIterableFixture(['11', '21', '31', '12', '13']),
        createAsyncIterableFixture(['13', '11', '14', '21']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .zipWith(iterables.shift() as Iterable<unknown>)
        .map((values) => `${(values as Array<unknown>)[0]}${(values as Array<unknown>)[1]}`)
        .intersectionWith(...iterables)
        .toArray(),
      ['11', '21'],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture(['a', 'b', 'c']),
        createAsyncIterableFixture(['1a', '2b', '3c', 'a2', 'a3']),
        createAsyncIterableFixture(['c3', '1a', 'd4', '2b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .zipWith(iterables.shift() as Iterable<unknown>)
        .map((values) => `${(values as Array<unknown>)[0]}${(values as Array<unknown>)[1]}`)
        .intersectionWith(...iterables)
        .toArray(),
      ['1a', '2b'],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3, 4, 5, 6]),
        createAsyncIterableFixture([3, 4, 5, 6, 7, 8]),
        createAsyncIterableFixture([5, 6, 7, 8, 9, 10]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .symmetricDifferenceWith(...iterables)
        .toArray(),
      [1, 2, 9, 10],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, '3', 4, 5, 6]),
        createAsyncIterableFixture([3, 4, 5, 6, 7, 8]),
        createAsyncIterableFixture([5, 6, 7, 8, 9, 10]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .symmetricDifferenceWith(...iterables)
        .toArray(),
      [1, 3, 2, '3', 9, 10],
    ],
    [
      [
        createAsyncIterableFixture([]),
        createAsyncIterableFixture([2, 3, 4, 5, 6]),
        createAsyncIterableFixture([3, 4, 5, 6, 7]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .unionWith(...iterables)
        .toArray(),
      [2, 3, 4, 5, 6, 7],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3, 4, 5]),
        createAsyncIterableFixture([2, 3, 4, 5, 6]),
        createAsyncIterableFixture([3, 4, 5, 6, 7]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .unionWith(...iterables)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      [
        createAsyncIterableFixture([]),
        createAsyncIterableFixture([]),
        createAsyncIterableFixture([]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        createAsyncIterableFixture([]),
        createAsyncIterableFixture([11, 22]),
        createAsyncIterableFixture(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        createAsyncIterableFixture([1, 2]),
        createAsyncIterableFixture([]),
        createAsyncIterableFixture(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3]),
        createAsyncIterableFixture([11, 22]),
        createAsyncIterableFixture(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [
        [1, 11, 'a'],
        [1, 11, 'b'],
        [1, 22, 'a'],
        [1, 22, 'b'],
        [2, 11, 'a'],
        [2, 11, 'b'],
        [2, 22, 'a'],
        [2, 22, 'b'],
        [3, 11, 'a'],
        [3, 11, 'b'],
        [3, 22, 'a'],
        [3, 22, 'b'],
      ],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<unknown> {
  return [
    [
      createAsyncIteratorFixture([1, 2, 3, '1', '2', '3']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct()
        .toArray(),
      [1, 2, 3, '1', '2', '3'],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, '1', '2', '3', 1, '1']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct()
        .toArray(),
      [1, 2, 3, '1', '2', '3'],
    ],
    [
      createAsyncIteratorFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .distinct((datum: unknown) => (datum as Record<string, unknown>)['name'] as Comparable)
        .toArray(),
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3, 4, 5]),
        createAsyncIteratorFixture([2, 3, 4, 5, 6, 7]),
        createAsyncIteratorFixture(['3', 4, 5, 6, 7, 8, 9]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .intersectionWith(...iterables)
        .toArray(),
      [4, 5],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        createAsyncIteratorFixture(['1', '2', 3, 4, 5, 6, 7, '8', '9']),
        createAsyncIteratorFixture([1, 3, 5, 7, 9, 11]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .intersectionWith(...iterables)
        .toArray(),
      [3, 5, 7],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture([1, 1, 1]),
        createAsyncIteratorFixture(['11', '21', '31', '12', '13']),
        createAsyncIteratorFixture(['13', '11', '14', '21']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .zipWith(iterables.shift() as Iterable<unknown>)
        .map((values) => `${(values as Array<unknown>)[0]}${(values as Array<unknown>)[1]}`)
        .intersectionWith(...iterables)
        .toArray(),
      ['11', '21'],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture(['a', 'b', 'c']),
        createAsyncIteratorFixture(['1a', '2b', '3c', 'a2', 'a3']),
        createAsyncIteratorFixture(['c3', '1a', 'd4', '2b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .zipWith(iterables.shift() as Iterable<unknown>)
        .map((values) => `${(values as Array<unknown>)[0]}${(values as Array<unknown>)[1]}`)
        .intersectionWith(...iterables)
        .toArray(),
      ['1a', '2b'],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3, 4, 5, 6]),
        createAsyncIteratorFixture([3, 4, 5, 6, 7, 8]),
        createAsyncIteratorFixture([5, 6, 7, 8, 9, 10]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .symmetricDifferenceWith(...iterables)
        .toArray(),
      [1, 2, 9, 10],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, '3', 4, 5, 6]),
        createAsyncIteratorFixture([3, 4, 5, 6, 7, 8]),
        createAsyncIteratorFixture([5, 6, 7, 8, 9, 10]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .symmetricDifferenceWith(...iterables)
        .toArray(),
      [1, 3, 2, '3', 9, 10],
    ],
    [
      [
        createAsyncIteratorFixture([]),
        createAsyncIteratorFixture([2, 3, 4, 5, 6]),
        createAsyncIteratorFixture([3, 4, 5, 6, 7]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .unionWith(...iterables)
        .toArray(),
      [2, 3, 4, 5, 6, 7],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3, 4, 5]),
        createAsyncIteratorFixture([2, 3, 4, 5, 6]),
        createAsyncIteratorFixture([3, 4, 5, 6, 7]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .unionWith(...iterables)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      [
        createAsyncIteratorFixture([]),
        createAsyncIteratorFixture([]),
        createAsyncIteratorFixture([]),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        createAsyncIteratorFixture([]),
        createAsyncIteratorFixture([11, 22]),
        createAsyncIteratorFixture(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2]),
        createAsyncIteratorFixture([]),
        createAsyncIteratorFixture(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3]),
        createAsyncIteratorFixture([11, 22]),
        createAsyncIteratorFixture(['a', 'b']),
      ],
      (iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .cartesianProductWith(...iterables)
        .toArray(),
      [
        [1, 11, 'a'],
        [1, 11, 'b'],
        [1, 22, 'a'],
        [1, 22, 'b'],
        [2, 11, 'a'],
        [2, 11, 'b'],
        [2, 22, 'a'],
        [2, 22, 'b'],
        [3, 11, 'a'],
        [3, 11, 'b'],
        [3, 22, 'a'],
        [3, 22, 'b'],
      ],
    ],
  ];
}

function dataProviderForPartialIntersection(): Array<unknown> {
  return [
    [
      [
        [1, 2],
        createAsyncGeneratorFixture([2, 3, 4]),
        [2, 3, 4, 5, 6],
      ],
      1,
      (minIntersectionCount: number, iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .partialIntersectionWith(minIntersectionCount, ...iterables)
        .toArray(),
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [
        new Set([1, 2]),
        createAsyncGeneratorFixture([2, 3, 4]),
        [2, 3, 4, 5, 6],
      ],
      2,
      (minIntersectionCount: number, iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .partialIntersectionWith(minIntersectionCount, ...iterables)
        .toArray(),
      [2, 3, 4],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2]),
        createAsyncIterableFixture([2, 3, 4]),
        [2, 3, 4, 5, 6],
      ],
      3,
      (minIntersectionCount: number, iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .partialIntersectionWith(minIntersectionCount, ...iterables)
        .toArray(),
      [2],
    ],
    [
      [
        '12',
        '234',
        '23456',
      ],
      3,
      (minIntersectionCount: number, iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .partialIntersectionWith(minIntersectionCount, ...iterables)
        .toArray(),
      ['2'],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2]),
        createAsyncIterableFixture([2, '3', 4]),
        [2, 3, 4, 5, 6],
      ],
      1,
      (minIntersectionCount: number, iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .partialIntersectionWith(minIntersectionCount, ...iterables)
        .toArray(),
      [1, 2, '3', 3, 4, 5, 6],
    ],
    [
      [
        [1, 2],
        createAsyncIteratorFixture([2, '3', 4]),
        createAsyncIteratorFixture([2, 3, 4, 5, 6]),
      ],
      2,
      (minIntersectionCount: number, iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .partialIntersectionWith(minIntersectionCount, ...iterables)
        .toArray(),
      [2, 4],
    ],
    [
      [
        new Set([1, 2, 3]),
        createAsyncIteratorFixture([2, '3', 4]),
        [2, 3, 4, 5, 6],
      ],
      3,
      (minIntersectionCount: number, iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .partialIntersectionWith(minIntersectionCount, ...iterables)
        .toArray(),
      [2],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        createAsyncGeneratorFixture(['1', '2', 3, 4, 5, 6, 7, '8', '9']),
        [1, 3, 5, 7, 9, 11],
      ],
      2,
      (minIntersectionCount: number, iterables: Array<Iterable<unknown>>) => AsyncStream.of(iterables.shift() as Iterable<unknown>)
        .partialIntersectionWith(minIntersectionCount, ...iterables)
        .toArray(),
      [1, 3, 4, 5, 6, 7, 9],
    ],
  ];
}
