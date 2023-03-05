import {
  map,
  flatMap,
  repeat,
  filter,
  FlatMapper,
} from "./single";

import {
  chain,
  zip,
  zipLongest,
  zipEqual,
} from "./multi";

import {
  distinct,
} from "./set"

import {
  Stream,
} from "./stream";

import {
  toIterable,
  toIterator,
  isIterable,
  isIterator,
} from "./tools";

import {
  InvalidArgumentError,
  LengthError,
} from "./exceptions";

import {
	reduceFunc
} from "./reduce";

export const single = {
  map,
  flatMap,
  repeat,
  filter,
}

export const multi = {
  chain,
  zip,
  zipLongest,
  zipEqual,
}

export const set = {
  distinct,
}

export {
  Stream
}

export const tools = {
  toIterable,
  toIterator,
  isIterable,
  isIterator,
}

export type {
  FlatMapper,
}

export {
  InvalidArgumentError,
  LengthError,
}

export const reduce = {
	reduceFunc
}