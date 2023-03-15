// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from '../fixture';
import { summary } from '../../src';

describe.each(dataProviderForTrue())("Summary Same Count Test True", (...input) => {
  it("", () => {
    expect(summary.sameCount(...(input as Array<Iterable<unknown> | Iterator<unknown>>))).toBeTruthy();
  });
});

function dataProviderForTrue(): Array<unknown> {
  return [
    [[]],
    [[1]],
    [[1, 2, 3]],
    [[], []],
    [[], createGeneratorFixture([])],
    [[], createIteratorFixture([])],
    [[], createIterableFixture([])],
    [[], new Set([])],
    [[], new Map([])],
    [[], ''],

    [[], [], []],
    [[], createGeneratorFixture([]), []],
    [[], createIteratorFixture([]), []],
    [[], createIterableFixture([]), []],
    [[], new Set([]), []],
    [[], new Map([]), []],
    [[], '', []],
    [[], [], createGeneratorFixture([])],
    [[], [], createIteratorFixture([])],
    [[], [], createIterableFixture([])],
    [[], [], new Set([])],
    [[], [], new Map([])],
    [[], [], ''],
    [[], createGeneratorFixture([]), createIteratorFixture([])],
    [[], createIteratorFixture([]), createIterableFixture([])],
    [new Set([]), new Map([]), ''],

    [[], [], [], [], []],
    [[], createGeneratorFixture([]), createIteratorFixture([]), createIterableFixture([]), []],
    [[], [], createGeneratorFixture([]), createIteratorFixture([]), createIterableFixture([])],
    [[], '', new Set([]), new Map([]), createIterableFixture([])],

    [[1], [2]],
    [[1], createGeneratorFixture([2])],
    [[1], createIteratorFixture([2])],
    [[1], createIterableFixture([2])],

    [[1], [2], [3]],
    [[1], createGeneratorFixture([2]), [3]],
    [[1], createIteratorFixture([2]), [3]],
    [[1], createIterableFixture([2]), [3]],
    [[1], new Set([2]), [3]],
    [[1], new Map([[0, 2]]), [3]],
    [[1], '2', [3]],
    [[1], [2], createGeneratorFixture([3])],
    [[1], [2], createIteratorFixture([3])],
    [[1], [2], createIterableFixture([3])],
    [[1], [2], new Set([3])],
    [[1], [2], new Map([[1, 3]])],
    [[1], [2], '3'],
    [[1], createGeneratorFixture([2]), createIteratorFixture([3])],
    [[1], createIteratorFixture([2]), createIterableFixture([3])],
    ['1', new Set([2]), new Map([['a', 3]])],

    [[1, 2], [2, 3], [3, 4], [4, 5]],
    [[1, 2], [2, 3], createGeneratorFixture([3, 4]), [4, 5]],
    [[1, 2], [2, 3], createIteratorFixture([3, 4]), [4, 5]],
    [[1, 2], [2, 3], createIterableFixture([3, 4]), [4, 5]],
    [[1, 2], [2, 3], new Set([3, 4]), [4, 5]],
    [[1, 2], [2, 3], new Map([['a', 3], ['b', 4]]), [4, 5]],
    [[1, 2], [2, 3], '34', [4, 5]],
    [[1, 2], [2, 3], createGeneratorFixture([3, 4]), createIteratorFixture([4, 5])],
    [[1, 2], [2, 3], createIteratorFixture([3, 4]), createIterableFixture([4, 5])],
    [[1, 2], '23', new Set([3, 4]), new Map([['a', 4], ['b', 5]])],

    [[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6]],
    [[1, 2, 3], [2, 3, 4], createGeneratorFixture([3, 4, 5]), [4, 5, 6]],
    [[1, 2, 3], [2, 3, 4], createIteratorFixture([3, 4, 5]), [4, 5, 6]],
    [[1, 2, 3], [2, 3, 4], createIterableFixture([3, 4, 5]), [4, 5, 6]],
    [[1, 2, 3], [2, 3, 4], new Set([3, 4, 5]), [4, 5, 6]],
    [[1, 2, 3], [2, 3, 4], new Map([[0, 3], [1, 4], [2, 5]]), [4, 5, 6]],
    [[1, 2, 3], [2, 3, 4], '345', [4, 5, 6]],

    [['a', 2], ['b', 2], ['c', 2], ['c', 2]],
    [['a', 2], createGeneratorFixture(['b', 2]), ['c', 2], ['c', 2]],
    [['a', 2], createIteratorFixture(['b', 2]), ['c', 2], ['c', 2]],
    [['a', 2], createIterableFixture(['b', 2]), ['c', 2], ['c', 2]],
    [['a', 2], new Set(['b', 2]), ['c', 2], ['c', 2]],
    [['a', 2], new Map<number, number|string>([[0, 'b'], [1, 2]]), ['c', 2], ['c', 2]],
    [['a', 2], 'b2', ['c', 2], ['c', 2]],

    [[1, null], [2, null], [1, null], [2, null]],
    [[1, null], [2, null], [1, null], createGeneratorFixture([2, null])],
    [[1, null], [2, null], [1, null], createIteratorFixture([2, null])],
    [[1, null], [2, null], [1, null], createIterableFixture([2, null])],
    [[1, null], [2, null], [1, null], new Set([2, null])],
    [[1, null], [2, null], [1, null], new Map([[0, 2], [1, null]])],
    [[1, null], [2, null], [1, null], '23'],
  ];
}

describe.each(dataProviderForFalse())("Summary Same Count Test False", (...input) => {
  it("", () => {
    expect(summary.sameCount(...(input as Array<Iterable<unknown> | Iterator<unknown>>))).toBeFalsy();
  });
});

function dataProviderForFalse(): Array<unknown> {
  return [
    [[], [1]],
    [[], createGeneratorFixture([1])],
    [[], createIteratorFixture([1])],
    [[], createIterableFixture([1])],
    [[], new Set([1])],
    [[], new Map([[0, 1]])],
    [[], '1'],

    [[1], []],
    [[1], createGeneratorFixture([])],
    [[1], createIteratorFixture([])],
    [[1], createIterableFixture([])],
    [[1], new Set([])],
    [[1], new Map([])],
    [[1], ''],

    [[1], [1, 2, 3]],
    [[1], createGeneratorFixture([1, 2, 3])],
    [[1], createIteratorFixture([1, 2, 3])],
    [[1], createIterableFixture([1, 2, 3])],
    [[1], new Set([1, 2, 3])],
    [[1], new Map([['a', 1], ['b', 2], ['c', 3]])],
    [[1], '123'],
  ];
}
