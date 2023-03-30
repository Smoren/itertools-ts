export type RecordKey = string | number | symbol;

export type Comparable = string | number | boolean | Array<unknown>;

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
