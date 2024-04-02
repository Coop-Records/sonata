import { createContext, useContext, useMemo, useState } from 'react';

const Context = createContext<any>(null);

const Provider = ({ children }: any) => {
  const [setupActions, setSetupActions] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [fundsRecipient, setFundsRecipient] = useState<`0x${string}`>();
  const [saleStrategy, setSaleStrategy] = useState<`0x${string}`>();

  const value = useMemo(
    () => ({
      copied,
      setCopied,
      fundsRecipient,
      setFundsRecipient,
      saleStrategy,
      setSaleStrategy,
      setupActions,
      setSetupActions,
    }),
    [
      copied,
      setCopied,
      fundsRecipient,
      setFundsRecipient,
      saleStrategy,
      setSaleStrategy,
      setupActions,
      setSetupActions,
    ],
  );

  return <Context.Provider value={value as any}>{children}</Context.Provider>;
};

export const useProvider = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useProvider must be used within a Provider');
  }
  return context;
};

export default Provider;
