const getCastHash = async (url: string) => {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json' },
  } as any;

  try {
    const queryParams = new URLSearchParams({
      url,
    });

    const response = await fetch(`/api/neynar/getCastHash?${queryParams}`, options);
    const data = await response.json();
    return data.hash;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export default getCastHash;
