export interface PrivyLinkedAccount {
  type: "wallet" | "email";
  address: string;
  chain_type?: string; // currently supporting EVM only
  verified_at?: number;
};

export interface PrivyUser {
  id: string;
  created_at: number;
  linked_accounts: PrivyLinkedAccount[];
}

export interface PrivyBatchUserResponse {
  data: PrivyUser[];
  next_cursor: string | null;
}

export interface PrivyClientOptions {
  method?: string;
  body?: Record<string, unknown>;
};