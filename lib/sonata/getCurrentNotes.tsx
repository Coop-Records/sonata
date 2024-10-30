import qs from 'qs';

const getCurrentNotes = async (fid: number) => {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json' },
  } as any;

  try {
    const queryParams = qs.stringify({
      fid,
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
