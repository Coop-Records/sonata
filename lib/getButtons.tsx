import { VERCEL_URL } from './consts';

const getButtons = (collectorId: string) => {
  return [
    {
      label: 'see results',
    },
    {
      action: 'link',
      label: 'share results',
      target: `https://warpcast.com/~/compose?text=${VERCEL_URL}/collector/${collectorId}`,
    },
  ] as any;
};

export default getButtons;
