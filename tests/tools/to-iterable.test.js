"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("../../src/tools");
const fixture_1 = require("../fixture");
const exceptions_1 = require("../../src/exceptions");
describe.each(dataProviderForSuccess())("Tools To Iterable Test Success", (input, expected) => {
    it("", () => {
        // Given
        const iterable = (0, tools_1.toIterable)(input);
        const result = [];
        // When
        for (const item of iterable) {
            result.push(item);
        }
        // Then
        expect((0, tools_1.isIterable)(iterable)).toBeTruthy();
        expect(result).toEqual(expected);
    });
});
function dataProviderForSuccess() {
    return [
        [
            '',
            [],
        ],
        [
            '123',
            ['1', '2', '3'],
        ],
        [
            [],
            [],
        ],
        [
            [1, 2, 3],
            [1, 2, 3],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([]),
            [],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([1]),
            [1],
        ],
        [
            (0, fixture_1.createGeneratorFixture)([1, 2, 3]),
            [1, 2, 3],
        ],
        [
            (0, fixture_1.createIterableFixture)([]),
            [],
        ],
        [
            (0, fixture_1.createIterableFixture)([1]),
            [1],
        ],
        [
            (0, fixture_1.createIterableFixture)([1, 2, 3]),
            [1, 2, 3],
        ],
        [
            new Set(),
            [],
        ],
        [
            new Set([1]),
            [1],
        ],
        [
            new Set([1, 2, 3]),
            [1, 2, 3],
        ],
        [
            new Map(),
            [],
        ],
        [
            new Map([['a', 1]]),
            [['a', 1]],
        ],
        [
            new Map([['a', 1], ['b', 2], ['c', 3]]),
            [['a', 1], ['b', 2], ['c', 3]],
        ],
    ];
}
describe.each(dataProviderForError())("Tools To Iterable Test Error", (input) => {
    it("", () => {
        expect(() => {
            (0, tools_1.toIterable)(input);
        }).toThrow(exceptions_1.InvalidArgumentError);
    });
});
function dataProviderForError() {
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
        [{ a: 1 }],
    ];
}
