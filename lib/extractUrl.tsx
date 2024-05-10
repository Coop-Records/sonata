function extractUrl(str: string) {
  if (!str) return '';
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = str.match(urlRegex);
  return urls && urls?.length > 0 ? urls[0] : '';
}

export default extractUrl;
