import {
  createAsyncGeneratorFixture, createAsyncIterableFixture, createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
  createMapFixture
  // @ts-ignore
} from '../fixture';
import { transform, multi, reduce } from '../../src';

test("Transform Tee Test Example Usage Transform To Array", () => {
  // Given
  const data = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

  // When
  const [week1, week2, week3] = transform.tee(data, 3);

  // Then
  expect(transform.toArray(week2)).toEqual(data);
  expect(transform.toArray(week1)).toEqual(data);
  expect(transform.toArray(week3)).toEqual(data);
});

test("Transform Tee Async Test Example Usage Transform To Array", async () => {
  // Given
  const data = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

  // When
  const [week1, week2, week3] = transform.teeAsync(createAsyncGeneratorFixture(data), 3);

  // Then
  expect(await transform.toArrayAsync(week2)).toEqual(data);
  expect(await transform.toArrayAsync(week1)).toEqual(data);
  expect(await transform.toArrayAsync(week3)).toEqual(data);
});

test("Transform Tee Test Example Usage Iterating Multiple Iterables", () => {
  // Given
  const data = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
  const count = 3;

  // And
  const result = [];

  // When
  for (const week of transform.tee(data, count)) {
    const resultPart: Array<string> = [];
    result.push(resultPart);
    for (const day of week) {
      resultPart.push(day);
    }
  }

  // Then
  expect(result[0]).toEqual(data);
  expect(result[1]).toEqual(data);
  expect(result[2]).toEqual(data);
});

test("Transform Tee Async Test Example Usage Iterating Multiple Iterables", async () => {
  // Given
  const data = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
  const count = 3;

  // And
  const result = [];

  // When
  for (const week of transform.teeAsync(createAsyncIterableFixture(data), count)) {
    const resultPart: Array<string> = [];
    result.push(resultPart);
    for await (const day of week) {
      resultPart.push(day);
    }
  }

  // Then
  expect(result[0]).toEqual(data);
  expect(result[1]).toEqual(data);
  expect(result[2]).toEqual(data);
});

test("Transform Tee Test Example Usage Zip and chain", () => {
  // Given
  const data = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
  const count = 5;

  // And
  const result: Array<Array<string>> = [[], [], [], [], []];
  const [week0, week1, week2, week3, week4] = transform.tee(data, count);

  // When
  for (const [day1, day3] of multi.zipEqual(week1, week3)) {
    result[1].push(day1);
    result[3].push(day3);
  }

  for (const day2 of week2) {
    result[2].push(day2);
  }

  for (const [day4, day0] of multi.zipEqual(week4, week0)) {
    result[4].push(day4);
    result[0].push(day0);
  }

  // Then
  expect(result[0]).toEqual(data);
  expect(result[1]).toEqual(data);
  expect(result[2]).toEqual(data);
  expect(result[3]).toEqual(data);
  expect(result[4]).toEqual(data);
});

