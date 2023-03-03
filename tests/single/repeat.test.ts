// @ts-ignore
import { createGeneratorFixture, createIteratorFixture } from "../fixture";
import { repeat } from "../../src/single";
import { InvalidArgumentError } from '../../src/exceptions';

describe.each([
  ...dataProviderForIntegers(),
  ...dataProviderForFloats(),
  ...dataProviderForNulls(),
  ...dataProviderForUndefined(),
  ...dataProviderForBooleans(),
  ...dataProviderForStrings(),
  ...dataProviderForArrays(),
  ...dataProviderForObjects(),
])("Single Repeat Test", (input, repetitions, expected) => {
  it("", () => {
    // Given
    const result = [];

    // When
    for (const item of repeat(input, repetitions as number)) {
      result.push(item);
    }

    // Then
    expect(result).toEqual(expected);
  });
});

describe.each(dataProviderForError())("Single Repeat Error Test", (input) => {
  it("", () => {
    expect(() => {
      const repetitions = repeat(input, -1);

      for (const _ of repetitions) {
        break;
      }
    }).toThrow(InvalidArgumentError);
  });
});

function dataProviderForIntegers(): Array<unknown> {
  return [
    [0, 0, []],
    [1, 0, []],
    [87384, 0, []],
    [-827, 0, []],
    [0, 1, [0]],
    [1, 1, [1]],
    [87384, 1, [87384]],
    [-827, 1, [-827]],
    [0, 5, [0, 0, 0, 0, 0]],
    [1, 5, [1, 1, 1, 1, 1]],
    [87384, 5, [87384, 87384, 87384, 87384, 87384]],
    [-827, 5, [-827, -827, -827, -827, -827]],
  ];
}

function dataProviderForFloats(): Array<unknown> {
  return [
    [0.0, 0, []],
    [1.1, 0, []],
    [87384.1, 0, []],
    [-827.1, 0, []],
    [0.0, 1, [0.0]],
    [1.1, 1, [1.1]],
    [87384.1, 1, [87384.1]],
    [-827.1, 1, [-827.1]],
    [0.0, 5, [0.0, 0.0, 0.0, 0.0, 0.0]],
    [1.1, 5, [1.1, 1.1, 1.1, 1.1, 1.1]],
    [87384.1, 5, [87384.1, 87384.1, 87384.1, 87384.1, 87384.1]],
    [-827.1, 5, [-827.1, -827.1, -827.1, -827.1, -827.1]],
  ];
}

function dataProviderForNulls(): Array<unknown> {
  return [
    [null, 0, []],
    [null, 1, [null]],
    [null, 5, [null, null, null, null, null]],
  ];
}

function dataProviderForUndefined(): Array<unknown> {
  return [
    [undefined, 0, []],
    [undefined, 1, [undefined]],
    [undefined, 5, [undefined, undefined, undefined, undefined, undefined]],
  ];
}

function dataProviderForBooleans(): Array<unknown> {
  return [
    [true, 0, []],
    [false, 0, []],
    [true, 1, [true]],
    [false, 1, [false]],
    [true, 5, [true, true, true, true, true]],
    [false, 5, [false, false, false, false, false]],
  ];
}

function dataProviderForStrings(): Array<unknown> {
  return [
    ['', 0, []],
    ['', 1, ['']],
    ['', 5, ['', '', '', '', '']],
    ['a', 0, []],
    ['a', 1, ['a']],
    ['a', 5, ['a', 'a', 'a', 'a', 'a']],
    ['IterTools TS', 0, []],
    ['IterTools TS', 1, ['IterTools TS']],
    ['IterTools TS', 5, ['IterTools TS', 'IterTools TS', 'IterTools TS', 'IterTools TS', 'IterTools TS']],
    ['日本語もできます。', 0, []],
    ['日本語もできます。', 1, ['日本語もできます。']],
    ['日本語もできます。', 5, ['日本語もできます。', '日本語もできます。', '日本語もできます。', '日本語もできます。', '日本語もできます。']],
  ];
}

function dataProviderForArrays(): Array<unknown> {
  return [
    [[], 0, []],
    [[], 1, [[]]],
    [[], 5, [[], [], [], [], []]],
    [[1], 0, []],
    [[1], 1, [[1]]],
    [[1], 5, [[1], [1], [1], [1], [1]]],
  ];
}

function dataProviderForObjects(): Array<unknown> {
  return [
    [{}, 0, []],
    [{}, 1, [{}]],
    [{}, 5, [{}, {}, {}, {}, {}]],
    [{a: 1}, 0, []],
    [{a: 1}, 1, [{a: 1}]],
    [{a: 1}, 5, [{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 1}]],
  ];
}

function dataProviderForError(): Array<unknown> {
  return [
    [1],
    [1.0],
    [true],
    [false],
    [null],
    [undefined],
    [NaN],
    [Infinity],
    [-Infinity],
    [[]],
    [{a: 1}],
  ];
}
