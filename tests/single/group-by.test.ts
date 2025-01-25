import {
  asyncTimeout,
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
  "Single Group By Test",
  (input, groupKeyFunction, itemKeyFunction, expected, ) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of single.groupBy(input, groupKeyFunction, itemKeyFunction)) {
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
  "Single Group By Async Test",
  (input, groupKeyFunction, itemKeyFunction, expected, ) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of single.groupByAsync(input, groupKeyFunction, itemKeyFunction)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<[Array<any>, (x: any) => any, ((x: any) => any) | undefined, Array<any>]> {
  return [
    [
      [],
      (x: number) => x % 2 ? 'odd' : 'even',
      undefined,
      [],
    ],
    [
      [],
      (x: number) => x % 2 ? 'odd' : 'even',
      (x: number) => `item${x}`,
      [],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      (x: number) => x % 2 ? 'odd' : 'even',
      undefined,
      [
        ['odd', [1, 3, 5, 7, 9]],
        ['even', [2, 4, 6, 8]],
      ],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      (x: number) => x % 2 ? 'odd' : 'even',
      (x: number) => `item${x}`,
      [
        ['odd', {item1: 1, item3: 3, item5: 5, item7: 7, item9: 9}],
        ['even', {item2: 2, item4: 4, item6: 6, item8: 8}],
      ],
    ],
    [
      [['a', 1], ['a', 2], ['b', 3], ['b', 4], ['c', 5], ['a', 6], ['c', 7]],
      (x: Array<[string, number]>) => x[0],
      undefined,
      [
        ['a', [['a', 1], ['a', 2], ['a', 6]]],
        ['b', [['b', 3], ['b', 4]]],
        ['c', [['c', 5], ['c', 7]]],
      ],
    ],
    [
      [['a', 1], ['a', 2], ['b', 3], ['b', 4], ['c', 5], ['a', 6], ['c', 7]],
      (x: Array<[string, number]>) => x[0],
      (x: Array<[string, number]>) => x[1],
      [
        ['a', {1: ['a', 1], 2: ['a', 2], 6: ['a', 6]}],
        ['b', {3: ['b', 3], 4: ['b', 4]}],
        ['c', {5: ['c', 5], 7: ['c', 7]}],
      ],
    ],
    [
      [['a', 1], ['a', 2], ['b', 3], ['b', 4], ['c', 5], ['a', 6], ['c', 7]],
      (x: Array<[string, number]>) => x[1],
      undefined,
      [
        [1, [['a', 1]]],
        [2, [['a', 2]]],
        [3, [['b', 3]]],
        [4, [['b', 4]]],
        [5, [['c', 5]]],
        [6, [['a', 6]]],
        [7, [['c', 7]]],
      ],
    ],
    [
      [[1, 'a'], [2, 'a'], [3, 'b'], [4, 'b'], [5, 'c'], [6, 'a'], [7, 'c']],
      (x: Array<[string, number]>) => x[1],
      undefined,
      [
        ['a', [[1, 'a'], [2, 'a'], [6, 'a']]],
        ['b', [[3, 'b'], [4, 'b']]],
        ['c', [[5, 'c'], [7, 'c']]],
      ],
    ],
    [
      [[1, 'a'], [2, 'a'], [3, 'b'], [4, 'b'], [5, 'c'], [6, 'a'], [7, 'c']],
      (x: Array<[string, number]>) => x[0],
      undefined,
      [
        [1, [[1, 'a']]],
        [2, [[2, 'a']]],
        [3, [[3, 'b']]],
        [4, [[4, 'b']]],
        [5, [[5, 'c']]],
        [6, [[6, 'a']]],
        [7, [[7, 'c']]],
      ],
    ],
    [
      [
        ['Episode IV', "Luke"],
        ['Episode IV', "Leia"],
        ['Episode IV', "Chewie"],
        ['Episode IV', "Han"],
        ['Episode IV', "Obi-wan"],
        ['Episode IV', "R2-D2"],
        ['Episode IV', "C3P0"],
        ['Episode IV', "Vader"],
        ['Episode IV', "Tarkin"],
        ['Episode V', "Luke"],
        ['Episode V', "Leia"],
        ['Episode V', "Chewie"],
        ['Episode V', "Han"],
        ['Episode V', "Obi-wan"],
        ['Episode V', "R2-D2"],
        ['Episode V', "C3P0"],
        ['Episode V', "Lando"],
        ['Episode V', "Han"],
        ['Episode V', "Vader"],
        ['Episode V', "Emperor"],
        ['Episode V', "Yoda"],
        ['Episode V', "Boba Fett"],
        ['Episode VI', "Luke"],
        ['Episode VI', "Leia"],
        ['Episode VI', "Chewie"],
        ['Episode VI', "Han"],
        ['Episode VI', "Obi-wan"],
        ['Episode VI', "R2-D2"],
        ['Episode VI', "C3P0"],
        ['Episode VI', "Lando"],
        ['Episode VI', "Han"],
        ['Episode VI', "Vader"],
        ['Episode VI', "Emperor"],
        ['Episode VI', "Yoda"],
        ['Episode VI', "Boba Fett"],
        ['Episode VI', "Jabba"],
      ],
      (x: [string, string]) => x[0],
      undefined,
      [
        ['Episode IV', [
          ['Episode IV', "Luke"],
          ['Episode IV', "Leia"],
          ['Episode IV', "Chewie"],
          ['Episode IV', "Han"],
          ['Episode IV', "Obi-wan"],
          ['Episode IV', "R2-D2"],
          ['Episode IV', "C3P0"],
          ['Episode IV', "Vader"],
          ['Episode IV', "Tarkin"],
        ]],
        ['Episode V', [
          ['Episode V', "Luke"],
          ['Episode V', "Leia"],
          ['Episode V', "Chewie"],
          ['Episode V', "Han"],
          ['Episode V', "Obi-wan"],
          ['Episode V', "R2-D2"],
          ['Episode V', "C3P0"],
          ['Episode V', "Lando"],
          ['Episode V', "Han"],
          ['Episode V', "Vader"],
          ['Episode V', "Emperor"],
          ['Episode V', "Yoda"],
          ['Episode V', "Boba Fett"],
        ]],
        ['Episode VI', [
          ['Episode VI', "Luke"],
          ['Episode VI', "Leia"],
          ['Episode VI', "Chewie"],
          ['Episode VI', "Han"],
          ['Episode VI', "Obi-wan"],
          ['Episode VI', "R2-D2"],
          ['Episode VI', "C3P0"],
          ['Episode VI', "Lando"],
          ['Episode VI', "Han"],
          ['Episode VI', "Vader"],
          ['Episode VI', "Emperor"],
          ['Episode VI', "Yoda"],
          ['Episode VI', "Boba Fett"],
          ['Episode VI', "Jabba"],
        ]]
      ],
    ],
    [
      [
        ['Episode IV', "Luke"],
        ['Episode IV', "Leia"],
        ['Episode IV', "Chewie"],
        ['Episode IV', "Han"],
        ['Episode IV', "Obi-wan"],
        ['Episode IV', "R2-D2"],
        ['Episode IV', "C3P0"],
        ['Episode IV', "Vader"],
        ['Episode IV', "Tarkin"],
        ['Episode V', "Luke"],
        ['Episode V', "Leia"],
        ['Episode V', "Chewie"],
        ['Episode V', "Han"],
        ['Episode V', "Obi-wan"],
        ['Episode V', "R2-D2"],
        ['Episode V', "C3P0"],
        ['Episode V', "Lando"],
        ['Episode V', "Vader"],
        ['Episode V', "Emperor"],
        ['Episode V', "Yoda"],
        ['Episode V', "Boba Fett"],
        ['Episode VI', "Luke"],
        ['Episode VI', "Leia"],
        ['Episode VI', "Chewie"],
        ['Episode VI', "Han"],
        ['Episode VI', "Obi-wan"],
        ['Episode VI', "R2-D2"],
        ['Episode VI', "C3P0"],
        ['Episode VI', "Lando"],
        ['Episode VI', "Vader"],
        ['Episode VI', "Emperor"],
        ['Episode VI', "Yoda"],
        ['Episode VI', "Boba Fett"],
        ['Episode VI', "Jabba"],
      ],
      (x: [string, string]) => x[1],
      undefined,
      [
        ['Luke', [
          ['Episode IV', "Luke"],
          ['Episode V', "Luke"],
          ['Episode VI', "Luke"],
        ]],
        ['Leia', [
          ['Episode IV', "Leia"],
          ['Episode V', "Leia"],
          ['Episode VI', "Leia"],
        ]],
        ['Chewie', [
          ['Episode IV', "Chewie"],
          ['Episode V', "Chewie"],
          ['Episode VI', "Chewie"],
        ]],
        ['Han', [
          ['Episode IV', "Han"],
          ['Episode V', "Han"],
          ['Episode VI', "Han"],
        ]],
        ['Obi-wan', [
          ['Episode IV', "Obi-wan"],
          ['Episode V', "Obi-wan"],
          ['Episode VI', "Obi-wan"],
        ]],
        ['R2-D2', [
          ['Episode IV', "R2-D2"],
          ['Episode V', "R2-D2"],
          ['Episode VI', "R2-D2"],
        ]],
        ['C3P0', [
          ['Episode IV', "C3P0"],
          ['Episode V', "C3P0"],
          ['Episode VI', "C3P0"],
        ]],
        ['Vader', [
          ['Episode IV', "Vader"],
          ['Episode V', "Vader"],
          ['Episode VI', "Vader"],
        ]],
        ['Tarkin', [
          ['Episode IV', "Tarkin"],
        ]],
        ['Lando', [
          ['Episode V', "Lando"],
          ['Episode VI', "Lando"],
        ]],
        ['Emperor', [
          ['Episode V', "Emperor"],
          ['Episode VI', "Emperor"],
        ]],
        ['Yoda', [
          ['Episode V', "Yoda"],
          ['Episode VI', "Yoda"],
        ]],
        ['Boba Fett', [
          ['Episode V', "Boba Fett"],
          ['Episode VI', "Boba Fett"],
        ]],
        ['Jabba', [
          ['Episode VI', "Jabba"],
        ]],
      ],
    ],
    [
      [
        ['Garfield', 'cat'],
        ['Tom', 'cat'],
        ['Felix', 'cat'],
        ['Heathcliff', 'cat'],
        ['Snoopy', 'dog'],
        ['Scooby-Doo', 'dog'],
        ['Odie', 'dog'],
        ['Donald', 'duck'],
        ['Daffy', 'duck'],
      ],
      (x: [string, string]) => x[1],
      undefined,
      [
        ['cat', [
          ['Garfield', 'cat'],
          ['Tom', 'cat'],
          ['Felix', 'cat'],
          ['Heathcliff', 'cat'],
        ]],
        ['dog', [
          ['Snoopy', 'dog'],
          ['Scooby-Doo', 'dog'],
          ['Odie', 'dog'],
        ]],
        ['duck', [
          ['Donald', 'duck'],
          ['Daffy', 'duck'],
        ]]
      ]
    ],
    [
      [
        {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        {name: 'Anonymous', interests: []},
      ],
      (x: Record<string, unknown>) => x.interests,
      undefined,
      [
        ['programming', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        ]],
        ['books', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        ]],
        ['slacking', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        ]],
        ['music', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        ]],
        ['math', [
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        ]],
        ['fantasy', [
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        ]],
        ['wine', [
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        ]],
      ],
    ],
    [
      [
        {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        {name: 'Anonymous', interests: []},
      ],
      (x: Record<string, unknown>) => x.interests,
      (x: Record<string, unknown>) => x.name,
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          Alice: {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        }],
        ['slacking', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          Alice: {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        }],
        ['math', {
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        }],
        ['fantasy', {
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          Alice: {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        }],
        ['wine', {
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        }],
      ],
    ],
    [
      [
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ],
      (x: Record<string, unknown>) => x.interests,
      undefined,
      [
        ['programming', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
        ]],
        ['books', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
          {name: 'Laura', interests: ['books', 'music', 'music']},
        ]],
        ['music', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
          {name: 'Laura', interests: ['books', 'music', 'music']},
        ]],
      ],
    ],
    [
      [
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ],
      (x: Record<string, unknown>) => x.interests,
      (x: Record<string, unknown>) => x.name,
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
      ],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<any>, (x: any) => any, ((x: any) => any) | undefined, Array<any>]> {
  return [
    [
      createGeneratorFixture([]),
      (x: number) => x % 2 ? 'odd' : 'even',
      undefined,
      [],
    ],
    [
      createGeneratorFixture([]),
      (x: number) => x % 2 ? 'odd' : 'even',
      (x: number) => `item${x}`,
      [],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (x: number) => x % 2 ? 'odd' : 'even',
      undefined,
      [
        ['odd', [1, 3, 5, 7, 9]],
        ['even', [2, 4, 6, 8]],
      ],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (x: number) => x % 2 ? 'odd' : 'even',
      (x: number) => `item${x}`,
      [
        ['odd', {item1: 1, item3: 3, item5: 5, item7: 7, item9: 9}],
        ['even', {item2: 2, item4: 4, item6: 6, item8: 8}],
      ],
    ],
    [
      createGeneratorFixture([['a', 1], ['a', 2], ['b', 3], ['b', 4], ['c', 5], ['a', 6], ['c', 7]]),
      (x: Array<[string, number]>) => x[0],
      undefined,
      [
        ['a', [['a', 1], ['a', 2], ['a', 6]]],
        ['b', [['b', 3], ['b', 4]]],
        ['c', [['c', 5], ['c', 7]]],
      ],
    ],
    [
      createGeneratorFixture([['a', 1], ['a', 2], ['b', 3], ['b', 4], ['c', 5], ['a', 6], ['c', 7]]),
      (x: Array<[string, number]>) => x[0],
      (x: Array<[string, number]>) => x[1],
      [
        ['a', {1: ['a', 1], 2: ['a', 2], 6: ['a', 6]}],
        ['b', {3: ['b', 3], 4: ['b', 4]}],
        ['c', {5: ['c', 5], 7: ['c', 7]}],
      ],
    ],
    [
      createGeneratorFixture([['a', 1], ['a', 2], ['b', 3], ['b', 4], ['c', 5], ['a', 6], ['c', 7]]),
      (x: Array<[string, number]>) => x[1],
      undefined,
      [
        [1, [['a', 1]]],
        [2, [['a', 2]]],
        [3, [['b', 3]]],
        [4, [['b', 4]]],
        [5, [['c', 5]]],
        [6, [['a', 6]]],
        [7, [['c', 7]]],
      ],
    ],
    [
      createGeneratorFixture([[1, 'a'], [2, 'a'], [3, 'b'], [4, 'b'], [5, 'c'], [6, 'a'], [7, 'c']]),
      (x: Array<[string, number]>) => x[1],
      undefined,
      [
        ['a', [[1, 'a'], [2, 'a'], [6, 'a']]],
        ['b', [[3, 'b'], [4, 'b']]],
        ['c', [[5, 'c'], [7, 'c']]],
      ],
    ],
    [
      createGeneratorFixture([[1, 'a'], [2, 'a'], [3, 'b'], [4, 'b'], [5, 'c'], [6, 'a'], [7, 'c']]),
      (x: Array<[string, number]>) => x[0],
      undefined,
      [
        [1, [[1, 'a']]],
        [2, [[2, 'a']]],
        [3, [[3, 'b']]],
        [4, [[4, 'b']]],
        [5, [[5, 'c']]],
        [6, [[6, 'a']]],
        [7, [[7, 'c']]],
      ],
    ],
    [
      createGeneratorFixture([
        ['Episode IV', "Luke"],
        ['Episode IV', "Leia"],
        ['Episode IV', "Chewie"],
        ['Episode IV', "Han"],
        ['Episode IV', "Obi-wan"],
        ['Episode IV', "R2-D2"],
        ['Episode IV', "C3P0"],
        ['Episode IV', "Vader"],
        ['Episode IV', "Tarkin"],
        ['Episode V', "Luke"],
        ['Episode V', "Leia"],
        ['Episode V', "Chewie"],
        ['Episode V', "Han"],
        ['Episode V', "Obi-wan"],
        ['Episode V', "R2-D2"],
        ['Episode V', "C3P0"],
        ['Episode V', "Lando"],
        ['Episode V', "Han"],
        ['Episode V', "Vader"],
        ['Episode V', "Emperor"],
        ['Episode V', "Yoda"],
        ['Episode V', "Boba Fett"],
        ['Episode VI', "Luke"],
        ['Episode VI', "Leia"],
        ['Episode VI', "Chewie"],
        ['Episode VI', "Han"],
        ['Episode VI', "Obi-wan"],
        ['Episode VI', "R2-D2"],
        ['Episode VI', "C3P0"],
        ['Episode VI', "Lando"],
        ['Episode VI', "Han"],
        ['Episode VI', "Vader"],
        ['Episode VI', "Emperor"],
        ['Episode VI', "Yoda"],
        ['Episode VI', "Boba Fett"],
        ['Episode VI', "Jabba"],
      ]),
      (x: [string, string]) => x[0],
      undefined,
      [
        ['Episode IV', [
          ['Episode IV', "Luke"],
          ['Episode IV', "Leia"],
          ['Episode IV', "Chewie"],
          ['Episode IV', "Han"],
          ['Episode IV', "Obi-wan"],
          ['Episode IV', "R2-D2"],
          ['Episode IV', "C3P0"],
          ['Episode IV', "Vader"],
          ['Episode IV', "Tarkin"],
        ]],
        ['Episode V', [
          ['Episode V', "Luke"],
          ['Episode V', "Leia"],
          ['Episode V', "Chewie"],
          ['Episode V', "Han"],
          ['Episode V', "Obi-wan"],
          ['Episode V', "R2-D2"],
          ['Episode V', "C3P0"],
          ['Episode V', "Lando"],
          ['Episode V', "Han"],
          ['Episode V', "Vader"],
          ['Episode V', "Emperor"],
          ['Episode V', "Yoda"],
          ['Episode V', "Boba Fett"],
        ]],
        ['Episode VI', [
          ['Episode VI', "Luke"],
          ['Episode VI', "Leia"],
          ['Episode VI', "Chewie"],
          ['Episode VI', "Han"],
          ['Episode VI', "Obi-wan"],
          ['Episode VI', "R2-D2"],
          ['Episode VI', "C3P0"],
          ['Episode VI', "Lando"],
          ['Episode VI', "Han"],
          ['Episode VI', "Vader"],
          ['Episode VI', "Emperor"],
          ['Episode VI', "Yoda"],
          ['Episode VI', "Boba Fett"],
          ['Episode VI', "Jabba"],
        ]]
      ],
    ],
    [
      createGeneratorFixture([
        ['Episode IV', "Luke"],
        ['Episode IV', "Leia"],
        ['Episode IV', "Chewie"],
        ['Episode IV', "Han"],
        ['Episode IV', "Obi-wan"],
        ['Episode IV', "R2-D2"],
        ['Episode IV', "C3P0"],
        ['Episode IV', "Vader"],
        ['Episode IV', "Tarkin"],
        ['Episode V', "Luke"],
        ['Episode V', "Leia"],
        ['Episode V', "Chewie"],
        ['Episode V', "Han"],
        ['Episode V', "Obi-wan"],
        ['Episode V', "R2-D2"],
        ['Episode V', "C3P0"],
        ['Episode V', "Lando"],
        ['Episode V', "Vader"],
        ['Episode V', "Emperor"],
        ['Episode V', "Yoda"],
        ['Episode V', "Boba Fett"],
        ['Episode VI', "Luke"],
        ['Episode VI', "Leia"],
        ['Episode VI', "Chewie"],
        ['Episode VI', "Han"],
        ['Episode VI', "Obi-wan"],
        ['Episode VI', "R2-D2"],
        ['Episode VI', "C3P0"],
        ['Episode VI', "Lando"],
        ['Episode VI', "Vader"],
        ['Episode VI', "Emperor"],
        ['Episode VI', "Yoda"],
        ['Episode VI', "Boba Fett"],
        ['Episode VI', "Jabba"],
      ]),
      (x: [string, string]) => x[1],
      undefined,
      [
        ['Luke', [
          ['Episode IV', "Luke"],
          ['Episode V', "Luke"],
          ['Episode VI', "Luke"],
        ]],
        ['Leia', [
          ['Episode IV', "Leia"],
          ['Episode V', "Leia"],
          ['Episode VI', "Leia"],
        ]],
        ['Chewie', [
          ['Episode IV', "Chewie"],
          ['Episode V', "Chewie"],
          ['Episode VI', "Chewie"],
        ]],
        ['Han', [
          ['Episode IV', "Han"],
          ['Episode V', "Han"],
          ['Episode VI', "Han"],
        ]],
        ['Obi-wan', [
          ['Episode IV', "Obi-wan"],
          ['Episode V', "Obi-wan"],
          ['Episode VI', "Obi-wan"],
        ]],
        ['R2-D2', [
          ['Episode IV', "R2-D2"],
          ['Episode V', "R2-D2"],
          ['Episode VI', "R2-D2"],
        ]],
        ['C3P0', [
          ['Episode IV', "C3P0"],
          ['Episode V', "C3P0"],
          ['Episode VI', "C3P0"],
        ]],
        ['Vader', [
          ['Episode IV', "Vader"],
          ['Episode V', "Vader"],
          ['Episode VI', "Vader"],
        ]],
        ['Tarkin', [
          ['Episode IV', "Tarkin"],
        ]],
        ['Lando', [
          ['Episode V', "Lando"],
          ['Episode VI', "Lando"],
        ]],
        ['Emperor', [
          ['Episode V', "Emperor"],
          ['Episode VI', "Emperor"],
        ]],
        ['Yoda', [
          ['Episode V', "Yoda"],
          ['Episode VI', "Yoda"],
        ]],
        ['Boba Fett', [
          ['Episode V', "Boba Fett"],
          ['Episode VI', "Boba Fett"],
        ]],
        ['Jabba', [
          ['Episode VI', "Jabba"],
        ]],
      ],
    ],
    [
      createGeneratorFixture([
        ['Garfield', 'cat'],
        ['Tom', 'cat'],
        ['Felix', 'cat'],
        ['Heathcliff', 'cat'],
        ['Snoopy', 'dog'],
        ['Scooby-Doo', 'dog'],
        ['Odie', 'dog'],
        ['Donald', 'duck'],
        ['Daffy', 'duck'],
      ]),
      (x: [string, string]) => x[1],
      undefined,
      [
        ['cat', [
          ['Garfield', 'cat'],
          ['Tom', 'cat'],
          ['Felix', 'cat'],
          ['Heathcliff', 'cat'],
        ]],
        ['dog', [
          ['Snoopy', 'dog'],
          ['Scooby-Doo', 'dog'],
          ['Odie', 'dog'],
        ]],
        ['duck', [
          ['Donald', 'duck'],
          ['Daffy', 'duck'],
        ]]
      ]
    ],
    [
      createGeneratorFixture([
        {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        {name: 'Anonymous', interests: []},
      ]),
      (x: Record<string, unknown>) => x.interests,
      undefined,
      [
        ['programming', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        ]],
        ['books', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        ]],
        ['slacking', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        ]],
        ['music', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        ]],
        ['math', [
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        ]],
        ['fantasy', [
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        ]],
        ['wine', [
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        ]],
      ],
    ],
    [
      createGeneratorFixture([
        {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        {name: 'Anonymous', interests: []},
      ]),
      (x: Record<string, unknown>) => x.interests,
      (x: Record<string, unknown>) => x.name,
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          Alice: {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        }],
        ['slacking', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          Alice: {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        }],
        ['math', {
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        }],
        ['fantasy', {
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          Alice: {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        }],
        ['wine', {
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        }],
      ],
    ],
    [
      createGeneratorFixture([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      (x: Record<string, unknown>) => x.interests,
      undefined,
      [
        ['programming', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
        ]],
        ['books', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
          {name: 'Laura', interests: ['books', 'music', 'music']},
        ]],
        ['music', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
          {name: 'Laura', interests: ['books', 'music', 'music']},
        ]],
      ],
    ],
    [
      createGeneratorFixture([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      (x: Record<string, unknown>) => x.interests,
      (x: Record<string, unknown>) => x.name,
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
      ],
    ],
  ];
}

