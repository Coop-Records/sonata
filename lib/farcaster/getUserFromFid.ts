'use server';
import { UserDataType } from '@standard-crypto/farcaster-js-hub-rest';
import farcasterClient from './client';
import { SupabaseUser } from '@/types/SupabaseUser';
import getVerifications from './getVerifications';
import getFollowerCount from './getFollowerCount';

const getUserFromFid = async (fid?: number) => {
  if (!fid) return null;
  const user: SupabaseUser = {
    fid,
    username: '',
    pfp_url: '',
    display_name: '',
    profile: { bio: { text: '' } },
    verifications: [],
    follower_count: 0,
    power_badge: false,
  };

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
      user.profile = { bio: { text: data.value } };
    }
  }

  const verifications = await getVerifications(fid);
  user.verifications = verifications;

  const followerCount = await getFollowerCount(fid);
  user.follower_count = followerCount;

  return user;
};

export default getUserFromFid;
