
export default async function getCombinedFeeds() {
  const response = await fetch("api/getFeed")
  const {data} = await response.json()
  console.log("SWEETS UI FEED", data)

  return data;
}
