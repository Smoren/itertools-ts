import { isIterator } from '../../src/tools';
import { createGeneratorFixture, createIterableFixture, createIteratorFixture } from '../fixture';

describe.each(dataProviderForTrue())("Is Iterator test true", (input) => {
  it("", () => {
    expect(isIterator(input)).toBeTruthy();
  });
});

function dataProviderForTrue(): Array<unknown> {
  return [
    [createIteratorFixture([])],
    [createIteratorFixture([1])],
    [createIteratorFixture([1, 2, 3])],
  ];
}

describe.each(dataProviderForFalse())("Is Iterator test false", (input) => {
  it("", () => {
    expect(isIterator(input)).toBeFalsy();
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
    [''],
    ['123'],
    [[]],
    [[1, 2, 3]],
    [createGeneratorFixture([])],
    [createGeneratorFixture([1])],
    [createGeneratorFixture([1, 2, 3])],
    [createIterableFixture([])],
    [createIterableFixture([1])],
    [createIterableFixture([1, 2, 3])],
  ];
}
