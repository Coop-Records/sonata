import { MINTED_RELEASE_QUERY } from './queries';

const getReleaseInfo = async (
  soundHandle: string = 'xcelencia',
  releaseSlug: string = 'chimbita',
) => {
  const VARIABLES = {
    releaseSlug,
    soundHandle,
  };
  const response = await fetch('/api/sound/fetchSoundGraphQL', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: MINTED_RELEASE_QUERY,
      variables: VARIABLES,
    }),
  });
  const { data } = await response.json();
  return data.mintedRelease;
};

export default getReleaseInfo;
