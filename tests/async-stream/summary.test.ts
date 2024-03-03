import {
  asyncTimeout,
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture,
  // @ts-ignore
} from "../fixture";
import { AsyncStream } from '../../src';

describe.each([
  ...dataProviderForAsyncGeneratorsTrue(),
  ...dataProviderForAsyncIterablesTrue(),
  ...dataProviderForAsyncIteratorsTrue(),
  ...dataProviderForArraysTrue(),
  ...dataProviderForGeneratorsTrue(),
  ...dataProviderForIterablesTrue(),
  ...dataProviderForIteratorsTrue(),
  ...dataProviderForStringsTrue(),
  ...dataProviderForSetsTrue(),
  ...dataProviderForMapsTrue(),
] as Array<[
  AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  (data: unknown) => AsyncStream
]>)(
  "AsyncStream Summary Test True",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    streamFactory: (data: unknown) => AsyncStream
  ) => {
    it("", async () => {
      // Given
      const result = await streamFactory(input);

      // Then
      expect(result).toBeTruthy();
    });
  }
);

describe.each([
  ...dataProviderForAsyncIterablesFalse(),
  ...dataProviderForAsyncIteratorsFalse(),
  ...dataProviderForAsyncGeneratorsFalse(),
  ...dataProviderForArraysFalse(),
  ...dataProviderForGeneratorsFalse(),
  ...dataProviderForIterablesFalse(),
  ...dataProviderForIteratorsFalse(),
  ...dataProviderForStringsFalse(),
  ...dataProviderForSetsFalse(),
  ...dataProviderForMapsFalse(),
] as Array<[
  AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  (data: unknown) => AsyncStream
]>)(
  "AsyncStream Summary Test False",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    streamFactory: (data: unknown) => AsyncStream
  ) => {
    it("", async () => {
      // Given
      const result = await streamFactory(input);

      // Then
      expect(result).toBeFalsy();
    });
  }
);

