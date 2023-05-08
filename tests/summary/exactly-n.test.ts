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
  ...dataProviderForArraysExactlyN(),
  ...dataProviderForGeneratorsExactlyN(),
  ...dataProviderForIterablesExactlyN(),
  ...dataProviderForIteratorsExactlyN(),
  ...dataProviderForStringsExactlyN(),
  ...dataProviderForSetsExactlyN(),
] as Array<[Iterable<unknown>|Iterator<unknown>, number]>)(
  "Summary Exactly N Test When N Matches",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    n: number
  ) => {
    it("", () => {
      expect(summary.exactlyN(input, n)).toBeTruthy();
    });
  }
);

describe.each([
  ...dataProviderForArraysExactlyNotN(),
  ...dataProviderForGeneratorsExactlyNotN(),
  ...dataProviderForIterablesExactlyNotN(),
  ...dataProviderForIteratorsExactlyNotN(),
  ...dataProviderForStringsExactlyNotN(),
  ...dataProviderForSetsExactlyNotN(),
] as Array<[Iterable<unknown>|Iterator<unknown>, number]>)(
  "Summary Exactly N Test When N Doesn't Match",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    n: number
  ) => {
    it("", () => {
      expect(summary.exactlyN(input, n)).toBeFalsy();
    });
  }
);

describe.each([
  ...dataProviderForAsyncGeneratorsExactlyN(),
  ...dataProviderForAsyncIterablesExactlyN(),
  ...dataProviderForAsyncIteratorsExactlyN(),
  ...dataProviderForArraysExactlyN(),
  ...dataProviderForGeneratorsExactlyN(),
  ...dataProviderForIterablesExactlyN(),
  ...dataProviderForIteratorsExactlyN(),
  ...dataProviderForStringsExactlyN(),
  ...dataProviderForSetsExactlyN(),
] as Array<[
    AsyncIterable<unknown>|AsyncIterator<unknown>,
    number
]>)(
  "Summary Exactly N Async Test When N Matches",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>,
    n: number
  ) => {
    it("", async () => {
      expect(await summary.exactlyNAsync(input, n)).toBeTruthy();
    });
  }
);

describe.each([
  ...dataProviderForAsyncGeneratorsExactlyNotN(),
  ...dataProviderForAsyncIterablesExactlyNotN(),
  ...dataProviderForAsyncIteratorsExactlyNotN(),
  ...dataProviderForArraysExactlyNotN(),
  ...dataProviderForGeneratorsExactlyNotN(),
  ...dataProviderForIterablesExactlyNotN(),
  ...dataProviderForIteratorsExactlyNotN(),
  ...dataProviderForStringsExactlyNotN(),
  ...dataProviderForSetsExactlyNotN(),
] as Array<[
    AsyncIterable<unknown>|AsyncIterator<unknown>,
    number
]>)(
  "Summary Exactly N Async Test When N Doesn't Match",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>,
    n: number
  ) => {
    it("", async () => {
      expect(await summary.exactlyNAsync(input, n)).toBeFalsy();
    });
  }
);

function dataProviderForArraysExactlyN(): Array<unknown> {
  return [
    [
      [1],
      1,
    ],
    [
      [2],
      1,
    ],
    [
      ['a'],
      1,
    ],
    [
      [[5]],
      1,
    ],
    [
      [new Object()],
      1,
    ],
    [
      [1, 2],
      2,
    ],
    [
      [1, 1, 1],
      3,
    ],
    [
      [1, 2.2, '3', 'four'],
      4,
    ],
    [
      [0],
      0,
    ],
    [
      [0, 0, 0, 34],
      1,
    ],
    [
      [true, true, false],
      2,
    ],
    [
      [false, false, true],
      1,
    ],
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      24,
    ],
  ];
}

