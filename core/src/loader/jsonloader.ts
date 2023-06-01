export function jsonLoader<T>(_: string, content: string): T {
  return JSON.parse(content) as T;
}
