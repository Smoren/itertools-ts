import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture
  // @ts-ignore
} from "../fixture";
import { single } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])(
  "Single Flatten Test",
  (input, dimensions, expected) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of single.flatten(input, dimensions)) {
        result.push(item);
      }

      // Then
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
  }
);

describe.each([
  ...dataProviderForAsyncGenerators(),
  ...dataProviderForAsyncIterables(),
  ...dataProviderForAsyncIterators(),
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])(
  "Single Flatten Async Test",
  (input, dimensions, expected) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of single.flattenAsync(input, dimensions)) {
        result.push(item);
      }

      // Then
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
  }
);

test("Single Flatten Test With Default Dimensions Count", () => {
  // Given
  const result = [];

  // When
  for (const item of single.flatten([1, 2, 3])) {
    result.push(item);
  }

  // Then
  expect(result).toEqual([1, 2, 3]);
});

test("Single Flatten Async Test With Default Dimensions Count", async () => {
  // Given
  const result = [];

  // When
  for await (const item of single.flattenAsync(createAsyncIterableFixture([1, 2, 3]))) {
    result.push(item);
  }

  // Then
  expect(result).toEqual([1, 2, 3]);
});

function dataProviderForArrays(): Array<[Array<any>, number, Array<any>]> {
  return [
    [
      [],
      0,
      [],
    ],
    [
      [],
      1,
      [],
    ],
    [
      [0],
      0,
      [0],
    ],
    [
      [0],
      1,
      [0],
    ],
    [
      [1],
      1,
      [1],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      [0, [1, 2], 3, [4, 5]],
      0,
      [0, [1, 2], 3, [4, 5]],
    ],
    [
      [0, [1, 2], 3, [4, 5]],
      1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      [1, 2, [3], [4, 5], 6, []],
      0,
      [1, 2, [3], [4, 5], 6, []],
    ],
    [
      [1, 2, [3], [4, 5], 6, []],
      1,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10],
      0,
      [[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10],
    ],
    [
      [[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10],
      1,
      [1, 2, [3, [4, 5]], 6, 7, 8, 9, 10],
    ],
    [
      [[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10],
      2,
      [1, 2, 3, [4, 5], 6, 7, 8, 9, 10],
    ],
    [
      [[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10],
      3,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      [[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10],
      4,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
      0,
      [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    ],
    [
      [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
      1,
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      [1, [2], [[3]], [[[4]]], [[[[5]]]]],
      0,
      [1, [2], [[3]], [[[4]]], [[[[5]]]]],
    ],
    [
      [1, [2], [[3]], [[[4]]], [[[[5]]]]],
      1,
      [1, 2, [3], [[4]], [[[5]]]],
    ],
    [
      [1, [2], [[3]], [[[4]]], [[[[5]]]]],
      2,
      [1, 2, 3, [4], [[5]]],
    ],
    [
      [1, [2], [[3]], [[[4]]], [[[[5]]]]],
      3,
      [1, 2, 3, 4, [5]],
    ],
    [
      [1, [2], [[3]], [[[4]]], [[[[5]]]]],
      4,
      [1, 2, 3, 4, 5],
    ],
    [
      [1, [2], [[3]], [[[4]]], [[[[5]]]]],
      5,
      [1, 2, 3, 4, 5],
    ],
    [
      ['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']],
      0,
      ['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']],
    ],
    [
      ['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']],
      1,
      ['PHP', 'IterTools', 'MathPHP', 'SubnetCalculator', 'Perl', 'SubnetCalculator'],
    ],
    [
      [1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x],
      0,
      [1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x],
    ],
    [
      [1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x],
      1,
      [1, 2.2, 'three', true, false, null, {}, 1, 2, 3, (x: number) => x],
    ],
    [
      [[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]],
      0,
      [[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]],
    ],
    [
      [[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]],
      1,
      [1, 2.2, 'three', true, false, null, {}, 1, 2, 3, (x: number) => x],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<any>, number, Array<any>]> {
  return [
    [
      createGeneratorFixture([]),
      0,
      [],
    ],
    [
      createGeneratorFixture([]),
      1,
      [],
    ],
    [
      createGeneratorFixture([0]),
      0,
      [0],
    ],
    [
      createGeneratorFixture([0]),
      1,
      [0],
    ],
    [
      createGeneratorFixture([1]),
      1,
      [1],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([0, [1, 2], 3, [4, 5]]),
      0,
      [0, [1, 2], 3, [4, 5]],
    ],
    [
      createGeneratorFixture([0, [1, 2], 3, [4, 5]]),
      1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([1, 2, [3], [4, 5], 6, []]),
      0,
      [1, 2, [3], [4, 5], 6, []],
    ],
    [
      createGeneratorFixture([1, 2, [3], [4, 5], 6, []]),
      1,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createGeneratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      0,
      [[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10],
    ],
    [
      createGeneratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      1,
      [1, 2, [3, [4, 5]], 6, 7, 8, 9, 10],
    ],
    [
      createGeneratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      2,
      [1, 2, 3, [4, 5], 6, 7, 8, 9, 10],
    ],
    [
      createGeneratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      3,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createGeneratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      4,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createGeneratorFixture([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      0,
      [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    ],
    [
      createGeneratorFixture([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      1,
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createGeneratorFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      0,
      [1, [2], [[3]], [[[4]]], [[[[5]]]]],
    ],
    [
      createGeneratorFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      1,
      [1, 2, [3], [[4]], [[[5]]]],
    ],
    [
      createGeneratorFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      2,
      [1, 2, 3, [4], [[5]]],
    ],
    [
      createGeneratorFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      3,
      [1, 2, 3, 4, [5]],
    ],
    [
      createGeneratorFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      4,
      [1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      5,
      [1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture(['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']]),
      0,
      ['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']],
    ],
    [
      createGeneratorFixture(['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']]),
      1,
      ['PHP', 'IterTools', 'MathPHP', 'SubnetCalculator', 'Perl', 'SubnetCalculator'],
    ],
    [
      createGeneratorFixture([1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x]),
      0,
      [1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x],
    ],
    [
      createGeneratorFixture([1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x]),
      1,
      [1, 2.2, 'three', true, false, null, {}, 1, 2, 3, (x: number) => x],
    ],
    [
      createGeneratorFixture([[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]]),
      0,
      [[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]],
    ],
    [
      createGeneratorFixture([[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]]),
      1,
      [1, 2.2, 'three', true, false, null, {}, 1, 2, 3, (x: number) => x],
    ],
  ];
}

function dataProviderForIterables(): Array<[Iterable<any>, number, Array<any>]> {
  return [
    [
      createIterableFixture([]),
      0,
      [],
    ],
    [
      createIterableFixture([]),
      1,
      [],
    ],
    [
      createIterableFixture([0]),
      0,
      [0],
    ],
    [
      createIterableFixture([0]),
      1,
      [0],
    ],
    [
      createIterableFixture([1]),
      1,
      [1],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture([0, [1, 2], 3, [4, 5]]),
      0,
      [0, [1, 2], 3, [4, 5]],
    ],
    [
      createIterableFixture([0, [1, 2], 3, [4, 5]]),
      1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture([1, 2, [3], [4, 5], 6, []]),
      0,
      [1, 2, [3], [4, 5], 6, []],
    ],
    [
      createIterableFixture([1, 2, [3], [4, 5], 6, []]),
      1,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createIterableFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      0,
      [[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10],
    ],
    [
      createIterableFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      1,
      [1, 2, [3, [4, 5]], 6, 7, 8, 9, 10],
    ],
    [
      createIterableFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      2,
      [1, 2, 3, [4, 5], 6, 7, 8, 9, 10],
    ],
    [
      createIterableFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      3,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIterableFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      4,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIterableFixture([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      0,
      [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    ],
    [
      createIterableFixture([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      1,
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createIterableFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      0,
      [1, [2], [[3]], [[[4]]], [[[[5]]]]],
    ],
    [
      createIterableFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      1,
      [1, 2, [3], [[4]], [[[5]]]],
    ],
    [
      createIterableFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      2,
      [1, 2, 3, [4], [[5]]],
    ],
    [
      createIterableFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      3,
      [1, 2, 3, 4, [5]],
    ],
    [
      createIterableFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      4,
      [1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      5,
      [1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture(['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']]),
      0,
      ['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']],
    ],
    [
      createIterableFixture(['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']]),
      1,
      ['PHP', 'IterTools', 'MathPHP', 'SubnetCalculator', 'Perl', 'SubnetCalculator'],
    ],
    [
      createIterableFixture([1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x]),
      0,
      [1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x],
    ],
    [
      createIterableFixture([1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x]),
      1,
      [1, 2.2, 'three', true, false, null, {}, 1, 2, 3, (x: number) => x],
    ],
    [
      createIterableFixture([[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]]),
      0,
      [[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]],
    ],
    [
      createIterableFixture([[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]]),
      1,
      [1, 2.2, 'three', true, false, null, {}, 1, 2, 3, (x: number) => x],
    ],
  ];
}

function dataProviderForIterators(): Array<[Iterator<any>, number, Array<any>]> {
  return [
    [
      createIteratorFixture([]),
      0,
      [],
    ],
    [
      createIteratorFixture([]),
      1,
      [],
    ],
    [
      createIteratorFixture([0]),
      0,
      [0],
    ],
    [
      createIteratorFixture([0]),
      1,
      [0],
    ],
    [
      createIteratorFixture([1]),
      1,
      [1],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture([0, [1, 2], 3, [4, 5]]),
      0,
      [0, [1, 2], 3, [4, 5]],
    ],
    [
      createIteratorFixture([0, [1, 2], 3, [4, 5]]),
      1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture([1, 2, [3], [4, 5], 6, []]),
      0,
      [1, 2, [3], [4, 5], 6, []],
    ],
    [
      createIteratorFixture([1, 2, [3], [4, 5], 6, []]),
      1,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createIteratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      0,
      [[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10],
    ],
    [
      createIteratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      1,
      [1, 2, [3, [4, 5]], 6, 7, 8, 9, 10],
    ],
    [
      createIteratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      2,
      [1, 2, 3, [4, 5], 6, 7, 8, 9, 10],
    ],
    [
      createIteratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      3,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIteratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      4,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIteratorFixture([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      0,
      [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    ],
    [
      createIteratorFixture([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      1,
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createIteratorFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      0,
      [1, [2], [[3]], [[[4]]], [[[[5]]]]],
    ],
    [
      createIteratorFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      1,
      [1, 2, [3], [[4]], [[[5]]]],
    ],
    [
      createIteratorFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      2,
      [1, 2, 3, [4], [[5]]],
    ],
    [
      createIteratorFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      3,
      [1, 2, 3, 4, [5]],
    ],
    [
      createIteratorFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      4,
      [1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      5,
      [1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture(['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']]),
      0,
      ['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']],
    ],
    [
      createIteratorFixture(['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']]),
      1,
      ['PHP', 'IterTools', 'MathPHP', 'SubnetCalculator', 'Perl', 'SubnetCalculator'],
    ],
    [
      createIteratorFixture([1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x]),
      0,
      [1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x],
    ],
    [
      createIteratorFixture([1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x]),
      1,
      [1, 2.2, 'three', true, false, null, {}, 1, 2, 3, (x: number) => x],
    ],
    [
      createIteratorFixture([[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]]),
      0,
      [[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]],
    ],
    [
      createIteratorFixture([[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]]),
      1,
      [1, 2.2, 'three', true, false, null, {}, 1, 2, 3, (x: number) => x],
    ],
  ];
}

function dataProviderForStrings(): Array<[string, number, Array<any>]> {
  return [
    [
      '',
      0,
      [],
    ],
    [
      '',
      1,
      [],
    ],
    [
      '',
      2,
      [],
    ],
    [
      'a',
      0,
      ['a'],
    ],
    [
      'a',
      1,
      ['a'],
    ],
    [
      'a',
      2,
      ['a'],
    ],
    [
      'abc',
      0,
      ['a', 'b', 'c'],
    ],
    [
      'abc',
      1,
      ['a', 'b', 'c'],
    ],
    [
      'abc',
      2,
      ['a', 'b', 'c'],
    ],
  ];
}

function dataProviderForSets(): Array<[Set<any>, number, Array<any>]> {
  return [
    [
      new Set([]),
      0,
      [],
    ],
    [
      new Set([]),
      1,
      [],
    ],
    [
      new Set([0]),
      0,
      [0],
    ],
    [
      new Set([0]),
      1,
      [0],
    ],
    [
      new Set([1]),
      1,
      [1],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      new Set([0, [1, 2], 3, [4, 5]]),
      0,
      [0, [1, 2], 3, [4, 5]],
    ],
    [
      new Set([0, [1, 2], 3, [4, 5]]),
      1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      new Set([1, 2, [3], [4, 5], 6, []]),
      0,
      [1, 2, [3], [4, 5], 6, []],
    ],
    [
      new Set([1, 2, [3], [4, 5], 6, []]),
      1,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      new Set([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      0,
      [[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10],
    ],
    [
      new Set([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      1,
      [1, 2, [3, [4, 5]], 6, 7, 8, 9, 10],
    ],
    [
      new Set([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      2,
      [1, 2, 3, [4, 5], 6, 7, 8, 9, 10],
    ],
    [
      new Set([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      3,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      new Set([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      4,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      new Set([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      0,
      [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    ],
    [
      new Set([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      1,
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      new Set([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      0,
      [1, [2], [[3]], [[[4]]], [[[[5]]]]],
    ],
    [
      new Set([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      1,
      [1, 2, [3], [[4]], [[[5]]]],
    ],
    [
      new Set([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      2,
      [1, 2, 3, [4], [[5]]],
    ],
    [
      new Set([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      3,
      [1, 2, 3, 4, [5]],
    ],
    [
      new Set([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      4,
      [1, 2, 3, 4, 5],
    ],
    [
      new Set([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      5,
      [1, 2, 3, 4, 5],
    ],
    [
      new Set(['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']]),
      0,
      ['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']],
    ],
    [
      new Set(['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']]),
      1,
      ['PHP', 'IterTools', 'MathPHP', 'SubnetCalculator', 'Perl', 'SubnetCalculator'],
    ],
    [
      new Set([1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x]),
      0,
      [1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x],
    ],
    [
      new Set([1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x]),
      1,
      [1, 2.2, 'three', true, false, null, {}, 1, 2, 3, (x: number) => x],
    ],
    [
      new Set([[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]]),
      0,
      [[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]],
    ],
    [
      new Set([[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]]),
      1,
      [1, 2.2, 'three', true, false, null, {}, 1, 2, 3, (x: number) => x],
    ],
  ];
}

function dataProviderForMaps(): Array<[Map<any, any>, number, Array<any>]> {
  return [
    [
      createMapFixture([]),
      0,
      [],
    ],
    [
      createMapFixture([]),
      1,
      [],
    ],
    [
      createMapFixture([0]),
      0,
      [0],
    ],
    [
      createMapFixture([0]),
      1,
      [0],
    ],
    [
      createMapFixture([1]),
      1,
      [1],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createMapFixture([0, [1, 2], 3, [4, 5]]),
      0,
      [0, [1, 2], 3, [4, 5]],
    ],
    [
      createMapFixture([0, [1, 2], 3, [4, 5]]),
      1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createMapFixture([1, 2, [3], [4, 5], 6, []]),
      0,
      [1, 2, [3], [4, 5], 6, []],
    ],
    [
      createMapFixture([1, 2, [3], [4, 5], 6, []]),
      1,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createMapFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      0,
      [[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10],
    ],
    [
      createMapFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      1,
      [1, 2, [3, [4, 5]], 6, 7, 8, 9, 10],
    ],
    [
      createMapFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      2,
      [1, 2, 3, [4, 5], 6, 7, 8, 9, 10],
    ],
    [
      createMapFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      3,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createMapFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      4,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createMapFixture([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      0,
      [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    ],
    [
      createMapFixture([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      1,
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createMapFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      0,
      [1, [2], [[3]], [[[4]]], [[[[5]]]]],
    ],
    [
      createMapFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      1,
      [1, 2, [3], [[4]], [[[5]]]],
    ],
    [
      createMapFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      2,
      [1, 2, 3, [4], [[5]]],
    ],
    [
      createMapFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      3,
      [1, 2, 3, 4, [5]],
    ],
    [
      createMapFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      4,
      [1, 2, 3, 4, 5],
    ],
    [
      createMapFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      5,
      [1, 2, 3, 4, 5],
    ],
    [
      createMapFixture(['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']]),
      0,
      ['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']],
    ],
    [
      createMapFixture(['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']]),
      1,
      ['PHP', 'IterTools', 'MathPHP', 'SubnetCalculator', 'Perl', 'SubnetCalculator'],
    ],
    [
      createMapFixture([1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x]),
      0,
      [1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x],
    ],
    [
      createMapFixture([1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x]),
      1,
      [1, 2.2, 'three', true, false, null, {}, 1, 2, 3, (x: number) => x],
    ],
    [
      createMapFixture([[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]]),
      0,
      [[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]],
    ],
    [
      createMapFixture([[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]]),
      1,
      [1, 2.2, 'three', true, false, null, {}, 1, 2, 3, (x: number) => x],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[AsyncGenerator<any>, number, Array<any>]> {
  return [
    [
      createAsyncGeneratorFixture([]),
      0,
      [],
    ],
    [
      createAsyncGeneratorFixture([]),
      1,
      [],
    ],
    [
      createAsyncGeneratorFixture([0]),
      0,
      [0],
    ],
    [
      createAsyncGeneratorFixture([0]),
      1,
      [0],
    ],
    [
      createAsyncGeneratorFixture([1]),
      1,
      [1],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([0, [1, 2], 3, [4, 5]]),
      0,
      [0, [1, 2], 3, [4, 5]],
    ],
    [
      createAsyncGeneratorFixture([0, [1, 2], 3, [4, 5]]),
      1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([1, 2, [3], [4, 5], 6, []]),
      0,
      [1, 2, [3], [4, 5], 6, []],
    ],
    [
      createAsyncGeneratorFixture([1, 2, [3], [4, 5], 6, []]),
      1,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createAsyncGeneratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      0,
      [[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10],
    ],
    [
      createAsyncGeneratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      1,
      [1, 2, [3, [4, 5]], 6, 7, 8, 9, 10],
    ],
    [
      createAsyncGeneratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      2,
      [1, 2, 3, [4, 5], 6, 7, 8, 9, 10],
    ],
    [
      createAsyncGeneratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      3,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncGeneratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      4,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncGeneratorFixture([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      0,
      [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    ],
    [
      createAsyncGeneratorFixture([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      1,
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createAsyncGeneratorFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      0,
      [1, [2], [[3]], [[[4]]], [[[[5]]]]],
    ],
    [
      createAsyncGeneratorFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      1,
      [1, 2, [3], [[4]], [[[5]]]],
    ],
    [
      createAsyncGeneratorFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      2,
      [1, 2, 3, [4], [[5]]],
    ],
    [
      createAsyncGeneratorFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      3,
      [1, 2, 3, 4, [5]],
    ],
    [
      createAsyncGeneratorFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      4,
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      5,
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture(['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']]),
      0,
      ['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']],
    ],
    [
      createAsyncGeneratorFixture(['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']]),
      1,
      ['PHP', 'IterTools', 'MathPHP', 'SubnetCalculator', 'Perl', 'SubnetCalculator'],
    ],
    [
      createAsyncGeneratorFixture([1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x]),
      0,
      [1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x],
    ],
    [
      createAsyncGeneratorFixture([1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x]),
      1,
      [1, 2.2, 'three', true, false, null, {}, 1, 2, 3, (x: number) => x],
    ],
    [
      createAsyncGeneratorFixture([[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]]),
      0,
      [[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]],
    ],
    [
      createAsyncGeneratorFixture([[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]]),
      1,
      [1, 2.2, 'three', true, false, null, {}, 1, 2, 3, (x: number) => x],
    ],
    [
      createAsyncGeneratorFixture([
        createAsyncGeneratorFixture([
          1,
          2,
          createAsyncGeneratorFixture([
            3,
            [4, 5],
          ]),
          6,
        ]),
        [7],
        createAsyncGeneratorFixture([8, 9]),
        10,
      ]),
      3,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[AsyncIterable<any>, number, Array<any>]> {
  return [
    [
      createAsyncIterableFixture([]),
      0,
      [],
    ],
    [
      createAsyncIterableFixture([]),
      1,
      [],
    ],
    [
      createAsyncIterableFixture([0]),
      0,
      [0],
    ],
    [
      createAsyncIterableFixture([0]),
      1,
      [0],
    ],
    [
      createAsyncIterableFixture([1]),
      1,
      [1],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture([0, [1, 2], 3, [4, 5]]),
      0,
      [0, [1, 2], 3, [4, 5]],
    ],
    [
      createAsyncIterableFixture([0, [1, 2], 3, [4, 5]]),
      1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture([1, 2, [3], [4, 5], 6, []]),
      0,
      [1, 2, [3], [4, 5], 6, []],
    ],
    [
      createAsyncIterableFixture([1, 2, [3], [4, 5], 6, []]),
      1,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createAsyncIterableFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      0,
      [[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10],
    ],
    [
      createAsyncIterableFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      1,
      [1, 2, [3, [4, 5]], 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIterableFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      2,
      [1, 2, 3, [4, 5], 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIterableFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      3,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIterableFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      4,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIterableFixture([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      0,
      [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    ],
    [
      createAsyncIterableFixture([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      1,
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createAsyncIterableFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      0,
      [1, [2], [[3]], [[[4]]], [[[[5]]]]],
    ],
    [
      createAsyncIterableFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      1,
      [1, 2, [3], [[4]], [[[5]]]],
    ],
    [
      createAsyncIterableFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      2,
      [1, 2, 3, [4], [[5]]],
    ],
    [
      createAsyncIterableFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      3,
      [1, 2, 3, 4, [5]],
    ],
    [
      createAsyncIterableFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      4,
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      5,
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture(['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']]),
      0,
      ['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']],
    ],
    [
      createAsyncIterableFixture(['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']]),
      1,
      ['PHP', 'IterTools', 'MathPHP', 'SubnetCalculator', 'Perl', 'SubnetCalculator'],
    ],
    [
      createAsyncIterableFixture([1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x]),
      0,
      [1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x],
    ],
    [
      createAsyncIterableFixture([1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x]),
      1,
      [1, 2.2, 'three', true, false, null, {}, 1, 2, 3, (x: number) => x],
    ],
    [
      createAsyncIterableFixture([[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]]),
      0,
      [[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]],
    ],
    [
      createAsyncIterableFixture([[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]]),
      1,
      [1, 2.2, 'three', true, false, null, {}, 1, 2, 3, (x: number) => x],
    ],
    [
      createAsyncIterableFixture([
        createAsyncIterableFixture([
          1,
          2,
          createAsyncIterableFixture([
            3,
            [4, 5],
          ]),
          6,
        ]),
        [7],
        createAsyncIterableFixture([8, 9]),
        10,
      ]),
      3,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[AsyncIterator<any>, number, Array<any>]> {
  return [
    [
      createAsyncIteratorFixture([]),
      0,
      [],
    ],
    [
      createAsyncIteratorFixture([]),
      1,
      [],
    ],
    [
      createAsyncIteratorFixture([0]),
      0,
      [0],
    ],
    [
      createAsyncIteratorFixture([0]),
      1,
      [0],
    ],
    [
      createAsyncIteratorFixture([1]),
      1,
      [1],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([0, [1, 2], 3, [4, 5]]),
      0,
      [0, [1, 2], 3, [4, 5]],
    ],
    [
      createAsyncIteratorFixture([0, [1, 2], 3, [4, 5]]),
      1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([1, 2, [3], [4, 5], 6, []]),
      0,
      [1, 2, [3], [4, 5], 6, []],
    ],
    [
      createAsyncIteratorFixture([1, 2, [3], [4, 5], 6, []]),
      1,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createAsyncIteratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      0,
      [[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10],
    ],
    [
      createAsyncIteratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      1,
      [1, 2, [3, [4, 5]], 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIteratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      2,
      [1, 2, 3, [4, 5], 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIteratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      3,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIteratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      4,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIteratorFixture([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      0,
      [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    ],
    [
      createAsyncIteratorFixture([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      1,
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ],
    [
      createAsyncIteratorFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      0,
      [1, [2], [[3]], [[[4]]], [[[[5]]]]],
    ],
    [
      createAsyncIteratorFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      1,
      [1, 2, [3], [[4]], [[[5]]]],
    ],
    [
      createAsyncIteratorFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      2,
      [1, 2, 3, [4], [[5]]],
    ],
    [
      createAsyncIteratorFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      3,
      [1, 2, 3, 4, [5]],
    ],
    [
      createAsyncIteratorFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      4,
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([1, [2], [[3]], [[[4]]], [[[[5]]]]]),
      5,
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture(['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']]),
      0,
      ['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']],
    ],
    [
      createAsyncIteratorFixture(['PHP', ['IterTools', 'MathPHP', 'SubnetCalculator'], 'Perl', ['SubnetCalculator']]),
      1,
      ['PHP', 'IterTools', 'MathPHP', 'SubnetCalculator', 'Perl', 'SubnetCalculator'],
    ],
    [
      createAsyncIteratorFixture([1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x]),
      0,
      [1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x],
    ],
    [
      createAsyncIteratorFixture([1, 2.2, 'three', true, false, null, {}, [1, 2, 3], (x: number) => x]),
      1,
      [1, 2.2, 'three', true, false, null, {}, 1, 2, 3, (x: number) => x],
    ],
    [
      createAsyncIteratorFixture([[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]]),
      0,
      [[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]],
    ],
    [
      createAsyncIteratorFixture([[1, 2.2, 'three'], [true, false], [null, {}], [1, 2, 3], [(x: number) => x]]),
      1,
      [1, 2.2, 'three', true, false, null, {}, 1, 2, 3, (x: number) => x],
    ],
    [
      createAsyncIteratorFixture([
        createAsyncIteratorFixture([
          1,
          2,
          createAsyncIteratorFixture([
            3,
            [4, 5],
          ]),
          6,
        ]),
        [7],
        createAsyncIteratorFixture([8, 9]),
        10,
      ]),
      3,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
  ];
}
