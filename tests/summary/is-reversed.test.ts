import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  // @ts-ignore
} from '../fixture';
import { Comparable, summary } from '../../src';

describe.each([
  ...dataProviderForArraysTrue(),
  ...dataProviderForGeneratorsTrue(),
  ...dataProviderForIterablesTrue(),
  ...dataProviderForIteratorsTrue(),
  ...dataProviderForStringsTrue(),
  ...dataProviderForSetsTrue(),
] as Array<[Iterable<Comparable>|Iterator<Comparable>]>)(
  "Summary Is Reversed Test True",
  (input: Iterable<Comparable>|Iterator<Comparable>) => {
    it("", () => {
      expect(summary.isReversed(input)).toBeTruthy();
    });
  }
);

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
] as Array<[
  AsyncIterable<Comparable>|AsyncIterator<Comparable>|Iterable<Comparable>|Iterator<Comparable>
]>)(
  "Summary Is Reversed Async Test True",
  (
    input: AsyncIterable<Comparable>|AsyncIterator<Comparable>|Iterable<Comparable>|Iterator<Comparable>
  ) => {
    it("", async () => {
      expect(await summary.isReversedAsync(input)).toBeTruthy();
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
] as Array<[Iterable<Comparable>|Iterator<Comparable>]>)(
  "Summary Is Reversed Test False",
  (input: Iterable<Comparable>|Iterator<Comparable>) => {
    it("", () => {
      expect(summary.isReversed(input)).toBeFalsy();
    });
  }
);

describe.each([
  ...dataProviderForAsyncGeneratorsFalse(),
  ...dataProviderForAsyncIterablesFalse(),
  ...dataProviderForAsyncIteratorsFalse(),
  ...dataProviderForArraysFalse(),
  ...dataProviderForGeneratorsFalse(),
  ...dataProviderForIterablesFalse(),
  ...dataProviderForIteratorsFalse(),
  ...dataProviderForStringsFalse(),
  ...dataProviderForSetsFalse(),
] as Array<[
  AsyncIterable<Comparable>|AsyncIterator<Comparable>|Iterable<Comparable>|Iterator<Comparable>
]>)(
  "Summary Is Reversed Async Test False",
  (
    input: AsyncIterable<Comparable>|AsyncIterator<Comparable>|Iterable<Comparable>|Iterator<Comparable>
  ) => {
    it("", async () => {
      expect(await summary.isReversedAsync(input)).toBeFalsy();
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
      [1],
    ],
    [
      [1, 0],
    ],
    [
      [-1, -2],
    ],
    [
      [0, 0],
    ],
    [
      [1, 1],
    ],
    [
      [1, 0],
    ],
    [
      [3, 2, 1],
    ],
    [
      [2, 2, 2],
    ],
    [
      [['b'], ['a', 'a']],
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
      createGeneratorFixture([1]),
    ],
    [
      createGeneratorFixture([1, 0]),
    ],
    [
      createGeneratorFixture([-1, -2]),
    ],
    [
      createGeneratorFixture([0, 0]),
    ],
    [
      createGeneratorFixture([1, 1]),
    ],
    [
      createGeneratorFixture([1, 0]),
    ],
    [
      createGeneratorFixture([3, 2, 1]),
    ],
    [
      createGeneratorFixture([2, 2, 2]),
    ],
    [
      createGeneratorFixture([['b'], ['a', 'a']]),
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
      createIterableFixture([1]),
    ],
    [
      createIterableFixture([1, 0]),
    ],
    [
      createIterableFixture([-1, -2]),
    ],
    [
      createIterableFixture([0, 0]),
    ],
    [
      createIterableFixture([1, 1]),
    ],
    [
      createIterableFixture([1, 0]),
    ],
    [
      createIterableFixture([3, 2, 1]),
    ],
    [
      createIterableFixture([2, 2, 2]),
    ],
    [
      createIterableFixture([['b'], ['a', 'a']]),
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
      createIteratorFixture([1]),
    ],
    [
      createIteratorFixture([1, 0]),
    ],
    [
      createIteratorFixture([-1, -2]),
    ],
    [
      createIteratorFixture([0, 0]),
    ],
    [
      createIteratorFixture([1, 1]),
    ],
    [
      createIteratorFixture([1, 0]),
    ],
    [
      createIteratorFixture([3, 2, 1]),
    ],
    [
      createIteratorFixture([2, 2, 2]),
    ],
    [
      createIteratorFixture([['b'], ['a', 'a']]),
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
      '1',
    ],
    [
      '10',
    ],
    [
      '00',
    ],
    [
      '11',
    ],
    [
      '10',
    ],
    [
      '321',
    ],
    [
      '222',
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
      new Set([1]),
    ],
    [
      new Set([1, 0]),
    ],
    [
      new Set([-1, -2]),
    ],
    [
      new Set([0, 0]),
    ],
    [
      new Set([1, 1]),
    ],
    [
      new Set([1, 0]),
    ],
    [
      new Set([3, 2, 1]),
    ],
    [
      new Set([2, 2, 2]),
    ],
    [
      new Set([['b'], ['a', 'a']]),
    ],
  ];
}

function dataProviderForAsyncGeneratorsTrue(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([]),
    ],
    [
      createAsyncGeneratorFixture([0]),
    ],
    [
      createAsyncGeneratorFixture([1]),
    ],
    [
      createAsyncGeneratorFixture([1, 0]),
    ],
    [
      createAsyncGeneratorFixture([-1, -2]),
    ],
    [
      createAsyncGeneratorFixture([0, 0]),
    ],
    [
      createAsyncGeneratorFixture([1, 1]),
    ],
    [
      createAsyncGeneratorFixture([1, 0]),
    ],
    [
      createAsyncGeneratorFixture([3, 2, 1]),
    ],
    [
      createAsyncGeneratorFixture([2, 2, 2]),
    ],
    [
      createAsyncGeneratorFixture([['b'], ['a', 'a']]),
    ],
  ];
}

function dataProviderForAsyncIterablesTrue(): Array<unknown> {
  return [
    [
      createAsyncIterableFixture([]),
    ],
    [
      createAsyncIterableFixture([0]),
    ],
    [
      createAsyncIterableFixture([1]),
    ],
    [
      createAsyncIterableFixture([1, 0]),
    ],
    [
      createAsyncIterableFixture([-1, -2]),
    ],
    [
      createAsyncIterableFixture([0, 0]),
    ],
    [
      createAsyncIterableFixture([1, 1]),
    ],
    [
      createAsyncIterableFixture([1, 0]),
    ],
    [
      createAsyncIterableFixture([3, 2, 1]),
    ],
    [
      createAsyncIterableFixture([2, 2, 2]),
    ],
    [
      createAsyncIterableFixture([['b'], ['a', 'a']]),
    ],
  ];
}

function dataProviderForAsyncIteratorsTrue(): Array<unknown> {
  return [
    [
      createAsyncIteratorFixture([]),
    ],
    [
      createAsyncIteratorFixture([0]),
    ],
    [
      createAsyncIteratorFixture([1]),
    ],
    [
      createAsyncIteratorFixture([1, 0]),
    ],
    [
      createAsyncIteratorFixture([-1, -2]),
    ],
    [
      createAsyncIteratorFixture([0, 0]),
    ],
    [
      createAsyncIteratorFixture([1, 1]),
    ],
    [
      createAsyncIteratorFixture([1, 0]),
    ],
    [
      createAsyncIteratorFixture([3, 2, 1]),
    ],
    [
      createAsyncIteratorFixture([2, 2, 2]),
    ],
    [
      createAsyncIteratorFixture([['b'], ['a', 'a']]),
    ],
  ];
}

function dataProviderForArraysFalse(): Array<unknown> {
  return [
    [
      [0, 1],
    ],
    [
      [null, 1],
    ],
    [
      [1, 2, 3],
    ],
    [
      [2, 2, 3],
    ],
    [
      [2, 3, 1],
    ],
    [
      ['a', 'b', 'c'],
    ],
    [
      ['b', 'a', 'c'],
    ],
    [
      [['a'], ['b'], ['c']],
    ],
    [
      [['b'], ['a'], ['c']],
    ],
    [
      [['a', 'a'], ['b']],
    ],
    [
      [['a', 'a'], ['bb']],
    ],
  ];
}

function dataProviderForGeneratorsFalse(): Array<unknown> {
  return [
    [
      createGeneratorFixture([0, 1]),
    ],
    [
      createGeneratorFixture([null, 1]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
    ],
    [
      createGeneratorFixture([2, 2, 3]),
    ],
    [
      createGeneratorFixture([2, 3, 1]),
    ],
    [
      createGeneratorFixture(['a', 'b', 'c']),
    ],
    [
      createGeneratorFixture(['b', 'a', 'c']),
    ],
    [
      createGeneratorFixture([['a'], ['b'], ['c']]),
    ],
    [
      createGeneratorFixture([['b'], ['a'], ['c']]),
    ],
    [
      createGeneratorFixture([['a', 'a'], ['b']]),
    ],
    [
      createGeneratorFixture([['a', 'a'], ['bb']]),
    ],
  ];
}

function dataProviderForIterablesFalse(): Array<unknown> {
  return [
    [
      createIterableFixture([0, 1]),
    ],
    [
      createIterableFixture([null, 1]),
    ],
    [
      createIterableFixture([1, 2, 3]),
    ],
    [
      createIterableFixture([2, 2, 3]),
    ],
    [
      createIterableFixture([2, 3, 1]),
    ],
    [
      createIterableFixture(['a', 'b', 'c']),
    ],
    [
      createIterableFixture(['b', 'a', 'c']),
    ],
    [
      createIterableFixture([['a'], ['b'], ['c']]),
    ],
    [
      createIterableFixture([['b'], ['a'], ['c']]),
    ],
    [
      createIterableFixture([['a', 'a'], ['b']]),
    ],
    [
      createIterableFixture([['a', 'a'], ['bb']]),
    ],
  ];
}

function dataProviderForIteratorsFalse(): Array<unknown> {
  return [
    [
      createIteratorFixture([0, 1]),
    ],
    [
      createIteratorFixture([null, 1]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
    ],
    [
      createIteratorFixture([2, 2, 3]),
    ],
    [
      createIteratorFixture([2, 3, 1]),
    ],
    [
      createIteratorFixture(['a', 'b', 'c']),
    ],
    [
      createIteratorFixture(['b', 'a', 'c']),
    ],
    [
      createIteratorFixture([['a'], ['b'], ['c']]),
    ],
    [
      createIteratorFixture([['b'], ['a'], ['c']]),
    ],
    [
      createIteratorFixture([['a', 'a'], ['b']]),
    ],
    [
      createIteratorFixture([['a', 'a'], ['bb']]),
    ],
  ];
}

function dataProviderForStringsFalse(): Array<unknown> {
  return [
    [
      '01',
    ],
    [
      '123',
    ],
    [
      '223',
    ],
    [
      '231',
    ],
    [
      'abc',
    ],
    [
      'bac',
    ],
    [
      'cab',
    ],
  ];
}

function dataProviderForSetsFalse(): Array<unknown> {
  return [
    [
      new Set([0, 1]),
    ],
    [
      new Set([null, 1]),
    ],
    [
      new Set([1, 2, 3]),
    ],
    [
      new Set([2, 2, 3]),
    ],
    [
      new Set([2, 3, 1]),
    ],
    [
      new Set(['a', 'b', 'c']),
    ],
    [
      new Set(['b', 'a', 'c']),
    ],
    [
      new Set([['a'], ['b'], ['c']]),
    ],
    [
      new Set([['b'], ['a'], ['c']]),
    ],
    [
      new Set([['a', 'a'], ['b']]),
    ],
    [
      new Set([['a', 'a'], ['bb']]),
    ],
  ];
}

function dataProviderForAsyncGeneratorsFalse(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([0, 1]),
    ],
    [
      createAsyncGeneratorFixture([null, 1]),
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
    ],
    [
      createAsyncGeneratorFixture([2, 2, 3]),
    ],
    [
      createAsyncGeneratorFixture([2, 3, 1]),
    ],
    [
      createAsyncGeneratorFixture(['a', 'b', 'c']),
    ],
    [
      createAsyncGeneratorFixture(['b', 'a', 'c']),
    ],
    [
      createAsyncGeneratorFixture([['a'], ['b'], ['c']]),
    ],
    [
      createAsyncGeneratorFixture([['b'], ['a'], ['c']]),
    ],
    [
      createAsyncGeneratorFixture([['a', 'a'], ['b']]),
    ],
    [
      createAsyncGeneratorFixture([['a', 'a'], ['bb']]),
    ],
  ];
}

function dataProviderForAsyncIterablesFalse(): Array<unknown> {
  return [
    [
      createAsyncIterableFixture([0, 1]),
    ],
    [
      createAsyncIterableFixture([null, 1]),
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
    ],
    [
      createAsyncIterableFixture([2, 2, 3]),
    ],
    [
      createAsyncIterableFixture([2, 3, 1]),
    ],
    [
      createAsyncIterableFixture(['a', 'b', 'c']),
    ],
    [
      createAsyncIterableFixture(['b', 'a', 'c']),
    ],
    [
      createAsyncIterableFixture([['a'], ['b'], ['c']]),
    ],
    [
      createAsyncIterableFixture([['b'], ['a'], ['c']]),
    ],
    [
      createAsyncIterableFixture([['a', 'a'], ['b']]),
    ],
    [
      createAsyncIterableFixture([['a', 'a'], ['bb']]),
    ],
  ];
}

function dataProviderForAsyncIteratorsFalse(): Array<unknown> {
  return [
    [
      createAsyncIteratorFixture([0, 1]),
    ],
    [
      createAsyncIteratorFixture([null, 1]),
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
    ],
    [
      createAsyncIteratorFixture([2, 2, 3]),
    ],
    [
      createAsyncIteratorFixture([2, 3, 1]),
    ],
    [
      createAsyncIteratorFixture(['a', 'b', 'c']),
    ],
    [
      createAsyncIteratorFixture(['b', 'a', 'c']),
    ],
    [
      createAsyncIteratorFixture([['a'], ['b'], ['c']]),
    ],
    [
      createAsyncIteratorFixture([['b'], ['a'], ['c']]),
    ],
    [
      createAsyncIteratorFixture([['a', 'a'], ['b']]),
    ],
    [
      createAsyncIteratorFixture([['a', 'a'], ['bb']]),
    ],
  ];
}
