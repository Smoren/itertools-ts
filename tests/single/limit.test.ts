// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { InvalidArgumentError, single } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])("Single Limit Test", (input, limit, expected) => {
  it("", () => {
    // Given
    const result = [];

    // When
    for (const item of single.limit(input as Iterable<unknown>, limit as number)) {
      result.push(item);
    }

    // Then
    expect(result).toEqual(expected);
  });
});

describe.each([
  ...dataProviderForError(),
])("Single Limit Error Test", (input, limit) => {
  it("", () => {
    expect(() => {
      // When
      for (const _ of single.limit(input as Iterable<unknown>, limit as number)) {
        break;
      }
    }).toThrow(InvalidArgumentError);
  });
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
      [0, 1, 2, 3, 4, 5],
      0,
      [],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      1,
      [0],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      2,
      [0, 1],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      3,
      [0, 1, 2],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      4,
      [0, 1, 2, 3],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      5,
      [0, 1, 2, 3, 4],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      6,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      7,
      [0, 1, 2, 3, 4, 5],
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
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      0,
      [],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      1,
      [0],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      2,
      [0, 1],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      3,
      [0, 1, 2],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      4,
      [0, 1, 2, 3],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      5,
      [0, 1, 2, 3, 4],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      6,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      7,
      [0, 1, 2, 3, 4, 5],
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
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      0,
      [],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      1,
      [0],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      2,
      [0, 1],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      3,
      [0, 1, 2],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      4,
      [0, 1, 2, 3],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      5,
      [0, 1, 2, 3, 4],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      6,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      7,
      [0, 1, 2, 3, 4, 5],
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
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      0,
      [],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      1,
      [0],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      2,
      [0, 1],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      3,
      [0, 1, 2],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      4,
      [0, 1, 2, 3],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      5,
      [0, 1, 2, 3, 4],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      6,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      7,
      [0, 1, 2, 3, 4, 5],
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
      '012345',
      0,
      [],
    ],
    [
      '012345',
      1,
      ['0'],
    ],
    [
      '012345',
      2,
      ['0', '1'],
    ],
    [
      '012345',
      3,
      ['0', '1', '2'],
    ],
    [
      '012345',
      4,
      ['0', '1', '2', '3'],
    ],
    [
      '012345',
      5,
      ['0', '1', '2', '3', '4'],
    ],
    [
      '012345',
      6,
      ['0', '1', '2', '3', '4', '5'],
    ],
    [
      '012345',
      7,
      ['0', '1', '2', '3', '4', '5'],
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
      new Set([0, 1, 2, 3, 4, 5]),
      0,
      [],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      1,
      [0],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      2,
      [0, 1],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      3,
      [0, 1, 2],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      4,
      [0, 1, 2, 3],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      5,
      [0, 1, 2, 3, 4],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      6,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      7,
      [0, 1, 2, 3, 4, 5],
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
      createMapFixture([0, 1, 2, 3, 4, 5]),
      0,
      [],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      1,
      [[0, 0]],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      2,
      [[0, 0], [1, 1]],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      3,
      [[0, 0], [1, 1], [2, 2]],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      4,
      [[0, 0], [1, 1], [2, 2], [3, 3]],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      5,
      [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      6,
      [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      7,
      [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]],
    ],
  ];
}

function dataProviderForError(): Array<unknown> {
  return [
    [
      [],
      -1,
    ],
    [
      [1],
      -1,
    ],
    [
      [1, 2, 3],
      -2,
    ],
  ];
}
