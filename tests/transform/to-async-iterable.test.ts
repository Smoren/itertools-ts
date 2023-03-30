import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture
  // @ts-ignore
} from '../fixture';
import { transform, summary, InvalidArgumentError } from '../../src';

describe.each(dataProviderForSuccess() as Array<[AsyncIterable<unknown>|AsyncIterator<unknown>, Array<unknown>]>)(
  "Transform To Async Iterable Test Success",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>,
    expected: Array<unknown>
  ) => {
    it("", async () => {
      // Given
      const iterable = transform.toAsyncIterable(input);
      const result = [];

      // When
      for await (const item of iterable) {
        result.push(item);
      }

      // Then
      expect(summary.isAsyncIterable(iterable)).toBeTruthy();
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForSuccess(): Array<unknown> {
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
    [
      {},
      [],
    ],
    [
      {a: 1, b: 2, c: 3},
      [['a', 1], ['b', 2], ['c', 3]],
    ],
    [
      {a: [1], b: {x: 2}, c: 3},
      [['a', [1]], ['b', {x: 2}], ['c', 3]],
    ],
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

describe.each(dataProviderForError() as Array<[AsyncIterable<unknown>|AsyncIterator<unknown>]>)(
  "Transform To Iterable Test Error",
  (input: AsyncIterable<unknown>|AsyncIterator<unknown>) => {
    it("", () => {
      expect(() => {
        transform.toAsyncIterable(input);
      }).toThrow(InvalidArgumentError);
    });
  }
);

function dataProviderForError(): Array<unknown> {
  return [
    [1],
    [1.0],
    [true],
    [false],
    [null],
    [undefined],
    [NaN],
    [Infinity],
    [-Infinity],
  ];
}
