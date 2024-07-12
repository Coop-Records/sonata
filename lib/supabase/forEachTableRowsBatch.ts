import supabase from "../supabase/serverClient";

const forEachTableRowsBatch = async (
  tableName: string,
  selector = '*',
  size: number,
  callback: (results: any[]) => Promise<void> | void
) => {
  const SUPABASE_LIMIT = 1000 as const;

  const batchSize = size > 1000 ? (size / SUPABASE_LIMIT) : 1;
  const total = await supabase.from(tableName).select('*', { count: 'exact' }).limit(0);

  if (total.error) throw total.error;
  if (!total.count) throw Error('No count found');

  let offset = 0;
  let promises = [];
  const numberOfLoops = Math.ceil(total.count / SUPABASE_LIMIT);

  for (let i = 1; i <= numberOfLoops; i++) {
    promises.push(supabase.from(tableName).select(selector).range(offset, (offset += SUPABASE_LIMIT) - 1));

    if (i % batchSize == 0 || i === numberOfLoops) {
      const data = [];
      const results = await Promise.all(promises);

      for (const result of results) {
        if (result.error) throw result.error;
        data.push(...result.data);
      }

      await callback(data);
      promises = [];
    }
  }
  return { count: total.count };
};

export default forEachTableRowsBatch;