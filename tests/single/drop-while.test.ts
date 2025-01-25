import {
  asyncTimeout,
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture
  // @ts-ignore
} from "../fixture";
import { single } from "../../src";

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])(
  "Single Drop While Test",
  (input, predicate, expected) => {
    it("", () => {
      // Given
      const result = [];

      // When
      for (const item of single.dropWhile(input, predicate)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForAsyncGenerators(),
  ...dataProviderForAsyncIterables(),
  ...dataProviderForAsyncIterators(),
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])(
  "Single Drop While Async Test",
  (input, predicate, expected) => {
    it("", async () => {
      // Given
      const result = [];

      // When
      for await (const item of single.dropWhileAsync(input, predicate)) {
        result.push(item);
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<[Array<any>, (x: any) => boolean, Array<any>]> {
  return [
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x < 0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x < 1,
      [1, 2, 3, 4, 5],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x < 2,
      [2, 3, 4, 5],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x < 3,
      [3, 4, 5],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x < 4,
      [4, 5],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x < 5,
      [5],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x < 6,
      [],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x > 0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x > 1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      (x: number) => x > -1,
      [],
    ],
    [
      [5, 4, 3, 2, 1, 0],
      (x: number) => x > 2,
      [2, 1, 0],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      () => true,
      [],
    ],
    [
      [0, 1, 2, 3, 4, 5],
      () => false,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      [1, 4, 6, 4, 1],
      (x: number) => x < 5,
      [6, 4, 1],
    ],
    [
      [50, 60, 70, 85, 65, 90],
      (x: number) => x < 70,
      [70, 85, 65, 90],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<any>, (x: any) => boolean, Array<any>]> {
  return [
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 1,
      [1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 2,
      [2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 3,
      [3, 4, 5],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 4,
      [4, 5],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 5,
      [5],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 6,
      [],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > -1,
      [],
    ],
    [
      createGeneratorFixture([5, 4, 3, 2, 1, 0]),
      (x: number) => x > 2,
      [2, 1, 0],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      () => true,
      [],
    ],
    [
      createGeneratorFixture([0, 1, 2, 3, 4, 5]),
      () => false,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createGeneratorFixture([1, 4, 6, 4, 1]),
      (x: number) => x < 5,
      [6, 4, 1],
    ],
    [
      createGeneratorFixture([50, 60, 70, 85, 65, 90]),
      (x: number) => x < 70,
      [70, 85, 65, 90],
    ],
  ];
}

function dataProviderForIterables(): Array<[Iterable<any>, (x: any) => boolean, Array<any>]> {
  return [
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 1,
      [1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 2,
      [2, 3, 4, 5],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 3,
      [3, 4, 5],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 4,
      [4, 5],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 5,
      [5],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 6,
      [],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > -1,
      [],
    ],
    [
      createIterableFixture([5, 4, 3, 2, 1, 0]),
      (x: number) => x > 2,
      [2, 1, 0],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      () => true,
      [],
    ],
    [
      createIterableFixture([0, 1, 2, 3, 4, 5]),
      () => false,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createIterableFixture([1, 4, 6, 4, 1]),
      (x: number) => x < 5,
      [6, 4, 1],
    ],
    [
      createIterableFixture([50, 60, 70, 85, 65, 90]),
      (x: number) => x < 70,
      [70, 85, 65, 90],
    ],
  ];
}

function dataProviderForIterators(): Array<[Iterator<any>, (x: any) => boolean, Array<any>]> {
  return [
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 1,
      [1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 2,
      [2, 3, 4, 5],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 3,
      [3, 4, 5],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 4,
      [4, 5],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 5,
      [5],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 6,
      [],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > -1,
      [],
    ],
    [
      createIteratorFixture([5, 4, 3, 2, 1, 0]),
      (x: number) => x > 2,
      [2, 1, 0],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      () => true,
      [],
    ],
    [
      createIteratorFixture([0, 1, 2, 3, 4, 5]),
      () => false,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createIteratorFixture([1, 4, 6, 4, 1]),
      (x: number) => x < 5,
      [6, 4, 1],
    ],
    [
      createIteratorFixture([50, 60, 70, 85, 65, 90]),
      (x: number) => x < 70,
      [70, 85, 65, 90],
    ],
  ];
}

function dataProviderForStrings(): Array<[string, (x: any) => boolean, Array<any>]> {
  return [
    [
      '012345',
      (x: string) => Number(x as string) < 0,
      ['0', '1', '2', '3', '4', '5'],
    ],
    [
      '012345',
      (x: string) => Number(x as string) < 1,
      ['1', '2', '3', '4', '5'],
    ],
    [
      '012345',
      (x: string) => Number(x as string) < 2,
      ['2', '3', '4', '5'],
    ],
    [
      '012345',
      (x: string) => Number(x as string) < 3,
      ['3', '4', '5'],
    ],
    [
      '012345',
      (x: string) => Number(x as string) < 4,
      ['4', '5'],
    ],
    [
      '012345',
      (x: string) => Number(x as string) < 5,
      ['5'],
    ],
    [
      '012345',
      (x: string) => Number(x as string) < 6,
      [],
    ],
    [
      '012345',
      (x: string) => Number(x as string) > 0,
      ['0', '1', '2', '3', '4', '5'],
    ],
    [
      '012345',
      (x: string) => Number(x as string) > 1,
      ['0', '1', '2', '3', '4', '5'],
    ],
    [
      '012345',
      (x: string) => Number(x as string) > -1,
      [],
    ],
    [
      '012345',
      () => true,
      [],
    ],
    [
      '012345',
      () => false,
      ['0', '1', '2', '3', '4', '5'],
    ],
    [
      '14641',
      (x: string) => Number(x as string) < 5,
      ['6', '4', '1'],
    ],
  ];
}

function dataProviderForSets(): Array<[Set<any>, (x: any) => boolean, Array<any>]> {
  return [
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 1,
      [1, 2, 3, 4, 5],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 2,
      [2, 3, 4, 5],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 3,
      [3, 4, 5],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 4,
      [4, 5],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 5,
      [5],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 6,
      [],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      (x: number) => x > -1,
      [],
    ],
    [
      new Set([5, 4, 3, 2, 1, 0]),
      (x: number) => x > 2,
      [2, 1, 0],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      () => true,
      [],
    ],
    [
      new Set([0, 1, 2, 3, 4, 5]),
      () => false,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      new Set([1, 4, 6, 4, 1]),
      (x: number) => x < 5,
      [6],
    ],
    [
      new Set([50, 60, 70, 85, 65, 90]),
      (x: number) => x < 70,
      [70, 85, 65, 90],
    ],
  ];
}

function dataProviderForMaps(): Array<[Map<any, any>, (x: any) => boolean, Array<any>]> {
  return [
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (x: [number, number]) => x[1] < 0,
      [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (x: [number, number]) => x[1] < 1,
      [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (x: [number, number]) => x[1] < 2,
      [[2, 2], [3, 3], [4, 4], [5, 5]],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (x: [number, number]) => x[1] < 3,
      [[3, 3], [4, 4], [5, 5]],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (x: [number, number]) => x[1] < 4,
      [[4, 4], [5, 5]],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (x: [number, number]) => x[1] < 5,
      [[5, 5]],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (x: [number, number]) => x[1] < 6,
      [],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (x: [number, number]) => x[1] > 0,
      [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (x: [number, number]) => x[1] > 1,
      [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      (x: [number, number]) => x[1] > -1,
      [],
    ],
    [
      createMapFixture([5, 4, 3, 2, 1, 0]),
      (x: [number, number]) => x[1] > 2,
      [[3, 2], [4, 1], [5, 0]],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      () => true,
      [],
    ],
    [
      createMapFixture([0, 1, 2, 3, 4, 5]),
      () => false,
      [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]],
    ],
    [
      createMapFixture([1, 4, 6, 4, 1]),
      (x: [number, number]) => x[1] < 5,
      [[2, 6], [3, 4], [4, 1]],
    ],
    [
      createMapFixture([50, 60, 70, 85, 65, 90]),
      (x: [number, number]) => x[1] < 70,
      [[2, 70], [3, 85], [4, 65], [5, 90]],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[AsyncGenerator<any>, (x: any) => boolean | Promise<boolean>, Array<any>]> {
  return [
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 1,
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 2,
      [2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 3,
      [3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 4,
      [4, 5],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 5,
      [5],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 6,
      [],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > -1,
      [],
    ],
    [
      createAsyncGeneratorFixture([5, 4, 3, 2, 1, 0]),
      (x: number) => x > 2,
      [2, 1, 0],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      () => true,
      [],
    ],
    [
      createAsyncGeneratorFixture([0, 1, 2, 3, 4, 5]),
      () => false,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncGeneratorFixture([1, 4, 6, 4, 1]),
      (x: number) => x < 5,
      [6, 4, 1],
    ],
    [
      createAsyncGeneratorFixture([50, 60, 70, 85, 65, 90]),
      (x: number) => x < 70,
      [70, 85, 65, 90],
    ],
    [
      createAsyncGeneratorFixture([50, 60, 70, 85, 65, 90]),
      async (x: number) => {
        await asyncTimeout(1);
        return x < 70;
      },
      [70, 85, 65, 90],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[AsyncIterable<any>, (x: any) => boolean | Promise<boolean>, Array<any>]> {
  return [
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 1,
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 2,
      [2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 3,
      [3, 4, 5],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 4,
      [4, 5],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 5,
      [5],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 6,
      [],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > -1,
      [],
    ],
    [
      createAsyncIterableFixture([5, 4, 3, 2, 1, 0]),
      (x: number) => x > 2,
      [2, 1, 0],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      () => true,
      [],
    ],
    [
      createAsyncIterableFixture([0, 1, 2, 3, 4, 5]),
      () => false,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncIterableFixture([1, 4, 6, 4, 1]),
      (x: number) => x < 5,
      [6, 4, 1],
    ],
    [
      createAsyncIterableFixture([50, 60, 70, 85, 65, 90]),
      (x: number) => x < 70,
      [70, 85, 65, 90],
    ],
    [
      createAsyncIterableFixture([50, 60, 70, 85, 65, 90]),
      async (x: number) => {
        await asyncTimeout(1);
        return x < 70;
      },
      [70, 85, 65, 90],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[AsyncIterator<any>, (x: any) => boolean | Promise<boolean>, Array<any>]> {
  return [
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 1,
      [1, 2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 2,
      [2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 3,
      [3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 4,
      [4, 5],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 5,
      [5],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x < 6,
      [],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 0,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > 1,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      (x: number) => x > -1,
      [],
    ],
    [
      createAsyncIteratorFixture([5, 4, 3, 2, 1, 0]),
      (x: number) => x > 2,
      [2, 1, 0],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      () => true,
      [],
    ],
    [
      createAsyncIteratorFixture([0, 1, 2, 3, 4, 5]),
      () => false,
      [0, 1, 2, 3, 4, 5],
    ],
    [
      createAsyncIteratorFixture([1, 4, 6, 4, 1]),
      (x: number) => x < 5,
      [6, 4, 1],
    ],
    [
      createAsyncIteratorFixture([50, 60, 70, 85, 65, 90]),
      (x: number) => x < 70,
      [70, 85, 65, 90],
    ],
    [
      createAsyncIteratorFixture([50, 60, 70, 85, 65, 90]),
      async (x: number) => {
        await asyncTimeout(1);
        return x < 70;
      },
      [70, 85, 65, 90],
    ],
  ];
}
