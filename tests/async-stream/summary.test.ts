import { AsyncStream, Numeric } from '../../src';
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
])(
  "AsyncStream Summary Test True",
  (input, streamFactory) => {
    it("", async () => {
      // Given
      const result = await streamFactory(input as any);

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
])(
  "AsyncStream Summary Test False",
  (input, streamFactory) => {
    it("", async () => {
      // Given
      const result = await streamFactory(input as any);

      // Then
      expect(result).toBeFalsy();
    });
  }
);

function dataProviderForArraysTrue(): Array<[Array<any>, (iterable: Array<any>) => Promise<boolean>]> {
  return [
    [
      [],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .allMatch((x) => x > 0),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .allMatch((x) => x > 0),
    ],
    [
      [],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      [1, '1', true, [1], [1]],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .anyMatch((x) => x === 3),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .anyMatch((x) => x > 0),
    ],
    [
      [],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      [''],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .exactlyN(3),
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .filter((item) => item > 0)
        .runningTotal()
        .isSorted(),
    ],
    [
      [5, -1, 4, -2, 3, -3, 2, -4, 1, -5],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .filter((item) => item > 0)
        .isReversed(),
    ],
    [
      [],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .noneMatch(() => true),
    ],
    [
      [],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .noneMatch(() => false),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .noneMatch((x) => x === 9),
    ],
    [
      [],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      [],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      [1, 2, 3],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<unknown | Iterator<unknown>>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      [],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .sameCountWith([]),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<number> | Iterator<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForGeneratorsTrue(): Array<[Generator<any>, (iterable: Generator<any>) => Promise<boolean>]> {
  return dataProviderForArraysTrue().map((item) => [
    createGeneratorFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<Numeric> | Iterator<Numeric>) => Promise<boolean>],
  ]);
}

function dataProviderForIterablesTrue(): Array<[Iterable<any>, (iterable: Iterable<any>) => Promise<boolean>]> {
  return dataProviderForArraysTrue().map((item) => [
    createIterableFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<Numeric> | Iterator<Numeric>) => Promise<boolean>],
  ]);
}

function dataProviderForIteratorsTrue(): Array<[Iterator<any>, (iterable: Iterator<any>) => Promise<boolean>]> {
  return dataProviderForArraysTrue().map((item) => [
    createIteratorFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<Numeric> | Iterator<Numeric>) => Promise<boolean>],
  ]);
}

