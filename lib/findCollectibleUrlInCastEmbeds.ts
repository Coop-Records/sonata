import { REFFERAL_ADDRESS } from "./consts";

export default function findCollectibleUrlInCastEmbeds(embeds: string[]) {
  try {
    for (const embed of embeds) {
      const { url }: { url: string } = JSON.parse(embed);
      const link = new URL(url);

      if (url.includes('sound.xyz')) {
        link.searchParams.set('referral', REFFERAL_ADDRESS);
        return link.toString();
      }
      if (url.includes('zora.co')) {
        link.searchParams.set('referrer', REFFERAL_ADDRESS);
        return link.toString();
      }
    }
  } catch { return; }
}
