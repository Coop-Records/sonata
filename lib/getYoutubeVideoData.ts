'use server';
export default async function getYoutubeVideoData(videoId: string) {
  const reqUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`;
  const response = await fetch(reqUrl);
  const data = await response.json();
  const video = data ? data.items[0]: [];
  return video;
}
