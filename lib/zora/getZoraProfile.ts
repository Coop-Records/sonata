async function getZoraProfile(address: string) {
  if (!address) return;
  const fetchUrl = `https://zora.co/api/profiles/${address}?expandedData=true`
  const res = await fetch(fetchUrl);
  if (!res.ok) throw Error(res.statusText);
  return await res.json();
}

export default getZoraProfile;
