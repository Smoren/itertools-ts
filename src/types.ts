export type RecordKey = string | number | symbol;

export type Comparable = string | number | boolean | Array<unknown>;

export type Comparator<T> = (lhs: T, rhs: T) => 1|0|-1;

export type Pair<T> = [T, T];

export type FlatMapper<TInput, TOutput> = (
  datum: Iterable<TInput> | Iterator<TInput> | TInput,
  mapper: FlatMapper<TInput, TOutput>
) => TOutput | Iterable<TInput> | Iterator<TInput>;

export type AsyncFlatMapper<TInput, TOutput> = (
  datum:
    | AsyncIterable<TInput>
    | AsyncIterator<TInput>
    | Iterable<TInput>
    | Iterator<TInput>
    | TInput,
  mapper: AsyncFlatMapper<TInput, TOutput>
) => TOutput | Promise<TOutput> | AsyncIterable<TInput> | AsyncIterator<TInput>;

export type ZipTuple<TValue, TFiller> = {
  [K in keyof TValue]:
    | (TValue[K] extends Iterable<infer V> ? V : never)
    | TFiller;
};
