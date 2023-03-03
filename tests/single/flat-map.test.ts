// @ts-ignore
import { createGeneratorFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { flatMap, FlatMapper, repeat } from "../../src/single";
import { isIterable } from "../../src/tools";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])("Single Flat Map Test", (input, mapper, expected) => {
  it("", () => {
    // Given
    const result = [];

    // When
    for (const item of flatMap(input as Iterable<unknown>, mapper as (datum: unknown) => unknown)) {
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
      (item: number) => repeat(item, item),
      [],
    ],
    [
      [0],
      (item: number) => repeat(item, item),
      [],
    ],
    [
      [1],
      (item: number) => repeat(item, item),
      [1],
    ],
    [
      [2],
      (item: number) => repeat(item, item),
      [2, 2],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (item: number) => repeat(item, item),
      [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
    ],
    [
      [
        { 'name': 'bird', 'eggs': 2},
        { 'name': 'lizard', 'eggs': 3},
        { 'name': 'echidna', 'eggs': 1},
        { 'name': 'tyrannosaur', 'eggs': 0},
      ],
      (animal: Record<string, string|number>) => repeat(animal['name'], animal['eggs'] as number),
      ['bird', 'bird', 'lizard', 'lizard', 'lizard', 'echidna'],
    ],
    [
      [[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10],
      (item: Array<number>|number, func: FlatMapper<number, number>) => isIterable(item)
        ? flatMap(item as Array<number>, func)
        : [item],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      [[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10],
      (item: Array<number>|number, func: FlatMapper<number, number>) => isIterable(item)
        ? flatMap(item as Array<number>, func)
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

function dataProviderForGenerators(): Array<unknown> {
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
      (item: number) => repeat(item, item),
      [],
    ],
    [
      createGeneratorFixture([0]),
      (item: number) => repeat(item, item),
      [],
    ],
    [
      createGeneratorFixture([1]),
      (item: number) => repeat(item, item),
      [1],
    ],
    [
      createGeneratorFixture([2]),
      (item: number) => repeat(item, item),
      [2, 2],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => repeat(item, item),
      [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
    ],
    [
      createGeneratorFixture([
        { 'name': 'bird', 'eggs': 2},
        { 'name': 'lizard', 'eggs': 3},
        { 'name': 'echidna', 'eggs': 1},
        { 'name': 'tyrannosaur', 'eggs': 0},
      ]),
      (animal: Record<string, string|number>) => repeat(animal['name'], animal['eggs'] as number),
      ['bird', 'bird', 'lizard', 'lizard', 'lizard', 'echidna'],
    ],
    [
      createGeneratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      (item: Array<number>|number, func: FlatMapper<number, number>) => isIterable(item)
        ? flatMap(item as Array<number>, func)
        : [item],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createGeneratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      (item: Array<number>|number, func: FlatMapper<number, number>) => isIterable(item)
        ? flatMap(item as Array<number>, func)
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

function dataProviderForIterators(): Array<unknown> {
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
      (item: number) => repeat(item, item),
      [],
    ],
    [
      createIteratorFixture([0]),
      (item: number) => repeat(item, item),
      [],
    ],
    [
      createIteratorFixture([1]),
      (item: number) => repeat(item, item),
      [1],
    ],
    [
      createIteratorFixture([2]),
      (item: number) => repeat(item, item),
      [2, 2],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (item: number) => repeat(item, item),
      [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
    ],
    [
      createIteratorFixture([
        { 'name': 'bird', 'eggs': 2},
        { 'name': 'lizard', 'eggs': 3},
        { 'name': 'echidna', 'eggs': 1},
        { 'name': 'tyrannosaur', 'eggs': 0},
      ]),
      (animal: Record<string, string|number>) => repeat(animal['name'], animal['eggs'] as number),
      ['bird', 'bird', 'lizard', 'lizard', 'lizard', 'echidna'],
    ],
    [
      createIteratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      (item: Array<number>|number, func: FlatMapper<number, number>) => isIterable(item)
        ? flatMap(item as Array<number>, func)
        : [item],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createIteratorFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      (item: Array<number>|number, func: FlatMapper<number, number>) => isIterable(item)
        ? flatMap(item as Array<number>, func)
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

function dataProviderForStrings(): Array<unknown> {
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
      (item: string) => repeat(item, parseInt(item)),
      [],
    ],
    [
      '0',
      (item: string) => repeat(item, parseInt(item)),
      [],
    ],
    [
      '1',
      (item: string) => repeat(item, parseInt(item)),
      ['1'],
    ],
    [
      '2',
      (item: string) => repeat(item, parseInt(item)),
      ['2', '2'],
    ],
    [
      '012345',
      (item: string) => repeat(parseInt(item), parseInt(item)),
      [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
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
      (item: number) => repeat(item, item),
      [],
    ],
    [
      new Set([0]),
      (item: number) => repeat(item, item),
      [],
    ],
    [
      new Set([1]),
      (item: number) => repeat(item, item),
      [1],
    ],
    [
      new Set([2]),
      (item: number) => repeat(item, item),
      [2, 2],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (item: number) => repeat(item, item),
      [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
    ],
    [
      new Set([
        { 'name': 'bird', 'eggs': 2},
        { 'name': 'lizard', 'eggs': 3},
        { 'name': 'echidna', 'eggs': 1},
        { 'name': 'tyrannosaur', 'eggs': 0},
      ]),
      (animal: Record<string, string|number>) => repeat(animal['name'], animal['eggs'] as number),
      ['bird', 'bird', 'lizard', 'lizard', 'lizard', 'echidna'],
    ],
    [
      new Set([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      (item: Array<number>|number, func: FlatMapper<number, number>) => isIterable(item)
        ? flatMap(item as Array<number>, func)
        : [item],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      new Set([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      (item: Array<number>|number, func: FlatMapper<number, number>) => isIterable(item)
        ? flatMap(item as Array<number>, func)
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

function dataProviderForMaps(): Array<unknown> {
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
      (item: [number, number]) => repeat(item[1], item[1]),
      [],
    ],
    [
      createMapFixture([0]),
      (item: [number, number]) => repeat(item[1], item[1]),
      [],
    ],
    [
      createMapFixture([1]),
      (item: [number, number]) => repeat(item[1], item[1]),
      [1],
    ],
    [
      createMapFixture([2]),
      (item: [number, number]) => repeat(item[1], item[1]),
      [2, 2],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (item: [number, number]) => repeat(item[1], item[1]),
      [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
    ],
    [
      createMapFixture([
        { 'name': 'bird', 'eggs': 2},
        { 'name': 'lizard', 'eggs': 3},
        { 'name': 'echidna', 'eggs': 1},
        { 'name': 'tyrannosaur', 'eggs': 0},
      ]),
      (animal: [number, Record<string, string|number>]) => repeat(animal[1]['name'], animal[1]['eggs'] as number),
      ['bird', 'bird', 'lizard', 'lizard', 'lizard', 'echidna'],
    ],
    [
      createMapFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      (item: [number, Array<number>|number], func: FlatMapper<Array<number>|number, number>) => isIterable(item[1])
        ? flatMap(createMapFixture(item[1] as Array<number>), func)
        : [item[1]],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      createMapFixture([[1, 2, [3, [4, 5]], 6], [7], [8, 9], 10]),
      (item: [number, Array<number>|number], func: FlatMapper<Array<number>|number, number>) => isIterable(item[1])
        ? flatMap(createMapFixture(item[1] as Array<number>), func)
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
