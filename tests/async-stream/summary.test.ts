import { AsyncStream, Numeric } from '../../src';
import {
  asyncTimeout,
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture,
} from "../fixture";
import { describe, expect, it } from '@jest/globals';

describe.each([
  ...dataProviderForAsyncGeneratorsTrue(),
  ...dataProviderForAsyncIterablesTrue(),
  ...dataProviderForAsyncIteratorsTrue(),
  ...dataProviderForArraysTrue(),
  ...dataProviderForGeneratorsTrue(),
  ...dataProviderForIterablesTrue(),
  ...dataProviderForIteratorsTrue(),
  ...dataProviderForStringsTrue(),
  ...dataProviderForSetsTrue(),
  ...dataProviderForMapsTrue(),
])(
  "AsyncStream Summary Test True",
  (input, streamFactory) => {
    it("", async () => {
      // Given
      const result = await streamFactory(input as any);

      // Then
      expect(result).toBeTruthy();
    });
  }
);

describe.each([
  ...dataProviderForAsyncIterablesFalse(),
  ...dataProviderForAsyncIteratorsFalse(),
  ...dataProviderForAsyncGeneratorsFalse(),
  ...dataProviderForArraysFalse(),
  ...dataProviderForGeneratorsFalse(),
  ...dataProviderForIterablesFalse(),
  ...dataProviderForIteratorsFalse(),
  ...dataProviderForStringsFalse(),
  ...dataProviderForSetsFalse(),
  ...dataProviderForMapsFalse(),
])(
  "AsyncStream Summary Test False",
  (input, streamFactory) => {
    it("", async () => {
      // Given
      const result = await streamFactory(input as any);

      // Then
      expect(result).toBeFalsy();
    });
  }
);

function dataProviderForArraysTrue(): Array<[Array<any>, (iterable: Array<any>) => Promise<boolean>]> {
  return [
    [
      [],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .allMatch((x) => x > 0),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .allMatch((x) => x > 0),
    ],
    [
      [],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      [],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .allEqual(),
    ],
    [
      [1, 1, 1],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .allEqual(),
    ],
    [
      [1, '1', true, [1], [1]],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .anyMatch((x) => x === 3),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .anyMatch((x) => x > 0),
    ],
    [
      [],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      [''],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .exactlyN(3),
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .isEmpty(),
    ],
    [
      [2, 4, 1, 3],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .isPartitioned((item) => item % 2 === 0),
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .filter((item) => item > 0)
        .runningTotal()
        .isSorted(),
    ],
    [
      [5, -1, 4, -2, 3, -3, 2, -4, 1, -5],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .filter((item) => item > 0)
        .isReversed(),
    ],
    [
      [],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .noneMatch(() => true),
    ],
    [
      [],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .noneMatch(() => false),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .noneMatch((x) => x === 9),
    ],
    [
      [],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      [],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .sameCountWith([]),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
    [
      [],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .arePermutationsWith([]),
    ],
    [
      [],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .arePermutationsWith(),
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .arePermutationsWith(),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .arePermutationsWith([5, 1, 3]),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .runningTotal()
        .arePermutationsWith([9, 1, 4]),
    ],
    [
      [1],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .notAllMatch(() => false),
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x > 2),
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x < 3),
    ],
    [
      ['a'],
      (iterable: Iterable<unknown> | Iterator<unknown>) => AsyncStream.of(iterable)
        .notAllMatch((x: any) => x !== 'a'),
    ],
    [
      ['a', 'B', 'C'],
      (iterable: Iterable<unknown> | Iterator<unknown>) => AsyncStream.of(iterable)
        .notAllMatch((x: any) => x.toLowerCase() === x),
    ],
    [
      ['a', 'B', 'C'],
      (iterable: Iterable<unknown> | Iterator<unknown>) => AsyncStream.of(iterable)
        .notAllMatch((x: any) => x.toUpperCase() === x),
    ],
    [
      ['OS', 'PHP', 'python'],
      (iterable: Iterable<unknown> | Iterator<unknown>) => AsyncStream.of(iterable)
        .notAllMatch((x: any) => x.toUpperCase() === x),
    ],
  ];
}

function dataProviderForGeneratorsTrue(): Array<[Generator<any>, (iterable: Generator<any>) => Promise<boolean>]> {
  return dataProviderForArraysTrue().map((item) => [
    createGeneratorFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<Numeric> | Iterator<Numeric>) => Promise<boolean>],
  ]);
}

