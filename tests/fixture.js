"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMapFixture = exports.createIterableFixture = exports.createIteratorFixture = exports.createGeneratorFixture = void 0;
function* createGeneratorFixture(data) {
    for (const datum of data) {
        yield datum;
    }
}
exports.createGeneratorFixture = createGeneratorFixture;
function createIteratorFixture(data) {
    let nextIndex = 0;
    return {
        next() {
            if (nextIndex < data.length) {
                return { value: data[nextIndex++], done: false };
            }
            else {
                return { value: nextIndex, done: true };
            }
        },
    };
}
exports.createIteratorFixture = createIteratorFixture;
function createIterableFixture(data) {
    return {
        [Symbol.iterator]() {
            return createIteratorFixture(data);
        }
    };
}
exports.createIterableFixture = createIterableFixture;
function createMapFixture(data) {
    const result = new Map();
    for (let i = 0; i < data.length; ++i) {
        result.set(i, data[i]);
    }
    return result;
}
exports.createMapFixture = createMapFixture;
