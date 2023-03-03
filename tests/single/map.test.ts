// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture } from "../fixture";
import { map } from "../../src/single";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])("Single Map Test", (input, mapper, expected) => {
  it("", () => {
    // Given
    const result = [];

    // When
    for (const item of map(input as Iterable<unknown>, mapper as (datum: unknown) => unknown)) {
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
      (x: number) => x + 1,
      [],
    ],
    [
      [],
      (x: number) => Math.sqrt(x),
      [],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x + 1,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      ["IterToolsTS", "MathTS", "SubnetCalculator"],
      (x: string) => `${x} is great!`,
      ["IterToolsTS is great!", "MathTS is great!", "SubnetCalculator is great!"],
    ],
    [
      [1, 4, 9, 16, 25],
      (x: number) => Math.sqrt(x),
      [1, 2, 3, 4, 5],
    ],
    [
      [1, -2, 3, -4, 5],
      (x: number) => Math.abs(x),
      [1, 2, 3, 4, 5],
    ],
    [
      ['one', 'Two', 'ThReE', 'FOUR'],
      (x: string) => x.toUpperCase(),
      ['ONE', 'TWO', 'THREE', 'FOUR'],
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      (x: number) => x + 1,
      [],
    ],
    [
      createGeneratorFixture([]),
      (x: number) => Math.sqrt(x),
      [],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x + 1,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createGeneratorFixture(["IterToolsTS", "MathTS", "SubnetCalculator"]),
      (x: string) => `${x} is great!`,
      ["IterToolsTS is great!", "MathTS is great!", "SubnetCalculator is great!"],
    ],
    [
      createGeneratorFixture([1, 4, 9, 16, 25]),
      (x: number) => Math.sqrt(x),
      [1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([1, -2, 3, -4, 5]),
      (x: number) => Math.abs(x),
      [1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture(['one', 'Two', 'ThReE', 'FOUR']),
      (x: string) => x.toUpperCase(),
      ['ONE', 'TWO', 'THREE', 'FOUR'],
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      (x: number) => x + 1,
      [],
    ],
    [
      createIterableFixture([]),
      (x: number) => Math.sqrt(x),
      [],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x + 1,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createIterableFixture(["IterToolsTS", "MathTS", "SubnetCalculator"]),
      (x: string) => `${x} is great!`,
      ["IterToolsTS is great!", "MathTS is great!", "SubnetCalculator is great!"],
    ],
    [
      createIterableFixture([1, 4, 9, 16, 25]),
      (x: number) => Math.sqrt(x),
      [1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture([1, -2, 3, -4, 5]),
      (x: number) => Math.abs(x),
      [1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture(['one', 'Two', 'ThReE', 'FOUR']),
      (x: string) => x.toUpperCase(),
      ['ONE', 'TWO', 'THREE', 'FOUR'],
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      (x: number) => x + 1,
      [],
    ],
    [
      createIteratorFixture([]),
      (x: number) => Math.sqrt(x),
      [],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x + 1,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createIteratorFixture(["IterToolsTS", "MathTS", "SubnetCalculator"]),
      (x: string) => `${x} is great!`,
      ["IterToolsTS is great!", "MathTS is great!", "SubnetCalculator is great!"],
    ],
    [
      createIteratorFixture([1, 4, 9, 16, 25]),
      (x: number) => Math.sqrt(x),
      [1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture([1, -2, 3, -4, 5]),
      (x: number) => Math.abs(x),
      [1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture(['one', 'Two', 'ThReE', 'FOUR']),
      (x: string) => x.toUpperCase(),
      ['ONE', 'TWO', 'THREE', 'FOUR'],
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      (x: number) => x + 1,
      [],
    ],
    [
      '',
      (x: number) => Math.sqrt(x),
      [],
    ],
    [
      '012345',
      (x: string) => x,
      ['0', '1', '2', '3', '4', '5'],
    ],
    [
      '012345',
      (x: string) => parseInt(x) + 1,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      'aBcD',
      (x: string) => x.toUpperCase(),
      ['A', 'B', 'C', 'D'],
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([]),
      (x: number) => x + 1,
      [],
    ],
    [
      new Set([]),
      (x: number) => Math.sqrt(x),
      [],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (x: number) => x,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (x: number) => x + 1,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      new Set(["IterToolsTS", "MathTS", "SubnetCalculator"]),
      (x: string) => `${x} is great!`,
      ["IterToolsTS is great!", "MathTS is great!", "SubnetCalculator is great!"],
    ],
    [
      new Set([1, 4, 9, 16, 25]),
      (x: number) => Math.sqrt(x),
      [1, 2, 3, 4, 5],
    ],
    [
      new Set([1, -2, 3, -4, 5]),
      (x: number) => Math.abs(x),
      [1, 2, 3, 4, 5],
    ],
    [
      new Set(['one', 'Two', 'ThReE', 'FOUR']),
      (x: string) => x.toUpperCase(),
      ['ONE', 'TWO', 'THREE', 'FOUR'],
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      new Map([]),
      (x: [string, number]) => x[1] + 1,
      [],
    ],
    [
      new Map([]),
      (x: [string, number]) => Math.sqrt(x[1]),
      [],
    ],
    [
      new Map([['a', 1], ['b', 2], ['c', 3]]),
      (x: [string, number]) => x[1],
      [1, 2, 3],
    ],
    [
      new Map([['a', 1], ['b', 2], ['c', 3]]),
      (x: [string, number]) => x[1] + 1,
      [2, 3, 4],
    ],
    [
      new Map([[1, "IterToolsTS"], [2, "MathTS"], [3, "SubnetCalculator"]]),
      (x: [string, number]) => `${x[1]} is great!`,
      ["IterToolsTS is great!", "MathTS is great!", "SubnetCalculator is great!"],
    ],
    [
      new Map([[0, 1], [1, 4], [2, 9], [3, 16], [4, 25]]),
      (x: [string, number]) => Math.sqrt(x[1]),
      [1, 2, 3, 4, 5],
    ],
    [
      new Map([['a', 1], ['b', -2], ['c', 3], ['d', -4], ['e', 5]]),
      (x: [string, number]) => Math.abs(x[1]),
      [1, 2, 3, 4, 5],
    ],
    [
      new Map([['one', 'one'], ['Two', 'Two'], ['ThReE', 'ThReE'], ['FOUR', 'FOUR']]),
      (x: [string, string]) => x[1].toUpperCase(),
      ['ONE', 'TWO', 'THREE', 'FOUR'],
    ],
  ];
}
