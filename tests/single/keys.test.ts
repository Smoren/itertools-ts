import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  // @ts-ignore
} from "../fixture";
import { single } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
] as Array<[Iterable<[unknown, unknown]>|Iterator<[unknown, unknown]>, Array<unknown>]>)(
  "Single Keys Test",
  (
    input: Iterable<[unknown, unknown]>|Iterator<[unknown, unknown]>,
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of single.keys(input)) {
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
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
] as Array<[
  AsyncIterable<[unknown, unknown]>|AsyncIterator<[unknown, unknown]>|Iterable<[unknown, unknown]>|Iterator<[unknown, unknown]>,
  Array<unknown>
]>)(
  "Single Keys Async Test",
  (
    input: AsyncIterable<[unknown, unknown]>|AsyncIterator<[unknown, unknown]>|Iterable<[unknown, unknown]>|Iterator<[unknown, unknown]>,
    expected: Array<unknown>
  ) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of single.keysAsync(input)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [],
      [],
    ],
    [
      [[1, 2]],
      [1],
    ],
    [
      [[undefined, null]],
      [undefined],
    ],
    [
      [[null, undefined]],
      [null],
    ],
    [
      [[null, undefined], [undefined, null], [undefined, undefined], [null, null]],
      [null, undefined, undefined, null],
    ],
    [
      [[1, 2], [2, 3], [3, 4]],
      [1, 2, 3],
    ],
    [
      [['bondage', 'b'], ['domination', 'd'], ['sadism', 's'], ['masochism', 'm']],
      ['bondage', 'domination', 'sadism', 'masochism'],
    ],
    [
      [['bondage', ['b']], ['domination', ['d']], ['sadism', ['s']], ['masochism', ['m']]],
      ['bondage', 'domination', 'sadism', 'masochism'],
    ],
    [
      [[['bondage'], ['b']], [['domination'], ['d']], [['sadism'], ['s']], [['masochism'], ['m']]],
      [['bondage'], ['domination'], ['sadism'], ['masochism']],
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
      createGeneratorFixture([[1, 2]]),
      [1],
    ],
    [
      createGeneratorFixture([[undefined, null]]),
      [undefined],
    ],
    [
      createGeneratorFixture([[null, undefined]]),
      [null],
    ],
    [
      createGeneratorFixture([[null, undefined], [undefined, null], [undefined, undefined], [null, null]]),
      [null, undefined, undefined, null],
    ],
    [
      createGeneratorFixture([[1, 2], [2, 3], [3, 4]]),
      [1, 2, 3],
    ],
    [
      createGeneratorFixture([['bondage', 'b'], ['domination', 'd'], ['sadism', 's'], ['masochism', 'm']]),
      ['bondage', 'domination', 'sadism', 'masochism'],
    ],
    [
      createGeneratorFixture([['bondage', ['b']], ['domination', ['d']], ['sadism', ['s']], ['masochism', ['m']]]),
      ['bondage', 'domination', 'sadism', 'masochism'],
    ],
    [
      createGeneratorFixture([[['bondage'], ['b']], [['domination'], ['d']], [['sadism'], ['s']], [['masochism'], ['m']]]),
      [['bondage'], ['domination'], ['sadism'], ['masochism']],
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      [],
    ],
    [
      createIterableFixture([[1, 2]]),
      [1],
    ],
    [
      createIterableFixture([[undefined, null]]),
      [undefined],
    ],
    [
      createIterableFixture([[null, undefined]]),
      [null],
    ],
    [
      createIterableFixture([[null, undefined], [undefined, null], [undefined, undefined], [null, null]]),
      [null, undefined, undefined, null],
    ],
    [
      createIterableFixture([[1, 2], [2, 3], [3, 4]]),
      [1, 2, 3],
    ],
    [
      createIterableFixture([['bondage', 'b'], ['domination', 'd'], ['sadism', 's'], ['masochism', 'm']]),
      ['bondage', 'domination', 'sadism', 'masochism'],
    ],
    [
      createIterableFixture([['bondage', ['b']], ['domination', ['d']], ['sadism', ['s']], ['masochism', ['m']]]),
      ['bondage', 'domination', 'sadism', 'masochism'],
    ],
    [
      createIterableFixture([[['bondage'], ['b']], [['domination'], ['d']], [['sadism'], ['s']], [['masochism'], ['m']]]),
      [['bondage'], ['domination'], ['sadism'], ['masochism']],
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      [],
    ],
    [
      createIteratorFixture([[1, 2]]),
      [1],
    ],
    [
      createIteratorFixture([[undefined, null]]),
      [undefined],
    ],
    [
      createIteratorFixture([[null, undefined]]),
      [null],
    ],
    [
      createIteratorFixture([[null, undefined], [undefined, null], [undefined, undefined], [null, null]]),
      [null, undefined, undefined, null],
    ],
    [
      createIteratorFixture([[1, 2], [2, 3], [3, 4]]),
      [1, 2, 3],
    ],
    [
      createIteratorFixture([['bondage', 'b'], ['domination', 'd'], ['sadism', 's'], ['masochism', 'm']]),
      ['bondage', 'domination', 'sadism', 'masochism'],
    ],
    [
      createIteratorFixture([['bondage', ['b']], ['domination', ['d']], ['sadism', ['s']], ['masochism', ['m']]]),
      ['bondage', 'domination', 'sadism', 'masochism'],
    ],
    [
      createIteratorFixture([[['bondage'], ['b']], [['domination'], ['d']], [['sadism'], ['s']], [['masochism'], ['m']]]),
      [['bondage'], ['domination'], ['sadism'], ['masochism']],
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([]),
      [],
    ],
    [
      new Set([[1, 2]]),
      [1],
    ],
    [
      new Set([[undefined, null]]),
      [undefined],
    ],
    [
      new Set([[null, undefined]]),
      [null],
    ],
    [
      new Set([[null, undefined], [undefined, null], [undefined, undefined], [null, null]]),
      [null, undefined, undefined, null],
    ],
    [
      new Set([[1, 2], [2, 3], [3, 4]]),
      [1, 2, 3],
    ],
    [
      new Set([['bondage', 'b'], ['domination', 'd'], ['sadism', 's'], ['masochism', 'm']]),
      ['bondage', 'domination', 'sadism', 'masochism'],
    ],
    [
      new Set([['bondage', ['b']], ['domination', ['d']], ['sadism', ['s']], ['masochism', ['m']]]),
      ['bondage', 'domination', 'sadism', 'masochism'],
    ],
    [
      new Set([[['bondage'], ['b']], [['domination'], ['d']], [['sadism'], ['s']], [['masochism'], ['m']]]),
      [['bondage'], ['domination'], ['sadism'], ['masochism']],
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      new Map([]),
      [],
    ],
    [
      new Map([[1, 2]]),
      [1],
    ],
    [
      new Map([[undefined, null]]),
      [undefined],
    ],
    [
      new Map([[null, undefined]]),
      [null],
    ],
    [
      new Map([[null, undefined], [undefined, null]]),
      [null, undefined],
    ],
    [
      new Map([[1, 2], [2, 3], [3, 4]]),
      [1, 2, 3],
    ],
    [
      new Map([['bondage', 'b'], ['domination', 'd'], ['sadism', 's'], ['masochism', 'm']]),
      ['bondage', 'domination', 'sadism', 'masochism'],
    ],
    [
      new Map([['bondage', ['b']], ['domination', ['d']], ['sadism', ['s']], ['masochism', ['m']]]),
      ['bondage', 'domination', 'sadism', 'masochism'],
    ],
    [
      new Map([[['bondage'], ['b']], [['domination'], ['d']], [['sadism'], ['s']], [['masochism'], ['m']]]),
      [['bondage'], ['domination'], ['sadism'], ['masochism']],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([]),
      [],
    ],
    [
      createAsyncGeneratorFixture([[1, 2]]),
      [1],
    ],
    [
      createAsyncGeneratorFixture([[undefined, null]]),
      [undefined],
    ],
    [
      createAsyncGeneratorFixture([[null, undefined]]),
      [null],
    ],
    [
      createAsyncGeneratorFixture([[null, undefined], [undefined, null], [undefined, undefined], [null, null]]),
      [null, undefined, undefined, null],
    ],
    [
      createAsyncGeneratorFixture([[1, 2], [2, 3], [3, 4]]),
      [1, 2, 3],
    ],
    [
      createAsyncGeneratorFixture([['bondage', 'b'], ['domination', 'd'], ['sadism', 's'], ['masochism', 'm']]),
      ['bondage', 'domination', 'sadism', 'masochism'],
    ],
    [
      createAsyncGeneratorFixture([['bondage', ['b']], ['domination', ['d']], ['sadism', ['s']], ['masochism', ['m']]]),
      ['bondage', 'domination', 'sadism', 'masochism'],
    ],
    [
      createAsyncGeneratorFixture([[['bondage'], ['b']], [['domination'], ['d']], [['sadism'], ['s']], [['masochism'], ['m']]]),
      [['bondage'], ['domination'], ['sadism'], ['masochism']],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<unknown> {
  return [
    [
      createAsyncIterableFixture([]),
      [],
    ],
    [
      createAsyncIterableFixture([[1, 2]]),
      [1],
    ],
    [
      createAsyncIterableFixture([[undefined, null]]),
      [undefined],
    ],
    [
      createAsyncIterableFixture([[null, undefined]]),
      [null],
    ],
    [
      createAsyncIterableFixture([[null, undefined], [undefined, null], [undefined, undefined], [null, null]]),
      [null, undefined, undefined, null],
    ],
    [
      createAsyncIterableFixture([[1, 2], [2, 3], [3, 4]]),
      [1, 2, 3],
    ],
    [
      createAsyncIterableFixture([['bondage', 'b'], ['domination', 'd'], ['sadism', 's'], ['masochism', 'm']]),
      ['bondage', 'domination', 'sadism', 'masochism'],
    ],
    [
      createAsyncIterableFixture([['bondage', ['b']], ['domination', ['d']], ['sadism', ['s']], ['masochism', ['m']]]),
      ['bondage', 'domination', 'sadism', 'masochism'],
    ],
    [
      createAsyncIterableFixture([[['bondage'], ['b']], [['domination'], ['d']], [['sadism'], ['s']], [['masochism'], ['m']]]),
      [['bondage'], ['domination'], ['sadism'], ['masochism']],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<unknown> {
  return [
    [
      createAsyncIteratorFixture([]),
      [],
    ],
    [
      createAsyncIteratorFixture([[1, 2]]),
      [1],
    ],
    [
      createAsyncIteratorFixture([[undefined, null]]),
      [undefined],
    ],
    [
      createAsyncIteratorFixture([[null, undefined]]),
      [null],
    ],
    [
      createAsyncIteratorFixture([[null, undefined], [undefined, null], [undefined, undefined], [null, null]]),
      [null, undefined, undefined, null],
    ],
    [
      createAsyncIteratorFixture([[1, 2], [2, 3], [3, 4]]),
      [1, 2, 3],
    ],
    [
      createAsyncIteratorFixture([['bondage', 'b'], ['domination', 'd'], ['sadism', 's'], ['masochism', 'm']]),
      ['bondage', 'domination', 'sadism', 'masochism'],
    ],
    [
      createAsyncIteratorFixture([['bondage', ['b']], ['domination', ['d']], ['sadism', ['s']], ['masochism', ['m']]]),
      ['bondage', 'domination', 'sadism', 'masochism'],
    ],
    [
      createAsyncIteratorFixture([[['bondage'], ['b']], [['domination'], ['d']], [['sadism'], ['s']], [['masochism'], ['m']]]),
      [['bondage'], ['domination'], ['sadism'], ['masochism']],
    ],
  ];
}
