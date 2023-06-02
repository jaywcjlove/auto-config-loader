import path from 'path';
import { loadConf } from "../src/loader/js";

const tsPath = path.resolve(__dirname, '../config-example/ext-ts/.autoconfrc.ts');

test('loadConf test case', () => {
  // @ts-ignore
  expect(loadConf()).toEqual({});
  const result = loadConf<any>(tsPath);
  expect(result.projectName).toEqual('ext-ts');
  expect(result('good')).toEqual('good123');
});

test('loadConf test case', () => {
  const result = loadConf<any>(tsPath, { jiti: false });
  expect(result.projectName).toBeUndefined();
  expect(result('good')).toEqual('good123');
});
