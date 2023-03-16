// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from '../fixture';
import { summary } from '../../src';

describe.each(dataProviderForTrue() as Array<[Iterable<unknown>|Iterator<unknown>]>)(
  "Summary Is Empty Test True",
  (input: Iterable<unknown>|Iterator<unknown>) => {
    it("", () => {
      expect(summary.isEmpty(input)).toBeTruthy();
    });
  }
);

describe.each(dataProviderForFalse() as Array<[Iterable<unknown>|Iterator<unknown>]>)(
  "Summary Is Empty Test False",
  (input: Iterable<unknown>|Iterator<unknown>) => {
    it("", () => {
      expect(summary.isEmpty(input)).toBeFalsy();
    });
  }
);
function dataProviderForTrue(): Array<unknown> {
  return [
    [[]],
    [createGeneratorFixture([])],
    [createIterableFixture([])],
    [createIteratorFixture([])],
    [''],
    [new Set()],
    [new Set([])],
    [new Map()],
    [new Map([])],
  ];
}


function dataProviderForFalse(): Array<unknown> {
  return [
    [[null]],
    [createGeneratorFixture([null])],
    [createIterableFixture([null])],
    [createIteratorFixture([null])],
    [new Set([null])],
    [createMapFixture([null])],
    [[undefined]],
    [createGeneratorFixture([undefined])],
    [createIterableFixture([undefined])],
    [createIteratorFixture([undefined])],
    [new Set([undefined])],
    [createMapFixture([undefined])],
    [[1]],
    [createGeneratorFixture([1])],
    [createIterableFixture([1])],
    [createIteratorFixture([1])],
    ['1'],
    [new Set([1])],
    [createMapFixture([1])],
    [[1, 2, 3]],
    [createGeneratorFixture([1, 2, 3])],
    [createIterableFixture([1, 2, 3])],
    [createIteratorFixture([1, 2, 3])],
    [new Set([1, 2, 3])],
    [createMapFixture([1, 2, 3])],
  ];
}
