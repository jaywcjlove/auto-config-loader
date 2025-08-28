import path from 'path';
import autoConf from '../src';

test('loadConf test case', async () => {
  console.log = jest.fn();
  const data = await autoConf<{ one: number; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/12312312'),
  });
  expect(data).toEqual({});
  // @ts-ignore
  // expect(console.log.mock.calls[0][0]).toBe(`AUTO_CONF:ERROR: \x1b[31;1mCan't find config file\x1b[0m`);
});

test('loadConf error-config test case, wrong configuration loaded', async () => {
  console.log = jest.fn();
  const data = await autoConf<{ one: number; }>(undefined, {
    mustExist: true,
    cwd: path.resolve(__dirname, '../../config-example/error-config/mjs'),
  });
  expect(data).toBeUndefined();
  // @ts-ignore
  expect(console.log.mock.calls[0][0]).toBe(`AUTO_CONF:CATCH:ERROR: \x1b[31;1mReferenceError: path is not defined\x1b[0m`);
});

test('loadConf options mustExist=true test case', async () => {
  console.log = jest.fn();
  const data = await autoConf<{ one: number; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/12312312'),
    mustExist: true,
  });
  expect(data).toBeNull();
  // @ts-ignore
  expect(console.log.mock.calls).toHaveLength(0);
});


test('loadConf options mustExist=false test case', async () => {
  console.log = jest.fn();
  const data = await autoConf<{ one: number; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/12312312'),
    mustExist: false,
  });
  expect(data).toEqual({});
});