function dataProviderForIterablesTrue(): Array<[Iterable<any>, (iterable: Iterable<any>) => Promise<boolean>]> {
  return dataProviderForArraysTrue().map((item) => [
    createIterableFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<Numeric> | Iterator<Numeric>) => Promise<boolean>],
  ]);
}

function dataProviderForIteratorsTrue(): Array<[Iterator<any>, (iterable: Iterator<any>) => Promise<boolean>]> {
  return dataProviderForArraysTrue().map((item) => [
    createIteratorFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<Numeric> | Iterator<Numeric>) => Promise<boolean>],
  ]);
}

function dataProviderForStringsTrue(): Array<[string, (iterable: string) => Promise<boolean>]> {
  return [
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .allMatch((x) => Number(x) > 0),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .allMatch((x) => Number(x) > 0),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      '12345',
      (iterable) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .anyMatch((x) => Number(x) === 3),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .anyMatch((x) => Number(x) > 0),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .isEmpty(),
    ],
    [
      '2413',
      (iterable) => AsyncStream.of(iterable)
        .isPartitioned((item) => Number(item) % 2 === 0),
    ],
    [
      '123',
      (iterable) => AsyncStream.of(iterable)
        .runningTotal()
        .isSorted(),
    ],
    [
      '54321',
      (iterable) => AsyncStream.of(iterable)
        .isReversed(),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .noneMatch(() => true),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .noneMatch(() => false),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .noneMatch((x) => Number(x) === 9),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      '123',
      (iterable) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .sameWith(['1', '3', '5']),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .sameCountWith([]),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .arePermutationsWith([]),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .arePermutationsWith(),
    ],
    [
      '123',
      (iterable) => AsyncStream.of(iterable)
        .arePermutationsWith(),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .arePermutationsWith(['5', '1', '3']),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .runningTotal()
        .arePermutationsWith([9, 1, 4]),
    ],
    [
      '1',
      (iterable) => AsyncStream.of(iterable)
        .notAllMatch((x) => x !== '1'),
    ],
    [
      '123',
      (iterable) => AsyncStream.of(iterable)
        .notAllMatch((x) => Number(x) > 2),
    ],
    [
      '123',
      (iterable) => AsyncStream.of(iterable)
        .notAllMatch((x) => Number(x) < 3),
    ],
    [
      'a',
      (iterable) => AsyncStream.of(iterable)
        .notAllMatch((x) => x !== 'a'),
    ],
    [
      'aBC',
      (iterable) => AsyncStream.of(iterable)
        .notAllMatch((x) => x.toLowerCase() === x),
    ],
    [
      'aBC',
      (iterable) => AsyncStream.of(iterable)
        .notAllMatch((x) => x.toUpperCase() === x),
    ],
  ];
}

