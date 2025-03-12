import {InvalidArgumentError} from "./exceptions";
import {default as RandomGenerator} from "random"

/**
 * Validates the parameters from the integer functions
 *
 * @param min Lower boundary for the generated integers (inclusive)
 * @param max Higher boundary for the generated integers (inclusive)
 * @param repetitions (Optional) If specified, the amount of numbers to generate
 */
function integersValidateParameters(min: number, max: number, repetitions?: number): void {
  if(repetitions !== undefined && repetitions < 0) {
    throw new InvalidArgumentError(
      `Number of repetitions cannot be negative: ${repetitions}`
    );
  }

  if(max < min) {
    throw new InvalidArgumentError(
      `Max ${max} cannot be less than min ${min}`
    )
  }
}

/**
 * Generate random integers between min and max
 *
 * @param min Lower boundary for the generated integers (inclusive)
 * @param max Higher boundary for the generated integers (inclusive)
 * @param repetitions (Optional) If specified, the amount of numbers to generate
 */
export function* integers(min: number, max: number, repetitions?: number): Iterable<number> {
  integersValidateParameters(min, max, repetitions);

  if (repetitions === undefined) {
    while(true) {
      yield RandomGenerator.int(min, max);
    }
  } else {
    for (let i = repetitions; i > 0; --i) {
      yield RandomGenerator.int(min, max);
    }
  }
}

/**
 * Generate random integers between min and max, as promise.
 *
 * @param min Lower boundary for the generated integers (inclusive)
 * @param max Higher boundary for the generated integers (inclusive)
 * @param repetitions (Optional) If specified, the amount of numbers to generate
 */
export async function* integersAsync(min: number, max: number, repetitions?: number): AsyncIterable<number> {
  integersValidateParameters(min, max, repetitions);

  if (repetitions === undefined) {
    while(true) {
      yield RandomGenerator.int(min, max);
    }
  } else {
    for (let i = repetitions; i > 0; --i) {
      yield RandomGenerator.int(min, max);
    }
  }
}
