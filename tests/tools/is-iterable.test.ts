import { isIterable } from '../../src/tools';
import { createGeneratorFixture, createIterableFixture, createIteratorFixture } from '../fixture';

describe.each(dataProviderForTrue())("Is Iterable test true", (input) => {
  it("", () => {
    expect(isIterable(input)).toBeTruthy();
  });
});

function dataProviderForTrue(): Array<unknown> {
  return [
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
  ];
}

describe.each(dataProviderForFalse())("Is Iterable test false", (input) => {
  it("", () => {
    expect(isIterable(input)).toBeFalsy();
  });
});

function dataProviderForFalse(): Array<unknown> {
  return [
    [1],
    [1.0],
    [undefined],
    [null],
    [NaN],
    [{}],
    [createIteratorFixture([])],
    [createIteratorFixture([1])],
    [createIteratorFixture([1, 2, 3])],
  ];
}
