import processUserBatch from '@/lib/hypersub/proccessUserBatch';
import { NextResponse } from 'next/server';

const getResponse = async () => {
  let offset = 0;
  const limit = 1000;

  do {
    const { count, error } = await processUserBatch(offset);

    if (error) return Response.json(error, { status: 500 });
    if (count < limit) break;

    offset += limit;
  } while (offset)

  return Response.json({ message: 'success' });
};

export async function GET(): Promise<Response> {
  const response = await getResponse().catch((error) => {
    console.error('Error in background task:', error);
    return NextResponse.json({ message: 'Error in background task', error }, { status: 500 });
  });
  return response as NextResponse;
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
