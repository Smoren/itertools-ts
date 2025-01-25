// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from '../fixture';
import { summary } from '../../src';

describe.each(dataProviderForTrue())(
  "Summary Is String Test True",
  (input) => {
    it("", () => {
      expect(summary.isString(input)).toBeTruthy();
    });
  }
);

function dataProviderForTrue(): Array<[string]> {
  return [
    [''],
    [String()],
    [String('')],
    ['0'],
    [String('0')],
    ['0.0'],
    [String('0.0')],
    ['1'],
    [String('1')],
    ['1.1'],
    [String('1.1')],
    ['10'],
    [String('10')],
    ['01'],
    [String('01')],
    ['a'],
    [String('a')],
    ['abc'],
    [String('abc')],
  ];
}

describe.each(dataProviderForFalse())(
  "Summary Is String Test False",
  (input) => {
    it("", () => {
      expect(summary.isString(input)).toBeFalsy();
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
    [{a: 1}],
    [[]],
    [[1]],
    [[1, 2, 3]],
    [createGeneratorFixture([])],
    [createGeneratorFixture([1])],
    [createGeneratorFixture([1, 2, 3])],
    [createIterableFixture([])],
    [createIterableFixture([1])],
    [createIterableFixture([1, 2, 3])],
    [createIteratorFixture([])],
    [createIteratorFixture([1])],
    [createIteratorFixture([1, 2, 3])],
    [new Set([])],
    [new Set([1])],
    [new Set([1, 2, 3])],
    [createMapFixture([])],
    [createMapFixture([1])],
    [createMapFixture([1, 2, 3])],
  ];
}
