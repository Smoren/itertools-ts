// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { Stream } from '../../src';

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])("Stream Single Test", (input, streamFactory, expected) => {
  it("", () => {
    // Given
    const result = (streamFactory as (data: unknown) => Stream)(input);

    // Then
    expect(result).toEqual(expected);
  });
});

function dataProviderForArrays(): Array<unknown> {
  return [
    [
      [],
      () => Stream.ofEmpty()
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      [1],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2],
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      ['a', 'b', 'c'],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      [[1], [2], [3]],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as Array<number>)[0])
        .toArray(),
      [1, 2, 3],
    ],
  ];
}

function dataProviderForGenerators(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      () => Stream.ofEmpty()
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      createGeneratorFixture([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2],
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      createGeneratorFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      createGeneratorFixture([[1], [2], [3]]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as Array<number>)[0])
        .toArray(),
      [1, 2, 3],
    ],
  ];
}

function dataProviderForIterables(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      () => Stream.ofEmpty()
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      createIterableFixture([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2],
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      createIterableFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      createIterableFixture([[1], [2], [3]]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as Array<number>)[0])
        .toArray(),
      [1, 2, 3],
    ],
  ];
}

function dataProviderForIterators(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      () => Stream.ofEmpty()
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      createIteratorFixture([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2],
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      createIteratorFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      createIteratorFixture([[1], [2], [3]]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as Array<number>)[0])
        .toArray(),
      [1, 2, 3],
    ],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    [
      '',
      () => Stream.ofEmpty()
        .map((item) => `[${item}]`)
        .toArray(),
      [],
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      [],
    ],
    [
      '1',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[1]'],
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[1]', '[2]', '[3]'],
    ],
    [
      'abc',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
  ];
}

function dataProviderForSets(): Array<unknown> {
  return [
    [
      new Set([]),
      () => Stream.ofEmpty()
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [],
    ],
    [
      new Set([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2],
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as number) + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      new Set(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => `[${item}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      new Set([[1], [2], [3]]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as Array<number>)[0])
        .toArray(),
      [1, 2, 3],
    ],
  ];
}

function dataProviderForMaps(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      () => Stream.ofEmpty()
        .map((item) => (item as Array<number>)[1] + 1)
        .toArray(),
      [],
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as Array<number>)[1] + 1)
        .toArray(),
      [],
    ],
    [
      createMapFixture([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as Array<number>)[1] + 1)
        .toArray(),
      [2],
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as Array<number>)[1] + 1)
        .toArray(),
      [2, 3, 4],
    ],
    [
      createMapFixture(['a', 'b', 'c']),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => `[${(item as Array<string>)[1]}]`)
        .toArray(),
      ['[a]', '[b]', '[c]'],
    ],
    [
      createMapFixture([[1], [2], [3]]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as Array<Array<number>>)[1][0])
        .toArray(),
      [1, 2, 3],
    ],
  ];
}
