import { createContext, useContext, useEffect, useState } from 'react';
import { useNeynarProvider } from './NeynarProvider';
import SignInDialog from '@/components/SignInDialog';
import { useMediaQuery } from 'usehooks-ts';
import { CHANNELS } from '@/lib/consts';
import sortChannels from '@/lib/sortChannels';

type UiContextType = {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  checkLoggedIn: () => boolean;
  isMobile: boolean;
  menuItems: typeof CHANNELS;
};
const UiContext = createContext<UiContextType>({} as any);

export default function UiProvider({ children }: any) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false);
  const [menuItems, setMenuItems] = useState(CHANNELS);
  const { signer } = useNeynarProvider();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const checkLoggedIn = () => {
    if (!signer) {
      setIsSignInDialogOpen(true);
      return false;
    }
    return true;
  };

  useEffect(() => { if (signer) setIsSignInDialogOpen(false) }, [signer]);

  useEffect(() => {
    sortChannels().then(data => setMenuItems(
      data.map(channelId => CHANNELS.find(channel => channel.value == channelId)!)
    ));
  }, []);

  return (
    <UiContext.Provider value={{ menuOpen, setMenuOpen, checkLoggedIn, isMobile, menuItems }}>
      {children}
      <SignInDialog open={isSignInDialogOpen} setOpen={setIsSignInDialogOpen} />
    </UiContext.Provider>
  );
}

export const useUi = () => {
  const context = useContext(UiContext);
  if (!context) {
    throw new Error('useUi must be used within a UiProvider');
  }
  return context;
};