function dataProviderForSetsTrue(): Array<[Set<any>, (iterable: Set<any>) => Promise<boolean>]> {
  return [
    [
      new Set([]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .allMatch((x) => x > 0),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .allMatch((x) => x > 0),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      new Set([1, '1', true, [1], [1]]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      new Set([1, 1, 1, 1, 1]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .anyMatch((x) => x === 3),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .anyMatch((x) => x > 0),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      new Set(['']),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .exactlyN(3),
    ],
    [
      new Set([]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .isEmpty(),
    ],
    [
      new Set([2, 4, 1, 3]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .isPartitioned((item) => item % 2 === 0),
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .filter((item) => item > 0)
        .runningTotal()
        .isSorted(),
    ],
    [
      new Set([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .filter((item) => item > 0)
        .isReversed(),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .noneMatch(() => true),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .noneMatch(() => false),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .noneMatch((x) => x === 9),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([]),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .arePermutationsWith([]),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .arePermutationsWith(),
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .arePermutationsWith(),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .arePermutationsWith([5, 1, 3]),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .arePermutationsWith([9, 1, 4]),
    ],
    [
      new Set([1]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .notAllMatch(() => false),
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x > 2),
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x < 3),
    ],
    [
      new Set(['a']),
      (iterable: Set<string>) => AsyncStream.of(iterable)
        .notAllMatch((x: any) => x !== 'a'),
    ],
    [
      new Set(['a', 'B', 'C']),
      (iterable: Set<string>) => AsyncStream.of(iterable)
        .notAllMatch((x: any) => x.toLowerCase() === x),
    ],
    [
      new Set(['a', 'B', 'C']),
      (iterable: Set<string>) => AsyncStream.of(iterable)
        .notAllMatch((x: any) => x.toUpperCase() === x),
    ],
    [
      new Set(['OS', 'PHP', 'python']),
      (iterable: Set<string>) => AsyncStream.of(iterable)
        .notAllMatch((x: any) => x.toUpperCase() === x),
    ],
  ];
}

function dataProviderForMapsTrue(): Array<[Map<any, any>, (iterable: Map<any, any>) => Promise<boolean>]> {
  return [
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .allMatch((x) => x[1] > 0),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .allMatch((x) => x[1] > 0),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((data) => data[1])
        .allUnique(),
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((data) => data[1])
        .allUnique(),
    ],
    [
      createMapFixture([1, '1', true, [1], [1]]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((data) => data[1])
        .allUnique(),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .anyMatch((x) => x[1] === 3),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .anyMatch((x) => x[1] > 0),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .isEmpty(),
    ],
    [
      createMapFixture([2, 4, 1, 3]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .isPartitioned((item) => item[1] % 2 === 0),
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .filter((item) => item > 0)
        .runningTotal()
        .isSorted(),
    ],
    [
      createMapFixture([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .filter((item) => item > 0)
        .isReversed(),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .noneMatch(() => true),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .noneMatch(() => false),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .noneMatch((x) => x[1] === 9),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .sameCountWith([]),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .arePermutationsWith([]),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .arePermutationsWith(),
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .arePermutationsWith(),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .arePermutationsWith([5, 1, 3]),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .arePermutationsWith([9, 1, 4]),
    ],
    [
      createMapFixture([1]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x[1] !== 1),
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x[1] > 2),
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x[1] < 3),
    ],
    [
      createMapFixture(['a']),
      (iterable: Map<unknown, string>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x[1] !== 'a'),
    ],
    [
      createMapFixture(['a', 'B', 'C']),
      (iterable: Map<unknown, string>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x[1].toLowerCase() === x[1]),
    ],
    [
      createMapFixture(['a', 'B', 'C']),
      (iterable: Map<unknown, string>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x[1].toUpperCase() === x[1]),
    ],
    [
      createMapFixture(['OS', 'PHP', 'python']),
      (iterable: Map<unknown, string>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x[1].toUpperCase() === x[1]),
    ],
  ];
}

function dataProviderForAsyncTrue(): Array<[Array<any>, (iterable: AsyncIterable<any> | AsyncIterator<any>) => Promise<boolean>]> {
  return [
    [
      [],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .allMatch(async (x) => {
          await asyncTimeout(1);
          return x > 0;
        }),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .allMatch((x) => x > 0),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      [1, '1', true, [1], [1]],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .anyMatch(async (x) => {
          await asyncTimeout(1);
          return x === 3;
        }),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .anyMatch((x) => x > 0),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      [''],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .exactlyN(3),
    ],
    [
      [],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .isEmpty(),
    ],
    [
      [2, 4, 1, 3],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .isPartitioned(async (item) => {
          await asyncTimeout(1);
          return item % 2 === 0;
        }),
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .filter((item) => item > 0)
        .runningTotal()
        .isSorted(),
    ],
    [
      [5, -1, 4, -2, 3, -3, 2, -4, 1, -5],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .filter((item) => item > 0)
        .isReversed(),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .noneMatch(async () => {
          await asyncTimeout(1);
          return true;
        }),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .noneMatch(() => false),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .noneMatch((x) => x === 9),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([]),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .arePermutationsWith([]),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .arePermutationsWith(),
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .arePermutationsWith(),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .arePermutationsWith([5, 1, 3]),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .arePermutationsWith([9, 1, 4]),
    ],
    [
      [1],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .notAllMatch(() => false),
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .notAllMatch(async (x) => {
          await asyncTimeout(1);
          return x > 2;
        }),
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x < 3),
    ],
    [
      ['a'],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .notAllMatch((x: any) => x !== 'a'),
    ],
    [
      ['a', 'B', 'C'],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .notAllMatch((x: any) => x.toLowerCase() === x),
    ],
    [
      ['a', 'B', 'C'],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .notAllMatch((x: any) => x.toUpperCase() === x),
    ],
    [
      ['OS', 'PHP', 'python'],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .notAllMatch((x: any) => x.toUpperCase() === x),
    ],
  ];
}

function dataProviderForAsyncGeneratorsTrue(): Array<[AsyncGenerator<any>, (iterable: AsyncGenerator<any>) => Promise<boolean>]> {
  return dataProviderForAsyncTrue().map((item) => [
    createAsyncGeneratorFixture(item[0]),
    ...item.slice(1) as [(iterable: AsyncIterable<Numeric> | AsyncIterator<Numeric>) => Promise<boolean>],
  ]);
}

function dataProviderForAsyncIterablesTrue(): Array<[AsyncIterable<any>, (iterable: AsyncIterable<any>) => Promise<boolean>]> {
  return dataProviderForAsyncTrue().map((item) => [
    createAsyncIterableFixture(item[0]),
    ...item.slice(1) as [(iterable: AsyncIterable<Numeric> | AsyncIterator<Numeric>) => Promise<boolean>],
  ]);
}

function dataProviderForAsyncIteratorsTrue(): Array<[AsyncIterator<any>, (iterable: AsyncIterator<any>) => Promise<boolean>]> {
  return dataProviderForAsyncTrue().map((item) => [
    createAsyncIteratorFixture(item[0]),
    ...item.slice(1) as [(iterable: AsyncIterable<Numeric> | AsyncIterator<Numeric>) => Promise<boolean>],
  ]);
}

function dataProviderForArraysFalse(): Array<[Array<any>, (iterable: Array<any>) => Promise<boolean>]> {
  return [
    [
      [1, 3, -5],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .allMatch((x) => x > 0),
    ],
    [
      [1, 2, 1, 3],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      [1, 1, 2],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .allEqual(),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .anyMatch((x) => x > 10),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      [''],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(4),
    ],
    [
      [1],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .isEmpty(),
    ],
    [
      [2, 1, 4, 3],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .isPartitioned((item) => item % 2 === 0),
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .isSorted(),
    ],
    [
      [5, -1, 4, -2, 3, -3, 2, -4, 1, -5],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .isReversed(),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch((x) => x === 3),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([1]),
    ],
    [
      [1],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      [1],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(['1']),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .arePermutationsWith([1]),
    ],
    [
      [1],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .arePermutationsWith([]),
    ],
    [
      [1],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .arePermutationsWith(['1']),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .arePermutationsWith([1, 3, 4]),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .arePermutationsWith([1, 4, 10]),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .notAllMatch(() => true),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .notAllMatch(() => false),
    ],
    [
      [1],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x === 1),
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x >= 1),
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x < 4),
    ],
    [
      ['a'],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .notAllMatch((x: any) => x === 'a'),
    ],
    [
      ['A', 'B', 'C'],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .notAllMatch((x: any) => x.toUpperCase() === x),
    ],
    [
      ['a', 'b', 'c'],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .notAllMatch((x: any) => x.toLowerCase() === x),
    ],
    [
      ['OS', 'PHP', 'COBOL'],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .notAllMatch((x: any) => x.toUpperCase() === x),
    ],
  ];
}

function dataProviderForGeneratorsFalse(): Array<[Generator<any>, (iterable: Generator<any>) => Promise<boolean>]> {
  return dataProviderForArraysFalse().map((item) => [
    createGeneratorFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<Numeric> | Iterator<Numeric>) => Promise<boolean>],
  ]);
}

function dataProviderForIterablesFalse(): Array<[Iterable<any>, (iterable: Iterable<any>) => Promise<boolean>]> {
  return dataProviderForArraysFalse().map((item) => [
    createIterableFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<Numeric> | Iterator<Numeric>) => Promise<boolean>],
  ]);
}

