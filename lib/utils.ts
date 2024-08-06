import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  relativeTime: {
    past: '%s',
    s: 'a few seconds',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1month',
    MM: '%dmonths',
    y: '1 yr',
    yy: '%dyrs',
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(duration: number) {
  const durationSeconds = Math.floor(duration / 1000);
  const hours = Math.floor(durationSeconds / 3600);
  const minutes = Math.floor((durationSeconds % 3600) / 60);
  const seconds = Math.floor(durationSeconds % 60);

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export const formatBigInt = (balance?: bigint | string): string => {
  if (!balance) return '0';
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
    notation: 'compact',
  });
  return formatter.format(BigInt(balance));
};

export const isValidNumber = (value: string) => {
  return /^\d+$/.test(value);
};

export function timeFromNow(date: Date | string) {
  return dayjs(date).fromNow();
}
