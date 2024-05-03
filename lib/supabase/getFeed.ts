'use server';
import { SupabasePost } from '@/types/SupabasePost';
import supabase from './client';
import { FeedFilter } from '@/types/Feed';

type getFeedOptions = {
  recent?: boolean;
  start: number;
  filter?: FeedFilter;
};

export default async function getFeed({ recent, start, filter }: getFeedOptions) {
  const query = supabase.from('posts').select('*').not('likes', 'is', null);

  if (filter?.platform) {
    query.eq('platform', filter.platform);
  }

  if (filter?.channel) {
    query.like('parent_url', `%${filter.channel}%`);
  }

  if (recent) {
    query.order('created_at', { ascending: false });
  } else {
    query.order('likes', { ascending: false });
  }

  query.range(start, start + 20);

  const { data: posts } = await query.returns<SupabasePost[]>();
  return posts || [];
}
