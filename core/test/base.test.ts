import path from 'path';
import autoConf from "../src";


test('Loader cwd = undefined', () => {
  const data = autoConf();
  expect(data).toBeUndefined();
});

test('Loader .autoconfrc', () => {
  const data = autoConf<{ one: number; }>(undefined, {
    cwd: path.resolve(__dirname, '../config-example'),
  });
  expect(data?.one).toBe(123);
});

test('Loader .autoconfrc.js', () => {
  const data = autoConf<{ projectName: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../config-example/js-cjs'),
  });
  expect(data?.projectName).toBe('js-cjs');
});

test('Loader pkg/package.json', () => {
  const data = autoConf<{ name: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../config-example/pkg'),
  });
  expect(data?.name).toBe('autoconf');
});