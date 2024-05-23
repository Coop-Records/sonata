import { useNeynarProvider } from '@/providers/NeynarProvider';
import { useEffect, useState } from 'react';

const useSignInModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { signer } = useNeynarProvider();

  const checkLoggedIn = () => {
    if (!signer) {
      setIsOpen(true);
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (signer) setIsOpen(false);
  }, [signer]);

  return { isOpen, setIsOpen, checkLoggedIn };
};

export default useSignInModal;
