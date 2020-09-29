export function uniq<T>(arr: T[]): T[] {
  return arr.filter((x, i, a) => x && a.indexOf(x) === i);
}
