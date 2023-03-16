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
  "Summary All Match Test True",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    predicate: (item: unknown) => boolean
  ) => {
    it("", () => {
      expect(summary.allMatch(input, predicate)).toBeTruthy();
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
  "Summary All Match Test False",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    predicate: (item: unknown) => boolean
  ) => {
    it("", () => {
      expect(summary.allMatch(input, predicate)).toBeFalsy();
    });
  }
);

function dataProviderForArraysTrue(): Array<unknown> {
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
      (x: number) => x === 1,
    ],
    [
      [1, 2, 3],
      (x: number) => x >= 1,
    ],
    [
      [1, 2, 3],
      (x: number) => x < 4,
    ],
    [
      ['a'],
      (x: string) => x === 'a',
    ],
    [
      ['A', 'B', 'C'],
      (x: string) => x.toUpperCase() === x,
    ],
    [
      ['a', 'b', 'c'],
      (x: string) => x.toLowerCase() === x,
    ],
    [
      ['OS', 'PHP', 'COBOL'],
      (x: string) => x.toUpperCase() === x,
    ],
    [
      [[1, 2, 3], ['a', 'b', 'c'], [1.1, 2.2, 3.3]],
      (x: Array<unknown>) => x.length === 3,
    ],
  ];
}

function dataProviderForGeneratorsTrue(): Array<unknown> {
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
      (x: number) => x === 1,
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (x: number) => x >= 1,
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (x: number) => x < 4,
    ],
    [
      createGeneratorFixture(['a']),
      (x: string) => x === 'a',
    ],
    [
      createGeneratorFixture(['A', 'B', 'C']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      createGeneratorFixture(['a', 'b', 'c']),
      (x: string) => x.toLowerCase() === x,
    ],
    [
      createGeneratorFixture(['OS', 'PHP', 'COBOL']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      createGeneratorFixture([[1, 2, 3], ['a', 'b', 'c'], [1.1, 2.2, 3.3]]),
      (x: Array<unknown>) => x.length === 3,
    ],
  ];
}

function dataProviderForIterablesTrue(): Array<unknown> {
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
      (x: number) => x === 1,
    ],
    [
      createIterableFixture([1, 2, 3]),
      (x: number) => x >= 1,
    ],
    [
      createIterableFixture([1, 2, 3]),
      (x: number) => x < 4,
    ],
    [
      createIterableFixture(['a']),
      (x: string) => x === 'a',
    ],
    [
      createIterableFixture(['A', 'B', 'C']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      createIterableFixture(['a', 'b', 'c']),
      (x: string) => x.toLowerCase() === x,
    ],
    [
      createIterableFixture(['OS', 'PHP', 'COBOL']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      createIterableFixture([[1, 2, 3], ['a', 'b', 'c'], [1.1, 2.2, 3.3]]),
      (x: Array<unknown>) => x.length === 3,
    ],
  ];
}

function dataProviderForIteratorsTrue(): Array<unknown> {
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
      (x: number) => x === 1,
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (x: number) => x >= 1,
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (x: number) => x < 4,
    ],
    [
      createIteratorFixture(['a']),
      (x: string) => x === 'a',
    ],
    [
      createIteratorFixture(['A', 'B', 'C']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      createIteratorFixture(['a', 'b', 'c']),
      (x: string) => x.toLowerCase() === x,
    ],
    [
      createIteratorFixture(['OS', 'PHP', 'COBOL']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      createIteratorFixture([[1, 2, 3], ['a', 'b', 'c'], [1.1, 2.2, 3.3]]),
      (x: Array<unknown>) => x.length === 3,
    ],
  ];
}

function dataProviderForStringsTrue(): Array<unknown> {
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
      (x: string) => x === '1',
    ],
    [
      '123',
      (x: string) => Number(x) >= 1,
    ],
    [
      '123',
      (x: string) => Number(x) < 4,
    ],
    [
      'a',
      (x: string) => x === 'a',
    ],
    [
      'ABC',
      (x: string) => x.toUpperCase() === x,
    ],
    [
      'abc',
      (x: string) => x.toLowerCase() === x,
    ],
  ];
}

