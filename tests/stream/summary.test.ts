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
      [],
      (iterable: Iterable<number> | Iterator<number>) => Stream.of(iterable)
        .isEmpty(),
    ],
    [
      [2, 4, 1, 3],
      (iterable: Iterable<number> | Iterator<number>) => Stream.of(iterable)
        .isPartitioned((item) => item % 2 === 0),
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
    [
      [],
      (iterable: Iterable<unknown | Iterator<unknown>>) => Stream.of(iterable)
        .arePermutationsWith([]),
    ],
    [
      [],
      (iterable: Iterable<unknown | Iterator<unknown>>) => Stream.of(iterable)
        .arePermutationsWith(),
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown | Iterator<unknown>>) => Stream.of(iterable)
        .arePermutationsWith(),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown | Iterator<unknown>>) => Stream.of(iterable)
        .arePermutationsWith([5, 1, 3]),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown | Iterator<unknown>>) => Stream.of(iterable)
        .runningTotal()
        .arePermutationsWith([9, 1, 4]),
    ],
    [
      [1],
      (iterable: Iterable<number> | Iterator<number>) => Stream.of(iterable)
        .notAllMatch(() => false),
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>) => Stream.of(iterable)
        .notAllMatch((x) => x > 2),
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number> | Iterator<number>) => Stream.of(iterable)
        .notAllMatch((x) => x < 3),
    ],
    [
      ['a'],
      (iterable: Iterable<string> | Iterator<string>) => Stream.of(iterable)
        .notAllMatch((x) => x !== 'a'),
    ],
    [
      ['a', 'B', 'C'],
      (iterable: Iterable<string> | Iterator<string>) => Stream.of(iterable)
        .notAllMatch((x: any) => x.toLowerCase() === x),
    ],
    [
      ['a', 'B', 'C'],
      (iterable: Iterable<string> | Iterator<string>) => Stream.of(iterable)
        .notAllMatch((x: any) => x.toUpperCase() === x),
    ],
    [
      ['OS', 'PHP', 'python'],
      (iterable: Iterable<string> | Iterator<string>) => Stream.of(iterable)
        .notAllMatch((x: any) => x.toUpperCase() === x),
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
      '',
      (iterable) => Stream.of(iterable)
        .isEmpty(),
    ],
    [
      '2413',
      (iterable) => Stream.of(iterable)
        .isPartitioned((item) => Number(item) % 2 === 0),
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
    [
      '',
      (iterable) => Stream.of(iterable)
        .arePermutationsWith([]),
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .arePermutationsWith(),
    ],
    [
      '123',
      (iterable) => Stream.of(iterable)
        .arePermutationsWith(),
    ],
    [
      '135',
      (iterable) => Stream.of(iterable)
        .arePermutationsWith(['5', '1', '3']),
    ],
    [
      '135',
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .arePermutationsWith([9, 1, 4]),
    ],
    [
      '1',
      (iterable) => Stream.of(iterable)
        .notAllMatch((x) => x !== '1'),
    ],
    [
      '123',
      (iterable) => Stream.of(iterable)
        .notAllMatch((x) => Number(x) > 2),
    ],
    [
      '123',
      (iterable) => Stream.of(iterable)
        .notAllMatch((x) => Number(x) < 3),
    ],
    [
      'a',
      (iterable) => Stream.of(iterable)
        .notAllMatch((x) => x !== 'a'),
    ],
    [
      'aBC',
      (iterable) => Stream.of(iterable)
        .notAllMatch((x) => x.toLowerCase() === x),
    ],
    [
      'aBC',
      (iterable) => Stream.of(iterable)
        .notAllMatch((x) => x.toUpperCase() === x),
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
      new Set([]),
      (iterable: Set<number>) => Stream.of(iterable)
        .isEmpty(),
    ],
    [
      new Set([2, 4, 1, 3]),
      (iterable: Set<number>) => Stream.of(iterable)
        .isPartitioned((item) => item % 2 === 0),
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
    [
      new Set([]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .arePermutationsWith([]),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .arePermutationsWith(),
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Set<number>) => Stream.of(iterable)
        .arePermutationsWith(),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => Stream.of(iterable)
        .arePermutationsWith([5, 1, 3]),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => Stream.of(iterable)
        .runningTotal()
        .arePermutationsWith([9, 1, 4]),
    ],
    [
      new Set([1]),
      (iterable: Set<number>) => Stream.of(iterable)
        .notAllMatch(() => false),
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Set<number>) => Stream.of(iterable)
        .notAllMatch((x) => x > 2),
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Set<number>) => Stream.of(iterable)
        .notAllMatch((x) => x < 3),
    ],
    [
      new Set(['a']),
      (iterable: Set<string>) => Stream.of(iterable)
        .notAllMatch((x) => x !== 'a'),
    ],
    [
      new Set(['a', 'B', 'C']),
      (iterable: Set<string>) => Stream.of(iterable)
        .notAllMatch((x: any) => x.toLowerCase() === x),
    ],
    [
      new Set(['a', 'B', 'C']),
      (iterable: Set<string>) => Stream.of(iterable)
        .notAllMatch((x: any) => x.toUpperCase() === x),
    ],
    [
      new Set(['OS', 'PHP', 'python']),
      (iterable: Set<string>) => Stream.of(iterable)
        .notAllMatch((x: any) => x.toUpperCase() === x),
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
      createMapFixture([]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .isEmpty(),
    ],
    [
      createMapFixture([2, 4, 1, 3]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .isPartitioned((item) => item[1] % 2 === 0),
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
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .arePermutationsWith([]),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .arePermutationsWith(),
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .arePermutationsWith(),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .map((item) => item[1])
        .arePermutationsWith([5, 1, 3]),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .arePermutationsWith([9, 1, 4]),
    ],
    [
      createMapFixture([1]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .notAllMatch((x) => x[1] !== 1),
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .notAllMatch((x) => x[1] > 2),
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .notAllMatch((x) => x[1] < 3),
    ],
    [
      createMapFixture(['a']),
      (iterable: Map<unknown, string>) => Stream.of(iterable)
        .notAllMatch((x) => x[1] !== 'a'),
    ],
    [
      createMapFixture(['a', 'B', 'C']),
      (iterable: Map<unknown, string>) => Stream.of(iterable)
        .notAllMatch((x) => x[1].toLowerCase() === x[1]),
    ],
    [
      createMapFixture(['a', 'B', 'C']),
      (iterable: Map<unknown, string>) => Stream.of(iterable)
        .notAllMatch((x) => x[1].toUpperCase() === x[1]),
    ],
    [
      createMapFixture(['OS', 'PHP', 'python']),
      (iterable: Map<unknown, string>) => Stream.of(iterable)
        .notAllMatch((x) => x[1].toUpperCase() === x[1]),
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
      [1],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .isEmpty(),
    ],
    [
      [2, 1, 4, 3],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .isPartitioned((item) => item % 2 === 0),
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
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .arePermutationsWith([1]),
    ],
    [
      [1],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .arePermutationsWith([]),
    ],
    [
      [1],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .arePermutationsWith(['1']),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .arePermutationsWith([1, 3, 4]),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .runningTotal()
        .arePermutationsWith([1, 4, 10]),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .notAllMatch(() => true),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .notAllMatch(() => false),
    ],
    [
      [1],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .notAllMatch((x) => x === 1),
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .notAllMatch((x) => x >= 1),
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<number>) => Stream.of(iterable)
        .notAllMatch((x) => x < 4),
    ],
    [
      ['a'],
      (iterable: Iterable<unknown>) => Stream.of(iterable)
        .notAllMatch((x) => x === 'a'),
    ],
    [
      ['A', 'B', 'C'],
      (iterable: Iterable<string>) => Stream.of(iterable)
        .notAllMatch((x: any) => x.toUpperCase() === x),
    ],
    [
      ['a', 'b', 'c'],
      (iterable: Iterable<string>) => Stream.of(iterable)
        .notAllMatch((x: any) => x.toLowerCase() === x),
    ],
    [
      ['OS', 'PHP', 'COBOL'],
      (iterable: Iterable<string>) => Stream.of(iterable)
        .notAllMatch((x: any) => x.toUpperCase() === x),
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
      '1',
      (iterable) => Stream.of(iterable)
        .isEmpty(),
    ],
    [
      '2143',
      (iterable) => Stream.of(iterable)
        .isPartitioned((item) => Number(item) % 2 === 0),
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
    [
      '',
      (iterable) => Stream.of(iterable)
        .arePermutationsWith([1]),
    ],
    [
      '1',
      (iterable) => Stream.of(iterable)
        .arePermutationsWith([]),
    ],
    [
      '1',
      (iterable) => Stream.of(iterable)
        .arePermutationsWith([1]),
    ],
    [
      '135',
      (iterable) => Stream.of(iterable)
        .arePermutationsWith(['1', '3', '4']),
    ],
    [
      '135',
      (iterable) => Stream.of(iterable)
        .runningTotal()
        .arePermutationsWith([1, 4, 10]),
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .notAllMatch(() => true),
    ],
    [
      '',
      (iterable) => Stream.of(iterable)
        .notAllMatch(() => false),
    ],
    [
      '1',
      (iterable) => Stream.of(iterable)
        .notAllMatch((x) => x === '1'),
    ],
    [
      '123',
      (iterable) => Stream.of(iterable)
        .notAllMatch((x) => Number(x) >= 1),
    ],
    [
      '123',
      (iterable) => Stream.of(iterable)
        .notAllMatch((x) => Number(x) < 4),
    ],
    [
      'a',
      (iterable) => Stream.of(iterable)
        .notAllMatch((x) => x === 'a'),
    ],
    [
      'ABC',
      (iterable) => Stream.of(iterable)
        .notAllMatch((x) => x.toUpperCase() === x),
    ],
    [
      'abc',
      (iterable) => Stream.of(iterable)
        .notAllMatch((x) => x.toLowerCase() === x),
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
      new Set([1]),
      (iterable: Set<number>) => Stream.of(iterable)
        .isEmpty(),
    ],
    [
      new Set([2, 1, 4, 3]),
      (iterable: Set<number>) => Stream.of(iterable)
        .isPartitioned((item) => item % 2 === 0),
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
    [
      new Set([]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .arePermutationsWith([1]),
    ],
    [
      new Set([1]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .arePermutationsWith([]),
    ],
    [
      new Set([1]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .arePermutationsWith(['1']),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => Stream.of(iterable)
        .arePermutationsWith([1, 3, 4]),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => Stream.of(iterable)
        .runningTotal()
        .arePermutationsWith([1, 4, 10]),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .notAllMatch(() => true),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => Stream.of(iterable)
        .notAllMatch(() => false),
    ],
    [
      new Set([1]),
      (iterable: Set<number>) => Stream.of(iterable)
        .notAllMatch((x) => x === 1),
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Set<number>) => Stream.of(iterable)
        .notAllMatch((x) => x >= 1),
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Set<number>) => Stream.of(iterable)
        .notAllMatch((x) => x < 4),
    ],
    [
      new Set(['a']),
      (iterable: Set<string>) => Stream.of(iterable)
        .notAllMatch((x) => x === 'a'),
    ],
    [
      new Set(['A', 'B', 'C']),
      (iterable: Set<string>) => Stream.of(iterable)
        .notAllMatch((x: any) => x.toUpperCase() === x),
    ],
    [
      new Set(['a', 'b', 'c']),
      (iterable: Set<string>) => Stream.of(iterable)
        .notAllMatch((x: any) => x.toLowerCase() === x),
    ],
    [
      new Set(['OS', 'PHP', 'COBOL']),
      (iterable: Set<string>) => Stream.of(iterable)
        .notAllMatch((x: any) => x.toUpperCase() === x),
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
      createMapFixture([1]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .isEmpty(),
    ],
    [
      createMapFixture([2, 1, 4, 3]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .isPartitioned((item) => item[1] % 2 === 0),
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
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .map((item) => item[1])
        .arePermutationsWith([1]),
    ],
    [
      createMapFixture([1]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .map((item) => item[1])
        .arePermutationsWith([]),
    ],
    [
      createMapFixture([1]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .map((item) => item[1])
        .arePermutationsWith(['1']),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .map((item) => item[1])
        .arePermutationsWith([1, 3, 4]),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .arePermutationsWith([1, 4, 10]),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .notAllMatch(() => true),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .notAllMatch(() => false),
    ],
    [
      createMapFixture([1]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .notAllMatch((x) => x[1] === 1),
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .notAllMatch((x) => x[1] >= 1),
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>) => Stream.of(iterable)
        .notAllMatch((x) => x[1] < 4),
    ],
    [
      createMapFixture(['a']),
      (iterable: Map<unknown, string>) => Stream.of(iterable)
        .notAllMatch((x) => x[1] === 'a'),
    ],
    [
      createMapFixture(['A', 'B', 'C']),
      (iterable: Map<unknown, string>) => Stream.of(iterable)
        .notAllMatch((x) => x[1].toUpperCase() === x[1]),
    ],
    [
      createMapFixture(['a', 'b', 'c']),
      (iterable: Map<unknown, string>) => Stream.of(iterable)
        .notAllMatch((x) => x[1].toLowerCase() === x[1]),
    ],
    [
      createMapFixture(['OS', 'PHP', 'COBOL']),
      (iterable: Map<unknown, string>) => Stream.of(iterable)
        .notAllMatch((x) => x[1].toUpperCase() === x[1]),
    ],
  ];
}
