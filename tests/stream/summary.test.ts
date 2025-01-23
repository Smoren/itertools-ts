// @ts-ignore
import { createGeneratorFixture, createIterableFixture, createIteratorFixture, createMapFixture } from "../fixture";
import { Numeric, Stream } from "../../src";

describe.each([
  ...dataProviderForArraysTrue(),
  ...dataProviderForGeneratorsTrue(),
  ...dataProviderForIterablesTrue(),
  ...dataProviderForIteratorsTrue(),
  ...dataProviderForStringsTrue(),
  ...dataProviderForSetsTrue(),
  ...dataProviderForMapsTrue(),
])(
  "Stream Summary Test True",
  (input, streamFactory) => {
    it("", () => {
      // Given
      const result = streamFactory(input as any);

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
])(
  "Stream Summary Test False",
  (input, streamFactory) => {
    it("", () => {
      // Given
      const result = streamFactory(input as any);

      // Then
      expect(result).toBeFalsy();
    });
  }
);

function dataProviderForArraysTrue(): Array<[Array<any>, (iterable: Array<any>) => boolean]> {
  return [
    [
      [],
      (iterable: Iterable<number> | Iterator<number>) => Stream.of(iterable)
        .allMatch((x) => x > 0),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<number> | Iterator<number>) => Stream.of(iterable)
        .allMatch((x) => x > 0),
    ],
    [
      [],
      (iterable: Iterable<unknown | Iterator<unknown>>) => Stream.of(iterable)
        .allUnique(),
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable: Iterable<number> | Iterator<number>) => Stream.of(iterable)
        .allUnique(),
    ],
    [
      [1, '1', true, [1], [1]],
      (iterable: Iterable<unknown | Iterator<unknown>>) => Stream.of(iterable)
        .allUnique(),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<number> | Iterator<number>) => Stream.of(iterable)
        .anyMatch((x) => x === 3),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<number> | Iterator<number>) => Stream.of(iterable)
        .anyMatch((x) => x > 0),
    ],
    [
      [],
      (iterable: Iterable<unknown | Iterator<unknown>>) => Stream.of(iterable)
        .exactlyN(0),
    ],
    [
      [''],
      (iterable: Iterable<unknown | Iterator<unknown>>) => Stream.of(iterable)
        .exactlyN(0),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown | Iterator<unknown>>) => Stream.of(iterable)
        .exactlyN(3),
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number> | Iterator<number>) => Stream.of(iterable)
        .filter((item) => item > 0)
        .runningTotal()
        .isSorted(),
    ],
    [
      [5, -1, 4, -2, 3, -3, 2, -4, 1, -5],
      (iterable: Iterable<number> | Iterator<number>) => Stream.of(iterable)
        .filter((item) => item > 0)
        .isReversed(),
    ],
    [
      [],
      (iterable: Iterable<unknown | Iterator<unknown>>) => Stream.of(iterable)
        .noneMatch(() => true),
    ],
    [
      [],
      (iterable: Iterable<unknown | Iterator<unknown>>) => Stream.of(iterable)
        .noneMatch(() => false),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<number> | Iterator<number>) => Stream.of(iterable)
        .noneMatch((x) => x === 9),
    ],
    [
      [],
      (iterable: Iterable<unknown | Iterator<unknown>>) => Stream.of(iterable)
        .sameWith([]),
    ],
    [
      [],
      (iterable: Iterable<unknown | Iterator<unknown>>) => Stream.of(iterable)
        .sameWith(),
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown | Iterator<unknown>>) => Stream.of(iterable)
        .sameWith(),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown | Iterator<unknown>>) => Stream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>) => Stream.of(iterable)
        .sameCountWith([]),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<number> | Iterator<number>) => Stream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForGeneratorsTrue(): Array<[Generator<any>, (iterable: Generator<any>) => boolean]> {
  return dataProviderForArraysTrue().map((item) => [
    createGeneratorFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<Numeric> | Iterator<Numeric>) => boolean],
  ]);
}

function dataProviderForIterablesTrue(): Array<[Iterable<any>, (iterable: Iterable<any>) => boolean]> {
  return dataProviderForArraysTrue().map((item) => [
    createIterableFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<Numeric> | Iterator<Numeric>) => boolean],
  ]);
}

