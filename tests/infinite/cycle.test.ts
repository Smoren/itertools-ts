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
import { infinite } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
] as Array<[Iterable<unknown>|Iterator<unknown>, number, Array<unknown>]>)(
  "Infinite Cycle Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    limit: number,
    expected: Array<unknown>
  ) => {
    it("", () => {
      // Given
      const result = [];

      // When
      let i = 0;
      for (const item of infinite.cycle(input)) {
        result.push(item);

        if (++i === limit) {
          break;
        }
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
] as Array<[
  AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  number,
  Array<unknown>
]>)(
  "Infinite Cycle Async Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    limit: number,
    expected: Array<unknown>
  ) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      let i = 0;
      for await (const item of infinite.cycleAsync(input)) {
        result.push(item);

        if (++i === limit) {
          break;
        }
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
      5,
      [],
    ],
    [
      [''],
      3,
      ['', '', ''],
    ],
    [
      [null],
      5,
      [null, null, null, null, null],
    ],
    [
      [0, 1, 2],
      10,
      [0, 1, 2, 0, 1, 2, 0, 1, 2, 0],
    ],
    [
      [1, 1],
      6,
      [1, 1, 1, 1, 1, 1],
    ],
    [
      ['0', '1', '2'],
      10,
      ['0', '1', '2', '0', '1', '2', '0', '1', '2', '0'],
    ],
    [
      [[], []],
      6,
      [[], [], [], [], [], []],
    ],
    [
      [[], [1]],
      6,
      [[], [1], [], [1], [], [1]],
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      5,
      [],
    ],
    [
      createGeneratorFixture(['']),
      3,
      ['', '', ''],
    ],
    [
      createGeneratorFixture([null]),
      5,
      [null, null, null, null, null],
    ],
    [
      createGeneratorFixture([0, 1, 2]),
      10,
      [0, 1, 2, 0, 1, 2, 0, 1, 2, 0],
    ],
    [
      createGeneratorFixture([1, 1]),
      6,
      [1, 1, 1, 1, 1, 1],
    ],
    [
      createGeneratorFixture(['0', '1', '2']),
      10,
      ['0', '1', '2', '0', '1', '2', '0', '1', '2', '0'],
    ],
    [
      createGeneratorFixture([[], []]),
      6,
      [[], [], [], [], [], []],
    ],
    [
      createGeneratorFixture([[], [1]]),
      6,
      [[], [1], [], [1], [], [1]],
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      5,
      [],
    ],
    [
      createIterableFixture(['']),
      3,
      ['', '', ''],
    ],
    [
      createIterableFixture([null]),
      5,
      [null, null, null, null, null],
    ],
    [
      createIterableFixture([0, 1, 2]),
      10,
      [0, 1, 2, 0, 1, 2, 0, 1, 2, 0],
    ],
    [
      createIterableFixture([1, 1]),
      6,
      [1, 1, 1, 1, 1, 1],
    ],
    [
      createIterableFixture(['0', '1', '2']),
      10,
      ['0', '1', '2', '0', '1', '2', '0', '1', '2', '0'],
    ],
    [
      createIterableFixture([[], []]),
      6,
      [[], [], [], [], [], []],
    ],
    [
      createIterableFixture([[], [1]]),
      6,
      [[], [1], [], [1], [], [1]],
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      5,
      [],
    ],
    [
      createIteratorFixture(['']),
      3,
      ['', '', ''],
    ],
    [
      createIteratorFixture([null]),
      5,
      [null, null, null, null, null],
    ],
    [
      createIteratorFixture([0, 1, 2]),
      10,
      [0, 1, 2, 0, 1, 2, 0, 1, 2, 0],
    ],
    [
      createIteratorFixture([1, 1]),
      6,
      [1, 1, 1, 1, 1, 1],
    ],
    [
      createIteratorFixture(['0', '1', '2']),
      10,
      ['0', '1', '2', '0', '1', '2', '0', '1', '2', '0'],
    ],
    [
      createIteratorFixture([[], []]),
      6,
      [[], [], [], [], [], []],
    ],
    [
      createIteratorFixture([[], [1]]),
      6,
      [[], [1], [], [1], [], [1]],
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      6,
      [],
    ],
    [
      '1',
      5,
      ['1', '1', '1', '1', '1'],
    ],
    [
      '11',
      6,
      ['1', '1', '1', '1', '1', '1'],
    ],
    [
      '123',
      7,
      ['1', '2', '3', '1', '2', '3', '1'],
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([]),
      5,
      [],
    ],
    [
      new Set(['']),
      3,
      ['', '', ''],
    ],
    [
      new Set([null]),
      5,
      [null, null, null, null, null],
    ],
    [
      new Set([0, 1, 2]),
      10,
      [0, 1, 2, 0, 1, 2, 0, 1, 2, 0],
    ],
    [
      new Set([1]),
      6,
      [1, 1, 1, 1, 1, 1],
    ],
    [
      new Set(['0', '1', '2']),
      10,
      ['0', '1', '2', '0', '1', '2', '0', '1', '2', '0'],
    ],
    [
      new Set([[], [1]]),
      6,
      [[], [1], [], [1], [], [1]],
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      5,
      [],
    ],
    [
      createMapFixture([1, 2, 3]),
      7,
      [[0, 1], [1, 2], [2, 3], [0, 1], [1, 2], [2, 3], [0, 1]],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([]),
      5,
      [],
    ],
    [
      createAsyncGeneratorFixture(['']),
      3,
      ['', '', ''],
    ],
    [
      createAsyncGeneratorFixture([null]),
      5,
      [null, null, null, null, null],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2]),
      10,
      [0, 1, 2, 0, 1, 2, 0, 1, 2, 0],
    ],
    [
      createAsyncGeneratorFixture([1, 1]),
      6,
      [1, 1, 1, 1, 1, 1],
    ],
    [
      createAsyncGeneratorFixture(['0', '1', '2']),
      10,
      ['0', '1', '2', '0', '1', '2', '0', '1', '2', '0'],
    ],
    [
      createAsyncGeneratorFixture([[], []]),
      6,
      [[], [], [], [], [], []],
    ],
    [
      createAsyncGeneratorFixture([[], [1]]),
      6,
      [[], [1], [], [1], [], [1]],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<unknown> {
  return [
    [
      createAsyncIterableFixture([]),
      5,
      [],
    ],
    [
      createAsyncIterableFixture(['']),
      3,
      ['', '', ''],
    ],
    [
      createAsyncIterableFixture([null]),
      5,
      [null, null, null, null, null],
    ],
    [
      createAsyncIterableFixture([0, 1, 2]),
      10,
      [0, 1, 2, 0, 1, 2, 0, 1, 2, 0],
    ],
    [
      createAsyncIterableFixture([1, 1]),
      6,
      [1, 1, 1, 1, 1, 1],
    ],
    [
      createAsyncIterableFixture(['0', '1', '2']),
      10,
      ['0', '1', '2', '0', '1', '2', '0', '1', '2', '0'],
    ],
    [
      createAsyncIterableFixture([[], []]),
      6,
      [[], [], [], [], [], []],
    ],
    [
      createAsyncIterableFixture([[], [1]]),
      6,
      [[], [1], [], [1], [], [1]],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<unknown> {
  return [
    [
      createAsyncIteratorFixture([]),
      5,
      [],
    ],
    [
      createAsyncIteratorFixture(['']),
      3,
      ['', '', ''],
    ],
    [
      createAsyncIteratorFixture([null]),
      5,
      [null, null, null, null, null],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2]),
      10,
      [0, 1, 2, 0, 1, 2, 0, 1, 2, 0],
    ],
    [
      createAsyncIteratorFixture([1, 1]),
      6,
      [1, 1, 1, 1, 1, 1],
    ],
    [
      createAsyncIteratorFixture(['0', '1', '2']),
      10,
      ['0', '1', '2', '0', '1', '2', '0', '1', '2', '0'],
    ],
    [
      createAsyncIteratorFixture([[], []]),
      6,
      [[], [], [], [], [], []],
    ],
    [
      createAsyncIteratorFixture([[], [1]]),
      6,
      [[], [1], [], [1], [], [1]],
    ],
  ];
}
