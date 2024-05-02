const isValidUrl = (url: string) => {
  let valid = false;
  if (url.includes('spotify')) {
    if (url.match(/https:\/\/open.spotify.com\/track\//)) {
      valid = true;
    }
  } else if (url.includes('soundcloud')) {
    valid = true;
  } else if (url.includes('sound.xyz')) {
    if (!url.match(/(\/post\/)|(\/playlist\/)/)) {
      valid = true;
    }
  }
  return valid;
};

export default isValidUrl;
