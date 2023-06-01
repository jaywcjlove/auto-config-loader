import fs from 'fs';
import path from 'path';
import merge from 'lodash.merge';
import { importDefault } from './loader/jsloader';
import { jsonLoader } from './loader/jsonloader';
import { yamlLoader } from './loader/yamlloader';
import { tomlLoader } from './loader/tomlloader';
import { findConfigFile } from './utils';

export * from './loader/jsloader';
export type Loader<T> = Record<string, (filepath: string, content: string) => T>;
export interface AutoConfOption<T> {
  searchPlaces?: string[];
  loaders?: Loader<T>;
  defaluts?: T;
  cwd?: string;
}

export default function autoConf<T>(namespace: string = 'autoconf', option: AutoConfOption<T> = {}) {
  const { searchPlaces = [], defaluts = {}, cwd = process.cwd() } = option;
  const loaders: Loader<T> = {
    '.json': jsonLoader,
    '.yml': yamlLoader,
    '.yaml': yamlLoader,
    '.toml': tomlLoader,
    '.js': importDefault,
    '.ts': importDefault,
    '.cjs': importDefault,
    '.mjs': importDefault,
    ...(option.loaders || {}),
  };
  const pkgPath = path.resolve(cwd, 'package.json');
  const currentSearchPlaces = findConfigFile(namespace, cwd, searchPlaces);
  let content = '';
  let resultData: T;
  let loaderFunc: (filepath: string, content: string) => T;
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
      resultData = loaderFunc(currentSearchPlaces, content);
    }
    if (resultData) {
      return merge(defaluts, resultData);
    }
    throw new Error(`Can't find config file`);
  } catch (error) {
    console.log(`AUTO_CONF:ERROR: \x1b[31;1m${error.message}\x1b[0m`);
  }
}
