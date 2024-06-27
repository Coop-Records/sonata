'use server';
export default async function getYoutubeVideoData(videoId: string) {
  const reqUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`;
  const response = await fetch(reqUrl);
  const data = await response.json();

  if (data && data.items && data.items.length > 0) {
    const video = data.items[0];
    return video;
  } else {
    console.error('No video data found');
  }
}
