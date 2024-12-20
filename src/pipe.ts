import {
  AsyncPipe,
  AsyncPipeOperation,
  AsyncPipeOperationSequence,
  Last,
  Pipe,
  PipeOperation,
  PipeOperationSequence,
} from "./types";
import { reduce } from "./index";

export function createPipe<TFlow extends any[]>(...operations: PipeOperationSequence<TFlow>): Pipe<TFlow>;
export function createPipe<T1>(...operations: []): PipeOperation<T1, T1>;
export function createPipe<T1, T2>(...operations: [PipeOperation<T1, T2>]): PipeOperation<T1, T2>;
export function createPipe<T1, T2, T3>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>]): PipeOperation<T1, T3>;
export function createPipe<T1, T2, T3, T4>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>]): PipeOperation<T1, T4>;
export function createPipe<T1, T2, T3, T4, T5>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>, PipeOperation<T4, T5>]): PipeOperation<T1, T5>;
export function createPipe<T1, T2, T3, T4, T5, T6>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>, PipeOperation<T4, T5>, PipeOperation<T5, T6>]): PipeOperation<T1, T6>;
export function createPipe<T1, T2, T3, T4, T5, T6, T7>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>, PipeOperation<T4, T5>, PipeOperation<T5, T6>, PipeOperation<T6, T7>]): PipeOperation<T1, T7>;
export function createPipe<T1, T2, T3, T4, T5, T6, T7, T8>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>, PipeOperation<T4, T5>, PipeOperation<T5, T6>, PipeOperation<T6, T7>, PipeOperation<T7, T8>]): PipeOperation<T1, T8>;
export function createPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>, PipeOperation<T4, T5>, PipeOperation<T5, T6>, PipeOperation<T6, T7>, PipeOperation<T7, T8>, PipeOperation<T8, T9>]): PipeOperation<T1, T9>;
export function createPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>, PipeOperation<T4, T5>, PipeOperation<T5, T6>, PipeOperation<T6, T7>, PipeOperation<T7, T8>, PipeOperation<T8, T9>, PipeOperation<T9, T10>]): PipeOperation<T1, T10>;
export function createPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>, PipeOperation<T4, T5>, PipeOperation<T5, T6>, PipeOperation<T6, T7>, PipeOperation<T7, T8>, PipeOperation<T8, T9>, PipeOperation<T9, T10>, PipeOperation<T10, T11>]): PipeOperation<T1, T11>;
export function createPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>, PipeOperation<T4, T5>, PipeOperation<T5, T6>, PipeOperation<T6, T7>, PipeOperation<T7, T8>, PipeOperation<T8, T9>, PipeOperation<T9, T10>, PipeOperation<T10, T11>, PipeOperation<T11, T12>]): PipeOperation<T1, T12>;
export function createPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>, PipeOperation<T4, T5>, PipeOperation<T5, T6>, PipeOperation<T6, T7>, PipeOperation<T7, T8>, PipeOperation<T8, T9>, PipeOperation<T9, T10>, PipeOperation<T10, T11>, PipeOperation<T11, T12>, PipeOperation<T12, T13>]): PipeOperation<T1, T13>;
export function createPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>, PipeOperation<T4, T5>, PipeOperation<T5, T6>, PipeOperation<T6, T7>, PipeOperation<T7, T8>, PipeOperation<T8, T9>, PipeOperation<T9, T10>, PipeOperation<T10, T11>, PipeOperation<T11, T12>, PipeOperation<T12, T13>, PipeOperation<T13, T14>]): PipeOperation<T1, T14>;
export function createPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>, PipeOperation<T4, T5>, PipeOperation<T5, T6>, PipeOperation<T6, T7>, PipeOperation<T7, T8>, PipeOperation<T8, T9>, PipeOperation<T9, T10>, PipeOperation<T10, T11>, PipeOperation<T11, T12>, PipeOperation<T12, T13>, PipeOperation<T13, T14>, PipeOperation<T14, T15>]): PipeOperation<T1, T15>;
export function createPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>, PipeOperation<T4, T5>, PipeOperation<T5, T6>, PipeOperation<T6, T7>, PipeOperation<T7, T8>, PipeOperation<T8, T9>, PipeOperation<T9, T10>, PipeOperation<T10, T11>, PipeOperation<T11, T12>, PipeOperation<T12, T13>, PipeOperation<T13, T14>, PipeOperation<T14, T15>, PipeOperation<T15, T16>]): PipeOperation<T1, T16>;
/**
 * Creates a synchronous pipe that processes an input through a sequence of operations.
 *
 * @template TFlow - An array representing the types of inputs and outputs for each operation.
 *
 * @param operations - A sequence of functions to process the input.
 *
 * @returns A function that takes an input and applies each operation in sequence, returning the final result.
 */
