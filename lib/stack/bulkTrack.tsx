import { StackEventAPI } from "@/types/Stack";

const API_URL = 'https://track.stack.so/event';
const API_KEY = process.env.STACK_API_KEY as string;

export async function bulkTrack(events: StackEventAPI[]) {
  if (!Array.isArray(events) || events.length === 0) {
    throw new Error('Events array is required and must not be empty.');
  }

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-api-key', API_KEY);

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(events.slice(0, 100)),
  });

  if (!response.ok) {
    console.error(response);
    throw new Error(`Failed to track events: ${response.statusText}`);
  }

  return response.json();
}
