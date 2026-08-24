import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
} from '../fixture';
import { summary } from '../../src';
import { describe, expect, it } from '@jest/globals';

describe.each([
  ...dataProviderForArraysTrue(),
  ...dataProviderForGeneratorsTrue(),
  ...dataProviderForIterablesTrue(),
  ...dataProviderForIteratorsTrue(),
  ...dataProviderForStringsTrue(),
  ...dataProviderForSetsTrue(),
])(
  "Summary All Equal Test True",
  (input) => {
    it("", () => {
      expect(summary.allEqual(input)).toBeTruthy();
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
  "Summary All Equal Async Test True",
  (input) => {
    it("", async () => {
      expect(await summary.allEqualAsync(input)).toBeTruthy();
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
  "Summary All Equal Test False",
  (input) => {
    it("", () => {
      expect(summary.allEqual(input)).toBeFalsy();
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
  "Summary All Equal Async Test False",
  (input) => {
    it("", async () => {
      expect(await summary.allEqualAsync(input)).toBeFalsy();
    });
  }
);

function dataProviderForTrue(): Array<Array<unknown>> {
  const obj = {};
  const arr: Array<number> = [];

  return [
    [],
    [undefined],
    [null],
    [false],
    [true],
    [0],
    [1],
    [''],
    ['1'],
    [obj],
    [arr],
    [1, 1],
    [1, 1, 1],
    [undefined, undefined],
    [null, null],
    [false, false],
    ['a', 'a', 'a'],
    [0, 0, 0, 0],
    [obj, obj],
    [arr, arr, arr],
    [0, -0],
  ];
}

function dataProviderForFalse(): Array<Array<unknown>> {
  return [
    [1, 2],
    [1, 1, 2],
    [2, 1, 1],
    [1, '1'],
    [0, false],
    [null, undefined],
    ['a', 'b'],
    [true, false],
    [{}, {}],
    [[], []],
    [1, 1, 1, 2],
    [0, -0, 1],
    // NaN !== NaN under strict equality, consistent with summary.same()
    [NaN, NaN],
  ];
}

function dataProviderForArraysTrue(): Array<[Array<unknown>]> {
  return dataProviderForTrue().map((input) => [input]);
}

function dataProviderForArraysFalse(): Array<[Array<unknown>]> {
  return dataProviderForFalse().map((input) => [input]);
}

function dataProviderForGeneratorsTrue(): Array<[Generator<unknown>]> {
  return dataProviderForTrue().map((input) => [createGeneratorFixture(input)]);
}

function dataProviderForGeneratorsFalse(): Array<[Generator<unknown>]> {
  return dataProviderForFalse().map((input) => [createGeneratorFixture(input)]);
}

function dataProviderForIterablesTrue(): Array<[Iterable<unknown>]> {
  return dataProviderForTrue().map((input) => [createIterableFixture(input)]);
}

function dataProviderForIterablesFalse(): Array<[Iterable<unknown>]> {
  return dataProviderForFalse().map((input) => [createIterableFixture(input)]);
}

function dataProviderForIteratorsTrue(): Array<[Iterator<unknown>]> {
  return dataProviderForTrue().map((input) => [createIteratorFixture(input)]);
}

function dataProviderForIteratorsFalse(): Array<[Iterator<unknown>]> {
  return dataProviderForFalse().map((input) => [createIteratorFixture(input)]);
}

function dataProviderForAsyncGeneratorsTrue(): Array<[AsyncGenerator<unknown>]> {
  return dataProviderForTrue().map((input) => [createAsyncGeneratorFixture(input)]);
}

function dataProviderForAsyncGeneratorsFalse(): Array<[AsyncGenerator<unknown>]> {
  return dataProviderForFalse().map((input) => [createAsyncGeneratorFixture(input)]);
}

function dataProviderForAsyncIterablesTrue(): Array<[AsyncIterable<unknown>]> {
  return dataProviderForTrue().map((input) => [createAsyncIterableFixture(input)]);
}

function dataProviderForAsyncIterablesFalse(): Array<[AsyncIterable<unknown>]> {
  return dataProviderForFalse().map((input) => [createAsyncIterableFixture(input)]);
}

function dataProviderForAsyncIteratorsTrue(): Array<[AsyncIterator<unknown>]> {
  return dataProviderForTrue().map((input) => [createAsyncIteratorFixture(input)]);
}

function dataProviderForAsyncIteratorsFalse(): Array<[AsyncIterator<unknown>]> {
  return dataProviderForFalse().map((input) => [createAsyncIteratorFixture(input)]);
}

function dataProviderForStringsTrue(): Array<[string]> {
  return [
    [''],
    ['a'],
    ['aa'],
    ['aaaa'],
    ['1111'],
    ['    '],
  ];
}

function dataProviderForStringsFalse(): Array<[string]> {
  return [
    ['ab'],
    ['aab'],
    ['baa'],
    ['12345'],
    ['aaab'],
  ];
}

function dataProviderForSetsTrue(): Array<[Set<unknown>]> {
  return [
    [new Set([])],
    [new Set([1])],
    [new Set(['a'])],
    [new Set([undefined])],
    [new Set([null])],
    [new Set([1, 1, 1])],
  ];
}

function dataProviderForSetsFalse(): Array<[Set<unknown>]> {
  return [
    [new Set([1, 2])],
    [new Set(['a', 'b'])],
    [new Set([1, 2, 3])],
    [new Set([null, undefined])],
  ];
}
