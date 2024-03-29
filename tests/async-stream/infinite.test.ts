// @ts-ignore
import { expectToBeCloseToArray } from "../fixture";
import { AsyncStream } from '../../src';

describe.each([
  ...dataProviderForOfCount(),
] as Array<[Array<number>, number, Array<number>]>)(
  "Stream Infinite Of Count Test",
  (
    inputParams: Array<number>,
    limit: number,
    expected: Array<number>
  ) => {
    it("", async () => {
      // When
      const stream = AsyncStream.ofCount(...inputParams);
      const result = await stream.limit(limit).toArray() as Array<number>;

      // Then
      expectToBeCloseToArray(result, expected);
    });
  }
);

describe.each([
  ...dataProviderForOfCycle(),
] as Array<[Array<number>, number, Array<number>]>)(
  "Stream Infinite Of Cycle Test",
  (
    iterable: Iterable<unknown>,
    limit: number,
    expected: Array<number>
  ) => {
    it("", async () => {
      // When
      const stream = AsyncStream.ofCycle(iterable);
      const result = await stream.limit(limit).toArray() as Array<number>;

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForOfRepeat(),
] as Array<[Array<number>, number, Array<number>]>)(
  "Stream Infinite Of Repeat Test",
  (
    itemToRepeat: unknown,
    limit: number,
    expected: Array<number>
  ) => {
    it("", async () => {
      // When
      const stream = AsyncStream.ofRepeat(itemToRepeat);
      const result = await stream.limit(limit).toArray() as Array<number>;

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForOfCount(): Array<unknown> {
  return [
    [
      [],
      5,
      [1, 2, 3, 4, 5],
    ],
    [
      [],
      10,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
    [
      [0],
      5,
      [0, 1, 2, 3, 4],
    ],
    [
      [-1],
      5,
      [-1, 0, 1, 2, 3],
    ],
    [
      [1, 2],
      5,
      [1, 3, 5, 7, 9],
    ],
    [
      [0, -1],
      5,
      [0, -1, -2, -3, -4],
    ],
    [
      [-1, -2],
      5,
      [-1, -3, -5, -7, -9],
    ],
    [
      [2, 0.1],
      5,
      [2, 2.1, 2.2, 2.3, 2.4],
    ],
    [
      [-2.2, -1.2],
      5,
      [-2.2, -3.4, -4.6, -5.8, -7],
    ],
  ];
}

function dataProviderForOfCycle(): Array<unknown> {
  return [
    [
      [],
      5,
      [],
    ],
    [
      [''],
      3,
      ['', '', ''],
    ],
    [
      [null],
      5,
      [null, null, null, null, null],
    ],
    [
      [0, 1, 2],
      10,
      [0, 1, 2, 0, 1, 2, 0, 1, 2, 0],
    ],
    [
      [1, 1],
      6,
      [1, 1, 1, 1, 1, 1],
    ],
    [
      ['0', '1', '2'],
      10,
      ['0', '1', '2', '0', '1', '2', '0', '1', '2', '0'],
    ],
    [
      [[], []],
      6,
      [[], [], [], [], [], []],
    ],
    [
      [[], [1]],
      6,
      [[], [1], [], [1], [], [1]],
    ],
  ];
}

function dataProviderForOfRepeat(): Array<unknown> {
  return [
    [
      0,
      5,
      [0, 0, 0, 0, 0],
    ],
    [
      1,
      5,
      [1, 1, 1, 1, 1],
    ],
    [
      1.1,
      5,
      [1.1, 1.1, 1.1, 1.1, 1.1],
    ],
    [
      null,
      5,
      [null, null, null, null, null],
    ],
    [
      '',
      5,
      ['', '', '', '', ''],
    ],
    [
      [],
      5,
      [[], [], [], [], []],
    ],
    [
      [1, 2, 3],
      5,
      [[1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3]],
    ],
    [
      {a: 1},
      5,
      [{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 1}],
    ],
    [
      {a: [[1]]},
      3,
      [{a: [[1]]}, {a: [[1]]}, {a: [[1]]}],
    ],
  ];
}
