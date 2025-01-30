// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { Stream } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])(
  "Stream Combinatorics Test",
  (input, streamFactory, expected) => {
    it("", () => {
      // Given
      const result = streamFactory(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(
  wrapper: (x: Array<any>) => any = (x) => x,
): Array<[unknown, (data: any) => Array<unknown>, Array<unknown>]> {
  return [
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
    [
      ['apple', 'banana', 'cherry'],
      (iterable: Array<string>) => Stream.of(iterable)
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
      [1, 2, 3],
      (input: Iterable<string> | Iterator<string>) => Stream.of(input)
        .permutations(2)
        .toArray(),
      [[1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 2]],
    ],
    [
      [1, 2, 3],
      (input: Iterable<string> | Iterator<string>) => Stream.of(input)
        .permutations(3)
        .toArray(),
      [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]],
    ],
    [
      [1, 2, 3],
      (input: Iterable<string> | Iterator<string>) => Stream.of(input)
        .permutations(0)
        .toArray(),
      [[]],
    ],
    [
      [1, 1, 2],
      (input: Iterable<string> | Iterator<string>) => Stream.of(input)
        .permutations(2)
        .toArray(),
      [[1, 1], [1, 2], [1, 1], [1, 2], [2, 1], [2, 1]],
    ],
    [
      ['apple', 'banana', 'cherry'],
      (iterable: Array<string>) => Stream.of(iterable)
        .combinations(2)
        .toArray(),
      [
        ['apple', 'banana'],
        ['apple', 'cherry'],
        ['banana', 'cherry'],
      ],
    ],
    [
      [1, 2, 3],
      (input: Iterable<string> | Iterator<string>) => Stream.of(input)
        .combinations(2)
        .toArray(),
      [[1, 2], [1, 3], [2, 3]],
    ],
    [
      [1, 2, 3],
      (input: Iterable<string> | Iterator<string>) => Stream.of(input)
        .combinations(3)
        .toArray(),
      [[1, 2, 3]],
    ],
    [
      [1, 2, 3],
      (input: Iterable<string> | Iterator<string>) => Stream.of(input)
        .combinations(0)
        .toArray(),
      [[]],
    ],
    [
      [1, 1, 2],
      (input: Iterable<string> | Iterator<string>) => Stream.of(input)
        .combinations(2)
        .toArray(),
      [[1, 1], [1, 2], [1, 2]],
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
    [
      'abc',
      (input: string) => Stream.of(input)
        .permutations(2)
        .toArray(),
      [['a', 'b'], ['a', 'c'], ['b', 'a'], ['b', 'c'], ['c', 'a'], ['c', 'b']],
    ],
    [
      '123',
      (input: string) => Stream.of(input)
        .permutations(2)
        .toArray(),
      [['1', '2'], ['1', '3'], ['2', '1'], ['2', '3'], ['3', '1'], ['3', '2']],
    ],
    [
      '123',
      (input: string) => Stream.of(input)
        .permutations(3)
        .toArray(),
      [['1', '2', '3'], ['1', '3', '2'], ['2', '1', '3'], ['2', '3', '1'], ['3', '1', '2'], ['3', '2', '1']],
    ],
    [
      '123',
      (input: string) => Stream.of(input)
        .permutations(0)
        .toArray(),
      [[]],
    ],
    [
      '112',
      (input: string) => Stream.of(input)
        .permutations(2)
        .toArray(),
      [['1', '1'], ['1', '2'], ['1', '1'], ['1', '2'], ['2', '1'], ['2', '1']],
    ],


    [
      'abc',
      (input: string) => Stream.of(input)
        .combinations(2)
        .toArray(),
      [['a', 'b'], ['a', 'c'], ['b', 'c']],
    ],
    [
      '123',
      (input: string) => Stream.of(input)
        .combinations(2)
        .toArray(),
      [['1', '2'], ['1', '3'], ['2', '3']],
    ],
    [
      '123',
      (input: string) => Stream.of(input)
        .combinations(3)
        .toArray(),
      [['1', '2', '3']],
    ],
    [
      '123',
      (input: string) => Stream.of(input)
        .combinations(0)
        .toArray(),
      [[]],
    ],
    [
      '112',
      (input: string) => Stream.of(input)
        .combinations(2)
        .toArray(),
      [['1', '1'], ['1', '2'], ['1', '2']],
    ],
  ];
}

function dataProviderForSets(): Array<[unknown, (data: any) => Array<unknown>, Array<unknown>]> {
  return [
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
    [
      new Set(['apple', 'banana', 'cherry']),
      (input: Array<string>) => Stream.of(input)
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
      (input: Set<string>) => Stream.of(input)
        .permutations(2)
        .toArray(),
      [[1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 2]],
    ],
    [
      new Set([1, 2, 3]),
      (input: Set<string>) => Stream.of(input)
        .permutations(3)
        .toArray(),
      [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]],
    ],
    [
      new Set([1, 2, 3]),
      (input: Set<string>) => Stream.of(input)
        .permutations(0)
        .toArray(),
      [[]],
    ],
    [
      new Set(['apple', 'banana', 'cherry']),
      (input: Array<string>) => Stream.of(input)
        .combinations(2)
        .toArray(),
      [
        ['apple', 'banana'],
        ['apple', 'cherry'],
        ['banana', 'cherry'],
      ],
    ],
    [
      new Set([1, 2, 3]),
      (input: Set<string>) => Stream.of(input)
        .combinations(2)
        .toArray(),
      [[1, 2], [1, 3], [2, 3]],
    ],
    [
      new Set([1, 2, 3]),
      (input: Set<string>) => Stream.of(input)
        .combinations(3)
        .toArray(),
      [[1, 2, 3]],
    ],
    [
      new Set([1, 2, 3]),
      (input: Set<string>) => Stream.of(input)
        .combinations(0)
        .toArray(),
      [[]],
    ],
  ];
}

function dataProviderForMaps(): Array<[unknown, (data: any) => Array<unknown>, Array<unknown>]> {
  return [
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
    [
      createMapFixture(['apple', 'banana', 'cherry']),
      (iterable: Array<string>) => Stream.of(iterable)
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
      (input: Iterable<string> | Iterator<string>) => Stream.of(input)
        .permutations(2)
        .toArray(),
      [[[0, 1], [1, 2]], [[0, 1], [2, 3]], [[1, 2], [0, 1]], [[1, 2], [2, 3]], [[2, 3], [0, 1]], [[2, 3], [1, 2]]],
    ],
    [
      createMapFixture([1, 2, 3]),
      (input: Iterable<string> | Iterator<string>) => Stream.of(input)
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
      (input: Iterable<string> | Iterator<string>) => Stream.of(input)
        .permutations(0)
        .toArray(),
      [[]],
    ],
    [
      createMapFixture([1, 1, 2]),
      (input: Iterable<string> | Iterator<string>) => Stream.of(input)
        .permutations(2)
        .toArray(),
      [[[0, 1], [1, 1]], [[0, 1], [2, 2]], [[1, 1], [0, 1]], [[1, 1], [2, 2]], [[2, 2], [0, 1]], [[2, 2], [1, 1]]],
    ],
    [
      createMapFixture(['apple', 'banana', 'cherry']),
      (iterable: Array<string>) => Stream.of(iterable)
        .combinations(2)
        .toArray(),
      [
        [[0, 'apple'], [1, 'banana']],
        [[0, 'apple'], [2, 'cherry']],
        [[1, 'banana'], [2, 'cherry']],
      ],
    ],
    [
      createMapFixture([1, 2, 3]),
      (input: Iterable<string> | Iterator<string>) => Stream.of(input)
        .combinations(2)
        .toArray(),
      [[[0, 1], [1, 2]], [[0, 1], [2, 3]], [[1, 2], [2, 3]]],
    ],
    [
      createMapFixture([1, 2, 3]),
      (input: Iterable<string> | Iterator<string>) => Stream.of(input)
        .combinations(3)
        .toArray(),
      [
        [[0, 1], [1, 2], [2, 3]],
      ],
    ],
    [
      createMapFixture([1, 2, 3]),
      (input: Iterable<string> | Iterator<string>) => Stream.of(input)
        .combinations(0)
        .toArray(),
      [[]],
    ],
    [
      createMapFixture([1, 1, 2]),
      (input: Iterable<string> | Iterator<string>) => Stream.of(input)
        .combinations(2)
        .toArray(),
      [[[0, 1], [1, 1]], [[0, 1], [2, 2]], [[1, 1], [2, 2]]],
    ],
  ];
}
