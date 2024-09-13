import createPost from './createPost';

export default async function postMusicEmbed(
  signer_uuid: string,
  url: string,
  channel_id?: string,
) {
  try {
    const body: any = {
      signer_uuid,
      embeds: [{ url }],
    };
    if (channel_id) body.channel_id = channel_id;

    const response = await createPost(JSON.stringify(body));
    return response;
  } catch (error) {
    console.error(error);
    return { error };
  }
}
