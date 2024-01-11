export function uniqueBy<T, K>(array: T[], keyExtractor: (item: T) => K): T[] {
  const seen = new Set<K>();
  return array.filter(item => {
    const key = keyExtractor(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}
