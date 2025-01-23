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
])(
  "Reduce To Value Sum Reducer Test",
  (input, initialValue, expected) => {
    it("", () => {
      // When
      const result = reduce.toValue(
        input,
        (carry, datum) => carry + datum,
        initialValue
      );

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
])(
  "Reduce To Value Async Sum Reducer Async Test",
  (input, initialValue, expected) => {
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
])(
  "Reduce To Value Async Sum Reducer Test",
  (input, initialValue, expected) => {
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
])(
  "Reduce To Value Sum Reducer Map Test",
  (input, initialValue, expected) => {
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
])(
  "Reduce To Value Async Sum Reducer Map Async Test",
  (input, initialValue, expected) => {
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
])(
  "Reduce To Value Concat Reducer Test",
  (input, initialValue, expected) => {
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
])(
  "Reduce To Value Async Concat Reducer Async Test",
  (input, initialValue, expected) => {
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
])(
  "Reduce To Value Async Concat Reducer Test",
  (input, initialValue, expected) => {
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
])(
  "Reduce To Value Concat Reducer Test",
  (input, initialValue, expected) => {
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
])(
  "Reduce To Value Async Concat Reducer Async Test",
  (input, initialValue, expected) => {
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

function dataProviderForSumReducerArrays(): Array<[Array<number>, number, number]> {
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
	] as Array<[Array<number>, number, number]>;
}

function dataProviderForSumReducerGenerators(): Array<[Generator<number>, number, number]> {
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
	] as Array<[Generator<number>, number, number]>;
}

function dataProviderForSumReducerIterables(): Array<[Iterable<number>, number, number]> {
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
	] as Array<[Iterable<number>, number, number]>;
}

function dataProviderForSumReducerIterators(): Array<[Iterator<number>, number, number]> {
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
	] as Array<[Iterator<number>, number, number]>;
}

function dataProviderForSumReducerSets(): Array<[Set<number>, number, number]> {
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
	] as Array<[Set<number>, number, number]>;
}

function dataProviderForSumReducerMaps(): Array<[Map<unknown, number>, number, number]> {
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
	] as Array<[Map<unknown, number>, number, number]>;
}

function dataProviderForSumReducerAsyncGenerators(): Array<[AsyncGenerator<number>, number, number]> {
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
  ] as Array<[AsyncGenerator<number>, number, number]>;
}

function dataProviderForSumReducerAsyncIterables(): Array<[AsyncIterable<number>, number, number]> {
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
  ] as Array<[AsyncIterable<number>, number, number]>;
}

function dataProviderForSumReducerAsyncIterators(): Array<[AsyncIterator<number>, number, number]> {
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
  ] as Array<[AsyncIterator<number>, number, number]>;
}

function dataProviderForConcatReducerArrays(): Array<[Array<string>, string, string]> {
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
	] as Array<[Array<string>, string, string]>;
}

function dataProviderForConcatReducerGenerators(): Array<[Generator<string>, string, string]> {
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
	] as Array<[Generator<string>, string, string]>;
}

function dataProviderForConcatReducerIterables(): Array<[Iterable<string>, string, string]> {
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
	] as Array<[Iterable<string>, string, string]>;
}

function dataProviderForConcatReducerIterators(): Array<[Iterator<string>, string, string]> {
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
	] as Array<[Iterator<string>, string, string]>;
}

function dataProviderForConcatReducerStrings(): Array<[Iterable<string>, string, string]> {
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
	] as Array<[Iterable<string>, string, string]>;
}

function dataProviderForConcatReducerSets(): Array<[Set<string>, string, string]> {
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
	] as Array<[Set<string>, string, string]>;
}

function dataProviderForConcatReducerMaps(): Array<[Map<unknown, string>, string, string]> {
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
	] as Array<[Map<unknown, string>, string, string]>;
}

function dataProviderForConcatReducerAsyncGenerators(): Array<[AsyncGenerator<string>, string, string]> {
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
  ] as Array<[AsyncGenerator<string>, string, string]>;
}

function dataProviderForConcatReducerAsyncIterables(): Array<[AsyncIterable<number>, string, string]> {
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
  ] as Array<[AsyncIterable<number>, string, string]>;
}

function dataProviderForConcatReducerAsyncIterators(): Array<[AsyncIterator<number>, string, string]> {
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
  ] as Array<[AsyncIterator<number>, string, string]>;
}
