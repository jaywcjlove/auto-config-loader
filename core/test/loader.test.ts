import path from 'path';
import { loadConf } from "../src/loader/jsloader";


test('loadConf test case', () => {
  // @ts-ignore
  expect(loadConf()).toEqual({});
});
