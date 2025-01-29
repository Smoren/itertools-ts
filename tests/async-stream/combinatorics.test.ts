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
import { AsyncStream, Numeric } from '../../src';

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
  "AsyncStream Combinatorics Test",
  (input, streamFactory, expected) => {
    it("", async () => {
      // Given
      const result = await streamFactory(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(
  wrapper: (x: Array<any>) => any = (x) => x,
): Array<[unknown, (data: any) => Promise<Array<unknown>>, Array<unknown>]> {
  return [
    [
      [
        wrapper([]),
        wrapper([]),
        wrapper([]),
      ],
      (iterables: Array<Array<number>>) => AsyncStream.of(iterables.shift()!)
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
      (iterables: Array<Array<number | string>>) => AsyncStream.of(iterables.shift()!)
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
      (iterables: Array<Array<number | string>>) => AsyncStream.of(iterables.shift()!)
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
      (iterables: Array<Array<number | string>>) => AsyncStream.of(iterables.shift()!)
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
    [
      wrapper(['apple', 'banana', 'cherry']),
      (iterable: Array<string>) => AsyncStream.of(iterable)
        .permutations(2)
        .toArray(),
      [
        ['apple', 'banana'],
        ['apple', 'cherry'],
        ['banana', 'apple'],
        ['banana', 'cherry'],
        ['cherry', 'apple'],
        ['cherry', 'banana'],
      ],
    ],
    [
      wrapper([1, 2, 3]),
      (input: Iterable<string> | Iterator<string>) => AsyncStream.of(input)
        .permutations(2)
        .toArray(),
      [[1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 2]],
    ],
    [
      wrapper([1, 2, 3]),
      (input: Iterable<string> | Iterator<string>) => AsyncStream.of(input)
        .permutations(3)
        .toArray(),
      [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]],
    ],
    [
      wrapper([1, 2, 3]),
      (input: Iterable<string> | Iterator<string>) => AsyncStream.of(input)
        .permutations(0)
        .toArray(),
      [[]],
    ],
    [
      wrapper([1, 1, 2]),
      (input: Iterable<string> | Iterator<string>) => AsyncStream.of(input)
        .permutations(2)
        .toArray(),
      [[1, 1], [1, 2], [1, 1], [1, 2], [2, 1], [2, 1]],
    ],
  ];
}

function dataProviderForGenerators(): Array<[unknown, (data: any) => Promise<Array<unknown>>, Array<unknown>]> {
  return dataProviderForArrays((x) => createGeneratorFixture(x)) as any;
}

function dataProviderForIterables(): Array<[unknown, (data: any) => Promise<Array<unknown>>, Array<unknown>]> {
  return dataProviderForArrays((x) => createIterableFixture(x)) as any;
}

function dataProviderForIterators(): Array<[unknown, (data: any) => Promise<Array<unknown>>, Array<unknown>]> {
  return dataProviderForArrays((x) => createIteratorFixture(x)) as any;
}

function dataProviderForStrings(): Array<[unknown, (data: any) => Promise<Array<unknown>>, Array<unknown>]> {
  return [
    [
      [
        '123',
        'ab',
        '!?',
      ],
      (iterables: Array<string>) => AsyncStream.of(iterables.shift()!)
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
    [
      'abc',
      (input: string) => AsyncStream.of(input)
        .permutations(2)
        .toArray(),
      [['a', 'b'], ['a', 'c'], ['b', 'a'], ['b', 'c'], ['c', 'a'], ['c', 'b']],
    ],
    [
      '123',
      (input: string) => AsyncStream.of(input)
        .permutations(2)
        .toArray(),
      [['1', '2'], ['1', '3'], ['2', '1'], ['2', '3'], ['3', '1'], ['3', '2']],
    ],
    [
      '123',
      (input: string) => AsyncStream.of(input)
        .permutations(3)
        .toArray(),
      [['1', '2', '3'], ['1', '3', '2'], ['2', '1', '3'], ['2', '3', '1'], ['3', '1', '2'], ['3', '2', '1']],
    ],
    [
      '123',
      (input: string) => AsyncStream.of(input)
        .permutations(0)
        .toArray(),
      [[]],
    ],
    [
      '112',
      (input: string) => AsyncStream.of(input)
        .permutations(2)
        .toArray(),
      [['1', '1'], ['1', '2'], ['1', '1'], ['1', '2'], ['2', '1'], ['2', '1']],
    ],
  ];
}

function dataProviderForSets(): Array<[unknown, (data: any) => Promise<Array<unknown>>, Array<unknown>]> {
  return [
    [
      [
        new Set([]),
        new Set([11, 22]),
        new Set(['a', 'b']),
      ],
      (iterables: Array<Set<number | string>>) => AsyncStream.of(iterables.shift()!)
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
      (iterables: Array<Set<number | string>>) => AsyncStream.of(iterables.shift()!)
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
      (iterables: Array<Set<number | string>>) => AsyncStream.of(iterables.shift()!)
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
    [
      new Set(['apple', 'banana', 'cherry']),
      (input: Array<string>) => AsyncStream.of(input)
        .permutations(2)
        .toArray(),
      [
        ['apple', 'banana'],
        ['apple', 'cherry'],
        ['banana', 'apple'],
        ['banana', 'cherry'],
        ['cherry', 'apple'],
        ['cherry', 'banana'],
      ],
    ],
    [
      new Set([1, 2, 3]),
      (input: Set<string>) => AsyncStream.of(input)
        .permutations(2)
        .toArray(),
      [[1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 2]],
    ],
    [
      new Set([1, 2, 3]),
      (input: Set<string>) => AsyncStream.of(input)
        .permutations(3)
        .toArray(),
      [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]],
    ],
    [
      new Set([1, 2, 3]),
      (input: Set<string>) => AsyncStream.of(input)
        .permutations(0)
        .toArray(),
      [[]],
    ],
  ];
}

function dataProviderForMaps(): Array<[unknown, (data: any) => Promise<Array<unknown>>, Array<unknown>]> {
  return [
    [
      [
        createMapFixture([]),
        createMapFixture([11, 22]),
        createMapFixture(['a', 'b']),
      ],
      (iterables: Array<Map<string, string | number>>) => AsyncStream.of(iterables.shift()!)
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
      (iterables: Array<Map<string, string | number>>) => AsyncStream.of(iterables.shift()!)
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
      (iterables: Array<Map<string, string | number>>) => AsyncStream.of(iterables.shift()!)
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
    [
      createMapFixture(['apple', 'banana', 'cherry']),
      (iterable: Array<string>) => AsyncStream.of(iterable)
        .permutations(2)
        .toArray(),
      [
        [[0, 'apple'], [1, 'banana']],
        [[0, 'apple'], [2, 'cherry']],
        [[1, 'banana'], [0, 'apple']],
        [[1, 'banana'], [2, 'cherry']],
        [[2, 'cherry'], [0, 'apple']],
        [[2, 'cherry'], [1, 'banana']],
      ],
    ],
    [
      createMapFixture([1, 2, 3]),
      (input: Iterable<string> | Iterator<string>) => AsyncStream.of(input)
        .permutations(2)
        .toArray(),
      [[[0, 1], [1, 2]], [[0, 1], [2, 3]], [[1, 2], [0, 1]], [[1, 2], [2, 3]], [[2, 3], [0, 1]], [[2, 3], [1, 2]]],
    ],
    [
      createMapFixture([1, 2, 3]),
      (input: Iterable<string> | Iterator<string>) => AsyncStream.of(input)
        .permutations(3)
        .toArray(),
      [
        [[0, 1], [1, 2], [2, 3]],
        [[0, 1], [2, 3], [1, 2]],
        [[1, 2], [0, 1], [2, 3]],
        [[1, 2], [2, 3], [0, 1]],
        [[2, 3], [0, 1], [1, 2]],
        [[2, 3], [1, 2], [0, 1]],
      ],
    ],
    [
      createMapFixture([1, 2, 3]),
      (input: Iterable<string> | Iterator<string>) => AsyncStream.of(input)
        .permutations(0)
        .toArray(),
      [[]],
    ],
    [
      createMapFixture([1, 1, 2]),
      (input: Iterable<string> | Iterator<string>) => AsyncStream.of(input)
        .permutations(2)
        .toArray(),
      [[[0, 1], [1, 1]], [[0, 1], [2, 2]], [[1, 1], [0, 1]], [[1, 1], [2, 2]], [[2, 2], [0, 1]], [[2, 2], [1, 1]]],
    ],
  ];
}

function dataProviderForAsync(
  wrapper: (x: Array<any>) => any = (x) => x,
): Array<[unknown, (data: any) => Promise<Array<unknown>>, Array<unknown>]> {
  return [
    [
      [
        wrapper([]),
        wrapper([]),
        wrapper([]),
      ],
      (iterables: Array<Iterable<number>>): Promise<number[][]> => AsyncStream.of(iterables.shift()!)
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
      (iterables: Array<Iterable<unknown>>): Promise<unknown[][]> => AsyncStream.of(iterables.shift()!)
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
      (iterables: Array<Iterable<unknown>>): Promise<unknown[][]> => AsyncStream.of(iterables.shift()!)
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
      (iterables: Array<Iterable<unknown>>): Promise<unknown[][]> => AsyncStream.of(iterables.shift()!)
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
    [
      wrapper(['apple', 'banana', 'cherry']),
      (iterable: Array<string>) => AsyncStream.of(iterable)
        .permutations(2)
        .toArray(),
      [
        ['apple', 'banana'],
        ['apple', 'cherry'],
        ['banana', 'apple'],
        ['banana', 'cherry'],
        ['cherry', 'apple'],
        ['cherry', 'banana'],
      ],
    ],
    [
      wrapper([1, 2, 3]),
      (input: Iterable<string> | Iterator<string>) => AsyncStream.of(input)
        .permutations(2)
        .toArray(),
      [[1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 2]],
    ],
    [
      wrapper([1, 2, 3]),
      (input: Iterable<string> | Iterator<string>) => AsyncStream.of(input)
        .permutations(3)
        .toArray(),
      [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]],
    ],
    [
      wrapper([1, 2, 3]),
      (input: Iterable<string> | Iterator<string>) => AsyncStream.of(input)
        .permutations(0)
        .toArray(),
      [[]],
    ],
    [
      wrapper([1, 1, 2]),
      (input: Iterable<string> | Iterator<string>) => AsyncStream.of(input)
        .permutations(2)
        .toArray(),
      [[1, 1], [1, 2], [1, 1], [1, 2], [2, 1], [2, 1]],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[unknown, (data: any) => Promise<Array<unknown>>, Array<unknown>]> {
  return dataProviderForAsync((x) => createAsyncGeneratorFixture(x)) as any;
}

function dataProviderForAsyncIterables(): Array<[unknown, (data: any) => Promise<Array<unknown>>, Array<unknown>]> {
  return dataProviderForAsync((x) => createAsyncIterableFixture(x)) as any;
}

function dataProviderForAsyncIterators(): Array<[unknown, (data: any) => Promise<Array<unknown>>, Array<unknown>]> {
  return dataProviderForAsync((x) => createAsyncIteratorFixture(x)) as any;
}
