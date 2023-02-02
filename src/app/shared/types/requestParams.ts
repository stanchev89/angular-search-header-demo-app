import {IPaginationState} from "../interfaces/paginationState";
import {BaseObj} from "./baseObj";

export type RequestParams<T extends BaseObj> = Partial<T> & IPaginationState
