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
  "Reduce To First Test",
  (input, expected) => {
    it("", () => {
      // When
      const result = reduce.toFirst(input);

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
  "Reduce To First Async Test",
  (input, expected) => {
    it("", async () => {
      // When
      const result = await reduce.toFirstAsync(input);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForError(),
])(
  "Reduce To First Error Test",
  (input) => {
    it("", () => {
      expect(() => {
        reduce.toFirst(input);
      }).toThrow(LengthError);
    });
  }
);

describe.each([
  ...dataProviderForError(),
  ...dataProviderForErrorAsync(),
])(
  "Reduce To First Error Test",
  (input) => {
    it("", async () => {
      try {
        await reduce.toFirstAsync(input);
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
      '',
    ],
    [
      [3, 2],
      3,
    ],
    [
      [1, 2, 3],
      1,
    ],
    [
      [1.1, 1.1, 2.1, 2.1, 3.1, 3.1],
      1.1,
    ],
    [
      [[1], '2', 3],
      [1],
    ],
    [
      [false, [1], '2', 3],
      false,
    ],
    [
      [true, [1], '2', 3],
      true,
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
      '',
    ],
    [
      createGeneratorFixture([3, 2]),
      3,
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      1,
    ],
    [
      createGeneratorFixture([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      1.1,
    ],
    [
      createGeneratorFixture([[1], '2', 3]),
      [1],
    ],
    [
      createGeneratorFixture([false, [1], '2', 3]),
      false,
    ],
    [
      createGeneratorFixture([true, [1], '2', 3]),
      true,
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
      '',
    ],
    [
      createIterableFixture([3, 2]),
      3,
    ],
    [
      createIterableFixture([1, 2, 3]),
      1,
    ],
    [
      createIterableFixture([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      1.1,
    ],
    [
      createIterableFixture([[1], '2', 3]),
      [1],
    ],
    [
      createIterableFixture([false, [1], '2', 3]),
      false,
    ],
    [
      createIterableFixture([true, [1], '2', 3]),
      true,
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
      '',
    ],
    [
      createIteratorFixture([3, 2]),
      3,
    ],
    [
      createIteratorFixture([1, 2, 3]),
      1,
    ],
    [
      createIteratorFixture([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      1.1,
    ],
    [
      createIteratorFixture([[1], '2', 3]),
      [1],
    ],
    [
      createIteratorFixture([false, [1], '2', 3]),
      false,
    ],
    [
      createIteratorFixture([true, [1], '2', 3]),
      true,
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
      '0',
    ],
    [
      '10',
      '1',
    ],
    [
      '32',
      '3',
    ],
    [
      '123',
      '1',
    ],
    [
      'abcdef',
      'a',
    ],
    [
      'fedcba',
      'f',
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
      '',
    ],
    [
      new Set([3, 2]),
      3,
    ],
    [
      new Set([1, 2, 3]),
      1,
    ],
    [
      new Set([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      1.1,
    ],
    [
      new Set([[1], '2', 3]),
      [1],
    ],
    [
      new Set([false, [1], '2', 3]),
      false,
    ],
    [
      new Set([true, [1], '2', 3]),
      true,
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
      [0, ''],
    ],
    [
      createMapFixture([3, 2]),
      [0, 3],
    ],
    [
      createMapFixture([1, 2, 3]),
      [0, 1],
    ],
    [
      createMapFixture([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      [0, 1.1],
    ],
    [
      createMapFixture([[1], '2', 3]),
      [0, [1]],
    ],
    [
      createMapFixture([false, [1], '2', 3]),
      [0, false],
    ],
    [
      createMapFixture([true, [1], '2', 3]),
      [0, true],
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
      '',
    ],
    [
      createAsyncGeneratorFixture([3, 2]),
      3,
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      1,
    ],
    [
      createAsyncGeneratorFixture([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      1.1,
    ],
    [
      createAsyncGeneratorFixture([[1], '2', 3]),
      [1],
    ],
    [
      createAsyncGeneratorFixture([false, [1], '2', 3]),
      false,
    ],
    [
      createAsyncGeneratorFixture([true, [1], '2', 3]),
      true,
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
      '',
    ],
    [
      createAsyncIterableFixture([3, 2]),
      3,
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      1,
    ],
    [
      createAsyncIterableFixture([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      1.1,
    ],
    [
      createAsyncIterableFixture([[1], '2', 3]),
      [1],
    ],
    [
      createAsyncIterableFixture([false, [1], '2', 3]),
      false,
    ],
    [
      createAsyncIterableFixture([true, [1], '2', 3]),
      true,
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
      '',
    ],
    [
      createAsyncIteratorFixture([3, 2]),
      3,
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      1,
    ],
    [
      createAsyncIteratorFixture([1.1, 1.1, 2.1, 2.1, 3.1, 3.1]),
      1.1,
    ],
    [
      createAsyncIteratorFixture([[1], '2', 3]),
      [1],
    ],
    [
      createAsyncIteratorFixture([false, [1], '2', 3]),
      false,
    ],
    [
      createAsyncIteratorFixture([true, [1], '2', 3]),
      true,
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
