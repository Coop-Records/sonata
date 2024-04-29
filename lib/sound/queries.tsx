export const MINTED_RELEASE_QUERY = `
  query ApiExplorer($releaseSlug: String!, $soundHandle: String!) {
    mintedRelease(releaseSlug: $releaseSlug, soundHandle: $soundHandle) {
      id
      title
      artist{
        name
      }
      track {
        id
        duration
        audio {
          audioOriginal {
            url
          }
          audio128k{
            url
          }
        }
      }
      coverImage{
        url
      }
    }
  }
`;
