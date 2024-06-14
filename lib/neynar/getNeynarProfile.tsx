const getNeynarProfile = async (username: string) => {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json' },
    next: {
      revalidate: 60,
    },
  } as any;

  try {
    const queryParams = new URLSearchParams({
      username,
    });

    const response = await fetch(`/api/neynar/getProfile?${queryParams}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getNeynarProfile;
