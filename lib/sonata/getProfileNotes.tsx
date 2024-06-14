import { Address } from 'viem';

const getProfileNotes = async (wallets: Address[]) => {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json' },
  } as any;

  try {
    const notesPromise = wallets.map(async (wallet) => {
      const queryParams = new URLSearchParams({
        wallet_address: wallet,
      });

      const response = await fetch(`/api/getPoints?${queryParams}`, options);
      const data = await response.json();
      return data.notes;
    });

    const notes = await Promise.all(notesPromise);
    const notesCount = notes.reduce((acc, cur) => acc + cur, 0);
    return notesCount;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export default getProfileNotes;
