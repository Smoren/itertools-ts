// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { math, Stream } from "../../src";

describe.each([
  ...dataProviderForArraysWithInitialValue(),
] as Array<[Iterable<unknown>|Iterator<unknown>, number|undefined, Array<unknown>]>)(
  "Math Running Total Test With Initial Value",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    initialValue: number|undefined,
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of math.runningTotal(input, initialValue)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
  );

function dataProviderForArraysWithInitialValue(): Array<unknown> {
  return [
    [
      [],
      5,
      [5],
    ],
    [
      [0],
      5,
      [5, 5],
    ],
    [
      [1],
      5,
      [5, 6],
    ],
    [
      [1, 1, 1],
      5,
      [5, 6, 7, 8],
    ],
    [
      [1, 2, 3],
      5,
      [5, 6, 8, 11],
    ],
    [
      [1, 2, 3, 4, 5],
      5,
      [5, 6, 8, 11, 15, 20],
    ],
    [
      [1, 2, 3, -4, 5],
      5,
      [5, 6, 8, 11, 7, 12],
    ],
    [
      [1, 2, 3, -4, -5],
      5,
      [5, 6, 8, 11, 7, 2],
    ],
    [
      ['1', '2', '3', '-4', '-5'],
      5,
      [5, 6, 8, 11, 7, 2],
    ],
  ];
}

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
] as Array<[Iterable<unknown>|Iterator<unknown>, Array<unknown>]>)(
  "Math Running Total Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    expected: Array<unknown>
  ) => {
  it("", () => {
    // Given
    const result = [];

    // When
    for (const item of math.runningTotal(input)) {
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
      [0],
      [0],
    ],
    [
      [1],
      [1],
    ],
    [
      [1, 1, 1],
      [1, 2, 3],
    ],
    [
      [1, 2, 3],
      [1, 3, 6],
    ],
    [
      [1, 2, 3, 4, 5],
      [1, 3, 6, 10, 15],
    ],
    [
      [1, 2, 3, -4, 5],
      [1, 3, 6, 2, 7],
    ],
    [
      [1, 2, 3, -4, -5],
      [1, 3, 6, 2, -3],
    ],
    [
      ['1', '2', '3'],
      [1, 3, 6],
    ],
    [
      ['1', '2', '-3'],
      [1, 3, 0],
    ],
    [
      [0, 1, true, false, null, '3', ''],
      [0, 1, 2, 2, 2, 5, 5],
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
      createGeneratorFixture([0]),
      [0],
    ],
    [
      createGeneratorFixture([1]),
      [1],
    ],
    [
      createGeneratorFixture([1, 1, 1]),
      [1, 2, 3],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      [1, 3, 6],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5]),
      [1, 3, 6, 10, 15],
    ],
    [
      createGeneratorFixture([1, 2, 3, -4, 5]),
      [1, 3, 6, 2, 7],
    ],
    [
      createGeneratorFixture([1, 2, 3, -4, -5]),
      [1, 3, 6, 2, -3],
    ],
    [
      createGeneratorFixture(['1', '2', '3']),
      [1, 3, 6],
    ],
    [
      createGeneratorFixture(['1', '2', '-3']),
      [1, 3, 0],
    ],
    [
      createGeneratorFixture([0, 1, true, false, null, '3', '']),
      [0, 1, 2, 2, 2, 5, 5],
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
      createIterableFixture([0]),
      [0],
    ],
    [
      createIterableFixture([1]),
      [1],
    ],
    [
      createIterableFixture([1, 1, 1]),
      [1, 2, 3],
    ],
    [
      createIterableFixture([1, 2, 3]),
      [1, 3, 6],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5]),
      [1, 3, 6, 10, 15],
    ],
    [
      createIterableFixture([1, 2, 3, -4, 5]),
      [1, 3, 6, 2, 7],
    ],
    [
      createIterableFixture([1, 2, 3, -4, -5]),
      [1, 3, 6, 2, -3],
    ],
    [
      createIterableFixture(['1', '2', '3']),
      [1, 3, 6],
    ],
    [
      createIterableFixture(['1', '2', '-3']),
      [1, 3, 0],
    ],
    [
      createIterableFixture([0, 1, true, false, null, '3', '']),
      [0, 1, 2, 2, 2, 5, 5],
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
      createIteratorFixture([0]),
      [0],
    ],
    [
      createIteratorFixture([1]),
      [1],
    ],
    [
      createIteratorFixture([1, 1, 1]),
      [1, 2, 3],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      [1, 3, 6],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5]),
      [1, 3, 6, 10, 15],
    ],
    [
      createIteratorFixture([1, 2, 3, -4, 5]),
      [1, 3, 6, 2, 7],
    ],
    [
      createIteratorFixture([1, 2, 3, -4, -5]),
      [1, 3, 6, 2, -3],
    ],
    [
      createIteratorFixture(['1', '2', '3']),
      [1, 3, 6],
    ],
    [
      createIteratorFixture(['1', '2', '-3']),
      [1, 3, 0],
    ],
    [
      createIteratorFixture([0, 1, true, false, null, '3', '']),
      [0, 1, 2, 2, 2, 5, 5],
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
      [1],
    ],
    [
      '123',
      [1, 3, 6],
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
      new Set([0]),
      [0],
    ],
    [
      new Set([1]),
      [1],
    ],
    [
      new Set([1, 2, 3]),
      [1, 3, 6],
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      [1, 3, 6, 10, 15],
    ],
    [
      new Set([1, 2, 3, -4, 5]),
      [1, 3, 6, 2, 7],
    ],
    [
      new Set([1, 2, 3, -4, -5]),
      [1, 3, 6, 2, -3],
    ],
    [
      new Set(['1', '2', '3']),
      [1, 3, 6],
    ],
    [
      new Set(['1', '2', '-3']),
      [1, 3, 0],
    ],
    [
      new Set([2, true, false, '3', '']),
      [2, 3, 3, 6, 6],
    ],
  ];
}
