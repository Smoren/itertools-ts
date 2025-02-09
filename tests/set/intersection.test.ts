import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  // @ts-ignore
} from "../fixture";
import { set } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMixed(),
])(
  "Set Intersection Test",
  (input, expected) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of set.intersection(...input)) {
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
  ...dataProviderForMixed(),
])(
  "Set Intersection Async Test",
  (input, expected) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of set.intersectionAsync(...input)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<[Array<Array<any>>, Array<any>]> {
  return [
    // sets:
    [
      [],
      [],
    ],
    [
      [
        [],
      ],
      [],
    ],
    [
      [
        [],
        [],
      ],
      [],
    ],
    [
      [
        [],
        [],
        [],
      ],
      [],
    ],
    [
      [
        [1],
        [],
      ],
      [],
    ],
    [
      [
        [],
        [2],
      ],
      [],
    ],
    [
      [
        [2],
        [2],
      ],
      [2],
    ],
    [
      [
        [1, 2],
        [3, 4],
      ],
      [],
    ],
    [
      [
        [1, 2],
        [2, 3],
      ],
      [2],
    ],
    [
      [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
      ],
      [1, 2, 3, 4, 5],
    ],
    [
      [
        [1, 2, 3, 4, 5],
        [1, 2, 3, '4', '5'],
      ],
      [1, 2, 3],
    ],
    [
      [
        ['1', '2', '3', 4, 5],
        [1, 2, 3, '4', '5'],
      ],
      [],
    ],
    [
      [
        [null, 1, 2, 3, 100, null],
        [null, 0, 1, 2, 3, 4, null],
        [null, -1, 0, 1, 2, 3, 4, 5, null],
        [null, -2, -1, 0, 1, 2, 3, 4, 5, 6, null],
        [null, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, null],
      ],
      [null, 1, 2, 3, null],
    ],
    [
      [
        ['1', 2, '3.3', true, false],
        [true, '2', 3.3, '4', true],
      ],
      [true],
    ],
    [
      [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        ['1', '2', 3, 4, 5, 6, 7, '8', '9'],
        [1, 3, 5, 7, 9, 11],
      ],
      [3, 5, 7],
    ],
    // multisets:
    [
      [
        [1, 1, 2],
        [2, 2, 3],
      ],
      [2],
    ],
    [
      [
        [1, 1, 1, 3],
        [1, 1, 2],
      ],
      [1, 1],
    ],
    [
      [
        [1, 1, 2, 4],
        [1, 1, 1, 2, 3],
      ],
      [1, 1, 2],
    ],
    [
      [
        [1, 1, 2, 2, 1, 1],
        [2, 2, 1, 1, 2, 2],
      ],
      [2, 1, 2, 1],
    ],
    [
      [
        [1, 1, 2, 2, 1, 1],
        [2, 2, 1, 1, '2', '2'],
      ],
      [2, 1, 2, 1],
    ],
    [
      [
        [1, 1, 2, 2, 1, 1],
        [2, 2, '1', '1', 2, 2],
      ],
      [2, 2],
    ],
    [
      [
        [1, 1, 1, 1, 1],
        [1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
        [5, 5, 5, 5, 5, 1, 5, 5, 1],
      ],
      [1, 1],
    ],
    [
      [
        [1, 1, 1, 1, 'a'],
        [1, 2, 3, 4, 5, 'a', 2, 3, 4, 5],
        [5, 5, 5, 5, 5, 'a', 5, 5, 1],
      ],
      ['a', 1],
    ],
    [
      [
        ['l', 'l', 'm', 'n', 'p', 'q', 'q', 'r'],
        ['l', 'm', 'm', 'p', 'q', 'r', 'r', 'r', 'r']
      ],
      ['l', 'm', 'p', 'q', 'r'],
    ],
    [
      [
        [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
        [4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9],
      ],
      [4, 4, 5, 5, 6, 6],
    ],
    [
      [
        ['a', 'a', 'b', 'b', 'b', 'c', 'd', 'd'],
        ['b', 'b', 'c', 'c', 'c', 'd', 'd', 'e'],
      ],
      ['b', 'b', 'c', 'd', 'd'],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Array<Generator<any>>, Array<any>]> {
  return [
    // sets:
    [
      [],
      [],
    ],
    [
      [
        createGeneratorFixture([]),
      ],
      [],
    ],
    [
      [
        createGeneratorFixture([]),
        createGeneratorFixture([]),
      ],
      [],
    ],
    [
      [
        createGeneratorFixture([]),
        createGeneratorFixture([]),
        createGeneratorFixture([]),
      ],
      [],
    ],
    [
      [
        createGeneratorFixture([1]),
        createGeneratorFixture([]),
      ],
      [],
    ],
    [
      [
        createGeneratorFixture([]),
        createGeneratorFixture([2]),
      ],
      [],
    ],
    [
      [
        createGeneratorFixture([2]),
        createGeneratorFixture([2]),
      ],
      [2],
    ],
    [
      [
        createGeneratorFixture([1, 2]),
        createGeneratorFixture([3, 4]),
      ],
      [],
    ],
    [
      [
        createGeneratorFixture([1, 2]),
        createGeneratorFixture([2, 3]),
      ],
      [2],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3, 4, 5]),
        createGeneratorFixture([1, 2, 3, 4, 5]),
      ],
      [1, 2, 3, 4, 5],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3, 4, 5]),
        createGeneratorFixture([1, 2, 3, '4', '5']),
      ],
      [1, 2, 3],
    ],
    [
      [
        createGeneratorFixture(['1', '2', '3', 4, 5]),
        createGeneratorFixture([1, 2, 3, '4', '5']),
      ],
      [],
    ],
    [
      [
        createGeneratorFixture([null, 1, 2, 3, 100, null]),
        createGeneratorFixture([null, 0, 1, 2, 3, 4, null]),
        createGeneratorFixture([null, -1, 0, 1, 2, 3, 4, 5, null]),
        createGeneratorFixture([null, -2, -1, 0, 1, 2, 3, 4, 5, 6, null]),
        createGeneratorFixture([null, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, null]),
      ],
      [null, 1, 2, 3, null],
    ],
    [
      [
        createGeneratorFixture(['1', 2, '3.3', true, false]),
        createGeneratorFixture([true, '2', 3.3, '4', true]),
      ],
      [true],
    ],
    [
      [
        createGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        createGeneratorFixture(['1', '2', 3, 4, 5, 6, 7, '8', '9']),
        createGeneratorFixture([1, 3, 5, 7, 9, 11]),
      ],
      [3, 5, 7],
    ],
    // multisets:
    [
      [
        createGeneratorFixture([1, 1, 2]),
        createGeneratorFixture([2, 2, 3]),
      ],
      [2],
    ],
    [
      [
        createGeneratorFixture([1, 1, 1, 3]),
        createGeneratorFixture([1, 1, 2]),
      ],
      [1, 1],
    ],
    [
      [
        createGeneratorFixture([1, 1, 2, 4]),
        createGeneratorFixture([1, 1, 1, 2, 3]),
      ],
      [1, 1, 2],
    ],
    [
      [
        createGeneratorFixture([1, 1, 2, 2, 1, 1]),
        createGeneratorFixture([2, 2, 1, 1, 2, 2]),
      ],
      [2, 1, 2, 1],
    ],
    [
      [
        createGeneratorFixture([1, 1, 2, 2, 1, 1]),
        createGeneratorFixture([2, 2, 1, 1, '2', '2']),
      ],
      [2, 1, 2, 1],
    ],
    [
      [
        createGeneratorFixture([1, 1, 2, 2, 1, 1]),
        createGeneratorFixture([2, 2, '1', '1', 2, 2]),
      ],
      [2, 2],
    ],
    [
      [
        createGeneratorFixture([1, 1, 1, 1, 1]),
        createGeneratorFixture([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]),
        createGeneratorFixture([5, 5, 5, 5, 5, 1, 5, 5, 1]),
      ],
      [1, 1],
    ],
    [
      [
        createGeneratorFixture([1, 1, 1, 1, 'a']),
        createGeneratorFixture([1, 2, 3, 4, 5, 'a', 2, 3, 4, 5]),
        createGeneratorFixture([5, 5, 5, 5, 5, 'a', 5, 5, 1]),
      ],
      ['a', 1],
    ],
    [
      [
        createGeneratorFixture(['l', 'l', 'm', 'n', 'p', 'q', 'q', 'r']),
        createGeneratorFixture(['l', 'm', 'm', 'p', 'q', 'r', 'r', 'r', 'r']),
      ],
      ['l', 'm', 'p', 'q', 'r'],
    ],
    [
      [
        createGeneratorFixture([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]),
        createGeneratorFixture([4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9]),
      ],
      [4, 4, 5, 5, 6, 6],
    ],
    [
      [
        createGeneratorFixture(['a', 'a', 'b', 'b', 'b', 'c', 'd', 'd']),
        createGeneratorFixture(['b', 'b', 'c', 'c', 'c', 'd', 'd', 'e']),
      ],
      ['b', 'b', 'c', 'd', 'd'],
    ],
  ];
}

