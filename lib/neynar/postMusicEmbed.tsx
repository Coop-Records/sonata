import createPost from './createPost';

export default async function postMusicEmbed(signer_uuid: string, url: string) {
  try {
    const body = JSON.stringify({
      signer_uuid,
      embeds: [{ url }],
    });
    const response = await createPost(body);
    return response;
  } catch (error) {
    console.error(error);
    return { error };
  }
}
