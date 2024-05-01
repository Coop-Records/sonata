import { Address } from 'viem';

const getCurrentNotes = async (wallet_address: Address) => {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json' },
  } as any;

  try {
    const queryParams = new URLSearchParams({
      wallet_address,
    });

    const response = await fetch(`/api/getPoints?${queryParams}`, options);
    const data = await response.json();
    return data.notes;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export default getCurrentNotes;
