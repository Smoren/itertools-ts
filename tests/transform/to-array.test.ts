import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture, createIteratorFixture
  // @ts-ignore
} from '../fixture';
import { transform } from '../../src';

describe.each(dataProvider())(
  "Transform To Array Test",
  (input, expected) => {
    it("", () => {
      // Given
      const result = transform.toArray(input);

      // Then
      expect(Array.isArray(result)).toBeTruthy();
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProvider(),
  ...dataProviderAsync(),
])(
  "Transform To Array Async Test",
  (input, expected) => {
    it("", async () => {
      // Given
      const result = await transform.toArrayAsync(input);

      // Then
      expect(Array.isArray(result)).toBeTruthy();
      expect(result).toEqual(expected);
    });
  }
);

function dataProvider(): Array<[Iterable<any> | Iterator<any>, Array<any>]> {
  return [
    [
      '',
      [],
    ],
    [
      '123',
      ['1', '2', '3'],
    ],
    [
      [],
      [],
    ],
    [
      [1, 2, 3],
      [1, 2, 3],
    ],
    [
      createGeneratorFixture([]),
      [],
    ],
    [
      createGeneratorFixture([1]),
      [1],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      [1, 2, 3],
    ],
    [
      createIterableFixture([]),
      [],
    ],
    [
      createIterableFixture([1]),
      [1],
    ],
    [
      createIterableFixture([1, 2, 3]),
      [1, 2, 3],
    ],
    [
      createIteratorFixture([]),
      [],
    ],
    [
      createIteratorFixture([1]),
      [1],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      [1, 2, 3],
    ],
    [
      new Set(),
      [],
    ],
    [
      new Set([1]),
      [1],
    ],
    [
      new Set([1, 2, 3]),
      [1, 2, 3],
    ],
    [
      new Map(),
      [],
    ],
    [
      new Map([['a', 1]]),
      [['a', 1]],
    ],
    [
      new Map([['a', 1], ['b', 2], ['c', 3]]),
      [['a', 1], ['b', 2], ['c', 3]],
    ],
  ];
}

function dataProviderAsync(): Array<[AsyncIterable<any> | AsyncIterator<any>, Array<any>]> {
  return [
    [
      createAsyncGeneratorFixture([]),
      [],
    ],
    [
      createAsyncGeneratorFixture([1]),
      [1],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      [1, 2, 3],
    ],
    [
      createAsyncIterableFixture([]),
      [],
    ],
    [
      createAsyncIterableFixture([1]),
      [1],
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      [1, 2, 3],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      [1, 2, 3],
    ],
    [
      createAsyncIteratorFixture([]),
      [],
    ],
    [
      createAsyncIteratorFixture([1]),
      [1],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      [1, 2, 3],
    ],
  ];
}
