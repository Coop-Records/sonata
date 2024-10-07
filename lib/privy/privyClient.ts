import { PrivyClient } from '@privy-io/server-auth';

const APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID!;
const APP_SECRET = process.env.PRIVY_APP_SECRET!;
const privyClient = new PrivyClient(APP_ID, APP_SECRET);

export default privyClient;
