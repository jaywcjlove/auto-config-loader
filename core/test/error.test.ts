import path from 'path';
import autoConf from '../src';

test('loadConf test case', () => {
  console.log = jest.fn();
  const data = autoConf<{ one: number; }>(undefined, {
    cwd: path.resolve(__dirname, '../config-example/12312312'),
  });
  expect(data).toBeUndefined();
  // @ts-ignore
  expect(console.log.mock.calls[0][0]).toBe(`AUTO_CONF:ERROR: \x1b[31;1mCan't find config file\x1b[0m`);
});
