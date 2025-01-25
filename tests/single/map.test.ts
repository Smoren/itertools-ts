import {
  asyncTimeout,
  createAsyncGeneratorFixture, createAsyncIterableFixture, createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture
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
  "Single Map Test",
  (input, mapper, expected) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of single.map(input, mapper)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
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
  "Single Map Async Test",
  (input, mapper, expected) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of single.mapAsync(input, mapper)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<[Array<any>, (x: any) => any, Array<any>]> {
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

function dataProviderForGenerators(): Array<[Generator<any>, (x: any) => any, Array<any>]> {
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

function dataProviderForIterables(): Array<[Iterable<any>, (x: any) => any, Array<any>]> {
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

function dataProviderForIterators(): Array<[Iterator<any>, (x: any) => any, Array<any>]> {
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

function dataProviderForStrings(): Array<[string, (x: any) => any, Array<any>]> {
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

function dataProviderForSets(): Array<[Set<any>, (x: any) => any, Array<any>]> {
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

function dataProviderForMaps(): Array<[Map<any, any>, (x: any) => any, Array<any>]> {
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

function dataProviderForAsyncGenerators(): Array<[AsyncGenerator<any>, (x: any) => any, Array<any>]> {
  return [
    [
      createAsyncGeneratorFixture([]),
      (x: number) => x + 1,
      [],
    ],
    [
      createAsyncGeneratorFixture([]),
      (x: number) => Math.sqrt(x),
      [],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x + 1,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createAsyncGeneratorFixture(["IterToolsTS", "MathTS", "SubnetCalculator"]),
      (x: string) => `${x} is great!`,
      ["IterToolsTS is great!", "MathTS is great!", "SubnetCalculator is great!"],
    ],
    [
      createAsyncGeneratorFixture([1, 4, 9, 16, 25]),
      (x: number) => Math.sqrt(x),
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([1, -2, 3, -4, 5]),
      (x: number) => Math.abs(x),
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture(['one', 'Two', 'ThReE', 'FOUR']),
      (x: string) => x.toUpperCase(),
      ['ONE', 'TWO', 'THREE', 'FOUR'],
    ],
    [
      createAsyncGeneratorFixture(['one', 'Two', 'ThReE', 'FOUR']),
      async (x: string) => {
        await asyncTimeout(1);
        return x.toUpperCase();
      },
      ['ONE', 'TWO', 'THREE', 'FOUR'],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[AsyncIterable<any>, (x: any) => any, Array<any>]> {
  return [
    [
      createAsyncIterableFixture([]),
      (x: number) => x + 1,
      [],
    ],
    [
      createAsyncIterableFixture([]),
      (x: number) => Math.sqrt(x),
      [],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x + 1,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createAsyncIterableFixture(["IterToolsTS", "MathTS", "SubnetCalculator"]),
      (x: string) => `${x} is great!`,
      ["IterToolsTS is great!", "MathTS is great!", "SubnetCalculator is great!"],
    ],
    [
      createAsyncIterableFixture([1, 4, 9, 16, 25]),
      (x: number) => Math.sqrt(x),
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture([1, -2, 3, -4, 5]),
      (x: number) => Math.abs(x),
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture(['one', 'Two', 'ThReE', 'FOUR']),
      (x: string) => x.toUpperCase(),
      ['ONE', 'TWO', 'THREE', 'FOUR'],
    ],
    [
      createAsyncIterableFixture(['one', 'Two', 'ThReE', 'FOUR']),
      async (x: string) => {
        await asyncTimeout(1);
        return x.toUpperCase();
      },
      ['ONE', 'TWO', 'THREE', 'FOUR'],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[AsyncIterator<any>, (x: any) => any, Array<any>]> {
  return [
    [
      createAsyncIteratorFixture([]),
      (x: number) => x + 1,
      [],
    ],
    [
      createAsyncIteratorFixture([]),
      (x: number) => Math.sqrt(x),
      [],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x + 1,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createAsyncIteratorFixture(["IterToolsTS", "MathTS", "SubnetCalculator"]),
      (x: string) => `${x} is great!`,
      ["IterToolsTS is great!", "MathTS is great!", "SubnetCalculator is great!"],
    ],
    [
      createAsyncIteratorFixture([1, 4, 9, 16, 25]),
      (x: number) => Math.sqrt(x),
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([1, -2, 3, -4, 5]),
      (x: number) => Math.abs(x),
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture(['one', 'Two', 'ThReE', 'FOUR']),
      (x: string) => x.toUpperCase(),
      ['ONE', 'TWO', 'THREE', 'FOUR'],
    ],
    [
      createAsyncIteratorFixture(['one', 'Two', 'ThReE', 'FOUR']),
      async (x: string) => {
        await asyncTimeout(1);
        return x.toUpperCase();
      },
      ['ONE', 'TWO', 'THREE', 'FOUR'],
    ],
  ];
}
