// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture } from "../fixture";
import { set } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
])("Single Distinct Test", (input, expected) => {
  it("", () => {
    // Given
    const result = [];

    // When
    for (const item of set.distinct(input as Iterable<unknown>)) {
      result.push(item);
    }

    // Then
    expect(result).toEqual(expected);
  });
});

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [],
      [],
    ],
    [
      [1],
      [1],
    ],
    [
      [1, 1],
      [1],
    ],
    [
      [1, '1'],
      [1, '1'],
    ],
    [
      ['1', 1],
      ['1', 1],
    ],
    [
      ['aa', 'bb', 'aa'],
      ['aa', 'bb'],
    ],
    [
      [1, 2, 1, 2, 3],
      [1, 2, 3],
    ],
    [
      ['1', 2, '1', '2', 3],
      ['1', 2, '2', 3],
    ],
    [
      [false, null, undefined, 0, 0.0, ''],
      [false, null, undefined, 0, ''],
    ],
    [
      [true, 1, '1', 1.0, '1.0'],
      [true, 1, '1', '1.0'],
    ],
    [
      [true, 1, '1', 1.1, '1.1'],
      [true, 1, '1', 1.1, '1.1'],
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      [],
    ],
    [
      createGeneratorFixture([1]),
      [1],
    ],
    [
      createGeneratorFixture([1, 1]),
      [1],
    ],
    [
      createGeneratorFixture([1, '1']),
      [1, '1'],
    ],
    [
      createGeneratorFixture(['1', 1]),
      ['1', 1],
    ],
    [
      createGeneratorFixture(['aa', 'bb', 'aa']),
      ['aa', 'bb'],
    ],
    [
      createGeneratorFixture([1, 2, 1, 2, 3]),
      [1, 2, 3],
    ],
    [
      createGeneratorFixture(['1', 2, '1', '2', 3]),
      ['1', 2, '2', 3],
    ],
    [
      createGeneratorFixture([false, null, undefined, 0, 0.0, '']),
      [false, null, undefined, 0, ''],
    ],
    [
      createGeneratorFixture([true, 1, '1', 1.0, '1.0']),
      [true, 1, '1', '1.0'],
    ],
    [
      createGeneratorFixture([true, 1, '1', 1.1, '1.1']),
      [true, 1, '1', 1.1, '1.1'],
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      [],
    ],
    [
      createIterableFixture([1]),
      [1],
    ],
    [
      createIterableFixture([1, 1]),
      [1],
    ],
    [
      createIterableFixture([1, '1']),
      [1, '1'],
    ],
    [
      createIterableFixture(['1', 1]),
      ['1', 1],
    ],
    [
      createIterableFixture(['aa', 'bb', 'aa']),
      ['aa', 'bb'],
    ],
    [
      createIterableFixture([1, 2, 1, 2, 3]),
      [1, 2, 3],
    ],
    [
      createIterableFixture(['1', 2, '1', '2', 3]),
      ['1', 2, '2', 3],
    ],
    [
      createIterableFixture([false, null, undefined, 0, 0.0, '']),
      [false, null, undefined, 0, ''],
    ],
    [
      createIterableFixture([true, 1, '1', 1.0, '1.0']),
      [true, 1, '1', '1.0'],
    ],
    [
      createIterableFixture([true, 1, '1', 1.1, '1.1']),
      [true, 1, '1', 1.1, '1.1'],
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      [],
    ],
    [
      createIteratorFixture([1]),
      [1],
    ],
    [
      createIteratorFixture([1, 1]),
      [1],
    ],
    [
      createIteratorFixture([1, '1']),
      [1, '1'],
    ],
    [
      createIteratorFixture(['1', 1]),
      ['1', 1],
    ],
    [
      createIteratorFixture(['aa', 'bb', 'aa']),
      ['aa', 'bb'],
    ],
    [
      createIteratorFixture([1, 2, 1, 2, 3]),
      [1, 2, 3],
    ],
    [
      createIteratorFixture(['1', 2, '1', '2', 3]),
      ['1', 2, '2', 3],
    ],
    [
      createIteratorFixture([false, null, undefined, 0, 0.0, '']),
      [false, null, undefined, 0, ''],
    ],
    [
      createIteratorFixture([true, 1, '1', 1.0, '1.0']),
      [true, 1, '1', '1.0'],
    ],
    [
      createIteratorFixture([true, 1, '1', 1.1, '1.1']),
      [true, 1, '1', 1.1, '1.1'],
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      [],
    ],
    [
      '1',
      ['1'],
    ],
    [
      '11',
      ['1'],
    ],
    [
      'aabacc',
      ['a', 'b', 'c'],
    ],
    [
      '12123',
      ['1', '2', '3'],
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([]),
      [],
    ],
    [
      new Set([1]),
      [1],
    ],
    [
      new Set([1, 1]),
      [1],
    ],
    [
      new Set([1, '1']),
      [1, '1'],
    ],
    [
      new Set(['1', 1]),
      ['1', 1],
    ],
    [
      new Set(['aa', 'bb', 'aa']),
      ['aa', 'bb'],
    ],
    [
      new Set([1, 2, 1, 2, 3]),
      [1, 2, 3],
    ],
    [
      new Set(['1', 2, '1', '2', 3]),
      ['1', 2, '2', 3],
    ],
    [
      new Set([false, null, undefined, 0, 0.0, '']),
      [false, null, undefined, 0, ''],
    ],
    [
      new Set([true, 1, '1', 1.0, '1.0']),
      [true, 1, '1', '1.0'],
    ],
    [
      new Set([true, 1, '1', 1.1, '1.1']),
      [true, 1, '1', 1.1, '1.1'],
    ],
  ];
}
