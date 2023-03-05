// @ts-ignore
import { reduce } from "../../src";

describe.each([
  ...dataProviderForArrays()
])("Reduce To Value Test", (input, initialValue, expected) => {
  it("", () => {
    // Given
		const sum = (datum: unknown, carry: unknown): unknown => {
			return datum + carry
		}

    // When
		const result = reduce.reduceFunc(input as Iterable<unknown>, sum, initialValue as null);
		
    // Then
    expect(result).toEqual(expected);
  });
});

function dataProviderForArrays(): Array<unknown> {
	return [
		[
			[], 
			null, 
			null 
		],
		[
			[],
			0,
			0
		],
		[
			[],
			1,
			1
		],
		[
			[],
			'a',
			'a'
		],
		[
			[0],
			null,
			0
		],
		[
			[null],
			null,
			0
		],
		[
			[null, 1, 2],
			null,
			3
		],
		[
			[1, 2, 3],
			null,
			6
		],
	];
}
