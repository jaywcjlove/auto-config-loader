import { merge } from "../src";

test('merge test case', () => {
  expect(merge({ a: 1}, { b: 2, a: 3})).toEqual({ a: 3, b: 2});
});
