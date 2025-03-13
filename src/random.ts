const hands = ["rock", "paper", "scissors"] as const;
export function* rockPaperScissors(repetitions?: number): Iterable<"rock" | "paper" | "scissors"> {
  let count = 0;
  while (repetitions === undefined || count < repetitions) {
    yield hands[Math.floor(Math.random() * hands.length)];
    count++;
  }
}
export async function* rockPaperScissorsAsync(repetitions?: number): AsyncIterable<"rock" | "paper" | "scissors"> {
  let count = 0;
  while (repetitions === undefined || count < repetitions) {
    await Promise.resolve();
    yield hands[Math.floor(Math.random() * hands.length)];
    count++;
  }
}
export const random = {
  rockPaperScissors,
  rockPaperScissorsAsync,
};
export const Stream = {
  rockPaperScissors(repetitions?: number) {
    return rockPaperScissors(repetitions);
  }
};
export const AsyncStream = {
  rockPaperScissors(repetitions?: number) {
    return rockPaperScissorsAsync(repetitions);
  }
};
