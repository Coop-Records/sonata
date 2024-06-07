const mergeWithAlternatives = (spotifyRaw: any[], alternatives: string[][]) =>
  spotifyRaw.map((cast, index) => ({
    ...cast,
    alternativeEmbeds: alternatives[index] || [],
  }));

export default mergeWithAlternatives;
