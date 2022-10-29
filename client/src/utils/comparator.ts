function customComparator<T>(prevProps: T, nextProps: T) {
  return JSON.stringify(nextProps) === JSON.stringify(prevProps);
}

export { customComparator };
