import path from 'path';
import fs from 'fs';

export function findConfigFile(moduleName: string, root: string, searchPlaces: string[] = []) {
  const data = [
    ...searchPlaces,
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
    `.config/${moduleName}rc.ts`,
    `.config/${moduleName}rc.cjs`,
    `${moduleName}.config.js`,
    `${moduleName}.config.ts`,
    `${moduleName}.config.cjs`,
  ];
  for (const file of data) {
    const filePath = path.resolve(root, file);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }

  return null;
}
