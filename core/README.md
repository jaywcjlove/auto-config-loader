Auto Config Loader
===

[![CI](https://github.com/jaywcjlove/auto-config-loader/actions/workflows/main.yml/badge.svg)](https://github.com/jaywcjlove/auto-config-loader/actions/workflows/main.yml)
[![NPM version](https://img.shields.io/npm/v/auto-config-loader.svg?style=flat&label=auto-config-loader)](https://npmjs.org/package/auto-config-loader)
[![Coverage Status](https://jaywcjlove.github.io/auto-config-loader/badges.svg)](https://jaywcjlove.github.io/auto-config-loader/lcov-report/)

Find and load configuration from a `package.json` property, `rc` file, or `CommonJS` module. It has smart default based on traditional expectations in the JavaScript ecosystem. But it's also flexible enough to search anywhere you want and load whatever you want.

## Features

- Support [JSON](https://www.json.org), [JSONC](https://github.com/microsoft/node-jsonc-parser), [JSON5](https://json5.org/), [YAML](https://yaml.org/), [TOML](https://toml.io), [INI](https://en.wikipedia.org/wiki/INI_file), [CJS](http://www.commonjs.org), [Typescript](https://www.typescriptlang.org/), and ESM config load.
- Reads config from the nearest `package.json` file

## Install

```bash
$ npm i auto-config-loader
```

## Quick start

```js
import load from 'auto-config-loader';

// will look for:
// process.cwd() + '.namespacerc'
// process.cwd() + '.namespacerc.js'
// process.cwd() + '.namespacerc.ts'
// process.cwd() + '.namespacerc.mjs'
// process.cwd() + '.namespacerc.cjs'
// process.cwd() + '.namespacerc.json'
// process.cwd() + '.namespacerc.json5'
// process.cwd() + '.namespacerc.jsonc'
// process.cwd() + '.namespacerc.yaml'
// process.cwd() + '.namespacerc.yml'
// process.cwd() + '.namespacerc.toml'
// process.cwd() + 'namespace.config.mjs'
// process.cwd() + 'namespace.config.cjs'
// process.cwd() + 'namespace.config.js'
// ........
const data = load('namespace', {
  default: {
    testItem2: 'some value'
  }
});
```

## Load JS

Load the JS file and return the result, support `.js`, `.cjs`, `.mjs`, `.ts`.

```js
// => ./app/app.config.js
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
import { LoadConfOption } from 'auto-config-loader';
export type LoaderFunc<T> = (filepath: string, content: string, jsOption?: LoadConfOption) => T;
export type Loader<T> = Record<string, LoaderFunc<T>>;
export interface AutoConfOption<T> {
  searchPlaces?: string[];
  /** An object that maps extensions to the loader functions responsible for loading and parsing files with those extensions. */
  loaders?: Loader<T>;
  /** Specify default configuration. It has the lowest priority and is applied after extending config. */
  defaluts?: T;
  /** Resolve configuration from this working directory. The default is `process.cwd()` */
  cwd?: string;
  /** Default transform js configuration */
  jsOption?: LoadConfOption;
  ignoreLog?: boolean;
}
/**
 * Find and load configuration from a `package.json` property, `rc` file, or `CommonJS` module.
 * @param namespace {string} Configuration base name. The default is `autoconf`.
 * @param option 
 */
export default function autoConf<T>(namespace?: string, option?: AutoConfOption<T>): {} & T;
```

Discover configurations in the specified directory order. When configuring a tool, you can use multiple file formats and put these in multiple places. Usually, a tool would mention this in its own README file, but by default, these are the following places, where `${moduleName}` represents the name of the tool:

**Default `searchPlaces`:**

```js
[
  'package.json',
  `.${moduleName}rc`,
  `.${moduleName}rc.json`,
  `.${moduleName}rc.json5`,
  `.${moduleName}rc.jsonc`,
  `.${moduleName}rc.yaml`,
  `.${moduleName}rc.yml`,
  `.${moduleName}rc.toml`,
  `.${moduleName}rc.ini`,
  `.${moduleName}rc.js`,
  `.${moduleName}rc.ts`,
  `.${moduleName}rc.cjs`,
  `.${moduleName}rc.mjs`,
  `.config/${moduleName}rc`,
  `.config/${moduleName}rc.json`,
  `.config/${moduleName}rc.json5`,
  `.config/${moduleName}rc.jsonc`,
  `.config/${moduleName}rc.yaml`,
  `.config/${moduleName}rc.yml`,
  `.config/${moduleName}rc.toml`,
  `.config/${moduleName}rc.ini`,
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


The content of these files is defined by the tool. For example, you can add a `semi` configuration value to `false` using a file called `.config/autoconfig.yml`:

```yml
semi: true
```

Additionally, you have the option to put a property named after the tool in your `package.json` file, with the contents of that property being the same as the file contents. To use the same example as above:

```js
{
  "name": "your-project",
  "autoconfig": {
    "semi": true
  }
}
```

This has the advantage that you can put the configuration of all tools (at least the ones that use `auto-config-loader`) in one file.

## loader

Modify default `.js`,`.ts`,`.cjs`,`.mjs` loader parameters.

```js
import load, { jsLoader } from 'auto-config-loader';

function loadJS(filepath, content) {
  return jsLoader(filepath, content, {
    // change option...
  });
}

const data = load('namespace', {
  loaders: {
    '.js': loadJS,
    '.ts': loadJS,
    '.cjs': loadJS,
    '.mjs': loadJS,
  },
  default: {
    testItem2: 'some value'
  }
});
```

## Yaml loader

This is an example, the default `yaml`/`yml` does not require a loader.

```js
import load from 'auto-config-loader';
import yaml from 'yaml';

function loadYaml(filepath, content) {
  return yaml.parse(content);
}

const data = load('namespace', {
  searchPlaces: [
    '.namespacerc.yaml',
    '.namespacerc.yml',
  ],
  loaders: {
    '.yaml': loadYaml,
    '.yml': loadYaml,
  },
  default: {
    testItem2: 'some value'
  }
});
```

## Related

- [cosmiconfig](https://github.com/cosmiconfig/cosmiconfig) Find and load configuration from a package.json property, rc file, or CommonJS module
- [cjson](https://www.npmjs.com/package/cjson) Comments enabled json loader (Commented JavaScript Object Notation)
- [Config Loader](https://www.npmjs.com/package/@web/config-loader) Load user config files for node js projects.
- [Lilconfig](https://www.npmjs.com/package/lilconfig) Zero-dependency nodejs config seeker.
- [proload](https://github.com/natemoo-re/proload) Searches for and loads your tool's JavaScript configuration files with full support for CJS, ESM, TypeScript and more.
- [rc](https://github.com/dominictarr/rc) The non-configurable configuration loader for lazy people.

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/jaywcjlove/auto-config-loader/graphs/contributors">
  <img src="https://jaywcjlove.github.io/auto-config-loader/CONTRIBUTORS.svg" />
</a>

Made with [contributors](https://github.com/jaywcjlove/github-action-contributors).


## License

This package is licensed under the MIT License.