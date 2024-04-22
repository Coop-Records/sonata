import fetchSoundGraphQL from './fetchSoundGraphQL';
import { MINTED_RELEASE_QUERY } from './queries';

const getReleaseInfo = async (
  soundHandle: string = 'xcelencia',
  releaseSlug: string = 'chimbita',
) => {
  const VARIABLES = {
    releaseSlug,
    soundHandle,
  };
  const response = await fetchSoundGraphQL(MINTED_RELEASE_QUERY, VARIABLES);
  return response;
};

export default getReleaseInfo;
