import { isArray } from "util";

export function makeArrayOf(values: any): any[]{
    return isArray(values) ? [...values] : [values]
}