import fs from 'fs';
import path from 'path';
import { importDefault } from './loader/jsloader';
import { findConfigFile } from './utils';

export type Loader<T> = Record<string, (filepath: string, content: string) => T>;
export interface AutoConfOption<T> {
  searchPlaces?: string[];
  loaders?: Loader<T>;
  defaluts?: T;
  cwd?: string;
}

export default function autoConf<T>(namespace: string = 'autoconf', option: AutoConfOption<T> = {}) {
  const { searchPlaces = [], cwd = process.cwd() } = option;
  const loaders: Loader<T> = {
    ...(option.loaders || {}),
    '.json': (_, content: string) => JSON.parse(content) as T,
    '.js': importDefault,
    '.cjs': importDefault,
    '.mjs': importDefault,
  };
  const pkgPath = path.resolve(cwd, 'package.json');
  const currentSearchPlaces = findConfigFile(namespace, cwd, searchPlaces);
  let content = '';
  let loaderFunc: (filepath: string, content: string) => T;
  try {
    if (currentSearchPlaces) {
      const extname = path.extname(currentSearchPlaces);
      if (currentSearchPlaces.endsWith(`.${namespace}rc`) || currentSearchPlaces.endsWith('.json')) {
        content = fs.readFileSync(currentSearchPlaces, 'utf-8');
        loaderFunc = loaders['.json'];
      } else if (loaders[extname]) {
        content = fs.readFileSync(currentSearchPlaces, 'utf-8');
        loaderFunc = loaders[extname];
      }
    } else if (fs.existsSync(pkgPath)) {
      content = fs.readFileSync(pkgPath, 'utf-8');
      loaderFunc = loaders['.json'];
      const result = loaderFunc(currentSearchPlaces, content);
      return (result as Record<string, T>)[namespace];
    }
    return loaderFunc(currentSearchPlaces, content);
  } catch (error) {
    console.log(`AUTO_CONF:ERROR: \x1b[31;1m${error}\x1b[0m`);
  }
}
