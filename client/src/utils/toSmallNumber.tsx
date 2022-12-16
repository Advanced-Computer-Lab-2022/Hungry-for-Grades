export default function toSmallNumber(number: number) {
  if (typeof number !== 'number') number = parseInt(number);

  if (number > 1000000000) {
    return `${(number / 1000000000).toFixed(1)}B`;
  }
  if (number > 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  }
  if (number > 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  }
  if (number > 999) {
    return '999+';
  }
  if (number < 10) {
    return `${number}`;
  }
  return `${number}`;
}