function dataProviderForArraysTrue(): Array<unknown> {
  return [
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      [1, '1', true, [1], [1]],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) === 3),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) > 0),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      [''],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(3),
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((item) => (item as number) > 0)
        .runningTotal()
        .isSorted(),
    ],
    [
      [5, -1, 4, -2, 3, -3, 2, -4, 1, -5],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((item) => (item as number) > 0)
        .isReversed(),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch(() => true),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch(() => false),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch((x) => (x as number) === 9),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([]),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForGeneratorsTrue(): Array<unknown> {
  return [
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      createGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createGeneratorFixture([1, '1', true, [1], [1]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) === 3),
    ],
    [
      createGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) > 0),
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      createGeneratorFixture(['']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      createGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(3),
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((item) => (item as number) > 0)
        .runningTotal()
        .isSorted(),
    ],
    [
      createGeneratorFixture([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((item) => (item as number) > 0)
        .isReversed(),
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch(() => true),
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch(() => false),
    ],
    [
      createGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch((x) => (x as number) === 9),
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      createGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      createGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([]),
    ],
    [
      createGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForIterablesTrue(): Array<unknown> {
  return [
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      createIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createIterableFixture([1, '1', true, [1], [1]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) === 3),
    ],
    [
      createIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) > 0),
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      createIterableFixture(['']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      createIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(3),
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((item) => (item as number) > 0)
        .runningTotal()
        .isSorted(),
    ],
    [
      createIterableFixture([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((item) => (item as number) > 0)
        .isReversed(),
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch(() => true),
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch(() => false),
    ],
    [
      createIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch((x) => (x as number) === 9),
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      createIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      createIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([]),
    ],
    [
      createIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForIteratorsTrue(): Array<unknown> {
  return [
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      createIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createIteratorFixture([1, '1', true, [1], [1]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) === 3),
    ],
    [
      createIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) > 0),
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      createIteratorFixture(['']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      createIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(3),
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((item) => (item as number) > 0)
        .runningTotal()
        .isSorted(),
    ],
    [
      createIteratorFixture([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((item) => (item as number) > 0)
        .isReversed(),
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch(() => true),
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch(() => false),
    ],
    [
      createIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch((x) => (x as number) === 9),
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      createIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      createIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([]),
    ],
    [
      createIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForStringsTrue(): Array<unknown> {
  return [
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => Number(x as string) > 0),
    ],
    [
      '135',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => Number(x as string) > 0),
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      '12345',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      '135',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => Number(x as string) === 3),
    ],
    [
      '135',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => Number(x as string) > 0),
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      '123',
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .isSorted(),
    ],
    [
      '54321',
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .isReversed(),
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch(() => true),
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch(() => false),
    ],
    [
      '135',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch((x) => Number(x as string) === 9),
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      '123',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      '135',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(['1', '3', '5']),
    ],
    [
      '135',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([]),
    ],
    [
      '135',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForSetsTrue(): Array<unknown> {
  return [
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      new Set([1, '1', true, [1], [1]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      new Set([1, 1, 1, 1, 1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) === 3),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) > 0),
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      new Set(['']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(3),
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((item) => (item as number) > 0)
        .runningTotal()
        .isSorted(),
    ],
    [
      new Set([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((item) => (item as number) > 0)
        .isReversed(),
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch(() => true),
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch(() => false),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch((x) => (x as number) === 9),
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([]),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForMapsTrue(): Array<unknown> {
  return [
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => (x as [unknown, number])[1] > 0),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => (x as [unknown, number])[1] > 0),
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((data) => (data as [unknown, unknown])[1])
        .allUnique(),
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((data) => (data as [unknown, unknown])[1])
        .allUnique(),
    ],
    [
      createMapFixture([1, '1', true, [1], [1]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((data) => (data as [unknown, unknown])[1])
        .allUnique(),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as [unknown, number])[1] === 3),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as [unknown, number])[1] > 0),
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .filter((item) => (item as number) > 0)
        .runningTotal()
        .isSorted(),
    ],
    [
      createMapFixture([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .filter((item) => (item as number) > 0)
        .isReversed(),
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch(() => true),
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch(() => false),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch((x) => (x as [unknown, number])[1] === 9),
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [number, number])[1])
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([]),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForAsyncGeneratorsTrue(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch(async (x) => {
          await asyncTimeout(1);
          return (x as number) > 0;
        }),
    ],
    [
      createAsyncGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createAsyncGeneratorFixture([1, '1', true, [1], [1]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createAsyncGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch(async (x) => {
          await asyncTimeout(1);
          return (x as number) === 3;
        }),
    ],
    [
      createAsyncGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) > 0),
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      createAsyncGeneratorFixture(['']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      createAsyncGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(3),
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((item) => (item as number) > 0)
        .runningTotal()
        .isSorted(),
    ],
    [
      createAsyncGeneratorFixture([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((item) => (item as number) > 0)
        .isReversed(),
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch(async () => {
          await asyncTimeout(1);
          return true;
        }),
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch(() => false),
    ],
    [
      createAsyncGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch((x) => (x as number) === 9),
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      createAsyncGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([]),
    ],
    [
      createAsyncGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForAsyncIterablesTrue(): Array<unknown> {
  return [
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch(async (x) => {
          await asyncTimeout(1);
          return (x as number) > 0;
        }),
    ],
    [
      createAsyncIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createAsyncIterableFixture([1, '1', true, [1], [1]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createAsyncIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch(async (x) => {
          await asyncTimeout(1);
          return (x as number) === 3;
        }),
    ],
    [
      createAsyncIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) > 0),
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      createAsyncIterableFixture(['']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      createAsyncIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(3),
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((item) => (item as number) > 0)
        .runningTotal()
        .isSorted(),
    ],
    [
      createAsyncIterableFixture([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((item) => (item as number) > 0)
        .isReversed(),
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch(async () => {
          await asyncTimeout(1);
          return true;
        }),
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch(() => false),
    ],
    [
      createAsyncIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch((x) => (x as number) === 9),
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      createAsyncIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([]),
    ],
    [
      createAsyncIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForAsyncIteratorsTrue(): Array<unknown> {
  return [
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch(async (x) => {
          await asyncTimeout(1);
          return (x as number) > 0;
        }),
    ],
    [
      createAsyncIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createAsyncIteratorFixture([1, '1', true, [1], [1]]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createAsyncIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch(async (x) => {
          await asyncTimeout(1);
          return (x as number) === 3;
        }),
    ],
    [
      createAsyncIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) > 0),
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      createAsyncIteratorFixture(['']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      createAsyncIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(3),
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((item) => (item as number) > 0)
        .runningTotal()
        .isSorted(),
    ],
    [
      createAsyncIteratorFixture([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .filter((item) => (item as number) > 0)
        .isReversed(),
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch(async () => {
          await asyncTimeout(1);
          return true;
        }),
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch(() => false),
    ],
    [
      createAsyncIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch((x) => (x as number) === 9),
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      createAsyncIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([]),
    ],
    [
      createAsyncIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForArraysFalse(): Array<unknown> {
  return [
    [
      [1, 3, -5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      [1, 2, 1, 3],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) > 10),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      [''],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(4),
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .isSorted(),
    ],
    [
      [5, -1, 4, -2, 3, -3, 2, -4, 1, -5],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .isReversed(),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch((x) => (x as number) === 3),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([1]),
    ],
    [
      [1],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      [1],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(['1']),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}

function dataProviderForGeneratorsFalse(): Array<unknown> {
  return [
    [
      createGeneratorFixture([1, 3, -5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      createGeneratorFixture([1, 2, 1, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      createGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) > 10),
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      createGeneratorFixture(['']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      createGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(4),
    ],
    [
      createGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .isSorted(),
    ],
    [
      createGeneratorFixture([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .isReversed(),
    ],
    [
      createGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch((x) => (x as number) === 3),
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([1]),
    ],
    [
      createGeneratorFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      createGeneratorFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(['1']),
    ],
    [
      createGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
    [
      createGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      createGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}

function dataProviderForIterablesFalse(): Array<unknown> {
  return [
    [
      createIterableFixture([1, 3, -5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      createIterableFixture([1, 2, 1, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      createIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) > 10),
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      createIterableFixture(['']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      createIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(4),
    ],
    [
      createIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .isSorted(),
    ],
    [
      createIterableFixture([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .isReversed(),
    ],
    [
      createIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch((x) => (x as number) === 3),
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([1]),
    ],
    [
      createIterableFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      createIterableFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(['1']),
    ],
    [
      createIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
    [
      createIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      createIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}

function dataProviderForIteratorsFalse(): Array<unknown> {
  return [
    [
      createIteratorFixture([1, 3, -5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      createIteratorFixture([1, 2, 1, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      createIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) > 10),
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      createIteratorFixture(['']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      createIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(4),
    ],
    [
      createIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .isSorted(),
    ],
    [
      createIteratorFixture([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .isReversed(),
    ],
    [
      createIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch((x) => (x as number) === 3),
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([1]),
    ],
    [
      createIteratorFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      createIteratorFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(['1']),
    ],
    [
      createIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
    [
      createIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      createIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}

function dataProviderForStringsFalse(): Array<unknown> {
  return [
    [
      '123',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => Number(x as string) > 1),
    ],
    [
      '1231',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      '135',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => Number(x as string) > 10),
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      '131',
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .isSorted(),
    ],
    [
      '123',
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .isReversed(),
    ],
    [
      '135',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch((x) => Number(x as string) === 3),
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([1]),
    ],
    [
      '1',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      '1',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([1]),
    ],
    [
      '135',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(['1', '3', '4']),
    ],
    [
      '135',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
    [
      '',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      '135',
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}

function dataProviderForSetsFalse(): Array<unknown> {
  return [
    [
      new Set([1, 3, -5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) > 10),
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      new Set(['']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(4),
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .isSorted(),
    ],
    [
      new Set([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .isReversed(),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch((x) => (x as number) === 3),
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([1]),
    ],
    [
      new Set([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      new Set([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(['1']),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
    [
      new Set([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}

function dataProviderForMapsFalse(): Array<unknown> {
  return [
    [
      createMapFixture([1, 3, -5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => (x as [unknown, number])[1] > 0),
    ],
    [
      createMapFixture([1, 2, 1, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [number, number])[1])
        .allUnique(),
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as [unknown, number])[1] > 10),
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .runningTotal()
        .isSorted(),
    ],
    [
      createMapFixture([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .map((item) => (item as [unknown, number])[1])
        .isReversed(),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch((x) => (x as [unknown, number])[1] === 3),
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [number, number])[1])
        .sameWith([1]),
    ],
    [
      createMapFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [number, number])[1])
        .sameWith([]),
    ],
    [
      createMapFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [number, number])[1])
        .sameWith(['1']),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .map((item) => (item as [number, number])[1])
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
    [
      createMapFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}

function dataProviderForAsyncGeneratorsFalse(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([1, 3, -5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch(async (x) => {
          await asyncTimeout(1);
          return (x as number) > 0;
        }),
    ],
    [
      createAsyncGeneratorFixture([1, 2, 1, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch(async () => {
          await asyncTimeout(1);
          return true;
        }),
    ],
    [
      createAsyncGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) > 10),
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      createAsyncGeneratorFixture(['']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      createAsyncGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(4),
    ],
    [
      createAsyncGeneratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .isSorted(),
    ],
    [
      createAsyncGeneratorFixture([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .isReversed(),
    ],
    [
      createAsyncGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch(async (x) => {
          await asyncTimeout(1);
          return (x as number) === 3;
        }),
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([1]),
    ],
    [
      createAsyncGeneratorFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      createAsyncGeneratorFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(['1']),
    ],
    [
      createAsyncGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
    [
      createAsyncGeneratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      createAsyncGeneratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}

function dataProviderForAsyncIterablesFalse(): Array<unknown> {
  return [
    [
      createAsyncIterableFixture([1, 3, -5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch(async (x) => {
          await asyncTimeout(1);
          return (x as number) > 0;
        }),
    ],
    [
      createAsyncIterableFixture([1, 2, 1, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch(async () => {
          await asyncTimeout(1);
          return true;
        }),
    ],
    [
      createAsyncIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) > 10),
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      createAsyncIterableFixture(['']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      createAsyncIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(4),
    ],
    [
      createAsyncIterableFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .isSorted(),
    ],
    [
      createAsyncIterableFixture([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .isReversed(),
    ],
    [
      createAsyncIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch(async (x) => {
          await asyncTimeout(1);
          return (x as number) === 3;
        }),
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([1]),
    ],
    [
      createAsyncIterableFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      createAsyncIterableFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(['1']),
    ],
    [
      createAsyncIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
    [
      createAsyncIterableFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      createAsyncIterableFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}

function dataProviderForAsyncIteratorsFalse(): Array<unknown> {
  return [
    [
      createAsyncIteratorFixture([1, 3, -5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allMatch(async (x) => {
          await asyncTimeout(1);
          return (x as number) > 0;
        }),
    ],
    [
      createAsyncIteratorFixture([1, 2, 1, 3]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch(async () => {
          await asyncTimeout(1);
          return true;
        }),
    ],
    [
      createAsyncIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) > 10),
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      createAsyncIteratorFixture(['']),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      createAsyncIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .exactlyN(4),
    ],
    [
      createAsyncIteratorFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .isSorted(),
    ],
    [
      createAsyncIteratorFixture([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .isReversed(),
    ],
    [
      createAsyncIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .noneMatch(async (x) => {
          await asyncTimeout(1);
          return (x as number) === 3;
        }),
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([1]),
    ],
    [
      createAsyncIteratorFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      createAsyncIteratorFixture([1]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameWith(['1']),
    ],
    [
      createAsyncIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
    [
      createAsyncIteratorFixture([]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      createAsyncIteratorFixture([1, 3, 5]),
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}
