import { AsyncPipe, AsyncPipeOperationSequence, Last, Pipe, PipeOperationSequence } from "./types";

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
    let result = input;
    for (const operation of operations) {
      result = operation(result);
    }
    return result;
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
    let result = input;
    for (const operation of operations) {
      result = await operation(result);
    }
    return result as Last<TFlow>;
  };
}
