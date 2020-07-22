import { createContext } from "react";

import {favourite} from "../types"

const array: favourite[] = [];
const noop: () => void = () => {}
const add: (id: string, text: string) => void = (id: string, text: string) => {}
const remove: (id: string) => void = (id: string) => {}

export default createContext({
  favourites: array,
  add: add,
  clear: noop,
  remove: remove,
});
