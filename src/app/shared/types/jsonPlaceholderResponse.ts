import {BaseObj} from "./baseObj";

export type JsonPlaceholderResponse<T extends BaseObj & { id: number }> = {
  headers: {
    get: (arg: 'x-total-count') => string
  }
  body: T[],
}
