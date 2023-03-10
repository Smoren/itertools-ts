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
])("Single Keys Test", (input, expected) => {
  it("", () => {
    // Given
    const result = [];

    // When
    for (const item of single.keys(input as Iterable<[unknown, unknown]>)) {
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
