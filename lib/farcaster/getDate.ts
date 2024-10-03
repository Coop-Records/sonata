const epoch = "Jan 1, 2021 00:00:00 UTC";
const epochTime = new Date(epoch).getTime() / 1000;

/**
 * Converts a Farcaster timestamp to a JavaScript Date object.
 *
 * @param {number} timestamp - The Farcaster timestamp (seconds since Farcaster epoch).
 * @returns {Date} A JavaScript Date object representing the corresponding date and time.
 */
const getDate = (timestamp: number) => new Date((timestamp + epochTime) * 1000);

export default getDate;
