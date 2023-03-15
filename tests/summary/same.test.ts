// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from '../fixture';
import { summary } from '../../src';

describe.each(dataProviderForTrue() as Array<[Array<Iterable<unknown>|Iterator<unknown>>]>)(
  "Summary Same Test True",
  (...input: Array<Iterable<unknown>|Iterator<unknown>>) => {
    it("", () => {
      expect(summary.same(...(input))).toBeTruthy();
    });
  }
);

function dataProviderForTrue(): Array<unknown> {
  return [
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
    [[], [], createGeneratorFixture([])],
    [[], [], createIteratorFixture([])],
    [[], [], createIterableFixture([])],
    [[], [], createMapFixture([])],
    [[], [], new Set([])],
    ['', [], new Set([])],
    [[], createGeneratorFixture([]), createIteratorFixture([])],
    [[], createIteratorFixture([]), createIterableFixture([])],
    [[], createMapFixture([]), createIterableFixture([])],
    [[], new Set([]), createIterableFixture([])],
    ['', new Set([]), createIterableFixture([])],

    [[], [], [], [], []],
    [[], createGeneratorFixture([]), createIteratorFixture([]), createIterableFixture([]), []],
    [[], [], createGeneratorFixture([]), createIteratorFixture([]), createIterableFixture([])],
    [[], [], createMapFixture([]), createIteratorFixture([]), createIterableFixture([])],
    [[], [], new Set([]), createIteratorFixture([]), createIterableFixture([])],
    ['', [], new Set([]), createIteratorFixture([]), createIterableFixture([])],

    [[1], [1]],
    [[1], createGeneratorFixture([1])],
    [[1], createIteratorFixture([1])],
    [[1], createIterableFixture([1])],
    [[1], new Set([1])],
    ['1', new Set(['1'])],

    [[1], [1], [1]],
    [[1], createGeneratorFixture([1]), [1]],
    [[1], createIteratorFixture([1]), [1]],
    [[1], createIterableFixture([1]), [1]],
    [[1], new Set([1]), [1]],
    ['1', new Set(['1']), ['1']],
    [[1], [1], createGeneratorFixture([1])],
    [[1], [1], createIteratorFixture([1])],
    [[1], [1], createIterableFixture([1])],
    [[1], [1], new Set([1])],
    ['1', ['1'], new Set(['1'])],
    [[1], createGeneratorFixture([1]), createIteratorFixture([1])],
    [[1], createIteratorFixture([1]), createIterableFixture([1])],
    [[1], new Set([1]), createIterableFixture([1])],
    ['1', new Set(['1']), createIterableFixture(['1'])],

    [[1, 2], [1, 2], [1, 2], [1, 2]],
    [[1, 2], [1, 2], createGeneratorFixture([1, 2]), [1, 2]],
    [[1, 2], [1, 2], createIteratorFixture([1, 2]), [1, 2]],
    [[1, 2], [1, 2], createIterableFixture([1, 2]), [1, 2]],
    [[1, 2], [1, 2], new Set([1, 2]), [1, 2]],
    ['12', ['1', '2'], new Set(['1', '2']), ['1', '2']],
    [[1, 2], [1, 2], createGeneratorFixture([1, 2]), createIteratorFixture([1, 2])],
    [[1, 2], [1, 2], createIteratorFixture([1, 2]), createIterableFixture([1, 2])],
    [[1, 2], [1, 2], new Set([1, 2]), createIterableFixture([1, 2])],
    ['12', ['1', '2'], new Set(['1', '2']), createIterableFixture(['1', '2'])],

    [[1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3]],
    [[1, 2, 3], [1, 2, 3], createGeneratorFixture([1, 2, 3]), [1, 2, 3]],
    [[1, 2, 3], [1, 2, 3], createIteratorFixture([1, 2, 3]), [1, 2, 3]],
    [[1, 2, 3], [1, 2, 3], createIterableFixture([1, 2, 3]), [1, 2, 3]],
    [[1, 2, 3], [1, 2, 3], new Set([1, 2, 3]), [1, 2, 3]],
    ['123', ['1', '2', '3'], new Set(['1', '2', '3']), ['1', '2', '3']],

    [['a', 2], ['a', 2], ['a', 2], ['a', 2]],
    [['a', 2], createGeneratorFixture(['a', 2]), ['a', 2], ['a', 2]],
    [['a', 2], createIteratorFixture(['a', 2]), ['a', 2], ['a', 2]],
    [['a', 2], createIterableFixture(['a', 2]), ['a', 2], ['a', 2]],
    [['a', 2], new Set(['a', 2]), ['a', 2], ['a', 2]],
    ['a2', new Set(['a', '2']), ['a', '2'], ['a', '2']],

    [[1, null], [1, null], [1, null], [1, null]],
    [[1, null], [1, null], [1, null], createGeneratorFixture([1, null])],
    [[1, null], [1, null], [1, null], createIteratorFixture([1, null])],
    [[1, null], [1, null], [1, null], createIterableFixture([1, null])],
    [[1, null], [1, null], [1, null], new Set([1, null])],
  ];
}

