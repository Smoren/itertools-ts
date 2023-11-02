import { infinite } from "../../src";
// @ts-ignore

describe.each([
  ...dataProvider(),
] as Array<[Array<number>, number, Array<number>]>)(
  "Infinite Repeat Test",
  (
    itemToRepeat: unknown,
    limit: number,
    expected: Array<number>
  ) => {
    it("", () => {
      // Given
      const result = [];

      // When
      let i = 0;
      for (const item of infinite.repeat(itemToRepeat)) {
        result.push(item);

        if (++i === limit) {
          break;
        }
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProvider(): Array<unknown> {
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