function dataProviderForIterables(): Array<[Iterable<any>, (x: any) => any, ((x: any) => any) | undefined, Array<any>]> {
  return [
    [
      createIterableFixture([]),
      (x: number) => x % 2 ? 'odd' : 'even',
      undefined,
      [],
    ],
    [
      createIterableFixture([]),
      (x: number) => x % 2 ? 'odd' : 'even',
      (x: number) => `item${x}`,
      [],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (x: number) => x % 2 ? 'odd' : 'even',
      undefined,
      [
        ['odd', [1, 3, 5, 7, 9]],
        ['even', [2, 4, 6, 8]],
      ],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (x: number) => x % 2 ? 'odd' : 'even',
      (x: number) => `item${x}`,
      [
        ['odd', {item1: 1, item3: 3, item5: 5, item7: 7, item9: 9}],
        ['even', {item2: 2, item4: 4, item6: 6, item8: 8}],
      ],
    ],
    [
      createIterableFixture([['a', 1], ['a', 2], ['b', 3], ['b', 4], ['c', 5], ['a', 6], ['c', 7]]),
      (x: Array<[string, number]>) => x[0],
      undefined,
      [
        ['a', [['a', 1], ['a', 2], ['a', 6]]],
        ['b', [['b', 3], ['b', 4]]],
        ['c', [['c', 5], ['c', 7]]],
      ],
    ],
    [
      createIterableFixture([['a', 1], ['a', 2], ['b', 3], ['b', 4], ['c', 5], ['a', 6], ['c', 7]]),
      (x: Array<[string, number]>) => x[0],
      (x: Array<[string, number]>) => x[1],
      [
        ['a', {1: ['a', 1], 2: ['a', 2], 6: ['a', 6]}],
        ['b', {3: ['b', 3], 4: ['b', 4]}],
        ['c', {5: ['c', 5], 7: ['c', 7]}],
      ],
    ],
    [
      createIterableFixture([['a', 1], ['a', 2], ['b', 3], ['b', 4], ['c', 5], ['a', 6], ['c', 7]]),
      (x: Array<[string, number]>) => x[1],
      undefined,
      [
        [1, [['a', 1]]],
        [2, [['a', 2]]],
        [3, [['b', 3]]],
        [4, [['b', 4]]],
        [5, [['c', 5]]],
        [6, [['a', 6]]],
        [7, [['c', 7]]],
      ],
    ],
    [
      createIterableFixture([[1, 'a'], [2, 'a'], [3, 'b'], [4, 'b'], [5, 'c'], [6, 'a'], [7, 'c']]),
      (x: Array<[string, number]>) => x[1],
      undefined,
      [
        ['a', [[1, 'a'], [2, 'a'], [6, 'a']]],
        ['b', [[3, 'b'], [4, 'b']]],
        ['c', [[5, 'c'], [7, 'c']]],
      ],
    ],
    [
      createIterableFixture([[1, 'a'], [2, 'a'], [3, 'b'], [4, 'b'], [5, 'c'], [6, 'a'], [7, 'c']]),
      (x: Array<[string, number]>) => x[0],
      undefined,
      [
        [1, [[1, 'a']]],
        [2, [[2, 'a']]],
        [3, [[3, 'b']]],
        [4, [[4, 'b']]],
        [5, [[5, 'c']]],
        [6, [[6, 'a']]],
        [7, [[7, 'c']]],
      ],
    ],
    [
      createIterableFixture([
        ['Episode IV', "Luke"],
        ['Episode IV', "Leia"],
        ['Episode IV', "Chewie"],
        ['Episode IV', "Han"],
        ['Episode IV', "Obi-wan"],
        ['Episode IV', "R2-D2"],
        ['Episode IV', "C3P0"],
        ['Episode IV', "Vader"],
        ['Episode IV', "Tarkin"],
        ['Episode V', "Luke"],
        ['Episode V', "Leia"],
        ['Episode V', "Chewie"],
        ['Episode V', "Han"],
        ['Episode V', "Obi-wan"],
        ['Episode V', "R2-D2"],
        ['Episode V', "C3P0"],
        ['Episode V', "Lando"],
        ['Episode V', "Han"],
        ['Episode V', "Vader"],
        ['Episode V', "Emperor"],
        ['Episode V', "Yoda"],
        ['Episode V', "Boba Fett"],
        ['Episode VI', "Luke"],
        ['Episode VI', "Leia"],
        ['Episode VI', "Chewie"],
        ['Episode VI', "Han"],
        ['Episode VI', "Obi-wan"],
        ['Episode VI', "R2-D2"],
        ['Episode VI', "C3P0"],
        ['Episode VI', "Lando"],
        ['Episode VI', "Han"],
        ['Episode VI', "Vader"],
        ['Episode VI', "Emperor"],
        ['Episode VI', "Yoda"],
        ['Episode VI', "Boba Fett"],
        ['Episode VI', "Jabba"],
      ]),
      (x: [string, string]) => x[0],
      undefined,
      [
        ['Episode IV', [
          ['Episode IV', "Luke"],
          ['Episode IV', "Leia"],
          ['Episode IV', "Chewie"],
          ['Episode IV', "Han"],
          ['Episode IV', "Obi-wan"],
          ['Episode IV', "R2-D2"],
          ['Episode IV', "C3P0"],
          ['Episode IV', "Vader"],
          ['Episode IV', "Tarkin"],
        ]],
        ['Episode V', [
          ['Episode V', "Luke"],
          ['Episode V', "Leia"],
          ['Episode V', "Chewie"],
          ['Episode V', "Han"],
          ['Episode V', "Obi-wan"],
          ['Episode V', "R2-D2"],
          ['Episode V', "C3P0"],
          ['Episode V', "Lando"],
          ['Episode V', "Han"],
          ['Episode V', "Vader"],
          ['Episode V', "Emperor"],
          ['Episode V', "Yoda"],
          ['Episode V', "Boba Fett"],
        ]],
        ['Episode VI', [
          ['Episode VI', "Luke"],
          ['Episode VI', "Leia"],
          ['Episode VI', "Chewie"],
          ['Episode VI', "Han"],
          ['Episode VI', "Obi-wan"],
          ['Episode VI', "R2-D2"],
          ['Episode VI', "C3P0"],
          ['Episode VI', "Lando"],
          ['Episode VI', "Han"],
          ['Episode VI', "Vader"],
          ['Episode VI', "Emperor"],
          ['Episode VI', "Yoda"],
          ['Episode VI', "Boba Fett"],
          ['Episode VI', "Jabba"],
        ]]
      ],
    ],
    [
      createIterableFixture([
        ['Episode IV', "Luke"],
        ['Episode IV', "Leia"],
        ['Episode IV', "Chewie"],
        ['Episode IV', "Han"],
        ['Episode IV', "Obi-wan"],
        ['Episode IV', "R2-D2"],
        ['Episode IV', "C3P0"],
        ['Episode IV', "Vader"],
        ['Episode IV', "Tarkin"],
        ['Episode V', "Luke"],
        ['Episode V', "Leia"],
        ['Episode V', "Chewie"],
        ['Episode V', "Han"],
        ['Episode V', "Obi-wan"],
        ['Episode V', "R2-D2"],
        ['Episode V', "C3P0"],
        ['Episode V', "Lando"],
        ['Episode V', "Vader"],
        ['Episode V', "Emperor"],
        ['Episode V', "Yoda"],
        ['Episode V', "Boba Fett"],
        ['Episode VI', "Luke"],
        ['Episode VI', "Leia"],
        ['Episode VI', "Chewie"],
        ['Episode VI', "Han"],
        ['Episode VI', "Obi-wan"],
        ['Episode VI', "R2-D2"],
        ['Episode VI', "C3P0"],
        ['Episode VI', "Lando"],
        ['Episode VI', "Vader"],
        ['Episode VI', "Emperor"],
        ['Episode VI', "Yoda"],
        ['Episode VI', "Boba Fett"],
        ['Episode VI', "Jabba"],
      ]),
      (x: [string, string]) => x[1],
      undefined,
      [
        ['Luke', [
          ['Episode IV', "Luke"],
          ['Episode V', "Luke"],
          ['Episode VI', "Luke"],
        ]],
        ['Leia', [
          ['Episode IV', "Leia"],
          ['Episode V', "Leia"],
          ['Episode VI', "Leia"],
        ]],
        ['Chewie', [
          ['Episode IV', "Chewie"],
          ['Episode V', "Chewie"],
          ['Episode VI', "Chewie"],
        ]],
        ['Han', [
          ['Episode IV', "Han"],
          ['Episode V', "Han"],
          ['Episode VI', "Han"],
        ]],
        ['Obi-wan', [
          ['Episode IV', "Obi-wan"],
          ['Episode V', "Obi-wan"],
          ['Episode VI', "Obi-wan"],
        ]],
        ['R2-D2', [
          ['Episode IV', "R2-D2"],
          ['Episode V', "R2-D2"],
          ['Episode VI', "R2-D2"],
        ]],
        ['C3P0', [
          ['Episode IV', "C3P0"],
          ['Episode V', "C3P0"],
          ['Episode VI', "C3P0"],
        ]],
        ['Vader', [
          ['Episode IV', "Vader"],
          ['Episode V', "Vader"],
          ['Episode VI', "Vader"],
        ]],
        ['Tarkin', [
          ['Episode IV', "Tarkin"],
        ]],
        ['Lando', [
          ['Episode V', "Lando"],
          ['Episode VI', "Lando"],
        ]],
        ['Emperor', [
          ['Episode V', "Emperor"],
          ['Episode VI', "Emperor"],
        ]],
        ['Yoda', [
          ['Episode V', "Yoda"],
          ['Episode VI', "Yoda"],
        ]],
        ['Boba Fett', [
          ['Episode V', "Boba Fett"],
          ['Episode VI', "Boba Fett"],
        ]],
        ['Jabba', [
          ['Episode VI', "Jabba"],
        ]],
      ],
    ],
    [
      createIterableFixture([
        ['Garfield', 'cat'],
        ['Tom', 'cat'],
        ['Felix', 'cat'],
        ['Heathcliff', 'cat'],
        ['Snoopy', 'dog'],
        ['Scooby-Doo', 'dog'],
        ['Odie', 'dog'],
        ['Donald', 'duck'],
        ['Daffy', 'duck'],
      ]),
      (x: [string, string]) => x[1],
      undefined,
      [
        ['cat', [
          ['Garfield', 'cat'],
          ['Tom', 'cat'],
          ['Felix', 'cat'],
          ['Heathcliff', 'cat'],
        ]],
        ['dog', [
          ['Snoopy', 'dog'],
          ['Scooby-Doo', 'dog'],
          ['Odie', 'dog'],
        ]],
        ['duck', [
          ['Donald', 'duck'],
          ['Daffy', 'duck'],
        ]]
      ]
    ],
    [
      createIterableFixture([
        {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        {name: 'Anonymous', interests: []},
      ]),
      (x: Record<string, unknown>) => x.interests,
      undefined,
      [
        ['programming', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        ]],
        ['books', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        ]],
        ['slacking', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        ]],
        ['music', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        ]],
        ['math', [
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        ]],
        ['fantasy', [
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        ]],
        ['wine', [
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        ]],
      ],
    ],
    [
      createIterableFixture([
        {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        {name: 'Anonymous', interests: []},
      ]),
      (x: Record<string, unknown>) => x.interests,
      (x: Record<string, unknown>) => x.name,
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          Alice: {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        }],
        ['slacking', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          Alice: {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        }],
        ['math', {
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        }],
        ['fantasy', {
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          Alice: {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        }],
        ['wine', {
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        }],
      ],
    ],
    [
      createIterableFixture([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      (x: Record<string, unknown>) => x.interests,
      undefined,
      [
        ['programming', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
        ]],
        ['books', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
          {name: 'Laura', interests: ['books', 'music', 'music']},
        ]],
        ['music', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
          {name: 'Laura', interests: ['books', 'music', 'music']},
        ]],
      ],
    ],
    [
      createIterableFixture([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      (x: Record<string, unknown>) => x.interests,
      (x: Record<string, unknown>) => x.name,
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
      ],
    ],
  ];
}

