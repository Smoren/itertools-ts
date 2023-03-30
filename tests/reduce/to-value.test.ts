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
import { reduce } from "../../src";

describe.each([
  ...dataProviderForSumReducerArrays(),
  ...dataProviderForSumReducerGenerators(),
  ...dataProviderForSumReducerIterables(),
  ...dataProviderForSumReducerIterators(),
  ...dataProviderForSumReducerSets(),
] as Array<[Iterable<unknown>|Iterator<unknown>, unknown, unknown]>)(
  "Reduce To Value Sum Reducer Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    initialValue: unknown,
    expected: unknown
  ) => {
    it("", () => {
      // Given
      const sum = (carry: unknown, datum: unknown): unknown => (carry as number) + (datum as number);

      // When
      const result = reduce.toValue(input, sum, initialValue);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForSumReducerAsyncGenerators(),
  ...dataProviderForSumReducerAsyncIterables(),
  ...dataProviderForSumReducerAsyncIterators(),
  ...dataProviderForSumReducerArrays(),
  ...dataProviderForSumReducerGenerators(),
  ...dataProviderForSumReducerIterables(),
  ...dataProviderForSumReducerIterators(),
  ...dataProviderForSumReducerSets(),
] as Array<[
    AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  unknown,
  unknown
]>)(
  "Reduce To Value Async Sum Reducer Async Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    initialValue: unknown,
    expected: unknown
  ) => {
    it("", async () => {
      // Given
      const sum = async (carry: unknown, datum: unknown): Promise<unknown> => {
        await asyncTimeout(1);
        return (carry as number) + (datum as number)
      };

      // When
      const result = await reduce.toValueAsync(input, sum, initialValue);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForSumReducerAsyncGenerators(),
  ...dataProviderForSumReducerAsyncIterables(),
  ...dataProviderForSumReducerAsyncIterators(),
  ...dataProviderForSumReducerArrays(),
  ...dataProviderForSumReducerGenerators(),
  ...dataProviderForSumReducerIterables(),
  ...dataProviderForSumReducerIterators(),
  ...dataProviderForSumReducerSets(),
] as Array<[
    AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  unknown,
  unknown
]>)(
  "Reduce To Value Async Sum Reducer Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    initialValue: unknown,
    expected: unknown
  ) => {
    it("", async () => {
      // Given
      const sum = (carry: unknown, datum: unknown): unknown => (carry as number) + (datum as number);

      // When
      const result = await reduce.toValueAsync(input, sum, initialValue);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForSumReducerMaps(),
] as Array<[Iterable<unknown>|Iterator<unknown>, unknown, unknown]>)(
  "Reduce To Value Sum Reducer Map Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    initialValue: unknown,
    expected: unknown
  ) => {
    it("", () => {
      // Given
      const sum = (carry: unknown, datum: unknown): unknown => (carry as number) + (datum as Array<number>)[1];

      // When
      const result = reduce.toValue(input, sum, initialValue);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForSumReducerMaps(),
] as Array<[
  AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  unknown,
  unknown
]>)(
  "Reduce To Value Async Sum Reducer Map Async Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    initialValue: unknown,
    expected: unknown
  ) => {
    it("", async () => {
      // Given
      const sum = async (carry: unknown, datum: unknown): Promise<unknown> => {
        await asyncTimeout(1);
        return (carry as number) + (datum as Array<number>)[1]
      };

      // When
      const result = await reduce.toValueAsync(input, sum, initialValue);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForConcatReducerArrays(),
  ...dataProviderForConcatReducerGenerators(),
  ...dataProviderForConcatReducerIterables(),
  ...dataProviderForConcatReducerIterators(),
  ...dataProviderForConcatReducerStrings(),
  ...dataProviderForConcatReducerSets(),
] as Array<[Iterable<unknown>|Iterator<unknown>, unknown, unknown]>)(
  "Reduce To Value Concat Reducer Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    initialValue: unknown,
    expected: unknown
  ) => {
    it("", () => {
      // Given
      const concat = (carry: unknown, datum: unknown): unknown => `${carry as string}${datum as string}`;

      // When
      const result = reduce.toValue(input, concat, initialValue);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForConcatReducerAsyncGenerators(),
  ...dataProviderForConcatReducerAsyncIterables(),
  ...dataProviderForConcatReducerAsyncIterators(),
  ...dataProviderForConcatReducerArrays(),
  ...dataProviderForConcatReducerGenerators(),
  ...dataProviderForConcatReducerIterables(),
  ...dataProviderForConcatReducerIterators(),
  ...dataProviderForConcatReducerStrings(),
  ...dataProviderForConcatReducerSets(),
] as Array<[
    AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  unknown,
  unknown
]>)(
  "Reduce To Value Async Concat Reducer Async Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    initialValue: unknown,
    expected: unknown
  ) => {
    it("", async () => {
      // Given
      const concat = async (carry: unknown, datum: unknown): Promise<unknown> => {
        await asyncTimeout(1);
        return `${carry as string}${datum as string}`
      };

      // When
      const result = await reduce.toValueAsync(input, concat, initialValue);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForConcatReducerAsyncGenerators(),
  ...dataProviderForConcatReducerAsyncIterables(),
  ...dataProviderForConcatReducerAsyncIterators(),
  ...dataProviderForConcatReducerArrays(),
  ...dataProviderForConcatReducerGenerators(),
  ...dataProviderForConcatReducerIterables(),
  ...dataProviderForConcatReducerIterators(),
  ...dataProviderForConcatReducerStrings(),
  ...dataProviderForConcatReducerSets(),
] as Array<[
    AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  unknown,
  unknown
]>)(
  "Reduce To Value Async Concat Reducer Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    initialValue: unknown,
    expected: unknown
  ) => {
    it("", async () => {
      // Given
      const concat = (carry: unknown, datum: unknown): unknown =>`${carry as string}${datum as string}`;

      // When
      const result = await reduce.toValueAsync(input, concat, initialValue);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForConcatReducerMaps(),
] as Array<[Iterable<unknown>|Iterator<unknown>, unknown, unknown]>)(
  "Reduce To Value Concat Reducer Test",
  (
    input: Iterable<unknown>|Iterator<unknown>,
    initialValue: unknown,
    expected: unknown
  ) => {
    it("", () => {
      // Given
      const concat = (carry: unknown, datum: unknown): unknown => `${carry as string}${(datum as Array<string>)[1]}`;

      // When
      const result = reduce.toValue(input, concat, initialValue);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

describe.each([
  ...dataProviderForConcatReducerMaps(),
] as Array<[
  AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
  unknown,
  unknown
]>)(
  "Reduce To Value Async Concat Reducer Async Test",
  (
    input: AsyncIterable<unknown>|AsyncIterator<unknown>|Iterable<unknown>|Iterator<unknown>,
    initialValue: unknown,
    expected: unknown
  ) => {
    it("", async () => {
      // Given
      const concat = async (carry: unknown, datum: unknown): Promise<unknown> => {
        await asyncTimeout(1);
        return `${carry as string}${(datum as Array<string>)[1]}`;
      };

      // When
      const result = await reduce.toValueAsync(input, concat, initialValue);

      // Then
      expect(result).toEqual(expected);
    });
  }
);

function dataProviderForSumReducerArrays(): Array<unknown> {
	return [
		[
			[],
			null,
			null,
		],
		[
			[],
			0,
			0,
		],
		[
			[],
			1,
			1,
		],
		[
			[],
			'a',
			'a',
		],
		[
			[0],
			null,
			0,
		],
		[
			[null],
			null,
			0,
		],
		[
			[null, 1, 2],
			null,
			3,
		],
		[
			[1, 2, 3],
			null,
			6,
		],
	];
}

function dataProviderForSumReducerGenerators(): Array<unknown> {
	return [
		[
			createGeneratorFixture([]),
			null,
			null,
		],
		[
			createGeneratorFixture([]),
			0,
			0,
		],
		[
			createGeneratorFixture([]),
			1,
			1,
		],
		[
			createGeneratorFixture([]),
			'a',
			'a',
		],
		[
			createGeneratorFixture([0]),
			null,
			0,
		],
		[
			createGeneratorFixture([null]),
			null,
			0,
		],
		[
			createGeneratorFixture([null, 1, 2]),
			null,
			3,
		],
		[
			createGeneratorFixture([1, 2, 3]),
			null,
			6,
		],
	];
}

function dataProviderForSumReducerIterables(): Array<unknown> {
	return [
		[
			createIterableFixture([]),
			null,
			null,
		],
		[
			createIterableFixture([]),
			0,
			0,
		],
		[
			createIterableFixture([]),
			1,
			1,
		],
		[
			createIterableFixture([]),
			'a',
			'a',
		],
		[
			createIterableFixture([0]),
			null,
			0,
		],
		[
			createIterableFixture([null]),
			null,
			0,
		],
		[
			createIterableFixture([null, 1, 2]),
			null,
			3,
		],
		[
			createIterableFixture([1, 2, 3]),
			null,
			6,
		],
	];
}

function dataProviderForSumReducerIterators(): Array<unknown> {
	return [
		[
			createIteratorFixture([]),
			null,
			null,
		],
		[
			createIteratorFixture([]),
			0,
			0,
		],
		[
			createIteratorFixture([]),
			1,
			1,
		],
		[
			createIteratorFixture([]),
			'a',
			'a',
		],
		[
			createIteratorFixture([0]),
			null,
			0,
		],
		[
			createIteratorFixture([null]),
			null,
			0,
		],
		[
			createIteratorFixture([null, 1, 2]),
			null,
			3,
		],
		[
			createIteratorFixture([1, 2, 3]),
			null,
			6,
		],
	];
}

function dataProviderForSumReducerSets(): Array<unknown> {
	return [
		[
			new Set([]),
			null,
			null,
		],
		[
			new Set([]),
			0,
			0,
		],
		[
			new Set([]),
			1,
			1,
		],
		[
			new Set([]),
			'a',
			'a',
		],
		[
			new Set([0]),
			null,
			0,
		],
		[
			new Set([null]),
			null,
			0,
		],
		[
			new Set([null, 1, 2]),
			null,
			3,
		],
		[
			new Set([1, 2, 3]),
			null,
			6,
		],
	];
}

function dataProviderForSumReducerMaps(): Array<unknown> {
	return [
		[
			createMapFixture([]),
			null,
			null,
		],
		[
			createMapFixture([]),
			0,
			0,
		],
		[
			createMapFixture([]),
			1,
			1,
		],
		[
			createMapFixture([]),
			'a',
			'a',
		],
		[
			createMapFixture([0]),
			null,
			0,
		],
		[
			createMapFixture([null]),
			null,
			0,
		],
		[
			createMapFixture([null, 1, 2]),
			null,
			3,
		],
		[
			createMapFixture([1, 2, 3]),
			null,
			6,
		],
	];
}

function dataProviderForSumReducerAsyncGenerators(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([]),
      null,
      null,
    ],
    [
      createAsyncGeneratorFixture([]),
      0,
      0,
    ],
    [
      createAsyncGeneratorFixture([]),
      1,
      1,
    ],
    [
      createAsyncGeneratorFixture([]),
      'a',
      'a',
    ],
    [
      createAsyncGeneratorFixture([0]),
      null,
      0,
    ],
    [
      createAsyncGeneratorFixture([null]),
      null,
      0,
    ],
    [
      createAsyncGeneratorFixture([null, 1, 2]),
      null,
      3,
    ],
    [
      createAsyncGeneratorFixture([1, 2, 3]),
      null,
      6,
    ],
  ];
}

function dataProviderForSumReducerAsyncIterables(): Array<unknown> {
  return [
    [
      createAsyncIterableFixture([]),
      null,
      null,
    ],
    [
      createAsyncIterableFixture([]),
      0,
      0,
    ],
    [
      createAsyncIterableFixture([]),
      1,
      1,
    ],
    [
      createAsyncIterableFixture([]),
      'a',
      'a',
    ],
    [
      createAsyncIterableFixture([0]),
      null,
      0,
    ],
    [
      createAsyncIterableFixture([null]),
      null,
      0,
    ],
    [
      createAsyncIterableFixture([null, 1, 2]),
      null,
      3,
    ],
    [
      createAsyncIterableFixture([1, 2, 3]),
      null,
      6,
    ],
  ];
}

function dataProviderForSumReducerAsyncIterators(): Array<unknown> {
  return [
    [
      createAsyncIteratorFixture([]),
      null,
      null,
    ],
    [
      createAsyncIteratorFixture([]),
      0,
      0,
    ],
    [
      createAsyncIteratorFixture([]),
      1,
      1,
    ],
    [
      createAsyncIteratorFixture([]),
      'a',
      'a',
    ],
    [
      createAsyncIteratorFixture([0]),
      null,
      0,
    ],
    [
      createAsyncIteratorFixture([null]),
      null,
      0,
    ],
    [
      createAsyncIteratorFixture([null, 1, 2]),
      null,
      3,
    ],
    [
      createAsyncIteratorFixture([1, 2, 3]),
      null,
      6,
    ],
  ];
}

function dataProviderForConcatReducerArrays(): Array<unknown> {
	return [
		[
			[],
			null,
			null,
		],
		[
			[],
			0,
			0,
		],
		[
			[],
			1,
			1,
		],
		[
			[],
			'a',
			'a',
		],
		[
			[0],
			null,
			'null0',
		],
		[
			[null],
			null,
			'nullnull',
		],
		[
			['a', 'b'],
			null,
			'nullab',
		],
		[
			['one', 'TWO', '3', '四', 'cinco'],
			null,
			'nulloneTWO3四cinco',
		],
		[
			['one', 'TWO', '3', '四', 'cinco'],
			'0',
			'0oneTWO3四cinco',
		],
		[
			[null, 2, 3],
			null,
			'nullnull23',
		],
	];
}

function dataProviderForConcatReducerGenerators(): Array<unknown> {
	return [
		[
			createGeneratorFixture([]),
			null,
			null,
		],
		[
			createGeneratorFixture([]),
			0,
			0,
		],
		[
			createGeneratorFixture([]),
			1,
			1,
		],
		[
			createGeneratorFixture([]),
			'a',
			'a',
		],
		[
			createGeneratorFixture([0]),
			null,
			'null0',
		],
		[
			createGeneratorFixture([null]),
			null,
			'nullnull',
		],
		[
			createGeneratorFixture(['a', 'b']),
			null,
			'nullab',
		],
		[
			createGeneratorFixture(['one', 'TWO', '3', '四', 'cinco']),
			null,
			'nulloneTWO3四cinco',
		],
		[
			createGeneratorFixture(['one', 'TWO', '3', '四', 'cinco']),
			'0',
			'0oneTWO3四cinco',
		],
		[
			createGeneratorFixture([null, 2, 3]),
			null,
			'nullnull23',
		],
	];
}

function dataProviderForConcatReducerIterables(): Array<unknown> {
	return [
		[
			createIterableFixture([]),
			null,
			null,
		],
		[
			createIterableFixture([]),
			0,
			0,
		],
		[
			createIterableFixture([]),
			1,
			1,
		],
		[
			createIterableFixture([]),
			'a',
			'a',
		],
		[
			createIterableFixture([0]),
			null,
			'null0',
		],
		[
			createIterableFixture([null]),
			null,
			'nullnull',
		],
		[
			createIterableFixture(['a', 'b']),
			null,
			'nullab',
		],
		[
			createIterableFixture(['one', 'TWO', '3', '四', 'cinco']),
			null,
			'nulloneTWO3四cinco',
		],
		[
			createIterableFixture(['one', 'TWO', '3', '四', 'cinco']),
			'0',
			'0oneTWO3四cinco',
		],
		[
			createIterableFixture([null, 2, 3]),
			null,
			'nullnull23',
		],
	];
}

function dataProviderForConcatReducerIterators(): Array<unknown> {
	return [
		[
			createIteratorFixture([]),
			null,
			null,
		],
		[
			createIteratorFixture([]),
			0,
			0,
		],
		[
			createIteratorFixture([]),
			1,
			1,
		],
		[
			createIteratorFixture([]),
			'a',
			'a',
		],
		[
			createIteratorFixture([0]),
			null,
			'null0',
		],
		[
			createIteratorFixture([null]),
			null,
			'nullnull',
		],
		[
			createIteratorFixture(['a', 'b']),
			null,
			'nullab',
		],
		[
			createIteratorFixture(['one', 'TWO', '3', '四', 'cinco']),
			null,
			'nulloneTWO3四cinco',
		],
		[
			createIteratorFixture(['one', 'TWO', '3', '四', 'cinco']),
			'0',
			'0oneTWO3四cinco',
		],
		[
			createIteratorFixture([null, 2, 3]),
			null,
			'nullnull23',
		],
	];
}

function dataProviderForConcatReducerStrings(): Array<unknown> {
	return [
		[
			'',
			null,
			null,
		],
		[
			'',
			0,
			0,
		],
		[
			'',
			1,
			1,
		],
		[
			'',
			'a',
			'a',
		],
		[
			'0',
			null,
			'null0',
		],
		[
			'ab',
			null,
			'nullab',
		],
		[
			'abcdef',
			null,
			'nullabcdef',
		],
		[
			'123',
			null,
			'null123',
		],
	];
}

function dataProviderForConcatReducerSets(): Array<unknown> {
	return [
		[
			new Set([]),
			null,
			null,
		],
		[
			new Set([]),
			0,
			0,
		],
		[
			new Set([]),
			1,
			1,
		],
		[
			new Set([]),
			'a',
			'a',
		],
		[
			new Set([0]),
			null,
			'null0',
		],
		[
			new Set([null]),
			null,
			'nullnull',
		],
		[
			new Set(['a', 'b']),
			null,
			'nullab',
		],
		[
			new Set(['one', 'TWO', '3', '四', 'cinco']),
			null,
			'nulloneTWO3四cinco',
		],
		[
			new Set(['one', 'TWO', '3', '四', 'cinco']),
			'0',
			'0oneTWO3四cinco',
		],
		[
			new Set([null, 2, 3]),
			null,
			'nullnull23',
		],
	];
}

function dataProviderForConcatReducerMaps(): Array<unknown> {
	return [
		[
			createMapFixture([]),
			null,
			null,
		],
		[
			createMapFixture([]),
			0,
			0,
		],
		[
			createMapFixture([]),
			1,
			1,
		],
		[
			createMapFixture([]),
			'a',
			'a',
		],
		[
			createMapFixture([0]),
			null,
			'null0',
		],
		[
			createMapFixture([null]),
			null,
			'nullnull',
		],
		[
			createMapFixture(['a', 'b']),
			null,
			'nullab',
		],
		[
			createMapFixture(['one', 'TWO', '3', '四', 'cinco']),
			null,
			'nulloneTWO3四cinco',
		],
		[
			createMapFixture(['one', 'TWO', '3', '四', 'cinco']),
			'0',
			'0oneTWO3四cinco',
		],
		[
			createMapFixture([null, 2, 3]),
			null,
			'nullnull23',
		],
	];
}

function dataProviderForConcatReducerAsyncGenerators(): Array<unknown> {
  return [
    [
      createAsyncGeneratorFixture([]),
      null,
      null,
    ],
    [
      createAsyncGeneratorFixture([]),
      0,
      0,
    ],
    [
      createAsyncGeneratorFixture([]),
      1,
      1,
    ],
    [
      createAsyncGeneratorFixture([]),
      'a',
      'a',
    ],
    [
      createAsyncGeneratorFixture([0]),
      null,
      'null0',
    ],
    [
      createAsyncGeneratorFixture([null]),
      null,
      'nullnull',
    ],
    [
      createAsyncGeneratorFixture(['a', 'b']),
      null,
      'nullab',
    ],
    [
      createAsyncGeneratorFixture(['one', 'TWO', '3', '四', 'cinco']),
      null,
      'nulloneTWO3四cinco',
    ],
    [
      createAsyncGeneratorFixture(['one', 'TWO', '3', '四', 'cinco']),
      '0',
      '0oneTWO3四cinco',
    ],
    [
      createAsyncGeneratorFixture([null, 2, 3]),
      null,
      'nullnull23',
    ],
  ];
}

function dataProviderForConcatReducerAsyncIterables(): Array<unknown> {
  return [
    [
      createAsyncIterableFixture([]),
      null,
      null,
    ],
    [
      createAsyncIterableFixture([]),
      0,
      0,
    ],
    [
      createAsyncIterableFixture([]),
      1,
      1,
    ],
    [
      createAsyncIterableFixture([]),
      'a',
      'a',
    ],
    [
      createAsyncIterableFixture([0]),
      null,
      'null0',
    ],
    [
      createAsyncIterableFixture([null]),
      null,
      'nullnull',
    ],
    [
      createAsyncIterableFixture(['a', 'b']),
      null,
      'nullab',
    ],
    [
      createAsyncIterableFixture(['one', 'TWO', '3', '四', 'cinco']),
      null,
      'nulloneTWO3四cinco',
    ],
    [
      createAsyncIterableFixture(['one', 'TWO', '3', '四', 'cinco']),
      '0',
      '0oneTWO3四cinco',
    ],
    [
      createAsyncIterableFixture([null, 2, 3]),
      null,
      'nullnull23',
    ],
  ];
}

function dataProviderForConcatReducerAsyncIterators(): Array<unknown> {
  return [
    [
      createAsyncIteratorFixture([]),
      null,
      null,
    ],
    [
      createAsyncIteratorFixture([]),
      0,
      0,
    ],
    [
      createAsyncIteratorFixture([]),
      1,
      1,
    ],
    [
      createAsyncIteratorFixture([]),
      'a',
      'a',
    ],
    [
      createAsyncIteratorFixture([0]),
      null,
      'null0',
    ],
    [
      createAsyncIteratorFixture([null]),
      null,
      'nullnull',
    ],
    [
      createAsyncIteratorFixture(['a', 'b']),
      null,
      'nullab',
    ],
    [
      createAsyncIteratorFixture(['one', 'TWO', '3', '四', 'cinco']),
      null,
      'nulloneTWO3四cinco',
    ],
    [
      createAsyncIteratorFixture(['one', 'TWO', '3', '四', 'cinco']),
      '0',
      '0oneTWO3四cinco',
    ],
    [
      createAsyncIteratorFixture([null, 2, 3]),
      null,
      'nullnull23',
    ],
  ];
}
