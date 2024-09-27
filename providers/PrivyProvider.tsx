import { PrivyProvider as PP } from '@privy-io/react-auth';
import { ReactNode } from 'react';

interface PrivyProviderProps {
  children: ReactNode;
}

const PrivyProvider = ({ children }: PrivyProviderProps) => (
  <PP
    appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
    config={{
      loginMethods: ['farcaster'],
      appearance: {
        theme: 'light',
        accentColor: '#676FFF',
        logo: '/images/logo2.png',
      },
    }}
  >
    {children}
  </PP>
);

export default PrivyProvider;
