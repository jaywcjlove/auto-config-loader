import fs from 'fs';
import path from 'path';
import merge from 'lodash.merge';
import { jsLoader, LoadConfOption } from './loader/jsloader';
import { jsonLoader } from './loader/jsonloader';
import { yamlLoader } from './loader/yamlloader';
import { tomlLoader } from './loader/tomlloader';
import { findConfigFile } from './utils';

export * from './loader/jsloader';
export * from './loader/jsonloader';
export * from './loader/yamlloader';
export * from './loader/tomlloader';

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
}

export default function autoConf<T>(namespace: string = 'autoconf', option: AutoConfOption<T> = {}) {
  const { searchPlaces = [], defaluts = {}, cwd = process.cwd(), jsOption } = option;
  const loaders: Loader<T> = {
    '.json': jsonLoader,
    '.yml': yamlLoader,
    '.yaml': yamlLoader,
    '.toml': tomlLoader,
    '.js': jsLoader,
    '.ts': jsLoader,
    '.cjs': jsLoader,
    '.mjs': jsLoader,
    ...(option.loaders || {}),
  };
  const pkgPath = path.resolve(cwd, 'package.json');
  const currentSearchPlaces = findConfigFile(namespace, cwd, searchPlaces);
  let content = '';
  let resultData: T;
  let loaderFunc: LoaderFunc<T>;
  try {
    if (currentSearchPlaces) {
      const extname = path.extname(currentSearchPlaces);
      const basename = path.basename(currentSearchPlaces);
      if (new RegExp(`^(.?${namespace}rc)$`).test(basename)) {
        content = fs.readFileSync(currentSearchPlaces, 'utf-8');
        loaderFunc = loaders['.json'];
      } else if (loaders[extname]) {
        content = fs.readFileSync(currentSearchPlaces, 'utf-8');
        loaderFunc = loaders[extname];
      }
    } else if (fs.existsSync(pkgPath)) {
      content = fs.readFileSync(pkgPath, 'utf-8');
      const result = loaders['.json'](currentSearchPlaces, content);
      resultData = (result as Record<string, T>)[namespace];
    }

    if (content && loaderFunc) {
      resultData = loaderFunc(currentSearchPlaces, content, jsOption);
      if (typeof resultData === 'function') {
        return merge(defaluts, resultData, { default: resultData });
      }
    }
    if (resultData) {
      return merge(defaluts, resultData);
    }
    throw new Error(`Can't find config file`);
  } catch (error) {
    console.log(`AUTO_CONF:ERROR: \x1b[31;1m${error.message}\x1b[0m`);
  }
}
