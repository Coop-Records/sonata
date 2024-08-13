import { ApiResponse } from './ApiResponse';

export type TipResponse = ApiResponse<{
  message: string;
  tipRemaining: number;
  usedTip: number;
  totalTipOnPost: number;
  tipperAmount: number;
  channelAmount: number;
}>;
