// @ts-ignore
import { createGeneratorFixture, createIterableFixture } from '../fixture';
import { UsageMap } from '../../src/tools';

describe.each(dataProvider())("Tools Usage Map Test", (input) => {
  it("", () => {
    // Given
    const map = new UsageMap();

    // When
    for (const item of input as Array<unknown>) {
      // Then
      expect(map.getOwnersCount(item)).toBe(0);
      expect(map.getUsagesCount(item)).toBe(0);

      // And when
      map.addUsage(item, '1');

      // Then
      expect(map.getOwnersCount(item)).toBe(1);
      expect(map.getUsagesCount(item)).toBe(1);
    }
  });
});

function dataProvider(): Array<unknown> {
  return [
    [
      [1],
    ],
    [
      ['1'],
    ],
    [
      [1, 2, 3],
    ],
    [
      ['1', '2', '3'],
    ],
  ];
}
