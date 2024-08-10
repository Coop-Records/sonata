const formatBigIntValues = (input: any): any => {
  if (typeof input === 'bigint') {
    return input.toString();
  } else if (Array.isArray(input)) {
    return input.map(formatBigIntValues);
  } else if (typeof input === 'object' && input !== null) {
    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => [key, formatBigIntValues(value)]),
    );
  }
  return input;
};

export default formatBigIntValues;
