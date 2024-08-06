import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const getLatestTips = async () => {
  const { data, error } = await supabase
    .from('tips_activity_log')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);
  if (error) throw error;

  const LIMIT = 11;
  const MAX_SENDER_APPEARANCE = 1;
  const result = [];
  const senderCounts = new Map<string, number>();

  data.sort(() => Math.random() - 0.5);

  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    const count = senderCounts.get(item.sender) ?? 0;

    if (count < MAX_SENDER_APPEARANCE) {
      senderCounts.set(item.sender, count + 1);
      result.push(item);

      if (result.length >= LIMIT) break;
      data.splice(index, 1);
    }
  }
  result.push(...data.slice(0, LIMIT - result.length));
  return result;
};
