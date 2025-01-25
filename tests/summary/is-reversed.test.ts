import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  // @ts-ignore
} from '../fixture';
import { summary } from '../../src';

describe.each([
  ...dataProviderForArraysTrue(),
  ...dataProviderForGeneratorsTrue(),
  ...dataProviderForIterablesTrue(),
  ...dataProviderForIteratorsTrue(),
  ...dataProviderForStringsTrue(),
  ...dataProviderForSetsTrue(),
])(
  "Summary Is Reversed Test True",
  (input) => {
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
])(
  "Summary Is Reversed Async Test True",
  (input) => {
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
])(
  "Summary Is Reversed Test False",
  (input) => {
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
])(
  "Summary Is Reversed Async Test False",
  (input) => {
    it("", async () => {
      expect(await summary.isReversedAsync(input)).toBeFalsy();
    });
  }
);

function dataProviderForArraysTrue(): Array<[Array<any>]> {
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

function dataProviderForGeneratorsTrue(): Array<[Generator<any>]> {
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

function dataProviderForIterablesTrue(): Array<[Iterable<any>]> {
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

function dataProviderForIteratorsTrue(): Array<[Iterator<any>]> {
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

function dataProviderForStringsTrue(): Array<[string]> {
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

function dataProviderForSetsTrue(): Array<[Set<any>]> {
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

function dataProviderForAsyncGeneratorsTrue(): Array<[AsyncGenerator<any>]> {
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

function dataProviderForAsyncIterablesTrue(): Array<[AsyncIterable<any>]> {
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

function dataProviderForAsyncIteratorsTrue(): Array<[AsyncIterator<any>]> {
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

function dataProviderForArraysFalse(): Array<[Array<any>]> {
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

function dataProviderForGeneratorsFalse(): Array<[Generator<any>]> {
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

function dataProviderForIterablesFalse(): Array<[Iterable<any>]> {
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

function dataProviderForIteratorsFalse(): Array<[Iterator<any>]> {
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

function dataProviderForStringsFalse(): Array<[string]> {
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

function dataProviderForSetsFalse(): Array<[Set<any>]> {
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

function dataProviderForAsyncGeneratorsFalse(): Array<[AsyncGenerator<any>]> {
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

function dataProviderForAsyncIterablesFalse(): Array<[AsyncIterable<any>]> {
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

function dataProviderForAsyncIteratorsFalse(): Array<[AsyncIterator<any>]> {
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
