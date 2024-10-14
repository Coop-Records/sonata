import { Address } from 'viem';
import { zora } from 'viem/chains';

export const CHAIN = zora;
export const CHAIN_ID = zora.id;
export const ZORA_FEE_RECIPIENTS = [
  '0xdfc04f55ad3bd652a63f1a26e68d24cdf16a663d',
  '0xf9fcd1fa7a5a3f2cf6fe3a33e1262b74c04feeda',
  '0xeb7223fe47fd4132aa1f534a5db9153370d34b1a',
  '0xecfc2ee50409e459c554a2b0376f882ce916d853',
  '0x7bf90111ad7c22bec9e9dff8a01a44713cc1b1b6',
] as Address[];
export const DEMO_ADDRESS = '0x33912a0d6bEFf5Fb8e5B70688CE858D5e7E8104E' as Address;

// hypersub
export const HYPERSUB_SUBSCRIPTION_ADDRESS = '0xb5a4ca234730dfb411ec16513ed2cff9b16a85d9';

// viem
export const INITIAL_BLOCK_RANGE = 1_000_000n;
export const MAX_RETRIES = 5;
export const MIN_BLOCK_RANGE = 1000n;
export const MAX_RECORDS_THRESHOLD = 5000;

// stack event names
export const EVENT_UPDATED_PERMISSIONS = 'UpdatedPermissions';
export const EVENT_ZORA_TOKENS = 'zora+tokens';
export const EVENT_ZORA_COLLECTIONS = 'zora+collections';
export const EVENT_ZORA_REWARDS = 'zora+rewards';
export const EVENT_ZORA_SCORE = 'zora+score';
export const EVENT_ZORA_REWARDS_CREATOR = 'zora+rewards+creator';
export const EVENT_ZORA_REWARDS_MINT_REFERRAL = 'zora+rewards+mint';
export const EVENT_ZORA_REWARDS_CREATE_REFERRAL = 'zora+rewards+create';
export const EVENT_ZORA_REWARDS_FIRST_MINTER = 'zora+rewards+first';
export const EVENT_ZORA_PROFILE = 'zora+profile';

// zora score
export const FOLLOWERS_PERFECT = 55555;
export const MAX_CREATE_SCORE = 333;

// stack point systems
export const TOKEN_INDEXER_POINT_ID = 3500;
export const REWARDS_DEPOSIT_POINT_SYSTEM_ID = 3078;
export const SETTINGS_STACK_ID = 3067;