function dataProviderForGeneratorsExactlyN(): Array<unknown> {
  return [
    [
      createGeneratorFixture([1]),
      1,
    ],
    [
      createGeneratorFixture([2]),
      1,
    ],
    [
      createGeneratorFixture(['a']),
      1,
    ],
    [
      createGeneratorFixture([[5]]),
      1,
    ],
    [
      createGeneratorFixture([new Object()]),
      1,
    ],
    [
      createGeneratorFixture([1, 2]),
      2,
    ],
    [
      createGeneratorFixture([1, 1, 1]),
      3,
    ],
    [
      createGeneratorFixture([1, 2.2, '3', 'four']),
      4,
    ],
    [
      createGeneratorFixture([0]),
      0,
    ],
    [
      createGeneratorFixture([0, 0, 0, 34]),
      1,
    ],
    [
      createGeneratorFixture([true, true, false]),
      2,
    ],
    [
      createGeneratorFixture([false, false, true]),
      1,
    ],
    [
      createGeneratorFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      24,
    ],
  ];
}

function dataProviderForIterablesExactlyN(): Array<unknown> {
  return [
    [
      createIterableFixture([1]),
      1,
    ],
    [
      createIterableFixture([2]),
      1,
    ],
    [
      createIterableFixture(['a']),
      1,
    ],
    [
      createIterableFixture([[5]]),
      1,
    ],
    [
      createIterableFixture([new Object()]),
      1,
    ],
    [
      createIterableFixture([1, 2]),
      2,
    ],
    [
      createIterableFixture([1, 1, 1]),
      3,
    ],
    [
      createIterableFixture([1, 2.2, '3', 'four']),
      4,
    ],
    [
      createIterableFixture([0]),
      0,
    ],
    [
      createIterableFixture([0, 0, 0, 34]),
      1,
    ],
    [
      createIterableFixture([true, true, false]),
      2,
    ],
    [
      createIterableFixture([false, false, true]),
      1,
    ],
    [
      createIterableFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      24,
    ],
  ];
}

function dataProviderForIteratorsExactlyN(): Array<unknown> {
  return [
    [
      createIteratorFixture([1]),
      1,
    ],
    [
      createIteratorFixture([2]),
      1,
    ],
    [
      createIteratorFixture(['a']),
      1,
    ],
    [
      createIteratorFixture([[5]]),
      1,
    ],
    [
      createIteratorFixture([new Object()]),
      1,
    ],
    [
      createIteratorFixture([1, 2]),
      2,
    ],
    [
      createIteratorFixture([1, 1, 1]),
      3,
    ],
    [
      createIteratorFixture([1, 2.2, '3', 'four']),
      4,
    ],
    [
      createIteratorFixture([0]),
      0,
    ],
    [
      createIteratorFixture([0, 0, 0, 34]),
      1,
    ],
    [
      createIteratorFixture([true, true, false]),
      2,
    ],
    [
      createIteratorFixture([false, false, true]),
      1,
    ],
    [
      createIteratorFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      24,
    ],
  ];
}

function dataProviderForStringsExactlyN(): Array<unknown> {
  return [
    [
      [''],
      0,
    ],
    [
      ['a'],
      1,
    ],
    [
      ['abc'],
      1,
    ],
    [
      ['a', 'b', 'c'],
      3,
    ],
    [
      ['true'],
      1,
    ],
    [
      ['false'],
      1,
    ],
  ];
}

function dataProviderForSetsExactlyN(): Array<unknown> {
  return [
    [
      new Set([1]),
      1,
    ],
    [
      new Set([2]),
      1,
    ],
    [
      new Set(['a']),
      1,
    ],
    [
      new Set([[5]]),
      1,
    ],
    [
      new Set([new Object()]),
      1,
    ],
    [
      new Set([1, 2]),
      2,
    ],
    [
      new Set([1, 2.2, '3', 'four']),
      4,
    ],
    [
      new Set([0]),
      0,
    ],
  ];
}

function dataProviderForArraysExactlyNotN(): Array<unknown> {
  return [
    [
      [1],
      0,
    ],
    [
      [1],
      2,
    ],
    [
      ['a'],
      2,
    ],
    [
      [[5]],
      6,
    ],
    [
      [new Object()],
      0,
    ],
    [
      [1, 2],
      1,
    ],
    [
      [1, 2],
      3,
    ],
    [
      [1, 1, 1],
      2,
    ],
    [
      [1, 1, 1],
      4,
    ],
    [
      [1, 2.2, '3', 'four'],
      3,
    ],
    [
      [0],
      1,
    ],
    [
      [0, 0, 0, 34],
      4,
    ],
    [
      [true, true, false],
      3,
    ],
    [
      [false, false, true],
      2,
    ],
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      10,
    ],
  ];
}

