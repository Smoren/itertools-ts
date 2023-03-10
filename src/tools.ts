import { LengthError } from "./exceptions";
import { single } from "./index";
import { toIterator } from "./transform";

export enum MultipleIterationMode {
  SHORTEST,
  LONGEST,
  STRICT_EQUAL,
}

/**
 * Creates iterable instance to iterate several iterables simultaneously.
 *
 * @param mode shortest, longest or strict equal
 * @param iterables
 */
export function* createMultipleIterator(
  mode: MultipleIterationMode,
  ...iterables: Array<Iterable<unknown> | Iterator<unknown>>
): Iterable<Array<unknown>> {
  if (iterables.length === 0) {
    return;
  }

  const iterators = [];
  for (const it of iterables) {
    iterators.push(toIterator(it));
  }

  iterate: while (true) {
    const statuses = single.map(iterators, (it: Iterator<unknown>) =>
      it.next()
    );
    const values = [];

    let allValid = true;
    let anyValid = false;

    for (const status of statuses) {
      let value;

      if (status.done) {
        allValid = false;
        value = undefined;
      } else {
        anyValid = true;
        value = status.value;
      }

      values.push(value);
    }

    if (!allValid && anyValid) {
      switch (mode) {
        case MultipleIterationMode.SHORTEST:
          break iterate;
        case MultipleIterationMode.STRICT_EQUAL:
          throw new LengthError("Iterators must have equal lengths");
      }
    }

    if (!anyValid) {
      break;
    }

    yield values;
  }
}
