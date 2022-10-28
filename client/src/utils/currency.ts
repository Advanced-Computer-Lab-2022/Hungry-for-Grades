export function formatCurrency(
  value: number | undefined,
  currency: string
): string {
  if (value === undefined) {
    return '';
  }
  return currency + ' ' + value.toFixed(2);
}
