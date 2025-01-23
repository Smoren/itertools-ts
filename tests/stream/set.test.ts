// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { Stream, Comparable, Numeric } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])(
  "Stream Set Test",
  (input, streamFactory, expected) => {
    it("", () => {
      // Given
      const result = streamFactory(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForPartialIntersection(),
])(
  "Stream Set Partial Intersection Test",
  (input, minIntersectionCount, streamFactory, expected) => {
    it("", () => {
      // Given
      const result = streamFactory(
        minIntersectionCount as number,
        input as Array<Iterable<unknown>>
      );

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays<T>(
  wrapper: (x: Array<any>) => any = (x) => x,
): Array<[unknown, (data: any) => Array<unknown>, Array<unknown>]> {
  return [
    [
      wrapper([1, 2, 3, '1', '2', '3']),
      (iterable: Array<Numeric>) => Stream.of(iterable)
        .distinct()
        .toArray(),
      [1, 2, 3, '1', '2', '3'],
    ],
    [
      wrapper([1, 2, 3, '1', '2', '3', 1, '1']),
      (iterable: Array<Numeric>) => Stream.of(iterable)
        .distinct()
        .toArray(),
      [1, 2, 3, '1', '2', '3'],
    ],
    [
      wrapper([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (iterable: Array<Record<string, string | number>>) => Stream.of(iterable)
        .distinct((datum) => datum['name'])
        .toArray(),
      [
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Jane', 'id': 5 },
      ],
    ],
    [
      [
        wrapper([1, 2, 3, 4, 5]),
        wrapper([2, 3, 4, 5, 6, 7]),
        wrapper(['3', 4, 5, 6, 7, 8, 9]),
      ],
      (iterables: Array<Array<Numeric>>) => Stream.of(iterables.shift()!)
        .intersectionWith(...iterables)
        .toArray(),
      [4, 5],
    ],
    [
      [
        wrapper([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        wrapper(['1', '2', 3, 4, 5, 6, 7, '8', '9']),
        wrapper([1, 3, 5, 7, 9, 11]),
      ],
      (iterables: Array<Array<Numeric>>) => Stream.of(iterables.shift()!)
        .intersectionWith(...iterables)
        .toArray(),
      [3, 5, 7],
    ],
    [
      [
        wrapper([1, 2, 3]),
        wrapper([1, 1, 1]),
        wrapper(['11', '21', '31', '12', '13']),
        wrapper(['13', '11', '14', '21']),
      ],
      (iterables: Array<Array<Numeric>>) => Stream.of(iterables.shift()!)
        .zipWith(iterables.shift()!)
        .map((values) => `${values[0]}${values[1]}`)
        .intersectionWith(...iterables as Array<Iterable<string>>)
        .toArray(),
      ['11', '21'],
    ],
    [
      [
        wrapper([1, 2, 3]),
        wrapper(['a', 'b', 'c']),
        wrapper(['1a', '2b', '3c', 'a2', 'a3']),
        wrapper(['c3', '1a', 'd4', '2b']),
      ],
      (iterables: Array<Array<number | string>>) => Stream.of(iterables.shift()!)
        .zipWith(iterables.shift()!)
        .map((values) => `${values[0]}${values[1]}`)
        .intersectionWith(...iterables as Array<Iterable<string>>)
        .toArray(),
      ['1a', '2b'],
    ],
    [
      [
        wrapper([1, 2, 3, 4, 5, 6]),
        wrapper([3, 4, 5, 6, 7, 8]),
        wrapper([5, 6, 7, 8, 9, 10]),
      ],
      (iterables: Array<Array<number>>) => Stream.of(iterables.shift()!)
        .symmetricDifferenceWith(...iterables)
        .toArray(),
      [1, 2, 9, 10],
    ],
    [
      [
        wrapper([1, 2, '3', 4, 5, 6]),
        wrapper([3, 4, 5, 6, 7, 8]),
        wrapper([5, 6, 7, 8, 9, 10]),
      ],
      (iterables: Array<Array<Numeric>>) => Stream.of(iterables.shift()!)
        .symmetricDifferenceWith(...iterables)
        .toArray(),
      [1, 3, 2, '3', 9, 10],
    ],
    [
      [
        wrapper([]),
        wrapper([2, 3, 4, 5, 6]),
        wrapper([3, 4, 5, 6, 7]),
      ],
      (iterables: Array<Array<number>>) => Stream.of(iterables.shift()!)
        .unionWith(...iterables)
        .toArray(),
      [2, 3, 4, 5, 6, 7],
    ],
    [
      [
        wrapper([1, 2, 3, 4, 5]),
        wrapper([2, 3, 4, 5, 6]),
        wrapper([3, 4, 5, 6, 7]),
      ],
      (iterables: Array<Array<number>>) => Stream.of(iterables.shift()!)
        .unionWith(...iterables)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      [
        wrapper([]),
        wrapper([]),
        wrapper([]),
      ],
      (iterables: Array<Array<number>>) => Stream.of(iterables.shift()!)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        wrapper([]),
        wrapper([11, 22]),
        wrapper(['a', 'b']),
      ],
      (iterables: Array<Array<number | string>>) => Stream.of(iterables.shift()!)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        wrapper([1, 2]),
        wrapper([]),
        wrapper(['a', 'b']),
      ],
      (iterables: Array<Array<number | string>>) => Stream.of(iterables.shift()!)
        .cartesianProductWith(...iterables)
        .toArray(),
      [],
    ],
    [
      [
        wrapper([1, 2, 3]),
        wrapper([11, 22]),
        wrapper(['a', 'b']),
      ],
      (iterables: Array<Array<number | string>>) => Stream.of(iterables.shift()!)
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

function dataProviderForGenerators(): Array<[unknown, (data: any) => Array<unknown>, Array<unknown>]> {
  return dataProviderForArrays((x) => createGeneratorFixture(x)) as any;
}

function dataProviderForIterables(): Array<[unknown, (data: any) => Array<unknown>, Array<unknown>]> {
  return dataProviderForArrays((x) => createIterableFixture(x)) as any;
}

function dataProviderForIterators(): Array<[unknown, (data: any) => Array<unknown>, Array<unknown>]> {
  return dataProviderForArrays((x) => createIteratorFixture(x)) as any;
}

function dataProviderForStrings(): Array<[unknown, (data: any) => Array<unknown>, Array<unknown>]> {
  return [
    [
      'a1b2c3abcd1234',
      (iterable: string) => Stream.of(iterable)
        .distinct()
        .toArray(),
      ['a', '1', 'b', '2', 'c', '3', 'd', '4'],
    ],
    [
      'a1b2c3abcd1234',
      (iterable: string) => Stream.of(iterable)
        .distinct(() => 1)
        .toArray(),
      ['a'],
    ],
    [
      [
        '12345',
        '23456',
        '345678',
      ],
      (iterables: Array<string>) => Stream.of(iterables.shift()!)
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
      (iterables: Array<string>) => Stream.of(iterables.shift()!)
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
      (iterables: Array<string>) => Stream.of(iterables.shift()!)
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
      (iterables: Array<string>) => Stream.of(iterables.shift()!)
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

function dataProviderForSets(): Array<[unknown, (data: any) => Array<unknown>, Array<unknown>]> {
  return [
    [
      new Set([1, 2, 3, '1', '2', '3']),
      (iterable: Set<Numeric>) => Stream.of(iterable)
        .distinct()
        .toArray(),
      [1, 2, 3, '1', '2', '3'],
    ],
    [
      new Set([1, 2, 3, '1', '2', '3', 1, '1']),
      (iterable: Set<Numeric>) => Stream.of(iterable)
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
      (iterable: Set<Record<string, unknown>>) => Stream.of(iterable)
        .distinct((datum) => datum['name'] as Comparable)
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
      (iterables: Array<Set<Numeric>>) => Stream.of(iterables.shift()!)
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
      (iterables: Array<Set<Numeric>>) => Stream.of(iterables.shift()!)
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
      (iterables: Array<Set<number | string>>) => Stream.of(iterables.shift()!)
        .zipWith(iterables.shift() as Iterable<unknown>)
        .map((values) => `${(values as Array<unknown>)[0]}${(values as Array<unknown>)[1]}`)
        .intersectionWith(...iterables as Set<string>[])
        .toArray(),
      ['1a', '2b'],
    ],
    [
      [
        new Set([1, 2, 3, 4, 5, 6]),
        new Set([3, 4, 5, 6, 7, 8]),
        new Set([5, 6, 7, 8, 9, 10]),
      ],
      (iterables: Array<Iterable<Set<number>>>) => Stream.of(iterables.shift()!)
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
      (iterables: Array<Set<Numeric>>) => Stream.of(iterables.shift()!)
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
      (iterables: Array<Set<number>>) => Stream.of(iterables.shift()!)
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
      (iterables: Array<Set<number>>) => Stream.of(iterables.shift()!)
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
      (iterables: Array<Set<number | string>>) => Stream.of(iterables.shift()!)
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
      (iterables: Array<Set<number | string>>) => Stream.of(iterables.shift()!)
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
      (iterables: Array<Set<number | string>>) => Stream.of(iterables.shift()!)
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

function dataProviderForMaps(): Array<[unknown, (data: any) => Array<unknown>, Array<unknown>]> {
  return [
    [
      createMapFixture([1, 2, 3, '1', '2', '3']),
      (iterable: Map<string, Numeric>) => Stream.of(iterable)
        .distinct()
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, '1'], [4, '2'], [5, '3']],
    ],
    [
      createMapFixture([1, 2, 3, '1', '2', '3', 1, '1']),
      (iterable: Map<string, Numeric>) => Stream.of(iterable)
        .distinct()
        .toArray(),
      [[0, 1], [1, 2], [2, 3], [3, '1'], [4, '2'], [5, '3']],
    ],
    [
      createMapFixture([
        { 'name': 'John', 'id': 1 },
        { 'name': 'Mary', 'id': 2 },
        { 'name': 'Mary', 'id': 3 },
        { 'name': 'John', 'id': 4 },
        { 'name': 'Jane', 'id': 5 },
      ]),
      (iterable: Map<string, Record<string, string | number>>) => Stream.of(iterable)
        .distinct((datum) => datum[1]['name'])
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
      (iterables: Array<unknown>) => Stream.of(iterables.shift() as Map<unknown, Numeric>)
        .map((item) => item[1])
        .intersectionWith(...iterables as Array<Iterable<Numeric>>)
        .toArray(),
      [4, 5],
    ],
    [
      [
        createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        ['1', '2', 3, 4, 5, 6, 7, '8', '9'],
        [1, 3, 5, 7, 9, 11],
      ],
      (iterables: Array<Iterable<unknown>>) => Stream.of(iterables.shift() as Map<unknown, Numeric>)
        .map((item) => item[1])
        .intersectionWith(...iterables as Array<Iterable<Numeric>>)
        .toArray(),
      [3, 5, 7],
    ],
    [
      [
        createMapFixture([1, 2, 3, 4, 5, 6]),
        [3, 4, 5, 6, 7, 8],
        [5, 6, 7, 8, 9, 10],
      ],
      (iterables: Array<Iterable<unknown>>) => Stream.of(iterables.shift() as Map<unknown, Numeric>)
        .map((item) => item[1])
        .symmetricDifferenceWith(...iterables as Array<Iterable<Numeric>>)
        .toArray(),
      [1, 2, 9, 10],
    ],
    [
      [
        createMapFixture([1, 2, '3', 4, 5, 6]),
        [3, 4, 5, 6, 7, 8],
        [5, 6, 7, 8, 9, 10],
      ],
      (iterables: Array<Iterable<unknown>>) => Stream.of(iterables.shift() as Map<unknown, Numeric>)
        .map((item) => item[1])
        .symmetricDifferenceWith(...iterables as Array<Iterable<Numeric>>)
        .toArray(),
      [1, 3, 2, '3', 9, 10],
    ],
    [
      [
        createMapFixture([]),
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7],
      ],
      (iterables: Array<Iterable<unknown>>) => Stream.of(iterables.shift() as Map<unknown, Numeric>)
        .map((item) => item[1])
        .unionWith(...iterables as Array<Iterable<Numeric>>)
        .toArray(),
      [2, 3, 4, 5, 6, 7],
    ],
    [
      [
        createMapFixture([1, 2, 3, 4, 5]),
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7],
      ],
      (iterables: Array<Iterable<unknown>>) => Stream.of(iterables.shift() as Map<unknown, Numeric>)
        .map((item) => item[1])
        .unionWith(...iterables as Array<Iterable<Numeric>>)
        .toArray(),
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      [
        createMapFixture([]),
        createMapFixture([11, 22]),
        createMapFixture(['a', 'b']),
      ],
      (iterables: Array<Map<string, string | number>>) => Stream.of(iterables.shift()!)
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
      (iterables: Array<Map<string, string | number>>) => Stream.of(iterables.shift()!)
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
      (iterables: Array<Map<string, string | number>>) => Stream.of(iterables.shift()!)
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

function dataProviderForPartialIntersection(): Array<[Array<Iterable<unknown> | Iterator<unknown>>, number, (minIntersectionCount: number, iterables: Array<Iterable<unknown>>) => Array<unknown>, Array<unknown>]> {
  return [
    [
      [
        [1, 2],
        createGeneratorFixture([2, 3, 4]),
        [2, 3, 4, 5, 6],
      ],
      1,
      (minIntersectionCount, iterables) => Stream.of(iterables.shift()!)
        .partialIntersectionWith(minIntersectionCount, ...iterables)
        .toArray(),
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [
        new Set([1, 2]),
        createGeneratorFixture([2, 3, 4]),
        [2, 3, 4, 5, 6],
      ],
      2,
      (minIntersectionCount, iterables) => Stream.of(iterables.shift()!)
        .partialIntersectionWith(minIntersectionCount, ...iterables)
        .toArray(),
      [2, 3, 4],
    ],
    [
      [
        createGeneratorFixture([1, 2]),
        createIterableFixture([2, 3, 4]),
        [2, 3, 4, 5, 6],
      ],
      3,
      (minIntersectionCount, iterables) => Stream.of(iterables.shift()!)
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
      (minIntersectionCount: number, iterables: Array<Iterable<unknown>>) => Stream.of(iterables.shift()!)
        .partialIntersectionWith(minIntersectionCount, ...iterables)
        .toArray(),
      ['2'],
    ],
    [
      [
        createIteratorFixture([1, 2]),
        createIterableFixture([2, '3', 4]),
        [2, 3, 4, 5, 6],
      ],
      1,
      (minIntersectionCount: number, iterables: Array<Iterable<unknown>>) => Stream.of(iterables.shift()!)
        .partialIntersectionWith(minIntersectionCount, ...iterables)
        .toArray(),
      [1, 2, '3', 3, 4, 5, 6],
    ],
    [
      [
        [1, 2],
        createIteratorFixture([2, '3', 4]),
        createIteratorFixture([2, 3, 4, 5, 6]),
      ],
      2,
      (minIntersectionCount: number, iterables: Array<Iterable<unknown>>) => Stream.of(iterables.shift()!)
        .partialIntersectionWith(minIntersectionCount, ...iterables)
        .toArray(),
      [2, 4],
    ],
    [
      [
        new Set([1, 2, 3]),
        createIteratorFixture([2, '3', 4]),
        [2, 3, 4, 5, 6],
      ],
      3,
      (minIntersectionCount: number, iterables: Array<Iterable<unknown>>) => Stream.of(iterables.shift()!)
        .partialIntersectionWith(minIntersectionCount, ...iterables)
        .toArray(),
      [2],
    ],
    [
      [
        createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        createGeneratorFixture(['1', '2', 3, 4, 5, 6, 7, '8', '9']),
        [1, 3, 5, 7, 9, 11],
      ],
      2,
      (minIntersectionCount: number, iterables: Array<Iterable<unknown>>) => Stream.of(iterables.shift()!)
        .partialIntersectionWith(minIntersectionCount, ...iterables)
        .toArray(),
      [1, 3, 4, 5, 6, 7, 9],
    ],
  ];
}
