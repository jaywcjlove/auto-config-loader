import path from 'path';
import autoConf from '../src';
import { autoConf as confLoad } from '../src';

test('Loader .autoconfrc', async () => {
  const data = await autoConf<{ one: number; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example'),
  });
  expect(data?.one).toBe(123);
});

test('Loader .autoconfrc', async () => {
  const data = await confLoad<{ one: number; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example'),
  });
  expect(data?.one).toBe(123);
});

test('Loader .autoconfrc.json', async () => {
  const data = await autoConf<{ name: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/autoconfrcjson'),
  });
  expect(data?.name).toBe('auto-conf');
});


test('Loader .autoconfrc.json', async () => {
  const data = await autoConf<{ projectName: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/ext-json'),
  });
  expect(data?.projectName).toBe('ext-json');
});

test('Loader .autoconfrc.json5', async () => {
  const data = await autoConf<any>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/ext-json5'),
  });
  expect(data?.projectName).toBe('ext-json');
  expect(data?.name).toBe('my-app');
  expect(data?.max).toBe(Infinity);
  expect(data?.min).toBe(-Infinity);
  expect(data?.notANumber).toBe(NaN);
});

test('Loader .config/autoconfrc.json5', async () => {
  const data = await autoConf<any>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/config-dir-json5'),
  });
  expect(data?.projectName).toBe('ext-json');
  expect(data?.name).toBe('my-app');
  expect(data?.max).toBe(Infinity);
  expect(data?.min).toBe(-Infinity);
  expect(data?.notANumber).toBe(NaN);
});

test('Loader .config/autoconfrc.jsonc', async () => {
  const data = await autoConf<any>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/config-dir-jsonc'),
  });
  expect(data?.projectName).toBe('ext-jsonc');
});

test('Loader .autoconfrc.jsonc', async () => {
  const data = await autoConf<{ projectName: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/ext-jsonc'),
  });
  expect(data?.projectName).toBe('ext-jsonc');
});

test('Loader .autoconfrc.js ESM', async () => {
  const data = await autoConf<{ projectName: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/js-esm'),
  });
  expect(data?.projectName).toBe('js-esm');
});

test('Loader .autoconfrc.mjs EXT ESM', async () => {
  const data = await autoConf<{ projectName: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/ext-mjs'),
  });
  expect(data?.projectName).toBe('ext-mjs');
});

test('Loader .autoconfrc.js CJS', async () => {
  const data = await autoConf<{ projectName: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/js-cjs'),
  });
  expect(data?.projectName).toBe('js-cjs');
});

test('Loader .autoconfrc.cjs EXT CJS', async () => {
  const data = await autoConf<{ projectName: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/js-cjs'),
  });
  expect(data?.projectName).toBe('js-cjs');
});

test('Loader .autoconfrc.ts TypeScript', async () => {
  const data = await autoConf<{ projectName: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/ext-cjs'),
  });
  expect(data?.projectName).toBe('ext-cjs');
});

test('Loader pkg/package.json', async () => {
  const data = await autoConf<{ name: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/pkg'),
  });
  expect(data?.name).toBe('autoconf');
});

test('Loader pkg-config/package.json', async () => {
  const data = await autoConf<{ projectName: string; test: { projectName: string; }; name: string; }>("autoconf", {
    mustExist: true,
    cwd: path.resolve(__dirname, '../../config-example/pkg-config'),
    default: { projectName: "test", test: { projectName: "~~~" }, name: "xx" },
  });
  expect(data?.projectName).toBe('test');
  expect(data?.test.projectName).toBe('~~~');
  expect(data?.name).toBe('autoconf');
});

test('Loader autoconf.config.js CJS', async () => {
  const data = await autoConf<{ projectName: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/ext-config-js'),
  });
  expect(data?.projectName).toBe('ext-config-js');
});

test('Loader autoconf.config.mjs', async () => {
  const data = await autoConf<{ projectName: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/ext-config-mjs'),
  });
  expect(data?.projectName).toBe('ext-config-mjs');
});

test('Loader autoconf.config.cjs', async () => {
  const data = await autoConf<{ projectName: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/ext-config-cjs'),
  });
  expect(data?.projectName).toBe('ext-config-cjs');
});

test('Loader autoconf.config.ts', async () => {
  const data = await autoConf<{ projectName: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/ext-config-ts'),
  });
  expect(data?.projectName).toBe('ext-config-ts');
});

test('Loader .config/autoconfrc', async () => {
  const data = await autoConf<{ one: number; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/config-dir-rc'),
  });
  expect(data?.one).toBe(123);
});

test('Loader .config/autoconfrc.json', async () => {
  const data = await autoConf<{ one?: number; projectName?: string; }>(undefined, {
    default: {
      projectName: 'name'
    },
    cwd: path.resolve(__dirname, '../../config-example/config-dir-rc'),
  });
  expect(data).toEqual({
    one: 123,
    projectName: 'name'
  });
});

test('Loader .config/autoconfrc.mjs', async () => {
  const data = await autoConf<{ one?: number; projectName?: string; }>(undefined, {
    default: {
      projectName: 'name'
    },
    cwd: path.resolve(__dirname, '../../config-example/config-dir-mjs'),
  });
  expect(data).toEqual({
    default: {
      projectName: 'ext-config-mjs'
    },
    projectName: 'ext-config-mjs'
  });
});

