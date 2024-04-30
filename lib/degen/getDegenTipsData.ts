export default async function getDegenTipsData(address: string) {
  const options = {
    method: 'GET',
    headers: { accept: 'application/json' },
  } as any;

  try {
    const queryParams = new URLSearchParams({
      address,
    });

    const response = await fetch(
      `https://www.degen.tips/api/airdrop2/tip-allowance?${queryParams}`,
      options,
    );

    const data = await response.json();
    if (data.length > 0) {
      return data[0];
    }
    return undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