function dataProviderForIterators(): Array<[Iterator<any>, (x: any) => any, ((x: any) => any) | undefined, Array<any>]> {
  return [
    [
      createIteratorFixture([]),
      (x: number) => x % 2 ? 'odd' : 'even',
      undefined,
      [],
    ],
    [
      createIteratorFixture([]),
      (x: number) => x % 2 ? 'odd' : 'even',
      (x: number) => `item${x}`,
      [],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (x: number) => x % 2 ? 'odd' : 'even',
      undefined,
      [
        ['odd', [1, 3, 5, 7, 9]],
        ['even', [2, 4, 6, 8]],
      ],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (x: number) => x % 2 ? 'odd' : 'even',
      (x: number) => `item${x}`,
      [
        ['odd', {item1: 1, item3: 3, item5: 5, item7: 7, item9: 9}],
        ['even', {item2: 2, item4: 4, item6: 6, item8: 8}],
      ],
    ],
    [
      createIteratorFixture([['a', 1], ['a', 2], ['b', 3], ['b', 4], ['c', 5], ['a', 6], ['c', 7]]),
      (x: Array<[string, number]>) => x[0],
      undefined,
      [
        ['a', [['a', 1], ['a', 2], ['a', 6]]],
        ['b', [['b', 3], ['b', 4]]],
        ['c', [['c', 5], ['c', 7]]],
      ],
    ],
    [
      createIteratorFixture([['a', 1], ['a', 2], ['b', 3], ['b', 4], ['c', 5], ['a', 6], ['c', 7]]),
      (x: Array<[string, number]>) => x[0],
      (x: Array<[string, number]>) => x[1],
      [
        ['a', {1: ['a', 1], 2: ['a', 2], 6: ['a', 6]}],
        ['b', {3: ['b', 3], 4: ['b', 4]}],
        ['c', {5: ['c', 5], 7: ['c', 7]}],
      ],
    ],
    [
      createIteratorFixture([['a', 1], ['a', 2], ['b', 3], ['b', 4], ['c', 5], ['a', 6], ['c', 7]]),
      (x: Array<[string, number]>) => x[1],
      undefined,
      [
        [1, [['a', 1]]],
        [2, [['a', 2]]],
        [3, [['b', 3]]],
        [4, [['b', 4]]],
        [5, [['c', 5]]],
        [6, [['a', 6]]],
        [7, [['c', 7]]],
      ],
    ],
    [
      createIteratorFixture([[1, 'a'], [2, 'a'], [3, 'b'], [4, 'b'], [5, 'c'], [6, 'a'], [7, 'c']]),
      (x: Array<[string, number]>) => x[1],
      undefined,
      [
        ['a', [[1, 'a'], [2, 'a'], [6, 'a']]],
        ['b', [[3, 'b'], [4, 'b']]],
        ['c', [[5, 'c'], [7, 'c']]],
      ],
    ],
    [
      createIteratorFixture([[1, 'a'], [2, 'a'], [3, 'b'], [4, 'b'], [5, 'c'], [6, 'a'], [7, 'c']]),
      (x: Array<[string, number]>) => x[0],
      undefined,
      [
        [1, [[1, 'a']]],
        [2, [[2, 'a']]],
        [3, [[3, 'b']]],
        [4, [[4, 'b']]],
        [5, [[5, 'c']]],
        [6, [[6, 'a']]],
        [7, [[7, 'c']]],
      ],
    ],
    [
      createIteratorFixture([
        ['Episode IV', "Luke"],
        ['Episode IV', "Leia"],
        ['Episode IV', "Chewie"],
        ['Episode IV', "Han"],
        ['Episode IV', "Obi-wan"],
        ['Episode IV', "R2-D2"],
        ['Episode IV', "C3P0"],
        ['Episode IV', "Vader"],
        ['Episode IV', "Tarkin"],
        ['Episode V', "Luke"],
        ['Episode V', "Leia"],
        ['Episode V', "Chewie"],
        ['Episode V', "Han"],
        ['Episode V', "Obi-wan"],
        ['Episode V', "R2-D2"],
        ['Episode V', "C3P0"],
        ['Episode V', "Lando"],
        ['Episode V', "Han"],
        ['Episode V', "Vader"],
        ['Episode V', "Emperor"],
        ['Episode V', "Yoda"],
        ['Episode V', "Boba Fett"],
        ['Episode VI', "Luke"],
        ['Episode VI', "Leia"],
        ['Episode VI', "Chewie"],
        ['Episode VI', "Han"],
        ['Episode VI', "Obi-wan"],
        ['Episode VI', "R2-D2"],
        ['Episode VI', "C3P0"],
        ['Episode VI', "Lando"],
        ['Episode VI', "Han"],
        ['Episode VI', "Vader"],
        ['Episode VI', "Emperor"],
        ['Episode VI', "Yoda"],
        ['Episode VI', "Boba Fett"],
        ['Episode VI', "Jabba"],
      ]),
      (x: [string, string]) => x[0],
      undefined,
      [
        ['Episode IV', [
          ['Episode IV', "Luke"],
          ['Episode IV', "Leia"],
          ['Episode IV', "Chewie"],
          ['Episode IV', "Han"],
          ['Episode IV', "Obi-wan"],
          ['Episode IV', "R2-D2"],
          ['Episode IV', "C3P0"],
          ['Episode IV', "Vader"],
          ['Episode IV', "Tarkin"],
        ]],
        ['Episode V', [
          ['Episode V', "Luke"],
          ['Episode V', "Leia"],
          ['Episode V', "Chewie"],
          ['Episode V', "Han"],
          ['Episode V', "Obi-wan"],
          ['Episode V', "R2-D2"],
          ['Episode V', "C3P0"],
          ['Episode V', "Lando"],
          ['Episode V', "Han"],
          ['Episode V', "Vader"],
          ['Episode V', "Emperor"],
          ['Episode V', "Yoda"],
          ['Episode V', "Boba Fett"],
        ]],
        ['Episode VI', [
          ['Episode VI', "Luke"],
          ['Episode VI', "Leia"],
          ['Episode VI', "Chewie"],
          ['Episode VI', "Han"],
          ['Episode VI', "Obi-wan"],
          ['Episode VI', "R2-D2"],
          ['Episode VI', "C3P0"],
          ['Episode VI', "Lando"],
          ['Episode VI', "Han"],
          ['Episode VI', "Vader"],
          ['Episode VI', "Emperor"],
          ['Episode VI', "Yoda"],
          ['Episode VI', "Boba Fett"],
          ['Episode VI', "Jabba"],
        ]]
      ],
    ],
    [
      createIteratorFixture([
        ['Episode IV', "Luke"],
        ['Episode IV', "Leia"],
        ['Episode IV', "Chewie"],
        ['Episode IV', "Han"],
        ['Episode IV', "Obi-wan"],
        ['Episode IV', "R2-D2"],
        ['Episode IV', "C3P0"],
        ['Episode IV', "Vader"],
        ['Episode IV', "Tarkin"],
        ['Episode V', "Luke"],
        ['Episode V', "Leia"],
        ['Episode V', "Chewie"],
        ['Episode V', "Han"],
        ['Episode V', "Obi-wan"],
        ['Episode V', "R2-D2"],
        ['Episode V', "C3P0"],
        ['Episode V', "Lando"],
        ['Episode V', "Vader"],
        ['Episode V', "Emperor"],
        ['Episode V', "Yoda"],
        ['Episode V', "Boba Fett"],
        ['Episode VI', "Luke"],
        ['Episode VI', "Leia"],
        ['Episode VI', "Chewie"],
        ['Episode VI', "Han"],
        ['Episode VI', "Obi-wan"],
        ['Episode VI', "R2-D2"],
        ['Episode VI', "C3P0"],
        ['Episode VI', "Lando"],
        ['Episode VI', "Vader"],
        ['Episode VI', "Emperor"],
        ['Episode VI', "Yoda"],
        ['Episode VI', "Boba Fett"],
        ['Episode VI', "Jabba"],
      ]),
      (x: [string, string]) => x[1],
      undefined,
      [
        ['Luke', [
          ['Episode IV', "Luke"],
          ['Episode V', "Luke"],
          ['Episode VI', "Luke"],
        ]],
        ['Leia', [
          ['Episode IV', "Leia"],
          ['Episode V', "Leia"],
          ['Episode VI', "Leia"],
        ]],
        ['Chewie', [
          ['Episode IV', "Chewie"],
          ['Episode V', "Chewie"],
          ['Episode VI', "Chewie"],
        ]],
        ['Han', [
          ['Episode IV', "Han"],
          ['Episode V', "Han"],
          ['Episode VI', "Han"],
        ]],
        ['Obi-wan', [
          ['Episode IV', "Obi-wan"],
          ['Episode V', "Obi-wan"],
          ['Episode VI', "Obi-wan"],
        ]],
        ['R2-D2', [
          ['Episode IV', "R2-D2"],
          ['Episode V', "R2-D2"],
          ['Episode VI', "R2-D2"],
        ]],
        ['C3P0', [
          ['Episode IV', "C3P0"],
          ['Episode V', "C3P0"],
          ['Episode VI', "C3P0"],
        ]],
        ['Vader', [
          ['Episode IV', "Vader"],
          ['Episode V', "Vader"],
          ['Episode VI', "Vader"],
        ]],
        ['Tarkin', [
          ['Episode IV', "Tarkin"],
        ]],
        ['Lando', [
          ['Episode V', "Lando"],
          ['Episode VI', "Lando"],
        ]],
        ['Emperor', [
          ['Episode V', "Emperor"],
          ['Episode VI', "Emperor"],
        ]],
        ['Yoda', [
          ['Episode V', "Yoda"],
          ['Episode VI', "Yoda"],
        ]],
        ['Boba Fett', [
          ['Episode V', "Boba Fett"],
          ['Episode VI', "Boba Fett"],
        ]],
        ['Jabba', [
          ['Episode VI', "Jabba"],
        ]],
      ],
    ],
    [
      createIteratorFixture([
        ['Garfield', 'cat'],
        ['Tom', 'cat'],
        ['Felix', 'cat'],
        ['Heathcliff', 'cat'],
        ['Snoopy', 'dog'],
        ['Scooby-Doo', 'dog'],
        ['Odie', 'dog'],
        ['Donald', 'duck'],
        ['Daffy', 'duck'],
      ]),
      (x: [string, string]) => x[1],
      undefined,
      [
        ['cat', [
          ['Garfield', 'cat'],
          ['Tom', 'cat'],
          ['Felix', 'cat'],
          ['Heathcliff', 'cat'],
        ]],
        ['dog', [
          ['Snoopy', 'dog'],
          ['Scooby-Doo', 'dog'],
          ['Odie', 'dog'],
        ]],
        ['duck', [
          ['Donald', 'duck'],
          ['Daffy', 'duck'],
        ]]
      ]
    ],
    [
      createIteratorFixture([
        {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        {name: 'Anonymous', interests: []},
      ]),
      (x: Record<string, unknown>) => x.interests,
      undefined,
      [
        ['programming', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        ]],
        ['books', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        ]],
        ['slacking', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        ]],
        ['music', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        ]],
        ['math', [
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        ]],
        ['fantasy', [
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        ]],
        ['wine', [
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        ]],
      ],
    ],
    [
      createIteratorFixture([
        {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        {name: 'Anonymous', interests: []},
      ]),
      (x: Record<string, unknown>) => x.interests,
      (x: Record<string, unknown>) => x.name,
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          Alice: {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        }],
        ['slacking', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          Alice: {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        }],
        ['math', {
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        }],
        ['fantasy', {
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          Alice: {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        }],
        ['wine', {
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        }],
      ],
    ],
    [
      createIteratorFixture([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      (x: Record<string, unknown>) => x.interests,
      undefined,
      [
        ['programming', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
        ]],
        ['books', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
          {name: 'Laura', interests: ['books', 'music', 'music']},
        ]],
        ['music', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
          {name: 'Laura', interests: ['books', 'music', 'music']},
        ]],
      ],
    ],
    [
      createIteratorFixture([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      (x: Record<string, unknown>) => x.interests,
      (x: Record<string, unknown>) => x.name,
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
      ],
    ],
  ];
}

