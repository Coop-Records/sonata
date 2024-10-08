import { createContext, useContext, useCallback, useState, useEffect } from 'react';
import { Signer } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import getUser from '@/lib/sonata/getUser';
import { SupabaseUser } from '@/types/SupabaseUser';
import verifySignerUUID from '@/lib/neynar/verifySigner';

const clientId = process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID;
const loginUrl = 'https://app.neynar.com/login';

const isClient = typeof window !== 'undefined';

type NeynarContextType = {
  signer: Signer | null;
  signIn: () => void;
  signOut: () => void;
  user?: SupabaseUser;
  loading: boolean;
};

const NeynarContext = createContext<NeynarContextType>({
  signer: null,
  signIn() {},
  signOut() {},
  loading: true,
});

const NeynarProvider = ({ children }: any) => {
  if (!clientId) {
    throw new Error('NEXT_PUBLIC_NEYNAR_CLIENT_ID is not defined in .env');
  }

  const [signer, setSigner] = useState<Signer | null>(() => {
    if (isClient) {
      const savedSigner = localStorage.getItem('signer');
      return savedSigner ? JSON.parse(savedSigner) : null;
    }
    return null;
  });

  const [user, setUser] = useState<SupabaseUser>();
  const [loading, setLoading] = useState(true);

  const signIn = useCallback(() => {
    const authUrl = new URL(loginUrl);
    const authOrigin = new URL(loginUrl).origin;
    authUrl.searchParams.append('client_id', clientId);
    const authWindow = window.open(authUrl.toString());

    const messageHandler = (event: any) => {
      if (event.origin === authOrigin && event.data.is_authenticated) {
        if (authWindow) {
          authWindow.close();
        }
        window.removeEventListener('message', messageHandler);
        const signerData = event.data as Signer;
        setSigner(signerData);
        localStorage.setItem('signer', JSON.stringify(signerData));
      }
    };

    window.addEventListener('message', messageHandler, false);
  }, []);

  const signOut = useCallback(() => {
    setSigner(null);
    localStorage.removeItem('signer');
  }, []);

  useEffect(() => {
    const updateUser = async () => {
      setLoading(true);
      if (!signer?.signer_uuid) {
        setUser(undefined);
      } else {
        const { fid, status } = await verifySignerUUID(signer.signer_uuid);
        if (!status) {
          localStorage.removeItem('signer');
        } else {
          const user = await getUser(fid);
          if ('error' in user) {
            throw new Error('Error fetching user');
          }
          setUser(user);
        }
      }
      setLoading(false);
    };
    updateUser();
  }, [signer?.signer_uuid]);

  return (
    <NeynarContext.Provider value={{ signer, signIn, signOut, user, loading }}>
      {children}
    </NeynarContext.Provider>
  );
};

export const useNeynarProvider = () => {
  const context = useContext(NeynarContext);
  if (!context) {
    throw new Error('useNeynarProvider must be used within a NeynarProvider');
  }
  return context;
};

export default NeynarProvider;
