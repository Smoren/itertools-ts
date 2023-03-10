// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { single } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])("Single Values Test", (input, expected) => {
  it("", () => {
    // Given
    const result = [];

    // When
    for (const item of single.values(input as Iterable<[unknown, unknown]>)) {
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

function dataProviderForGenerators(): Array<unknown> {
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

function dataProviderForIterables(): Array<unknown> {
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

function dataProviderForIterators(): Array<unknown> {
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

function dataProviderForSets(): Array<unknown> {
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

function dataProviderForMaps(): Array<unknown> {
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
