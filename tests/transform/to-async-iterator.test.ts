import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture
  // @ts-ignore
} from '../fixture';
import { transform, summary, InvalidArgumentError } from '../../src';

describe.each(dataProviderForSuccess() as Array<[
  Iterable<unknown>|Iterator<unknown>|AsyncIterator<unknown>|AsyncIterable<unknown>,
  Array<unknown>
]>)(
  "Transform To Async Iterator Test Success",
  (
    input: Iterable<unknown>|Iterator<unknown>|AsyncIterator<unknown>|AsyncIterable<unknown>,
    expected: Array<unknown>
  ) => {
    it("", async () => {
      // Given
      const iterator = transform.toAsyncIterator(input as Iterable<unknown>|Iterator<unknown>);
      const result = [];

      // Then
      expect(summary.isIterator(iterator)).toBeTruthy();

      // And when
      for await (const item of transform.toAsyncIterable(iterator)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForSuccess(): Array<unknown> {
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

describe.each(dataProviderForError() as Array<[
  Iterable<unknown>|Iterator<unknown>|AsyncIterator<unknown>|AsyncIterable<unknown>
]>)(
  "Transform To Async Iterable Test Error",
  (input: Iterable<unknown>|Iterator<unknown>|AsyncIterator<unknown>|AsyncIterable<unknown>) => {
    it("", () => {
      expect(() => {
        transform.toAsyncIterator(input);
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
    [{a: 1}],
  ];
}