describe.each(dataProviderForFalse() as Array<[Array<Iterable<unknown>|Iterator<unknown>>]>)(
  "Summary Same Test False",
  (...input: Array<Iterable<unknown>|Iterator<unknown>>) => {
    it("", () => {
      expect(summary.same(...(input))).toBeFalsy();
    });
  }
);

function dataProviderForFalse(): Array<unknown> {
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
    [[1], createMapFixture([])],
    [[1], createMapFixture([1])],
    [[1], new Set([])],

    [['1'], [1], [1], [1]],
    [['1'], createGeneratorFixture([1]), [1], [1]],
    [['1'], [1], createIteratorFixture([1]), [1]],
    [['1'], [1], [1], createIterableFixture([1])],
    [['1'], [1], [1], new Set([1])],
    ['1', [1], [1], new Set([1])],

    [[1], ['1']],
    [[1], createGeneratorFixture(['1'])],
    [[1], createIteratorFixture(['1'])],
    [[1], createIterableFixture(['1'])],
    [[1], createMapFixture(['1'])],
    [[1], createMapFixture([1])],
    [[1], new Set(['1'])],
    ['1', new Set([1])],

    [[1], [2]],
    [[1], createGeneratorFixture([2])],
    [[1], createIteratorFixture([2])],
    [[1], createIterableFixture([2])],
    [[1], createMapFixture([2])],
    [[1], createMapFixture([1])],
    [[1], new Set([2])],
    ['1', new Set(['2'])],

    [[1], ['1'], [1]],
    [[1], createGeneratorFixture(['1']), [1]],
    [[1], createIteratorFixture(['1']), [1]],
    [[1], createIterableFixture(['1']), [1]],
    [[1], createMapFixture(['1']), [1]],
    [[1], createMapFixture([1]), [1]],
    [[1], new Set(['1']), [1]],
    ['1', new Set(['1']), [1]],
    [[1], ['1'], createGeneratorFixture([1])],
    [[1], ['1'], createIteratorFixture([1])],
    [[1], ['1'], createIterableFixture([1])],
    [[1], ['1'], createMapFixture([1])],
    [[1], [1], createMapFixture([1])],
    [[1], ['1'], new Set([1])],
    ['1', ['1'], new Set([1])],
    [[1], createIteratorFixture(['1']), createGeneratorFixture([1])],
    [[1], createIterableFixture(['1']), createIteratorFixture([1])],
    [[1], createGeneratorFixture(['1']), createIterableFixture([1])],
    [[1], createMapFixture(['1']), createIterableFixture([1])],
    [[1], createMapFixture([1]), createIterableFixture([1])],
    [[1], new Set(['1']), createIterableFixture([1])],
    ['1', new Set(['1']), createIterableFixture([1])],

    [[1], [1], ['1']],
    [[1], [1], [2], [1]],
    [[1], [1], ['1'], [1]],
    ['1', [1], ['1'], [1]],
    [[1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, '3']],
    [[1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 1]],
    [[1], [1, null], [1, null], [1]],
    [[1], [1, null], [1, null], [1, null]],
    [[1, null], [1], [1], [1]],
    [[1, null], [1], [1, null], [1]],
  ];
}
