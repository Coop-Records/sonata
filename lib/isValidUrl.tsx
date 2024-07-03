const isValidUrl = (url: string) => {
  let valid = false;
  if (url.match(/^https:\/\/open.spotify.com(?:\/[a-zA-Z-]+)*\/track\/[a-zA-Z0-9]+(\?.*)?$/)) valid = true
  else if (url.includes('soundcloud')) valid = true;
  else if (url.includes('sound.xyz') && !url.match(/(\/post\/)|(\/playlist\/)/)) valid = true;
  else if (url.match(/^https:\/\/www.youtube.com\/watch\?v=(.+)$/)) valid = true;
  else if (url.match(/^https:\/\/youtu\.be\/(.+)$/)) valid = true;

  return valid;
};

export default isValidUrl;
