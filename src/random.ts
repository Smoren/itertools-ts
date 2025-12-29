import { InvalidArgumentError } from "./exceptions";

/**
 * Generate a sequence of random booleans
 *
 * @param repetitions (optional) Number of values to generate
 *
 * @see booleansAsync For asynchronous version
 */
export function* booleans(repetitions?: number): Iterable<boolean> {
  let i = 0;

  while (repetitions === undefined || i < repetitions) {
    yield Math.random() > 0.5;
    i++;
  }
}

/**
 * Generate a sequence of random booleans
 *
 * @param repetitions (optional) Number of values to generate
 *
 * @see booleans For synchronous version
 */
export async function* booleansAsync(repetitions?: number): AsyncIterable<boolean> {
  let i = 0;

  while (repetitions === undefined || i < repetitions) {
    yield Math.random() > 0.5;
    i++;
  }
}

/**
 * Generates random percentages between 0 (inclusive) and 1 (exclusive).
 *
 * If optional param `repetitions` is not given, iterates infinitely.
 *
 * @param repetitions - Number of values to generate
 * @throws {InvalidArgumentError} If repetitions is negative
 * @see percentageAsync For asynchronous version
 */
export function* percentage(repetitions?: number): Generator<number> {
  if (repetitions !== undefined && repetitions < 0) {
    throw new InvalidArgumentError(`Number of repetitions cannot be negative: ${repetitions}`);
  }

  let count = 0;
  while (repetitions === undefined || count < repetitions) {
    yield Math.random();
    if (repetitions !== undefined) count++;
  }
}

/**
 * Asynchronously generates random percentages between 0 (inclusive) and 1 (exclusive).
 *
 * If optional param `repetitions` is not given, iterates infinitely.
 *
 * @param repetitions - Number of values to generate
 * @throws {InvalidArgumentError} If repetitions is negative
 * @see percentage For synchronous version
 */
export async function* percentageAsync(repetitions?: number): AsyncGenerator<number> {
  if (repetitions !== undefined && repetitions < 0) {
    throw new InvalidArgumentError(`Number of repetitions cannot be negative: ${repetitions}`);
  }

  let count = 0;
  while (repetitions === undefined || count < repetitions) {
    yield Math.random();
    if (repetitions !== undefined) count++;
  }
}
