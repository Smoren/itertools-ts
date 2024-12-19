import { AsyncPipe, AsyncPipeOperationSequence, Last, Pipe, PipeOperationSequence } from "./types";
import { reduce } from "./index";

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