function dataProviderForIterables(): Array<[Array<Iterable<any>>, Array<any>]> {
  return [
    // sets:
    [
      [],
      [],
    ],
    [
      [
        createIterableFixture([]),
      ],
      [],
    ],
    [
      [
        createIterableFixture([]),
        createIterableFixture([]),
      ],
      [],
    ],
    [
      [
        createIterableFixture([]),
        createIterableFixture([]),
        createIterableFixture([]),
      ],
      [],
    ],
    [
      [
        createIterableFixture([1]),
        createIterableFixture([]),
      ],
      [],
    ],
    [
      [
        createIterableFixture([]),
        createIterableFixture([2]),
      ],
      [],
    ],
    [
      [
        createIterableFixture([2]),
        createIterableFixture([2]),
      ],
      [2],
    ],
    [
      [
        createIterableFixture([1, 2]),
        createIterableFixture([3, 4]),
      ],
      [],
    ],
    [
      [
        createIterableFixture([1, 2]),
        createIterableFixture([2, 3]),
      ],
      [2],
    ],
    [
      [
        createIterableFixture([1, 2, 3, 4, 5]),
        createIterableFixture([1, 2, 3, 4, 5]),
      ],
      [1, 2, 3, 4, 5],
    ],
    [
      [
        createIterableFixture([1, 2, 3, 4, 5]),
        createIterableFixture([1, 2, 3, '4', '5']),
      ],
      [1, 2, 3],
    ],
    [
      [
        createIterableFixture(['1', '2', '3', 4, 5]),
        createIterableFixture([1, 2, 3, '4', '5']),
      ],
      [],
    ],
    [
      [
        createIterableFixture([null, 1, 2, 3, 100, null]),
        createIterableFixture([null, 0, 1, 2, 3, 4, null]),
        createIterableFixture([null, -1, 0, 1, 2, 3, 4, 5, null]),
        createIterableFixture([null, -2, -1, 0, 1, 2, 3, 4, 5, 6, null]),
        createIterableFixture([null, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, null]),
      ],
      [null, 1, 2, 3, null],
    ],
    [
      [
        createIterableFixture(['1', 2, '3.3', true, false]),
        createIterableFixture([true, '2', 3.3, '4', true]),
      ],
      [true],
    ],
    [
      [
        createIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        createIterableFixture(['1', '2', 3, 4, 5, 6, 7, '8', '9']),
        createIterableFixture([1, 3, 5, 7, 9, 11]),
      ],
      [3, 5, 7],
    ],
    // multisets:
    [
      [
        createIterableFixture([1, 1, 2]),
        createIterableFixture([2, 2, 3]),
      ],
      [2],
    ],
    [
      [
        createIterableFixture([1, 1, 1, 3]),
        createIterableFixture([1, 1, 2]),
      ],
      [1, 1],
    ],
    [
      [
        createIterableFixture([1, 1, 2, 4]),
        createIterableFixture([1, 1, 1, 2, 3]),
      ],
      [1, 1, 2],
    ],
    [
      [
        createIterableFixture([1, 1, 2, 2, 1, 1]),
        createIterableFixture([2, 2, 1, 1, 2, 2]),
      ],
      [2, 1, 2, 1],
    ],
    [
      [
        createIterableFixture([1, 1, 2, 2, 1, 1]),
        createIterableFixture([2, 2, 1, 1, '2', '2']),
      ],
      [2, 1, 2, 1],
    ],
    [
      [
        createIterableFixture([1, 1, 2, 2, 1, 1]),
        createIterableFixture([2, 2, '1', '1', 2, 2]),
      ],
      [2, 2],
    ],
    [
      [
        createIterableFixture([1, 1, 1, 1, 1]),
        createIterableFixture([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]),
        createIterableFixture([5, 5, 5, 5, 5, 1, 5, 5, 1]),
      ],
      [1, 1],
    ],
    [
      [
        createIterableFixture([1, 1, 1, 1, 'a']),
        createIterableFixture([1, 2, 3, 4, 5, 'a', 2, 3, 4, 5]),
        createIterableFixture([5, 5, 5, 5, 5, 'a', 5, 5, 1]),
      ],
      ['a', 1],
    ],
    [
      [
        createIterableFixture(['l', 'l', 'm', 'n', 'p', 'q', 'q', 'r']),
        createIterableFixture(['l', 'm', 'm', 'p', 'q', 'r', 'r', 'r', 'r']),
      ],
      ['l', 'm', 'p', 'q', 'r'],
    ],
    [
      [
        createIterableFixture([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]),
        createIterableFixture([4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9]),
      ],
      [4, 4, 5, 5, 6, 6],
    ],
    [
      [
        createIterableFixture(['a', 'a', 'b', 'b', 'b', 'c', 'd', 'd']),
        createIterableFixture(['b', 'b', 'c', 'c', 'c', 'd', 'd', 'e']),
      ],
      ['b', 'b', 'c', 'd', 'd'],
    ],
  ];
}

