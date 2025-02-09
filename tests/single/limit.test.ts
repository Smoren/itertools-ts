import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture, createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture
  // @ts-ignore
} from "../fixture";
import { InvalidArgumentError, single } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])(
  "Single Limit Test",
  (input, limit, expected) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of single.limit(input, limit)) {
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
  "Single Limit Async Test",
  (input, limit, expected) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of single.limitAsync(input, limit)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForError(),
])(
  "Single Limit Error Test",
  (input, limit) => {
    it("", () => {
      expect(() => {
        // When
        for (const _ of single.limit(input, limit)) {
          break;
        }
      }).toThrow(InvalidArgumentError);
    });
  }
);

describe.each([
  ...dataProviderForErrorAsync(),
  ...dataProviderForError(),
])(
  "Single Limit Async Error Test",
  (input, limit) => {
    it("", async () => {
      try {
        // When
        for await (const _ of single.limitAsync(input, limit)) {
          break;
        }
        expect(false).toBeTruthy();
      } catch (e) {
        expect(e).toBeInstanceOf(InvalidArgumentError);
      }
    });
  }
);

function dataProviderForArrays(): Array<[Array<any>, number, Array<any>]> {
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

function dataProviderForGenerators(): Array<[Generator<any>, number, Array<any>]> {
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

function dataProviderForIterables(): Array<[Iterable<any>, number, Array<any>]> {
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

function dataProviderForIterators(): Array<[Iterator<any>, number, Array<any>]> {
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

function dataProviderForStrings(): Array<[string, number, Array<any>]> {
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

function dataProviderForSets(): Array<[Set<any>, number, Array<any>]> {
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

function dataProviderForMaps(): Array<[Map<any, any>, number, Array<any>]> {
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

function dataProviderForAsyncGenerators(): Array<[AsyncGenerator<any>, number, Array<any>]> {
  return [
    [
      createAsyncGeneratorFixture([]),
      0,
      [],
    ],
    [
      createAsyncGeneratorFixture([]),
      1,
      [],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      0,
      [],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      1,
      [0],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      2,
      [0, 1],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      3,
      [0, 1, 2],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      4,
      [0, 1, 2, 3],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      5,
      [0, 1, 2, 3, 4],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      6,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      7,
      [0, 1, 2, 3, 4, 5],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[AsyncIterable<any>, number, Array<any>]> {
  return [
    [
      createAsyncIterableFixture([]),
      0,
      [],
    ],
    [
      createAsyncIterableFixture([]),
      1,
      [],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      0,
      [],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      1,
      [0],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      2,
      [0, 1],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      3,
      [0, 1, 2],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      4,
      [0, 1, 2, 3],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      5,
      [0, 1, 2, 3, 4],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      6,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      7,
      [0, 1, 2, 3, 4, 5],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[AsyncIterator<any>, number, Array<any>]> {
  return [
    [
      createAsyncIteratorFixture([]),
      0,
      [],
    ],
    [
      createAsyncIteratorFixture([]),
      1,
      [],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      0,
      [],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      1,
      [0],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      2,
      [0, 1],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      3,
      [0, 1, 2],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      4,
      [0, 1, 2, 3],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      5,
      [0, 1, 2, 3, 4],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      6,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      7,
      [0, 1, 2, 3, 4, 5],
    ],
  ];
}

function dataProviderForError(): Array<[Iterable<any> | Iterator<any>, number]> {
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

function dataProviderForErrorAsync(): Array<[AsyncIterable<any> | AsyncIterator<any>, number]> {
  return [
    [
      createAsyncIterableFixture([]),
      -1,
    ],
    [
      createAsyncIterableFixture([1]),
      -1,
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      -2,
    ],
  ];
}
