import { isIterable, toIterable } from '../../src/tools';
import { createGeneratorFixture, createIterableFixture } from '../fixture';
import { InvalidArgumentError } from '../../src/exceptions';

describe.each(dataProviderForSuccess())("To Iterable test success", (input, expected) => {
  it("", () => {
    // Given
    const iterable = toIterable(input as Iterable<unknown>|Iterator<unknown>);
    const result = [];

    // When
    for (const item of iterable) {
      result.push(item);
    }

    // Then
    expect(isIterable(iterable)).toBeTruthy();
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
  ];
}

describe.each(dataProviderForError())("To Iterable test error", (input) => {
  it("", () => {
    expect(() => {
      toIterable(input as Iterable<unknown>|Iterator<unknown>);
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
