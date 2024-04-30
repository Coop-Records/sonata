import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(duration: number) {
  const durationSeconds = Math.floor(duration / 1000);
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = Math.floor(durationSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export const formatBigInt = (balance: bigint | string): string => {
  // Create an instance of Intl.NumberFormat for 'en-US' locale to ensure comma separators
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0, // Ensure no fractional part is shown
  });
  return formatter.format(BigInt(balance)); // Convert and format
};
