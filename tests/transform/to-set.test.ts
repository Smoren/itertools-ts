import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture
  // @ts-ignore
} from '../fixture';
import { transform } from '../../src';

describe.each(dataProvider())(
  "Transform To Set Test",
  (input, expected) => {
    it("", () => {
      // Given
      const result = transform.toSet(input);

      // Then
      expect(result instanceof Set).toBeTruthy();
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProvider(),
  ...dataProviderAsync(),
])(
  "Transform To Set Async Test",
  (input, expected) => {
    it("", async () => {
      // Given
      const result = await transform.toSetAsync(input);

      // Then
      expect(result instanceof Set).toBeTruthy();
      expect(result).toEqual(expected);
    });
  }
);

function dataProvider(): Array<[Iterable<any> | Iterator<any>, Set<any>]> {
  return [
    [
      '',
      new Set([]),
    ],
    [
      '123',
      new Set(['1', '2', '3']),
    ],
    [
      '112233',
      new Set(['1', '2', '3']),
    ],
    [
      [],
      new Set([]),
    ],
    [
      [1, 2, 3],
      new Set([1, 2, 3]),
    ],
    [
      [1, 1, 2, 2, 3, 3],
      new Set([1, 2, 3]),
    ],
    [
      createGeneratorFixture([]),
      new Set([]),
    ],
    [
      createGeneratorFixture([1]),
      new Set([1]),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      new Set([1, 2, 3]),
    ],
    [
      createGeneratorFixture([1, 1, 2, 2, 3, 3]),
      new Set([1, 2, 3]),
    ],
    [
      createIterableFixture([]),
      new Set([]),
    ],
    [
      createIterableFixture([1]),
      new Set([1]),
    ],
    [
      createIterableFixture([1, 2, 3]),
      new Set([1, 2, 3]),
    ],
    [
      createIterableFixture([1, 1, 2, 2, 3, 3]),
      new Set([1, 2, 3]),
    ],
    [
      createIteratorFixture([]),
      new Set([]),
    ],
    [
      createIteratorFixture([1]),
      new Set([1]),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      new Set([1, 2, 3]),
    ],
    [
      createIteratorFixture([1, 1, 2, 2, 3, 3]),
      new Set([1, 2, 3]),
    ],
    [
      new Set(),
      new Set([]),
    ],
    [
      new Set([1]),
      new Set([1]),
    ],
    [
      new Set([1, 2, 3]),
      new Set([1, 2, 3]),
    ],
    [
      new Set([1, 1, 2, 2, 3, 3]),
      new Set([1, 2, 3]),
    ],
    [
      new Map(),
      new Set([]),
    ],
    [
      new Map([['a', 1]]),
      new Set([['a', 1]]),
    ],
    [
      new Map([['a', 1], ['b', 2], ['c', 3]]),
      new Set([['a', 1], ['b', 2], ['c', 3]]),
    ],
  ];
}

function dataProviderAsync(): Array<[AsyncIterable<any> | AsyncIterator<any>, Set<any>]> {
  return [
    [
      createAsyncGeneratorFixture([]),
      new Set([]),
    ],
    [
      createAsyncGeneratorFixture([1]),
      new Set([1]),
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      new Set([1, 2, 3]),
    ],
    [
      createAsyncGeneratorFixture([1, 1, 2, 2, 3, 3]),
      new Set([1, 2, 3]),
    ],
    [
      createAsyncIterableFixture([]),
      new Set([]),
    ],
    [
      createAsyncIterableFixture([1]),
      new Set([1]),
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      new Set([1, 2, 3]),
    ],
    [
      createAsyncIterableFixture([1, 1, 2, 2, 3, 3]),
      new Set([1, 2, 3]),
    ],
    [
      createAsyncIteratorFixture([]),
      new Set([]),
    ],
    [
      createAsyncIteratorFixture([1]),
      new Set([1]),
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      new Set([1, 2, 3]),
    ],
    [
      createAsyncIteratorFixture([1, 1, 2, 2, 3, 3]),
      new Set([1, 2, 3]),
    ],
  ];
}