function dataProviderForGeneratorsExactlyNotN(): Array<unknown> {
  return [
    [
      createGeneratorFixture([1]),
      0,
    ],
    [
      createGeneratorFixture([1]),
      2,
    ],
    [
      createGeneratorFixture(['a']),
      2,
    ],
    [
      createGeneratorFixture([[5]]),
      6,
    ],
    [
      createGeneratorFixture([new Object()]),
      0,
    ],
    [
      createGeneratorFixture([1, 2]),
      1,
    ],
    [
      createGeneratorFixture([1, 2]),
      3,
    ],
    [
      createGeneratorFixture([1, 1, 1]),
      2,
    ],
    [
      createGeneratorFixture([1, 1, 1]),
      4,
    ],
    [
      createGeneratorFixture([1, 2.2, '3', 'four']),
      3,
    ],
    [
      createGeneratorFixture([0]),
      1,
    ],
    [
      createGeneratorFixture([0, 0, 0, 34]),
      4,
    ],
    [
      createGeneratorFixture([true, true, false]),
      3,
    ],
    [
      createGeneratorFixture([false, false, true]),
      2,
    ],
    [
      createGeneratorFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      10,
    ],
  ];
}

function dataProviderForIterablesExactlyNotN(): Array<unknown> {
  return [
    [
      createIterableFixture([1]),
      0,
    ],
    [
      createIterableFixture([1]),
      2,
    ],
    [
      createIterableFixture(['a']),
      2,
    ],
    [
      createIterableFixture([[5]]),
      6,
    ],
    [
      createIterableFixture([new Object()]),
      0,
    ],
    [
      createIterableFixture([1, 2]),
      1,
    ],
    [
      createIterableFixture([1, 2]),
      3,
    ],
    [
      createIterableFixture([1, 1, 1]),
      2,
    ],
    [
      createIterableFixture([1, 1, 1]),
      4,
    ],
    [
      createIterableFixture([1, 2.2, '3', 'four']),
      3,
    ],
    [
      createIterableFixture([0]),
      1,
    ],
    [
      createIterableFixture([0, 0, 0, 34]),
      4,
    ],
    [
      createIterableFixture([true, true, false]),
      3,
    ],
    [
      createIterableFixture([false, false, true]),
      2,
    ],
    [
      createIterableFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      10,
    ],
  ];
}

function dataProviderForIteratorsExactlyNotN(): Array<unknown> {
  return [
    [
      createIteratorFixture([1]),
      0,
    ],
    [
      createIteratorFixture([1]),
      2,
    ],
    [
      createIteratorFixture(['a']),
      2,
    ],
    [
      createIteratorFixture([[5]]),
      6,
    ],
    [
      createIteratorFixture([new Object()]),
      0,
    ],
    [
      createIteratorFixture([1, 2]),
      1,
    ],
    [
      createIteratorFixture([1, 2]),
      3,
    ],
    [
      createIteratorFixture([1, 1, 1]),
      2,
    ],
    [
      createIteratorFixture([1, 1, 1]),
      4,
    ],
    [
      createIteratorFixture([1, 2.2, '3', 'four']),
      3,
    ],
    [
      createIteratorFixture([0]),
      1,
    ],
    [
      createIteratorFixture([0, 0, 0, 34]),
      4,
    ],
    [
      createIteratorFixture([true, true, false]),
      3,
    ],
    [
      createIteratorFixture([false, false, true]),
      2,
    ],
    [
      createIteratorFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      10,
    ],
  ];
}

function dataProviderForStringsExactlyNotN(): Array<unknown> {
  return [
    [
      [''],
      1,
    ],
    [
      ['a'],
      0,
    ],
    [
      ['abc'],
      3,
    ],
    [
      ['a', 'b', 'c'],
      1,
    ],
    [
      ['true'],
      0,
    ],
    [
      ['false'],
      0,
    ],
  ];
}

