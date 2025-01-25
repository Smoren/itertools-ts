// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture } from '../fixture';
import { summary } from '../../src';

describe.each(dataProviderForTrue())(
  "Summary Is Iterator Test True",
  (input) => {
    it("", () => {
      expect(summary.isIterator(input)).toBeTruthy();
    });
  }
);

function dataProviderForTrue(): Array<[Iterator<any>]> {
  return [
    [createIteratorFixture([])],
    [createIteratorFixture([1])],
    [createIteratorFixture([1, 2, 3])],
    [createGeneratorFixture([])],
    [createGeneratorFixture([1])],
    [createGeneratorFixture([1, 2, 3])],
  ];
}

describe.each(dataProviderForFalse())(
  "Summary Is Iterator Test False",
  (input: unknown) => {
    it("", () => {
      expect(summary.isIterator(input)).toBeFalsy();
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
    [createIterableFixture([])],
    [createIterableFixture([1])],
    [createIterableFixture([1, 2, 3])],
  ];
}
