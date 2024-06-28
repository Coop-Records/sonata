import { getLatestTips } from '@/lib/getLatestTips';

export async function GET(): Promise<Response> {
  return getLatestTips();
}
