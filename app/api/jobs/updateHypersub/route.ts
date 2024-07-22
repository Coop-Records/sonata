import processTipsBatch from '@/lib/hypersub/processTipsBatch';
import forEachTableRowsBatch from '@/lib/supabase/forEachTableRowsBatch';


export async function GET(): Promise<Response> {
  try {
    const res = await forEachTableRowsBatch('tips', 'fid, wallet_address', 3000, processTipsBatch);
    return Response.json({ message: 'success', ...res });
  } catch (error) {
    console.error('Error in background task:', error);
    return Response.json({ message: 'Error in background task', error }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