function dataProviderForStrings(): Array<[string, (x: any) => any, ((x: any) => any) | undefined, Array<any>]> {
  return [
    [
      '',
      (x: string) => Number(x) % 2 ? 'odd' : 'even',
      undefined,
      [],
    ],
    [
      '',
      (x: string) => Number(x) % 2 ? 'odd' : 'even',
      (x: string) => `item${x}`,
      [],
    ],
    [
      '123456789',
      (x: string) => Number(x) % 2 ? 'odd' : 'even',
      undefined,
      [
        ['odd', ['1', '3', '5', '7', '9']],
        ['even', ['2', '4', '6', '8']],
      ],
    ],
    [
      '123456789',
      (x: string) => Number(x) % 2 ? 'odd' : 'even',
      (x: string) => `item${x}`,
      [
        ['odd', {item1: '1', item3: '3', item5: '5', item7: '7', item9: '9'}],
        ['even', {item2: '2', item4: '4', item6: '6', item8: '8'}],
      ],
    ],
  ];
}

function dataProviderForSets(): Array<[Set<any>, (x: any) => any, ((x: any) => any) | undefined, Array<any>]> {
  return [
    [
      new Set([]),
      (x: number) => x % 2 ? 'odd' : 'even',
      undefined,
      [],
    ],
    [
      new Set([]),
      (x: number) => x % 2 ? 'odd' : 'even',
      (x: number) => `item${x}`,
      [],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (x: number) => x % 2 ? 'odd' : 'even',
      undefined,
      [
        ['odd', [1, 3, 5, 7, 9]],
        ['even', [2, 4, 6, 8]],
      ],
    ],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (x: number) => x % 2 ? 'odd' : 'even',
      (x: number) => `item${x}`,
      [
        ['odd', {item1: 1, item3: 3, item5: 5, item7: 7, item9: 9}],
        ['even', {item2: 2, item4: 4, item6: 6, item8: 8}],
      ],
    ],
    [
      new Set([['a', 1], ['a', 2], ['b', 3], ['b', 4], ['c', 5], ['a', 6], ['c', 7]]),
      (x: Array<[string, number]>) => x[0],
      undefined,
      [
        ['a', [['a', 1], ['a', 2], ['a', 6]]],
        ['b', [['b', 3], ['b', 4]]],
        ['c', [['c', 5], ['c', 7]]],
      ],
    ],
    [
      new Set([['a', 1], ['a', 2], ['b', 3], ['b', 4], ['c', 5], ['a', 6], ['c', 7]]),
      (x: Array<[string, number]>) => x[0],
      (x: Array<[string, number]>) => x[1],
      [
        ['a', {1: ['a', 1], 2: ['a', 2], 6: ['a', 6]}],
        ['b', {3: ['b', 3], 4: ['b', 4]}],
        ['c', {5: ['c', 5], 7: ['c', 7]}],
      ],
    ],
    [
      new Set([['a', 1], ['a', 2], ['b', 3], ['b', 4], ['c', 5], ['a', 6], ['c', 7]]),
      (x: Array<[string, number]>) => x[1],
      undefined,
      [
        [1, [['a', 1]]],
        [2, [['a', 2]]],
        [3, [['b', 3]]],
        [4, [['b', 4]]],
        [5, [['c', 5]]],
        [6, [['a', 6]]],
        [7, [['c', 7]]],
      ],
    ],
    [
      new Set([[1, 'a'], [2, 'a'], [3, 'b'], [4, 'b'], [5, 'c'], [6, 'a'], [7, 'c']]),
      (x: Array<[string, number]>) => x[1],
      undefined,
      [
        ['a', [[1, 'a'], [2, 'a'], [6, 'a']]],
        ['b', [[3, 'b'], [4, 'b']]],
        ['c', [[5, 'c'], [7, 'c']]],
      ],
    ],
    [
      new Set([[1, 'a'], [2, 'a'], [3, 'b'], [4, 'b'], [5, 'c'], [6, 'a'], [7, 'c']]),
      (x: Array<[string, number]>) => x[0],
      undefined,
      [
        [1, [[1, 'a']]],
        [2, [[2, 'a']]],
        [3, [[3, 'b']]],
        [4, [[4, 'b']]],
        [5, [[5, 'c']]],
        [6, [[6, 'a']]],
        [7, [[7, 'c']]],
      ],
    ],
    [
      new Set([
        ['Episode IV', "Luke"],
        ['Episode IV', "Leia"],
        ['Episode IV', "Chewie"],
        ['Episode IV', "Han"],
        ['Episode IV', "Obi-wan"],
        ['Episode IV', "R2-D2"],
        ['Episode IV', "C3P0"],
        ['Episode IV', "Vader"],
        ['Episode IV', "Tarkin"],
        ['Episode V', "Luke"],
        ['Episode V', "Leia"],
        ['Episode V', "Chewie"],
        ['Episode V', "Han"],
        ['Episode V', "Obi-wan"],
        ['Episode V', "R2-D2"],
        ['Episode V', "C3P0"],
        ['Episode V', "Lando"],
        ['Episode V', "Han"],
        ['Episode V', "Vader"],
        ['Episode V', "Emperor"],
        ['Episode V', "Yoda"],
        ['Episode V', "Boba Fett"],
        ['Episode VI', "Luke"],
        ['Episode VI', "Leia"],
        ['Episode VI', "Chewie"],
        ['Episode VI', "Han"],
        ['Episode VI', "Obi-wan"],
        ['Episode VI', "R2-D2"],
        ['Episode VI', "C3P0"],
        ['Episode VI', "Lando"],
        ['Episode VI', "Han"],
        ['Episode VI', "Vader"],
        ['Episode VI', "Emperor"],
        ['Episode VI', "Yoda"],
        ['Episode VI', "Boba Fett"],
        ['Episode VI', "Jabba"],
      ]),
      (x: [string, string]) => x[0],
      undefined,
      [
        ['Episode IV', [
          ['Episode IV', "Luke"],
          ['Episode IV', "Leia"],
          ['Episode IV', "Chewie"],
          ['Episode IV', "Han"],
          ['Episode IV', "Obi-wan"],
          ['Episode IV', "R2-D2"],
          ['Episode IV', "C3P0"],
          ['Episode IV', "Vader"],
          ['Episode IV', "Tarkin"],
        ]],
        ['Episode V', [
          ['Episode V', "Luke"],
          ['Episode V', "Leia"],
          ['Episode V', "Chewie"],
          ['Episode V', "Han"],
          ['Episode V', "Obi-wan"],
          ['Episode V', "R2-D2"],
          ['Episode V', "C3P0"],
          ['Episode V', "Lando"],
          ['Episode V', "Han"],
          ['Episode V', "Vader"],
          ['Episode V', "Emperor"],
          ['Episode V', "Yoda"],
          ['Episode V', "Boba Fett"],
        ]],
        ['Episode VI', [
          ['Episode VI', "Luke"],
          ['Episode VI', "Leia"],
          ['Episode VI', "Chewie"],
          ['Episode VI', "Han"],
          ['Episode VI', "Obi-wan"],
          ['Episode VI', "R2-D2"],
          ['Episode VI', "C3P0"],
          ['Episode VI', "Lando"],
          ['Episode VI', "Han"],
          ['Episode VI', "Vader"],
          ['Episode VI', "Emperor"],
          ['Episode VI', "Yoda"],
          ['Episode VI', "Boba Fett"],
          ['Episode VI', "Jabba"],
        ]]
      ],
    ],
    [
      new Set([
        ['Episode IV', "Luke"],
        ['Episode IV', "Leia"],
        ['Episode IV', "Chewie"],
        ['Episode IV', "Han"],
        ['Episode IV', "Obi-wan"],
        ['Episode IV', "R2-D2"],
        ['Episode IV', "C3P0"],
        ['Episode IV', "Vader"],
        ['Episode IV', "Tarkin"],
        ['Episode V', "Luke"],
        ['Episode V', "Leia"],
        ['Episode V', "Chewie"],
        ['Episode V', "Han"],
        ['Episode V', "Obi-wan"],
        ['Episode V', "R2-D2"],
        ['Episode V', "C3P0"],
        ['Episode V', "Lando"],
        ['Episode V', "Vader"],
        ['Episode V', "Emperor"],
        ['Episode V', "Yoda"],
        ['Episode V', "Boba Fett"],
        ['Episode VI', "Luke"],
        ['Episode VI', "Leia"],
        ['Episode VI', "Chewie"],
        ['Episode VI', "Han"],
        ['Episode VI', "Obi-wan"],
        ['Episode VI', "R2-D2"],
        ['Episode VI', "C3P0"],
        ['Episode VI', "Lando"],
        ['Episode VI', "Vader"],
        ['Episode VI', "Emperor"],
        ['Episode VI', "Yoda"],
        ['Episode VI', "Boba Fett"],
        ['Episode VI', "Jabba"],
      ]),
      (x: [string, string]) => x[1],
      undefined,
      [
        ['Luke', [
          ['Episode IV', "Luke"],
          ['Episode V', "Luke"],
          ['Episode VI', "Luke"],
        ]],
        ['Leia', [
          ['Episode IV', "Leia"],
          ['Episode V', "Leia"],
          ['Episode VI', "Leia"],
        ]],
        ['Chewie', [
          ['Episode IV', "Chewie"],
          ['Episode V', "Chewie"],
          ['Episode VI', "Chewie"],
        ]],
        ['Han', [
          ['Episode IV', "Han"],
          ['Episode V', "Han"],
          ['Episode VI', "Han"],
        ]],
        ['Obi-wan', [
          ['Episode IV', "Obi-wan"],
          ['Episode V', "Obi-wan"],
          ['Episode VI', "Obi-wan"],
        ]],
        ['R2-D2', [
          ['Episode IV', "R2-D2"],
          ['Episode V', "R2-D2"],
          ['Episode VI', "R2-D2"],
        ]],
        ['C3P0', [
          ['Episode IV', "C3P0"],
          ['Episode V', "C3P0"],
          ['Episode VI', "C3P0"],
        ]],
        ['Vader', [
          ['Episode IV', "Vader"],
          ['Episode V', "Vader"],
          ['Episode VI', "Vader"],
        ]],
        ['Tarkin', [
          ['Episode IV', "Tarkin"],
        ]],
        ['Lando', [
          ['Episode V', "Lando"],
          ['Episode VI', "Lando"],
        ]],
        ['Emperor', [
          ['Episode V', "Emperor"],
          ['Episode VI', "Emperor"],
        ]],
        ['Yoda', [
          ['Episode V', "Yoda"],
          ['Episode VI', "Yoda"],
        ]],
        ['Boba Fett', [
          ['Episode V', "Boba Fett"],
          ['Episode VI', "Boba Fett"],
        ]],
        ['Jabba', [
          ['Episode VI', "Jabba"],
        ]],
      ],
    ],
    [
      new Set([
        ['Garfield', 'cat'],
        ['Tom', 'cat'],
        ['Felix', 'cat'],
        ['Heathcliff', 'cat'],
        ['Snoopy', 'dog'],
        ['Scooby-Doo', 'dog'],
        ['Odie', 'dog'],
        ['Donald', 'duck'],
        ['Daffy', 'duck'],
      ]),
      (x: [string, string]) => x[1],
      undefined,
      [
        ['cat', [
          ['Garfield', 'cat'],
          ['Tom', 'cat'],
          ['Felix', 'cat'],
          ['Heathcliff', 'cat'],
        ]],
        ['dog', [
          ['Snoopy', 'dog'],
          ['Scooby-Doo', 'dog'],
          ['Odie', 'dog'],
        ]],
        ['duck', [
          ['Donald', 'duck'],
          ['Daffy', 'duck'],
        ]]
      ]
    ],
    [
      new Set([
        {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        {name: 'Anonymous', interests: []},
      ]),
      (x: Record<string, unknown>) => x.interests,
      undefined,
      [
        ['programming', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        ]],
        ['books', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        ]],
        ['slacking', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        ]],
        ['music', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        ]],
        ['math', [
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        ]],
        ['fantasy', [
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        ]],
        ['wine', [
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        ]],
      ],
    ],
    [
      new Set([
        {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        {name: 'Anonymous', interests: []},
      ]),
      (x: Record<string, unknown>) => x.interests,
      (x: Record<string, unknown>) => x.name,
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          Alice: {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        }],
        ['slacking', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          Alice: {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        }],
        ['math', {
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        }],
        ['fantasy', {
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          Alice: {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        }],
        ['wine', {
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        }],
      ],
    ],
    [
      new Set([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      (x: Record<string, unknown>) => x.interests,
      undefined,
      [
        ['programming', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
        ]],
        ['books', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
          {name: 'Laura', interests: ['books', 'music', 'music']},
        ]],
        ['music', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
          {name: 'Laura', interests: ['books', 'music', 'music']},
        ]],
      ],
    ],
    [
      new Set([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      (x: Record<string, unknown>) => x.interests,
      (x: Record<string, unknown>) => x.name,
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
      ],
    ],
  ];
}

