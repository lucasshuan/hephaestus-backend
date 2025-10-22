export function enumToPgEnum<T extends Record<string, string>>(
  myEnum: T,
): readonly [T[keyof T], ...T[keyof T][]] {
  const values = Object.values(myEnum) as T[keyof T][];
  return values as [T[keyof T], ...T[keyof T][]];
}
