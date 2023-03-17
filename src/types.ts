export type Comparable = string|number|boolean|Array<unknown>;

export type Pair<T> = [T, T];

export type FlatMapper<TInput, TOutput> = (
  datum: Iterable<TInput> | Iterator<TInput> | TInput,
  mapper: FlatMapper<TInput, TOutput>
) => TOutput | Iterable<TInput> | Iterator<TInput>;
