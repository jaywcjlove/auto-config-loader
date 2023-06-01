import path from 'path';
import autoConf from "../src";

test('Loader cwd = undefined', () => {
  console.log = jest.fn();
  const data = autoConf();
  expect(data).toBeUndefined();
  // @ts-ignore
  expect(console.log.mock.calls[0][0]).toBe(`AUTO_CONF:ERROR: \x1b[31;1mCan't find config file\x1b[0m`);
});

test('Loader .autoconfrc', () => {
  const data = autoConf<{ one: number; }>(undefined, {
    cwd: path.resolve(__dirname, '../config-example'),
  });
  expect(data?.one).toBe(123);
});

test('Loader .autoconfrc.json', () => {
  const data = autoConf<{ name: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../config-example/autoconfrcjson'),
  });
  expect(data?.name).toBe('auto-conf');
});

test('Loader .autoconfrc.js ESM', () => {
  const data = autoConf<{ projectName: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../config-example/js-esm'),
  });
  expect(data?.projectName).toBe('js-esm');
});

test('Loader .autoconfrc.mjs EXT ESM', () => {
  const data = autoConf<{ projectName: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../config-example/ext-mjs'),
  });
  expect(data?.projectName).toBe('ext-mjs');
});

test('Loader .autoconfrc.js CJS', () => {
  const data = autoConf<{ projectName: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../config-example/js-cjs'),
  });
  expect(data?.projectName).toBe('js-cjs');
});

test('Loader .autoconfrc.cjs EXT CJS', () => {
  const data = autoConf<{ projectName: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../config-example/js-cjs'),
  });
  expect(data?.projectName).toBe('js-cjs');
});

test('Loader .autoconfrc.ts TypeScript', () => {
  const data = autoConf<{ projectName: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../config-example/ext-cjs'),
  });
  expect(data?.projectName).toBe('ext-cjs');
});

test('Loader pkg/package.json', () => {
  const data = autoConf<{ name: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../config-example/pkg'),
  });
  expect(data?.name).toBe('autoconf');
});


test('Loader autoconf.config.js CJS', () => {
  const data = autoConf<{ projectName: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../config-example/ext-config-js'),
  });
  expect(data?.projectName).toBe('ext-config-js');
});

test('Loader autoconf.config.mjs', () => {
  const data = autoConf<{ projectName: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../config-example/ext-config-mjs'),
  });
  expect(data?.projectName).toBe('ext-config-mjs');
});

test('Loader autoconf.config.cjs', () => {
  const data = autoConf<{ projectName: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../config-example/ext-config-cjs'),
  });
  expect(data?.projectName).toBe('ext-config-cjs');
});

test('Loader autoconf.config.ts', () => {
  const data = autoConf<{ projectName: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../config-example/ext-config-ts'),
  });
  expect(data?.projectName).toBe('ext-config-ts');
});

test('Loader .config/autoconfrc', () => {
  const data = autoConf<{ one: number; }>(undefined, {
    cwd: path.resolve(__dirname, '../config-example/config-dir-rc'),
  });
  expect(data?.one).toBe(123);
});

test('Loader .config/autoconfrc.json', () => {
  const data = autoConf<{ one?: number; projectName?: string; }>(undefined, {
    defaluts: {
      projectName: 'name'
    },
    cwd: path.resolve(__dirname, '../config-example/config-dir-rc'),
  });
  expect(data).toEqual({
    one: 123,
    projectName: 'name'
  });
});

test('Loader .config/autoconfrc.mjs', () => {
  const data = autoConf<{ one?: number; projectName?: string; }>(undefined, {
    defaluts: {
      projectName: 'name'
    },
    cwd: path.resolve(__dirname, '../config-example/config-dir-mjs'),
  });
  expect(data).toEqual({
    projectName: 'ext-config-mjs'
  });
});
