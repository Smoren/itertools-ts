import {
  createAsyncGeneratorFixture,
  createAsyncIterableFixture,
  createAsyncIteratorFixture,
  createGeneratorFixture,
  createIterableFixture,
  createIteratorFixture,
} from '../fixture';
import { InvalidArgumentError, transform } from '../../src';

describe.each(dataProvider())(
    'transform.divide',
    (input,n,expected) =>{
        it(`splits input into ${n} chunks`,()=>{
            const result = Array.from(transform.divide(input,n));

            expect(result).toEqual(expected);
        });
    },
);

function dataProvider():Array<[Iterable<any> | Iterator<any>,number,Array<any[]>]>{
    return [
        // Strings
        ['', 2, []],
        ['1234', 2, [['1', '2'], ['3', '4']]],
        ['12345', 2, [['1', '2', '3'], ['4', '5']]],

        // Arrays
        [[], 2, []],
        [[1, 2, 3, 4], 2, [[1, 2], [3, 4]]],
        [[1, 2, 3, 4, 5], 2, [[1, 2, 3], [4, 5]]],

        // Generators
        [createGeneratorFixture([]), 2, []],
        [createGeneratorFixture([1]), 2, [[1]]],
        [createGeneratorFixture([1, 2, 3]), 2, [[1, 2], [3]]],

        // Iterables
        [createIterableFixture([1, 2, 3]), 3, [[1], [2], [3]]],

        // Iterators
        [createIteratorFixture([1, 2, 3, 4]), 2, [[1, 2], [3, 4]]],

        // Sets
        [new Set([1, 2, 3]), 2, [[1, 2], [3]]],

        // Maps
        [new Map([['a', 1], ['b', 2]]), 2, [[['a', 1]], [['b', 2]]]],
    ]
};

describe.each(dataProviderAsync())(
    'transform.divideAsync',
    (input,n,expected)=>{
        it(`splits async input into ${n} chunks`,async()=>{
            const result:any[]=[];
            for await (const chunk of transform.divideAsync(input,n)){
                result.push(chunk);
            }

            expect(result).toEqual(expected);
        })
    }
)

function dataProviderAsync():Array<[AsyncIterable<any> | AsyncIterator<any> | Iterable<any> | Iterator<any>, number, Array<any[]>]>{
    return [
        // Async Generators
        [createAsyncGeneratorFixture([]), 2, []],
        [createAsyncGeneratorFixture([1]), 2, [[1]]],
        [createAsyncGeneratorFixture([1, 2, 3]), 2, [[1, 2], [3]]],

        // Async Iterables
        [createAsyncIterableFixture([1, 2, 3]), 3, [[1], [2], [3]]],

        // Async Iterators
        [createAsyncIteratorFixture([1, 2, 3, 4]), 2, [[1, 2], [3, 4]]],
  ];
}


describe.each(dataProviderForError())(
    'transform.divide Error Test',
    (input,n)=>{
        it(`throws error when dividing ${JSON.stringify(input)} into ${n} chunks`,()=>{
            expect(()=>{
                Array.from(transform.divide(input,n));
            }).toThrow(InvalidArgumentError);
        });
    }
);

function dataProviderForError():Array<[any,any]>{
    return [
        [[], 0],
        [[], -1],
        [[1, 2, 3], 0],
        [[1, 2, 3], -5],
        [[1, 2, 3], NaN],
        [[1, 2, 3], Infinity],
        [[1, 2, 3], -Infinity],
        [[1, 2, 3], "2"],
        [[1, 2, 3], true],
  ];
}


describe.each(dataProviderAsyncForError())(
  "transform.divideAsync Error Test",
  (input, n) => {
    it(`throws error for input: ${input} and n: ${n}`, async () => {
      await expect(async () => {
        for await (const _ of transform.divideAsync(input as any, n as any)) {
          // noop
        }
      }).rejects.toThrow(InvalidArgumentError);
    });
  }
);

function dataProviderAsyncForError(): Array<[any, any]> {
  return [
    // Invalid 'n'
    [[], 0],
    [[], -1],
    [[1, 2, 3], 0],
    [[1, 2, 3], -5],
    [[1, 2, 3], NaN],
    [[1, 2, 3], Infinity],
    [[1, 2, 3], -Infinity],
    [[1, 2, 3], 2.5],
    [[1, 2, 3], true],
    [[1, 2, 3], false],

    // Non-iterable input
    [1, 2],
    [true, 2],
    [null, 2],
    [undefined, 2],
    [NaN, 2],
  ];
}