function dataProviderForIterators(): Array<[Array<Iterator<any>>, Array<any>]> {
  return [
    // sets:
    [
      [],
      [],
    ],
    [
      [
        createIteratorFixture([]),
      ],
      [],
    ],
    [
      [
        createIteratorFixture([]),
        createIteratorFixture([]),
      ],
      [],
    ],
    [
      [
        createIteratorFixture([]),
        createIteratorFixture([]),
        createIteratorFixture([]),
      ],
      [],
    ],
    [
      [
        createIteratorFixture([1]),
        createIteratorFixture([]),
      ],
      [],
    ],
    [
      [
        createIteratorFixture([]),
        createIteratorFixture([2]),
      ],
      [],
    ],
    [
      [
        createIteratorFixture([2]),
        createIteratorFixture([2]),
      ],
      [2],
    ],
    [
      [
        createIteratorFixture([1, 2]),
        createIteratorFixture([3, 4]),
      ],
      [],
    ],
    [
      [
        createIteratorFixture([1, 2]),
        createIteratorFixture([2, 3]),
      ],
      [2],
    ],
    [
      [
        createIteratorFixture([1, 2, 3, 4, 5]),
        createIteratorFixture([1, 2, 3, 4, 5]),
      ],
      [1, 2, 3, 4, 5],
    ],
    [
      [
        createIteratorFixture([1, 2, 3, 4, 5]),
        createIteratorFixture([1, 2, 3, '4', '5']),
      ],
      [1, 2, 3],
    ],
    [
      [
        createIteratorFixture(['1', '2', '3', 4, 5]),
        createIteratorFixture([1, 2, 3, '4', '5']),
      ],
      [],
    ],
    [
      [
        createIteratorFixture([null, 1, 2, 3, 100, null]),
        createIteratorFixture([null, 0, 1, 2, 3, 4, null]),
        createIteratorFixture([null, -1, 0, 1, 2, 3, 4, 5, null]),
        createIteratorFixture([null, -2, -1, 0, 1, 2, 3, 4, 5, 6, null]),
        createIteratorFixture([null, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, null]),
      ],
      [null, 1, 2, 3, null],
    ],
    [
      [
        createIteratorFixture(['1', 2, '3.3', true, false]),
        createIteratorFixture([true, '2', 3.3, '4', true]),
      ],
      [true],
    ],
    [
      [
        createIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        createIteratorFixture(['1', '2', 3, 4, 5, 6, 7, '8', '9']),
        createIteratorFixture([1, 3, 5, 7, 9, 11]),
      ],
      [3, 5, 7],
    ],
    // multisets:
    [
      [
        createIteratorFixture([1, 1, 2]),
        createIteratorFixture([2, 2, 3]),
      ],
      [2],
    ],
    [
      [
        createIteratorFixture([1, 1, 1, 3]),
        createIteratorFixture([1, 1, 2]),
      ],
      [1, 1],
    ],
    [
      [
        createIteratorFixture([1, 1, 2, 4]),
        createIteratorFixture([1, 1, 1, 2, 3]),
      ],
      [1, 1, 2],
    ],
    [
      [
        createIteratorFixture([1, 1, 2, 2, 1, 1]),
        createIteratorFixture([2, 2, 1, 1, 2, 2]),
      ],
      [2, 1, 2, 1],
    ],
    [
      [
        createIteratorFixture([1, 1, 2, 2, 1, 1]),
        createIteratorFixture([2, 2, 1, 1, '2', '2']),
      ],
      [2, 1, 2, 1],
    ],
    [
      [
        createIteratorFixture([1, 1, 2, 2, 1, 1]),
        createIteratorFixture([2, 2, '1', '1', 2, 2]),
      ],
      [2, 2],
    ],
    [
      [
        createIteratorFixture([1, 1, 1, 1, 1]),
        createIteratorFixture([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]),
        createIteratorFixture([5, 5, 5, 5, 5, 1, 5, 5, 1]),
      ],
      [1, 1],
    ],
    [
      [
        createIteratorFixture([1, 1, 1, 1, 'a']),
        createIteratorFixture([1, 2, 3, 4, 5, 'a', 2, 3, 4, 5]),
        createIteratorFixture([5, 5, 5, 5, 5, 'a', 5, 5, 1]),
      ],
      ['a', 1],
    ],
    [
      [
        createIteratorFixture(['l', 'l', 'm', 'n', 'p', 'q', 'q', 'r']),
        createIteratorFixture(['l', 'm', 'm', 'p', 'q', 'r', 'r', 'r', 'r']),
      ],
      ['l', 'm', 'p', 'q', 'r'],
    ],
    [
      [
        createIteratorFixture([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]),
        createIteratorFixture([4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9]),
      ],
      [4, 4, 5, 5, 6, 6],
    ],
    [
      [
        createIteratorFixture(['a', 'a', 'b', 'b', 'b', 'c', 'd', 'd']),
        createIteratorFixture(['b', 'b', 'c', 'c', 'c', 'd', 'd', 'e']),
      ],
      ['b', 'b', 'c', 'd', 'd'],
    ],
  ];
}

