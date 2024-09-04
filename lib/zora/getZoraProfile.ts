async function getZoraProfile(address: string) {
  if (!address) return;
  const res = await fetch(`https://zora.co/api/profiles/${address}?expandedData=true`);
  if (!res.ok) throw Error(res.statusText);
  return await res.json();
}

export default getZoraProfile;