// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { single } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
] as Array<[Iterable<unknown>|Iterator<unknown>, number, Array<unknown>]>)(
  "Single Flatten Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    dimensions: number,
    expected: Array<unknown>
  ) => {
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

function dataProviderForArrays(): Array<unknown> {
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

function dataProviderForGenerators(): Array<unknown> {
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

function dataProviderForIterables(): Array<unknown> {
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

function dataProviderForIterators(): Array<unknown> {
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

function dataProviderForStrings(): Array<unknown> {
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

function dataProviderForSets(): Array<unknown> {
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

function dataProviderForMaps(): Array<unknown> {
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