function dataProviderForStringsTrue(): Array<[string, (iterable: string) => Promise<boolean>]> {
  return [
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .allMatch((x) => Number(x) > 0),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .allMatch((x) => Number(x) > 0),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      '12345',
      (iterable) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .anyMatch((x) => Number(x) === 3),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .anyMatch((x) => Number(x) > 0),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      '123',
      (iterable) => AsyncStream.of(iterable)
        .runningTotal()
        .isSorted(),
    ],
    [
      '54321',
      (iterable) => AsyncStream.of(iterable)
        .isReversed(),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .noneMatch(() => true),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .noneMatch(() => false),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .noneMatch((x) => Number(x) === 9),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      '123',
      (iterable) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .sameWith(['1', '3', '5']),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .sameCountWith([]),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForSetsTrue(): Array<[Set<any>, (iterable: Set<any>) => Promise<boolean>]> {
  return [
    [
      new Set([]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .allMatch((x) => x > 0),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .allMatch((x) => x > 0),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      new Set([1, '1', true, [1], [1]]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      new Set([1, 1, 1, 1, 1]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .anyMatch((x) => x === 3),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .anyMatch((x) => x > 0),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      new Set(['']),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .exactlyN(3),
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .filter((item) => item > 0)
        .runningTotal()
        .isSorted(),
    ],
    [
      new Set([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .filter((item) => item > 0)
        .isReversed(),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .noneMatch(() => true),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .noneMatch(() => false),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .noneMatch((x) => x === 9),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      new Set([1, 2, 3]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([]),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForMapsTrue(): Array<[Map<any, any>, (iterable: Map<any, any>) => Promise<boolean>]> {
  return [
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .allMatch((x) => x[1] > 0),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .allMatch((x) => x[1] > 0),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((data) => data[1])
        .allUnique(),
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((data) => data[1])
        .allUnique(),
    ],
    [
      createMapFixture([1, '1', true, [1], [1]]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((data) => data[1])
        .allUnique(),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .anyMatch((x) => x[1] === 3),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .anyMatch((x) => x[1] > 0),
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .filter((item) => item > 0)
        .runningTotal()
        .isSorted(),
    ],
    [
      createMapFixture([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .filter((item) => item > 0)
        .isReversed(),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .noneMatch(() => true),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .noneMatch(() => false),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .noneMatch((x) => x[1] === 9),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      createMapFixture([1, 2, 3]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .sameCountWith([]),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForAsyncTrue(): Array<[Array<any>, (iterable: AsyncIterable<any> | AsyncIterator<any>) => Promise<boolean>]> {
  return [
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .allMatch(async (x) => {
          await asyncTimeout(1);
          return (x as number) > 0;
        }),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .allMatch((x) => (x as number) > 0),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      [1, 2, 3, 4, 5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      [1, '1', true, [1], [1]],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .anyMatch(async (x) => {
          await asyncTimeout(1);
          return (x as number) === 3;
        }),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) > 0),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      [''],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .exactlyN(0),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .exactlyN(3),
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .filter((item) => (item as number) > 0)
        .runningTotal()
        .isSorted(),
    ],
    [
      [5, -1, 4, -2, 3, -3, 2, -4, 1, -5],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .filter((item) => (item as number) > 0)
        .isReversed(),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .noneMatch(async () => {
          await asyncTimeout(1);
          return true;
        }),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .noneMatch(() => false),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .noneMatch((x) => (x as number) === 9),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      [1, 2, 3],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .sameWith(),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 9]),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([]),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22, 33]),
    ],
  ];
}

function dataProviderForAsyncGeneratorsTrue(): Array<[AsyncGenerator<any>, (iterable: AsyncGenerator<any>) => Promise<boolean>]> {
  return dataProviderForAsyncTrue().map((item) => [
    createAsyncGeneratorFixture(item[0]),
    ...item.slice(1) as [(iterable: AsyncIterable<Numeric> | AsyncIterator<Numeric>) => Promise<boolean>],
  ]);
}

function dataProviderForAsyncIterablesTrue(): Array<[AsyncIterable<any>, (iterable: AsyncIterable<any>) => Promise<boolean>]> {
  return dataProviderForAsyncTrue().map((item) => [
    createAsyncIterableFixture(item[0]),
    ...item.slice(1) as [(iterable: AsyncIterable<Numeric> | AsyncIterator<Numeric>) => Promise<boolean>],
  ]);
}

function dataProviderForAsyncIteratorsTrue(): Array<[AsyncIterator<any>, (iterable: AsyncIterator<any>) => Promise<boolean>]> {
  return dataProviderForAsyncTrue().map((item) => [
    createAsyncIteratorFixture(item[0]),
    ...item.slice(1) as [(iterable: AsyncIterable<Numeric> | AsyncIterator<Numeric>) => Promise<boolean>],
  ]);
}

function dataProviderForArraysFalse(): Array<[Array<any>, (iterable: Array<any>) => Promise<boolean>]> {
  return [
    [
      [1, 3, -5],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .allMatch((x) => x > 0),
    ],
    [
      [1, 2, 1, 3],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      [],
      (iterable: Iterable<unknown>) => AsyncStream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      [1, 3, 5],
      (iterable: Iterable<number>) => AsyncStream.of(iterable)
        .anyMatch((x) => x > 10),
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
        .noneMatch((x) => x === 3),
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

function dataProviderForGeneratorsFalse(): Array<[Generator<any>, (iterable: Generator<any>) => Promise<boolean>]> {
  return dataProviderForArraysFalse().map((item) => [
    createGeneratorFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<Numeric> | Iterator<Numeric>) => Promise<boolean>],
  ]);
}

function dataProviderForIterablesFalse(): Array<[Iterable<any>, (iterable: Iterable<any>) => Promise<boolean>]> {
  return dataProviderForArraysFalse().map((item) => [
    createIterableFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<Numeric> | Iterator<Numeric>) => Promise<boolean>],
  ]);
}

function dataProviderForIteratorsFalse(): Array<[Iterator<any>, (iterable: Iterator<any>) => Promise<boolean>]> {
  return dataProviderForArraysFalse().map((item) => [
    createIteratorFixture(item[0]),
    ...item.slice(1) as [(iterable: Iterable<Numeric> | Iterator<Numeric>) => Promise<boolean>],
  ]);
}

function dataProviderForStringsFalse(): Array<[string, (iterable: string) => Promise<boolean>]> {
  return [
    [
      '123',
      (iterable) => AsyncStream.of(iterable)
        .allMatch((x) => Number(x) > 1),
    ],
    [
      '1231',
      (iterable) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .anyMatch((x) => Number(x) > 10),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      '131',
      (iterable) => AsyncStream.of(iterable)
        .isSorted(),
    ],
    [
      '123',
      (iterable) => AsyncStream.of(iterable)
        .isReversed(),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .noneMatch((x) => Number(x) === 3),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .sameWith([1]),
    ],
    [
      '1',
      (iterable) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      '1',
      (iterable) => AsyncStream.of(iterable)
        .sameWith([1]),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .sameWith(['1', '3', '4']),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
    [
      '',
      (iterable) => AsyncStream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      '135',
      (iterable) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}

function dataProviderForSetsFalse(): Array<[Set<any>, (iterable: Set<any>) => Promise<boolean>]> {
  return [
    [
      new Set([1, 3, -5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .allMatch((x) => x > 0),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .anyMatch((x) => x > 10),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      new Set(['']),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .exactlyN(4),
    ],
    [
      new Set([1, -1, 2, -2, 3, -3]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .isSorted(),
    ],
    [
      new Set([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .isReversed(),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .noneMatch((x) => x === 3),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .sameWith([1]),
    ],
    [
      new Set([1]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      new Set([1]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .sameWith(['1']),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
    [
      new Set([]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      new Set([1, 3, 5]),
      (iterable: Set<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}

function dataProviderForMapsFalse(): Array<[Map<any, any>, (iterable: Map<any, any>) => Promise<boolean>]> {
  return [
    [
      createMapFixture([1, 3, -5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .allMatch((x) => x[1] > 0),
    ],
    [
      createMapFixture([1, 2, 1, 3]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .allUnique(),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .anyMatch(() => true),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .anyMatch((x) => x[1] > 10),
    ],
    [
      createMapFixture([1, -1, 2, -2, 3, -3]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .isSorted(),
    ],
    [
      createMapFixture([5, -1, 4, -2, 3, -3, 2, -4, 1, -5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .isReversed(),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .noneMatch((x) => x[1] === 3),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .sameWith([1]),
    ],
    [
      createMapFixture([1]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .sameWith([]),
    ],
    [
      createMapFixture([1]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .sameWith(['1']),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .map((item) => item[1])
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
    [
      createMapFixture([]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      createMapFixture([1, 3, 5]),
      (iterable: Map<unknown, number>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}

function dataProviderForAsyncFalse(): Array<[Array<any>, (iterable: AsyncIterable<any> | AsyncIterator<any>) => Promise<boolean>]> {
  return [
    [
      [1, 3, -5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .allMatch(async (x) => {
          await asyncTimeout(1);
          return (x as number) > 0;
        }),
    ],
    [
      [1, 2, 1, 3],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .allUnique(),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .anyMatch(async () => {
          await asyncTimeout(1);
          return true;
        }),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .anyMatch((x) => (x as number) > 10),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      [''],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .exactlyN(1),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .exactlyN(4),
    ],
    [
      [1, -1, 2, -2, 3, -3],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .runningTotal()
        .isSorted(),
    ],
    [
      [5, -1, 4, -2, 3, -3, 2, -4, 1, -5],
      (iterable: AsyncIterable<number> | AsyncIterator<number>) => AsyncStream.of(iterable)
        .isReversed(),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .noneMatch(async (x) => {
          await asyncTimeout(1);
          return (x as number) === 3;
        }),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .sameWith([1]),
    ],
    [
      [1],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .sameWith([]),
    ],
    [
      [1],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .sameWith(['1']),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameWith([1, 4, 10]),
    ],
    [
      [],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .sameCountWith([1, 2, 3]),
    ],
    [
      [1, 3, 5],
      (iterable: AsyncIterable<unknown> | AsyncIterator<unknown>) => AsyncStream.of(iterable)
        .runningTotal()
        .sameCountWith([11, 22]),
    ],
  ];
}

function dataProviderForAsyncGeneratorsFalse(): Array<[AsyncGenerator<any>, (iterable: AsyncGenerator<any>) => Promise<boolean>]> {
  return dataProviderForAsyncFalse().map((item) => [
    createAsyncGeneratorFixture(item[0]),
    ...item.slice(1) as [(iterable: AsyncIterable<Numeric> | AsyncIterator<Numeric>) => Promise<boolean>],
  ]);
}

function dataProviderForAsyncIterablesFalse(): Array<[AsyncIterable<any>, (iterable: AsyncIterable<any>) => Promise<boolean>]> {
  return dataProviderForAsyncFalse().map((item) => [
    createAsyncIterableFixture(item[0]),
    ...item.slice(1) as [(iterable: AsyncIterable<Numeric> | AsyncIterator<Numeric>) => Promise<boolean>],
  ]);
}

function dataProviderForAsyncIteratorsFalse(): Array<[AsyncIterator<any>, (iterable: AsyncIterator<any>) => Promise<boolean>]> {
  return dataProviderForAsyncFalse().map((item) => [
    createAsyncIteratorFixture(item[0]),
    ...item.slice(1) as [(iterable: AsyncIterable<Numeric> | AsyncIterator<Numeric>) => Promise<boolean>],
  ]);
}