function dataProviderForIteratorsFalse(): Array<[Iterator<any>, (iterable: Iterator<any>) => Promise<boolean>]> {
  return dataProviderForArraysFalse().map((item) => [
    createIteratorFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<Numeric> | Iterator<Numeric>) => Promise<boolean>],
  ]);
}

function dataProviderForStringsFalse(): Array<[string, (iterable: string) => Promise<boolean>]> {
  return [
    [
      '123',
      (iterable) => AsyncStream.of(iterable)
        .allMatch((x) => Number(x) > 1),
    ],
    [
      '1231',
      (iterable) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .anyMatch((x) => Number(x) > 10),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      '1',
      (iterable) => AsyncStream.of(iterable)
        .isEmpty(),
    ],
    [
      '2143',
      (iterable) => AsyncStream.of(iterable)
        .isPartitioned((item) => Number(item) % 2 === 0),
    ],
    [
      '131',
      (iterable) => AsyncStream.of(iterable)
        .isSorted(),
    ],
    [
      '123',
      (iterable) => AsyncStream.of(iterable)
        .isReversed(),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .noneMatch((x) => Number(x) === 3),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .sameWith([1]),
    ],
    [
      '1',
      (iterable) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      '1',
      (iterable) => AsyncStream.of(iterable)
        .sameWith([1]),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .sameWith(['1', '3', '4']),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .arePermutationsWith([1]),
    ],
    [
      '1',
      (iterable) => AsyncStream.of(iterable)
        .arePermutationsWith([]),
    ],
    [
      '1',
      (iterable) => AsyncStream.of(iterable)
        .arePermutationsWith([1]),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .arePermutationsWith(['1', '3', '4']),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .runningTotal()
        .arePermutationsWith([1, 4, 10]),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .notAllMatch(() => true),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .notAllMatch(() => false),
    ],
    [
      '1',
      (iterable) => AsyncStream.of(iterable)
        .notAllMatch((x) => x === '1'),
    ],
    [
      '123',
      (iterable) => AsyncStream.of(iterable)
        .notAllMatch((x) => Number(x) >= 1),
    ],
    [
      '123',
      (iterable) => AsyncStream.of(iterable)
        .notAllMatch((x) => Number(x) < 4),
    ],
    [
      'a',
      (iterable) => AsyncStream.of(iterable)
        .notAllMatch((x) => x === 'a'),
    ],
    [
      'ABC',
      (iterable) => AsyncStream.of(iterable)
        .notAllMatch((x) => x.toUpperCase() === x),
    ],
    [
      'abc',
      (iterable) => AsyncStream.of(iterable)
        .notAllMatch((x) => x.toLowerCase() === x),
    ],
  ];
}

