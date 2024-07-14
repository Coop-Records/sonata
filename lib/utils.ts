import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { REFFERAL_ADDRESS } from './consts';

dayjs.extend(relativeTime);

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
export const formatBigInt = (balance: bigint | string): string => {
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

export function findCollectibleUrlInCastEmbeds(embeds: string[]) {
  try {
    for (const embed of embeds) {
      const { url }: { url: string } = JSON.parse(embed);
      const link = new URL(url);

      if (url.includes('sound.xyz')) {
        link.searchParams.set('referral', REFFERAL_ADDRESS);
        return link.toString();
      }
      if (url.includes('zora.co')) {
        link.searchParams.set('referrer', REFFERAL_ADDRESS);
        return link.toString();
      }
    }
  } catch { return; }
}