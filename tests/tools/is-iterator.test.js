"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("../../src/tools");
const fixture_1 = require("../fixture");
describe.each(dataProviderForTrue())("Tools Is Iterator Test True", (input) => {
    it("", () => {
        expect((0, tools_1.isIterator)(input)).toBeTruthy();
    });
});
function dataProviderForTrue() {
    return [
        [(0, fixture_1.createIteratorFixture)([])],
        [(0, fixture_1.createIteratorFixture)([1])],
        [(0, fixture_1.createIteratorFixture)([1, 2, 3])],
    ];
}
describe.each(dataProviderForFalse())("Tools Is Iterator Test False", (input) => {
    it("", () => {
        expect((0, tools_1.isIterator)(input)).toBeFalsy();
    });
});
function dataProviderForFalse() {
    return [
        [1],
        [1.0],
        [undefined],
        [null],
        [NaN],
        [{}],
        [''],
        ['123'],
        [[]],
        [[1, 2, 3]],
        [new Set()],
        [new Set([1])],
        [new Set([1, 2, 3])],
        [new Map()],
        [new Map([['a', 1]])],
        [new Map([['a', 1], ['b', 2], ['c', 3]])],
        [(0, fixture_1.createGeneratorFixture)([])],
        [(0, fixture_1.createGeneratorFixture)([1])],
        [(0, fixture_1.createGeneratorFixture)([1, 2, 3])],
        [(0, fixture_1.createIterableFixture)([])],
        [(0, fixture_1.createIterableFixture)([1])],
        [(0, fixture_1.createIterableFixture)([1, 2, 3])],
    ];
}
