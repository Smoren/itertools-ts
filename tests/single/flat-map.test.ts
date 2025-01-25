import {
  createAsyncGeneratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture,
  asyncTimeout,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  // @ts-ignore
} from "../fixture";
import { single, summary, FlatMapper, AsyncFlatMapper } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])(
  "Single Flat Map Test",
  (input, mapper, expected) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of single.flatMap(input, mapper)) {
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
  "Single Flat Map Async Test",
  (input, mapper: AsyncFlatMapper<any, any> | FlatMapper<any, any>, expected) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of single.flatMapAsync(input, mapper)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<[Array<any>, (item: any, func: FlatMapper<number, number>) => Iterable<any> | any, Array<any>]> {
  return [
    [
      [],
      (item: number) => [item],
      [],
    ],
    [
      [0],
      (item: number) => [item],
      [0],
    ],
    [
      [1],
      (item: number) => [item],
      [1],
    ],
    [
      [2],
      (item: number) => [item],
      [2],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (item: number) => [item],
      [0, 1, 2, 3, 4, 5],
    ],
    [
      [2],
      (item: number) => [item, item],
      [2, 2],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (item: number) => [item, item],
      [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (item: number) => [item, -item],
      [0, -0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5],
    ],
    [
      [],
      (item: number) => single.repeat(item, item),
      [],
    ],
    [
      [0],
      (item: number) => single.repeat(item, item),
      [],
    ],
    [
      [1],
      (item: number) => single.repeat(item, item),
      [1],
    ],
    [
      [2],
      (item: number) => single.repeat(item, item),
      [2, 2],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (item: number) => single.repeat(item, item),
      [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
    ],
    [
      [
        { 'name': 'bird', 'eggs': 2},
        { 'name': 'lizard', 'eggs': 3},
        { 'name': 'echidna', 'eggs': 1},
        { 'name': 'tyrannosaur', 'eggs': 0},
      ],
      (animal: Record<string, string|number>) => single.repeat(animal['name'], animal['eggs'] as number),
      ['bird', 'bird', 'lizard', 'lizard', 'lizard', 'echidna'],
    ],
    [
      [[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10],
      (item: Array<number>|number, func: FlatMapper<number, number>) => summary.isIterable(item)
        ? single.flatMap(item as Array<number>, func)
        : [item],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      [[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10],
      (item: Array<number>|number, func: FlatMapper<number, number>) => summary.isIterable(item)
        ? single.flatMap(item as Array<number>, func)
        : item,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      [1, 2, 3, 4, 5],
      (item: number) => item + 1,
      [2, 3, 4, 5, 6]
    ],
    [
      [1, 2, 3, 4, 5],
      (item: number) => (item % 2 === 0) ? [item, item] : item,
      [1, 2, 2, 3, 4, 4, 5]
    ],
    [
      [1, 2, [3], [4, 5], 6, []],
      (x: number|Array<number>) => x,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (item: number) => [item, item, [item]],
      [0, 0, [0], 1, 1, [1], 2, 2, [2], 3, 3, [3], 4, 4, [4], 5, 5, [5]],
    ],
    [
      ["it's Sunny in", "", "California"],
      (words: string) => words.split(' '),
      ["it's", "Sunny", "in", "", "California"],
    ],
    [
      [5, 4, -3, 20, 17, -33, -4, 18],
      (x: number) => x < 0 ? [] : (x % 2 === 0 ? [x] : [x - 1, 1]),
      [4, 1, 4, 20, 16, 1, 18],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<any>, (item: any, func: FlatMapper<number, number>) => Iterable<any> | any, Array<any>]> {
  return [
    [
      createGeneratorFixture([]),
      (item: number) => [item],
      [],
    ],
    [
      createGeneratorFixture([0]),
      (item: number) => [item],
      [0],
    ],
    [
      createGeneratorFixture([1]),
      (item: number) => [item],
      [1],
    ],
    [
      createGeneratorFixture([2]),
      (item: number) => [item],
      [2],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => [item],
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([2]),
      (item: number) => [item, item],
      [2, 2],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => [item, item],
      [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => [item, -item],
      [0, -0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5],
    ],
    [
      createGeneratorFixture([]),
      (item: number) => single.repeat(item, item),
      [],
    ],
    [
      createGeneratorFixture([0]),
      (item: number) => single.repeat(item, item),
      [],
    ],
    [
      createGeneratorFixture([1]),
      (item: number) => single.repeat(item, item),
      [1],
    ],
    [
      createGeneratorFixture([2]),
      (item: number) => single.repeat(item, item),
      [2, 2],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => single.repeat(item, item),
      [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
    ],
    [
      createGeneratorFixture([
        { 'name': 'bird', 'eggs': 2},
        { 'name': 'lizard', 'eggs': 3},
        { 'name': 'echidna', 'eggs': 1},
        { 'name': 'tyrannosaur', 'eggs': 0},
      ]),
      (animal: Record<string, string|number>) => single.repeat(animal['name'], animal['eggs'] as number),
      ['bird', 'bird', 'lizard', 'lizard', 'lizard', 'echidna'],
    ],
    [
      createGeneratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      (item: Array<number>|number, func: FlatMapper<number, number>) => summary.isIterable(item)
        ? single.flatMap(item as Array<number>, func)
        : [item],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createGeneratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      (item: Array<number>|number, func: FlatMapper<number, number>) => summary.isIterable(item)
        ? single.flatMap(item as Array<number>, func)
        : item,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5]),
      (item: number) => item + 1,
      [2, 3, 4, 5, 6]
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5]),
      (item: number) => (item % 2 === 0) ? [item, item] : item,
      [1, 2, 2, 3, 4, 4, 5]
    ],
    [
      createGeneratorFixture([1, 2, [3], [4, 5], 6, []]),
      (x: number|Array<number>) => x,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => [item, item, [item]],
      [0, 0, [0], 1, 1, [1], 2, 2, [2], 3, 3, [3], 4, 4, [4], 5, 5, [5]],
    ],
    [
      createGeneratorFixture(["it's Sunny in", "", "California"]),
      (words: string) => words.split(' '),
      ["it's", "Sunny", "in", "", "California"],
    ],
    [
      createGeneratorFixture([5, 4, -3, 20, 17, -33, -4, 18]),
      (x: number) => x < 0 ? [] : (x % 2 === 0 ? [x] : [x - 1, 1]),
      [4, 1, 4, 20, 16, 1, 18],
    ],
  ];
}

function dataProviderForIterables(): Array<[Iterable<any>, (item: any, func: FlatMapper<number, number>) => Iterable<any> | any, Array<any>]> {
  return [
    [
      createIterableFixture([]),
      (item: number) => [item],
      [],
    ],
    [
      createIterableFixture([0]),
      (item: number) => [item],
      [0],
    ],
    [
      createIterableFixture([1]),
      (item: number) => [item],
      [1],
    ],
    [
      createIterableFixture([2]),
      (item: number) => [item],
      [2],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => [item],
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture([2]),
      (item: number) => [item, item],
      [2, 2],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => [item, item],
      [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => [item, -item],
      [0, -0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5],
    ],
    [
      createIterableFixture([]),
      (item: number) => single.repeat(item, item),
      [],
    ],
    [
      createIterableFixture([0]),
      (item: number) => single.repeat(item, item),
      [],
    ],
    [
      createIterableFixture([1]),
      (item: number) => single.repeat(item, item),
      [1],
    ],
    [
      createIterableFixture([2]),
      (item: number) => single.repeat(item, item),
      [2, 2],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => single.repeat(item, item),
      [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
    ],
    [
      createIterableFixture([
        { 'name': 'bird', 'eggs': 2},
        { 'name': 'lizard', 'eggs': 3},
        { 'name': 'echidna', 'eggs': 1},
        { 'name': 'tyrannosaur', 'eggs': 0},
      ]),
      (animal: Record<string, string|number>) => single.repeat(animal['name'], animal['eggs'] as number),
      ['bird', 'bird', 'lizard', 'lizard', 'lizard', 'echidna'],
    ],
    [
      createIterableFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      (item: Array<number>|number, func: FlatMapper<number, number>) => summary.isIterable(item)
        ? single.flatMap(item as Array<number>, func)
        : [item],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIterableFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      (item: Array<number>|number, func: FlatMapper<number, number>) => summary.isIterable(item)
        ? single.flatMap(item as Array<number>, func)
        : item,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5]),
      (item: number) => item + 1,
      [2, 3, 4, 5, 6]
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5]),
      (item: number) => (item % 2 === 0) ? [item, item] : item,
      [1, 2, 2, 3, 4, 4, 5]
    ],
    [
      createIterableFixture([1, 2, [3], [4, 5], 6, []]),
      (x: number|Array<number>) => x,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => [item, item, [item]],
      [0, 0, [0], 1, 1, [1], 2, 2, [2], 3, 3, [3], 4, 4, [4], 5, 5, [5]],
    ],
    [
      createIterableFixture(["it's Sunny in", "", "California"]),
      (words: string) => words.split(' '),
      ["it's", "Sunny", "in", "", "California"],
    ],
    [
      createIterableFixture([5, 4, -3, 20, 17, -33, -4, 18]),
      (x: number) => x < 0 ? [] : (x % 2 === 0 ? [x] : [x - 1, 1]),
      [4, 1, 4, 20, 16, 1, 18],
    ],
  ];
}

function dataProviderForIterators(): Array<[Iterator<any>, (item: any, func: FlatMapper<number, number>) => Iterable<any> | any, Array<any>]> {
  return [
    [
      createIteratorFixture([]),
      (item: number) => [item],
      [],
    ],
    [
      createIteratorFixture([0]),
      (item: number) => [item],
      [0],
    ],
    [
      createIteratorFixture([1]),
      (item: number) => [item],
      [1],
    ],
    [
      createIteratorFixture([2]),
      (item: number) => [item],
      [2],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => [item],
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture([2]),
      (item: number) => [item, item],
      [2, 2],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => [item, item],
      [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => [item, -item],
      [0, -0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5],
    ],
    [
      createIteratorFixture([]),
      (item: number) => single.repeat(item, item),
      [],
    ],
    [
      createIteratorFixture([0]),
      (item: number) => single.repeat(item, item),
      [],
    ],
    [
      createIteratorFixture([1]),
      (item: number) => single.repeat(item, item),
      [1],
    ],
    [
      createIteratorFixture([2]),
      (item: number) => single.repeat(item, item),
      [2, 2],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => single.repeat(item, item),
      [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
    ],
    [
      createIteratorFixture([
        { 'name': 'bird', 'eggs': 2},
        { 'name': 'lizard', 'eggs': 3},
        { 'name': 'echidna', 'eggs': 1},
        { 'name': 'tyrannosaur', 'eggs': 0},
      ]),
      (animal: Record<string, string|number>) => single.repeat(animal['name'], animal['eggs'] as number),
      ['bird', 'bird', 'lizard', 'lizard', 'lizard', 'echidna'],
    ],
    [
      createIteratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      (item: Array<number>|number, func: FlatMapper<number, number>) => summary.isIterable(item)
        ? single.flatMap(item as Array<number>, func)
        : [item],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIteratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      (item: Array<number>|number, func: FlatMapper<number, number>) => summary.isIterable(item)
        ? single.flatMap(item as Array<number>, func)
        : item,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5]),
      (item: number) => item + 1,
      [2, 3, 4, 5, 6]
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5]),
      (item: number) => (item % 2 === 0) ? [item, item] : item,
      [1, 2, 2, 3, 4, 4, 5]
    ],
    [
      createIteratorFixture([1, 2, [3], [4, 5], 6, []]),
      (x: number|Array<number>) => x,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => [item, item, [item]],
      [0, 0, [0], 1, 1, [1], 2, 2, [2], 3, 3, [3], 4, 4, [4], 5, 5, [5]],
    ],
    [
      createIteratorFixture(["it's Sunny in", "", "California"]),
      (words: string) => words.split(' '),
      ["it's", "Sunny", "in", "", "California"],
    ],
    [
      createIteratorFixture([5, 4, -3, 20, 17, -33, -4, 18]),
      (x: number) => x < 0 ? [] : (x % 2 === 0 ? [x] : [x - 1, 1]),
      [4, 1, 4, 20, 16, 1, 18],
    ],
  ];
}

function dataProviderForStrings(): Array<[string, (item: any, func: FlatMapper<number, number>) => Iterable<any> | any, Array<any>]> {
  return [
    [
      '',
      (item: string) => [item],
      [],
    ],
    [
      '0',
      (item: string) => [item],
      ['0'],
    ],
    [
      '1',
      (item: string) => [item],
      ['1'],
    ],
    [
      '2',
      (item: string) => [item],
      ['2'],
    ],
    [
      '012345',
      (item: string) => [item],
      ['0', '1', '2', '3', '4', '5'],
    ],
    [
      '2',
      (item: string) => [item, item],
      ['2', '2'],
    ],
    [
      '012345',
      (item: string) => [item, item],
      ['0', '0', '1', '1', '2', '2', '3', '3', '4', '4', '5', '5'],
    ],
    [
      '012345',
      (item: string) => [parseInt(item), -parseInt(item)],
      [0, -0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5],
    ],
    [
      '',
      (item: string) => single.repeat(item, parseInt(item)),
      [],
    ],
    [
      '0',
      (item: string) => single.repeat(item, parseInt(item)),
      [],
    ],
    [
      '1',
      (item: string) => single.repeat(item, parseInt(item)),
      ['1'],
    ],
    [
      '2',
      (item: string) => single.repeat(item, parseInt(item)),
      ['2', '2'],
    ],
    [
      '012345',
      (item: string) => single.repeat(parseInt(item), parseInt(item)),
      [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
    ],
  ];
}

function dataProviderForSets(): Array<[Set<any>, (item: any, func: FlatMapper<number, number>) => Iterable<any> | any, Array<any>]> {
  return [
    [
      new Set([]),
      (item: number) => [item],
      [],
    ],
    [
      new Set([0]),
      (item: number) => [item],
      [0],
    ],
    [
      new Set([1]),
      (item: number) => [item],
      [1],
    ],
    [
      new Set([2]),
      (item: number) => [item],
      [2],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (item: number) => [item],
      [0, 1, 2, 3, 4, 5],
    ],
    [
      new Set([2]),
      (item: number) => [item, item],
      [2, 2],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (item: number) => [item, item],
      [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (item: number) => [item, -item],
      [0, -0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5],
    ],
    [
      new Set([]),
      (item: number) => single.repeat(item, item),
      [],
    ],
    [
      new Set([0]),
      (item: number) => single.repeat(item, item),
      [],
    ],
    [
      new Set([1]),
      (item: number) => single.repeat(item, item),
      [1],
    ],
    [
      new Set([2]),
      (item: number) => single.repeat(item, item),
      [2, 2],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (item: number) => single.repeat(item, item),
      [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
    ],
    [
      new Set([
        { 'name': 'bird', 'eggs': 2},
        { 'name': 'lizard', 'eggs': 3},
        { 'name': 'echidna', 'eggs': 1},
        { 'name': 'tyrannosaur', 'eggs': 0},
      ]),
      (animal: Record<string, string|number>) => single.repeat(animal['name'], animal['eggs'] as number),
      ['bird', 'bird', 'lizard', 'lizard', 'lizard', 'echidna'],
    ],
    [
      new Set([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      (item: Array<number>|number, func: FlatMapper<number, number>) => summary.isIterable(item)
        ? single.flatMap(item as Array<number>, func)
        : [item],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      new Set([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      (item: Array<number>|number, func: FlatMapper<number, number>) => summary.isIterable(item)
        ? single.flatMap(item as Array<number>, func)
        : item,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      (item: number) => item + 1,
      [2, 3, 4, 5, 6]
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      (item: number) => (item % 2 === 0) ? [item, item] : item,
      [1, 2, 2, 3, 4, 4, 5]
    ],
    [
      new Set([1, 2, [3], [4, 5], 6, []]),
      (x: number|Array<number>) => x,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (item: number) => [item, item, [item]],
      [0, 0, [0], 1, 1, [1], 2, 2, [2], 3, 3, [3], 4, 4, [4], 5, 5, [5]],
    ],
    [
      new Set(["it's Sunny in", "", "California"]),
      (words: string) => words.split(' '),
      ["it's", "Sunny", "in", "", "California"],
    ],
    [
      new Set([5, 4, -3, 20, 17, -33, -4, 18]),
      (x: number) => x < 0 ? [] : (x % 2 === 0 ? [x] : [x - 1, 1]),
      [4, 1, 4, 20, 16, 1, 18],
    ],
  ];
}

function dataProviderForMaps(): Array<[Map<any, any>, (item: any, func: FlatMapper<number, number>) => Iterable<any> | any, Array<any>]> {
  return [
    [
      createMapFixture([]),
      (item: [number, number]) => [item],
      [],
    ],
    [
      createMapFixture([0]),
      (item: [number, number]) => [item[1]],
      [0],
    ],
    [
      createMapFixture([1]),
      (item: [number, number]) => [item[1]],
      [1],
    ],
    [
      createMapFixture([2]),
      (item: [number, number]) => [item[1]],
      [2],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (item: [number, number]) => [item[1]],
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createMapFixture([2]),
      (item: [number, number]) => [item[1], item[1]],
      [2, 2],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (item: [number, number]) => [item[1], item[1]],
      [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (item: [number, number]) => [item[1], -item[1]],
      [0, -0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5],
    ],
    [
      createMapFixture([]),
      (item: [number, number]) => single.repeat(item[1], item[1]),
      [],
    ],
    [
      createMapFixture([0]),
      (item: [number, number]) => single.repeat(item[1], item[1]),
      [],
    ],
    [
      createMapFixture([1]),
      (item: [number, number]) => single.repeat(item[1], item[1]),
      [1],
    ],
    [
      createMapFixture([2]),
      (item: [number, number]) => single.repeat(item[1], item[1]),
      [2, 2],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (item: [number, number]) => single.repeat(item[1], item[1]),
      [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
    ],
    [
      createMapFixture([
        { 'name': 'bird', 'eggs': 2},
        { 'name': 'lizard', 'eggs': 3},
        { 'name': 'echidna', 'eggs': 1},
        { 'name': 'tyrannosaur', 'eggs': 0},
      ]),
      (animal: [number, Record<string, string|number>]) => single.repeat(animal[1]['name'], animal[1]['eggs'] as number),
      ['bird', 'bird', 'lizard', 'lizard', 'lizard', 'echidna'],
    ],
    [
      createMapFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      (item: [number, Array<number>|number], func) => summary.isIterable(item[1])
        ? single.flatMap(createMapFixture(item[1] as Array<number>), func as FlatMapper<Array<number>|number, number>)
        : [item[1]],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createMapFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      (item: [number, Array<number>|number], func) => summary.isIterable(item[1])
        ? single.flatMap(createMapFixture(item[1] as Array<number>), func as FlatMapper<Array<number>|number, number>)
        : item[1],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (item: [number, number]) => item[1] + 1,
      [2, 3, 4, 5, 6]
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (item: [number, number]) => (item[1] % 2 === 0) ? [item[1], item[1]] : item[1],
      [1, 2, 2, 3, 4, 4, 5]
    ],
    [
      createMapFixture([1, 2, [3], [4, 5], 6, []]),
      (x: [number, number|Array<number>]) => x[1],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (item: [number, number]) => [item[1], item[1], [item[1]]],
      [0, 0, [0], 1, 1, [1], 2, 2, [2], 3, 3, [3], 4, 4, [4], 5, 5, [5]],
    ],
    [
      createMapFixture(["it's Sunny in", "", "California"]),
      (words: [number, string]) => words[1].split(' '),
      ["it's", "Sunny", "in", "", "California"],
    ],
    [
      createMapFixture([5, 4, -3, 20, 17, -33, -4, 18]),
      (x: [number, number]) => x[1] < 0 ? [] : (x[1] % 2 === 0 ? [x[1]] : [x[1] - 1, 1]),
      [4, 1, 4, 20, 16, 1, 18],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[AsyncGenerator<any>, (item: any, func: FlatMapper<number, number> | AsyncFlatMapper<number, number>) => Iterable<any> | any | Promise<Iterable<any> | any>, Array<any>]> {
  return [
    [
      createAsyncGeneratorFixture([]),
      (item: number) => [item],
      [],
    ],
    [
      createAsyncGeneratorFixture([0]),
      (item: number) => [item],
      [0],
    ],
    [
      createAsyncGeneratorFixture([1]),
      (item: number) => [item],
      [1],
    ],
    [
      createAsyncGeneratorFixture([2]),
      (item: number) => [item],
      [2],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => [item],
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([2]),
      (item: number) => [item, item],
      [2, 2],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => [item, item],
      [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => [item, -item],
      [0, -0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5],
    ],
    [
      createAsyncGeneratorFixture([]),
      (item: number) => single.repeat(item, item),
      [],
    ],
    [
      createAsyncGeneratorFixture([0]),
      (item: number) => single.repeat(item, item),
      [],
    ],
    [
      createAsyncGeneratorFixture([1]),
      (item: number) => single.repeat(item, item),
      [1],
    ],
    [
      createAsyncGeneratorFixture([2]),
      (item: number) => single.repeat(item, item),
      [2, 2],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => single.repeat(item, item),
      [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
    ],
    [
      createAsyncGeneratorFixture([
        { 'name': 'bird', 'eggs': 2},
        { 'name': 'lizard', 'eggs': 3},
        { 'name': 'echidna', 'eggs': 1},
        { 'name': 'tyrannosaur', 'eggs': 0},
      ]),
      (animal: Record<string, string|number>) => single.repeat(animal['name'], animal['eggs'] as number),
      ['bird', 'bird', 'lizard', 'lizard', 'lizard', 'echidna'],
    ],
    [
      createAsyncGeneratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      (item: Array<number>|number, func) => summary.isIterable(item)
        ? single.flatMap(item as Array<number>, func as FlatMapper<number, number>)
        : [item],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncGeneratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      (item: Array<number>|number, func) => summary.isIterable(item)
        ? single.flatMap(item as Array<number>, func as FlatMapper<number, number>)
        : item,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
      (item: number) => item + 1,
      [2, 3, 4, 5, 6]
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
      (item: number) => (item % 2 === 0) ? [item, item] : item,
      [1, 2, 2, 3, 4, 4, 5]
    ],
    [
      createAsyncGeneratorFixture([1, 2, [3], [4, 5], 6, []]),
      (x: number|Array<number>) => x,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => [item, item, [item]],
      [0, 0, [0], 1, 1, [1], 2, 2, [2], 3, 3, [3], 4, 4, [4], 5, 5, [5]],
    ],
    [
      createAsyncGeneratorFixture(["it's Sunny in", "", "California"]),
      (words: string) => words.split(' '),
      ["it's", "Sunny", "in", "", "California"],
    ],
    [
      createAsyncGeneratorFixture([5, 4, -3, 20, 17, -33, -4, 18]),
      (x: number) => x < 0 ? [] : (x % 2 === 0 ? [x] : [x - 1, 1]),
      [4, 1, 4, 20, 16, 1, 18],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      async (item: number) => {
        await asyncTimeout(1);
        return [item, item];
      },
      [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
    ],
    [
      createAsyncGeneratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      async (item: Array<number>|number, func) => {
        await asyncTimeout(1);
        return summary.isIterable(item)
          ? single.flatMapAsync(item as Array<number>, func as AsyncFlatMapper<number, number>)
          : item
      },
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[AsyncIterable<any>, (item: any, func: FlatMapper<number, number> | AsyncFlatMapper<number, number>) => Iterable<any> | any | Promise<Iterable<any> | any>, Array<any>]> {
  return [
    [
      createAsyncIterableFixture([]),
      (item: number) => [item],
      [],
    ],
    [
      createAsyncIterableFixture([0]),
      (item: number) => [item],
      [0],
    ],
    [
      createAsyncIterableFixture([1]),
      (item: number) => [item],
      [1],
    ],
    [
      createAsyncIterableFixture([2]),
      (item: number) => [item],
      [2],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => [item],
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture([2]),
      (item: number) => [item, item],
      [2, 2],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => [item, item],
      [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => [item, -item],
      [0, -0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5],
    ],
    [
      createAsyncIterableFixture([]),
      (item: number) => single.repeat(item, item),
      [],
    ],
    [
      createAsyncIterableFixture([0]),
      (item: number) => single.repeat(item, item),
      [],
    ],
    [
      createAsyncIterableFixture([1]),
      (item: number) => single.repeat(item, item),
      [1],
    ],
    [
      createAsyncIterableFixture([2]),
      (item: number) => single.repeat(item, item),
      [2, 2],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => single.repeat(item, item),
      [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
    ],
    [
      createAsyncIterableFixture([
        { 'name': 'bird', 'eggs': 2},
        { 'name': 'lizard', 'eggs': 3},
        { 'name': 'echidna', 'eggs': 1},
        { 'name': 'tyrannosaur', 'eggs': 0},
      ]),
      (animal: Record<string, string|number>) => single.repeat(animal['name'], animal['eggs'] as number),
      ['bird', 'bird', 'lizard', 'lizard', 'lizard', 'echidna'],
    ],
    [
      createAsyncIterableFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      (item: Array<number>|number, func) => summary.isIterable(item)
        ? single.flatMap(item as Array<number>, func as FlatMapper<number, number>)
        : [item],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIterableFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      (item: Array<number>|number, func) => summary.isIterable(item)
        ? single.flatMap(item as Array<number>, func as FlatMapper<number, number>)
        : item,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      (item: number) => item + 1,
      [2, 3, 4, 5, 6]
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      (item: number) => (item % 2 === 0) ? [item, item] : item,
      [1, 2, 2, 3, 4, 4, 5]
    ],
    [
      createAsyncIterableFixture([1, 2, [3], [4, 5], 6, []]),
      (x: number|Array<number>) => x,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => [item, item, [item]],
      [0, 0, [0], 1, 1, [1], 2, 2, [2], 3, 3, [3], 4, 4, [4], 5, 5, [5]],
    ],
    [
      createAsyncIterableFixture(["it's Sunny in", "", "California"]),
      (words: string) => words.split(' '),
      ["it's", "Sunny", "in", "", "California"],
    ],
    [
      createAsyncIterableFixture([5, 4, -3, 20, 17, -33, -4, 18]),
      (x: number) => x < 0 ? [] : (x % 2 === 0 ? [x] : [x - 1, 1]),
      [4, 1, 4, 20, 16, 1, 18],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      async (item: number) => {
        await asyncTimeout(1);
        return [item, item];
      },
      [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
    ],
    [
      createAsyncIterableFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      async (item: Array<number>|number, func) => {
        await asyncTimeout(1);
        return summary.isIterable(item)
          ? single.flatMapAsync(item as Array<number>, func as AsyncFlatMapper<number, number>)
          : item
      },
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[AsyncIterator<any>, (item: any, func: FlatMapper<number, number> | AsyncFlatMapper<number, number>) => Iterable<any> | any | Promise<Iterable<any> | any>, Array<any>]> {
  return [
    [
      createAsyncIteratorFixture([]),
      (item: number) => [item],
      [],
    ],
    [
      createAsyncIteratorFixture([0]),
      (item: number) => [item],
      [0],
    ],
    [
      createAsyncIteratorFixture([1]),
      (item: number) => [item],
      [1],
    ],
    [
      createAsyncIteratorFixture([2]),
      (item: number) => [item],
      [2],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => [item],
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([2]),
      (item: number) => [item, item],
      [2, 2],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => [item, item],
      [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => [item, -item],
      [0, -0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5],
    ],
    [
      createAsyncIteratorFixture([]),
      (item: number) => single.repeat(item, item),
      [],
    ],
    [
      createAsyncIteratorFixture([0]),
      (item: number) => single.repeat(item, item),
      [],
    ],
    [
      createAsyncIteratorFixture([1]),
      (item: number) => single.repeat(item, item),
      [1],
    ],
    [
      createAsyncIteratorFixture([2]),
      (item: number) => single.repeat(item, item),
      [2, 2],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => single.repeat(item, item),
      [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
    ],
    [
      createAsyncIteratorFixture([
        { 'name': 'bird', 'eggs': 2},
        { 'name': 'lizard', 'eggs': 3},
        { 'name': 'echidna', 'eggs': 1},
        { 'name': 'tyrannosaur', 'eggs': 0},
      ]),
      (animal: Record<string, string|number>) => single.repeat(animal['name'], animal['eggs'] as number),
      ['bird', 'bird', 'lizard', 'lizard', 'lizard', 'echidna'],
    ],
    [
      createAsyncIteratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      (item: Array<number>|number, func) => summary.isIterable(item)
        ? single.flatMap(item as Array<number>, func as FlatMapper<number, number>)
        : [item],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIteratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      (item: Array<number>|number, func) => summary.isIterable(item)
        ? single.flatMap(item as Array<number>, func as FlatMapper<number, number>)
        : item,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5]),
      (item: number) => item + 1,
      [2, 3, 4, 5, 6]
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5]),
      (item: number) => (item % 2 === 0) ? [item, item] : item,
      [1, 2, 2, 3, 4, 4, 5]
    ],
    [
      createAsyncIteratorFixture([1, 2, [3], [4, 5], 6, []]),
      (x: number|Array<number>) => x,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => [item, item, [item]],
      [0, 0, [0], 1, 1, [1], 2, 2, [2], 3, 3, [3], 4, 4, [4], 5, 5, [5]],
    ],
    [
      createAsyncIteratorFixture(["it's Sunny in", "", "California"]),
      (words: string) => words.split(' '),
      ["it's", "Sunny", "in", "", "California"],
    ],
    [
      createAsyncIteratorFixture([5, 4, -3, 20, 17, -33, -4, 18]),
      (x: number) => x < 0 ? [] : (x % 2 === 0 ? [x] : [x - 1, 1]),
      [4, 1, 4, 20, 16, 1, 18],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      async (item: number) => {
        await asyncTimeout(1);
        return [item, item];
      },
      [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
    ],
    [
      createAsyncIteratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      async (item: Array<number>|number, func) => {
        await asyncTimeout(1);
        return summary.isIterable(item)
          ? single.flatMapAsync(item as Array<number>, func as AsyncFlatMapper<number, number>)
          : item
      },
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
  ];
}
