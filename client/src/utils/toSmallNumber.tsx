export default function toSmallNumber(number: number) {
  if (number > 1000000000) {
    return `${(number / 1000000000).toFixed(1)}B`;
  } else if (number > 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  } else if (number > 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  }
  if (number > 999) {
    return '999+';
  }
  if (number < 10) {
    return `${number}`;
  }
  return number;
}
