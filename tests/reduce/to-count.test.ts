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
import { reduce } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])(
  "Reduce To Count Test",
  (input, expected) => {
    it("", () => {
      // When
      const result = reduce.toCount(input);

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
  "Reduce To Count Async Test",
  (input, expected) => {
    it("", async () => {
      // When
      const result = await reduce.toCountAsync(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<[Array<any>, number]> {
  return [
    [
      [],
      0,
    ],
    [
      [0],
      1,
    ],
    [
      [null],
      1,
    ],
    [
      [''],
      1,
    ],
    [
      ['', null],
      2,
    ],
    [
      [1, 2, 3],
      3,
    ],
    [
      [[1], '2', 3],
      3,
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<any>, number]> {
  return [
    [
      createGeneratorFixture([]),
      0,
    ],
    [
      createGeneratorFixture([0]),
      1,
    ],
    [
      createGeneratorFixture([null]),
      1,
    ],
    [
      createGeneratorFixture(['']),
      1,
    ],
    [
      createGeneratorFixture(['', null]),
      2,
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      3,
    ],
    [
      createGeneratorFixture([[1], '2', 3]),
      3,
    ],
  ];
}

function dataProviderForIterables(): Array<[Iterable<any>, number]> {
  return [
    [
      createIterableFixture([]),
      0,
    ],
    [
      createIterableFixture([0]),
      1,
    ],
    [
      createIterableFixture([null]),
      1,
    ],
    [
      createIterableFixture(['']),
      1,
    ],
    [
      createIterableFixture(['', null]),
      2,
    ],
    [
      createIterableFixture([1, 2, 3]),
      3,
    ],
    [
      createIterableFixture([[1], '2', 3]),
      3,
    ],
  ];
}

function dataProviderForIterators(): Array<[Iterator<any>, number]> {
  return [
    [
      createIteratorFixture([]),
      0,
    ],
    [
      createIteratorFixture([0]),
      1,
    ],
    [
      createIteratorFixture([null]),
      1,
    ],
    [
      createIteratorFixture(['']),
      1,
    ],
    [
      createIteratorFixture(['', null]),
      2,
    ],
    [
      createIteratorFixture([1, 2, 3]),
      3,
    ],
    [
      createIteratorFixture([[1], '2', 3]),
      3,
    ],
  ];
}

function dataProviderForStrings(): Array<[string, number]> {
  return [
    [
      '',
      0,
    ],
    [
      '0',
      1,
    ],
    [
      '1',
      1,
    ],
    [
      'a',
      1,
    ],
    [
      '12',
      2,
    ],
    [
      '123',
      3,
    ],
    [
      'abc',
      3,
    ],
  ];
}

function dataProviderForSets(): Array<[Set<any>, number]> {
  return [
    [
      new Set([]),
      0,
    ],
    [
      new Set([0]),
      1,
    ],
    [
      new Set([null]),
      1,
    ],
    [
      new Set(['']),
      1,
    ],
    [
      new Set(['', null]),
      2,
    ],
    [
      new Set([1, 2, 3]),
      3,
    ],
    [
      new Set([[1], '2', 3]),
      3,
    ],
  ];
}

function dataProviderForMaps(): Array<[Map<any, any>, number]> {
  return [
    [
      createMapFixture([]),
      0,
    ],
    [
      createMapFixture([0]),
      1,
    ],
    [
      createMapFixture([null]),
      1,
    ],
    [
      createMapFixture(['']),
      1,
    ],
    [
      createMapFixture(['', null]),
      2,
    ],
    [
      createMapFixture([1, 2, 3]),
      3,
    ],
    [
      createMapFixture([[1], '2', 3]),
      3,
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[AsyncGenerator<any>, number]> {
  return [
    [
      createAsyncGeneratorFixture([]),
      0,
    ],
    [
      createAsyncGeneratorFixture([0]),
      1,
    ],
    [
      createAsyncGeneratorFixture([null]),
      1,
    ],
    [
      createAsyncGeneratorFixture(['']),
      1,
    ],
    [
      createAsyncGeneratorFixture(['', null]),
      2,
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      3,
    ],
    [
      createAsyncGeneratorFixture([[1], '2', 3]),
      3,
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[AsyncIterable<any>, number]> {
  return [
    [
      createAsyncIterableFixture([]),
      0,
    ],
    [
      createAsyncIterableFixture([0]),
      1,
    ],
    [
      createAsyncIterableFixture([null]),
      1,
    ],
    [
      createAsyncIterableFixture(['']),
      1,
    ],
    [
      createAsyncIterableFixture(['', null]),
      2,
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      3,
    ],
    [
      createAsyncIterableFixture([[1], '2', 3]),
      3,
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[AsyncIterator<any>, number]> {
  return [
    [
      createAsyncIteratorFixture([]),
      0,
    ],
    [
      createAsyncIteratorFixture([0]),
      1,
    ],
    [
      createAsyncIteratorFixture([null]),
      1,
    ],
    [
      createAsyncIteratorFixture(['']),
      1,
    ],
    [
      createAsyncIteratorFixture(['', null]),
      2,
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      3,
    ],
    [
      createAsyncIteratorFixture([[1], '2', 3]),
      3,
    ],
  ];
}
