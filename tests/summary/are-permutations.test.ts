import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture,
} from '../fixture';
import { summary } from '../../src';
import { describe, expect, it } from '@jest/globals';

describe.each(dataProviderForTrue())(
  "Summary Are Permutations Test True",
  (...input) => {
    it("", () => {
      expect(summary.arePermutations(...input)).toBeTruthy();
    });
  }
);

describe.each([
  ...dataProviderForTrue(),
  ...dataProviderForTrueAsync(),
])(
  "Summary Are Permutations Async Test True",
  (...input) => {
    it("", async () => {
      expect(await summary.arePermutationsAsync(...input)).toBeTruthy();
    });
  }
);

describe.each(dataProviderForFalse())(
  "Summary Are Permutations Test False",
  (...input) => {
    it("", () => {
      expect(summary.arePermutations(...input)).toBeFalsy();
    });
  }
);

describe.each([
  ...dataProviderForFalse(),
  ...dataProviderForFalseAsync(),
])(
  "Summary Are Permutations Async Test False",
  (...input) => {
    it("", async () => {
      expect(await summary.arePermutationsAsync(...input)).toBeFalsy();
    });
  }
);

function dataProviderForTrue(): Array<Array<Iterable<any> | Iterator<any>>> {
  return [
    [],
    [[]],
    [[1]],
    [[1, 2, 3]],
    [[], []],
    [[], createGeneratorFixture([])],
    [[], createIteratorFixture([])],
    [[], createIterableFixture([])],
    [[], createMapFixture([])],
    [[], new Set([])],
    ['', new Set([])],

    [[], [], []],
    [[], createGeneratorFixture([]), []],
    [[], createIteratorFixture([]), []],
    [[], createIterableFixture([]), []],
    [[], createMapFixture([]), []],
    [[], new Set([]), []],
    ['', new Set([]), []],

    [[1], [1]],
    [[1], createGeneratorFixture([1])],
    [[1], createIteratorFixture([1])],
    [[1], createIterableFixture([1])],
    [[1], new Set([1])],
    ['1', new Set(['1'])],

    [[1, 2], [1, 2]],
    [[1, 2], [2, 1]],
    [[2, 1], [1, 2]],
    [[1, 2], createGeneratorFixture([2, 1])],
    [[1, 2], createIteratorFixture([2, 1])],
    [[1, 2], createIterableFixture([2, 1])],

    [[1, 1], [1, 1]],
    [[1, 1, 2], [1, 2, 1]],
    [[1, 1, 2], [2, 1, 1]],
    [[1, 2, 1], [2, 1, 1]],

    [[1, 2, 3], [1, 2, 3]],
    [[1, 2, 3], [3, 2, 1]],
    [[1, 2, 3], [2, 3, 1]],
    [[1, 2, 3], [3, 1, 2]],
    [[1, 2, 3], createGeneratorFixture([2, 1, 3])],
    [[1, 2, 3], createIteratorFixture([3, 1, 2])],
    [[1, 2, 3], createIterableFixture([1, 3, 2])],

    [[1, 2], [2, 1], [1, 2]],
    [[1, 2, 3], [3, 2, 1], [2, 3, 1]],
    [[1, 1, 2], [1, 2, 1], [2, 1, 1]],
    [[1, 2, 3, 4, 5], [2, 3, 4, 5, 1], [1, 2, 3, 4, 5], [2, 4, 1, 3, 5]],

    [['a', 'b', 'c'], ['c', 'b', 'a']],
    ['iter', ['r', 'i', 't', 'e']],
    ['iter', 'rite'],
    [['1', 2.2, 3], [3, '1', 2.2]],
    [[1, null], [null, 1]],
    [[true, false], [false, true]],
  ];
}

function dataProviderForTrueAsync(): Array<Array<Iterable<any> | Iterator<any> | AsyncIterable<any> | AsyncIterator<any>>> {
  return [
    [[], createAsyncGeneratorFixture([])],
    [[], createAsyncIteratorFixture([])],
    [[], createAsyncIterableFixture([])],

    [[1], createAsyncGeneratorFixture([1])],
    [[1], createAsyncIteratorFixture([1])],
    [[1], createAsyncIterableFixture([1])],

    [[1, 2], createAsyncGeneratorFixture([2, 1])],
    [[1, 2], createAsyncIteratorFixture([2, 1])],
    [[1, 2], createAsyncIterableFixture([2, 1])],

    [[1, 1, 2], createAsyncGeneratorFixture([2, 1, 1])],
    [[1, 2, 3], createAsyncIteratorFixture([3, 1, 2])],
    [[1, 2, 3], createAsyncIterableFixture([2, 3, 1])],
    [[1, 2, 3], createAsyncGeneratorFixture([3, 2, 1]), [2, 1, 3]],

    ['iter', createAsyncIterableFixture(['r', 'i', 't', 'e'])],
    [[1, null], createAsyncGeneratorFixture([null, 1])],
  ];
}

function dataProviderForFalse(): Array<Array<Iterable<any> | Iterator<any>>> {
  return [
    [[], [1]],
    [[], createGeneratorFixture([1])],
    [[], createIteratorFixture([1])],
    [[], createIterableFixture([1])],
    [[], createMapFixture([1])],
    [[], new Set([1])],

    [[1], []],
    [[1], createGeneratorFixture([])],
    [[1], createIteratorFixture([])],
    [[1], createIterableFixture([])],
    [[1], new Set([])],

    [[1, 2], [1, 2, 1]],
    [[1, 2, 2], [1, 2, 1]],
    [[1, 2, 1], [1, 2, 2]],
    [[1, 2, 1], [1, 2, '1']],
    [[1], ['1']],
    [[1], [2]],

    [[1, 2, 3], [1, 2, 3], [2, 2, 3]],
    [[1, 2, 3], [1, 2, 3], [1, 2, '3']],
    [[1, 2, 3], [2, 3, 4]],
    [[1, 2, 3], [1, 2, 3], [2, 3, 4]],

    [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1]],
    [['a', 'b', 'c'], ['a', 'b', 'b']],
    ['iter', ['i', 't', 'e']],
    [[1, null], [1]],
  ];
}

function dataProviderForFalseAsync(): Array<Array<Iterable<any> | Iterator<any> | AsyncIterable<any> | AsyncIterator<any>>> {
  return [
    [[], createAsyncGeneratorFixture([1])],
    [[], createAsyncIteratorFixture([1])],
    [[], createAsyncIterableFixture([1])],

    [[1], createAsyncGeneratorFixture([])],
    [[1], createAsyncIteratorFixture([])],
    [[1], createAsyncIterableFixture([])],

    [[1, 2, 2], createAsyncGeneratorFixture([1, 2, 1])],
    [[1, 2, 1], createAsyncIteratorFixture([1, 2, '1'])],
    [[1, 2, 3], createAsyncIterableFixture([2, 3, 4])],
    [[1, 2, 3], createAsyncGeneratorFixture([1, 2, 3]), [2, 2, 3]],
    ['iter', createAsyncIterableFixture(['i', 't', 'e'])],
  ];
}
