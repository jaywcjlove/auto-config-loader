Auto Config Loader
===

[![CI](https://github.com/jaywcjlove/auto-config-loader/actions/workflows/main.yml/badge.svg)](https://github.com/jaywcjlove/auto-config-loader/actions/workflows/main.yml)
[![NPM version](https://img.shields.io/npm/v/auto-config-loader.svg?style=flat&label=auto-config-loader)](https://npmjs.org/package/auto-config-loader)
[![Coverage Status](https://jaywcjlove.github.io/auto-config-loader/badges.svg)](https://jaywcjlove.github.io/auto-config-loader/lcov-report/)

Search and load the program's configuration. It has smart defaults based on traditional expectations in the JavaScript ecosystem. But it's also flexible enough to search anywhere you want and load whatever you want.

## Install

```bash
$ npm i auto-config-loader
```

## Quick start

```js
import load from 'auto-config-loader';

const data = load('namespace', {
  defaults: {
    testItem2: 'some value'
  }
});
```

## Load JS

Load the JS file and return the result

```js
// => app.config.js
export default {
  name: 'app'
}
```

```ts
import { loadConf } from 'auto-config-loader/load-conf';

interface Config {
  name: string;
}

const result = loadConf<Config>('./app/app.config.js');
// => { name: 'app' }
```

## Option

```ts
export type Loader<T> = Record<string, (filepath: string, content: string) => T>;
export interface AutoConfOption<T> {
  searchPlaces?: string[];
  loaders?: Loader<T>;
  defaluts?: T;
  cwd?: string;
}
export default function autoConf<T>(namespace?: string, option?: AutoConfOption<T>): T;
```

**Default `searchPlaces`:**

```js
[
  'package.json',
  `.${moduleName}rc`,
  `.${moduleName}rc.json`,
  `.${moduleName}rc.yaml`,
  `.${moduleName}rc.yml`,
  `.${moduleName}rc.toml`,
  `.${moduleName}rc.js`,
  `.${moduleName}rc.ts`,
  `.${moduleName}rc.cjs`,
  `.${moduleName}rc.mjs`,
  `.config/${moduleName}rc`,
  `.config/${moduleName}rc.json`,
  `.config/${moduleName}rc.yaml`,
  `.config/${moduleName}rc.yml`,
  `.config/${moduleName}rc.toml`,
  `.config/${moduleName}rc.js`,
  `.config/${moduleName}rc.ts`,
  `.config/${moduleName}rc.cjs`,
  `.config/${moduleName}rc.mjs`,
  `${moduleName}.config.js`,
  `${moduleName}.config.ts`,
  `${moduleName}.config.cjs`,
  `${moduleName}.config.mjs`,
]
```

Configurations are loaded sequentially, and the configuration file search is terminated when a configuration file exists.

## Yaml loader

This is an example, the default `yaml`/`yml` does not require a loader.

```js
import load from 'auto-config-loader';
import yaml from 'yaml';

function loadYaml(filepath, content) {
  return yaml.parse(content);
}

await load('namespace', {
  searchPlaces: [
    '.namespacerc.yaml',
    '.namespacerc.yml',
  ],
  loaders: {
    '.yaml': loadYaml,
    '.yml': loadYaml,
  },
  defaults: {
    testItem2: 'some value'
  }
});
```

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/jaywcjlove/auto-config-loader/graphs/contributors">
  <img src="https://jaywcjlove.github.io/auto-config-loader/CONTRIBUTORS.svg" />
</a>

Made with [contributors](https://github.com/jaywcjlove/github-action-contributors).


## License

This package is licensed under the MIT License.