function dataProviderForSetsTrue(): Array<unknown> {
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
      (x: number) => x === 1,
    ],
    [
      new Set([1, 2, 3]),
      (x: number) => x >= 1,
    ],
    [
      new Set([1, 2, 3]),
      (x: number) => x < 4,
    ],
    [
      new Set(['a']),
      (x: string) => x === 'a',
    ],
    [
      new Set(['A', 'B', 'C']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      new Set(['a', 'b', 'c']),
      (x: string) => x.toLowerCase() === x,
    ],
    [
      new Set(['OS', 'PHP', 'COBOL']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      new Set([[1, 2, 3], ['a', 'b', 'c'], [1.1, 2.2, 3.3]]),
      (x: Array<unknown>) => x.length === 3,
    ],
  ];
}

function dataProviderForMapsTrue(): Array<unknown> {
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
      (x: [unknown, number]) => x[1] === 1,
    ],
    [
      createMapFixture([1, 2, 3]),
      (x: [unknown, number]) => x[1] >= 1,
    ],
    [
      createMapFixture([1, 2, 3]),
      (x: [unknown, number]) => x[1] < 4,
    ],
    [
      createMapFixture(['a']),
      (x: [unknown, string]) => x[1] === 'a',
    ],
    [
      createMapFixture(['A', 'B', 'C']),
      (x: [unknown, string]) => x[1].toUpperCase() === x[1],
    ],
    [
      createMapFixture(['a', 'b', 'c']),
      (x: [unknown, string]) => x[1].toLowerCase() === x[1],
    ],
    [
      createMapFixture(['OS', 'PHP', 'COBOL']),
      (x: [unknown, string]) => x[1].toUpperCase() === x[1],
    ],
    [
      createMapFixture([[1, 2, 3], ['a', 'b', 'c'], [1.1, 2.2, 3.3]]),
      (x: [unknown, Array<unknown>]) => x[1].length === 3,
    ],
  ];
}

function dataProviderForArraysFalse(): Array<unknown> {
  return [
    [
      [1],
      () => false,
    ],
    [
      [1],
      (x: number) => x === 2,
    ],
    [
      [1, 2, 3],
      (x: number) => x >= 4,
    ],
    [
      [1, 2, 3],
      (x: number) => x < 3,
    ],
    [
      ['a'],
      (x: string) => x === 'b',
    ],
    [
      ['a', 'B', 'C'],
      (x: string) => x.toLowerCase() === x,
    ],
    [
      ['a', 'B', 'C'],
      (x: string) => x.toUpperCase() === x,
    ],
    [
      ['OS', 'PHP', 'python'],
      (x: string) => x.toUpperCase() === x,
    ],
    [
      [[1, 2, 3], ['a', 'b'], [1.1, 2.2, 3.3]],
      (x: Array<number>) => x.length === 3,
    ],
  ];
}

