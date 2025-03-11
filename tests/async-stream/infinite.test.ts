// @ts-ignore
import { expectToBeCloseToArray } from "../fixture";
import {AsyncStream, InvalidArgumentError} from '../../src';

describe.each([
  ...dataProviderForOfCount(),
])(
  "Stream Infinite Of Count Test",
  (inputParams, limit: number, expected) => {
    it("", async () => {
      // When
      const stream = AsyncStream.ofCount(...inputParams);
      const result = await stream.limit(limit).toArray();

      // Then
      expectToBeCloseToArray(result, expected);
    });
  }
);

describe.each([
  ...dataProviderForOfCycle(),
])(
  "Stream Infinite Of Cycle Test",
  <T>(iterable: Iterable<T>, limit: number, expected: Array<T>) => {
    it("", async () => {
      // When
      const stream = AsyncStream.ofCycle(iterable);
      const result = await stream.limit(limit).toArray();

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForOfRepeat(),
])(
  "Stream Infinite Of Repeat Test",
  <T>(itemToRepeat: T, limit: number, expected: Array<T>) => {
    it("", async () => {
      // When
      const stream = AsyncStream.ofRepeat(itemToRepeat);
      const result = await stream.limit(limit).toArray();

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe("Stream Infinite Of Random Integers", () => {

  it("Should provide proper integers", async () => {
    const stream = AsyncStream.ofIntegers(1, 100);
    const result = await stream.limit(10).toArray();

    expect(result.length).toEqual(10);

    for(let i = 0; i < result.length; i++) {
      expect(result[i]).toBeGreaterThanOrEqual(1);
      expect(result[i]).toBeLessThanOrEqual(100);
    }
  })

  it("Should throw if min is bigger than max", async () => {
    const stream = AsyncStream.ofIntegers(101, 100);
    await expect(async () => await stream.limit(5).toArray())
      .rejects.toBeInstanceOf(InvalidArgumentError);
  })

  it("Should be equivalent to repeat if min and max are equal", async () => {
    const integerStream = AsyncStream.ofIntegers(100, 100);
    const repeatStream = AsyncStream.ofRepeat(100);
    expect(await repeatStream.limit(5).toArray())
      .toEqual(await integerStream.limit(5).toArray());
  })

})

function dataProviderForOfCount(): Array<[Array<number>, number, Array<number>]> {
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

function dataProviderForOfCycle(): Array<[Array<unknown>, number, Array<unknown>]> {
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

function dataProviderForOfRepeat(): Array<[unknown, number, Array<unknown>]> {
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
