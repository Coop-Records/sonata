export default function formatNumber(num: number | string) {
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1
  });

  return formatter.format(typeof num == 'string' ? Number(num) : num);
}
