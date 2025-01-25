import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture
  // @ts-ignore
} from '../fixture';
import { summary } from '../../src';

describe.each(dataProviderForTrue())(
  "Summary Is Async Iterable Test True",
  (input) => {
    it("", () => {
      expect(summary.isAsyncIterable(input)).toBeTruthy();
    });
  }
);

function dataProviderForTrue(): Array<[AsyncIterable<any>]> {
  return [
    [createAsyncGeneratorFixture([])],
    [createAsyncGeneratorFixture([1])],
    [createAsyncGeneratorFixture([1, 2, 3])],
    [createAsyncIterableFixture([])],
    [createAsyncIterableFixture([1])],
    [createAsyncIterableFixture([1, 2, 3])],
  ];
}

describe.each(dataProviderForFalse())(
  "Summary Is Async Iterable Test False",
  (input) => {
    it("", () => {
      expect(summary.isAsyncIterable(input)).toBeFalsy();
    });
  }
);

function dataProviderForFalse(): Array<[any]> {
  return [
    [1],
    [1.0],
    [undefined],
    [null],
    [NaN],
    [{}],
    [''],
    ['123'],
    [[]],
    [[1, 2, 3]],
    [new Set()],
    [new Set([1])],
    [new Set([1, 2, 3])],
    [new Map()],
    [new Map([['a', 1]])],
    [new Map([['a', 1], ['b', 2], ['c', 3]])],
    [createGeneratorFixture([])],
    [createGeneratorFixture([1])],
    [createGeneratorFixture([1, 2, 3])],
    [createIterableFixture([])],
    [createIterableFixture([1])],
    [createIterableFixture([1, 2, 3])],
    [createIteratorFixture([])],
    [createIteratorFixture([1])],
    [createIteratorFixture([1, 2, 3])],
    [createAsyncIteratorFixture([])],
    [createAsyncIteratorFixture([1])],
    [createAsyncIteratorFixture([1, 2, 3])],
  ];
}
