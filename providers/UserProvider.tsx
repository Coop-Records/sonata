import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import getUser from '@/lib/sonata/getUser';
import { SupabaseUser } from '@/types/SupabaseUser';
import useWalletClient from '@/hooks/useWalletClient';
import { Signer } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import getSigner from '@/lib/neynar/getSigner';

const isClient = typeof window !== 'undefined';

type NeynarContextType = {
  signer: Signer | null;
  user?: SupabaseUser;
  loading: boolean;
  signOut: () => Promise<void>;
};

const NeynarContext = createContext<NeynarContextType>({
  async signOut() {},
  signer: null,
  loading: true,
});

const UserProvider = ({ children }: any) => {
  const { address, disconnect } = useWalletClient();
  const [user, setUser] = useState<SupabaseUser>();
  const [loading, setLoading] = useState(true);
  const [signer, setSigner] = useState<Signer | null>(() => {
    if (isClient) {
      const savedSigner = localStorage.getItem('signer');
      return savedSigner ? JSON.parse(savedSigner) : null;
    }
    return null;
  });

  const signOut = useCallback(async () => {
    disconnect();
    setSigner(null);
    setUser(undefined);
    localStorage.removeItem('signer');
  }, []);

  useEffect(() => {
    const updateUser = async () => {
      setLoading(true);
      if (!address) {
        setUser(undefined);
      } else {
        const user = await getUser(address);
        if ('error' in user) {
          throw new Error('Error fetching user');
        }
        setUser(user);
        const signer = await getSigner();
        setSigner(signer as Signer);
        localStorage.setItem('signer', JSON.stringify(signer));
      }
      setLoading(false);
    };
    updateUser();
  }, [address]);

  return (
    <NeynarContext.Provider value={{ user, loading, signer, signOut }}>
      {children}
    </NeynarContext.Provider>
  );
};

export const useUserProvider = () => {
  const context = useContext(NeynarContext);
  if (!context) {
    throw new Error('useUserProvider must be used within a UserProvider');
  }
  return context;
};

export default UserProvider;