test('Loader .config/autoconfrc.cjs', async () => {
  const data = await autoConf<{ projectName?: string; }>(undefined, {
    default: {
      projectName: 'name'
    },
    cwd: path.resolve(__dirname, '../../config-example/config-dir-cjs'),
  });
  expect(data).toEqual({
    projectName: 'ext-config-cjs'
  });
});

test('Loader .config/autoconfrc.js', async () => {
  const data = await autoConf<{ one?: number; projectName?: string; }>(undefined, {
    default: {
      projectName: 'name'
    },
    cwd: path.resolve(__dirname, '../../config-example/config-dir-js'),
  });
  expect(data).toEqual({
    default: {
      projectName: 'ext-config-js'
    },
    projectName: 'ext-config-js'
  });
});

test('Loader .config/autoconfrc.ts', async () => {
  const data = await autoConf<{ one?: number; projectName?: string; }>(undefined, {
    default: {
      projectName: 'name'
    },
    cwd: path.resolve(__dirname, '../../config-example/config-dir-ts'),
  });
  expect(data).toEqual({
    default: {
      projectName: 'ext-config-ts'
    },
    projectName: 'ext-config-ts'
  });
});

test('Loader .autoconfrc.yaml', async () => {
  const data = await autoConf<{ one?: number; projectName?: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/ext-yaml'),
  });
  expect(data).toEqual({
    YAML: "YAML Ain't Markup Language™",
    'What It Is': 'YAML is a human-friendly data serialization language for all programming languages.'
  });
});

test('Loader .autoconfrc.yml', async () => {
  const data = await autoConf<{ one?: number; projectName?: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/ext-yml'),
  });
  expect(data).toEqual({
    YAML: "YAML Ain't Markup Language™",
    'What It Is': 'YAML is a human-friendly data serialization language for all programming languages.'
  });
});

test('Loader .config/autoconfrc.yml', async () => {
  const data = await autoConf<{ one?: number; projectName?: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/config-dir-yml'),
  });
  expect(data).toEqual({
    YAML: "YAML Ain't Markup Language™",
    'What It Is': 'YAML is a human-friendly data serialization language for all programming languages.'
  });
});

test('Loader .config/autoconfrc.yaml', async () => {
  const data = await autoConf<{ one?: number; projectName?: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/config-dir-yaml'),
  });
  expect(data).toEqual({
    YAML: "YAML Ain't Markup Language™",
    'What It Is': 'YAML is a human-friendly data serialization language for all programming languages.'
  });
});

const tomlData = {
  title: 'TOML 示例',
  owner: {
    name: "Tom Preston-Werner",
    dob: new Date('1979-05-27T07:32:00-08:00')
  },
  database: {
    enabled: true,
    ports: [ 8000, 8001, 8002 ],
    data: [ ["delta", "phi"], [3.14] ],
    temp_targets: { cpu: 79.5, case: 72.0 },
  },
  servers: {
    alpha: {
      ip: "10.0.0.1",
      role: "前端"
    },
    beta: {
      ip: "10.0.0.2",
      role: "后端"
    },
  }
}

test('Loader .autoconfrc.toml', async () => {
  const data = await autoConf<{ one?: number; projectName?: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/ext-toml'),
  });
  expect(data).toEqual(tomlData);
});

test('Loader .config/autoconfrc.toml', async () => {
  const data = await autoConf<{ one?: number; projectName?: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/config-dir-toml'),
  });
  expect(data).toEqual(tomlData);
});

test('Loader .autoconfrc.ts', async () => {
  const data = await autoConf<{ default?: Function; projectName?: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/ext-ts'),
  });
  expect(data).toHaveProperty(['default']);
  expect(data?.projectName).toEqual('ext-ts');
});

const iniData = {
  "database": {
    "database": "use_this_database",
    "password": "dbpassword",
    "user": "dbuser",
  },
  "paths": {
    "default": {
      "array": [
        "first value",
        "second value",
        "third value",
      ],
      "datadir": "/var/lib/data",
    },
  },
  "scope": "global",
}

test('Loader .autoconfrc.ini', async () => {
  const data = await autoConf<any>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/ext-ini'),
  });
  expect(data).toEqual(iniData);
});

test('Loader .config/autoconfrc.ini', async () => {
  const data = await autoConf<{ one?: number; projectName?: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/config-dir-ini'),
  });
  expect(data).toEqual(iniData);
});

test('Loader .autoconfrc.ts (option={ jiti: false })', async () => {
  const data = await autoConf<{ default?: Function; projectName?: string; }>(undefined, {
    cwd: path.resolve(__dirname, '../../config-example/ext-ts'),
    jsOption: {
      jiti: false,
    }
  });
  expect(data).toHaveProperty(['default']);
  expect(data?.projectName).toEqual('ext-ts');
});

test('Loader cwd = undefined', async () => {
  console.log = jest.fn();
  const data = await autoConf();
  expect(data).toBeUndefined();
  // @ts-ignore
  expect(console.log.mock.calls[0][0]).toBe(`AUTO_CONF:ERROR: \x1b[31;1mCan't find config file\x1b[0m`);
});

test('Loader ignoreLog = true', async () => {
  console.log = jest.fn();
  const data = await autoConf(undefined, { ignoreLog: true });
  expect(data).toBeNull();
  // @ts-ignore
  expect(console.log.mock.calls).toHaveLength(0);
});
