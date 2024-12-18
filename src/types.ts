export type RecordKey = string | number | symbol;

export type Comparable = string | number | boolean | Array<unknown>;

export type Comparator<T> = (lhs: T, rhs: T) => number;

export type Pair<T> = [T, T];

export type Last<T extends any[]> = T extends [...any[], infer L] ? L : never;

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

export type PipeOperation<TInput, TOutput> = (input: TInput) => TOutput;
export type AsyncPipeOperation<TInput, TOutput> = (input: TInput) => Promise<TOutput>;

export type PipeOperationSequence<TFlow extends any[]> =
  TFlow extends [infer T1, infer T2, ...infer Rest]
    ? [PipeOperation<T1, T2>, ...PipeOperationSequence<[T2, ...Rest]>]
    : [];
export type AsyncPipeOperationSequence<TFlow extends any[]> =
  TFlow extends [infer T1, infer T2, ...infer Rest]
    ? [AsyncPipeOperation<T1, T2> | PipeOperation<T1, T2>, ...AsyncPipeOperationSequence<[T2, ...Rest]>]
    : [];

export type Pipe<TFlow extends any[]> = (input: TFlow[0]) => Last<TFlow>;
export type AsyncPipe<TFlow extends any[]> = (input: TFlow[0]) => Promise<Last<TFlow>>;
