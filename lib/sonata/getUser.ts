import { SupabaseUser } from '@/types/SupabaseUser';
import { Address } from 'viem';

export default async function getUser(address: Address) {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json' },
  } as any;

  try {
    const queryParams = new URLSearchParams({
      address,
    });

    const response = await fetch(`/api/neynar/getUser?${queryParams}`, options);
    const { users } = await response.json();
    return users[0] as SupabaseUser;
  } catch (error) {
    console.error(error);
    return { error };
  }
}
