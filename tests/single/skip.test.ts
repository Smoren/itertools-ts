// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { single } from "../../src";
import { InvalidArgumentError } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
] as Array<[Iterable<unknown>|Iterator<unknown>, [number]|[number, number], Array<unknown>]>)(
  "Single Map Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    config: [number]|[number, number],
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of single.skip(input, ...(config as [number, number]))) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForErrors(),
] as Array<[[number]|[number, number]]>)(
  "Single Map Error Test",
  (
    config: [number]|[number, number]
  ) => {
    it("", () => {
      expect(() => {
        // When
        for (const _ of single.skip([1, 2, 3], ...(config as [number, number]))) {
          break;
        }
      }).toThrow(InvalidArgumentError);
    });
  }
);

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [],
      [0],
      [],
    ],
    [
      [],
      [0, 1],
      [],
    ],
    [
      [],
      [0, 2],
      [],
    ],
    [
      [],
      [3, 5],
      [],
    ],
    [
      [1],
      [0],
      [1],
    ],
    [
      [1],
      [0, 0],
      [1],
    ],
    [
      [1],
      [0, 1],
      [1],
    ],
    [
      [1],
      [0, 2],
      [1],
    ],
    [
      [1],
      [1],
      [],
    ],
    [
      [1],
      [1, 0],
      [],
    ],
    [
      [1],
      [1, 1],
      [1],
    ],
    [
      [1],
      [1, 2],
      [1],
    ],
    [
      [1],
      [2, 0],
      [],
    ],
    [
      [1],
      [2, 1],
      [1],
    ],
    [
      [1],
      [2, 2],
      [1],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 0],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 0],
      [2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [2, 0],
      [3, 4, 5, 6, 7, 8, 9],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [8, 0],
      [9],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [9, 0],
      [],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [10, 0],
      [],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 1],
      [1, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2],
      [1, 2, 4, 5, 6, 7, 8, 9],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 7],
      [1, 2, 3, 4, 5, 6, 7, 9],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 8],
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [2, 1],
      [1, 4, 5, 6, 7, 8, 9],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [2, 2],
      [1, 2, 5, 6, 7, 8, 9],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [2, 7],
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [5, 2],
      [1, 2, 8, 9],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [10, 2],
      [1, 2],
    ],
    [
      [1, 2.2, '3', 4, [5], {a: 6}, true, false, null],
      [0],
      [1, 2.2, '3', 4, [5], {a: 6}, true, false, null],
    ],
    [
      [1, 2.2, '3', 4, [5], {a: 6}, true, false, null],
      [0, 0],
      [1, 2.2, '3', 4, [5], {a: 6}, true, false, null],
    ],
    [
      [1, 2.2, '3', 4, [5], {a: 6}, true, false, null],
      [1, 0],
      [2.2, '3', 4, [5], {a: 6}, true, false, null],
    ],
    [
      [1, 2.2, '3', 4, [5], {a: 6}, true, false, null],
      [3, 0],
      [4, [5], {a: 6}, true, false, null],
    ],
    [
      [1, 2.2, '3', 4, [5], {a: 6}, true, false, null],
      [3, 2],
      [1, 2.2, {a: 6}, true, false, null],
    ],
    [
      [1, 2.2, '3', 4, [5], {a: 6}, true, false, null],
      [10, 2],
      [1, 2.2],
    ],
    [
      [1, 2.2, '3', 4, [5], {a: 6}, true, false, null],
      [10, 0],
      [],
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      [0],
      [],
    ],
    [
      createGeneratorFixture([]),
      [0, 1],
      [],
    ],
    [
      createGeneratorFixture([]),
      [0, 2],
      [],
    ],
    [
      createGeneratorFixture([]),
      [3, 5],
      [],
    ],
    [
      createGeneratorFixture([1]),
      [0],
      [1],
    ],
    [
      createGeneratorFixture([1]),
      [0, 0],
      [1],
    ],
    [
      createGeneratorFixture([1]),
      [0, 1],
      [1],
    ],
    [
      createGeneratorFixture([1]),
      [0, 2],
      [1],
    ],
    [
      createGeneratorFixture([1]),
      [1],
      [],
    ],
    [
      createGeneratorFixture([1]),
      [1, 0],
      [],
    ],
    [
      createGeneratorFixture([1]),
      [1, 1],
      [1],
    ],
    [
      createGeneratorFixture([1]),
      [1, 2],
      [1],
    ],
    [
      createGeneratorFixture([1]),
      [2, 0],
      [],
    ],
    [
      createGeneratorFixture([1]),
      [2, 1],
      [1],
    ],
    [
      createGeneratorFixture([1]),
      [2, 2],
      [1],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [0],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [0, 0],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 0],
      [2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [2, 0],
      [3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [8, 0],
      [9],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [9, 0],
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [10, 0],
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 1],
      [1, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 2],
      [1, 2, 4, 5, 6, 7, 8, 9],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 7],
      [1, 2, 3, 4, 5, 6, 7, 9],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 8],
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [2, 1],
      [1, 4, 5, 6, 7, 8, 9],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [2, 2],
      [1, 2, 5, 6, 7, 8, 9],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [2, 7],
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [5, 2],
      [1, 2, 8, 9],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [10, 2],
      [1, 2],
    ],
    [
      createGeneratorFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [0],
      [1, 2.2, '3', 4, [5], {a: 6}, true, false, null],
    ],
    [
      createGeneratorFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [0, 0],
      [1, 2.2, '3', 4, [5], {a: 6}, true, false, null],
    ],
    [
      createGeneratorFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [1, 0],
      [2.2, '3', 4, [5], {a: 6}, true, false, null],
    ],
    [
      createGeneratorFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [3, 0],
      [4, [5], {a: 6}, true, false, null],
    ],
    [
      createGeneratorFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [3, 2],
      [1, 2.2, {a: 6}, true, false, null],
    ],
    [
      createGeneratorFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [10, 2],
      [1, 2.2],
    ],
    [
      createGeneratorFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [10, 0],
      [],
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      [0],
      [],
    ],
    [
      createIterableFixture([]),
      [0, 1],
      [],
    ],
    [
      createIterableFixture([]),
      [0, 2],
      [],
    ],
    [
      createIterableFixture([]),
      [3, 5],
      [],
    ],
    [
      createIterableFixture([1]),
      [0],
      [1],
    ],
    [
      createIterableFixture([1]),
      [0, 0],
      [1],
    ],
    [
      createIterableFixture([1]),
      [0, 1],
      [1],
    ],
    [
      createIterableFixture([1]),
      [0, 2],
      [1],
    ],
    [
      createIterableFixture([1]),
      [1],
      [],
    ],
    [
      createIterableFixture([1]),
      [1, 0],
      [],
    ],
    [
      createIterableFixture([1]),
      [1, 1],
      [1],
    ],
    [
      createIterableFixture([1]),
      [1, 2],
      [1],
    ],
    [
      createIterableFixture([1]),
      [2, 0],
      [],
    ],
    [
      createIterableFixture([1]),
      [2, 1],
      [1],
    ],
    [
      createIterableFixture([1]),
      [2, 2],
      [1],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [0],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [0, 0],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 0],
      [2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [2, 0],
      [3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [8, 0],
      [9],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [9, 0],
      [],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [10, 0],
      [],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 1],
      [1, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 2],
      [1, 2, 4, 5, 6, 7, 8, 9],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 7],
      [1, 2, 3, 4, 5, 6, 7, 9],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 8],
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [2, 1],
      [1, 4, 5, 6, 7, 8, 9],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [2, 2],
      [1, 2, 5, 6, 7, 8, 9],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [2, 7],
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [5, 2],
      [1, 2, 8, 9],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [10, 2],
      [1, 2],
    ],
    [
      createIterableFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [0],
      [1, 2.2, '3', 4, [5], {a: 6}, true, false, null],
    ],
    [
      createIterableFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [0, 0],
      [1, 2.2, '3', 4, [5], {a: 6}, true, false, null],
    ],
    [
      createIterableFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [1, 0],
      [2.2, '3', 4, [5], {a: 6}, true, false, null],
    ],
    [
      createIterableFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [3, 0],
      [4, [5], {a: 6}, true, false, null],
    ],
    [
      createIterableFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [3, 2],
      [1, 2.2, {a: 6}, true, false, null],
    ],
    [
      createIterableFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [10, 2],
      [1, 2.2],
    ],
    [
      createIterableFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [10, 0],
      [],
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      [0],
      [],
    ],
    [
      createIteratorFixture([]),
      [0, 1],
      [],
    ],
    [
      createIteratorFixture([]),
      [0, 2],
      [],
    ],
    [
      createIteratorFixture([]),
      [3, 5],
      [],
    ],
    [
      createIteratorFixture([1]),
      [0],
      [1],
    ],
    [
      createIteratorFixture([1]),
      [0, 0],
      [1],
    ],
    [
      createIteratorFixture([1]),
      [0, 1],
      [1],
    ],
    [
      createIteratorFixture([1]),
      [0, 2],
      [1],
    ],
    [
      createIteratorFixture([1]),
      [1],
      [],
    ],
    [
      createIteratorFixture([1]),
      [1, 0],
      [],
    ],
    [
      createIteratorFixture([1]),
      [1, 1],
      [1],
    ],
    [
      createIteratorFixture([1]),
      [1, 2],
      [1],
    ],
    [
      createIteratorFixture([1]),
      [2, 0],
      [],
    ],
    [
      createIteratorFixture([1]),
      [2, 1],
      [1],
    ],
    [
      createIteratorFixture([1]),
      [2, 2],
      [1],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [0],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [0, 0],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 0],
      [2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [2, 0],
      [3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [8, 0],
      [9],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [9, 0],
      [],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [10, 0],
      [],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 1],
      [1, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 2],
      [1, 2, 4, 5, 6, 7, 8, 9],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 7],
      [1, 2, 3, 4, 5, 6, 7, 9],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 8],
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [2, 1],
      [1, 4, 5, 6, 7, 8, 9],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [2, 2],
      [1, 2, 5, 6, 7, 8, 9],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [2, 7],
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [5, 2],
      [1, 2, 8, 9],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [10, 2],
      [1, 2],
    ],
    [
      createIteratorFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [0],
      [1, 2.2, '3', 4, [5], {a: 6}, true, false, null],
    ],
    [
      createIteratorFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [0, 0],
      [1, 2.2, '3', 4, [5], {a: 6}, true, false, null],
    ],
    [
      createIteratorFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [1, 0],
      [2.2, '3', 4, [5], {a: 6}, true, false, null],
    ],
    [
      createIteratorFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [3, 0],
      [4, [5], {a: 6}, true, false, null],
    ],
    [
      createIteratorFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [3, 2],
      [1, 2.2, {a: 6}, true, false, null],
    ],
    [
      createIteratorFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [10, 2],
      [1, 2.2],
    ],
    [
      createIteratorFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [10, 0],
      [],
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      [0],
      [],
    ],
    [
      '',
      [0, 1],
      [],
    ],
    [
      '',
      [0, 2],
      [],
    ],
    [
      '',
      [3, 5],
      [],
    ],
    [
      '1',
      [0],
      ['1'],
    ],
    [
      '1',
      [0, 0],
      ['1'],
    ],
    [
      '1',
      [0, 1],
      ['1'],
    ],
    [
      '1',
      [0, 2],
      ['1'],
    ],
    [
      '1',
      [1],
      [],
    ],
    [
      '1',
      [1, 0],
      [],
    ],
    [
      '1',
      [1, 1],
      ['1'],
    ],
    [
      '1',
      [1, 2],
      ['1'],
    ],
    [
      '1',
      [2, 0],
      [],
    ],
    [
      '1',
      [2, 1],
      ['1'],
    ],
    [
      '1',
      [2, 2],
      ['1'],
    ],
    [
      '123456789',
      [0],
      ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ],
    [
      '123456789',
      [0, 0],
      ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ],
    [
      '123456789',
      [1, 0],
      ['2', '3', '4', '5', '6', '7', '8', '9'],
    ],
    [
      '123456789',
      [2, 0],
      ['3', '4', '5', '6', '7', '8', '9'],
    ],
    [
      '123456789',
      [8, 0],
      ['9'],
    ],
    [
      '123456789',
      [9, 0],
      [],
    ],
    [
      '123456789',
      [10, 0],
      [],
    ],
    [
      '123456789',
      [1, 1],
      ['1', '3', '4', '5', '6', '7', '8', '9'],
    ],
    [
      '123456789',
      [1, 2],
      ['1', '2', '4', '5', '6', '7', '8', '9'],
    ],
    [
      '123456789',
      [1, 7],
      ['1', '2', '3', '4', '5', '6', '7', '9'],
    ],
    [
      '123456789',
      [1, 8],
      ['1', '2', '3', '4', '5', '6', '7', '8'],
    ],
    [
      '123456789',
      [1, 9],
      ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ],
    [
      '123456789',
      [2, 1],
      ['1', '4', '5', '6', '7', '8', '9'],
    ],
    [
      '123456789',
      [2, 2],
      ['1', '2', '5', '6', '7', '8', '9'],
    ],
    [
      '123456789',
      [2, 7],
      ['1', '2', '3', '4', '5', '6', '7'],
    ],
    [
      '123456789',
      [5, 2],
      ['1', '2', '8', '9'],
    ],
    [
      '123456789',
      [10, 2],
      ['1', '2'],
    ],
  ]
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([]),
      [0],
      [],
    ],
    [
      new Set([]),
      [0, 1],
      [],
    ],
    [
      new Set([]),
      [0, 2],
      [],
    ],
    [
      new Set([]),
      [3, 5],
      [],
    ],
    [
      new Set([1]),
      [0],
      [1],
    ],
    [
      new Set([1]),
      [0, 0],
      [1],
    ],
    [
      new Set([1]),
      [0, 1],
      [1],
    ],
    [
      new Set([1]),
      [0, 2],
      [1],
    ],
    [
      new Set([1]),
      [1],
      [],
    ],
    [
      new Set([1]),
      [1, 0],
      [],
    ],
    [
      new Set([1]),
      [1, 1],
      [1],
    ],
    [
      new Set([1]),
      [1, 2],
      [1],
    ],
    [
      new Set([1]),
      [2, 0],
      [],
    ],
    [
      new Set([1]),
      [2, 1],
      [1],
    ],
    [
      new Set([1]),
      [2, 2],
      [1],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [0],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [0, 0],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 0],
      [2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [2, 0],
      [3, 4, 5, 6, 7, 8, 9],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [8, 0],
      [9],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [9, 0],
      [],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [10, 0],
      [],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 1],
      [1, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 2],
      [1, 2, 4, 5, 6, 7, 8, 9],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 7],
      [1, 2, 3, 4, 5, 6, 7, 9],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 8],
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [2, 1],
      [1, 4, 5, 6, 7, 8, 9],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [2, 2],
      [1, 2, 5, 6, 7, 8, 9],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [2, 7],
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [5, 2],
      [1, 2, 8, 9],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [10, 2],
      [1, 2],
    ],
    [
      new Set([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [0],
      [1, 2.2, '3', 4, [5], {a: 6}, true, false, null],
    ],
    [
      new Set([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [0, 0],
      [1, 2.2, '3', 4, [5], {a: 6}, true, false, null],
    ],
    [
      new Set([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [1, 0],
      [2.2, '3', 4, [5], {a: 6}, true, false, null],
    ],
    [
      new Set([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [3, 0],
      [4, [5], {a: 6}, true, false, null],
    ],
    [
      new Set([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [3, 2],
      [1, 2.2, {a: 6}, true, false, null],
    ],
    [
      new Set([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [10, 2],
      [1, 2.2],
    ],
    [
      new Set([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [10, 0],
      [],
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      [0],
      [],
    ],
    [
      createMapFixture([]),
      [0, 1],
      [],
    ],
    [
      createMapFixture([]),
      [0, 2],
      [],
    ],
    [
      createMapFixture([]),
      [3, 5],
      [],
    ],
    [
      createMapFixture([1]),
      [0],
      [[0, 1]],
    ],
    [
      createMapFixture([1]),
      [0, 0],
      [[0, 1]],
    ],
    [
      createMapFixture([1]),
      [0, 1],
      [[0, 1]],
    ],
    [
      createMapFixture([1]),
      [0, 2],
      [[0, 1]],
    ],
    [
      createMapFixture([1]),
      [1],
      [],
    ],
    [
      createMapFixture([1]),
      [1, 0],
      [],
    ],
    [
      createMapFixture([1]),
      [1, 1],
      [[0, 1]],
    ],
    [
      createMapFixture([1]),
      [1, 2],
      [[0, 1]],
    ],
    [
      createMapFixture([1]),
      [2, 0],
      [],
    ],
    [
      createMapFixture([1]),
      [2, 1],
      [[0, 1]],
    ],
    [
      createMapFixture([1]),
      [2, 2],
      [[0, 1]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [0],
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [0, 0],
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 0],
      [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [2, 0],
      [[2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [8, 0],
      [[8, 9]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [9, 0],
      [],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [10, 0],
      [],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 1],
      [[0, 1], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 2],
      [[0, 1], [1, 2], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 7],
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [8, 9]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 8],
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [1, 9],
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [2, 1],
      [[0, 1], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [2, 2],
      [[0, 1], [1, 2], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [2, 7],
      [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [5, 2],
      [[0, 1], [1, 2], [7, 8], [8, 9]],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      [10, 2],
      [[0, 1], [1, 2]],
    ],
    [
      createMapFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [0],
      [[0, 1], [1, 2.2], [2, '3'], [3, 4], [4, [5]], [5, {a: 6}], [6, true], [7, false], [8, null]],
    ],
    [
      createMapFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [0, 0],
      [[0, 1], [1, 2.2], [2, '3'], [3, 4], [4, [5]], [5, {a: 6}], [6, true], [7, false], [8, null]],
    ],
    [
      createMapFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [1, 0],
      [[1, 2.2], [2, '3'], [3, 4], [4, [5]], [5, {a: 6}], [6, true], [7, false], [8, null]],
    ],
    [
      createMapFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [3, 0],
      [[3, 4], [4, [5]], [5, {a: 6}], [6, true], [7, false], [8, null]],
    ],
    [
      createMapFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [3, 2],
      [[0, 1], [1, 2.2], [5, {a: 6}], [6, true], [7, false], [8, null]],
    ],
    [
      createMapFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [10, 2],
      [[0, 1], [1, 2.2]],
    ],
    [
      createMapFixture([1, 2.2, '3', 4, [5], {a: 6}, true, false, null]),
      [10, 0],
      [],
    ],
  ];
}

function dataProviderForErrors(): Array<unknown> {
  return [
    [[-1]],
    [[-1]],
    [[0, -1]],
    [[0, -2]],
    [[-1, -1]],
    [[-2, -1]],
    [[-1, -2]],
    [[-2, -2]],
  ];
}