test("Transform Tee Async Test Example Usage Zip and chain", async () => {
  // Given
  const data = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
  const count = 5;

  // And
  const result: Array<Array<string>> = [[], [], [], [], []];
  const [week0, week1, week2, week3, week4] = transform.teeAsync(createAsyncIteratorFixture(data), count);

  // When
  for await (const [day1, day3] of multi.zipEqualAsync(week1, week3)) {
    result[1].push(day1);
    result[3].push(day3);
  }

  for await (const day2 of week2) {
    result[2].push(day2);
  }

  for await (const [day4, day0] of multi.zipEqualAsync(week4, week0)) {
    result[4].push(day4);
    result[0].push(day0);
  }

  // Then
  expect(result[0]).toEqual(data);
  expect(result[1]).toEqual(data);
  expect(result[2]).toEqual(data);
  expect(result[3]).toEqual(data);
  expect(result[4]).toEqual(data);
});

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
] as Array<[Iterable<unknown>, number, Array<Array<unknown>>]>)(
  "Transform Tee Chain Test",
  (
    input: Iterable<unknown>,
    relatedCount: number,
    expected: Array<Array<unknown>>,
  ) => {
    it("", () => {
      // Given
      const iterables = transform.tee(input, relatedCount);
      const result: Array<Array<unknown>> = (new Array(relatedCount)).fill(undefined).map(() => []);

      // When
      let i = 0;
      for (const iterable of iterables) {
        for (const value of iterable) {
          result[i].push(value);
        }
        ++i;
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
  "Transform Tee Async Chain Test",
  (input, relatedCount, expected) => {
    it("", async () => {
      // Given
      const iterables = transform.teeAsync(input, relatedCount);
      const result: Array<Array<unknown>> = (new Array(relatedCount)).fill(undefined).map(() => []);

      // When
      let i = 0;
      for (const iterable of iterables) {
        for await (const value of iterable) {
          result[i].push(value);
        }
        ++i;
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])(
  "Transform Tee Zip Test",
  (input, relatedCount, expected) => {
    it("", () => {
      // Given
      const iterables = transform.tee(input, relatedCount);
      const result: Array<Array<unknown>> = (new Array(relatedCount)).fill(undefined).map(() => []);

      // When
      for (const values of multi.zipEqual(...iterables)) {
        expect(new Set(values).size).toEqual(1);
        for (let i = 0; i < values.length; ++i) {
          result[i].push(values[i]);
        }
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
  "Transform Tee Async Zip Test",
  (input, relatedCount, expected) => {
    it("", async () => {
      // Given
      const iterables = transform.teeAsync(input, relatedCount);
      const result: Array<Array<unknown>> = (new Array(relatedCount)).fill(undefined).map(() => []);

      // When
      for await (const values of multi.zipEqualAsync(...iterables)) {
        expect(new Set(values).size).toEqual(1);
        for (let i = 0; i < values.length; ++i) {
          result[i].push(values[i]);
        }
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForArrays(),
  ...dataProviderForGenerators(),
  ...dataProviderForIterables(),
  ...dataProviderForIterators(),
  ...dataProviderForStrings(),
  ...dataProviderForSets(),
  ...dataProviderForMaps(),
])(
  "Transform Tee Ladder Test",
  (input, relatedCount, expected) => {
    it("", () => {
      // Given
      const iterables = transform.tee(input, relatedCount);
      const result: Array<Array<unknown>> = (new Array(relatedCount)).fill(undefined).map(() => []);

      // When
      let j = 0;
      while (reduce.toValue(
        iterables,
        (carry, datum) => carry ? carry : datum.valid(),
        false
      )) {
        let i = -1;
        for (const iterable of iterables) {
          ++i;

          if (i > j) {
            continue;
          }

          if (!iterable.valid()) {
            continue;
          }

          result[i].push(iterable.current());
          iterable.next();
        }
        ++j;
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
  "Transform Tee Async Ladder Test",
  (input, relatedCount, expected) => {
    it("", async () => {
      // Given
      const iterables = transform.teeAsync(input, relatedCount);
      const result: Array<Array<unknown>> = (new Array(relatedCount)).fill(undefined).map(() => []);

      // When
      let j = 0;
      while (await reduce.toValueAsync(
        iterables,
        (carry, datum) => carry ? carry : datum.valid(),
        false
      )) {
        let i = -1;
        for (const iterable of iterables) {
          ++i;

          if (i > j) {
            continue;
          }

          if (!(await iterable.valid())) {
            continue;
          }

          result[i].push(await iterable.current());
          await iterable.next();
        }
        ++j;
      }

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForArrays(): Array<[Array<any>, number, Array<Array<any>>]> {
  return [
    [
      [],
      1,
      [
        [],
      ],
    ],
    [
      [],
      2,
      [
        [],
        [],
      ],
    ],
    [
      [],
      3,
      [
        [],
        [],
        [],
      ],
    ],
    [
      [1, 2, 3, 4, 5],
      1,
      [
        [1, 2, 3, 4, 5],
      ],
    ],
    [
      [1, 2, 3, 4, 5],
      2,
      [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
      ],
    ],
    [
      [1, 2, 3, 4, 5],
      3,
      [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
      ],
    ],
  ];
}

function dataProviderForGenerators(): Array<[Generator<any>, number, Array<Array<any>>]> {
  return [
    [
      createGeneratorFixture([]),
      1,
      [
        [],
      ],
    ],
    [
      createGeneratorFixture([]),
      2,
      [
        [],
        [],
      ],
    ],
    [
      createGeneratorFixture([]),
      3,
      [
        [],
        [],
        [],
      ],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5]),
      1,
      [
        [1, 2, 3, 4, 5],
      ],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5]),
      2,
      [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
      ],
    ],
    [
      createGeneratorFixture([1, 2, 3, 4, 5]),
      3,
      [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
      ],
    ],
  ];
}

function dataProviderForIterables(): Array<[Iterable<any>, number, Array<Array<any>>]> {
  return [
    [
      createIterableFixture([]),
      1,
      [
        [],
      ],
    ],
    [
      createIterableFixture([]),
      2,
      [
        [],
        [],
      ],
    ],
    [
      createIterableFixture([]),
      3,
      [
        [],
        [],
        [],
      ],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5]),
      1,
      [
        [1, 2, 3, 4, 5],
      ],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5]),
      2,
      [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
      ],
    ],
    [
      createIterableFixture([1, 2, 3, 4, 5]),
      3,
      [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
      ],
    ],
  ];
}

function dataProviderForIterators(): Array<[Iterator<any>, number, Array<Array<any>>]> {
  return [
    [
      createIteratorFixture([]),
      1,
      [
        [],
      ],
    ],
    [
      createIteratorFixture([]),
      2,
      [
        [],
        [],
      ],
    ],
    [
      createIteratorFixture([]),
      3,
      [
        [],
        [],
        [],
      ],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5]),
      1,
      [
        [1, 2, 3, 4, 5],
      ],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5]),
      2,
      [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
      ],
    ],
    [
      createIteratorFixture([1, 2, 3, 4, 5]),
      3,
      [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
      ],
    ],
  ];
}

function dataProviderForStrings(): Array<[string, number, Array<Array<any>>]> {
  return [
    [
      '',
      1,
      [
        [],
      ],
    ],
    [
      '',
      2,
      [
        [],
        [],
      ],
    ],
    [
      '',
      3,
      [
        [],
        [],
        [],
      ],
    ],
    [
      '12345',
      1,
      [
        ['1', '2', '3', '4', '5'],
      ],
    ],
    [
      '12345',
      2,
      [
        ['1', '2', '3', '4', '5'],
        ['1', '2', '3', '4', '5'],
      ],
    ],
    [
      '12345',
      3,
      [
        ['1', '2', '3', '4', '5'],
        ['1', '2', '3', '4', '5'],
        ['1', '2', '3', '4', '5'],
      ],
    ],
  ];
}

function dataProviderForSets(): Array<[Set<any>, number, Array<Array<any>>]> {
  return [
    [
      new Set([]),
      1,
      [
        [],
      ],
    ],
    [
      new Set([]),
      2,
      [
        [],
        [],
      ],
    ],
    [
      new Set([]),
      3,
      [
        [],
        [],
        [],
      ],
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      1,
      [
        [1, 2, 3, 4, 5],
      ],
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      2,
      [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
      ],
    ],
    [
      new Set([1, 2, 3, 4, 5]),
      3,
      [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
      ],
    ],
  ];
}

function dataProviderForMaps(): Array<[Map<any, any>, number, Array<Array<any>>]> {
  return [
    [
      createMapFixture([]),
      1,
      [
        [],
      ],
    ],
    [
      createMapFixture([]),
      2,
      [
        [],
        [],
      ],
    ],
    [
      createMapFixture([]),
      3,
      [
        [],
        [],
        [],
      ],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      1,
      [
        [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
      ],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      2,
      [
        [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
        [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
      ],
    ],
    [
      createMapFixture([1, 2, 3, 4, 5]),
      3,
      [
        [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
        [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
        [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
      ],
    ],
  ];
}

function dataProviderForAsyncGenerators(): Array<[AsyncGenerator<any>, number, Array<Array<any>>]> {
  return [
    [
      createAsyncGeneratorFixture([]),
      1,
      [
        [],
      ],
    ],
    [
      createAsyncGeneratorFixture([]),
      2,
      [
        [],
        [],
      ],
    ],
    [
      createAsyncGeneratorFixture([]),
      3,
      [
        [],
        [],
        [],
      ],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
      1,
      [
        [1, 2, 3, 4, 5],
      ],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
      2,
      [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
      ],
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3, 4, 5]),
      3,
      [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
      ],
    ],
  ];
}

function dataProviderForAsyncIterables(): Array<[AsyncIterable<any>, number, Array<Array<any>>]> {
  return [
    [
      createAsyncIterableFixture([]),
      1,
      [
        [],
      ],
    ],
    [
      createAsyncIterableFixture([]),
      2,
      [
        [],
        [],
      ],
    ],
    [
      createAsyncIterableFixture([]),
      3,
      [
        [],
        [],
        [],
      ],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      1,
      [
        [1, 2, 3, 4, 5],
      ],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      2,
      [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
      ],
    ],
    [
      createAsyncIterableFixture([1, 2, 3, 4, 5]),
      3,
      [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
      ],
    ],
  ];
}

function dataProviderForAsyncIterators(): Array<[AsyncIterator<any>, number, Array<Array<any>>]> {
  return [
    [
      createAsyncIteratorFixture([]),
      1,
      [
        [],
      ],
    ],
    [
      createAsyncIteratorFixture([]),
      2,
      [
        [],
        [],
      ],
    ],
    [
      createAsyncIteratorFixture([]),
      3,
      [
        [],
        [],
        [],
      ],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5]),
      1,
      [
        [1, 2, 3, 4, 5],
      ],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5]),
      2,
      [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
      ],
    ],
    [
      createAsyncIteratorFixture([1, 2, 3, 4, 5]),
      3,
      [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
      ],
    ],
  ];
}
