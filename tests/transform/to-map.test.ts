import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  // @ts-ignore
} from '../fixture';
import { transform, single } from '../../src';

describe.each(dataProvider() as Array<[
  Iterable<[unknown, unknown]>|Iterator<[unknown, unknown]>|Record<string, unknown>,
  Map<unknown, unknown>
]>)(
  "Transform To Map Test",
  (
    input: Iterable<[unknown, unknown]>|Iterator<[unknown, unknown]>|Record<string, unknown>,
    expected: Map<unknown, unknown>
  ) => {
    it("", () => {
      // Given
      const result = transform.toMap(input);

      // Then
      expect(result instanceof Map).toBeTruthy();
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProvider(),
  ...dataProviderAsync(),
] as Array<[
  AsyncIterable<[unknown, unknown]>|AsyncIterator<[unknown, unknown]>|Iterable<[unknown, unknown]>|Iterator<[unknown, unknown]>|Record<string, unknown>,
  Map<unknown, unknown>
]>)(
  "Transform To Map Async Test",
  (
    input: AsyncIterable<[unknown, unknown]>|AsyncIterator<[unknown, unknown]>|Iterable<[unknown, unknown]>|Iterator<[unknown, unknown]>|Record<string, unknown>,
    expected: Map<unknown, unknown>
  ) => {
    it("", async () => {
      // Given
      const result = await transform.toMapAsync(input);

      // Then
      expect(result instanceof Map).toBeTruthy();
      expect(result).toEqual(expected);
    });
  }
);

function dataProvider(): Array<unknown> {
  return [
    [
      single.enumerate(''),
      new Map([]),
    ],
    [
      single.enumerate('123'),
      new Map([[0, '1'], [1, '2'], [2, '3']]),
    ],
    [
      [],
      new Map([]),
    ],
    [
      [['a', 1], ['b', 2], ['c', 3]],
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
    [
      createGeneratorFixture([]),
      new Map([]),
    ],
    [
      createGeneratorFixture([['a', 1]]),
      new Map([['a', 1]]),
    ],
    [
      createGeneratorFixture([[1, 1], [2, 2], [3, 3]]),
      new Map([[1, 1], [2, 2], [3, 3]]),
    ],
    [
      createIterableFixture([]),
      new Map([]),
    ],
    [
      createIterableFixture([[0, 1]]),
      new Map([[0, 1]]),
    ],
    [
      createIterableFixture([[1, 1], [2, 2], [3, 3]]),
      new Map([[1, 1], [2, 2], [3, 3]]),
    ],
    [
      createIteratorFixture([]),
      new Map([]),
    ],
    [
      createIteratorFixture([[0, 1]]),
      new Map([[0, 1]]),
    ],
    [
      createIteratorFixture([[1, 1], [2, 2], [3, 3]]),
      new Map([[1, 1], [2, 2], [3, 3]]),
    ],
    [
      new Set(),
      new Map(),
    ],
    [
      new Set([['a', 1]]),
      new Map([['a', 1]]),
    ],
    [
      new Set([['a', 1], ['a', 1], ['a', 1]]),
      new Map([['a', 1]]),
    ],
    [
      new Set([[1, 1], [2, 2], [3, 3]]),
      new Map([[1, 1], [2, 2], [3, 3]]),
    ],
    [
      new Map(),
      new Map(),
    ],
    [
      new Map([['a', 1]]),
      new Map([['a', 1]]),
    ],
    [
      new Map([['a', 1], ['b', 2], ['c', 3]]),
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
    [
      {a: 1},
      new Map([['a', 1]]),
    ],
    [
      {a: 1, b: 2, c: 3},
      new Map([['a', 1], ['b', 2], ['c', 3]]),
    ],
  ];
}

function dataProviderAsync(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([]),
      new Map([]),
    ],
    [
      createAsyncGeneratorFixture([['a', 1]]),
      new Map([['a', 1]]),
    ],
    [
      createAsyncGeneratorFixture([[1, 1], [2, 2], [3, 3]]),
      new Map([[1, 1], [2, 2], [3, 3]]),
    ],
    [
      createAsyncIterableFixture([]),
      new Map([]),
    ],
    [
      createAsyncIterableFixture([[0, 1]]),
      new Map([[0, 1]]),
    ],
    [
      createAsyncIterableFixture([[1, 1], [2, 2], [3, 3]]),
      new Map([[1, 1], [2, 2], [3, 3]]),
    ],
    [
      createAsyncIteratorFixture([]),
      new Map([]),
    ],
    [
      createAsyncIteratorFixture([[0, 1]]),
      new Map([[0, 1]]),
    ],
    [
      createAsyncIteratorFixture([[1, 1], [2, 2], [3, 3]]),
      new Map([[1, 1], [2, 2], [3, 3]]),
    ],
  ];
}
