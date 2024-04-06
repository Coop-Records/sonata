export const MINTED_RELEASE_QUERY = `
  query ApiExplorer($releaseSlug: String!, $soundHandle: String!) {
    mintedRelease(releaseSlug: $releaseSlug, soundHandle: $soundHandle) {
      id
      title
      track {
        id
        duration
        audio {
          audioOriginal {
            id
            url
          }
        }
      }
    }
  }
`;
