import { Signer } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    onSignInSuccess?: (data: any) => void;
  }
}

const isClient = typeof window !== 'undefined';

const useSigner = () => {
  const [signer, setSigner] = useState<Signer | null>(() => {
    if (isClient) {
      const savedSigner = localStorage.getItem('signer');
      return savedSigner ? JSON.parse(savedSigner) : null;
    }
    return null;
  });

  useEffect(() => {
    window.onSignInSuccess = (data) => {
      const signerData = data as Signer;
      setSigner(signerData);
      localStorage.setItem('signer', JSON.stringify(signerData));
    };

    return () => {
      if (window.onSignInSuccess) {
        delete window.onSignInSuccess;
      }
    };
  }, []);

  useEffect(() => {
    let script = document.getElementById('siwn-script') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'siwn-script';
      document.body.appendChild(script);
    }
    script.src = 'https://neynarxyz.github.io/siwn/raw/1.2.0/index.js';
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      if (script) {
        document.body.removeChild(script);
      }
      let button = document.getElementById('siwn-button');
      if (button && button.parentElement) {
        button.parentElement.removeChild(button);
      }
    };
  }, []);

  return { signer };
};

export default useSigner;
