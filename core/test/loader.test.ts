import path from 'path';
import { loadConf } from "../src/loader/js";

const tsPath = path.resolve(__dirname, '../../config-example/ext-ts/.autoconfrc.ts');

test('loadConf test case', async () => {
  // @ts-ignore
  expect(loadConf()).resolves.toEqual({});
  const result = await loadConf<any>(tsPath);
  expect(result.projectName).toEqual('ext-ts');
  expect(result.default('good')).toEqual('good123');
});

test('loadConf option=jiti=false test case', async () => {
  const result = await loadConf<any>(tsPath, { jiti: false });
  expect(result.projectName).toEqual('ext-ts');
  expect(result.default('good')).toEqual('good123');
});
