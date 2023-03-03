// @ts-ignore
import { createGeneratorFixture, createIterableFixture } from '../fixture';
import { tools, InvalidArgumentError } from '../../src';

describe.each(dataProviderForSuccess())("Tools To Iterator Test Success", (input, expected) => {
  it("", () => {
    // Given
    const iterator = tools.toIterator(input as Iterable<unknown>|Iterator<unknown>);
    const result = [];

    // Then
    expect(tools.isIterator(iterator)).toBeTruthy();

    // And when
    for (const item of tools.toIterable(iterator)) {
      result.push(item);
    }

    // Then
    expect(result).toEqual(expected);
  });
});

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

describe.each(dataProviderForError())("Tools To Iterable Test Error", (input) => {
  it("", () => {
    expect(() => {
      tools.toIterator(input as Iterable<unknown>|Iterator<unknown>);
    }).toThrow(InvalidArgumentError);
  });
});

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
