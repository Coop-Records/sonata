import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import getCastHash from '@/lib/neynar/getCastHash';
import { supabaseClient } from '@/lib/supabase/client';
import findValidEmbed from '@/lib/findValidEmbed';
import fetchMetadata from '@/lib/fetchMetadata';
import { CHANNELS } from './consts';

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

export async function getFullHash(username: string, hash: string) {
  return await getCastHash(`https://warpcast.com/${username}/${hash}`);
}

export function getHighestRank(validRanks: any[]) {
  return validRanks.length === 0 ? 0 : Math.min(...validRanks);
}

export async function getEmbedAndMetadata(fullHash: string) {
  const { data: cast } = await supabaseClient
    .from('posts')
    .select('*')
    .eq('post_hash', fullHash)
    .single();

  const embed = findValidEmbed(cast);
  const url: any = embed?.url;
  const metadata = await fetchMetadata(url, cast);
  return { cast, metadata };
}

export function getChannelData(channelId: any) {
  return CHANNELS.find((channel) => channel.value === channelId);
}

export function formatPoints(points: any) {
  return `${(points / 1000).toFixed(1)}K`;
}

export function urlSafeBase64Encode(obj: any) {
  const str = JSON.stringify(obj);
  const utf8Str = unescape(encodeURIComponent(str));
  const base64Str = btoa(utf8Str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return base64Str;
}
