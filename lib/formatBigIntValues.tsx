type ConvertBigInt<T> = T extends bigint
  ? string
  : T extends Array<infer U>
    ? Array<ConvertBigInt<U>>
    : T extends object
      ? { [K in keyof T]: ConvertBigInt<T[K]> }
      : T;

function formatBigIntValues<T>(input: T): ConvertBigInt<T> {
  if (typeof input === 'bigint') {
    return input.toString() as ConvertBigInt<T>;
  } else if (Array.isArray(input)) {
    return input.map(formatBigIntValues) as ConvertBigInt<T>;
  } else if (typeof input === 'object' && input !== null) {
    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => [key, formatBigIntValues(value)]),
    ) as ConvertBigInt<T>;
  }
  return input as ConvertBigInt<T>;
}

export default formatBigIntValues;
