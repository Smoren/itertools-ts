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
import { LengthError, reduce } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])(
  "Reduce To Last Test",
  (input, expected) => {
    it("", () => {
      // When
      const result = reduce.toLast(input);

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
  "Reduce To Last Async Test",
  (input, expected) => {
    it("", async () => {
      // When
      const result = await reduce.toLastAsync(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForError(),
])(
  "Reduce To Last Error Test",
  (input) => {
    it("", () => {
      expect(() => {
        reduce.toLast(input);
      }).toThrow(LengthError);
    });
  }
);

describe.each([
  ...dataProviderForError(),
  ...dataProviderForErrorAsync(),
])(
  "Reduce To Last Async Error Test",
  (input) => {
    it("", async () => {
      try {
        await reduce.toLastAsync(input);
        expect(false).toBeTruthy();
      } catch (e) {
        expect(e).toBeInstanceOf(LengthError);
      }
    });
  }
);

function dataProviderForArrays(): Array<[Array<any>, any]> {
  return [
    [
      [0],
      0,
    ],
    [
      [null],
      null,
    ],
    [
      [''],
      '',
    ],
    [
      ['', null],
      null,
    ],
    [
      [3, 2],
      2,
    ],
    [
      [1, 2, 3],
      3,
    ],
    [
      [1.1, 1.1, 2.1, 2.1, 3.1, 3.1],
      3.1,
    ],
    [
      [[1], '2', 3],
      3,
    ],
    [
      [false, [1], '2', 3],
      3,
    ],
    [
      [true, [1], '2', 3],
      3,
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<any>, any]> {
  return [
    [
      createGeneratorFixture([0]),
      0,
    ],
    [
      createGeneratorFixture([null]),
      null,
    ],
    [
      createGeneratorFixture(['']),
      '',
    ],
    [
      createGeneratorFixture(['', null]),
      null,
    ],
    [
      createGeneratorFixture([3, 2]),
      2,
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      3,
    ],
    [
      createGeneratorFixture([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      3.1,
    ],
    [
      createGeneratorFixture([[1], '2', 3]),
      3,
    ],
    [
      createGeneratorFixture([false, [1], '2', 3]),
      3,
    ],
    [
      createGeneratorFixture([true, [1], '2', 3]),
      3,
    ],
  ];
}

function dataProviderForIterables(): Array<[Iterable<any>, any]> {
  return [
    [
      createIterableFixture([0]),
      0,
    ],
    [
      createIterableFixture([null]),
      null,
    ],
    [
      createIterableFixture(['']),
      '',
    ],
    [
      createIterableFixture(['', null]),
      null,
    ],
    [
      createIterableFixture([3, 2]),
      2,
    ],
    [
      createIterableFixture([1, 2, 3]),
      3,
    ],
    [
      createIterableFixture([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      3.1,
    ],
    [
      createIterableFixture([[1], '2', 3]),
      3,
    ],
    [
      createIterableFixture([false, [1], '2', 3]),
      3,
    ],
    [
      createIterableFixture([true, [1], '2', 3]),
      3,
    ],
  ];
}

function dataProviderForIterators(): Array<[Iterator<any>, any]> {
  return [
    [
      createIteratorFixture([0]),
      0,
    ],
    [
      createIteratorFixture([null]),
      null,
    ],
    [
      createIteratorFixture(['']),
      '',
    ],
    [
      createIteratorFixture(['', null]),
      null,
    ],
    [
      createIteratorFixture([3, 2]),
      2,
    ],
    [
      createIteratorFixture([1, 2, 3]),
      3,
    ],
    [
      createIteratorFixture([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      3.1,
    ],
    [
      createIteratorFixture([[1], '2', 3]),
      3,
    ],
    [
      createIteratorFixture([false, [1], '2', 3]),
      3,
    ],
    [
      createIteratorFixture([true, [1], '2', 3]),
      3,
    ],
  ];
}

function dataProviderForStrings(): Array<[string, any]> {
  return [
    [
      '0',
      '0',
    ],
    [
      '01',
      '1',
    ],
    [
      '10',
      '0',
    ],
    [
      '32',
      '2',
    ],
    [
      '123',
      '3',
    ],
    [
      'abcdef',
      'f',
    ],
    [
      'fedcba',
      'a',
    ],
  ];
}

function dataProviderForSets(): Array<[Set<any>, any]> {
  return [
    [
      new Set([0]),
      0,
    ],
    [
      new Set([null]),
      null,
    ],
    [
      new Set(['']),
      '',
    ],
    [
      new Set(['', null]),
      null,
    ],
    [
      new Set([3, 2]),
      2,
    ],
    [
      new Set([1, 2, 3]),
      3,
    ],
    [
      new Set([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      3.1,
    ],
    [
      new Set([[1], '2', 3]),
      3,
    ],
    [
      new Set([false, [1], '2', 3]),
      3,
    ],
    [
      new Set([true, [1], '2', 3]),
      3,
    ],
  ];
}

function dataProviderForMaps(): Array<[Map<any, any>, any]> {
  return [
    [
      createMapFixture([0]),
      [0, 0],
    ],
    [
      createMapFixture([null]),
      [0, null],
    ],
    [
      createMapFixture(['']),
      [0, ''],
    ],
    [
      createMapFixture(['', null]),
      [1, null],
    ],
    [
      createMapFixture([3, 2]),
      [1, 2],
    ],
    [
      createMapFixture([1, 2, 3]),
      [2, 3],
    ],
    [
      createMapFixture([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      [5, 3.1],
    ],
    [
      createMapFixture([[1], '2', 3]),
      [2, 3],
    ],
    [
      createMapFixture([false, [1], '2', 3]),
      [3, 3],
    ],
    [
      createMapFixture([true, [1], '2', 3]),
      [3, 3],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[AsyncGenerator<any>, any]> {
  return [
    [
      createAsyncGeneratorFixture([0]),
      0,
    ],
    [
      createAsyncGeneratorFixture([null]),
      null,
    ],
    [
      createAsyncGeneratorFixture(['']),
      '',
    ],
    [
      createAsyncGeneratorFixture(['', null]),
      null,
    ],
    [
      createAsyncGeneratorFixture([3, 2]),
      2,
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      3,
    ],
    [
      createAsyncGeneratorFixture([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      3.1,
    ],
    [
      createAsyncGeneratorFixture([[1], '2', 3]),
      3,
    ],
    [
      createAsyncGeneratorFixture([false, [1], '2', 3]),
      3,
    ],
    [
      createAsyncGeneratorFixture([true, [1], '2', 3]),
      3,
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[AsyncIterable<any>, any]> {
  return [
    [
      createAsyncIterableFixture([0]),
      0,
    ],
    [
      createAsyncIterableFixture([null]),
      null,
    ],
    [
      createAsyncIterableFixture(['']),
      '',
    ],
    [
      createAsyncIterableFixture(['', null]),
      null,
    ],
    [
      createAsyncIterableFixture([3, 2]),
      2,
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      3,
    ],
    [
      createAsyncIterableFixture([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      3.1,
    ],
    [
      createAsyncIterableFixture([[1], '2', 3]),
      3,
    ],
    [
      createAsyncIterableFixture([false, [1], '2', 3]),
      3,
    ],
    [
      createAsyncIterableFixture([true, [1], '2', 3]),
      3,
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[AsyncIterator<any>, any]> {
  return [
    [
      createAsyncIteratorFixture([0]),
      0,
    ],
    [
      createAsyncIteratorFixture([null]),
      null,
    ],
    [
      createAsyncIteratorFixture(['']),
      '',
    ],
    [
      createAsyncIteratorFixture(['', null]),
      null,
    ],
    [
      createAsyncIteratorFixture([3, 2]),
      2,
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      3,
    ],
    [
      createAsyncIteratorFixture([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      3.1,
    ],
    [
      createAsyncIteratorFixture([[1], '2', 3]),
      3,
    ],
    [
      createAsyncIteratorFixture([false, [1], '2', 3]),
      3,
    ],
    [
      createAsyncIteratorFixture([true, [1], '2', 3]),
      3,
    ],
  ];
}

function dataProviderForError(): Array<[Iterable<any> | Iterator<any>]> {
  return [
    [
      [],
    ],
    [
      createGeneratorFixture([]),
    ],
    [
      createIterableFixture([]),
    ],
    [
      createIteratorFixture([]),
    ],
    [
      '',
    ],
    [
      new Set([]),
    ],
    [
      createMapFixture([]),
    ],
  ];
}

function dataProviderForErrorAsync(): Array<[AsyncIterable<any> | AsyncIterator<any>]> {
  return [
    [
      createAsyncGeneratorFixture([]),
    ],
    [
      createAsyncIterableFixture([]),
    ],
    [
      createAsyncIteratorFixture([]),
    ],
  ];
}
