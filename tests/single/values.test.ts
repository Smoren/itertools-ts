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
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])(
  "Single Values Test",
  (input, expected) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of single.values(input)) {
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
])(
  "Single Values Async Test",
  (input, expected) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of single.valuesAsync(input)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<[Array<[any, any]>, Array<any>]> {
  return [
    [
      [],
      [],
    ],
    [
      [[1, 2]],
      [2],
    ],
    [
      [[undefined, null]],
      [null],
    ],
    [
      [[null, undefined]],
      [undefined],
    ],
    [
      [[null, undefined], [undefined, null], [undefined, undefined], [null, null]],
      [undefined, null, undefined, null],
    ],
    [
      [[1, 2], [2, 3], [3, 4]],
      [2, 3, 4],
    ],
    [
      [['bondage', 'b'], ['domination', 'd'], ['sadism', 's'], ['masochism', 'm']],
      ['b', 'd', 's', 'm'],
    ],
    [
      [['bondage', ['b']], ['domination', ['d']], ['sadism', ['s']], ['masochism', ['m']]],
      [['b'], ['d'], ['s'], ['m']],
    ],
    [
      [[['bondage'], ['b']], [['domination'], ['d']], [['sadism'], ['s']], [['masochism'], ['m']]],
      [['b'], ['d'], ['s'], ['m']],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<[any, any]>, Array<any>]> {
  return [
    [
      createGeneratorFixture([]),
      [],
    ],
    [
      createGeneratorFixture([[1, 2]]),
      [2],
    ],
    [
      createGeneratorFixture([[undefined, null]]),
      [null],
    ],
    [
      createGeneratorFixture([[null, undefined]]),
      [undefined],
    ],
    [
      createGeneratorFixture([[null, undefined], [undefined, null], [undefined, undefined], [null, null]]),
      [undefined, null, undefined, null],
    ],
    [
      createGeneratorFixture([[1, 2], [2, 3], [3, 4]]),
      [2, 3, 4],
    ],
    [
      createGeneratorFixture([['bondage', 'b'], ['domination', 'd'], ['sadism', 's'], ['masochism', 'm']]),
      ['b', 'd', 's', 'm'],
    ],
    [
      createGeneratorFixture([['bondage', ['b']], ['domination', ['d']], ['sadism', ['s']], ['masochism', ['m']]]),
      [['b'], ['d'], ['s'], ['m']],
    ],
    [
      createGeneratorFixture([[['bondage'], ['b']], [['domination'], ['d']], [['sadism'], ['s']], [['masochism'], ['m']]]),
      [['b'], ['d'], ['s'], ['m']],
    ],
  ];
}

function dataProviderForIterables(): Array<[Iterable<[any, any]>, Array<any>]> {
  return [
    [
      createIterableFixture([]),
      [],
    ],
    [
      createIterableFixture([[1, 2]]),
      [2],
    ],
    [
      createIterableFixture([[undefined, null]]),
      [null],
    ],
    [
      createIterableFixture([[null, undefined]]),
      [undefined],
    ],
    [
      createIterableFixture([[null, undefined], [undefined, null], [undefined, undefined], [null, null]]),
      [undefined, null, undefined, null],
    ],
    [
      createIterableFixture([[1, 2], [2, 3], [3, 4]]),
      [2, 3, 4],
    ],
    [
      createIterableFixture([['bondage', 'b'], ['domination', 'd'], ['sadism', 's'], ['masochism', 'm']]),
      ['b', 'd', 's', 'm'],
    ],
    [
      createIterableFixture([['bondage', ['b']], ['domination', ['d']], ['sadism', ['s']], ['masochism', ['m']]]),
      [['b'], ['d'], ['s'], ['m']],
    ],
    [
      createIterableFixture([[['bondage'], ['b']], [['domination'], ['d']], [['sadism'], ['s']], [['masochism'], ['m']]]),
      [['b'], ['d'], ['s'], ['m']],
    ],
  ];
}

function dataProviderForIterators(): Array<[Iterator<[any, any]>, Array<any>]> {
  return [
    [
      createIteratorFixture([]),
      [],
    ],
    [
      createIteratorFixture([[1, 2]]),
      [2],
    ],
    [
      createIteratorFixture([[undefined, null]]),
      [null],
    ],
    [
      createIteratorFixture([[null, undefined]]),
      [undefined],
    ],
    [
      createIteratorFixture([[null, undefined], [undefined, null], [undefined, undefined], [null, null]]),
      [undefined, null, undefined, null],
    ],
    [
      createIteratorFixture([[1, 2], [2, 3], [3, 4]]),
      [2, 3, 4],
    ],
    [
      createIteratorFixture([['bondage', 'b'], ['domination', 'd'], ['sadism', 's'], ['masochism', 'm']]),
      ['b', 'd', 's', 'm'],
    ],
    [
      createIteratorFixture([['bondage', ['b']], ['domination', ['d']], ['sadism', ['s']], ['masochism', ['m']]]),
      [['b'], ['d'], ['s'], ['m']],
    ],
    [
      createIteratorFixture([[['bondage'], ['b']], [['domination'], ['d']], [['sadism'], ['s']], [['masochism'], ['m']]]),
      [['b'], ['d'], ['s'], ['m']],
    ],
  ];
}

function dataProviderForSets(): Array<[Set<[any, any]>, Array<any>]> {
  return [
    [
      new Set([]),
      [],
    ],
    [
      new Set([[1, 2]]),
      [2],
    ],
    [
      new Set([[undefined, null]]),
      [null],
    ],
    [
      new Set([[null, undefined]]),
      [undefined],
    ],
    [
      new Set([[null, undefined], [undefined, null], [undefined, undefined], [null, null]]),
      [undefined, null, undefined, null],
    ],
    [
      new Set([[1, 2], [2, 3], [3, 4]]),
      [2, 3, 4],
    ],
    [
      new Set([['bondage', 'b'], ['domination', 'd'], ['sadism', 's'], ['masochism', 'm']]),
      ['b', 'd', 's', 'm'],
    ],
    [
      new Set([['bondage', ['b']], ['domination', ['d']], ['sadism', ['s']], ['masochism', ['m']]]),
      [['b'], ['d'], ['s'], ['m']],
    ],
    [
      new Set([[['bondage'], ['b']], [['domination'], ['d']], [['sadism'], ['s']], [['masochism'], ['m']]]),
      [['b'], ['d'], ['s'], ['m']],
    ],
  ];
}

function dataProviderForMaps(): Array<[Map<any, any>, Array<any>]> {
  return [
    [
      createMapFixture([]),
      [],
    ],
    [
      createMapFixture([2]),
      [2],
    ],
    [
      createMapFixture([null]),
      [null],
    ],
    [
      createMapFixture([undefined]),
      [undefined],
    ],
    [
      createMapFixture([undefined, null, undefined, null]),
      [undefined, null, undefined, null],
    ],
    [
      createMapFixture([2, 3, 4]),
      [2, 3, 4],
    ],
    [
      createMapFixture(['b', 'd', 's', 'm']),
      ['b', 'd', 's', 'm'],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[AsyncGenerator<[any, any]>, Array<any>]> {
  return [
    [
      createAsyncGeneratorFixture([]),
      [],
    ],
    [
      createAsyncGeneratorFixture([[1, 2]]),
      [2],
    ],
    [
      createAsyncGeneratorFixture([[undefined, null]]),
      [null],
    ],
    [
      createAsyncGeneratorFixture([[null, undefined]]),
      [undefined],
    ],
    [
      createAsyncGeneratorFixture([[null, undefined], [undefined, null], [undefined, undefined], [null, null]]),
      [undefined, null, undefined, null],
    ],
    [
      createAsyncGeneratorFixture([[1, 2], [2, 3], [3, 4]]),
      [2, 3, 4],
    ],
    [
      createAsyncGeneratorFixture([['bondage', 'b'], ['domination', 'd'], ['sadism', 's'], ['masochism', 'm']]),
      ['b', 'd', 's', 'm'],
    ],
    [
      createAsyncGeneratorFixture([['bondage', ['b']], ['domination', ['d']], ['sadism', ['s']], ['masochism', ['m']]]),
      [['b'], ['d'], ['s'], ['m']],
    ],
    [
      createAsyncGeneratorFixture([[['bondage'], ['b']], [['domination'], ['d']], [['sadism'], ['s']], [['masochism'], ['m']]]),
      [['b'], ['d'], ['s'], ['m']],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[AsyncIterable<[any, any]>, Array<any>]> {
  return [
    [
      createAsyncIterableFixture([]),
      [],
    ],
    [
      createAsyncIterableFixture([[1, 2]]),
      [2],
    ],
    [
      createAsyncIterableFixture([[undefined, null]]),
      [null],
    ],
    [
      createAsyncIterableFixture([[null, undefined]]),
      [undefined],
    ],
    [
      createAsyncIterableFixture([[null, undefined], [undefined, null], [undefined, undefined], [null, null]]),
      [undefined, null, undefined, null],
    ],
    [
      createAsyncIterableFixture([[1, 2], [2, 3], [3, 4]]),
      [2, 3, 4],
    ],
    [
      createAsyncIterableFixture([['bondage', 'b'], ['domination', 'd'], ['sadism', 's'], ['masochism', 'm']]),
      ['b', 'd', 's', 'm'],
    ],
    [
      createAsyncIterableFixture([['bondage', ['b']], ['domination', ['d']], ['sadism', ['s']], ['masochism', ['m']]]),
      [['b'], ['d'], ['s'], ['m']],
    ],
    [
      createAsyncIterableFixture([[['bondage'], ['b']], [['domination'], ['d']], [['sadism'], ['s']], [['masochism'], ['m']]]),
      [['b'], ['d'], ['s'], ['m']],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[AsyncIterator<[any, any]>, Array<any>]> {
  return [
    [
      createAsyncIteratorFixture([]),
      [],
    ],
    [
      createAsyncIteratorFixture([[1, 2]]),
      [2],
    ],
    [
      createAsyncIteratorFixture([[undefined, null]]),
      [null],
    ],
    [
      createAsyncIteratorFixture([[null, undefined]]),
      [undefined],
    ],
    [
      createAsyncIteratorFixture([[null, undefined], [undefined, null], [undefined, undefined], [null, null]]),
      [undefined, null, undefined, null],
    ],
    [
      createAsyncIteratorFixture([[1, 2], [2, 3], [3, 4]]),
      [2, 3, 4],
    ],
    [
      createAsyncIteratorFixture([['bondage', 'b'], ['domination', 'd'], ['sadism', 's'], ['masochism', 'm']]),
      ['b', 'd', 's', 'm'],
    ],
    [
      createAsyncIteratorFixture([['bondage', ['b']], ['domination', ['d']], ['sadism', ['s']], ['masochism', ['m']]]),
      [['b'], ['d'], ['s'], ['m']],
    ],
    [
      createAsyncIteratorFixture([[['bondage'], ['b']], [['domination'], ['d']], [['sadism'], ['s']], [['masochism'], ['m']]]),
      [['b'], ['d'], ['s'], ['m']],
    ],
  ];
}
