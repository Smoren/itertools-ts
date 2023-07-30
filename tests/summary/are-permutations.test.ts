import {
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  // @ts-ignore
} from "../fixture";
import { summary } from "../../src";

describe.each([
  ...dataProviderForArraysTrue(),
  ...dataProviderForGeneratorsTrue(),
  ...dataProviderForIterablesTrue(),
  ...dataProviderForIteratorsTrue(),
  ...dataProviderForStringsTrue(),
  ...dataProviderForSetsTrue(),
] as Array<[Array<Iterable<unknown>|Iterator<unknown>>]>)(
  "Summary Are Permutations Test True",
  (...inputs: Array<Iterable<unknown>|Iterator<unknown>>) => {
    it("", () => {
      expect(summary.arePermutations(...inputs)).toBeTruthy();
    });
  }
);

describe.each([
  ...dataProviderForArraysFalse(),
  ...dataProviderForGeneratorsFalse(),
  ...dataProviderForIterablesFalse(),
  ...dataProviderForIteratorsFalse(),
  ...dataProviderForStringsFalse(),
  ...dataProviderForSetsFalse(),
] as Array<[Array<Iterable<unknown>|Iterator<unknown>>]>)(
  "Summary Are Permutations Test False",
  (...inputs: Array<Iterable<unknown>|Iterator<unknown>>) => {
    it("", () => {
      expect(summary.arePermutations(...inputs)).toBeFalsy();
    });
  }
);

describe.each([
  // ...dataProviderForAsyncArraysTrue(),
  // ...dataProviderForAsyncGeneratorsTrue(),
  // ...dataProviderForAsyncIterablesTrue(),
  // ...dataProviderForAsyncIteratorsTrue(),
  // ...dataProviderForAsyncStringsTrue(),
  // ...dataProviderForAsyncSetsTrue(),
] as Array<[
  Array<AsyncIterable<unknown>|AsyncIterator<unknown>>
]>)(
  "Summary Are Permutations Async Test True",
  (...inputs: Array<AsyncIterable<unknown>|AsyncIterator<unknown>>) => {
    it("", async () => {
      expect(await summary.arePermutationsAsync(...(inputs))).toBeTruthy();
    });
  }
);

