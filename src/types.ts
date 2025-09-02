/**
 * Type of keys used in records.
 */
export type RecordKey = string | number | symbol;

/**
 * Type of values that can be compared.
 */
export type Comparable = string | number | boolean | Array<unknown>;

/**
 * Type of numeric strings.
 */
export type NumericString = `${number}`;

/**
 * Type of numeric values.
 */
export type Numeric = number | NumericString;

/**
 * Type of functions that compare two values.
 *
 * @example
 * const compareStrings = (lhs: string, rhs: string): number => lhs.localeCompare(rhs);
 */
export type Comparator<T> = (lhs: T, rhs: T) => number;

/**
 * Type of pairs of values.
 */
export type Pair<T> = [T, T];

/**
 * Type of the last element in a tuple.
 *
 * @example
 * type Last<[1, 2, 3]> = 3;
 */
export type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never;

/**
 * Type of the last element in a tuple.
 *
 * @example
 * type Last<[1, 2, 3]> = 3;
 */
export type Last<T extends any[]> = T extends [...any[], infer L] ? L : never;

/**
 * Type of functions that map values to either a value or an iterable.
 *
 * @example
 * const identityMapper = <T>(datum: Iterable<T> | Iterator<T> | T): T => datum;
 */
export type FlatMapper<TInput, TOutput> = (
  datum: TInput,
  mapper: FlatMapper<TInput, TOutput>
) => TOutput | Iterable<TInput> | Iterator<TInput>;

/**
 * Type of functions that map values to either a value or an iterable asynchronously.
 *
 * @example
 * const identityMapper = <T>(datum: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T> | T): Promise<T> => datum;
 */
export type AsyncFlatMapper<TInput, TOutput> = (
  datum: TInput,
  mapper: AsyncFlatMapper<TInput, TOutput>
) => TOutput | Promise<TOutput> | AsyncIterable<TInput> | AsyncIterator<TInput>;

/**
 * Type of tuples of values that can be zipped with a filler value.
 *
 * @example
 * type ZipTuple<[1, 'a', true], number> = [number, string, boolean];
 */
export type ZipTuple<TValue, TFiller> = {
  [K in keyof TValue]:
    | (TValue[K] extends Iterable<infer V> | AsyncIterable<infer V> | Iterator<infer V> | AsyncIterator<infer V> ? V : never)
    | TFiller;
};

/**
 * Type of functions that map values synchronously.
 *
 * @example
 * const identityMapper = <T>(input: T): T => input;
 */
export type PipeOperation<TInput, TOutput> = (input: TInput) => TOutput;

/**
 * Type of arrays of pipe operations.
 *
 * @example
 * const pipe = createPipe<string, number, boolean>(identityMapper, identityMapper);
 */
export type PipeOperationSequence<TFlow extends any[]> =
  TFlow extends [infer T1, infer T2, ...infer Rest]
    ? [PipeOperation<T1, T2>, ...PipeOperationSequence<[T2, ...Rest]>]
    : [];

/**
 * Type of functions that map values synchronously.
 *
 * @example
 * const pipe = createPipe<string, number, boolean>(identityMapper, identityMapper);
 */
export type Pipe<TFlow extends any[]> = PipeOperation<First<TFlow>, Last<TFlow>> & {
  add: TFlow extends []
    ? <TInput, TOutput>(operation: PipeOperation<TInput, TOutput>) => Pipe<[TInput, TOutput]>
    : <T>(operation: PipeOperation<Last<TFlow>, T>) => Pipe<[...TFlow, T]>;
};