function dataProviderForGeneratorsFalse(): Array<unknown> {
  return [
    [
      createGeneratorFixture([1]),
      () => false,
    ],
    [
      createGeneratorFixture([1]),
      (x: number) => x === 2,
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (x: number) => x >= 4,
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (x: number) => x < 3,
    ],
    [
      createGeneratorFixture(['a']),
      (x: string) => x === 'b',
    ],
    [
      createGeneratorFixture(['a', 'B', 'C']),
      (x: string) => x.toLowerCase() === x,
    ],
    [
      createGeneratorFixture(['a', 'B', 'C']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      createGeneratorFixture(['OS', 'PHP', 'python']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      createGeneratorFixture([[1, 2, 3], ['a', 'b'], [1.1, 2.2, 3.3]]),
      (x: Array<number>) => x.length === 3,
    ],
  ];
}

function dataProviderForIterablesFalse(): Array<unknown> {
  return [
    [
      createIterableFixture([1]),
      () => false,
    ],
    [
      createIterableFixture([1]),
      (x: number) => x === 2,
    ],
    [
      createIterableFixture([1, 2, 3]),
      (x: number) => x >= 4,
    ],
    [
      createIterableFixture([1, 2, 3]),
      (x: number) => x < 3,
    ],
    [
      createIterableFixture(['a']),
      (x: string) => x === 'b',
    ],
    [
      createIterableFixture(['a', 'B', 'C']),
      (x: string) => x.toLowerCase() === x,
    ],
    [
      createIterableFixture(['a', 'B', 'C']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      createIterableFixture(['OS', 'PHP', 'python']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      createIterableFixture([[1, 2, 3], ['a', 'b'], [1.1, 2.2, 3.3]]),
      (x: Array<number>) => x.length === 3,
    ],
  ];
}

function dataProviderForIteratorsFalse(): Array<unknown> {
  return [
    [
      createIteratorFixture([1]),
      () => false,
    ],
    [
      createIteratorFixture([1]),
      (x: number) => x === 2,
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (x: number) => x >= 4,
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (x: number) => x < 3,
    ],
    [
      createIteratorFixture(['a']),
      (x: string) => x === 'b',
    ],
    [
      createIteratorFixture(['a', 'B', 'C']),
      (x: string) => x.toLowerCase() === x,
    ],
    [
      createIteratorFixture(['a', 'B', 'C']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      createIteratorFixture(['OS', 'PHP', 'python']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      createIteratorFixture([[1, 2, 3], ['a', 'b'], [1.1, 2.2, 3.3]]),
      (x: Array<number>) => x.length === 3,
    ],
  ];
}

function dataProviderForStringsFalse(): Array<unknown> {
  return [
    [
      '1',
      () => false,
    ],
    [
      '1',
      (x: string) => x === '2',
    ],
    [
      '123',
      (x: string) => Number(x) >= 4,
    ],
    [
      '123',
      (x: string) => Number(x) < 3,
    ],
    [
      'a',
      (x: string) => x === 'b',
    ],
    [
      'aBC',
      (x: string) => x.toLowerCase() === x,
    ],
    [
      'aBC',
      (x: string) => x.toUpperCase() === x,
    ],
  ];
}

function dataProviderForSetsFalse(): Array<unknown> {
  return [
    [
      new Set([1]),
      () => false,
    ],
    [
      new Set([1]),
      (x: number) => x === 2,
    ],
    [
      new Set([1, 2, 3]),
      (x: number) => x >= 4,
    ],
    [
      new Set([1, 2, 3]),
      (x: number) => x < 3,
    ],
    [
      new Set(['a']),
      (x: string) => x === 'b',
    ],
    [
      new Set(['a', 'B', 'C']),
      (x: string) => x.toLowerCase() === x,
    ],
    [
      new Set(['a', 'B', 'C']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      new Set(['OS', 'PHP', 'python']),
      (x: string) => x.toUpperCase() === x,
    ],
    [
      new Set([[1, 2, 3], ['a', 'b'], [1.1, 2.2, 3.3]]),
      (x: Array<number>) => x.length === 3,
    ],
  ];
}

function dataProviderForMapsFalse(): Array<unknown> {
  return [
    [
      createMapFixture([1]),
      () => false,
    ],
    [
      createMapFixture([1]),
      (x: [unknown, number]) => x[1] === 2,
    ],
    [
      createMapFixture([1, 2, 3]),
      (x: [unknown, number]) => x[1] >= 4,
    ],
    [
      createMapFixture([1, 2, 3]),
      (x: [unknown, number]) => x[1] < 3,
    ],
    [
      createMapFixture(['a']),
      (x: [unknown, string]) => x[1] === 'b',
    ],
    [
      createMapFixture(['a', 'B', 'C']),
      (x: [unknown, string]) => x[1].toLowerCase() === x[1],
    ],
    [
      createMapFixture(['a', 'B', 'C']),
      (x: [unknown, string]) => x[1].toUpperCase() === x[1],
    ],
    [
      createMapFixture(['OS', 'PHP', 'python']),
      (x: [unknown, string]) => x[1].toUpperCase() === x[1],
    ],
    [
      createMapFixture([[1, 2, 3], ['a', 'b'], [1.1, 2.2, 3.3]]),
      (x: [unknown, Array<number>]) => x[1].length === 3,
    ],
  ];
}
