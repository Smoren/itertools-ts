// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { math } from "../../src";

describe.each([
  ...dataProviderForArraysWithInitialValue(),
])("Math Running Total Test With Initial Value", (input, initialValue, expected) => {
  it("", () => {
    // Given
    const result = [];

    // When
    for (const item of math.runningTotal(input as Iterable<unknown>, initialValue as unknown)) {
      result.push(item);
    }

    // Then
    expect(result).toEqual(expected);
  });
});

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
  ];
}

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
])("Math Running Total Test", (input, expected) => {
  it("", () => {
    // Given
    const result = [];

    // When
    for (const item of math.runningTotal(input as Iterable<unknown>)) {
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
  ]
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
  ]
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
  ]
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      [Number('1'), Number('2'), Number('3')],
      [1, 3, 6],
    ],
    [
      [Number('0'), Number('12'), Number('345')],
      [0, 12, 357],
    ],
    [
      [Number('1.1'), Number('2.2'), Number('3.3')],
      [1.1, 3.3000000000000003, 6.6],
    ],
  ]
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
  ]
}