function dataProviderForSetsExactlyNotN(): Array<unknown> {
  return [
    [
      new Set([1]),
      0,
    ],
    [
      new Set([1]),
      2,
    ],
    [
      new Set(['a']),
      2,
    ],
    [
      new Set([[5]]),
      6,
    ],
    [
      new Set([new Object()]),
      0,
    ],
    [
      new Set([1, 2]),
      1,
    ],
    [
      new Set([1, 2]),
      3,
    ],
    [
      new Set([1, 1, 1]),
      2,
    ],
    [
      new Set([1, 1, 1]),
      4,
    ],
    [
      new Set([1, 2.2, '3', 'four']),
      3,
    ],
    [
      new Set([0]),
      1,
    ],
    [
      new Set([0, 0, 0, 34]),
      4,
    ],
    [
      new Set([true, true, false]),
      3,
    ],
    [
      new Set([false, false, true]),
      2,
    ],
    [
      new Set([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      10,
    ],
  ];
}

function dataProviderForAsyncGeneratorsExactlyN(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([1]),
      1,
    ],
    [
      createAsyncGeneratorFixture([2]),
      1,
    ],
    [
      createAsyncGeneratorFixture(['a']),
      1,
    ],
    [
      createAsyncGeneratorFixture([[5]]),
      1,
    ],
    [
      createAsyncGeneratorFixture([new Object()]),
      1,
    ],
    [
      createAsyncGeneratorFixture([1, 2]),
      2,
    ],
    [
      createAsyncGeneratorFixture([1, 1, 1]),
      3,
    ],
    [
      createAsyncGeneratorFixture([1, 2.2, '3', 'four']),
      4,
    ],
    [
      createAsyncGeneratorFixture([0]),
      0,
    ],
    [
      createAsyncGeneratorFixture([0, 0, 0, 34]),
      1,
    ],
    [
      createAsyncGeneratorFixture([true, true, false]),
      2,
    ],
    [
      createAsyncGeneratorFixture([false, false, true]),
      1,
    ],
    [
      createAsyncGeneratorFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      24,
    ],
  ];
}

function dataProviderForAsyncIterablesExactlyN(): Array<unknown> {
  return [
    [
      createAsyncIterableFixture([1]),
      1,
    ],
    [
      createAsyncIterableFixture([2]),
      1,
    ],
    [
      createAsyncIterableFixture(['a']),
      1,
    ],
    [
      createAsyncIterableFixture([[5]]),
      1,
    ],
    [
      createAsyncIterableFixture([new Object()]),
      1,
    ],
    [
      createAsyncIterableFixture([1, 2]),
      2,
    ],
    [
      createAsyncIterableFixture([1, 1, 1]),
      3,
    ],
    [
      createAsyncIterableFixture([1, 2.2, '3', 'four']),
      4,
    ],
    [
      createAsyncIterableFixture([0]),
      0,
    ],
    [
      createAsyncIterableFixture([0, 0, 0, 34]),
      1,
    ],
    [
      createAsyncIterableFixture([true, true, false]),
      2,
    ],
    [
      createAsyncIterableFixture([false, false, true]),
      1,
    ],
    [
      createAsyncIterableFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      24,
    ],
  ];
}

function dataProviderForAsyncIteratorsExactlyN(): Array<unknown> {
  return [
    [
      createAsyncIteratorFixture([1]),
      1,
    ],
    [
      createAsyncIteratorFixture([2]),
      1,
    ],
    [
      createAsyncIteratorFixture(['a']),
      1,
    ],
    [
      createAsyncIteratorFixture([[5]]),
      1,
    ],
    [
      createAsyncIteratorFixture([new Object()]),
      1,
    ],
    [
      createAsyncIteratorFixture([1, 2]),
      2,
    ],
    [
      createAsyncIteratorFixture([1, 1, 1]),
      3,
    ],
    [
      createAsyncIteratorFixture([1, 2.2, '3', 'four']),
      4,
    ],
    [
      createAsyncIteratorFixture([0]),
      0,
    ],
    [
      createAsyncIteratorFixture([0, 0, 0, 34]),
      1,
    ],
    [
      createAsyncIteratorFixture([true, true, false]),
      2,
    ],
    [
      createAsyncIteratorFixture([false, false, true]),
      1,
    ],
    [
      createAsyncIteratorFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      24,
    ],
  ];
}

