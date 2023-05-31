Auto Conf
===

Search and load the program's configuration. It has smart defaults based on traditional expectations in the JavaScript ecosystem. But it's also flexible enough to search anywhere you want and load whatever you want.

## Install

```bash
$ npm i auto-conf
```

## Quick start

```js
import load from 'auto-conf';

const data = load('namespace', {
  defaults: {
    testItem2: 'some value'
  }
});
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
  `.${moduleName}rc.js`,
  `.${moduleName}rc.ts`,
  `.${moduleName}rc.cjs`,
  `.config/${moduleName}rc`,
  `.config/${moduleName}rc.json`,
  `.config/${moduleName}rc.yaml`,
  `.config/${moduleName}rc.yml`,
  `.config/${moduleName}rc.js`,
  `.config/${moduleName}rc.jts`,
  `.config/${moduleName}rc.cjs`,
  `${moduleName}.config.js`,
  `${moduleName}.config.ts`,
  `${moduleName}.config.cjs`,
]
```

## Yaml loader

This is an example, the default `yaml`/`yml` does not require a loader.

```js
import load from 'auto-conf';
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

<a href="https://github.com/jaywcjlove/auto-conf/graphs/contributors">
  <img src="https://jaywcjlove.github.io/auto-conf/CONTRIBUTORS.svg" />
</a>

Made with [contributors](https://github.com/jaywcjlove/github-action-contributors).


## License

This package is licensed under the MIT License.