function dataProviderForSetsFalse(): Array<[Set<any>, (iterable: Set<any>) => Promise<boolean>]> {
  return [
    [
      new Set([1, 3, -5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .allMatch((x) => x > 0),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .anyMatch((x) => x > 10),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      new Set(['']),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .exactlyN(4),
    ],
    [
      new Set([1]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .isEmpty(),
    ],
    [
      new Set([2, 1, 4, 3]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .isPartitioned((item) => item % 2 === 0),
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .isSorted(),
    ],
    [
      new Set([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .isReversed(),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .noneMatch((x) => x === 3),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .sameWith([1]),
    ],
    [
      new Set([1]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      new Set([1]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .sameWith(['1']),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .arePermutationsWith([1]),
    ],
    [
      new Set([1]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .arePermutationsWith([]),
    ],
    [
      new Set([1]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .arePermutationsWith(['1']),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .arePermutationsWith([1, 3, 4]),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .arePermutationsWith([1, 4, 10]),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .notAllMatch(() => true),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .notAllMatch(() => false),
    ],
    [
      new Set([1]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x === 1),
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x >= 1),
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x < 4),
    ],
    [
      new Set(['a']),
      (iterable: Set<string>) => AsyncStream.of(iterable)
        .notAllMatch((x: any) => x === 'a'),
    ],
    [
      new Set(['A', 'B', 'C']),
      (iterable: Set<string>) => AsyncStream.of(iterable)
        .notAllMatch((x: any) => x.toUpperCase() === x),
    ],
    [
      new Set(['a', 'b', 'c']),
      (iterable: Set<string>) => AsyncStream.of(iterable)
        .notAllMatch((x: any) => x.toLowerCase() === x),
    ],
    [
      new Set(['OS', 'PHP', 'COBOL']),
      (iterable: Set<string>) => AsyncStream.of(iterable)
        .notAllMatch((x: any) => x.toUpperCase() === x),
    ],
  ];
}

function dataProviderForMapsFalse(): Array<[Map<any, any>, (iterable: Map<any, any>) => Promise<boolean>]> {
  return [
    [
      createMapFixture([1, 3, -5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .allMatch((x) => x[1] > 0),
    ],
    [
      createMapFixture([1, 2, 1, 3]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .allUnique(),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .anyMatch((x) => x[1] > 10),
    ],
    [
      createMapFixture([1]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .isEmpty(),
    ],
    [
      createMapFixture([2, 1, 4, 3]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .isPartitioned((item) => item[1] % 2 === 0),
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .isSorted(),
    ],
    [
      createMapFixture([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .isReversed(),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .noneMatch((x) => x[1] === 3),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .sameWith([1]),
    ],
    [
      createMapFixture([1]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .sameWith([]),
    ],
    [
      createMapFixture([1]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .sameWith(['1']),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .arePermutationsWith([1]),
    ],
    [
      createMapFixture([1]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .arePermutationsWith([]),
    ],
    [
      createMapFixture([1]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .arePermutationsWith(['1']),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .arePermutationsWith([1, 3, 4]),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .arePermutationsWith([1, 4, 10]),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .notAllMatch(() => true),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .notAllMatch(() => false),
    ],
    [
      createMapFixture([1]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x[1] === 1),
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x[1] >= 1),
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x[1] < 4),
    ],
    [
      createMapFixture(['a']),
      (iterable: Map<unknown, string>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x[1] === 'a'),
    ],
    [
      createMapFixture(['A', 'B', 'C']),
      (iterable: Map<unknown, string>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x[1].toUpperCase() === x[1]),
    ],
    [
      createMapFixture(['a', 'b', 'c']),
      (iterable: Map<unknown, string>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x[1].toLowerCase() === x[1]),
    ],
    [
      createMapFixture(['OS', 'PHP', 'COBOL']),
      (iterable: Map<unknown, string>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x[1].toUpperCase() === x[1]),
    ],
  ];
}

function dataProviderForAsyncFalse(): Array<[Array<any>, (iterable: AsyncIterable<any> | AsyncIterator<any>) => Promise<boolean>]> {
  return [
    [
      [1, 3, -5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .allMatch(async (x) => {
          await asyncTimeout(1);
          return (x as number) > 0;
        }),
    ],
    [
      [1, 2, 1, 3],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .anyMatch(async () => {
          await asyncTimeout(1);
          return true;
        }),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) > 10),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      [''],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .exactlyN(4),
    ],
    [
      [1],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .isEmpty(),
    ],
    [
      [2, 1, 4, 3],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .isPartitioned(async (item) => {
          await asyncTimeout(1);
          return item % 2 === 0;
        }),
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .isSorted(),
    ],
    [
      [5, -1, 4, -2, 3, -3, 2, -4, 1, -5],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .isReversed(),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .noneMatch(async (x) => {
          await asyncTimeout(1);
          return (x as number) === 3;
        }),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .sameWith([1]),
    ],
    [
      [1],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      [1],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .sameWith(['1']),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .arePermutationsWith([1]),
    ],
    [
      [1],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .arePermutationsWith([]),
    ],
    [
      [1],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .arePermutationsWith(['1']),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .arePermutationsWith([1, 3, 4]),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .arePermutationsWith([1, 4, 10]),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .notAllMatch(async () => {
          await asyncTimeout(1);
          return true;
        }),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .notAllMatch(() => false),
    ],
    [
      [1],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x === 1),
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x >= 1),
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .notAllMatch((x) => x < 4),
    ],
    [
      ['a'],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .notAllMatch((x: any) => x === 'a'),
    ],
    [
      ['A', 'B', 'C'],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .notAllMatch((x: any) => x.toUpperCase() === x),
    ],
    [
      ['a', 'b', 'c'],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .notAllMatch((x: any) => x.toLowerCase() === x),
    ],
    [
      ['OS', 'PHP', 'COBOL'],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .notAllMatch((x: any) => x.toUpperCase() === x),
    ],
  ];
}

function dataProviderForAsyncGeneratorsFalse(): Array<[AsyncGenerator<any>, (iterable: AsyncGenerator<any>) => Promise<boolean>]> {
  return dataProviderForAsyncFalse().map((item) => [
    createAsyncGeneratorFixture(item[0]),
    ...item.slice(1) as [(iterable: AsyncIterable<Numeric> | AsyncIterator<Numeric>) => Promise<boolean>],
  ]);
}

function dataProviderForAsyncIterablesFalse(): Array<[AsyncIterable<any>, (iterable: AsyncIterable<any>) => Promise<boolean>]> {
  return dataProviderForAsyncFalse().map((item) => [
    createAsyncIterableFixture(item[0]),
    ...item.slice(1) as [(iterable: AsyncIterable<Numeric> | AsyncIterator<Numeric>) => Promise<boolean>],
  ]);
}

function dataProviderForAsyncIteratorsFalse(): Array<[AsyncIterator<any>, (iterable: AsyncIterator<any>) => Promise<boolean>]> {
  return dataProviderForAsyncFalse().map((item) => [
    createAsyncIteratorFixture(item[0]),
    ...item.slice(1) as [(iterable: AsyncIterable<Numeric> | AsyncIterator<Numeric>) => Promise<boolean>],
  ]);
}
