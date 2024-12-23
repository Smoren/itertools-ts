import {
  Last,
  Pipe,
  PipeOperation,
  PipeOperationSequence,
} from "./types";

/**
 * Creates a synchronous pipe that processes an input through a sequence of operations.
 *
 * @template TFlow - An array representing the types of inputs and outputs for each operation.
 *
 * @param operations - A sequence of functions to process the input.
 *
 * @returns A function that takes an input and applies each operation in sequence, returning the final result.
 */
export function createPipe(...operations: []): Pipe<[]>;
export function createPipe<TFlow extends any[]>(...operations: PipeOperationSequence<TFlow>): Pipe<TFlow>;
export function createPipe<T1>(...operations: []): Pipe<[T1]>;
export function createPipe<T1, T2>(...operations: [PipeOperation<T1, T2>]): Pipe<[T1, T2]>;
export function createPipe<T1, T2, T3>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>]): Pipe<[T1, T2, T3]>;
export function createPipe<T1, T2, T3, T4>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>]): Pipe<[T1, T2, T3, T4]>;
export function createPipe<T1, T2, T3, T4, T5>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>, PipeOperation<T4, T5>]): Pipe<[T1, T2, T3, T4, T5]>;
export function createPipe<T1, T2, T3, T4, T5, T6>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>, PipeOperation<T4, T5>, PipeOperation<T5, T6>]): Pipe<[T1, T2, T3, T4, T5, T6]>;
export function createPipe<T1, T2, T3, T4, T5, T6, T7>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>, PipeOperation<T4, T5>, PipeOperation<T5, T6>, PipeOperation<T6, T7>]): Pipe<[T1, T2, T3, T4, T5, T6, T7]>;
export function createPipe<T1, T2, T3, T4, T5, T6, T7, T8>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>, PipeOperation<T4, T5>, PipeOperation<T5, T6>, PipeOperation<T6, T7>, PipeOperation<T7, T8>]): Pipe<[T1, T2, T3, T4, T5, T6, T7, T8]>;
export function createPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>, PipeOperation<T4, T5>, PipeOperation<T5, T6>, PipeOperation<T6, T7>, PipeOperation<T7, T8>, PipeOperation<T8, T9>]): Pipe<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
export function createPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>, PipeOperation<T4, T5>, PipeOperation<T5, T6>, PipeOperation<T6, T7>, PipeOperation<T7, T8>, PipeOperation<T8, T9>, PipeOperation<T9, T10>]): Pipe<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
export function createPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>, PipeOperation<T4, T5>, PipeOperation<T5, T6>, PipeOperation<T6, T7>, PipeOperation<T7, T8>, PipeOperation<T8, T9>, PipeOperation<T9, T10>, PipeOperation<T10, T11>]): Pipe<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11]>;
export function createPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>, PipeOperation<T4, T5>, PipeOperation<T5, T6>, PipeOperation<T6, T7>, PipeOperation<T7, T8>, PipeOperation<T8, T9>, PipeOperation<T9, T10>, PipeOperation<T10, T11>, PipeOperation<T11, T12>]): Pipe<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12]>;
export function createPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>, PipeOperation<T4, T5>, PipeOperation<T5, T6>, PipeOperation<T6, T7>, PipeOperation<T7, T8>, PipeOperation<T8, T9>, PipeOperation<T9, T10>, PipeOperation<T10, T11>, PipeOperation<T11, T12>, PipeOperation<T12, T13>]): Pipe<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13]>;
export function createPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>, PipeOperation<T4, T5>, PipeOperation<T5, T6>, PipeOperation<T6, T7>, PipeOperation<T7, T8>, PipeOperation<T8, T9>, PipeOperation<T9, T10>, PipeOperation<T10, T11>, PipeOperation<T11, T12>, PipeOperation<T12, T13>, PipeOperation<T13, T14>]): Pipe<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14]>;
export function createPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>, PipeOperation<T4, T5>, PipeOperation<T5, T6>, PipeOperation<T6, T7>, PipeOperation<T7, T8>, PipeOperation<T8, T9>, PipeOperation<T9, T10>, PipeOperation<T10, T11>, PipeOperation<T11, T12>, PipeOperation<T12, T13>, PipeOperation<T13, T14>, PipeOperation<T14, T15>]): Pipe<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15]>;
export function createPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16>(...operations: [PipeOperation<T1, T2>, PipeOperation<T2, T3>, PipeOperation<T3, T4>, PipeOperation<T4, T5>, PipeOperation<T5, T6>, PipeOperation<T6, T7>, PipeOperation<T7, T8>, PipeOperation<T8, T9>, PipeOperation<T9, T10>, PipeOperation<T10, T11>, PipeOperation<T11, T12>, PipeOperation<T12, T13>, PipeOperation<T13, T14>, PipeOperation<T14, T15>, PipeOperation<T15, T16>]): Pipe<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16]>;
export function createPipe(...operations: PipeOperation<any, any>[]): any {
  const result = (input: PipeOperation<any, any>[][0]) => {
    return operations.reduce(
      (prevResult, operation) => operation(prevResult),
      input,
    ) as Last<PipeOperation<any, any>[]>;
  };

  result.add = (operation: PipeOperation<any, any>) => createPipe(result, operation);
  return result;
}
