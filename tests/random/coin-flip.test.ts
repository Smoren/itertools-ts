import { coinFlip, coinFlipAsync } from '../../src/random';
import { Stream, AsyncStream } from '../../src';
import { InvalidArgumentError } from '../../src/exceptions';

describe.each([
  ...dataProviderForFiniteSync(),
])(
  'Random CoinFlip Finite (sync)',
  (count) => {
    it('', () => {
      const values = Array.from(coinFlip(count));
      expect(values.length).toBe(count);
      values.forEach((num) => {
        expect([0, 1]).toContain(num);
      });
    });
  }
);

describe.each([
  ...dataProviderForInfiniteSync(),
])(
  'Random CoinFlip Infinite (sync)',
  (takeCount) => {
    it('', () => {
      const gen = coinFlip();
      const values: number[] = [];
      for (let i = 0; i < takeCount; i++) {
        const { value, done } = gen.next();
        if (done) break;
        values.push(value);
      }
      expect(values.length).toBe(takeCount);
      values.forEach((num) => {
        expect([0, 1]).toContain(num);
      });
    });
  }
);

describe.each([
  ...dataProviderForNegativeSync(),
])(
  'Random CoinFlip Negative (sync)',
  (negativeCount) => {
    it('', () => {
      expect(() => Array.from(coinFlip(negativeCount))).toThrow(InvalidArgumentError);
    });
  }
);

describe.each([
  ...dataProviderForFiniteAsync(),
])(
  'Random CoinFlip Finite (async)',
  (count) => {
    it('', async () => {
      const values: number[] = [];
      for await (const num of coinFlipAsync(count)) {
        values.push(num);
      }
      expect(values.length).toBe(count);
      values.forEach((num) => {
        expect([0, 1]).toContain(num);
      });
    });
  }
);

describe.each([
  ...dataProviderForInfiniteAsync(),
])(
  'Random CoinFlip Infinite (async)',
  (takeCount) => {
    it('', async () => {
      const values: number[] = [];
      for await (const num of coinFlipAsync()) {
        values.push(num);
        if (values.length === takeCount) break;
      }
      expect(values.length).toBe(takeCount);
      values.forEach((num) => {
        expect([0, 1]).toContain(num);
      });
    });
  }
);

describe.each([
  ...dataProviderForNegativeAsync(),
])(
  'Random CoinFlip Negative (async)',
  (negativeCount) => {
    it('', async () => {
      const gen = coinFlipAsync(negativeCount);
      await expect((async () => {
        for await (const _ of gen) {}
      })()).rejects.toThrow(InvalidArgumentError);
    });
  }
);

describe('Stream.ofCoinFlip', () => {
  it('generates correct number of values', () => {
    const values = Stream.ofCoinFlip(5).toArray();
    expect(values.length).toBe(5);
    values.forEach((num) => {
      expect([0, 1]).toContain(num);
    });
  });

  it('iterates infinitely when no repetitions given', () => {
    const values = Stream.ofCoinFlip().limit(10).toArray();
    expect(values.length).toBe(10);
    values.forEach((num) => {
      expect([0, 1]).toContain(num);
    });
  });
});

describe('AsyncStream.ofCoinFlip', () => {
  it('generates correct number of values', async () => {
    const values = await AsyncStream.ofCoinFlip(5).toArray();
    expect(values.length).toBe(5);
    values.forEach((num) => {
      expect([0, 1]).toContain(num);
    });
  });

  it('iterates infinitely when no repetitions given', async () => {
    const values = await AsyncStream.ofCoinFlip().limit(10).toArray();
    expect(values.length).toBe(10);
    values.forEach((num) => {
      expect([0, 1]).toContain(num);
    });
  });
});

function dataProviderForFiniteSync(): Array<[number]> {
  return [
    [1],
    [5],
    [10],
  ];
}

function dataProviderForInfiniteSync(): Array<[number]> {
  return [
    [5],
    [8],
  ];
}

function dataProviderForNegativeSync(): Array<[number]> {
  return [
    [-1],
    [-5],
  ];
}

function dataProviderForFiniteAsync(): Array<[number]> {
  return [
    [1],
    [5],
    [10],
  ];
}

function dataProviderForInfiniteAsync(): Array<[number]> {
  return [
    [5],
    [8],
  ];
}

function dataProviderForNegativeAsync(): Array<[number]> {
  return [
    [-1],
    [-5],
  ];
}
