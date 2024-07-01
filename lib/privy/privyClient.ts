import { PrivyClientOptions } from "@/types/Privy";

const APP_ID = process.env.PRIVY_APP_ID!;
const APP_SECRET = process.env.PRIVY_APP_SECRET!;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Basic ${btoa(APP_ID + ':' + APP_SECRET)}`,
  'privy-app-id': APP_ID,
};

const privyClient = (
  endpoint: string,
  options: PrivyClientOptions = {}
) => fetch(
  'https://auth.privy.io/api/v1' + endpoint,
  {
    method: options.method ?? 'POST',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  }
);

export default privyClient;
