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
] as Array<[Iterable<unknown>|Iterator<unknown>, (data: unknown) => Stream]>)(
  "Stream Summary Test True",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    streamFactory: (data: unknown) => Stream
  ) => {
    it("", () => {
      // Given
      const result = streamFactory(input);

      // Then
      expect(result).toBeTruthy();
    });
  }
);


describe.each([
  ...dataProviderForArraysFalse(),
  ...dataProviderForGeneratorsFalse(),
  ...dataProviderForIterablesFalse(),
  ...dataProviderForIteratorsFalse(),
  ...dataProviderForStringsFalse(),
  ...dataProviderForSetsFalse(),
  ...dataProviderForMapsFalse(),
] as Array<[Iterable<unknown>|Iterator<unknown>, (data: unknown) => Stream]>)(
  "Stream Summary Test False",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    streamFactory: (data: unknown) => Stream
  ) => {
    it("", () => {
      // Given
      const result = streamFactory(input);

      // Then
      expect(result).toBeFalsy();
    });
  }
);

function dataProviderForArraysTrue(): Array<unknown> {
  return [
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch((x) => (x as number) === 3),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch((x) => (x as number) > 0),
    ],
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
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameCountWith([]),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForGeneratorsTrue(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      createGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      createGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch((x) => (x as number) === 3),
    ],
    [
      createGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch((x) => (x as number) > 0),
    ],
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
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameCountWith([]),
    ],
    [
      createGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForIterablesTrue(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      createIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      createIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch((x) => (x as number) === 3),
    ],
    [
      createIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch((x) => (x as number) > 0),
    ],
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
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameCountWith([]),
    ],
    [
      createIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForIteratorsTrue(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      createIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      createIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch((x) => (x as number) === 3),
    ],
    [
      createIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch((x) => (x as number) > 0),
    ],
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
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameCountWith([]),
    ],
    [
      createIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForStringsTrue(): Array<unknown> {
  return [
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allMatch((x) => Number(x as string) > 0),
    ],
    [
      '135',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allMatch((x) => Number(x as string) > 0),
    ],
    [
      '135',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch((x) => Number(x as string) === 3),
    ],
    [
      '135',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch((x) => Number(x as string) > 0),
    ],
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
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameCountWith([]),
    ],
    [
      '135',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForSetsTrue(): Array<unknown> {
  return [
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch((x) => (x as number) === 3),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch((x) => (x as number) > 0),
    ],
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
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameCountWith([]),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForMapsTrue(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allMatch((x) => (x as [unknown, number])[1] > 0),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allMatch((x) => (x as [unknown, number])[1] > 0),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch((x) => (x as [unknown, number])[1] === 3),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch((x) => (x as [unknown, number])[1] > 0),
    ],
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
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameCountWith([]),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForArraysFalse(): Array<unknown> {
  return [
    [
      [1, 3, -5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([1]),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch((x) => (x as number) > 10),
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
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}

function dataProviderForGeneratorsFalse(): Array<unknown> {
  return [
    [
      createGeneratorFixture([1, 3, -5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([1]),
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      createGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch((x) => (x as number) > 10),
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
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      createGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}

function dataProviderForIterablesFalse(): Array<unknown> {
  return [
    [
      createIterableFixture([1, 3, -5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([1]),
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      createIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch((x) => (x as number) > 10),
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
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      createIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}

function dataProviderForIteratorsFalse(): Array<unknown> {
  return [
    [
      createIteratorFixture([1, 3, -5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([1]),
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      createIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch((x) => (x as number) > 10),
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
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      createIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}

function dataProviderForStringsFalse(): Array<unknown> {
  return [
    [
      '123',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allMatch((x) => Number(x as string) > 1),
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([1]),
    ],
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      '135',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch((x) => Number(x as string) > 10),
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
    [
      '',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      '135',
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}

function dataProviderForSetsFalse(): Array<unknown> {
  return [
    [
      new Set([1, 3, -5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameWith([1]),
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch((x) => (x as number) > 10),
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
    [
      new Set([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}

function dataProviderForMapsFalse(): Array<unknown> {
  return [
    [
      createMapFixture([1, 3, -5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .allMatch((x) => (x as [unknown, number])[1] > 0),
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .map((item) => (item as [number, number])[1])
        .sameWith([1]),
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch((x) => (x as [unknown, number])[1] > 10),
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
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}
