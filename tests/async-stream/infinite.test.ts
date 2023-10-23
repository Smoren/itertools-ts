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
