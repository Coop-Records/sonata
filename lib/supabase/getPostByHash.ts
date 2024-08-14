import { SupabasePost } from '@/types/SupabasePost';
import { supabaseClient } from './client';

export default async function getPostByHash(hash: string) {
  const { data, error } = await supabaseClient
    .from('posts')
    .select('*')
    .like('post_hash', `${hash}%`)
    .single<SupabasePost>();

  if (error || !data) {
    console.error('Error fetching cast:', error);
    throw new Error('Cast not found');
  }
  return data;
}
