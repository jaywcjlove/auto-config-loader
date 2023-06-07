import path from 'path';
import { merge, autoConf, getConfigPath } from "../src";

test('merge test case', () => {
  expect(merge({ a: 1}, { b: 2, a: 3})).toEqual({ a: 3, b: 2});
});

test('getConfigPath test case', () => {
  const data = autoConf<{ projectName: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/ext-json'),
  });
  expect(data?.projectName).toBe('ext-json');
  expect(getConfigPath().endsWith('.autoconfrc.json')).toBeTruthy();
});