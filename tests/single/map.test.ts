import { map } from '../../src/single';

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterators(),
])("Map test", (input, mapper, expected) => {
  it("", () => {
    // Given
    const result = [];

    // When
    for (const item of map(input as Iterable<unknown>, mapper as (datum: unknown) => unknown)) {
      result.push(item);
    }

    // Then
    expect(result).toEqual(expected);
  });
});

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [],
      (x: number) => x + 1,
      [],
    ],
    [
      [],
      'sqrt',
      [],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x + 1,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      ["IterToolsTS", "MathTS", "SubnetCalculator"],
      (x: string) => `${x} is great!`,
      ["IterToolsTS is great!", "MathTS is great!", "SubnetCalculator is great!"],
    ],
    [
      [1, 4, 9, 16, 25],
      (x: number) => Math.sqrt(x),
      [1, 2, 3, 4, 5],
    ],
    [
      [1, -2, 3, -4, 5],
      (x: number) => Math.abs(x),
      [1, 2, 3, 4, 5],
    ],
    [
      ['one', 'Two', 'ThReE', 'FOUR'],
      (x: string) => x.toUpperCase(),
      ['ONE', 'TWO', 'THREE', 'FOUR'],
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  function *wrap(data: Array<unknown>) {
    for (const datum of data) {
      yield datum;
    }
  }

  return [
    [
      wrap([]),
      (x: number) => x + 1,
      [],
    ],
    [
      wrap([]),
      'sqrt',
      [],
    ],
    [
      wrap([0, 1, 2, 3, 4, 5]),
      (x: number) => x,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x + 1,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      wrap(["IterToolsTS", "MathTS", "SubnetCalculator"]),
      (x: string) => `${x} is great!`,
      ["IterToolsTS is great!", "MathTS is great!", "SubnetCalculator is great!"],
    ],
    [
      wrap([1, 4, 9, 16, 25]),
      (x: number) => Math.sqrt(x),
      [1, 2, 3, 4, 5],
    ],
    [
      wrap([1, -2, 3, -4, 5]),
      (x: number) => Math.abs(x),
      [1, 2, 3, 4, 5],
    ],
    [
      wrap(['one', 'Two', 'ThReE', 'FOUR']),
      (x: string) => x.toUpperCase(),
      ['ONE', 'TWO', 'THREE', 'FOUR'],
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  function wrap<T>(data: Array<T>): Iterator<T> {
    let nextIndex = 0;
    return {
      next(): IteratorResult<T> {
        if (nextIndex < data.length) {
          return { value: data[nextIndex++], done: false };
        } else {
          return { value: nextIndex, done: true };
        }
      },
    };
  }

  return [
    [
      wrap([]),
      (x: number) => x + 1,
      [],
    ],
    [
      wrap([]),
      'sqrt',
      [],
    ],
    [
      wrap([0, 1, 2, 3, 4, 5]),
      (x: number) => x,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x + 1,
      [1, 2, 3, 4, 5, 6],
    ],
    [
      wrap(["IterToolsTS", "MathTS", "SubnetCalculator"]),
      (x: string) => `${x} is great!`,
      ["IterToolsTS is great!", "MathTS is great!", "SubnetCalculator is great!"],
    ],
    [
      wrap([1, 4, 9, 16, 25]),
      (x: number) => Math.sqrt(x),
      [1, 2, 3, 4, 5],
    ],
    [
      wrap([1, -2, 3, -4, 5]),
      (x: number) => Math.abs(x),
      [1, 2, 3, 4, 5],
    ],
    [
      wrap(['one', 'Two', 'ThReE', 'FOUR']),
      (x: string) => x.toUpperCase(),
      ['ONE', 'TWO', 'THREE', 'FOUR'],
    ],
  ];
}
