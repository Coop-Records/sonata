import { SupabasePost } from '@/types/SupabasePost';
import { supabaseClient } from './client';

export default async function getCastByHash(hash: string) {
  const { data, error } = await supabaseClient
    .from('posts')
    .select('*')
    .like('post_hash', `${hash}%`)
    .single<SupabasePost>();

  if (error) console.error('Error fetching cast:', error);
  return data;
}
