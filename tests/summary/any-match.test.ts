// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from '../fixture';
import { summary } from '../../src';

describe.each([
  ...dataProviderForArraysTrue(),
  ...dataProviderForGeneratorsTrue(),
  ...dataProviderForIterablesTrue(),
  ...dataProviderForIteratorsTrue(),
  ...dataProviderForStringsTrue(),
  ...dataProviderForSetsTrue(),
  ...dataProviderForMapsTrue(),
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
  ...dataProviderForGeneratorsFalse(),
  ...dataProviderForIterablesFalse(),
  ...dataProviderForIteratorsFalse(),
  ...dataProviderForStringsFalse(),
  ...dataProviderForSetsFalse(),
  ...dataProviderForMapsFalse(),
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

function dataProviderForGeneratorsTrue(): Array<unknown> {
  return [
    [
      createGeneratorFixture([1]),
      () => true,
    ],
    [
      createGeneratorFixture([1]),
      (x: number) => x === 1,
    ],
    [
      createGeneratorFixture([0, 1, 2, 3]),
      (x: number) => x >= 1,
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5]),
      (x: number) => x < 4,
    ],
    [
      createGeneratorFixture(['a']),
      (x: string) => x === 'a',
    ],
    [
      createGeneratorFixture(['n', 'a']),
      (x: string) => x === 'a',
    ],
    [
      createGeneratorFixture(['A', 'b', 'C']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      createGeneratorFixture(['A', 'b', 'c']),
      (x: string) => x.toLowerCase() === x,
    ],
    [
      createGeneratorFixture(['OS', 'PHP', 'linux']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      createGeneratorFixture([[1, 3], ['a'], [1.1, 2.2, 3.3]]),
      (x: Array<number>) => x.length === 3,
    ],
  ];
}

function dataProviderForIterablesTrue(): Array<unknown> {
  return [
    [
      createIterableFixture([1]),
      () => true,
    ],
    [
      createIterableFixture([1]),
      (x: number) => x === 1,
    ],
    [
      createIterableFixture([0, 1, 2, 3]),
      (x: number) => x >= 1,
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5]),
      (x: number) => x < 4,
    ],
    [
      createIterableFixture(['a']),
      (x: string) => x === 'a',
    ],
    [
      createIterableFixture(['n', 'a']),
      (x: string) => x === 'a',
    ],
    [
      createIterableFixture(['A', 'b', 'C']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      createIterableFixture(['A', 'b', 'c']),
      (x: string) => x.toLowerCase() === x,
    ],
    [
      createIterableFixture(['OS', 'PHP', 'linux']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      createIterableFixture([[1, 3], ['a'], [1.1, 2.2, 3.3]]),
      (x: Array<number>) => x.length === 3,
    ],
  ];
}

function dataProviderForIteratorsTrue(): Array<unknown> {
  return [
    [
      createIteratorFixture([1]),
      () => true,
    ],
    [
      createIteratorFixture([1]),
      (x: number) => x === 1,
    ],
    [
      createIteratorFixture([0, 1, 2, 3]),
      (x: number) => x >= 1,
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5]),
      (x: number) => x < 4,
    ],
    [
      createIteratorFixture(['a']),
      (x: string) => x === 'a',
    ],
    [
      createIteratorFixture(['n', 'a']),
      (x: string) => x === 'a',
    ],
    [
      createIteratorFixture(['A', 'b', 'C']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      createIteratorFixture(['A', 'b', 'c']),
      (x: string) => x.toLowerCase() === x,
    ],
    [
      createIteratorFixture(['OS', 'PHP', 'linux']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      createIteratorFixture([[1, 3], ['a'], [1.1, 2.2, 3.3]]),
      (x: Array<number>) => x.length === 3,
    ],
  ];
}

function dataProviderForStringsTrue(): Array<unknown> {
  return [
    [
      '1',
      () => true,
    ],
    [
      '1',
      (x: string) => Number(x) === 1,
    ],
    [
      '0123',
      (x: string) => Number(x) >= 1,
    ],
    [
      '12345',
      (x: string) => Number(x) < 4,
    ],
    [
      'a',
      (x: string) => x === 'a',
    ],
    [
      'na',
      (x: string) => x === 'a',
    ],
    [
      'AbC',
      (x: string) => x.toUpperCase() === x,
    ],
    [
      'Abc',
      (x: string) => x.toLowerCase() === x,
    ],
  ];
}

function dataProviderForSetsTrue(): Array<unknown> {
  return [
    [
      new Set([1]),
      () => true,
    ],
    [
      new Set([1]),
      (x: number) => x === 1,
    ],
    [
      new Set([0, 1, 2, 3]),
      (x: number) => x >= 1,
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      (x: number) => x < 4,
    ],
    [
      new Set(['a']),
      (x: string) => x === 'a',
    ],
    [
      new Set(['n', 'a']),
      (x: string) => x === 'a',
    ],
    [
      new Set(['A', 'b', 'C']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      new Set(['A', 'b', 'c']),
      (x: string) => x.toLowerCase() === x,
    ],
    [
      new Set(['OS', 'PHP', 'linux']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      new Set([[1, 3], ['a'], [1.1, 2.2, 3.3]]),
      (x: Array<number>) => x.length === 3,
    ],
  ];
}

function dataProviderForMapsTrue(): Array<unknown> {
  return [
    [
      createMapFixture([1]),
      () => true,
    ],
    [
      createMapFixture([1]),
      (x: [unknown, number]) => x[1] === 1,
    ],
    [
      createMapFixture([0, 1, 2, 3]),
      (x: [unknown, number]) => x[1] >= 1,
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (x: [unknown, number]) => x[1] < 4,
    ],
    [
      createMapFixture(['a']),
      (x: [unknown, string]) => x[1] === 'a',
    ],
    [
      createMapFixture(['n', 'a']),
      (x: [unknown, string]) => x[1] === 'a',
    ],
    [
      createMapFixture(['A', 'b', 'C']),
      (x: [unknown, string]) => x[1].toUpperCase() === x[1],
    ],
    [
      createMapFixture(['A', 'b', 'c']),
      (x: [unknown, string]) => x[1].toLowerCase() === x[1],
    ],
    [
      createMapFixture(['OS', 'PHP', 'linux']),
      (x: [unknown, string]) => x[1].toUpperCase() === x[1],
    ],
    [
      createMapFixture([[1, 3], ['a'], [1.1, 2.2, 3.3]]),
      (x: [unknown, Array<number>]) => x[1].length === 3,
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

function dataProviderForGeneratorsFalse(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      () => true,
    ],
    [
      createGeneratorFixture([]),
      () => false,
    ],
    [
      createGeneratorFixture([1]),
      (x: number) => x === 2,
    ],
    [
      createGeneratorFixture([0, 1, 2, 3]),
      (x: number) => x >= 4,
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5]),
      (x: number) => x < 1,
    ],
    [
      createGeneratorFixture(['a']),
      (x: string) => x === 'b',
    ],
    [
      createGeneratorFixture(['n', 'a']),
      (x: string) => x === 'b',
    ],
    [
      createGeneratorFixture(['a', 'b', 'c']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      createGeneratorFixture(['A', 'B', 'C']),
      (x: string) => x.toLowerCase() === x,
    ],
    [
      createGeneratorFixture(['os', 'php', 'linux']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      createGeneratorFixture([[1, 3], ['a'], [1.1, 2.2, 3.3]]),
      (x: Array<number>) => x.length === 4,
    ],
  ];
}

function dataProviderForIterablesFalse(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      () => true,
    ],
    [
      createIterableFixture([]),
      () => false,
    ],
    [
      createIterableFixture([1]),
      (x: number) => x === 2,
    ],
    [
      createIterableFixture([0, 1, 2, 3]),
      (x: number) => x >= 4,
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5]),
      (x: number) => x < 1,
    ],
    [
      createIterableFixture(['a']),
      (x: string) => x === 'b',
    ],
    [
      createIterableFixture(['n', 'a']),
      (x: string) => x === 'b',
    ],
    [
      createIterableFixture(['a', 'b', 'c']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      createIterableFixture(['A', 'B', 'C']),
      (x: string) => x.toLowerCase() === x,
    ],
    [
      createIterableFixture(['os', 'php', 'linux']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      createIterableFixture([[1, 3], ['a'], [1.1, 2.2, 3.3]]),
      (x: Array<number>) => x.length === 4,
    ],
  ];
}

function dataProviderForIteratorsFalse(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      () => true,
    ],
    [
      createIteratorFixture([]),
      () => false,
    ],
    [
      createIteratorFixture([1]),
      (x: number) => x === 2,
    ],
    [
      createIteratorFixture([0, 1, 2, 3]),
      (x: number) => x >= 4,
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5]),
      (x: number) => x < 1,
    ],
    [
      createIteratorFixture(['a']),
      (x: string) => x === 'b',
    ],
    [
      createIteratorFixture(['n', 'a']),
      (x: string) => x === 'b',
    ],
    [
      createIteratorFixture(['a', 'b', 'c']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      createIteratorFixture(['A', 'B', 'C']),
      (x: string) => x.toLowerCase() === x,
    ],
    [
      createIteratorFixture(['os', 'php', 'linux']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      createIteratorFixture([[1, 3], ['a'], [1.1, 2.2, 3.3]]),
      (x: Array<number>) => x.length === 4,
    ],
  ];
}

function dataProviderForStringsFalse(): Array<unknown> {
  return [
    [
      '',
      () => true,
    ],
    [
      '',
      () => false,
    ],
    [
      '1',
      (x: string) => Number(x) === 2,
    ],
    [
      '0123',
      (x: string) => Number(x) >= 4,
    ],
    [
      '12345',
      (x: string) => Number(x) < 1,
    ],
    [
      'a',
      (x: string) => x === 'b',
    ],
    [
      'na',
      (x: string) => x === 'b',
    ],
    [
      'abc',
      (x: string) => x.toUpperCase() === x,
    ],
    [
      'ABC',
      (x: string) => x.toLowerCase() === x,
    ],
  ];
}

function dataProviderForSetsFalse(): Array<unknown> {
  return [
    [
      new Set([]),
      () => true,
    ],
    [
      new Set([]),
      () => false,
    ],
    [
      new Set([1]),
      (x: number) => x === 2,
    ],
    [
      new Set([0, 1, 2, 3]),
      (x: number) => x >= 4,
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      (x: number) => x < 1,
    ],
    [
      new Set(['a']),
      (x: string) => x === 'b',
    ],
    [
      new Set(['n', 'a']),
      (x: string) => x === 'b',
    ],
    [
      new Set(['a', 'b', 'c']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      new Set(['A', 'B', 'C']),
      (x: string) => x.toLowerCase() === x,
    ],
    [
      new Set(['os', 'php', 'linux']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      new Set([[1, 3], ['a'], [1.1, 2.2, 3.3]]),
      (x: Array<number>) => x.length === 4,
    ],
  ];
}

function dataProviderForMapsFalse(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      () => true,
    ],
    [
      createMapFixture([]),
      () => false,
    ],
    [
      createMapFixture([1]),
      (x: [unknown, number]) => x[1] === 2,
    ],
    [
      createMapFixture([0, 1, 2, 3]),
      (x: [unknown, number]) => x[1] >= 4,
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (x: [unknown, number]) => x[1] < 1,
    ],
    [
      createMapFixture(['a']),
      (x: [unknown, string]) => x[1] === 'b',
    ],
    [
      createMapFixture(['n', 'a']),
      (x: [unknown, string]) => x[1] === 'b',
    ],
    [
      createMapFixture(['a', 'b', 'c']),
      (x: [unknown, string]) => x[1].toUpperCase() === x[1],
    ],
    [
      createMapFixture(['A', 'B', 'C']),
      (x: [unknown, string]) => x[1].toLowerCase() === x[1],
    ],
    [
      createMapFixture(['os', 'php', 'linux']),
      (x: [unknown, string]) => x[1].toUpperCase() === x[1],
    ],
    [
      createMapFixture([[1, 3], ['a'], [1.1, 2.2, 3.3]]),
      (x: [unknown, Array<number>]) => x[1].length === 4,
    ],
  ];
}
