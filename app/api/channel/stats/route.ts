import { supabaseClient as supabase } from "@/lib/supabase/client";

interface Post { channelId: string; post_hash: string; authorFid: number };

type ChannelAccumulator = Record<string, {
  uniqueAuthors: Set<number>;
  uniquePosts: Set<string>;
}>;

export async function GET() {
  const limit = 1000;
  let offset = 0;
  const entries = {} as ChannelAccumulator;

  do {
    const { data: posts, error } = await supabase
      .from('posts')
      .select('channelId, post_hash, authorFid')
      .neq('channelId', null)
      .range(offset, offset + limit - 1);

    if (error) return Response.json(error ?? { message: 'Failed' }, { status: 400 });

    posts.forEach(({ channelId, ...post }: Post) => {
      if (!entries[channelId]) {
        entries[channelId] = { uniquePosts: new Set, uniqueAuthors: new Set };
      }
      entries[channelId].uniqueAuthors.add(post.authorFid);
      entries[channelId].uniquePosts.add(post.post_hash);
    });

    if (posts.length < limit) break;
    offset += limit;

  } while (offset);

  const channels = Object.keys(entries).map(channelId => ({
    channelId,
    numberOfCurators: entries[channelId].uniqueAuthors.size,
    numberOfSongs: entries[channelId].uniquePosts.size,
  }));

  return Response.json({ message: 'success', channels }, { status: 200 });
}
