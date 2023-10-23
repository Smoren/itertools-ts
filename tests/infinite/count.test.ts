import { infinite } from "../../src";
// @ts-ignore
import { expectToBeCloseToArray } from '../fixture';

describe.each([
  ...dataProvider(),
] as Array<[Array<number>, number, Array<number>]>)(
  "Infinite Count Test",
  (
    inputParams: Array<number>,
    limit: number,
    expected: Array<number>
  ) => {
    it("", () => {
      // Given
      const result = [];

      // When
      let i = 0;
      for (const item of infinite.count(...inputParams)) {
        result.push(item);

        if (++i === limit) {
          break;
        }
      }

      // Then
      expectToBeCloseToArray(result, expected);
    });
  }
);

function dataProvider(): Array<unknown> {
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
