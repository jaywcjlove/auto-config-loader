import yaml from 'yaml';

export function yamlLoader<T>(_: string, content: string): T {
  return yaml.parse(content);
}
