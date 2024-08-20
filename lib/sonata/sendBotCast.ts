import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import createPostReply from '@/lib/neynar/createPostReply';

const BOT_SIGNER_UUID = process.env.BOT_SIGNER_UUID!;

async function sendBotCast(cast: Cast) {
  await createPostReply(
    BOT_SIGNER_UUID,
    cast.hash,
    `This song is now available on @sonatatips where you earn NOTES when people tip you.\n\nSee you over there!\n\nhttps://sonata.tips/api/frame?post_hash=${cast.hash.substring(0, 8)}`,
  );

  return { success: true };
}

export default sendBotCast;
