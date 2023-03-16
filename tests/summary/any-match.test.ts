// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from '../fixture';
import { summary } from '../../src';

describe.each([
  ...dataProviderForArraysTrue(),
  // ...dataProviderForGeneratorsTrue(),
  // ...dataProviderForIterablesTrue(),
  // ...dataProviderForIteratorsTrue(),
  // ...dataProviderForStringsTrue(),
  // ...dataProviderForSetsTrue(),
  // ...dataProviderForMapsTrue(),
] as Array<[Iterable<unknown>|Iterator<unknown>, (item: unknown) => boolean]>)(
  "Summary Any Match Test True",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    predicate: (item: unknown) => boolean
  ) => {
    it("", () => {
      expect(summary.anyMatch(input, predicate)).toBeTruthy();
    });
  }
);

describe.each([
  ...dataProviderForArraysFalse(),
  // ...dataProviderForGeneratorsFalse(),
  // ...dataProviderForIterablesFalse(),
  // ...dataProviderForIteratorsFalse(),
  // ...dataProviderForStringsFalse(),
  // ...dataProviderForSetsFalse(),
  // ...dataProviderForMapsFalse(),
] as Array<[Iterable<unknown>|Iterator<unknown>, (item: unknown) => boolean]>)(
  "Summary Any Match Test False",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    predicate: (item: unknown) => boolean
  ) => {
    it("", () => {
      expect(summary.anyMatch(input, predicate)).toBeFalsy();
    });
  }
);

function dataProviderForArraysTrue(): Array<unknown> {
  return [
    [
      [1],
      () => true,
    ],
    [
      [1],
      (x: number) => x === 1,
    ],
    [
      [0, 1, 2, 3],
      (x: number) => x >= 1,
    ],
    [
      [1, 2, 3, 4, 5],
      (x: number) => x < 4,
    ],
    [
      ['a'],
      (x: string) => x === 'a',
    ],
    [
      ['n', 'a'],
      (x: string) => x === 'a',
    ],
    [
      ['A', 'b', 'C'],
      (x: string) => x.toUpperCase() === x,
    ],
    [
      ['A', 'b', 'c'],
      (x: string) => x.toLowerCase() === x,
    ],
    [
      ['OS', 'PHP', 'linux'],
      (x: string) => x.toUpperCase() === x,
    ],
    [
      [[1, 3], ['a'], [1.1, 2.2, 3.3]],
      (x: Array<number>) => x.length === 3,
    ],
  ];
}

function dataProviderForArraysFalse(): Array<unknown> {
  return [
    [
      [],
      () => true,
    ],
    [
      [],
      () => false,
    ],
    [
      [1],
      (x: number) => x === 2,
    ],
    [
      [0, 1, 2, 3],
      (x: number) => x >= 4,
    ],
    [
      [1, 2, 3, 4, 5],
      (x: number) => x < 1,
    ],
    [
      ['a'],
      (x: string) => x === 'b',
    ],
    [
      ['n', 'a'],
      (x: string) => x === 'b',
    ],
    [
      ['a', 'b', 'c'],
      (x: string) => x.toUpperCase() === x,
    ],
    [
      ['A', 'B', 'C'],
      (x: string) => x.toLowerCase() === x,
    ],
    [
      ['os', 'php', 'linux'],
      (x: string) => x.toUpperCase() === x,
    ],
    [
      [[1, 3], ['a'], [1.1, 2.2, 3.3]],
      (x: Array<number>) => x.length === 4,
    ],
  ];
}