function dataProviderForIteratorsTrue(): Array<[Iterator<any>, (iterable: Iterator<any>) => boolean]> {
  return dataProviderForArraysTrue().map((item) => [
    createIteratorFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<Numeric> | Iterator<Numeric>) => boolean],
  ]);
}

function dataProviderForStringsTrue(): Array<[string, (iterable: string) => boolean]> {
  return [
    [
      '',
      (iterable) => Stream.of(iterable)
        .allMatch((x) => Number(x) > 0),
    ],
    [
      '135',
      (iterable) => Stream.of(iterable)
        .allMatch((x) => Number(x) > 0),
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .allUnique(),
    ],
    [
      '12345',
      (iterable) => Stream.of(iterable)
        .allUnique(),
    ],
    [
      '135',
      (iterable) => Stream.of(iterable)
        .anyMatch((x) => Number(x) === 3),
    ],
    [
      '135',
      (iterable) => Stream.of(iterable)
        .anyMatch((x) => Number(x) > 0),
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .exactlyN(0),
    ],
    [
      '123',
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .isSorted(),
    ],
    [
      '54321',
      (iterable) => Stream.of(iterable)
        .isReversed(),
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .noneMatch(() => true),
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .noneMatch(() => false),
    ],
    [
      '135',
      (iterable) => Stream.of(iterable)
        .noneMatch((x) => Number(x) === 9),
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .sameWith([]),
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .sameWith(),
    ],
    [
      '123',
      (iterable) => Stream.of(iterable)
        .sameWith(),
    ],
    [
      '135',
      (iterable) => Stream.of(iterable)
        .sameWith(['1', '3', '5']),
    ],
    [
      '135',
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .sameCountWith([]),
    ],
    [
      '135',
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForSetsTrue(): Array<[Set<any>, (iterable: Set<any>) => boolean]> {
  return [
    [
      new Set([]),
      (iterable: Set<number>) => Stream.of(iterable)
        .allMatch((x) => x > 0),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => Stream.of(iterable)
        .allMatch((x) => x > 0),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .allUnique(),
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      (iterable: Set<number>) => Stream.of(iterable)
        .allUnique(),
    ],
    [
      new Set([1, '1', true, [1], [1]]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .allUnique(),
    ],
    [
      new Set([1, 1, 1, 1, 1]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .allUnique(),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => Stream.of(iterable)
        .anyMatch((x) => x === 3),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => Stream.of(iterable)
        .anyMatch((x) => x > 0),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .exactlyN(0),
    ],
    [
      new Set(['']),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .exactlyN(0),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .exactlyN(3),
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Set<number>) => Stream.of(iterable)
        .filter((item) => item > 0)
        .runningTotal()
        .isSorted(),
    ],
    [
      new Set([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Set<number>) => Stream.of(iterable)
        .filter((item) => item > 0)
        .isReversed(),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .noneMatch(() => true),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .noneMatch(() => false),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .noneMatch((x) => x === 9),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .sameWith([]),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .sameWith(),
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Set<number>) => Stream.of(iterable)
        .sameWith(),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => Stream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .sameCountWith([]),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => Stream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForMapsTrue(): Array<[Map<any, any>, (iterable: Map<any, any>) => boolean]> {
  return [
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .allMatch((x) => x[1] > 0),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .allMatch((x) => x[1] > 0),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .map((data) => data[1])
        .allUnique(),
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .map((data) => data[1])
        .allUnique(),
    ],
    [
      createMapFixture([1, '1', true, [1], [1]]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .map((data) => data[1])
        .allUnique(),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .anyMatch((x) => x[1] === 3),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .anyMatch((x) => x[1] > 0),
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .map((item) => item[1])
        .filter((item) => item > 0)
        .runningTotal()
        .isSorted(),
    ],
    [
      createMapFixture([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .map((item) => item[1])
        .filter((item) => item > 0)
        .isReversed(),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .noneMatch(() => true),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .noneMatch(() => false),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .noneMatch((x) => x[1] === 9),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .sameWith([]),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .sameWith(),
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .sameWith(),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .sameCountWith([]),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForArraysFalse(): Array<[Array<any>, (iterable: Array<any>) => boolean]> {
  return [
    [
      [1, 3, -5],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .allMatch((x) => x > 0),
    ],
    [
      [1, 2, 1, 3],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .allUnique(),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .anyMatch((x) => x > 10),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .exactlyN(1),
    ],
    [
      [''],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .exactlyN(1),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .exactlyN(4),
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .runningTotal()
        .isSorted(),
    ],
    [
      [5, -1, 4, -2, 3, -3, 2, -4, 1, -5],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .isReversed(),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .noneMatch((x) => x === 3),
    ],
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

function dataProviderForGeneratorsFalse(): Array<[Generator<any>, (iterable: Generator<any>) => boolean]> {
  return dataProviderForArraysFalse().map((item) => [
    createGeneratorFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<Numeric> | Iterator<Numeric>) => boolean],
  ]);
}

function dataProviderForIterablesFalse(): Array<[Iterable<any>, (iterable: Iterable<any>) => boolean]> {
  return dataProviderForArraysFalse().map((item) => [
    createIterableFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<Numeric> | Iterator<Numeric>) => boolean],
  ]);
}

function dataProviderForIteratorsFalse(): Array<[Iterator<any>, (iterable: Iterator<any>) => boolean]> {
  return dataProviderForArraysFalse().map((item) => [
    createIteratorFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<Numeric> | Iterator<Numeric>) => boolean],
  ]);
}

function dataProviderForStringsFalse(): Array<[string, (iterable: string) => boolean]> {
  return [
    [
      '123',
      (iterable) => Stream.of(iterable)
        .allMatch((x) => Number(x) > 1),
    ],
    [
      '1231',
      (iterable) => Stream.of(iterable)
        .allUnique(),
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      '135',
      (iterable) => Stream.of(iterable)
        .anyMatch((x) => Number(x) > 10),
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .exactlyN(1),
    ],
    [
      '131',
      (iterable) => Stream.of(iterable)
        .isSorted(),
    ],
    [
      '123',
      (iterable) => Stream.of(iterable)
        .isReversed(),
    ],
    [
      '135',
      (iterable) => Stream.of(iterable)
        .noneMatch((x) => Number(x) === 3),
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .sameWith([1]),
    ],
    [
      '1',
      (iterable) => Stream.of(iterable)
        .sameWith([]),
    ],
    [
      '1',
      (iterable) => Stream.of(iterable)
        .sameWith([1]),
    ],
    [
      '135',
      (iterable) => Stream.of(iterable)
        .sameWith(['1', '3', '4']),
    ],
    [
      '135',
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      '135',
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}

function dataProviderForSetsFalse(): Array<[Set<any>, (iterable: Set<any>) => boolean]> {
  return [
    [
      new Set([1, 3, -5]),
      (iterable: Set<number>) => Stream.of(iterable)
        .allMatch((x) => x > 0),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => Stream.of(iterable)
        .anyMatch((x) => x > 10),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .exactlyN(1),
    ],
    [
      new Set(['']),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .exactlyN(1),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => Stream.of(iterable)
        .exactlyN(4),
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Set<number>) => Stream.of(iterable)
        .runningTotal()
        .isSorted(),
    ],
    [
      new Set([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Set<number>) => Stream.of(iterable)
        .isReversed(),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => Stream.of(iterable)
        .noneMatch((x) => x === 3),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .sameWith([1]),
    ],
    [
      new Set([1]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .sameWith([]),
    ],
    [
      new Set([1]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .sameWith(['1']),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => Stream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}

function dataProviderForMapsFalse(): Array<[Map<any, any>, (iterable: Map<any, any>) => boolean]> {
  return [
    [
      createMapFixture([1, 3, -5]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .allMatch((x) => x[1] > 0),
    ],
    [
      createMapFixture([1, 2, 1, 3]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .map((item) => item[1])
        .allUnique(),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .anyMatch((x) => x[1] > 10),
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .isSorted(),
    ],
    [
      createMapFixture([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .map((item) => item[1])
        .isReversed(),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .noneMatch((x) => x[1] === 3),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .map((item) => item[1])
        .sameWith([1]),
    ],
    [
      createMapFixture([1]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .map((item) => item[1])
        .sameWith([]),
    ],
    [
      createMapFixture([1]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .map((item) => item[1])
        .sameWith(['1']),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}
