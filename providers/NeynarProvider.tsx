import useSigner from '@/hooks/useSigner';
import { createContext, useContext, useMemo } from 'react';

const NeynarContext = createContext<any>(null);

const NeynarProvider = ({ children }: any) => {
  const signer = useSigner();

  const value = useMemo(
    () => ({
      ...signer,
    }),
    [signer],
  );

  return <NeynarContext.Provider value={value as any}>{children}</NeynarContext.Provider>;
};

export const useNeynarProvider = () => {
  const context = useContext(NeynarContext);
  if (!context) {
    throw new Error('useNeynarProvider must be used within a NeynarProvider');
  }
  return context;
};

export default NeynarProvider;