function dataProviderForStrings(): Array<[Array<string>, Array<any>]> {
  return [
    // sets:
    [
      [],
      [],
    ],
    [
      [
        '',
      ],
      [],
    ],
    [
      [
        '',
        '',
      ],
      [],
    ],
    [
      [
        '',
        '',
        '',
      ],
      [],
    ],
    [
      [
        '1',
        '',
      ],
      [],
    ],
    [
      [
        '',
        '2',
      ],
      [],
    ],
    [
      [
        '2',
        '2',
      ],
      ['2'],
    ],
    [
      [
        '12',
        '34',
      ],
      [],
    ],
    [
      [
        '12',
        '23',
      ],
      ['2'],
    ],
    [
      [
        '12345',
        '12345',
      ],
      ['1', '2', '3', '4', '5'],
    ],
    [
      [
        '123z',
        '01234',
        'a012345',
        'ba0123456',
        'cba01234567',
      ],
      ['1', '2', '3'],
    ],
    // multisets:
    [
      [
        '112',
        '223',
      ],
      ['2'],
    ],
    [
      [
        '1113',
        '112',
      ],
      ['1', '1'],
    ],
    [
      [
        '1124',
        '11123',
      ],
      ['1', '1', '2'],
    ],
    [
      [
        '112211',
        '221122',
      ],
      ['2', '1', '2', '1'],
    ],
    [
      [
        '11111',
        '1234512345',
        '555551551',
      ],
      ['1', '1'],
    ],
    [
      [
        '1111a',
        '12345a2345',
        '55555a551',
      ],
      ['a', '1'],
    ],
    [
      [
        'llmnpqqr',
        'lmmpqrrrr',
      ],
      ['l', 'm', 'p', 'q', 'r'],
    ],
    [
      [
        '112233445566',
        '445566778899',
      ],
      ['4', '4', '5', '5', '6', '6'],
    ],
    [
      [
        'aabbbcdd',
        'bbcccdde',
      ],
      ['b', 'b', 'c', 'd', 'd'],
    ],
  ];
}

