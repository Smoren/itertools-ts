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
])(
  "Infinite Cycle Test",
  (input, limit, expected) => {
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
])(
  "Infinite Cycle Async Test",
  (input, limit, expected) => {
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

function dataProviderForArrays(): Array<[Array<any>, number, Array<any>]> {
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

function dataProviderForGenerators(): Array<[Generator<any>, number, Array<any>]> {
  return dataProviderForArrays().map((x) => [
    createGeneratorFixture(x[0]),
    ...x.slice(1) as [number, Array<any>]
  ]);
}

function dataProviderForIterables(): Array<[Iterable<any>, number, Array<any>]> {
  return dataProviderForArrays().map((x) => [
    createIterableFixture(x[0]),
    ...x.slice(1) as [number, Array<any>]
  ]);
}

function dataProviderForIterators(): Array<[Iterator<any>, number, Array<any>]> {
  return dataProviderForArrays().map((x) => [
    createIteratorFixture(x[0]),
    ...x.slice(1) as [number, Array<any>]
  ]);
}

function dataProviderForStrings(): Array<[string, number, Array<string>]> {
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

function dataProviderForSets(): Array<[Set<any>, number, Array<any>]> {
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

function dataProviderForMaps(): Array<[Map<any, any>, number, Array<any>]> {
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

function dataProviderForAsync(): Array<[Array<any>, number, Array<any>]> {
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

function dataProviderForAsyncGenerators(): Array<[AsyncGenerator<any>, number, Array<any>]> {
  return dataProviderForAsync().map((x) => [
    createAsyncGeneratorFixture(x[0]),
    ...x.slice(1) as [number, Array<any>],
  ]);
}

function dataProviderForAsyncIterables(): Array<[AsyncIterable<any>, number, Array<any>]> {
  return dataProviderForAsync().map((x) => [
    createAsyncIterableFixture(x[0]),
    ...x.slice(1) as [number, Array<any>],
  ]);
}

function dataProviderForAsyncIterators(): Array<[AsyncIterator<any>, number, Array<any>]> {
  return dataProviderForAsync().map((x) => [
    createAsyncIteratorFixture(x[0]),
    ...x.slice(1) as [number, Array<any>],
  ]);
}