function dataProviderForAsyncGeneratorsExactlyNotN(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([1]),
      0,
    ],
    [
      createAsyncGeneratorFixture([1]),
      2,
    ],
    [
      createAsyncGeneratorFixture(['a']),
      2,
    ],
    [
      createAsyncGeneratorFixture([[5]]),
      6,
    ],
    [
      createAsyncGeneratorFixture([new Object()]),
      0,
    ],
    [
      createAsyncGeneratorFixture([1, 2]),
      1,
    ],
    [
      createAsyncGeneratorFixture([1, 2]),
      3,
    ],
    [
      createAsyncGeneratorFixture([1, 1, 1]),
      2,
    ],
    [
      createAsyncGeneratorFixture([1, 1, 1]),
      4,
    ],
    [
      createAsyncGeneratorFixture([1, 2.2, '3', 'four']),
      3,
    ],
    [
      createAsyncGeneratorFixture([0]),
      1,
    ],
    [
      createAsyncGeneratorFixture([0, 0, 0, 34]),
      4,
    ],
    [
      createAsyncGeneratorFixture([true, true, false]),
      3,
    ],
    [
      createAsyncGeneratorFixture([false, false, true]),
      2,
    ],
    [
      createAsyncGeneratorFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      10,
    ],
  ];
}

function dataProviderForAsyncIterablesExactlyNotN(): Array<unknown> {
  return [
    [
      createAsyncIterableFixture([1]),
      0,
    ],
    [
      createAsyncIterableFixture([1]),
      2,
    ],
    [
      createAsyncIterableFixture(['a']),
      2,
    ],
    [
      createAsyncIterableFixture([[5]]),
      6,
    ],
    [
      createAsyncIterableFixture([new Object()]),
      0,
    ],
    [
      createAsyncIterableFixture([1, 2]),
      1,
    ],
    [
      createAsyncIterableFixture([1, 2]),
      3,
    ],
    [
      createAsyncIterableFixture([1, 1, 1]),
      2,
    ],
    [
      createAsyncIterableFixture([1, 1, 1]),
      4,
    ],
    [
      createAsyncIterableFixture([1, 2.2, '3', 'four']),
      3,
    ],
    [
      createAsyncIterableFixture([0]),
      1,
    ],
    [
      createAsyncIterableFixture([0, 0, 0, 34]),
      4,
    ],
    [
      createAsyncIterableFixture([true, true, false]),
      3,
    ],
    [
      createAsyncIterableFixture([false, false, true]),
      2,
    ],
    [
      createAsyncIterableFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      10,
    ],
  ];
}

function dataProviderForAsyncIteratorsExactlyNotN(): Array<unknown> {
  return [
    [
      createAsyncIteratorFixture([1]),
      0,
    ],
    [
      createAsyncIteratorFixture([1]),
      2,
    ],
    [
      createAsyncIteratorFixture(['a']),
      2,
    ],
    [
      createAsyncIteratorFixture([[5]]),
      6,
    ],
    [
      createAsyncIteratorFixture([new Object()]),
      0,
    ],
    [
      createAsyncIteratorFixture([1, 2]),
      1,
    ],
    [
      createAsyncIteratorFixture([1, 2]),
      3,
    ],
    [
      createAsyncIteratorFixture([1, 1, 1]),
      2,
    ],
    [
      createAsyncIteratorFixture([1, 1, 1]),
      4,
    ],
    [
      createAsyncIteratorFixture([1, 2.2, '3', 'four']),
      3,
    ],
    [
      createAsyncIteratorFixture([0]),
      1,
    ],
    [
      createAsyncIteratorFixture([0, 0, 0, 34]),
      4,
    ],
    [
      createAsyncIteratorFixture([true, true, false]),
      3,
    ],
    [
      createAsyncIteratorFixture([false, false, true]),
      2,
    ],
    [
      createAsyncIteratorFixture([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
      10,
    ],
  ];
}



