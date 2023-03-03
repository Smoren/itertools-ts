"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const fixture_1 = require("../fixture");
const single_1 = require("../../src/single");
describe.each([
    ...dataProviderForArrays(),
    ...dataProviderForGenerators(),
    ...dataProviderForIterators(),
    ...dataProviderForStrings(),
    ...dataProviderForSets(),
    ...dataProviderForMaps(),
])("Single Map Test", (input, mapper, expected) => {
    it("", () => {
        // Given
        const result = [];
        // When
        for (const item of (0, single_1.map)(input, mapper)) {
            result.push(item);
        }
        // Then
        expect(result).toEqual(expected);
    });
});
function dataProviderForArrays() {
    return [
        [
            [],
            (x) => x + 1,
            [],
        ],
        [
            [],
            (x) => Math.sqrt(x),
            [],
        ],
        [
            [0, 1, 2, 3, 4, 5],
            (x) => x,
            [0, 1, 2, 3, 4, 5],
        ],
        [
            [0, 1, 2, 3, 4, 5],
            (x) => x + 1,
            [1, 2, 3, 4, 5, 6],
        ],
        [
            ["IterToolsTS", "MathTS", "SubnetCalculator"],
            (x) => `${x} is great!`,
            ["IterToolsTS is great!", "MathTS is great!", "SubnetCalculator is great!"],
        ],
        [
            [1, 4, 9, 16, 25],
            (x) => Math.sqrt(x),
            [1, 2, 3, 4, 5],
        ],
        [
            [1, -2, 3, -4, 5],
            (x) => Math.abs(x),
            [1, 2, 3, 4, 5],
        ],
        [
            ['one', 'Two', 'ThReE', 'FOUR'],
            (x) => x.toUpperCase(),
            ['ONE', 'TWO', 'THREE', 'FOUR'],
        ],
    ];
}
function dataProviderForGenerators() {
    return [
        [
            (0, fixture_1.createGeneratorFixture)([]),
            (x) => x + 1,
            [],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([]),
            (x) => Math.sqrt(x),
            [],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([0, 1, 2, 3, 4, 5]),
            (x) => x,
            [0, 1, 2, 3, 4, 5],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([0, 1, 2, 3, 4, 5]),
            (x) => x + 1,
            [1, 2, 3, 4, 5, 6],
        ],
        [
            (0, fixture_1.createGeneratorFixture)(["IterToolsTS", "MathTS", "SubnetCalculator"]),
            (x) => `${x} is great!`,
            ["IterToolsTS is great!", "MathTS is great!", "SubnetCalculator is great!"],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([1, 4, 9, 16, 25]),
            (x) => Math.sqrt(x),
            [1, 2, 3, 4, 5],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([1, -2, 3, -4, 5]),
            (x) => Math.abs(x),
            [1, 2, 3, 4, 5],
        ],
        [
            (0, fixture_1.createGeneratorFixture)(['one', 'Two', 'ThReE', 'FOUR']),
            (x) => x.toUpperCase(),
            ['ONE', 'TWO', 'THREE', 'FOUR'],
        ],
    ];
}
function dataProviderForIterators() {
    return [
        [
            (0, fixture_1.createIteratorFixture)([]),
            (x) => x + 1,
            [],
        ],
        [
            (0, fixture_1.createIteratorFixture)([]),
            (x) => Math.sqrt(x),
            [],
        ],
        [
            (0, fixture_1.createIteratorFixture)([0, 1, 2, 3, 4, 5]),
            (x) => x,
            [0, 1, 2, 3, 4, 5],
        ],
        [
            (0, fixture_1.createIteratorFixture)([0, 1, 2, 3, 4, 5]),
            (x) => x + 1,
            [1, 2, 3, 4, 5, 6],
        ],
        [
            (0, fixture_1.createIteratorFixture)(["IterToolsTS", "MathTS", "SubnetCalculator"]),
            (x) => `${x} is great!`,
            ["IterToolsTS is great!", "MathTS is great!", "SubnetCalculator is great!"],
        ],
        [
            (0, fixture_1.createIteratorFixture)([1, 4, 9, 16, 25]),
            (x) => Math.sqrt(x),
            [1, 2, 3, 4, 5],
        ],
        [
            (0, fixture_1.createIteratorFixture)([1, -2, 3, -4, 5]),
            (x) => Math.abs(x),
            [1, 2, 3, 4, 5],
        ],
        [
            (0, fixture_1.createIteratorFixture)(['one', 'Two', 'ThReE', 'FOUR']),
            (x) => x.toUpperCase(),
            ['ONE', 'TWO', 'THREE', 'FOUR'],
        ],
    ];
}
function dataProviderForStrings() {
    return [
        [
            '',
            (x) => x + 1,
            [],
        ],
        [
            '',
            (x) => Math.sqrt(x),
            [],
        ],
        [
            '012345',
            (x) => x,
            ['0', '1', '2', '3', '4', '5'],
        ],
        [
            '012345',
            (x) => parseInt(x) + 1,
            [1, 2, 3, 4, 5, 6],
        ],
        [
            'aBcD',
            (x) => x.toUpperCase(),
            ['A', 'B', 'C', 'D'],
        ],
    ];
}
function dataProviderForSets() {
    return [
        [
            new Set([]),
            (x) => x + 1,
            [],
        ],
        [
            new Set([]),
            (x) => Math.sqrt(x),
            [],
        ],
        [
            new Set([0, 1, 2, 3, 4, 5]),
            (x) => x,
            [0, 1, 2, 3, 4, 5],
        ],
        [
            new Set([0, 1, 2, 3, 4, 5]),
            (x) => x + 1,
            [1, 2, 3, 4, 5, 6],
        ],
        [
            new Set(["IterToolsTS", "MathTS", "SubnetCalculator"]),
            (x) => `${x} is great!`,
            ["IterToolsTS is great!", "MathTS is great!", "SubnetCalculator is great!"],
        ],
        [
            new Set([1, 4, 9, 16, 25]),
            (x) => Math.sqrt(x),
            [1, 2, 3, 4, 5],
        ],
        [
            new Set([1, -2, 3, -4, 5]),
            (x) => Math.abs(x),
            [1, 2, 3, 4, 5],
        ],
        [
            new Set(['one', 'Two', 'ThReE', 'FOUR']),
            (x) => x.toUpperCase(),
            ['ONE', 'TWO', 'THREE', 'FOUR'],
        ],
    ];
}
function dataProviderForMaps() {
    return [
        [
            new Map([]),
            (x) => x[1] + 1,
            [],
        ],
        [
            new Map([]),
            (x) => Math.sqrt(x[1]),
            [],
        ],
        [
            new Map([['a', 1], ['b', 2], ['c', 3]]),
            (x) => x[1],
            [1, 2, 3],
        ],
        [
            new Map([['a', 1], ['b', 2], ['c', 3]]),
            (x) => x[1] + 1,
            [2, 3, 4],
        ],
        [
            new Map([[1, "IterToolsTS"], [2, "MathTS"], [3, "SubnetCalculator"]]),
            (x) => `${x[1]} is great!`,
            ["IterToolsTS is great!", "MathTS is great!", "SubnetCalculator is great!"],
        ],
        [
            new Map([[0, 1], [1, 4], [2, 9], [3, 16], [4, 25]]),
            (x) => Math.sqrt(x[1]),
            [1, 2, 3, 4, 5],
        ],
        [
            new Map([['a', 1], ['b', -2], ['c', 3], ['d', -4], ['e', 5]]),
            (x) => Math.abs(x[1]),
            [1, 2, 3, 4, 5],
        ],
        [
            new Map([['one', 'one'], ['Two', 'Two'], ['ThReE', 'ThReE'], ['FOUR', 'FOUR']]),
            (x) => x[1].toUpperCase(),
            ['ONE', 'TWO', 'THREE', 'FOUR'],
        ],
    ];
}
