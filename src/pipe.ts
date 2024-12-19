import { AsyncPipe, AsyncPipeOperationSequence, Last, Pipe, PipeOperation, PipeOperationSequence } from "./types";
import { reduce } from "./index";

// export function createPipe<A>(): (input: A) => A;
// export function createPipe<A, B>(fn1: (input: A) => B): (input: A) => B;
// export function createPipe<A, B, C>(fn1: (input: A) => B, fn2: (input: B) => C): (input: A) => C;
// export function createPipe<A, B, C, D>(
//   fn1: (input: A) => B,
//   fn2: (input: B) => C,
//   fn3: (input: C) => D,
// ): (input: A) => D;
// export function createPipe<A, B, C, D, E>(
//   fn1: (input: A) => B,
//   fn2: (input: B) => C,
//   fn3: (input: C) => D,
//   fn4: (input: D) => E,
// ): (input: A) => E;
// export function createPipe<TFlow extends any[]>(...operations: PipeOperationSequence<TFlow>): Pipe<TFlow>;

/**
 * Creates a synchronous pipe that processes an input through a sequence of operations.
 *
 * @template TFlow - An array representing the types of inputs and outputs for each operation.
 *
 * @param operations - A sequence of functions to process the input.
 *
 * @returns A function that takes an input and applies each operation in sequence, returning the final result.
 */
export function createPipe<TFlow extends any[]>(...operations: PipeOperationSequence<TFlow>): Pipe<TFlow> {
  return (input: TFlow[0]) => {
    return operations.reduce(
      (prevResult, operation) => operation(prevResult),
      input,
    ) as Last<TFlow>;
  };
}
// export function createPipe(...operations: PipeOperation<any, any>[]): any {
//   return (input: PipeOperation<any, any>[][0]) => {
//     return operations.reduce(
//       (prevResult, operation) => operation(prevResult),
//       input,
//     ) as Last<PipeOperation<any, any>[]>;
//   };
// }


/**
 * Creates an asynchronous pipe that processes an input through a sequence of operations.
 *
 * @template TFlow - An array representing the types of inputs and outputs for each operation.
 *
 * @param operations - A sequence of functions to process the input.
 *
 * @returns A function that takes an input and applies each operation in sequence, returning the final result.
 */
export function createAsyncPipe<TFlow extends any[]>(
  ...operations: AsyncPipeOperationSequence<TFlow>
): AsyncPipe<TFlow> {
  return async (input: TFlow[0]) => {
    return await reduce.toValueAsync(
      operations,
      async (prevResult, operation) => await operation(prevResult),
      input,
    ) as Last<TFlow>;
  };
}
