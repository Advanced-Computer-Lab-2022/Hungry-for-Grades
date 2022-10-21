export function formatCurrency(value: number | undefined): string {
  if (value === undefined) {
    return '';
  }
  return 'CAD$ ' + value.toFixed(2);
}
