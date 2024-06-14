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
export function pickUp<T>(obj: T) {
  const result = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (value !== null && value !== undefined && value !== '') {
        result[key] = value;
      }
    }
  }
  return result;
}