function dataProviderForMaps(): Array<[Map<any, any>, (x: any) => any, ((x: any) => any) | undefined, Array<any>]> {
  return [
    [
      createMapFixture([]),
      (x: [number, number]) => x[1] % 2 ? 'odd' : 'even',
      undefined,
      [],
    ],
    [
      createMapFixture([]),
      (x: [number, number]) => x[1] % 2 ? 'odd' : 'even',
      (x: [number, number]) => `item${x[1]}`,
      [],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (x: [number, number]) => x[1] % 2 ? 'odd' : 'even',
      undefined,
      [
        ['odd', [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9]]],
        ['even', [[1, 2], [3, 4], [5, 6], [7, 8]]],
      ],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (x: [number, number]) => x[1] % 2 ? 'odd' : 'even',
      (x: [number, number]) => `item${x[1]}`,
      [
        ['odd', {item1: [0, 1], item3: [2, 3], item5: [4, 5], item7: [6, 7], item9: [8, 9]}],
        ['even', {item2: [1, 2], item4: [3, 4], item6: [5, 6], item8: [7, 8]}],
      ],
    ],
    [
      new Map([[1, 'a'], [2, 'a'], [3, 'b'], [4, 'b'], [5, 'c'], [6, 'a'], [7, 'c']]),
      (x: Array<[string, number]>) => x[1],
      undefined,
      [
        ['a', [[1, 'a'], [2, 'a'], [6, 'a']]],
        ['b', [[3, 'b'], [4, 'b']]],
        ['c', [[5, 'c'], [7, 'c']]],
      ],
    ],
    [
      new Map([[1, 'a'], [2, 'a'], [3, 'b'], [4, 'b'], [5, 'c'], [6, 'a'], [7, 'c']]),
      (x: Array<[string, number]>) => x[0],
      undefined,
      [
        [1, [[1, 'a']]],
        [2, [[2, 'a']]],
        [3, [[3, 'b']]],
        [4, [[4, 'b']]],
        [5, [[5, 'c']]],
        [6, [[6, 'a']]],
        [7, [[7, 'c']]],
      ],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[AsyncGenerator<any>, (x: any) => any | Promise<any>, ((x: any) => any | Promise<any>) | undefined, Array<any>]> {
  return [
    [
      createAsyncGeneratorFixture([]),
      (x: number) => x % 2 ? 'odd' : 'even',
      undefined,
      [],
    ],
    [
      createAsyncGeneratorFixture([]),
      (x: number) => x % 2 ? 'odd' : 'even',
      (x: number) => `item${x}`,
      [],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (x: number) => x % 2 ? 'odd' : 'even',
      undefined,
      [
        ['odd', [1, 3, 5, 7, 9]],
        ['even', [2, 4, 6, 8]],
      ],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (x: number) => x % 2 ? 'odd' : 'even',
      (x: number) => `item${x}`,
      [
        ['odd', {item1: 1, item3: 3, item5: 5, item7: 7, item9: 9}],
        ['even', {item2: 2, item4: 4, item6: 6, item8: 8}],
      ],
    ],
    [
      createAsyncGeneratorFixture([['a', 1], ['a', 2], ['b', 3], ['b', 4], ['c', 5], ['a', 6], ['c', 7]]),
      (x: Array<[string, number]>) => x[0],
      undefined,
      [
        ['a', [['a', 1], ['a', 2], ['a', 6]]],
        ['b', [['b', 3], ['b', 4]]],
        ['c', [['c', 5], ['c', 7]]],
      ],
    ],
    [
      createAsyncGeneratorFixture([['a', 1], ['a', 2], ['b', 3], ['b', 4], ['c', 5], ['a', 6], ['c', 7]]),
      (x: Array<[string, number]>) => x[0],
      (x: Array<[string, number]>) => x[1],
      [
        ['a', {1: ['a', 1], 2: ['a', 2], 6: ['a', 6]}],
        ['b', {3: ['b', 3], 4: ['b', 4]}],
        ['c', {5: ['c', 5], 7: ['c', 7]}],
      ],
    ],
    [
      createAsyncGeneratorFixture([['a', 1], ['a', 2], ['b', 3], ['b', 4], ['c', 5], ['a', 6], ['c', 7]]),
      (x: Array<[string, number]>) => x[1],
      undefined,
      [
        [1, [['a', 1]]],
        [2, [['a', 2]]],
        [3, [['b', 3]]],
        [4, [['b', 4]]],
        [5, [['c', 5]]],
        [6, [['a', 6]]],
        [7, [['c', 7]]],
      ],
    ],
    [
      createAsyncGeneratorFixture([[1, 'a'], [2, 'a'], [3, 'b'], [4, 'b'], [5, 'c'], [6, 'a'], [7, 'c']]),
      (x: Array<[string, number]>) => x[1],
      undefined,
      [
        ['a', [[1, 'a'], [2, 'a'], [6, 'a']]],
        ['b', [[3, 'b'], [4, 'b']]],
        ['c', [[5, 'c'], [7, 'c']]],
      ],
    ],
    [
      createAsyncGeneratorFixture([[1, 'a'], [2, 'a'], [3, 'b'], [4, 'b'], [5, 'c'], [6, 'a'], [7, 'c']]),
      (x: Array<[string, number]>) => x[0],
      undefined,
      [
        [1, [[1, 'a']]],
        [2, [[2, 'a']]],
        [3, [[3, 'b']]],
        [4, [[4, 'b']]],
        [5, [[5, 'c']]],
        [6, [[6, 'a']]],
        [7, [[7, 'c']]],
      ],
    ],
    [
      createAsyncGeneratorFixture([
        ['Episode IV', "Luke"],
        ['Episode IV', "Leia"],
        ['Episode IV', "Chewie"],
        ['Episode IV', "Han"],
        ['Episode IV', "Obi-wan"],
        ['Episode IV', "R2-D2"],
        ['Episode IV', "C3P0"],
        ['Episode IV', "Vader"],
        ['Episode IV', "Tarkin"],
        ['Episode V', "Luke"],
        ['Episode V', "Leia"],
        ['Episode V', "Chewie"],
        ['Episode V', "Han"],
        ['Episode V', "Obi-wan"],
        ['Episode V', "R2-D2"],
        ['Episode V', "C3P0"],
        ['Episode V', "Lando"],
        ['Episode V', "Han"],
        ['Episode V', "Vader"],
        ['Episode V', "Emperor"],
        ['Episode V', "Yoda"],
        ['Episode V', "Boba Fett"],
        ['Episode VI', "Luke"],
        ['Episode VI', "Leia"],
        ['Episode VI', "Chewie"],
        ['Episode VI', "Han"],
        ['Episode VI', "Obi-wan"],
        ['Episode VI', "R2-D2"],
        ['Episode VI', "C3P0"],
        ['Episode VI', "Lando"],
        ['Episode VI', "Han"],
        ['Episode VI', "Vader"],
        ['Episode VI', "Emperor"],
        ['Episode VI', "Yoda"],
        ['Episode VI', "Boba Fett"],
        ['Episode VI', "Jabba"],
      ]),
      (x: [string, string]) => x[0],
      undefined,
      [
        ['Episode IV', [
          ['Episode IV', "Luke"],
          ['Episode IV', "Leia"],
          ['Episode IV', "Chewie"],
          ['Episode IV', "Han"],
          ['Episode IV', "Obi-wan"],
          ['Episode IV', "R2-D2"],
          ['Episode IV', "C3P0"],
          ['Episode IV', "Vader"],
          ['Episode IV', "Tarkin"],
        ]],
        ['Episode V', [
          ['Episode V', "Luke"],
          ['Episode V', "Leia"],
          ['Episode V', "Chewie"],
          ['Episode V', "Han"],
          ['Episode V', "Obi-wan"],
          ['Episode V', "R2-D2"],
          ['Episode V', "C3P0"],
          ['Episode V', "Lando"],
          ['Episode V', "Han"],
          ['Episode V', "Vader"],
          ['Episode V', "Emperor"],
          ['Episode V', "Yoda"],
          ['Episode V', "Boba Fett"],
        ]],
        ['Episode VI', [
          ['Episode VI', "Luke"],
          ['Episode VI', "Leia"],
          ['Episode VI', "Chewie"],
          ['Episode VI', "Han"],
          ['Episode VI', "Obi-wan"],
          ['Episode VI', "R2-D2"],
          ['Episode VI', "C3P0"],
          ['Episode VI', "Lando"],
          ['Episode VI', "Han"],
          ['Episode VI', "Vader"],
          ['Episode VI', "Emperor"],
          ['Episode VI', "Yoda"],
          ['Episode VI', "Boba Fett"],
          ['Episode VI', "Jabba"],
        ]]
      ],
    ],
    [
      createAsyncGeneratorFixture([
        ['Episode IV', "Luke"],
        ['Episode IV', "Leia"],
        ['Episode IV', "Chewie"],
        ['Episode IV', "Han"],
        ['Episode IV', "Obi-wan"],
        ['Episode IV', "R2-D2"],
        ['Episode IV', "C3P0"],
        ['Episode IV', "Vader"],
        ['Episode IV', "Tarkin"],
        ['Episode V', "Luke"],
        ['Episode V', "Leia"],
        ['Episode V', "Chewie"],
        ['Episode V', "Han"],
        ['Episode V', "Obi-wan"],
        ['Episode V', "R2-D2"],
        ['Episode V', "C3P0"],
        ['Episode V', "Lando"],
        ['Episode V', "Vader"],
        ['Episode V', "Emperor"],
        ['Episode V', "Yoda"],
        ['Episode V', "Boba Fett"],
        ['Episode VI', "Luke"],
        ['Episode VI', "Leia"],
        ['Episode VI', "Chewie"],
        ['Episode VI', "Han"],
        ['Episode VI', "Obi-wan"],
        ['Episode VI', "R2-D2"],
        ['Episode VI', "C3P0"],
        ['Episode VI', "Lando"],
        ['Episode VI', "Vader"],
        ['Episode VI', "Emperor"],
        ['Episode VI', "Yoda"],
        ['Episode VI', "Boba Fett"],
        ['Episode VI', "Jabba"],
      ]),
      (x: [string, string]) => x[1],
      undefined,
      [
        ['Luke', [
          ['Episode IV', "Luke"],
          ['Episode V', "Luke"],
          ['Episode VI', "Luke"],
        ]],
        ['Leia', [
          ['Episode IV', "Leia"],
          ['Episode V', "Leia"],
          ['Episode VI', "Leia"],
        ]],
        ['Chewie', [
          ['Episode IV', "Chewie"],
          ['Episode V', "Chewie"],
          ['Episode VI', "Chewie"],
        ]],
        ['Han', [
          ['Episode IV', "Han"],
          ['Episode V', "Han"],
          ['Episode VI', "Han"],
        ]],
        ['Obi-wan', [
          ['Episode IV', "Obi-wan"],
          ['Episode V', "Obi-wan"],
          ['Episode VI', "Obi-wan"],
        ]],
        ['R2-D2', [
          ['Episode IV', "R2-D2"],
          ['Episode V', "R2-D2"],
          ['Episode VI', "R2-D2"],
        ]],
        ['C3P0', [
          ['Episode IV', "C3P0"],
          ['Episode V', "C3P0"],
          ['Episode VI', "C3P0"],
        ]],
        ['Vader', [
          ['Episode IV', "Vader"],
          ['Episode V', "Vader"],
          ['Episode VI', "Vader"],
        ]],
        ['Tarkin', [
          ['Episode IV', "Tarkin"],
        ]],
        ['Lando', [
          ['Episode V', "Lando"],
          ['Episode VI', "Lando"],
        ]],
        ['Emperor', [
          ['Episode V', "Emperor"],
          ['Episode VI', "Emperor"],
        ]],
        ['Yoda', [
          ['Episode V', "Yoda"],
          ['Episode VI', "Yoda"],
        ]],
        ['Boba Fett', [
          ['Episode V', "Boba Fett"],
          ['Episode VI', "Boba Fett"],
        ]],
        ['Jabba', [
          ['Episode VI', "Jabba"],
        ]],
      ],
    ],
    [
      createAsyncGeneratorFixture([
        ['Garfield', 'cat'],
        ['Tom', 'cat'],
        ['Felix', 'cat'],
        ['Heathcliff', 'cat'],
        ['Snoopy', 'dog'],
        ['Scooby-Doo', 'dog'],
        ['Odie', 'dog'],
        ['Donald', 'duck'],
        ['Daffy', 'duck'],
      ]),
      (x: [string, string]) => x[1],
      undefined,
      [
        ['cat', [
          ['Garfield', 'cat'],
          ['Tom', 'cat'],
          ['Felix', 'cat'],
          ['Heathcliff', 'cat'],
        ]],
        ['dog', [
          ['Snoopy', 'dog'],
          ['Scooby-Doo', 'dog'],
          ['Odie', 'dog'],
        ]],
        ['duck', [
          ['Donald', 'duck'],
          ['Daffy', 'duck'],
        ]]
      ]
    ],
    [
      createAsyncGeneratorFixture([
        {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        {name: 'Anonymous', interests: []},
      ]),
      (x: Record<string, unknown>) => x.interests,
      undefined,
      [
        ['programming', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        ]],
        ['books', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        ]],
        ['slacking', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        ]],
        ['music', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        ]],
        ['math', [
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        ]],
        ['fantasy', [
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        ]],
        ['wine', [
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        ]],
      ],
    ],
    [
      createAsyncGeneratorFixture([
        {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        {name: 'Anonymous', interests: []},
      ]),
      (x: Record<string, unknown>) => x.interests,
      (x: Record<string, unknown>) => x.name,
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          Alice: {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        }],
        ['slacking', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          Alice: {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        }],
        ['math', {
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        }],
        ['fantasy', {
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          Alice: {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        }],
        ['wine', {
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        }],
      ],
    ],
    [
      createAsyncGeneratorFixture([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      (x: Record<string, unknown>) => x.interests,
      undefined,
      [
        ['programming', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
        ]],
        ['books', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
          {name: 'Laura', interests: ['books', 'music', 'music']},
        ]],
        ['music', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
          {name: 'Laura', interests: ['books', 'music', 'music']},
        ]],
      ],
    ],
    [
      createAsyncGeneratorFixture([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      (x: Record<string, unknown>) => x.interests,
      (x: Record<string, unknown>) => x.name,
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
      ],
    ],
    [
      createAsyncGeneratorFixture([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      async (x: Record<string, unknown>) => {
        await asyncTimeout(1);
        return x.interests;
      },
      undefined,
      [
        ['programming', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
        ]],
        ['books', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
          {name: 'Laura', interests: ['books', 'music', 'music']},
        ]],
        ['music', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
          {name: 'Laura', interests: ['books', 'music', 'music']},
        ]],
      ],
    ],
    [
      createAsyncGeneratorFixture([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      async (x: Record<string, unknown>) => {
        await asyncTimeout(1);
        return x.interests;
      },
      (x: Record<string, unknown>) => x.name,
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
      ],
    ],
    [
      createAsyncGeneratorFixture([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      (x: Record<string, unknown>) => x.interests,
      async (x: Record<string, unknown>) => {
        await asyncTimeout(1);
        return x.name;
      },
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
      ],
    ],
    [
      createAsyncGeneratorFixture([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      async (x: Record<string, unknown>) => {
        await asyncTimeout(1);
        return x.interests;
      },
      async (x: Record<string, unknown>) => {
        await asyncTimeout(1);
        return x.name;
      },
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
      ],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[AsyncIterable<any>, (x: any) => any | Promise<any>, ((x: any) => any | Promise<any>) | undefined, Array<any>]> {
  return [
    [
      createAsyncIterableFixture([]),
      (x: number) => x % 2 ? 'odd' : 'even',
      undefined,
      [],
    ],
    [
      createAsyncIterableFixture([]),
      (x: number) => x % 2 ? 'odd' : 'even',
      (x: number) => `item${x}`,
      [],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (x: number) => x % 2 ? 'odd' : 'even',
      undefined,
      [
        ['odd', [1, 3, 5, 7, 9]],
        ['even', [2, 4, 6, 8]],
      ],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (x: number) => x % 2 ? 'odd' : 'even',
      (x: number) => `item${x}`,
      [
        ['odd', {item1: 1, item3: 3, item5: 5, item7: 7, item9: 9}],
        ['even', {item2: 2, item4: 4, item6: 6, item8: 8}],
      ],
    ],
    [
      createAsyncIterableFixture([['a', 1], ['a', 2], ['b', 3], ['b', 4], ['c', 5], ['a', 6], ['c', 7]]),
      (x: Array<[string, number]>) => x[0],
      undefined,
      [
        ['a', [['a', 1], ['a', 2], ['a', 6]]],
        ['b', [['b', 3], ['b', 4]]],
        ['c', [['c', 5], ['c', 7]]],
      ],
    ],
    [
      createAsyncIterableFixture([['a', 1], ['a', 2], ['b', 3], ['b', 4], ['c', 5], ['a', 6], ['c', 7]]),
      (x: Array<[string, number]>) => x[0],
      (x: Array<[string, number]>) => x[1],
      [
        ['a', {1: ['a', 1], 2: ['a', 2], 6: ['a', 6]}],
        ['b', {3: ['b', 3], 4: ['b', 4]}],
        ['c', {5: ['c', 5], 7: ['c', 7]}],
      ],
    ],
    [
      createAsyncIterableFixture([['a', 1], ['a', 2], ['b', 3], ['b', 4], ['c', 5], ['a', 6], ['c', 7]]),
      (x: Array<[string, number]>) => x[1],
      undefined,
      [
        [1, [['a', 1]]],
        [2, [['a', 2]]],
        [3, [['b', 3]]],
        [4, [['b', 4]]],
        [5, [['c', 5]]],
        [6, [['a', 6]]],
        [7, [['c', 7]]],
      ],
    ],
    [
      createAsyncIterableFixture([[1, 'a'], [2, 'a'], [3, 'b'], [4, 'b'], [5, 'c'], [6, 'a'], [7, 'c']]),
      (x: Array<[string, number]>) => x[1],
      undefined,
      [
        ['a', [[1, 'a'], [2, 'a'], [6, 'a']]],
        ['b', [[3, 'b'], [4, 'b']]],
        ['c', [[5, 'c'], [7, 'c']]],
      ],
    ],
    [
      createAsyncIterableFixture([[1, 'a'], [2, 'a'], [3, 'b'], [4, 'b'], [5, 'c'], [6, 'a'], [7, 'c']]),
      (x: Array<[string, number]>) => x[0],
      undefined,
      [
        [1, [[1, 'a']]],
        [2, [[2, 'a']]],
        [3, [[3, 'b']]],
        [4, [[4, 'b']]],
        [5, [[5, 'c']]],
        [6, [[6, 'a']]],
        [7, [[7, 'c']]],
      ],
    ],
    [
      createAsyncIterableFixture([
        ['Episode IV', "Luke"],
        ['Episode IV', "Leia"],
        ['Episode IV', "Chewie"],
        ['Episode IV', "Han"],
        ['Episode IV', "Obi-wan"],
        ['Episode IV', "R2-D2"],
        ['Episode IV', "C3P0"],
        ['Episode IV', "Vader"],
        ['Episode IV', "Tarkin"],
        ['Episode V', "Luke"],
        ['Episode V', "Leia"],
        ['Episode V', "Chewie"],
        ['Episode V', "Han"],
        ['Episode V', "Obi-wan"],
        ['Episode V', "R2-D2"],
        ['Episode V', "C3P0"],
        ['Episode V', "Lando"],
        ['Episode V', "Han"],
        ['Episode V', "Vader"],
        ['Episode V', "Emperor"],
        ['Episode V', "Yoda"],
        ['Episode V', "Boba Fett"],
        ['Episode VI', "Luke"],
        ['Episode VI', "Leia"],
        ['Episode VI', "Chewie"],
        ['Episode VI', "Han"],
        ['Episode VI', "Obi-wan"],
        ['Episode VI', "R2-D2"],
        ['Episode VI', "C3P0"],
        ['Episode VI', "Lando"],
        ['Episode VI', "Han"],
        ['Episode VI', "Vader"],
        ['Episode VI', "Emperor"],
        ['Episode VI', "Yoda"],
        ['Episode VI', "Boba Fett"],
        ['Episode VI', "Jabba"],
      ]),
      (x: [string, string]) => x[0],
      undefined,
      [
        ['Episode IV', [
          ['Episode IV', "Luke"],
          ['Episode IV', "Leia"],
          ['Episode IV', "Chewie"],
          ['Episode IV', "Han"],
          ['Episode IV', "Obi-wan"],
          ['Episode IV', "R2-D2"],
          ['Episode IV', "C3P0"],
          ['Episode IV', "Vader"],
          ['Episode IV', "Tarkin"],
        ]],
        ['Episode V', [
          ['Episode V', "Luke"],
          ['Episode V', "Leia"],
          ['Episode V', "Chewie"],
          ['Episode V', "Han"],
          ['Episode V', "Obi-wan"],
          ['Episode V', "R2-D2"],
          ['Episode V', "C3P0"],
          ['Episode V', "Lando"],
          ['Episode V', "Han"],
          ['Episode V', "Vader"],
          ['Episode V', "Emperor"],
          ['Episode V', "Yoda"],
          ['Episode V', "Boba Fett"],
        ]],
        ['Episode VI', [
          ['Episode VI', "Luke"],
          ['Episode VI', "Leia"],
          ['Episode VI', "Chewie"],
          ['Episode VI', "Han"],
          ['Episode VI', "Obi-wan"],
          ['Episode VI', "R2-D2"],
          ['Episode VI', "C3P0"],
          ['Episode VI', "Lando"],
          ['Episode VI', "Han"],
          ['Episode VI', "Vader"],
          ['Episode VI', "Emperor"],
          ['Episode VI', "Yoda"],
          ['Episode VI', "Boba Fett"],
          ['Episode VI', "Jabba"],
        ]]
      ],
    ],
    [
      createAsyncIterableFixture([
        ['Episode IV', "Luke"],
        ['Episode IV', "Leia"],
        ['Episode IV', "Chewie"],
        ['Episode IV', "Han"],
        ['Episode IV', "Obi-wan"],
        ['Episode IV', "R2-D2"],
        ['Episode IV', "C3P0"],
        ['Episode IV', "Vader"],
        ['Episode IV', "Tarkin"],
        ['Episode V', "Luke"],
        ['Episode V', "Leia"],
        ['Episode V', "Chewie"],
        ['Episode V', "Han"],
        ['Episode V', "Obi-wan"],
        ['Episode V', "R2-D2"],
        ['Episode V', "C3P0"],
        ['Episode V', "Lando"],
        ['Episode V', "Vader"],
        ['Episode V', "Emperor"],
        ['Episode V', "Yoda"],
        ['Episode V', "Boba Fett"],
        ['Episode VI', "Luke"],
        ['Episode VI', "Leia"],
        ['Episode VI', "Chewie"],
        ['Episode VI', "Han"],
        ['Episode VI', "Obi-wan"],
        ['Episode VI', "R2-D2"],
        ['Episode VI', "C3P0"],
        ['Episode VI', "Lando"],
        ['Episode VI', "Vader"],
        ['Episode VI', "Emperor"],
        ['Episode VI', "Yoda"],
        ['Episode VI', "Boba Fett"],
        ['Episode VI', "Jabba"],
      ]),
      (x: [string, string]) => x[1],
      undefined,
      [
        ['Luke', [
          ['Episode IV', "Luke"],
          ['Episode V', "Luke"],
          ['Episode VI', "Luke"],
        ]],
        ['Leia', [
          ['Episode IV', "Leia"],
          ['Episode V', "Leia"],
          ['Episode VI', "Leia"],
        ]],
        ['Chewie', [
          ['Episode IV', "Chewie"],
          ['Episode V', "Chewie"],
          ['Episode VI', "Chewie"],
        ]],
        ['Han', [
          ['Episode IV', "Han"],
          ['Episode V', "Han"],
          ['Episode VI', "Han"],
        ]],
        ['Obi-wan', [
          ['Episode IV', "Obi-wan"],
          ['Episode V', "Obi-wan"],
          ['Episode VI', "Obi-wan"],
        ]],
        ['R2-D2', [
          ['Episode IV', "R2-D2"],
          ['Episode V', "R2-D2"],
          ['Episode VI', "R2-D2"],
        ]],
        ['C3P0', [
          ['Episode IV', "C3P0"],
          ['Episode V', "C3P0"],
          ['Episode VI', "C3P0"],
        ]],
        ['Vader', [
          ['Episode IV', "Vader"],
          ['Episode V', "Vader"],
          ['Episode VI', "Vader"],
        ]],
        ['Tarkin', [
          ['Episode IV', "Tarkin"],
        ]],
        ['Lando', [
          ['Episode V', "Lando"],
          ['Episode VI', "Lando"],
        ]],
        ['Emperor', [
          ['Episode V', "Emperor"],
          ['Episode VI', "Emperor"],
        ]],
        ['Yoda', [
          ['Episode V', "Yoda"],
          ['Episode VI', "Yoda"],
        ]],
        ['Boba Fett', [
          ['Episode V', "Boba Fett"],
          ['Episode VI', "Boba Fett"],
        ]],
        ['Jabba', [
          ['Episode VI', "Jabba"],
        ]],
      ],
    ],
    [
      createAsyncIterableFixture([
        ['Garfield', 'cat'],
        ['Tom', 'cat'],
        ['Felix', 'cat'],
        ['Heathcliff', 'cat'],
        ['Snoopy', 'dog'],
        ['Scooby-Doo', 'dog'],
        ['Odie', 'dog'],
        ['Donald', 'duck'],
        ['Daffy', 'duck'],
      ]),
      (x: [string, string]) => x[1],
      undefined,
      [
        ['cat', [
          ['Garfield', 'cat'],
          ['Tom', 'cat'],
          ['Felix', 'cat'],
          ['Heathcliff', 'cat'],
        ]],
        ['dog', [
          ['Snoopy', 'dog'],
          ['Scooby-Doo', 'dog'],
          ['Odie', 'dog'],
        ]],
        ['duck', [
          ['Donald', 'duck'],
          ['Daffy', 'duck'],
        ]]
      ]
    ],
    [
      createAsyncIterableFixture([
        {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        {name: 'Anonymous', interests: []},
      ]),
      (x: Record<string, unknown>) => x.interests,
      undefined,
      [
        ['programming', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        ]],
        ['books', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        ]],
        ['slacking', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        ]],
        ['music', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        ]],
        ['math', [
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        ]],
        ['fantasy', [
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        ]],
        ['wine', [
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        ]],
      ],
    ],
    [
      createAsyncIterableFixture([
        {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        {name: 'Anonymous', interests: []},
      ]),
      (x: Record<string, unknown>) => x.interests,
      (x: Record<string, unknown>) => x.name,
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          Alice: {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        }],
        ['slacking', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          Alice: {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        }],
        ['math', {
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        }],
        ['fantasy', {
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          Alice: {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        }],
        ['wine', {
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        }],
      ],
    ],
    [
      createAsyncIterableFixture([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      (x: Record<string, unknown>) => x.interests,
      undefined,
      [
        ['programming', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
        ]],
        ['books', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
          {name: 'Laura', interests: ['books', 'music', 'music']},
        ]],
        ['music', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
          {name: 'Laura', interests: ['books', 'music', 'music']},
        ]],
      ],
    ],
    [
      createAsyncIterableFixture([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      (x: Record<string, unknown>) => x.interests,
      (x: Record<string, unknown>) => x.name,
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
      ],
    ],
    [
      createAsyncIterableFixture([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      async (x: Record<string, unknown>) => {
        await asyncTimeout(1);
        return x.interests;
      },
      undefined,
      [
        ['programming', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
        ]],
        ['books', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
          {name: 'Laura', interests: ['books', 'music', 'music']},
        ]],
        ['music', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
          {name: 'Laura', interests: ['books', 'music', 'music']},
        ]],
      ],
    ],
    [
      createAsyncIterableFixture([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      async (x: Record<string, unknown>) => {
        await asyncTimeout(1);
        return x.interests;
      },
      (x: Record<string, unknown>) => x.name,
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
      ],
    ],
    [
      createAsyncIterableFixture([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      (x: Record<string, unknown>) => x.interests,
      async (x: Record<string, unknown>) => {
        await asyncTimeout(1);
        return x.name;
      },
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
      ],
    ],
    [
      createAsyncIterableFixture([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      async (x: Record<string, unknown>) => {
        await asyncTimeout(1);
        return x.interests;
      },
      async (x: Record<string, unknown>) => {
        await asyncTimeout(1);
        return x.name;
      },
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
      ],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[AsyncIterator<any>, (x: any) => any | Promise<any>, ((x: any) => any | Promise<any>) | undefined, Array<any>]> {
  return [
    [
      createAsyncIteratorFixture([]),
      (x: number) => x % 2 ? 'odd' : 'even',
      undefined,
      [],
    ],
    [
      createAsyncIteratorFixture([]),
      (x: number) => x % 2 ? 'odd' : 'even',
      (x: number) => `item${x}`,
      [],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (x: number) => x % 2 ? 'odd' : 'even',
      undefined,
      [
        ['odd', [1, 3, 5, 7, 9]],
        ['even', [2, 4, 6, 8]],
      ],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      (x: number) => x % 2 ? 'odd' : 'even',
      (x: number) => `item${x}`,
      [
        ['odd', {item1: 1, item3: 3, item5: 5, item7: 7, item9: 9}],
        ['even', {item2: 2, item4: 4, item6: 6, item8: 8}],
      ],
    ],
    [
      createAsyncIteratorFixture([['a', 1], ['a', 2], ['b', 3], ['b', 4], ['c', 5], ['a', 6], ['c', 7]]),
      (x: Array<[string, number]>) => x[0],
      undefined,
      [
        ['a', [['a', 1], ['a', 2], ['a', 6]]],
        ['b', [['b', 3], ['b', 4]]],
        ['c', [['c', 5], ['c', 7]]],
      ],
    ],
    [
      createAsyncIteratorFixture([['a', 1], ['a', 2], ['b', 3], ['b', 4], ['c', 5], ['a', 6], ['c', 7]]),
      (x: Array<[string, number]>) => x[0],
      (x: Array<[string, number]>) => x[1],
      [
        ['a', {1: ['a', 1], 2: ['a', 2], 6: ['a', 6]}],
        ['b', {3: ['b', 3], 4: ['b', 4]}],
        ['c', {5: ['c', 5], 7: ['c', 7]}],
      ],
    ],
    [
      createAsyncIteratorFixture([['a', 1], ['a', 2], ['b', 3], ['b', 4], ['c', 5], ['a', 6], ['c', 7]]),
      (x: Array<[string, number]>) => x[1],
      undefined,
      [
        [1, [['a', 1]]],
        [2, [['a', 2]]],
        [3, [['b', 3]]],
        [4, [['b', 4]]],
        [5, [['c', 5]]],
        [6, [['a', 6]]],
        [7, [['c', 7]]],
      ],
    ],
    [
      createAsyncIteratorFixture([[1, 'a'], [2, 'a'], [3, 'b'], [4, 'b'], [5, 'c'], [6, 'a'], [7, 'c']]),
      (x: Array<[string, number]>) => x[1],
      undefined,
      [
        ['a', [[1, 'a'], [2, 'a'], [6, 'a']]],
        ['b', [[3, 'b'], [4, 'b']]],
        ['c', [[5, 'c'], [7, 'c']]],
      ],
    ],
    [
      createAsyncIteratorFixture([[1, 'a'], [2, 'a'], [3, 'b'], [4, 'b'], [5, 'c'], [6, 'a'], [7, 'c']]),
      (x: Array<[string, number]>) => x[0],
      undefined,
      [
        [1, [[1, 'a']]],
        [2, [[2, 'a']]],
        [3, [[3, 'b']]],
        [4, [[4, 'b']]],
        [5, [[5, 'c']]],
        [6, [[6, 'a']]],
        [7, [[7, 'c']]],
      ],
    ],
    [
      createAsyncIteratorFixture([
        ['Episode IV', "Luke"],
        ['Episode IV', "Leia"],
        ['Episode IV', "Chewie"],
        ['Episode IV', "Han"],
        ['Episode IV', "Obi-wan"],
        ['Episode IV', "R2-D2"],
        ['Episode IV', "C3P0"],
        ['Episode IV', "Vader"],
        ['Episode IV', "Tarkin"],
        ['Episode V', "Luke"],
        ['Episode V', "Leia"],
        ['Episode V', "Chewie"],
        ['Episode V', "Han"],
        ['Episode V', "Obi-wan"],
        ['Episode V', "R2-D2"],
        ['Episode V', "C3P0"],
        ['Episode V', "Lando"],
        ['Episode V', "Han"],
        ['Episode V', "Vader"],
        ['Episode V', "Emperor"],
        ['Episode V', "Yoda"],
        ['Episode V', "Boba Fett"],
        ['Episode VI', "Luke"],
        ['Episode VI', "Leia"],
        ['Episode VI', "Chewie"],
        ['Episode VI', "Han"],
        ['Episode VI', "Obi-wan"],
        ['Episode VI', "R2-D2"],
        ['Episode VI', "C3P0"],
        ['Episode VI', "Lando"],
        ['Episode VI', "Han"],
        ['Episode VI', "Vader"],
        ['Episode VI', "Emperor"],
        ['Episode VI', "Yoda"],
        ['Episode VI', "Boba Fett"],
        ['Episode VI', "Jabba"],
      ]),
      (x: [string, string]) => x[0],
      undefined,
      [
        ['Episode IV', [
          ['Episode IV', "Luke"],
          ['Episode IV', "Leia"],
          ['Episode IV', "Chewie"],
          ['Episode IV', "Han"],
          ['Episode IV', "Obi-wan"],
          ['Episode IV', "R2-D2"],
          ['Episode IV', "C3P0"],
          ['Episode IV', "Vader"],
          ['Episode IV', "Tarkin"],
        ]],
        ['Episode V', [
          ['Episode V', "Luke"],
          ['Episode V', "Leia"],
          ['Episode V', "Chewie"],
          ['Episode V', "Han"],
          ['Episode V', "Obi-wan"],
          ['Episode V', "R2-D2"],
          ['Episode V', "C3P0"],
          ['Episode V', "Lando"],
          ['Episode V', "Han"],
          ['Episode V', "Vader"],
          ['Episode V', "Emperor"],
          ['Episode V', "Yoda"],
          ['Episode V', "Boba Fett"],
        ]],
        ['Episode VI', [
          ['Episode VI', "Luke"],
          ['Episode VI', "Leia"],
          ['Episode VI', "Chewie"],
          ['Episode VI', "Han"],
          ['Episode VI', "Obi-wan"],
          ['Episode VI', "R2-D2"],
          ['Episode VI', "C3P0"],
          ['Episode VI', "Lando"],
          ['Episode VI', "Han"],
          ['Episode VI', "Vader"],
          ['Episode VI', "Emperor"],
          ['Episode VI', "Yoda"],
          ['Episode VI', "Boba Fett"],
          ['Episode VI', "Jabba"],
        ]]
      ],
    ],
    [
      createAsyncIteratorFixture([
        ['Episode IV', "Luke"],
        ['Episode IV', "Leia"],
        ['Episode IV', "Chewie"],
        ['Episode IV', "Han"],
        ['Episode IV', "Obi-wan"],
        ['Episode IV', "R2-D2"],
        ['Episode IV', "C3P0"],
        ['Episode IV', "Vader"],
        ['Episode IV', "Tarkin"],
        ['Episode V', "Luke"],
        ['Episode V', "Leia"],
        ['Episode V', "Chewie"],
        ['Episode V', "Han"],
        ['Episode V', "Obi-wan"],
        ['Episode V', "R2-D2"],
        ['Episode V', "C3P0"],
        ['Episode V', "Lando"],
        ['Episode V', "Vader"],
        ['Episode V', "Emperor"],
        ['Episode V', "Yoda"],
        ['Episode V', "Boba Fett"],
        ['Episode VI', "Luke"],
        ['Episode VI', "Leia"],
        ['Episode VI', "Chewie"],
        ['Episode VI', "Han"],
        ['Episode VI', "Obi-wan"],
        ['Episode VI', "R2-D2"],
        ['Episode VI', "C3P0"],
        ['Episode VI', "Lando"],
        ['Episode VI', "Vader"],
        ['Episode VI', "Emperor"],
        ['Episode VI', "Yoda"],
        ['Episode VI', "Boba Fett"],
        ['Episode VI', "Jabba"],
      ]),
      (x: [string, string]) => x[1],
      undefined,
      [
        ['Luke', [
          ['Episode IV', "Luke"],
          ['Episode V', "Luke"],
          ['Episode VI', "Luke"],
        ]],
        ['Leia', [
          ['Episode IV', "Leia"],
          ['Episode V', "Leia"],
          ['Episode VI', "Leia"],
        ]],
        ['Chewie', [
          ['Episode IV', "Chewie"],
          ['Episode V', "Chewie"],
          ['Episode VI', "Chewie"],
        ]],
        ['Han', [
          ['Episode IV', "Han"],
          ['Episode V', "Han"],
          ['Episode VI', "Han"],
        ]],
        ['Obi-wan', [
          ['Episode IV', "Obi-wan"],
          ['Episode V', "Obi-wan"],
          ['Episode VI', "Obi-wan"],
        ]],
        ['R2-D2', [
          ['Episode IV', "R2-D2"],
          ['Episode V', "R2-D2"],
          ['Episode VI', "R2-D2"],
        ]],
        ['C3P0', [
          ['Episode IV', "C3P0"],
          ['Episode V', "C3P0"],
          ['Episode VI', "C3P0"],
        ]],
        ['Vader', [
          ['Episode IV', "Vader"],
          ['Episode V', "Vader"],
          ['Episode VI', "Vader"],
        ]],
        ['Tarkin', [
          ['Episode IV', "Tarkin"],
        ]],
        ['Lando', [
          ['Episode V', "Lando"],
          ['Episode VI', "Lando"],
        ]],
        ['Emperor', [
          ['Episode V', "Emperor"],
          ['Episode VI', "Emperor"],
        ]],
        ['Yoda', [
          ['Episode V', "Yoda"],
          ['Episode VI', "Yoda"],
        ]],
        ['Boba Fett', [
          ['Episode V', "Boba Fett"],
          ['Episode VI', "Boba Fett"],
        ]],
        ['Jabba', [
          ['Episode VI', "Jabba"],
        ]],
      ],
    ],
    [
      createAsyncIteratorFixture([
        ['Garfield', 'cat'],
        ['Tom', 'cat'],
        ['Felix', 'cat'],
        ['Heathcliff', 'cat'],
        ['Snoopy', 'dog'],
        ['Scooby-Doo', 'dog'],
        ['Odie', 'dog'],
        ['Donald', 'duck'],
        ['Daffy', 'duck'],
      ]),
      (x: [string, string]) => x[1],
      undefined,
      [
        ['cat', [
          ['Garfield', 'cat'],
          ['Tom', 'cat'],
          ['Felix', 'cat'],
          ['Heathcliff', 'cat'],
        ]],
        ['dog', [
          ['Snoopy', 'dog'],
          ['Scooby-Doo', 'dog'],
          ['Odie', 'dog'],
        ]],
        ['duck', [
          ['Donald', 'duck'],
          ['Daffy', 'duck'],
        ]]
      ]
    ],
    [
      createAsyncIteratorFixture([
        {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        {name: 'Anonymous', interests: []},
      ]),
      (x: Record<string, unknown>) => x.interests,
      undefined,
      [
        ['programming', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        ]],
        ['books', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        ]],
        ['slacking', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        ]],
        ['music', [
          {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        ]],
        ['math', [
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        ]],
        ['fantasy', [
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        ]],
        ['wine', [
          {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        ]],
      ],
    ],
    [
      createAsyncIteratorFixture([
        {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        {name: 'Anonymous', interests: []},
      ]),
      (x: Record<string, unknown>) => x.interests,
      (x: Record<string, unknown>) => x.name,
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          Alice: {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        }],
        ['slacking', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'slacking', 'music']},
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          Alice: {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        }],
        ['math', {
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        }],
        ['fantasy', {
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
          Alice: {name: 'Alice', interests: ['music', 'programming', 'fantasy']},
        }],
        ['wine', {
          Laura: {name: 'Laura', interests: ['math', 'fantasy', 'wine', 'music']},
        }],
      ],
    ],
    [
      createAsyncIteratorFixture([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      (x: Record<string, unknown>) => x.interests,
      undefined,
      [
        ['programming', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
        ]],
        ['books', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
          {name: 'Laura', interests: ['books', 'music', 'music']},
        ]],
        ['music', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
          {name: 'Laura', interests: ['books', 'music', 'music']},
        ]],
      ],
    ],
    [
      createAsyncIteratorFixture([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      (x: Record<string, unknown>) => x.interests,
      (x: Record<string, unknown>) => x.name,
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
      ],
    ],
    [
      createAsyncIteratorFixture([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      async (x: Record<string, unknown>) => {
        await asyncTimeout(1);
        return x.interests;
      },
      undefined,
      [
        ['programming', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
        ]],
        ['books', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
          {name: 'Laura', interests: ['books', 'music', 'music']},
        ]],
        ['music', [
          {name: 'Sam', interests: ['programming', 'books', 'music']},
          {name: 'Laura', interests: ['books', 'music', 'music']},
        ]],
      ],
    ],
    [
      createAsyncIteratorFixture([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      async (x: Record<string, unknown>) => {
        await asyncTimeout(1);
        return x.interests;
      },
      (x: Record<string, unknown>) => x.name,
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
      ],
    ],
    [
      createAsyncIteratorFixture([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      (x: Record<string, unknown>) => x.interests,
      async (x: Record<string, unknown>) => {
        await asyncTimeout(1);
        return x.name;
      },
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
      ],
    ],
    [
      createAsyncIteratorFixture([
        {name: 'Sam', interests: ['programming', 'books', 'music']},
        {name: 'Laura', interests: ['books', 'music', 'music']},
      ]),
      async (x: Record<string, unknown>) => {
        await asyncTimeout(1);
        return x.interests;
      },
      async (x: Record<string, unknown>) => {
        await asyncTimeout(1);
        return x.name;
      },
      [
        ['programming', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
        }],
        ['books', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
        ['music', {
          Sam: {name: 'Sam', interests: ['programming', 'books', 'music']},
          Laura: {name: 'Laura', interests: ['books', 'music', 'music']},
        }],
      ],
    ],
  ];
}
