// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { Stream } from '../../src';

describe.each([
  ...dataProviderForArraysTrue(),
  ...dataProviderForGeneratorsTrue(),
  ...dataProviderForIterablesTrue(),
  ...dataProviderForIteratorsTrue(),
  ...dataProviderForStringsTrue(),
  ...dataProviderForSetsTrue(),
  ...dataProviderForMapsTrue(),
])("Stream Summary Test True", (input, streamFactory) => {
  it("", () => {
    // Given
    const result = (streamFactory as (data: unknown) => Stream)(input);

    // Then
    expect(result).toBeTruthy();
  });
});


describe.each([
  ...dataProviderForArraysFalse(),
  ...dataProviderForGeneratorsFalse(),
  ...dataProviderForIterablesFalse(),
  ...dataProviderForIteratorsFalse(),
  ...dataProviderForStringsFalse(),
  ...dataProviderForSetsFalse(),
  ...dataProviderForMapsFalse(),
])("Stream Summary Test False", (input, streamFactory) => {
  it("", () => {
    // Given
    const result = (streamFactory as (data: unknown) => Stream)(input);

    // Then
    expect(result).toBeFalsy();
  });
});

function dataProviderForArraysTrue(): Array<unknown> {
  return [
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([]),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith(),
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith(),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
  ];
}

function dataProviderForGeneratorsTrue(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([]),
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith(),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith(),
    ],
    [
      createGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
  ];
}

function dataProviderForIterablesTrue(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([]),
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith(),
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith(),
    ],
    [
      createIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
  ];
}

function dataProviderForIteratorsTrue(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([]),
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith(),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith(),
    ],
    [
      createIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
  ];
}

function dataProviderForStringsTrue(): Array<unknown> {
  return [
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([]),
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith(),
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith(),
    ],
    [
      '135',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith(['1', '3', '5']),
    ],
    [
      '135',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
  ];
}

function dataProviderForSetsTrue(): Array<unknown> {
  return [
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([]),
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith(),
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith(),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
  ];
}

function dataProviderForMapsTrue(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([]),
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith(),
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith(),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [number, number])[1])
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
  ];
}

function dataProviderForArraysFalse(): Array<unknown> {
  return [
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([1]),
    ],
    [
      [1],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([]),
    ],
    [
      [1],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith(['1']),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
  ];
}

function dataProviderForGeneratorsFalse(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([1]),
    ],
    [
      createGeneratorFixture([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([]),
    ],
    [
      createGeneratorFixture([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith(['1']),
    ],
    [
      createGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
  ];
}

function dataProviderForIterablesFalse(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([1]),
    ],
    [
      createIterableFixture([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([]),
    ],
    [
      createIterableFixture([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith(['1']),
    ],
    [
      createIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
  ];
}

function dataProviderForIteratorsFalse(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([1]),
    ],
    [
      createIteratorFixture([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([]),
    ],
    [
      createIteratorFixture([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith(['1']),
    ],
    [
      createIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
  ];
}

function dataProviderForStringsFalse(): Array<unknown> {
  return [
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([1]),
    ],
    [
      '1',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([]),
    ],
    [
      '1',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([1]),
    ],
    [
      '135',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith(['1', '3', '4']),
    ],
    [
      '135',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
  ];
}

function dataProviderForSetsFalse(): Array<unknown> {
  return [
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([1]),
    ],
    [
      new Set([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([]),
    ],
    [
      new Set([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith(['1']),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
  ];
}

function dataProviderForMapsFalse(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [number, number])[1])
        .sameWith([1]),
    ],
    [
      createMapFixture([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [number, number])[1])
        .sameWith([]),
    ],
    [
      createMapFixture([1]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [number, number])[1])
        .sameWith(['1']),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [number, number])[1])
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
  ];
}
