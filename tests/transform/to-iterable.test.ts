// @ts-ignore
import { createGeneratorFixture, createIterableFixture } from '../fixture';
import { transform, summary, InvalidArgumentError } from '../../src';

describe.each(dataProviderForSuccess())(
  "Transform To Iterable Test Success",
  (input, expected) => {
    it("", () => {
      // Given
      const iterable = transform.toIterable(input);
      const result = [];

      // When
      for (const item of iterable) {
        result.push(item);
      }

      // Then
      expect(summary.isIterable(iterable)).toBeTruthy();
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForSuccess(): Array<[Iterable<any> | Iterator<any> | Record<any, any>, Array<any>]> {
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
  ];
}

describe.each(dataProviderForError())(
  "Transform To Iterable Test Error",
  (input) => {
    it("", () => {
      expect(() => {
        transform.toIterable(input);
      }).toThrow(InvalidArgumentError);
    });
  }
);

function dataProviderForError(): Array<[any]> {
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
