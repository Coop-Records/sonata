const getUserSongs = async (profileFid: number) => {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json' },
  } as any;

  try {
    const queryParams = new URLSearchParams({
      profile_fid: String(profileFid),
    });

    const response = await fetch(`/api/user/getSongs?${queryParams}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export default getUserSongs;