export function createPipe(...operations: PipeOperation<any, any>[]): any {
  return (input: PipeOperation<any, any>[][0]) => {
    return operations.reduce(
      (prevResult, operation) => operation(prevResult),
      input,
    ) as Last<PipeOperation<any, any>[]>;
  };
}

export function createAsyncPipe<TFlow extends any[]>(...operations: AsyncPipeOperationSequence<TFlow>): AsyncPipe<TFlow>;
export function createAsyncPipe<T1>(...operations: []): AsyncPipeOperation<T1, T1>;
export function createAsyncPipe<T1, T2>(...operations: [AsyncPipeOperation<T1, T2>]): AsyncPipeOperation<T1, T2>;
export function createAsyncPipe<T1, T2, T3>(...operations: [AsyncPipeOperation<T1, T2>, AsyncPipeOperation<T2, T3>]): AsyncPipeOperation<T1, T3>;
export function createAsyncPipe<T1, T2, T3, T4>(...operations: [AsyncPipeOperation<T1, T2>, AsyncPipeOperation<T2, T3>, AsyncPipeOperation<T3, T4>]): AsyncPipeOperation<T1, T4>;
export function createAsyncPipe<T1, T2, T3, T4, T5>(...operations: [AsyncPipeOperation<T1, T2>, AsyncPipeOperation<T2, T3>, AsyncPipeOperation<T3, T4>, AsyncPipeOperation<T4, T5>]): AsyncPipeOperation<T1, T5>;
export function createAsyncPipe<T1, T2, T3, T4, T5, T6>(...operations: [AsyncPipeOperation<T1, T2>, AsyncPipeOperation<T2, T3>, AsyncPipeOperation<T3, T4>, AsyncPipeOperation<T4, T5>, AsyncPipeOperation<T5, T6>]): AsyncPipeOperation<T1, T6>;
export function createAsyncPipe<T1, T2, T3, T4, T5, T6, T7>(...operations: [AsyncPipeOperation<T1, T2>, AsyncPipeOperation<T2, T3>, AsyncPipeOperation<T3, T4>, AsyncPipeOperation<T4, T5>, AsyncPipeOperation<T5, T6>, AsyncPipeOperation<T6, T7>]): AsyncPipeOperation<T1, T7>;
export function createAsyncPipe<T1, T2, T3, T4, T5, T6, T7, T8>(...operations: [AsyncPipeOperation<T1, T2>, AsyncPipeOperation<T2, T3>, AsyncPipeOperation<T3, T4>, AsyncPipeOperation<T4, T5>, AsyncPipeOperation<T5, T6>, AsyncPipeOperation<T6, T7>, AsyncPipeOperation<T7, T8>]): AsyncPipeOperation<T1, T8>;
export function createAsyncPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9>(...operations: [AsyncPipeOperation<T1, T2>, AsyncPipeOperation<T2, T3>, AsyncPipeOperation<T3, T4>, AsyncPipeOperation<T4, T5>, AsyncPipeOperation<T5, T6>, AsyncPipeOperation<T6, T7>, AsyncPipeOperation<T7, T8>, AsyncPipeOperation<T8, T9>]): AsyncPipeOperation<T1, T9>;
export function createAsyncPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(...operations: [AsyncPipeOperation<T1, T2>, AsyncPipeOperation<T2, T3>, AsyncPipeOperation<T3, T4>, AsyncPipeOperation<T4, T5>, AsyncPipeOperation<T5, T6>, AsyncPipeOperation<T6, T7>, AsyncPipeOperation<T7, T8>, AsyncPipeOperation<T8, T9>, AsyncPipeOperation<T9, T10>]): AsyncPipeOperation<T1, T10>;
export function createAsyncPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(...operations: [AsyncPipeOperation<T1, T2>, AsyncPipeOperation<T2, T3>, AsyncPipeOperation<T3, T4>, AsyncPipeOperation<T4, T5>, AsyncPipeOperation<T5, T6>, AsyncPipeOperation<T6, T7>, AsyncPipeOperation<T7, T8>, AsyncPipeOperation<T8, T9>, AsyncPipeOperation<T9, T10>, AsyncPipeOperation<T10, T11>]): AsyncPipeOperation<T1, T11>;
export function createAsyncPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(...operations: [AsyncPipeOperation<T1, T2>, AsyncPipeOperation<T2, T3>, AsyncPipeOperation<T3, T4>, AsyncPipeOperation<T4, T5>, AsyncPipeOperation<T5, T6>, AsyncPipeOperation<T6, T7>, AsyncPipeOperation<T7, T8>, AsyncPipeOperation<T8, T9>, AsyncPipeOperation<T9, T10>, AsyncPipeOperation<T10, T11>, AsyncPipeOperation<T11, T12>]): AsyncPipeOperation<T1, T12>;
export function createAsyncPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(...operations: [AsyncPipeOperation<T1, T2>, AsyncPipeOperation<T2, T3>, AsyncPipeOperation<T3, T4>, AsyncPipeOperation<T4, T5>, AsyncPipeOperation<T5, T6>, AsyncPipeOperation<T6, T7>, AsyncPipeOperation<T7, T8>, AsyncPipeOperation<T8, T9>, AsyncPipeOperation<T9, T10>, AsyncPipeOperation<T10, T11>, AsyncPipeOperation<T11, T12>, AsyncPipeOperation<T12, T13>]): AsyncPipeOperation<T1, T13>;
export function createAsyncPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(...operations: [AsyncPipeOperation<T1, T2>, AsyncPipeOperation<T2, T3>, AsyncPipeOperation<T3, T4>, AsyncPipeOperation<T4, T5>, AsyncPipeOperation<T5, T6>, AsyncPipeOperation<T6, T7>, AsyncPipeOperation<T7, T8>, AsyncPipeOperation<T8, T9>, AsyncPipeOperation<T9, T10>, AsyncPipeOperation<T10, T11>, AsyncPipeOperation<T11, T12>, AsyncPipeOperation<T12, T13>, AsyncPipeOperation<T13, T14>]): AsyncPipeOperation<T1, T14>;
export function createAsyncPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15>(...operations: [AsyncPipeOperation<T1, T2>, AsyncPipeOperation<T2, T3>, AsyncPipeOperation<T3, T4>, AsyncPipeOperation<T4, T5>, AsyncPipeOperation<T5, T6>, AsyncPipeOperation<T6, T7>, AsyncPipeOperation<T7, T8>, AsyncPipeOperation<T8, T9>, AsyncPipeOperation<T9, T10>, AsyncPipeOperation<T10, T11>, AsyncPipeOperation<T11, T12>, AsyncPipeOperation<T12, T13>, AsyncPipeOperation<T13, T14>, AsyncPipeOperation<T14, T15>]): AsyncPipeOperation<T1, T15>;
export function createAsyncPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16>(...operations: [AsyncPipeOperation<T1, T2>, AsyncPipeOperation<T2, T3>, AsyncPipeOperation<T3, T4>, AsyncPipeOperation<T4, T5>, AsyncPipeOperation<T5, T6>, AsyncPipeOperation<T6, T7>, AsyncPipeOperation<T7, T8>, AsyncPipeOperation<T8, T9>, AsyncPipeOperation<T9, T10>, AsyncPipeOperation<T10, T11>, AsyncPipeOperation<T11, T12>, AsyncPipeOperation<T12, T13>, AsyncPipeOperation<T13, T14>, AsyncPipeOperation<T14, T15>, AsyncPipeOperation<T15, T16>]): AsyncPipeOperation<T1, T16>;

/**
 * Creates an asynchronous pipe that processes an input through a sequence of operations.
 *
 * @template TFlow - An array representing the types of inputs and outputs for each operation.
 *
 * @param operations - A sequence of functions to process the input.
 *
 * @returns A function that takes an input and applies each operation in sequence, returning the final result.
 */
export function createAsyncPipe(...operations: AsyncPipeOperation<any, any>[]): any {
  return async (input: AsyncPipeOperation<any, any>[][0]) => {
    return await reduce.toValueAsync(
      operations,
      async (prevResult, operation) => await operation(prevResult),
      input,
    ) as Last<AsyncPipeOperation<any, any>[]>;
  };
}
