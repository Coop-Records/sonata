'use server';
import { UserDataType } from '@standard-crypto/farcaster-js-hub-rest';
import farcasterClient from './client';
import { SupabaseUser } from '@/types/SupabaseUser';

const getUserFromFid = async (fid?: number) => {
  if (!fid) return null;
  const user: Partial<SupabaseUser> = {};

  const userDataList = farcasterClient.listAllUserDataByFid(fid);
  for await (const userAdd of userDataList) {
    const data = userAdd.data.userDataBody;
    if (data.type === UserDataType.Username) {
      user.username = data.value;
    } else if (data.type === UserDataType.Pfp) {
      user.pfp_url = data.value;
    } else if (data.type === UserDataType.Display) {
      user.display_name = data.value;
    } else if (data.type === UserDataType.Bio) {
      user.profile = { bio: { text: data.value, mentioned_profiles: [] } };
    }
  }
  return user;
};

export default getUserFromFid;