function dataProviderForArraysTrue(): Array<unknown> {
  return [
    [],
    [[]],
    [[], []],
    [[], [], []],
    [[1]],
    [[1], [1]],
    [[1], [1], [1]],
    [[1, 1]],
    [
      [1, 1],
      [1, 1],
    ],
    [
      [1, 1],
      [1, 1],
      [1, 1],
    ],
    [[1, 2]],
    [
      [1, 2],
      [1, 2],
    ],
    [
      [1, 2],
      [2, 1],
    ],
    [
      [2, 1],
      [1, 2],
    ],
    [
      [1, 2],
      [1, 2],
      [1, 2],
    ],
    [
      [1, 2],
      [1, 2],
      [2, 1],
    ],
    [
      [1, 2],
      [2, 1],
      [1, 2],
    ],
    [
      [1, 2],
      [2, 1],
      [2, 1],
    ],
    [
      [2, 1],
      [1, 2],
      [1, 2],
    ],
    [
      [2, 1],
      [1, 2],
      [2, 1],
    ],
    [
      [2, 1],
      [2, 1],
      [1, 2],
    ],
    [
      [2, 1],
      [2, 1],
      [2, 1],
    ],
    [[1, 1, 1]],
    [
      [1, 1, 1],
      [1, 1, 1],
    ],
    [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    [[1, 1, 2]],
    [
      [1, 1, 2],
      [1, 1, 2],
    ],
    [
      [1, 1, 2],
      [1, 2, 1],
    ],
    [
      [1, 1, 2],
      [2, 1, 1],
    ],
    [
      [1, 1, 2],
      [1, 1, 2],
      [1, 1, 2],
    ],
    [
      [1, 1, 2],
      [1, 1, 2],
      [1, 2, 1],
    ],
    [
      [1, 1, 2],
      [1, 1, 2],
      [2, 1, 1],
    ],
    [
      [1, 1, 2],
      [1, 2, 1],
      [1, 1, 2],
    ],
    [
      [1, 1, 2],
      [1, 2, 1],
      [1, 2, 1],
    ],
    [
      [1, 1, 2],
      [1, 2, 1],
      [2, 1, 1],
    ],
    [
      [1, 1, 2],
      [2, 1, 1],
      [1, 1, 2],
    ],
    [
      [1, 1, 2],
      [2, 1, 1],
      [1, 2, 1],
    ],
    [
      [1, 1, 2],
      [2, 1, 1],
      [2, 1, 1],
    ],
    [
      [1, 2, 1],
      [1, 1, 2],
      [1, 1, 2],
    ],
    [
      [1, 2, 1],
      [1, 1, 2],
      [1, 2, 1],
    ],
    [
      [1, 2, 1],
      [1, 1, 2],
      [2, 1, 1],
    ],
    [
      [1, 2, 1],
      [1, 2, 1],
      [1, 1, 2],
    ],
    [
      [1, 2, 1],
      [1, 2, 1],
      [1, 2, 1],
    ],
    [
      [1, 2, 1],
      [1, 2, 1],
      [2, 1, 1],
    ],
    [
      [1, 2, 1],
      [2, 1, 1],
      [1, 1, 2],
    ],
    [
      [1, 2, 1],
      [2, 1, 1],
      [1, 2, 1],
    ],
    [
      [1, 2, 1],
      [2, 1, 1],
      [2, 1, 1],
    ],
    [
      [2, 1, 1],
      [1, 1, 2],
      [1, 1, 2],
    ],
    [
      [2, 1, 1],
      [1, 1, 2],
      [1, 2, 1],
    ],
    [
      [2, 1, 1],
      [1, 1, 2],
      [2, 1, 1],
    ],
    [
      [2, 1, 1],
      [1, 2, 1],
      [1, 1, 2],
    ],
    [
      [2, 1, 1],
      [1, 2, 1],
      [1, 2, 1],
    ],
    [
      [2, 1, 1],
      [1, 2, 1],
      [2, 1, 1],
    ],
    [
      [2, 1, 1],
      [2, 1, 1],
      [1, 1, 2],
    ],
    [
      [2, 1, 1],
      [2, 1, 1],
      [1, 2, 1],
    ],
    [
      [2, 1, 1],
      [2, 1, 1],
      [2, 1, 1],
    ],
    [[1, 2, 3]],
    [
      [1, 2, 3],
      [1, 2, 3],
    ],
    [
      [1, 2, 3],
      [1, 3, 2],
    ],
    [
      [1, 2, 3],
      [2, 1, 3],
    ],
    [
      [1, 2, 3],
      [2, 3, 1],
    ],
    [
      [1, 2, 3],
      [3, 1, 2],
    ],
    [
      [1, 2, 3],
      [3, 2, 1],
    ],
    [
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
    ],
    [
      [1, 2, 3],
      [1, 2, 3],
      [1, 3, 2],
    ],
    [
      [1, 2, 3],
      [1, 2, 3],
      [2, 1, 3],
    ],
    [
      [1, 2, 3],
      [1, 2, 3],
      [2, 3, 1],
    ],
    [
      [1, 2, 3],
      [1, 2, 3],
      [3, 1, 2],
    ],
    [
      [1, 2, 3],
      [1, 2, 3],
      [3, 2, 1],
    ],
    [
      [1, 2, 3],
      [1, 3, 2],
      [1, 2, 3],
    ],
    [
      [1, 2, 3],
      [1, 3, 2],
      [1, 3, 2],
    ],
    [
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
    ],
    [
      [1, 2, 3],
      [1, 3, 2],
      [2, 3, 1],
    ],
    [
      [1, 2, 3],
      [1, 3, 2],
      [3, 1, 2],
    ],
    [
      [1, 2, 3],
      [1, 3, 2],
      [3, 2, 1],
    ],
    [
      [1, 2, 3],
      [2, 1, 3],
      [1, 2, 3],
    ],
    [
      [1, 2, 3],
      [2, 1, 3],
      [1, 3, 2],
    ],
    [
      [1, 2, 3],
      [2, 1, 3],
      [2, 1, 3],
    ],
    [
      [1, 2, 3],
      [2, 1, 3],
      [2, 3, 1],
    ],
    [
      [1, 2, 3],
      [2, 1, 3],
      [3, 1, 2],
    ],
    [
      [1, 2, 3],
      [2, 1, 3],
      [3, 2, 1],
    ],
    [
      [1, 2, 3],
      [2, 3, 1],
      [1, 2, 3],
    ],
    [
      [1, 2, 3],
      [2, 3, 1],
      [1, 3, 2],
    ],
    [
      [1, 2, 3],
      [2, 3, 1],
      [2, 1, 3],
    ],
    [
      [1, 2, 3],
      [2, 3, 1],
      [2, 3, 1],
    ],
    [
      [1, 2, 3],
      [2, 3, 1],
      [3, 1, 2],
    ],
    [
      [1, 2, 3],
      [2, 3, 1],
      [3, 2, 1],
    ],
    [
      [1, 2, 3],
      [3, 1, 2],
      [1, 2, 3],
    ],
    [
      [1, 2, 3],
      [3, 1, 2],
      [1, 3, 2],
    ],
    [
      [1, 2, 3],
      [3, 1, 2],
      [2, 1, 3],
    ],
    [
      [1, 2, 3],
      [3, 1, 2],
      [2, 3, 1],
    ],
    [
      [1, 2, 3],
      [3, 1, 2],
      [3, 1, 2],
    ],
    [
      [1, 2, 3],
      [3, 1, 2],
      [3, 2, 1],
    ],
    [
      [1, 2, 3],
      [3, 2, 1],
      [1, 2, 3],
    ],
    [
      [1, 2, 3],
      [3, 2, 1],
      [1, 3, 2],
    ],
    [
      [1, 2, 3],
      [3, 2, 1],
      [2, 1, 3],
    ],
    [
      [1, 2, 3],
      [3, 2, 1],
      [2, 3, 1],
    ],
    [
      [1, 2, 3],
      [3, 2, 1],
      [3, 1, 2],
    ],
    [
      [1, 2, 3],
      [3, 2, 1],
      [3, 2, 1],
    ],
    [
      ["1", 2.2, 3],
      ["1", 2.2, 3],
    ],
    [
      ["1", 2.2, 3],
      ["1", 3, 2.2],
    ],
    [
      ["1", 2.2, 3],
      [2.2, "1", 3],
    ],
    [
      ["1", 2.2, 3],
      [2.2, 3, "1"],
    ],
    [
      ["1", 2.2, 3],
      [3, "1", 2.2],
    ],
    [
      ["1", 2.2, 3],
      [3, 2.2, "1"],
    ],
    [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
    ],
    [
      [1, 2, 3, 4, 5],
      [2, 3, 4, 5, 1],
      [1, 2, 3, 4, 5],
      [2, 4, 1, 3, 5],
    ],
    [
      ["a", "b", "c"],
      ["a", "c", "b"],
      ["b", "a", "c"],
      ["b", "c", "a"],
      ["c", "a", "b"],
      ["c", "b", "a"],
    ],
  ];
}

function dataProviderForGeneratorsTrue(): Array<unknown> {
  return [
    [],
    [createGeneratorFixture([])],
    [createGeneratorFixture([]), createGeneratorFixture([])],
    [
      createGeneratorFixture([]),
      createGeneratorFixture([]),
      createGeneratorFixture([]),
    ],
    [createGeneratorFixture([1])],
    [createGeneratorFixture([1]), createGeneratorFixture([1])],
    [
      createGeneratorFixture([1]),
      createGeneratorFixture([1]),
      createGeneratorFixture([1]),
    ],
    [createGeneratorFixture([1, 1])],
    [createGeneratorFixture([1, 1]), createGeneratorFixture([1, 1])],
    [
      createGeneratorFixture([1, 1]),
      createGeneratorFixture([1, 1]),
      createGeneratorFixture([1, 1]),
    ],
    [createGeneratorFixture([1, 2])],
    [createGeneratorFixture([1, 2]), createGeneratorFixture([1, 2])],
    [createGeneratorFixture([1, 2]), createGeneratorFixture([2, 1])],
    [createGeneratorFixture([2, 1]), createGeneratorFixture([1, 2])],
    [
      createGeneratorFixture([1, 2]),
      createGeneratorFixture([1, 2]),
      createGeneratorFixture([1, 2]),
    ],
    [
      createGeneratorFixture([1, 2]),
      createGeneratorFixture([1, 2]),
      createGeneratorFixture([2, 1]),
    ],
    [
      createGeneratorFixture([1, 2]),
      createGeneratorFixture([2, 1]),
      createGeneratorFixture([1, 2]),
    ],
    [
      createGeneratorFixture([1, 2]),
      createGeneratorFixture([2, 1]),
      createGeneratorFixture([2, 1]),
    ],
    [
      createGeneratorFixture([2, 1]),
      createGeneratorFixture([1, 2]),
      createGeneratorFixture([1, 2]),
    ],
    [
      createGeneratorFixture([2, 1]),
      createGeneratorFixture([1, 2]),
      createGeneratorFixture([2, 1]),
    ],
    [
      createGeneratorFixture([2, 1]),
      createGeneratorFixture([2, 1]),
      createGeneratorFixture([1, 2]),
    ],
    [
      createGeneratorFixture([2, 1]),
      createGeneratorFixture([2, 1]),
      createGeneratorFixture([2, 1]),
    ],
    [createGeneratorFixture([1, 1, 1])],
    [createGeneratorFixture([1, 1, 1]), createGeneratorFixture([1, 1, 1])],
    [
      createGeneratorFixture([1, 1, 1]),
      createGeneratorFixture([1, 1, 1]),
      createGeneratorFixture([1, 1, 1]),
    ],
    [createGeneratorFixture([1, 1, 2])],
    [createGeneratorFixture([1, 1, 2]), createGeneratorFixture([1, 1, 2])],
    [createGeneratorFixture([1, 1, 2]), createGeneratorFixture([1, 2, 1])],
    [createGeneratorFixture([1, 1, 2]), createGeneratorFixture([2, 1, 1])],
    [
      createGeneratorFixture([1, 1, 2]),
      createGeneratorFixture([1, 1, 2]),
      createGeneratorFixture([1, 1, 2]),
    ],
    [
      createGeneratorFixture([1, 1, 2]),
      createGeneratorFixture([1, 1, 2]),
      createGeneratorFixture([1, 2, 1]),
    ],
    [
      createGeneratorFixture([1, 1, 2]),
      createGeneratorFixture([1, 1, 2]),
      createGeneratorFixture([2, 1, 1]),
    ],
    [
      createGeneratorFixture([1, 1, 2]),
      createGeneratorFixture([1, 2, 1]),
      createGeneratorFixture([1, 1, 2]),
    ],
    [
      createGeneratorFixture([1, 1, 2]),
      createGeneratorFixture([1, 2, 1]),
      createGeneratorFixture([1, 2, 1]),
    ],
    [
      createGeneratorFixture([1, 1, 2]),
      createGeneratorFixture([1, 2, 1]),
      createGeneratorFixture([2, 1, 1]),
    ],
    [
      createGeneratorFixture([1, 1, 2]),
      createGeneratorFixture([2, 1, 1]),
      createGeneratorFixture([1, 1, 2]),
    ],
    [
      createGeneratorFixture([1, 1, 2]),
      createGeneratorFixture([2, 1, 1]),
      createGeneratorFixture([1, 2, 1]),
    ],
    [
      createGeneratorFixture([1, 1, 2]),
      createGeneratorFixture([2, 1, 1]),
      createGeneratorFixture([2, 1, 1]),
    ],
    [
      createGeneratorFixture([1, 2, 1]),
      createGeneratorFixture([1, 1, 2]),
      createGeneratorFixture([1, 1, 2]),
    ],
    [
      createGeneratorFixture([1, 2, 1]),
      createGeneratorFixture([1, 1, 2]),
      createGeneratorFixture([1, 2, 1]),
    ],
    [
      createGeneratorFixture([1, 2, 1]),
      createGeneratorFixture([1, 1, 2]),
      createGeneratorFixture([2, 1, 1]),
    ],
    [
      createGeneratorFixture([1, 2, 1]),
      createGeneratorFixture([1, 2, 1]),
      createGeneratorFixture([1, 1, 2]),
    ],
    [
      createGeneratorFixture([1, 2, 1]),
      createGeneratorFixture([1, 2, 1]),
      createGeneratorFixture([1, 2, 1]),
    ],
    [
      createGeneratorFixture([1, 2, 1]),
      createGeneratorFixture([1, 2, 1]),
      createGeneratorFixture([2, 1, 1]),
    ],
    [
      createGeneratorFixture([1, 2, 1]),
      createGeneratorFixture([2, 1, 1]),
      createGeneratorFixture([1, 1, 2]),
    ],
    [
      createGeneratorFixture([1, 2, 1]),
      createGeneratorFixture([2, 1, 1]),
      createGeneratorFixture([1, 2, 1]),
    ],
    [
      createGeneratorFixture([1, 2, 1]),
      createGeneratorFixture([2, 1, 1]),
      createGeneratorFixture([2, 1, 1]),
    ],
    [
      createGeneratorFixture([2, 1, 1]),
      createGeneratorFixture([1, 1, 2]),
      createGeneratorFixture([1, 1, 2]),
    ],
    [
      createGeneratorFixture([2, 1, 1]),
      createGeneratorFixture([1, 1, 2]),
      createGeneratorFixture([1, 2, 1]),
    ],
    [
      createGeneratorFixture([2, 1, 1]),
      createGeneratorFixture([1, 1, 2]),
      createGeneratorFixture([2, 1, 1]),
    ],
    [
      createGeneratorFixture([2, 1, 1]),
      createGeneratorFixture([1, 2, 1]),
      createGeneratorFixture([1, 1, 2]),
    ],
    [
      createGeneratorFixture([2, 1, 1]),
      createGeneratorFixture([1, 2, 1]),
      createGeneratorFixture([1, 2, 1]),
    ],
    [
      createGeneratorFixture([2, 1, 1]),
      createGeneratorFixture([1, 2, 1]),
      createGeneratorFixture([2, 1, 1]),
    ],
    [
      createGeneratorFixture([2, 1, 1]),
      createGeneratorFixture([2, 1, 1]),
      createGeneratorFixture([1, 1, 2]),
    ],
    [
      createGeneratorFixture([2, 1, 1]),
      createGeneratorFixture([2, 1, 1]),
      createGeneratorFixture([1, 2, 1]),
    ],
    [
      createGeneratorFixture([2, 1, 1]),
      createGeneratorFixture([2, 1, 1]),
      createGeneratorFixture([2, 1, 1]),
    ],
    [createGeneratorFixture([1, 2, 3])],
    [createGeneratorFixture([1, 2, 3]), createGeneratorFixture([1, 2, 3])],
    [createGeneratorFixture([1, 2, 3]), createGeneratorFixture([1, 3, 2])],
    [createGeneratorFixture([1, 2, 3]), createGeneratorFixture([2, 1, 3])],
    [createGeneratorFixture([1, 2, 3]), createGeneratorFixture([2, 3, 1])],
    [createGeneratorFixture([1, 2, 3]), createGeneratorFixture([3, 1, 2])],
    [createGeneratorFixture([1, 2, 3]), createGeneratorFixture([3, 2, 1])],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([1, 2, 3]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([1, 3, 2]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([2, 1, 3]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([2, 3, 1]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([3, 1, 2]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([3, 2, 1]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([1, 3, 2]),
      createGeneratorFixture([1, 2, 3]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([1, 3, 2]),
      createGeneratorFixture([1, 3, 2]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([1, 3, 2]),
      createGeneratorFixture([2, 1, 3]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([1, 3, 2]),
      createGeneratorFixture([2, 3, 1]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([1, 3, 2]),
      createGeneratorFixture([3, 1, 2]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([1, 3, 2]),
      createGeneratorFixture([3, 2, 1]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([2, 1, 3]),
      createGeneratorFixture([1, 2, 3]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([2, 1, 3]),
      createGeneratorFixture([1, 3, 2]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([2, 1, 3]),
      createGeneratorFixture([2, 1, 3]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([2, 1, 3]),
      createGeneratorFixture([2, 3, 1]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([2, 1, 3]),
      createGeneratorFixture([3, 1, 2]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([2, 1, 3]),
      createGeneratorFixture([3, 2, 1]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([2, 3, 1]),
      createGeneratorFixture([1, 2, 3]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([2, 3, 1]),
      createGeneratorFixture([1, 3, 2]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([2, 3, 1]),
      createGeneratorFixture([2, 1, 3]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([2, 3, 1]),
      createGeneratorFixture([2, 3, 1]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([2, 3, 1]),
      createGeneratorFixture([3, 1, 2]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([2, 3, 1]),
      createGeneratorFixture([3, 2, 1]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([3, 1, 2]),
      createGeneratorFixture([1, 2, 3]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([3, 1, 2]),
      createGeneratorFixture([1, 3, 2]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([3, 1, 2]),
      createGeneratorFixture([2, 1, 3]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([3, 1, 2]),
      createGeneratorFixture([2, 3, 1]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([3, 1, 2]),
      createGeneratorFixture([3, 1, 2]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([3, 1, 2]),
      createGeneratorFixture([3, 2, 1]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([3, 2, 1]),
      createGeneratorFixture([1, 2, 3]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([3, 2, 1]),
      createGeneratorFixture([1, 3, 2]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([3, 2, 1]),
      createGeneratorFixture([2, 1, 3]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([3, 2, 1]),
      createGeneratorFixture([2, 3, 1]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([3, 2, 1]),
      createGeneratorFixture([3, 1, 2]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([3, 2, 1]),
      createGeneratorFixture([3, 2, 1]),
    ],
    [
      createGeneratorFixture(["1", 2.2, 3]),
      createGeneratorFixture(["1", 2.2, 3]),
    ],
    [
      createGeneratorFixture(["1", 2.2, 3]),
      createGeneratorFixture(["1", 3, 2.2]),
    ],
    [
      createGeneratorFixture(["1", 2.2, 3]),
      createGeneratorFixture([2.2, "1", 3]),
    ],
    [
      createGeneratorFixture(["1", 2.2, 3]),
      createGeneratorFixture([2.2, 3, "1"]),
    ],
    [
      createGeneratorFixture(["1", 2.2, 3]),
      createGeneratorFixture([3, "1", 2.2]),
    ],
    [
      createGeneratorFixture(["1", 2.2, 3]),
      createGeneratorFixture([3, 2.2, "1"]),
    ],
    [
      createGeneratorFixture([1, 1, 1, 1, 1]),
      createGeneratorFixture([1, 1, 1, 1, 1]),
      createGeneratorFixture([1, 1, 1, 1, 1]),
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5]),
      createGeneratorFixture([2, 3, 4, 5, 1]),
      createGeneratorFixture([1, 2, 3, 4, 5]),
      createGeneratorFixture([2, 4, 1, 3, 5]),
    ],
    [
      createGeneratorFixture(["a", "b", "c"]),
      createGeneratorFixture(["a", "c", "b"]),
      createGeneratorFixture(["b", "a", "c"]),
      createGeneratorFixture(["b", "c", "a"]),
      createGeneratorFixture(["c", "a", "b"]),
      createGeneratorFixture(["c", "b", "a"]),
    ],
  ];
}

function dataProviderForIterablesTrue(): Array<unknown> {
  return [
    [],
    [createIterableFixture([])],
    [createIterableFixture([]), createIterableFixture([])],
    [
      createIterableFixture([]),
      createIterableFixture([]),
      createIterableFixture([]),
    ],
    [createIterableFixture([1])],
    [createIterableFixture([1]), createIterableFixture([1])],
    [
      createIterableFixture([1]),
      createIterableFixture([1]),
      createIterableFixture([1]),
    ],
    [createIterableFixture([1, 1])],
    [createIterableFixture([1, 1]), createIterableFixture([1, 1])],
    [
      createIterableFixture([1, 1]),
      createIterableFixture([1, 1]),
      createIterableFixture([1, 1]),
    ],
    [createIterableFixture([1, 2])],
    [createIterableFixture([1, 2]), createIterableFixture([1, 2])],
    [createIterableFixture([1, 2]), createIterableFixture([2, 1])],
    [createIterableFixture([2, 1]), createIterableFixture([1, 2])],
    [
      createIterableFixture([1, 2]),
      createIterableFixture([1, 2]),
      createIterableFixture([1, 2]),
    ],
    [
      createIterableFixture([1, 2]),
      createIterableFixture([1, 2]),
      createIterableFixture([2, 1]),
    ],
    [
      createIterableFixture([1, 2]),
      createIterableFixture([2, 1]),
      createIterableFixture([1, 2]),
    ],
    [
      createIterableFixture([1, 2]),
      createIterableFixture([2, 1]),
      createIterableFixture([2, 1]),
    ],
    [
      createIterableFixture([2, 1]),
      createIterableFixture([1, 2]),
      createIterableFixture([1, 2]),
    ],
    [
      createIterableFixture([2, 1]),
      createIterableFixture([1, 2]),
      createIterableFixture([2, 1]),
    ],
    [
      createIterableFixture([2, 1]),
      createIterableFixture([2, 1]),
      createIterableFixture([1, 2]),
    ],
    [
      createIterableFixture([2, 1]),
      createIterableFixture([2, 1]),
      createIterableFixture([2, 1]),
    ],
    [createIterableFixture([1, 1, 1])],
    [createIterableFixture([1, 1, 1]), createIterableFixture([1, 1, 1])],
    [
      createIterableFixture([1, 1, 1]),
      createIterableFixture([1, 1, 1]),
      createIterableFixture([1, 1, 1]),
    ],
    [createIterableFixture([1, 1, 2])],
    [createIterableFixture([1, 1, 2]), createIterableFixture([1, 1, 2])],
    [createIterableFixture([1, 1, 2]), createIterableFixture([1, 2, 1])],
    [createIterableFixture([1, 1, 2]), createIterableFixture([2, 1, 1])],
    [
      createIterableFixture([1, 1, 2]),
      createIterableFixture([1, 1, 2]),
      createIterableFixture([1, 1, 2]),
    ],
    [
      createIterableFixture([1, 1, 2]),
      createIterableFixture([1, 1, 2]),
      createIterableFixture([1, 2, 1]),
    ],
    [
      createIterableFixture([1, 1, 2]),
      createIterableFixture([1, 1, 2]),
      createIterableFixture([2, 1, 1]),
    ],
    [
      createIterableFixture([1, 1, 2]),
      createIterableFixture([1, 2, 1]),
      createIterableFixture([1, 1, 2]),
    ],
    [
      createIterableFixture([1, 1, 2]),
      createIterableFixture([1, 2, 1]),
      createIterableFixture([1, 2, 1]),
    ],
    [
      createIterableFixture([1, 1, 2]),
      createIterableFixture([1, 2, 1]),
      createIterableFixture([2, 1, 1]),
    ],
    [
      createIterableFixture([1, 1, 2]),
      createIterableFixture([2, 1, 1]),
      createIterableFixture([1, 1, 2]),
    ],
    [
      createIterableFixture([1, 1, 2]),
      createIterableFixture([2, 1, 1]),
      createIterableFixture([1, 2, 1]),
    ],
    [
      createIterableFixture([1, 1, 2]),
      createIterableFixture([2, 1, 1]),
      createIterableFixture([2, 1, 1]),
    ],
    [
      createIterableFixture([1, 2, 1]),
      createIterableFixture([1, 1, 2]),
      createIterableFixture([1, 1, 2]),
    ],
    [
      createIterableFixture([1, 2, 1]),
      createIterableFixture([1, 1, 2]),
      createIterableFixture([1, 2, 1]),
    ],
    [
      createIterableFixture([1, 2, 1]),
      createIterableFixture([1, 1, 2]),
      createIterableFixture([2, 1, 1]),
    ],
    [
      createIterableFixture([1, 2, 1]),
      createIterableFixture([1, 2, 1]),
      createIterableFixture([1, 1, 2]),
    ],
    [
      createIterableFixture([1, 2, 1]),
      createIterableFixture([1, 2, 1]),
      createIterableFixture([1, 2, 1]),
    ],
    [
      createIterableFixture([1, 2, 1]),
      createIterableFixture([1, 2, 1]),
      createIterableFixture([2, 1, 1]),
    ],
    [
      createIterableFixture([1, 2, 1]),
      createIterableFixture([2, 1, 1]),
      createIterableFixture([1, 1, 2]),
    ],
    [
      createIterableFixture([1, 2, 1]),
      createIterableFixture([2, 1, 1]),
      createIterableFixture([1, 2, 1]),
    ],
    [
      createIterableFixture([1, 2, 1]),
      createIterableFixture([2, 1, 1]),
      createIterableFixture([2, 1, 1]),
    ],
    [
      createIterableFixture([2, 1, 1]),
      createIterableFixture([1, 1, 2]),
      createIterableFixture([1, 1, 2]),
    ],
    [
      createIterableFixture([2, 1, 1]),
      createIterableFixture([1, 1, 2]),
      createIterableFixture([1, 2, 1]),
    ],
    [
      createIterableFixture([2, 1, 1]),
      createIterableFixture([1, 1, 2]),
      createIterableFixture([2, 1, 1]),
    ],
    [
      createIterableFixture([2, 1, 1]),
      createIterableFixture([1, 2, 1]),
      createIterableFixture([1, 1, 2]),
    ],
    [
      createIterableFixture([2, 1, 1]),
      createIterableFixture([1, 2, 1]),
      createIterableFixture([1, 2, 1]),
    ],
    [
      createIterableFixture([2, 1, 1]),
      createIterableFixture([1, 2, 1]),
      createIterableFixture([2, 1, 1]),
    ],
    [
      createIterableFixture([2, 1, 1]),
      createIterableFixture([2, 1, 1]),
      createIterableFixture([1, 1, 2]),
    ],
    [
      createIterableFixture([2, 1, 1]),
      createIterableFixture([2, 1, 1]),
      createIterableFixture([1, 2, 1]),
    ],
    [
      createIterableFixture([2, 1, 1]),
      createIterableFixture([2, 1, 1]),
      createIterableFixture([2, 1, 1]),
    ],
    [createIterableFixture([1, 2, 3])],
    [createIterableFixture([1, 2, 3]), createIterableFixture([1, 2, 3])],
    [createIterableFixture([1, 2, 3]), createIterableFixture([1, 3, 2])],
    [createIterableFixture([1, 2, 3]), createIterableFixture([2, 1, 3])],
    [createIterableFixture([1, 2, 3]), createIterableFixture([2, 3, 1])],
    [createIterableFixture([1, 2, 3]), createIterableFixture([3, 1, 2])],
    [createIterableFixture([1, 2, 3]), createIterableFixture([3, 2, 1])],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([1, 2, 3]),
      createIterableFixture([1, 2, 3]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([1, 2, 3]),
      createIterableFixture([1, 3, 2]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([1, 2, 3]),
      createIterableFixture([2, 1, 3]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([1, 2, 3]),
      createIterableFixture([2, 3, 1]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([1, 2, 3]),
      createIterableFixture([3, 1, 2]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([1, 2, 3]),
      createIterableFixture([3, 2, 1]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([1, 3, 2]),
      createIterableFixture([1, 2, 3]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([1, 3, 2]),
      createIterableFixture([1, 3, 2]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([1, 3, 2]),
      createIterableFixture([2, 1, 3]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([1, 3, 2]),
      createIterableFixture([2, 3, 1]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([1, 3, 2]),
      createIterableFixture([3, 1, 2]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([1, 3, 2]),
      createIterableFixture([3, 2, 1]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([2, 1, 3]),
      createIterableFixture([1, 2, 3]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([2, 1, 3]),
      createIterableFixture([1, 3, 2]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([2, 1, 3]),
      createIterableFixture([2, 1, 3]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([2, 1, 3]),
      createIterableFixture([2, 3, 1]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([2, 1, 3]),
      createIterableFixture([3, 1, 2]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([2, 1, 3]),
      createIterableFixture([3, 2, 1]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([2, 3, 1]),
      createIterableFixture([1, 2, 3]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([2, 3, 1]),
      createIterableFixture([1, 3, 2]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([2, 3, 1]),
      createIterableFixture([2, 1, 3]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([2, 3, 1]),
      createIterableFixture([2, 3, 1]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([2, 3, 1]),
      createIterableFixture([3, 1, 2]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([2, 3, 1]),
      createIterableFixture([3, 2, 1]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([3, 1, 2]),
      createIterableFixture([1, 2, 3]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([3, 1, 2]),
      createIterableFixture([1, 3, 2]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([3, 1, 2]),
      createIterableFixture([2, 1, 3]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([3, 1, 2]),
      createIterableFixture([2, 3, 1]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([3, 1, 2]),
      createIterableFixture([3, 1, 2]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([3, 1, 2]),
      createIterableFixture([3, 2, 1]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([3, 2, 1]),
      createIterableFixture([1, 2, 3]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([3, 2, 1]),
      createIterableFixture([1, 3, 2]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([3, 2, 1]),
      createIterableFixture([2, 1, 3]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([3, 2, 1]),
      createIterableFixture([2, 3, 1]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([3, 2, 1]),
      createIterableFixture([3, 1, 2]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([3, 2, 1]),
      createIterableFixture([3, 2, 1]),
    ],
    [
      createIterableFixture(["1", 2.2, 3]),
      createIterableFixture(["1", 2.2, 3]),
    ],
    [
      createIterableFixture(["1", 2.2, 3]),
      createIterableFixture(["1", 3, 2.2]),
    ],
    [
      createIterableFixture(["1", 2.2, 3]),
      createIterableFixture([2.2, "1", 3]),
    ],
    [
      createIterableFixture(["1", 2.2, 3]),
      createIterableFixture([2.2, 3, "1"]),
    ],
    [
      createIterableFixture(["1", 2.2, 3]),
      createIterableFixture([3, "1", 2.2]),
    ],
    [
      createIterableFixture(["1", 2.2, 3]),
      createIterableFixture([3, 2.2, "1"]),
    ],
    [
      createIterableFixture([1, 1, 1, 1, 1]),
      createIterableFixture([1, 1, 1, 1, 1]),
      createIterableFixture([1, 1, 1, 1, 1]),
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5]),
      createIterableFixture([2, 3, 4, 5, 1]),
      createIterableFixture([1, 2, 3, 4, 5]),
      createIterableFixture([2, 4, 1, 3, 5]),
    ],
    [
      createIterableFixture(["a", "b", "c"]),
      createIterableFixture(["a", "c", "b"]),
      createIterableFixture(["b", "a", "c"]),
      createIterableFixture(["b", "c", "a"]),
      createIterableFixture(["c", "a", "b"]),
      createIterableFixture(["c", "b", "a"]),
    ],
  ];
}

function dataProviderForIteratorsTrue(): Array<unknown> {
  return [
    [],
    [createIteratorFixture([])],
    [createIteratorFixture([]), createIteratorFixture([])],
    [
      createIteratorFixture([]),
      createIteratorFixture([]),
      createIteratorFixture([]),
    ],
    [createIteratorFixture([1])],
    [createIteratorFixture([1]), createIteratorFixture([1])],
    [
      createIteratorFixture([1]),
      createIteratorFixture([1]),
      createIteratorFixture([1]),
    ],
    [createIteratorFixture([1, 1])],
    [createIteratorFixture([1, 1]), createIteratorFixture([1, 1])],
    [
      createIteratorFixture([1, 1]),
      createIteratorFixture([1, 1]),
      createIteratorFixture([1, 1]),
    ],
    [createIteratorFixture([1, 2])],
    [createIteratorFixture([1, 2]), createIteratorFixture([1, 2])],
    [createIteratorFixture([1, 2]), createIteratorFixture([2, 1])],
    [createIteratorFixture([2, 1]), createIteratorFixture([1, 2])],
    [
      createIteratorFixture([1, 2]),
      createIteratorFixture([1, 2]),
      createIteratorFixture([1, 2]),
    ],
    [
      createIteratorFixture([1, 2]),
      createIteratorFixture([1, 2]),
      createIteratorFixture([2, 1]),
    ],
    [
      createIteratorFixture([1, 2]),
      createIteratorFixture([2, 1]),
      createIteratorFixture([1, 2]),
    ],
    [
      createIteratorFixture([1, 2]),
      createIteratorFixture([2, 1]),
      createIteratorFixture([2, 1]),
    ],
    [
      createIteratorFixture([2, 1]),
      createIteratorFixture([1, 2]),
      createIteratorFixture([1, 2]),
    ],
    [
      createIteratorFixture([2, 1]),
      createIteratorFixture([1, 2]),
      createIteratorFixture([2, 1]),
    ],
    [
      createIteratorFixture([2, 1]),
      createIteratorFixture([2, 1]),
      createIteratorFixture([1, 2]),
    ],
    [
      createIteratorFixture([2, 1]),
      createIteratorFixture([2, 1]),
      createIteratorFixture([2, 1]),
    ],
    [createIteratorFixture([1, 1, 1])],
    [createIteratorFixture([1, 1, 1]), createIteratorFixture([1, 1, 1])],
    [
      createIteratorFixture([1, 1, 1]),
      createIteratorFixture([1, 1, 1]),
      createIteratorFixture([1, 1, 1]),
    ],
    [createIteratorFixture([1, 1, 2])],
    [createIteratorFixture([1, 1, 2]), createIteratorFixture([1, 1, 2])],
    [createIteratorFixture([1, 1, 2]), createIteratorFixture([1, 2, 1])],
    [createIteratorFixture([1, 1, 2]), createIteratorFixture([2, 1, 1])],
    [
      createIteratorFixture([1, 1, 2]),
      createIteratorFixture([1, 1, 2]),
      createIteratorFixture([1, 1, 2]),
    ],
    [
      createIteratorFixture([1, 1, 2]),
      createIteratorFixture([1, 1, 2]),
      createIteratorFixture([1, 2, 1]),
    ],
    [
      createIteratorFixture([1, 1, 2]),
      createIteratorFixture([1, 1, 2]),
      createIteratorFixture([2, 1, 1]),
    ],
    [
      createIteratorFixture([1, 1, 2]),
      createIteratorFixture([1, 2, 1]),
      createIteratorFixture([1, 1, 2]),
    ],
    [
      createIteratorFixture([1, 1, 2]),
      createIteratorFixture([1, 2, 1]),
      createIteratorFixture([1, 2, 1]),
    ],
    [
      createIteratorFixture([1, 1, 2]),
      createIteratorFixture([1, 2, 1]),
      createIteratorFixture([2, 1, 1]),
    ],
    [
      createIteratorFixture([1, 1, 2]),
      createIteratorFixture([2, 1, 1]),
      createIteratorFixture([1, 1, 2]),
    ],
    [
      createIteratorFixture([1, 1, 2]),
      createIteratorFixture([2, 1, 1]),
      createIteratorFixture([1, 2, 1]),
    ],
    [
      createIteratorFixture([1, 1, 2]),
      createIteratorFixture([2, 1, 1]),
      createIteratorFixture([2, 1, 1]),
    ],
    [
      createIteratorFixture([1, 2, 1]),
      createIteratorFixture([1, 1, 2]),
      createIteratorFixture([1, 1, 2]),
    ],
    [
      createIteratorFixture([1, 2, 1]),
      createIteratorFixture([1, 1, 2]),
      createIteratorFixture([1, 2, 1]),
    ],
    [
      createIteratorFixture([1, 2, 1]),
      createIteratorFixture([1, 1, 2]),
      createIteratorFixture([2, 1, 1]),
    ],
    [
      createIteratorFixture([1, 2, 1]),
      createIteratorFixture([1, 2, 1]),
      createIteratorFixture([1, 1, 2]),
    ],
    [
      createIteratorFixture([1, 2, 1]),
      createIteratorFixture([1, 2, 1]),
      createIteratorFixture([1, 2, 1]),
    ],
    [
      createIteratorFixture([1, 2, 1]),
      createIteratorFixture([1, 2, 1]),
      createIteratorFixture([2, 1, 1]),
    ],
    [
      createIteratorFixture([1, 2, 1]),
      createIteratorFixture([2, 1, 1]),
      createIteratorFixture([1, 1, 2]),
    ],
    [
      createIteratorFixture([1, 2, 1]),
      createIteratorFixture([2, 1, 1]),
      createIteratorFixture([1, 2, 1]),
    ],
    [
      createIteratorFixture([1, 2, 1]),
      createIteratorFixture([2, 1, 1]),
      createIteratorFixture([2, 1, 1]),
    ],
    [
      createIteratorFixture([2, 1, 1]),
      createIteratorFixture([1, 1, 2]),
      createIteratorFixture([1, 1, 2]),
    ],
    [
      createIteratorFixture([2, 1, 1]),
      createIteratorFixture([1, 1, 2]),
      createIteratorFixture([1, 2, 1]),
    ],
    [
      createIteratorFixture([2, 1, 1]),
      createIteratorFixture([1, 1, 2]),
      createIteratorFixture([2, 1, 1]),
    ],
    [
      createIteratorFixture([2, 1, 1]),
      createIteratorFixture([1, 2, 1]),
      createIteratorFixture([1, 1, 2]),
    ],
    [
      createIteratorFixture([2, 1, 1]),
      createIteratorFixture([1, 2, 1]),
      createIteratorFixture([1, 2, 1]),
    ],
    [
      createIteratorFixture([2, 1, 1]),
      createIteratorFixture([1, 2, 1]),
      createIteratorFixture([2, 1, 1]),
    ],
    [
      createIteratorFixture([2, 1, 1]),
      createIteratorFixture([2, 1, 1]),
      createIteratorFixture([1, 1, 2]),
    ],
    [
      createIteratorFixture([2, 1, 1]),
      createIteratorFixture([2, 1, 1]),
      createIteratorFixture([1, 2, 1]),
    ],
    [
      createIteratorFixture([2, 1, 1]),
      createIteratorFixture([2, 1, 1]),
      createIteratorFixture([2, 1, 1]),
    ],
    [createIteratorFixture([1, 2, 3])],
    [createIteratorFixture([1, 2, 3]), createIteratorFixture([1, 2, 3])],
    [createIteratorFixture([1, 2, 3]), createIteratorFixture([1, 3, 2])],
    [createIteratorFixture([1, 2, 3]), createIteratorFixture([2, 1, 3])],
    [createIteratorFixture([1, 2, 3]), createIteratorFixture([2, 3, 1])],
    [createIteratorFixture([1, 2, 3]), createIteratorFixture([3, 1, 2])],
    [createIteratorFixture([1, 2, 3]), createIteratorFixture([3, 2, 1])],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([1, 2, 3]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([1, 3, 2]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([2, 1, 3]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([2, 3, 1]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([3, 1, 2]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([3, 2, 1]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([1, 3, 2]),
      createIteratorFixture([1, 2, 3]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([1, 3, 2]),
      createIteratorFixture([1, 3, 2]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([1, 3, 2]),
      createIteratorFixture([2, 1, 3]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([1, 3, 2]),
      createIteratorFixture([2, 3, 1]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([1, 3, 2]),
      createIteratorFixture([3, 1, 2]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([1, 3, 2]),
      createIteratorFixture([3, 2, 1]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([2, 1, 3]),
      createIteratorFixture([1, 2, 3]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([2, 1, 3]),
      createIteratorFixture([1, 3, 2]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([2, 1, 3]),
      createIteratorFixture([2, 1, 3]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([2, 1, 3]),
      createIteratorFixture([2, 3, 1]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([2, 1, 3]),
      createIteratorFixture([3, 1, 2]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([2, 1, 3]),
      createIteratorFixture([3, 2, 1]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([2, 3, 1]),
      createIteratorFixture([1, 2, 3]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([2, 3, 1]),
      createIteratorFixture([1, 3, 2]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([2, 3, 1]),
      createIteratorFixture([2, 1, 3]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([2, 3, 1]),
      createIteratorFixture([2, 3, 1]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([2, 3, 1]),
      createIteratorFixture([3, 1, 2]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([2, 3, 1]),
      createIteratorFixture([3, 2, 1]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([3, 1, 2]),
      createIteratorFixture([1, 2, 3]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([3, 1, 2]),
      createIteratorFixture([1, 3, 2]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([3, 1, 2]),
      createIteratorFixture([2, 1, 3]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([3, 1, 2]),
      createIteratorFixture([2, 3, 1]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([3, 1, 2]),
      createIteratorFixture([3, 1, 2]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([3, 1, 2]),
      createIteratorFixture([3, 2, 1]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([3, 2, 1]),
      createIteratorFixture([1, 2, 3]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([3, 2, 1]),
      createIteratorFixture([1, 3, 2]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([3, 2, 1]),
      createIteratorFixture([2, 1, 3]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([3, 2, 1]),
      createIteratorFixture([2, 3, 1]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([3, 2, 1]),
      createIteratorFixture([3, 1, 2]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([3, 2, 1]),
      createIteratorFixture([3, 2, 1]),
    ],
    [
      createIteratorFixture(["1", 2.2, 3]),
      createIteratorFixture(["1", 2.2, 3]),
    ],
    [
      createIteratorFixture(["1", 2.2, 3]),
      createIteratorFixture(["1", 3, 2.2]),
    ],
    [
      createIteratorFixture(["1", 2.2, 3]),
      createIteratorFixture([2.2, "1", 3]),
    ],
    [
      createIteratorFixture(["1", 2.2, 3]),
      createIteratorFixture([2.2, 3, "1"]),
    ],
    [
      createIteratorFixture(["1", 2.2, 3]),
      createIteratorFixture([3, "1", 2.2]),
    ],
    [
      createIteratorFixture(["1", 2.2, 3]),
      createIteratorFixture([3, 2.2, "1"]),
    ],
    [
      createIteratorFixture([1, 1, 1, 1, 1]),
      createIteratorFixture([1, 1, 1, 1, 1]),
      createIteratorFixture([1, 1, 1, 1, 1]),
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5]),
      createIteratorFixture([2, 3, 4, 5, 1]),
      createIteratorFixture([1, 2, 3, 4, 5]),
      createIteratorFixture([2, 4, 1, 3, 5]),
    ],
    [
      createIteratorFixture(["a", "b", "c"]),
      createIteratorFixture(["a", "c", "b"]),
      createIteratorFixture(["b", "a", "c"]),
      createIteratorFixture(["b", "c", "a"]),
      createIteratorFixture(["c", "a", "b"]),
      createIteratorFixture(["c", "b", "a"]),
    ],
  ];
}

function dataProviderForStringsTrue(): Array<unknown> {
  return [
    [""],
    ["", ""],
    ["", "", ""],
    ["12"],
    ["12", "12"],
    ["12", "12", "12"],
    ["12", "21"],
    ["12", "21", "12"],
    ["123", "231", "321"],
    ["123", "231", "321", "231"],
  ];
}

function dataProviderForSetsTrue(): Array<unknown> {
  return [
    [],
    [new Set([])],
    [new Set([]), new Set([])],
    [new Set([]), new Set([]), new Set([])],
    [new Set([1])],
    [new Set([1]), new Set([1])],
    [new Set([1]), new Set([1]), new Set([1])],
    [new Set([1, 2])],
    [new Set([1, 2]), new Set([1, 2])],
    [new Set([1, 2]), new Set([2, 1])],
    [new Set([2, 1]), new Set([1, 2])],
    [new Set([1, 2]), new Set([1, 2]), new Set([1, 2])],
    [new Set([1, 2]), new Set([1, 2]), new Set([2, 1])],
    [new Set([1, 2]), new Set([2, 1]), new Set([1, 2])],
    [new Set([1, 2]), new Set([2, 1]), new Set([2, 1])],
    [new Set([2, 1]), new Set([1, 2]), new Set([1, 2])],
    [new Set([2, 1]), new Set([1, 2]), new Set([2, 1])],
    [new Set([2, 1]), new Set([2, 1]), new Set([1, 2])],
    [new Set([2, 1]), new Set([2, 1]), new Set([2, 1])],
    [new Set([1, 2, 3])],
    [new Set([1, 2, 3]), new Set([1, 2, 3])],
    [new Set([1, 2, 3]), new Set([1, 3, 2])],
    [new Set([1, 2, 3]), new Set([2, 1, 3])],
    [new Set([1, 2, 3]), new Set([2, 3, 1])],
    [new Set([1, 2, 3]), new Set([3, 1, 2])],
    [new Set([1, 2, 3]), new Set([3, 2, 1])],
    [new Set([1, 2, 3]), new Set([1, 2, 3]), new Set([1, 2, 3])],
    [new Set([1, 2, 3]), new Set([1, 2, 3]), new Set([1, 3, 2])],
    [new Set([1, 2, 3]), new Set([1, 2, 3]), new Set([2, 1, 3])],
    [new Set([1, 2, 3]), new Set([1, 2, 3]), new Set([2, 3, 1])],
    [new Set([1, 2, 3]), new Set([1, 2, 3]), new Set([3, 1, 2])],
    [new Set([1, 2, 3]), new Set([1, 2, 3]), new Set([3, 2, 1])],
    [new Set([1, 2, 3]), new Set([1, 3, 2]), new Set([1, 2, 3])],
    [new Set([1, 2, 3]), new Set([1, 3, 2]), new Set([1, 3, 2])],
    [new Set([1, 2, 3]), new Set([1, 3, 2]), new Set([2, 1, 3])],
    [new Set([1, 2, 3]), new Set([1, 3, 2]), new Set([2, 3, 1])],
    [new Set([1, 2, 3]), new Set([1, 3, 2]), new Set([3, 1, 2])],
    [new Set([1, 2, 3]), new Set([1, 3, 2]), new Set([3, 2, 1])],
    [new Set([1, 2, 3]), new Set([2, 1, 3]), new Set([1, 2, 3])],
    [new Set([1, 2, 3]), new Set([2, 1, 3]), new Set([1, 3, 2])],
    [new Set([1, 2, 3]), new Set([2, 1, 3]), new Set([2, 1, 3])],
    [new Set([1, 2, 3]), new Set([2, 1, 3]), new Set([2, 3, 1])],
    [new Set([1, 2, 3]), new Set([2, 1, 3]), new Set([3, 1, 2])],
    [new Set([1, 2, 3]), new Set([2, 1, 3]), new Set([3, 2, 1])],
    [new Set([1, 2, 3]), new Set([2, 3, 1]), new Set([1, 2, 3])],
    [new Set([1, 2, 3]), new Set([2, 3, 1]), new Set([1, 3, 2])],
    [new Set([1, 2, 3]), new Set([2, 3, 1]), new Set([2, 1, 3])],
    [new Set([1, 2, 3]), new Set([2, 3, 1]), new Set([2, 3, 1])],
    [new Set([1, 2, 3]), new Set([2, 3, 1]), new Set([3, 1, 2])],
    [new Set([1, 2, 3]), new Set([2, 3, 1]), new Set([3, 2, 1])],
    [new Set([1, 2, 3]), new Set([3, 1, 2]), new Set([1, 2, 3])],
    [new Set([1, 2, 3]), new Set([3, 1, 2]), new Set([1, 3, 2])],
    [new Set([1, 2, 3]), new Set([3, 1, 2]), new Set([2, 1, 3])],
    [new Set([1, 2, 3]), new Set([3, 1, 2]), new Set([2, 3, 1])],
    [new Set([1, 2, 3]), new Set([3, 1, 2]), new Set([3, 1, 2])],
    [new Set([1, 2, 3]), new Set([3, 1, 2]), new Set([3, 2, 1])],
    [new Set([1, 2, 3]), new Set([3, 2, 1]), new Set([1, 2, 3])],
    [new Set([1, 2, 3]), new Set([3, 2, 1]), new Set([1, 3, 2])],
    [new Set([1, 2, 3]), new Set([3, 2, 1]), new Set([2, 1, 3])],
    [new Set([1, 2, 3]), new Set([3, 2, 1]), new Set([2, 3, 1])],
    [new Set([1, 2, 3]), new Set([3, 2, 1]), new Set([3, 1, 2])],
    [new Set([1, 2, 3]), new Set([3, 2, 1]), new Set([3, 2, 1])],
    [new Set(["1", 2.2, 3]), new Set(["1", 2.2, 3])],
    [new Set(["1", 2.2, 3]), new Set(["1", 3, 2.2])],
    [new Set(["1", 2.2, 3]), new Set([2.2, "1", 3])],
    [new Set(["1", 2.2, 3]), new Set([2.2, 3, "1"])],
    [new Set(["1", 2.2, 3]), new Set([3, "1", 2.2])],
    [new Set(["1", 2.2, 3]), new Set([3, 2.2, "1"])],
    [
      new Set([1, 2, 3, 4, 5]),
      new Set([2, 3, 4, 5, 1]),
      new Set([1, 2, 3, 4, 5]),
      new Set([2, 4, 1, 3, 5]),
    ],
    [
      new Set(["a", "b", "c"]),
      new Set(["a", "c", "b"]),
      new Set(["b", "a", "c"]),
      new Set(["b", "c", "a"]),
      new Set(["c", "a", "b"]),
      new Set(["c", "b", "a"]),
    ],
  ];
}

function dataProviderForArraysFalse(): Array<unknown> {
  return [
    [[1], []],
    [[], [1]],
    [[], [1], []],
    [[1, 2], [1, 2, 1]],
    [[1, 2, 2], [1, 2, 1]],
    [[1, 2, 1], [1, 2, 2]],
    [[1, 2, 1], [1, 2, '1']],
    [[1, 2, 1, 2, 1], [1, 2, 1, 2, 2]],
    [[1, 2, 1, 2, 1], [1, 2, 1, 2, '1']],
    [[1, 2, 3], [1, 2, 3], [2, 2, 3]],
    [[1, 2, 3], [2, 2, 3], [2, 2, 3]],
    [[2, 2, 3], [1, 2, 3], [2, 2, 3]],
    [[2, 2, 3], [1, 3, 2], [2, 2, 3]],
    [[2, 2, 3], [2, 2, 3], [1, 2, 3]],
    [[1, 2, 3], [1, 2, 3], [1, 2, '3']],
    [['1', 2, 3], [1, '2', 3], [1, 2, '3']],
    [[1, 2, 3], [1, 2, 3], [2, 3, 4]],
    [[1, 2, 3], [2, 1, 3], [2, 3, 4]],
    [[1, 2, 3], [2, 3, 4], [3, 4, 5]],
    [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1]],
    [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1]],
    [['a', 'b', 'c'], ['a', 'c', 'b'], ['b', 'a', 'c'], ['b', 'c', 'a'], ['c', 'a', 'b'], ['c', 'b', 'c']],
    [['a', 'b', 'c'], ['a', 'c', 'b'], ['b', 'b', 'c'], ['b', 'c', 'a'], ['c', 'a', 'b'], ['c', 'b', 'a']],
    [['a', 'b', 'c'], ['a', 'c', 'c'], ['b', 'a', 'c'], ['b', 'c', 'a'], ['c', 'a', 'b'], ['c', 'b', 'a']],
    [['a', 'b', 'c'], ['a', 'c', 'b'], ['b', 'a'], ['b', 'c', 'a'], ['c', 'a', 'b'], ['c', 'b', 'a']],
    [['a', 'b', 'c'], ['c', 'b'], ['b', 'a', 'c'], ['b', 'c', 'a'], ['c', 'a', 'b'], ['c', 'b', 'a']],
  ];
}

function dataProviderForGeneratorsFalse(): Array<unknown> {
  return [
    [createGeneratorFixture([1]), createGeneratorFixture([])],
    [createGeneratorFixture([]), createGeneratorFixture([1])],
    [
      createGeneratorFixture([]),
      createGeneratorFixture([1]),
      createGeneratorFixture([]),
    ],
    [createGeneratorFixture([1, 2]), createGeneratorFixture([1, 2, 1])],
    [createGeneratorFixture([1, 2, 2]), createGeneratorFixture([1, 2, 1])],
    [createGeneratorFixture([1, 2, 1]), createGeneratorFixture([1, 2, 2])],
    [createGeneratorFixture([1, 2, 1]), createGeneratorFixture([1, 2, "1"])],
    [
      createGeneratorFixture([1, 2, 1, 2, 1]),
      createGeneratorFixture([1, 2, 1, 2, 2]),
    ],
    [
      createGeneratorFixture([1, 2, 1, 2, 1]),
      createGeneratorFixture([1, 2, 1, 2, "1"]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([2, 2, 3]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([2, 2, 3]),
      createGeneratorFixture([2, 2, 3]),
    ],
    [
      createGeneratorFixture([2, 2, 3]),
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([2, 2, 3]),
    ],
    [
      createGeneratorFixture([2, 2, 3]),
      createGeneratorFixture([1, 3, 2]),
      createGeneratorFixture([2, 2, 3]),
    ],
    [
      createGeneratorFixture([2, 2, 3]),
      createGeneratorFixture([2, 2, 3]),
      createGeneratorFixture([1, 2, 3]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([1, 2, "3"]),
    ],
    [
      createGeneratorFixture(["1", 2, 3]),
      createGeneratorFixture([1, "2", 3]),
      createGeneratorFixture([1, 2, "3"]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([2, 3, 4]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([2, 1, 3]),
      createGeneratorFixture([2, 3, 4]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      createGeneratorFixture([2, 3, 4]),
      createGeneratorFixture([3, 4, 5]),
    ],
    [
      createGeneratorFixture([1, 1, 1, 1, 1]),
      createGeneratorFixture([1, 1, 1, 1, 1]),
      createGeneratorFixture([1, 1, 1, 1]),
    ],
    [
      createGeneratorFixture([1, 1, 1, 1, 1]),
      createGeneratorFixture([1, 1, 1, 1, 1]),
      createGeneratorFixture([1, 1, 1, 1, 1, 1]),
    ],
    [
      createGeneratorFixture(["a", "b", "c"]),
      createGeneratorFixture(["a", "c", "b"]),
      createGeneratorFixture(["b", "a", "c"]),
      createGeneratorFixture(["b", "c", "a"]),
      createGeneratorFixture(["c", "a", "b"]),
      createGeneratorFixture(["c", "b", "c"]),
    ],
    [
      createGeneratorFixture(["a", "b", "c"]),
      createGeneratorFixture(["a", "c", "b"]),
      createGeneratorFixture(["b", "b", "c"]),
      createGeneratorFixture(["b", "c", "a"]),
      createGeneratorFixture(["c", "a", "b"]),
      createGeneratorFixture(["c", "b", "a"]),
    ],
    [
      createGeneratorFixture(["a", "b", "c"]),
      createGeneratorFixture(["a", "c", "c"]),
      createGeneratorFixture(["b", "a", "c"]),
      createGeneratorFixture(["b", "c", "a"]),
      createGeneratorFixture(["c", "a", "b"]),
      createGeneratorFixture(["c", "b", "a"]),
    ],
    [
      createGeneratorFixture(["a", "b", "c"]),
      createGeneratorFixture(["a", "c", "b"]),
      createGeneratorFixture(["b", "a"]),
      createGeneratorFixture(["b", "c", "a"]),
      createGeneratorFixture(["c", "a", "b"]),
      createGeneratorFixture(["c", "b", "a"]),
    ],
    [
      createGeneratorFixture(["a", "b", "c"]),
      createGeneratorFixture(["c", "b"]),
      createGeneratorFixture(["b", "a", "c"]),
      createGeneratorFixture(["b", "c", "a"]),
      createGeneratorFixture(["c", "a", "b"]),
      createGeneratorFixture(["c", "b", "a"]),
    ],
  ];
}

function dataProviderForIterablesFalse(): Array<unknown> {
  return [
    [createIterableFixture([1]), createIterableFixture([])],
    [createIterableFixture([]), createIterableFixture([1])],
    [
      createIterableFixture([]),
      createIterableFixture([1]),
      createIterableFixture([]),
    ],
    [createIterableFixture([1, 2]), createIterableFixture([1, 2, 1])],
    [createIterableFixture([1, 2, 2]), createIterableFixture([1, 2, 1])],
    [createIterableFixture([1, 2, 1]), createIterableFixture([1, 2, 2])],
    [createIterableFixture([1, 2, 1]), createIterableFixture([1, 2, "1"])],
    [
      createIterableFixture([1, 2, 1, 2, 1]),
      createIterableFixture([1, 2, 1, 2, 2]),
    ],
    [
      createIterableFixture([1, 2, 1, 2, 1]),
      createIterableFixture([1, 2, 1, 2, "1"]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([1, 2, 3]),
      createIterableFixture([2, 2, 3]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([2, 2, 3]),
      createIterableFixture([2, 2, 3]),
    ],
    [
      createIterableFixture([2, 2, 3]),
      createIterableFixture([1, 2, 3]),
      createIterableFixture([2, 2, 3]),
    ],
    [
      createIterableFixture([2, 2, 3]),
      createIterableFixture([1, 3, 2]),
      createIterableFixture([2, 2, 3]),
    ],
    [
      createIterableFixture([2, 2, 3]),
      createIterableFixture([2, 2, 3]),
      createIterableFixture([1, 2, 3]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([1, 2, 3]),
      createIterableFixture([1, 2, "3"]),
    ],
    [
      createIterableFixture(["1", 2, 3]),
      createIterableFixture([1, "2", 3]),
      createIterableFixture([1, 2, "3"]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([1, 2, 3]),
      createIterableFixture([2, 3, 4]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([2, 1, 3]),
      createIterableFixture([2, 3, 4]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      createIterableFixture([2, 3, 4]),
      createIterableFixture([3, 4, 5]),
    ],
    [
      createIterableFixture([1, 1, 1, 1, 1]),
      createIterableFixture([1, 1, 1, 1, 1]),
      createIterableFixture([1, 1, 1, 1]),
    ],
    [
      createIterableFixture([1, 1, 1, 1, 1]),
      createIterableFixture([1, 1, 1, 1, 1]),
      createIterableFixture([1, 1, 1, 1, 1, 1]),
    ],
    [
      createIterableFixture(["a", "b", "c"]),
      createIterableFixture(["a", "c", "b"]),
      createIterableFixture(["b", "a", "c"]),
      createIterableFixture(["b", "c", "a"]),
      createIterableFixture(["c", "a", "b"]),
      createIterableFixture(["c", "b", "c"]),
    ],
    [
      createIterableFixture(["a", "b", "c"]),
      createIterableFixture(["a", "c", "b"]),
      createIterableFixture(["b", "b", "c"]),
      createIterableFixture(["b", "c", "a"]),
      createIterableFixture(["c", "a", "b"]),
      createIterableFixture(["c", "b", "a"]),
    ],
    [
      createIterableFixture(["a", "b", "c"]),
      createIterableFixture(["a", "c", "c"]),
      createIterableFixture(["b", "a", "c"]),
      createIterableFixture(["b", "c", "a"]),
      createIterableFixture(["c", "a", "b"]),
      createIterableFixture(["c", "b", "a"]),
    ],
    [
      createIterableFixture(["a", "b", "c"]),
      createIterableFixture(["a", "c", "b"]),
      createIterableFixture(["b", "a"]),
      createIterableFixture(["b", "c", "a"]),
      createIterableFixture(["c", "a", "b"]),
      createIterableFixture(["c", "b", "a"]),
    ],
    [
      createIterableFixture(["a", "b", "c"]),
      createIterableFixture(["c", "b"]),
      createIterableFixture(["b", "a", "c"]),
      createIterableFixture(["b", "c", "a"]),
      createIterableFixture(["c", "a", "b"]),
      createIterableFixture(["c", "b", "a"]),
    ],
  ];
}

function dataProviderForIteratorsFalse(): Array<unknown> {
  return [
    [createIteratorFixture([1]), createIteratorFixture([])],
    [createIteratorFixture([]), createIteratorFixture([1])],
    [
      createIteratorFixture([]),
      createIteratorFixture([1]),
      createIteratorFixture([]),
    ],
    [createIteratorFixture([1, 2]), createIteratorFixture([1, 2, 1])],
    [createIteratorFixture([1, 2, 2]), createIteratorFixture([1, 2, 1])],
    [createIteratorFixture([1, 2, 1]), createIteratorFixture([1, 2, 2])],
    [createIteratorFixture([1, 2, 1]), createIteratorFixture([1, 2, "1"])],
    [
      createIteratorFixture([1, 2, 1, 2, 1]),
      createIteratorFixture([1, 2, 1, 2, 2]),
    ],
    [
      createIteratorFixture([1, 2, 1, 2, 1]),
      createIteratorFixture([1, 2, 1, 2, "1"]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([2, 2, 3]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([2, 2, 3]),
      createIteratorFixture([2, 2, 3]),
    ],
    [
      createIteratorFixture([2, 2, 3]),
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([2, 2, 3]),
    ],
    [
      createIteratorFixture([2, 2, 3]),
      createIteratorFixture([1, 3, 2]),
      createIteratorFixture([2, 2, 3]),
    ],
    [
      createIteratorFixture([2, 2, 3]),
      createIteratorFixture([2, 2, 3]),
      createIteratorFixture([1, 2, 3]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([1, 2, "3"]),
    ],
    [
      createIteratorFixture(["1", 2, 3]),
      createIteratorFixture([1, "2", 3]),
      createIteratorFixture([1, 2, "3"]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([2, 3, 4]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([2, 1, 3]),
      createIteratorFixture([2, 3, 4]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      createIteratorFixture([2, 3, 4]),
      createIteratorFixture([3, 4, 5]),
    ],
    [
      createIteratorFixture([1, 1, 1, 1, 1]),
      createIteratorFixture([1, 1, 1, 1, 1]),
      createIteratorFixture([1, 1, 1, 1]),
    ],
    [
      createIteratorFixture([1, 1, 1, 1, 1]),
      createIteratorFixture([1, 1, 1, 1, 1]),
      createIteratorFixture([1, 1, 1, 1, 1, 1]),
    ],
    [
      createIteratorFixture(["a", "b", "c"]),
      createIteratorFixture(["a", "c", "b"]),
      createIteratorFixture(["b", "a", "c"]),
      createIteratorFixture(["b", "c", "a"]),
      createIteratorFixture(["c", "a", "b"]),
      createIteratorFixture(["c", "b", "c"]),
    ],
    [
      createIteratorFixture(["a", "b", "c"]),
      createIteratorFixture(["a", "c", "b"]),
      createIteratorFixture(["b", "b", "c"]),
      createIteratorFixture(["b", "c", "a"]),
      createIteratorFixture(["c", "a", "b"]),
      createIteratorFixture(["c", "b", "a"]),
    ],
    [
      createIteratorFixture(["a", "b", "c"]),
      createIteratorFixture(["a", "c", "c"]),
      createIteratorFixture(["b", "a", "c"]),
      createIteratorFixture(["b", "c", "a"]),
      createIteratorFixture(["c", "a", "b"]),
      createIteratorFixture(["c", "b", "a"]),
    ],
    [
      createIteratorFixture(["a", "b", "c"]),
      createIteratorFixture(["a", "c", "b"]),
      createIteratorFixture(["b", "a"]),
      createIteratorFixture(["b", "c", "a"]),
      createIteratorFixture(["c", "a", "b"]),
      createIteratorFixture(["c", "b", "a"]),
    ],
    [
      createIteratorFixture(["a", "b", "c"]),
      createIteratorFixture(["c", "b"]),
      createIteratorFixture(["b", "a", "c"]),
      createIteratorFixture(["b", "c", "a"]),
      createIteratorFixture(["c", "a", "b"]),
      createIteratorFixture(["c", "b", "a"]),
    ],
  ];
}

function dataProviderForStringsFalse(): Array<unknown> {
  return [
    ["", "1"],
    ["12345", "1122334455"],
  ];
}

function dataProviderForSetsFalse(): Array<unknown> {
  return [
    [new Set([1]), new Set([])],
    [new Set([]), new Set([1])],
    [new Set([]), new Set([1]), new Set([])],
    [new Set([1, 2]), new Set([1, 2, "1"])],
    [new Set([1, 2]), new Set([2, "1"])],
    [new Set([1, 2, 3]), new Set([1, 2, 3]), new Set([2, 2, 3])],
    [new Set([1, 2, 3]), new Set([2, 2, 3]), new Set([2, 2, 3])],
    [new Set([2, 2, 3]), new Set([1, 2, 3]), new Set([2, 2, 3])],
    [new Set([2, 2, 3]), new Set([1, 3, 2]), new Set([2, 2, 3])],
    [new Set([2, 2, 3]), new Set([2, 2, 3]), new Set([1, 2, 3])],
    [new Set([1, 2, 3]), new Set([1, 2, 3]), new Set([1, 2, "3"])],
    [new Set(["1", 2, 3]), new Set([1, "2", 3]), new Set([1, 2, "3"])],
    [new Set([1, 2, 3]), new Set([1, 2, 3]), new Set([2, 3, 4])],
    [new Set([1, 2, 3]), new Set([2, 1, 3]), new Set([2, 3, 4])],
    [new Set([1, 2, 3]), new Set([2, 3, 4]), new Set([3, 4, 5])],
    [
      new Set(["a", "b", "c"]),
      new Set(["a", "c", "b"]),
      new Set(["b", "a", "c"]),
      new Set(["b", "c", "a"]),
      new Set(["c", "a", "b"]),
      new Set(["c", "b", "d"]),
    ],
    [
      new Set(["a", "b", "c"]),
      new Set(["a", "c", "b"]),
      new Set(["b", "d", "c"]),
      new Set(["b", "c", "a"]),
      new Set(["c", "a", "b"]),
      new Set(["c", "b", "a"]),
    ],
    [
      new Set(["a", "b", "c"]),
      new Set(["a", "c", "d"]),
      new Set(["b", "a", "c"]),
      new Set(["b", "c", "a"]),
      new Set(["c", "a", "b"]),
      new Set(["c", "b", "a"]),
    ],
    [
      new Set(["a", "b", "c"]),
      new Set(["a", "c", "b"]),
      new Set(["b", "a"]),
      new Set(["b", "c", "a"]),
      new Set(["c", "a", "b"]),
      new Set(["c", "b", "a"]),
    ],
    [
      new Set(["a", "b", "c"]),
      new Set(["c", "b"]),
      new Set(["b", "a", "c"]),
      new Set(["b", "c", "a"]),
      new Set(["c", "a", "b"]),
      new Set(["c", "b", "a"]),
    ],
  ];
}
