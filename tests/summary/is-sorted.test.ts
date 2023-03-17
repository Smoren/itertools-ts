// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from '../fixture';
import { Comparable, summary } from '../../src';

describe.each([
  ...dataProviderForArraysTrue(),
  ...dataProviderForGeneratorsTrue(),
  ...dataProviderForIterablesTrue(),
  ...dataProviderForIteratorsTrue(),
  ...dataProviderForStringsTrue(),
  ...dataProviderForSetsTrue(),
] as Array<[Iterable<Comparable>|Iterator<Comparable>, (item: unknown) => boolean]>)(
  "Summary Is Sorted Test True",
  (input: Iterable<Comparable>|Iterator<Comparable>) => {
    it("", () => {
      expect(summary.isSorted(input)).toBeTruthy();
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
] as Array<[Iterable<Comparable>|Iterator<Comparable>, (item: unknown) => boolean]>)(
  "Summary Is Sorted Test False",
  (input: Iterable<Comparable>|Iterator<Comparable>) => {
    it("", () => {
      expect(summary.isSorted(input)).toBeFalsy();
    });
  }
);

function dataProviderForArraysTrue(): Array<unknown> {
  return [
    [
      [],
    ],
    [
      [0],
    ],
    [
      [0, 1],
    ],
    [
      [0, 0],
    ],
    [
      [1, 1],
    ],
    [
      [1, 2, 3],
    ],
    [
      [2, 2, 2],
    ],
    [
      [2, 2, 3],
    ],
    [
      ['a', 'b', 'c'],
    ],
    [
      [['a'], ['b'], ['c']],
    ],
    [
      [['a', 'a'], ['b']],
    ],
    [
      [['a', 'a'], ['bb']],
    ],
  ];
}

function dataProviderForGeneratorsTrue(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
    ],
    [
      createGeneratorFixture([0]),
    ],
    [
      createGeneratorFixture([0, 1]),
    ],
    [
      createGeneratorFixture([0, 0]),
    ],
    [
      createGeneratorFixture([1, 1]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
    ],
    [
      createGeneratorFixture([2, 2, 2]),
    ],
    [
      createGeneratorFixture([2, 2, 3]),
    ],
    [
      createGeneratorFixture(['a', 'b', 'c']),
    ],
    [
      createGeneratorFixture([['a'], ['b'], ['c']]),
    ],
    [
      createGeneratorFixture([['a', 'a'], ['b']]),
    ],
    [
      createGeneratorFixture([['a', 'a'], ['bb']]),
    ],
  ];
}

function dataProviderForIterablesTrue(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
    ],
    [
      createIterableFixture([0]),
    ],
    [
      createIterableFixture([0, 1]),
    ],
    [
      createIterableFixture([0, 0]),
    ],
    [
      createIterableFixture([1, 1]),
    ],
    [
      createIterableFixture([1, 2, 3]),
    ],
    [
      createIterableFixture([2, 2, 2]),
    ],
    [
      createIterableFixture([2, 2, 3]),
    ],
    [
      createIterableFixture(['a', 'b', 'c']),
    ],
    [
      createIterableFixture([['a'], ['b'], ['c']]),
    ],
    [
      createIterableFixture([['a', 'a'], ['b']]),
    ],
    [
      createIterableFixture([['a', 'a'], ['bb']]),
    ],
  ];
}

function dataProviderForIteratorsTrue(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
    ],
    [
      createIteratorFixture([0]),
    ],
    [
      createIteratorFixture([0, 1]),
    ],
    [
      createIteratorFixture([0, 0]),
    ],
    [
      createIteratorFixture([1, 1]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
    ],
    [
      createIteratorFixture([2, 2, 2]),
    ],
    [
      createIteratorFixture([2, 2, 3]),
    ],
    [
      createIteratorFixture(['a', 'b', 'c']),
    ],
    [
      createIteratorFixture([['a'], ['b'], ['c']]),
    ],
    [
      createIteratorFixture([['a', 'a'], ['b']]),
    ],
    [
      createIteratorFixture([['a', 'a'], ['bb']]),
    ],
  ];
}