function dataProviderForSets(): Array<[Array<Set<any>>, Array<any>]> {
  return [
    // sets:
    [
      [],
      [],
    ],
    [
      [
        new Set([]),
      ],
      [],
    ],
    [
      [
        new Set([]),
        new Set([]),
      ],
      [],
    ],
    [
      [
        new Set([]),
        new Set([]),
        new Set([]),
      ],
      [],
    ],
    [
      [
        new Set([1]),
        new Set([]),
      ],
      [],
    ],
    [
      [
        new Set([]),
        new Set([2]),
      ],
      [],
    ],
    [
      [
        new Set([2]),
        new Set([2]),
      ],
      [2],
    ],
    [
      [
        new Set([1, 2]),
        new Set([3, 4]),
      ],
      [],
    ],
    [
      [
        new Set([1, 2]),
        new Set([2, 3]),
      ],
      [2],
    ],
    [
      [
        new Set([1, 2, 3, 4, 5]),
        new Set([1, 2, 3, 4, 5]),
      ],
      [1, 2, 3, 4, 5],
    ],
    [
      [
        new Set([1, 2, 3, 4, 5]),
        new Set([1, 2, 3, '4', '5']),
      ],
      [1, 2, 3],
    ],
    [
      [
        new Set(['1', '2', '3', 4, 5]),
        new Set([1, 2, 3, '4', '5']),
      ],
      [],
    ],
    [
      [
        new Set([null, 1, 2, 3, 100]),
        new Set([null, 0, 1, 2, 3, 4]),
        new Set([null, -1, 0, 1, 2, 3, 4, 5]),
        new Set([null, -2, -1, 0, 1, 2, 3, 4, 5, 6]),
        new Set([null, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7]),
      ],
      [null, 1, 2, 3],
    ],
    [
      [
        new Set(['1', 2, '3.3', true, false]),
        new Set([true, '2', 3.3, '4', true]),
      ],
      [true],
    ],
    [
      [
        new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        new Set(['1', '2', 3, 4, 5, 6, 7, '8', '9']),
        new Set([1, 3, 5, 7, 9, 11]),
      ],
      [3, 5, 7],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[Array<AsyncGenerator<any>>, Array<any>]> {
  return [
    // sets:
    [
      [],
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([]),
        createAsyncGeneratorFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([]),
        createAsyncGeneratorFixture([]),
        createAsyncGeneratorFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([1]),
        createAsyncGeneratorFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([]),
        createAsyncGeneratorFixture([2]),
      ],
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([2]),
        createAsyncGeneratorFixture([2]),
      ],
      [2],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2]),
        createAsyncGeneratorFixture([3, 4]),
      ],
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2]),
        createAsyncGeneratorFixture([2, 3]),
      ],
      [2],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
        createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
      ],
      [1, 2, 3, 4, 5],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
        createAsyncGeneratorFixture([1, 2, 3, '4', '5']),
      ],
      [1, 2, 3],
    ],
    [
      [
        createAsyncGeneratorFixture(['1', '2', '3', 4, 5]),
        createAsyncGeneratorFixture([1, 2, 3, '4', '5']),
      ],
      [],
    ],
    [
      [
        createAsyncGeneratorFixture([null, 1, 2, 3, 100, null]),
        createAsyncGeneratorFixture([null, 0, 1, 2, 3, 4, null]),
        createAsyncGeneratorFixture([null, -1, 0, 1, 2, 3, 4, 5, null]),
        createAsyncGeneratorFixture([null, -2, -1, 0, 1, 2, 3, 4, 5, 6, null]),
        createAsyncGeneratorFixture([null, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, null]),
      ],
      [null, 1, 2, 3, null],
    ],
    [
      [
        createAsyncGeneratorFixture(['1', 2, '3.3', true, false]),
        createAsyncGeneratorFixture([true, '2', 3.3, '4', true]),
      ],
      [true],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        createAsyncGeneratorFixture(['1', '2', 3, 4, 5, 6, 7, '8', '9']),
        createAsyncGeneratorFixture([1, 3, 5, 7, 9, 11]),
      ],
      [3, 5, 7],
    ],
    // multisets:
    [
      [
        createAsyncGeneratorFixture([1, 1, 2]),
        createAsyncGeneratorFixture([2, 2, 3]),
      ],
      [2],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 1, 1, 3]),
        createAsyncGeneratorFixture([1, 1, 2]),
      ],
      [1, 1],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 1, 2, 4]),
        createAsyncGeneratorFixture([1, 1, 1, 2, 3]),
      ],
      [1, 1, 2],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 1, 2, 2, 1, 1]),
        createAsyncGeneratorFixture([2, 2, 1, 1, 2, 2]),
      ],
      [2, 1, 2, 1],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 1, 2, 2, 1, 1]),
        createAsyncGeneratorFixture([2, 2, 1, 1, '2', '2']),
      ],
      [2, 1, 2, 1],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 1, 2, 2, 1, 1]),
        createAsyncGeneratorFixture([2, 2, '1', '1', 2, 2]),
      ],
      [2, 2],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 1, 1, 1, 1]),
        createAsyncGeneratorFixture([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]),
        createAsyncGeneratorFixture([5, 5, 5, 5, 5, 1, 5, 5, 1]),
      ],
      [1, 1],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 1, 1, 1, 'a']),
        createAsyncGeneratorFixture([1, 2, 3, 4, 5, 'a', 2, 3, 4, 5]),
        createAsyncGeneratorFixture([5, 5, 5, 5, 5, 'a', 5, 5, 1]),
      ],
      ['a', 1],
    ],
    [
      [
        createAsyncGeneratorFixture(['l', 'l', 'm', 'n', 'p', 'q', 'q', 'r']),
        createAsyncGeneratorFixture(['l', 'm', 'm', 'p', 'q', 'r', 'r', 'r', 'r']),
      ],
      ['l', 'm', 'p', 'q', 'r'],
    ],
    [
      [
        createAsyncGeneratorFixture([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]),
        createAsyncGeneratorFixture([4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9]),
      ],
      [4, 4, 5, 5, 6, 6],
    ],
    [
      [
        createAsyncGeneratorFixture(['a', 'a', 'b', 'b', 'b', 'c', 'd', 'd']),
        createAsyncGeneratorFixture(['b', 'b', 'c', 'c', 'c', 'd', 'd', 'e']),
      ],
      ['b', 'b', 'c', 'd', 'd'],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[Array<AsyncIterable<any>>, Array<any>]> {
  return [
    // sets:
    [
      [],
      [],
    ],
    [
      [
        createAsyncIterableFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncIterableFixture([]),
        createAsyncIterableFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncIterableFixture([]),
        createAsyncIterableFixture([]),
        createAsyncIterableFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncIterableFixture([1]),
        createAsyncIterableFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncIterableFixture([]),
        createAsyncIterableFixture([2]),
      ],
      [],
    ],
    [
      [
        createAsyncIterableFixture([2]),
        createAsyncIterableFixture([2]),
      ],
      [2],
    ],
    [
      [
        createAsyncIterableFixture([1, 2]),
        createAsyncIterableFixture([3, 4]),
      ],
      [],
    ],
    [
      [
        createAsyncIterableFixture([1, 2]),
        createAsyncIterableFixture([2, 3]),
      ],
      [2],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3, 4, 5]),
        createAsyncIterableFixture([1, 2, 3, 4, 5]),
      ],
      [1, 2, 3, 4, 5],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3, 4, 5]),
        createAsyncIterableFixture([1, 2, 3, '4', '5']),
      ],
      [1, 2, 3],
    ],
    [
      [
        createAsyncIterableFixture(['1', '2', '3', 4, 5]),
        createAsyncIterableFixture([1, 2, 3, '4', '5']),
      ],
      [],
    ],
    [
      [
        createAsyncIterableFixture([null, 1, 2, 3, 100, null]),
        createAsyncIterableFixture([null, 0, 1, 2, 3, 4, null]),
        createAsyncIterableFixture([null, -1, 0, 1, 2, 3, 4, 5, null]),
        createAsyncIterableFixture([null, -2, -1, 0, 1, 2, 3, 4, 5, 6, null]),
        createAsyncIterableFixture([null, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, null]),
      ],
      [null, 1, 2, 3, null],
    ],
    [
      [
        createAsyncIterableFixture(['1', 2, '3.3', true, false]),
        createAsyncIterableFixture([true, '2', 3.3, '4', true]),
      ],
      [true],
    ],
    [
      [
        createAsyncIterableFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        createAsyncIterableFixture(['1', '2', 3, 4, 5, 6, 7, '8', '9']),
        createAsyncIterableFixture([1, 3, 5, 7, 9, 11]),
      ],
      [3, 5, 7],
    ],
    // multisets:
    [
      [
        createAsyncIterableFixture([1, 1, 2]),
        createAsyncIterableFixture([2, 2, 3]),
      ],
      [2],
    ],
    [
      [
        createAsyncIterableFixture([1, 1, 1, 3]),
        createAsyncIterableFixture([1, 1, 2]),
      ],
      [1, 1],
    ],
    [
      [
        createAsyncIterableFixture([1, 1, 2, 4]),
        createAsyncIterableFixture([1, 1, 1, 2, 3]),
      ],
      [1, 1, 2],
    ],
    [
      [
        createAsyncIterableFixture([1, 1, 2, 2, 1, 1]),
        createAsyncIterableFixture([2, 2, 1, 1, 2, 2]),
      ],
      [2, 1, 2, 1],
    ],
    [
      [
        createAsyncIterableFixture([1, 1, 2, 2, 1, 1]),
        createAsyncIterableFixture([2, 2, 1, 1, '2', '2']),
      ],
      [2, 1, 2, 1],
    ],
    [
      [
        createAsyncIterableFixture([1, 1, 2, 2, 1, 1]),
        createAsyncIterableFixture([2, 2, '1', '1', 2, 2]),
      ],
      [2, 2],
    ],
    [
      [
        createAsyncIterableFixture([1, 1, 1, 1, 1]),
        createAsyncIterableFixture([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]),
        createAsyncIterableFixture([5, 5, 5, 5, 5, 1, 5, 5, 1]),
      ],
      [1, 1],
    ],
    [
      [
        createAsyncIterableFixture([1, 1, 1, 1, 'a']),
        createAsyncIterableFixture([1, 2, 3, 4, 5, 'a', 2, 3, 4, 5]),
        createAsyncIterableFixture([5, 5, 5, 5, 5, 'a', 5, 5, 1]),
      ],
      ['a', 1],
    ],
    [
      [
        createAsyncIterableFixture(['l', 'l', 'm', 'n', 'p', 'q', 'q', 'r']),
        createAsyncIterableFixture(['l', 'm', 'm', 'p', 'q', 'r', 'r', 'r', 'r']),
      ],
      ['l', 'm', 'p', 'q', 'r'],
    ],
    [
      [
        createAsyncIterableFixture([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]),
        createAsyncIterableFixture([4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9]),
      ],
      [4, 4, 5, 5, 6, 6],
    ],
    [
      [
        createAsyncIterableFixture(['a', 'a', 'b', 'b', 'b', 'c', 'd', 'd']),
        createAsyncIterableFixture(['b', 'b', 'c', 'c', 'c', 'd', 'd', 'e']),
      ],
      ['b', 'b', 'c', 'd', 'd'],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[Array<AsyncIterator<any>>, Array<any>]> {
  return [
    // sets:
    [
      [],
      [],
    ],
    [
      [
        createAsyncIteratorFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncIteratorFixture([]),
        createAsyncIteratorFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncIteratorFixture([]),
        createAsyncIteratorFixture([]),
        createAsyncIteratorFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncIteratorFixture([1]),
        createAsyncIteratorFixture([]),
      ],
      [],
    ],
    [
      [
        createAsyncIteratorFixture([]),
        createAsyncIteratorFixture([2]),
      ],
      [],
    ],
    [
      [
        createAsyncIteratorFixture([2]),
        createAsyncIteratorFixture([2]),
      ],
      [2],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2]),
        createAsyncIteratorFixture([3, 4]),
      ],
      [],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2]),
        createAsyncIteratorFixture([2, 3]),
      ],
      [2],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3, 4, 5]),
        createAsyncIteratorFixture([1, 2, 3, 4, 5]),
      ],
      [1, 2, 3, 4, 5],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3, 4, 5]),
        createAsyncIteratorFixture([1, 2, 3, '4', '5']),
      ],
      [1, 2, 3],
    ],
    [
      [
        createAsyncIteratorFixture(['1', '2', '3', 4, 5]),
        createAsyncIteratorFixture([1, 2, 3, '4', '5']),
      ],
      [],
    ],
    [
      [
        createAsyncIteratorFixture([null, 1, 2, 3, 100, null]),
        createAsyncIteratorFixture([null, 0, 1, 2, 3, 4, null]),
        createAsyncIteratorFixture([null, -1, 0, 1, 2, 3, 4, 5, null]),
        createAsyncIteratorFixture([null, -2, -1, 0, 1, 2, 3, 4, 5, 6, null]),
        createAsyncIteratorFixture([null, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, null]),
      ],
      [null, 1, 2, 3, null],
    ],
    [
      [
        createAsyncIteratorFixture(['1', 2, '3.3', true, false]),
        createAsyncIteratorFixture([true, '2', 3.3, '4', true]),
      ],
      [true],
    ],
    [
      [
        createAsyncIteratorFixture([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        createAsyncIteratorFixture(['1', '2', 3, 4, 5, 6, 7, '8', '9']),
        createAsyncIteratorFixture([1, 3, 5, 7, 9, 11]),
      ],
      [3, 5, 7],
    ],
    // multisets:
    [
      [
        createAsyncIteratorFixture([1, 1, 2]),
        createAsyncIteratorFixture([2, 2, 3]),
      ],
      [2],
    ],
    [
      [
        createAsyncIteratorFixture([1, 1, 1, 3]),
        createAsyncIteratorFixture([1, 1, 2]),
      ],
      [1, 1],
    ],
    [
      [
        createAsyncIteratorFixture([1, 1, 2, 4]),
        createAsyncIteratorFixture([1, 1, 1, 2, 3]),
      ],
      [1, 1, 2],
    ],
    [
      [
        createAsyncIteratorFixture([1, 1, 2, 2, 1, 1]),
        createAsyncIteratorFixture([2, 2, 1, 1, 2, 2]),
      ],
      [2, 1, 2, 1],
    ],
    [
      [
        createAsyncIteratorFixture([1, 1, 2, 2, 1, 1]),
        createAsyncIteratorFixture([2, 2, 1, 1, '2', '2']),
      ],
      [2, 1, 2, 1],
    ],
    [
      [
        createAsyncIteratorFixture([1, 1, 2, 2, 1, 1]),
        createAsyncIteratorFixture([2, 2, '1', '1', 2, 2]),
      ],
      [2, 2],
    ],
    [
      [
        createAsyncIteratorFixture([1, 1, 1, 1, 1]),
        createAsyncIteratorFixture([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]),
        createAsyncIteratorFixture([5, 5, 5, 5, 5, 1, 5, 5, 1]),
      ],
      [1, 1],
    ],
    [
      [
        createAsyncIteratorFixture([1, 1, 1, 1, 'a']),
        createAsyncIteratorFixture([1, 2, 3, 4, 5, 'a', 2, 3, 4, 5]),
        createAsyncIteratorFixture([5, 5, 5, 5, 5, 'a', 5, 5, 1]),
      ],
      ['a', 1],
    ],
    [
      [
        createAsyncIteratorFixture(['l', 'l', 'm', 'n', 'p', 'q', 'q', 'r']),
        createAsyncIteratorFixture(['l', 'm', 'm', 'p', 'q', 'r', 'r', 'r', 'r']),
      ],
      ['l', 'm', 'p', 'q', 'r'],
    ],
    [
      [
        createAsyncIteratorFixture([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]),
        createAsyncIteratorFixture([4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9]),
      ],
      [4, 4, 5, 5, 6, 6],
    ],
    [
      [
        createAsyncIteratorFixture(['a', 'a', 'b', 'b', 'b', 'c', 'd', 'd']),
        createAsyncIteratorFixture(['b', 'b', 'c', 'c', 'c', 'd', 'd', 'e']),
      ],
      ['b', 'b', 'c', 'd', 'd'],
    ],
  ];
}

function dataProviderForMixed(): Array<[Array<Iterable<any> | Iterator<any>>, Array<any>]> {
  return [
    [
      [
        [],
        createGeneratorFixture([]),
        createIterableFixture([]),
        new Set([]),
      ],
      [],
    ],
    [
      [
        [1, 1, 1, 1, 1],
        createGeneratorFixture([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]),
        createIteratorFixture([5, 5, 5, 5, 5, 1, 5, 5, 1]),
        '',
      ],
      [],
    ],
    [
      [
        [1, 1, 1, 1, 1],
        createGeneratorFixture([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]),
        createIterableFixture([5, 5, 5, 5, 5, 1, 5, 5, 1]),
        createIteratorFixture([5, 2, 5, 1, 1, 2]),
      ],
      [1, 1],
    ],
    [
      [
        [1, 1, 1, 1, '1'],
        createGeneratorFixture([1, 2, 3, 4, 5, '1', 2, 3, 4, 5]),
        createIteratorFixture([5, 5, 5, 5, 5, '1', 5, 5, 1]),
        createIterableFixture([5, 2, 5, 1, 1, 2]),
      ],
      [1],
    ],
  ];
}
