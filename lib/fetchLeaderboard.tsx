const fetchLeaderboard = async () => {
  try {
    const response = await fetch('/api/stack/leaderboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch leaderboard');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};

export default fetchLeaderboard;