function dataProviderForStringsTrue(): Array<unknown> {
  return [
    [
      '',
    ],
    [
      '0',
    ],
    [
      '01',
    ],
    [
      '00',
    ],
    [
      '11',
    ],
    [
      '123',
    ],
    [
      '222',
    ],
    [
      '223',
    ],
    [
      'abc',
    ],
  ];
}

function dataProviderForSetsTrue(): Array<unknown> {
  return [
    [
      new Set([]),
    ],
    [
      new Set([0]),
    ],
    [
      new Set([0, 1]),
    ],
    [
      new Set([0, 0]),
    ],
    [
      new Set([1, 1]),
    ],
    [
      new Set([1, 2, 3]),
    ],
    [
      new Set([2, 2, 2]),
    ],
    [
      new Set([2, 2, 3]),
    ],
    [
      new Set(['a', 'b', 'c']),
    ],
    [
      new Set([['a'], ['b'], ['c']]),
    ],
    [
      new Set([['a', 'a'], ['b']]),
    ],
    [
      new Set([['a', 'a'], ['bb']]),
    ],
  ];
}

function dataProviderForArraysFalse(): Array<unknown> {
  return [
    [
      [0, -1],
    ],
    [
      [1, 0],
    ],
    [
      [3, 2, 1],
    ],
    [
      [2, 3, 1],
    ],
    [
      ['b', 'a', 'c'],
    ],
    [
      [['b'], ['a'], ['c']],
    ],
    [
      [['b'], ['a', 'a']],
    ],
  ];
}

function dataProviderForGeneratorsFalse(): Array<unknown> {
  return [
    [
      createGeneratorFixture([0, -1]),
    ],
    [
      createGeneratorFixture([1, 0]),
    ],
    [
      createGeneratorFixture([3, 2, 1]),
    ],
    [
      createGeneratorFixture([2, 3, 1]),
    ],
    [
      createGeneratorFixture(['b', 'a', 'c']),
    ],
    [
      createGeneratorFixture([['b'], ['a'], ['c']]),
    ],
    [
      createGeneratorFixture([['b'], ['a', 'a']]),
    ],
  ];
}

function dataProviderForIterablesFalse(): Array<unknown> {
  return [
    [
      createIterableFixture([0, -1]),
    ],
    [
      createIterableFixture([1, 0]),
    ],
    [
      createIterableFixture([3, 2, 1]),
    ],
    [
      createIterableFixture([2, 3, 1]),
    ],
    [
      createIterableFixture(['b', 'a', 'c']),
    ],
    [
      createIterableFixture([['b'], ['a'], ['c']]),
    ],
    [
      createIterableFixture([['b'], ['a', 'a']]),
    ],
  ];
}

function dataProviderForIteratorsFalse(): Array<unknown> {
  return [
    [
      createIteratorFixture([0, -1]),
    ],
    [
      createIteratorFixture([1, 0]),
    ],
    [
      createIteratorFixture([3, 2, 1]),
    ],
    [
      createIteratorFixture([2, 3, 1]),
    ],
    [
      createIteratorFixture(['b', 'a', 'c']),
    ],
    [
      createIteratorFixture([['b'], ['a'], ['c']]),
    ],
    [
      createIteratorFixture([['b'], ['a', 'a']]),
    ],
  ];
}

function dataProviderForStringsFalse(): Array<unknown> {
  return [
    [
      '10',
    ],
    [
      '321',
    ],
    [
      '231',
    ],
    [
      'bac',
    ],
    [
      'cab',
    ],
    [
      'cba',
    ],
  ];
}

function dataProviderForSetsFalse(): Array<unknown> {
  return [
    [
      new Set([0, -1]),
    ],
    [
      new Set([1, 0]),
    ],
    [
      new Set([3, 2, 1]),
    ],
    [
      new Set([2, 3, 1]),
    ],
    [
      new Set(['b', 'a', 'c']),
    ],
    [
      new Set([['b'], ['a'], ['c']]),
    ],
    [
      new Set([['b'], ['a', 'a']]),
    ],
  ];
}
