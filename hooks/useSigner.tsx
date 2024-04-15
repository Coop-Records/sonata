'use client';

import { Signer } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { useEffect, useState } from 'react';

const useSigner = () => {
  const [signer, setSigner] = useState<Signer | null>(() => {
    // Retrieve the signer from localStorage on initial load
    const savedSigner = localStorage.getItem('signer');
    return savedSigner ? JSON.parse(savedSigner) : null;
  });

  useEffect(() => {
    window.onSignInSuccess = (data) => {
      console.log('SWEETS HANDLE SUCCESS', data);
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
    // Identify or create the script element
    let script = document.getElementById('siwn-script') as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = 'siwn-script';
      document.body.appendChild(script);
    }

    // Set attributes and source of the script
    script.src = 'https://neynarxyz.github.io/siwn/raw/1.2.0/index.js';
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      // Remove the script from the body
      if (script) {
        document.body.removeChild(script);
      }

      // Remove the button if it exists
      let button = document.getElementById('siwn-button');
      if (button && button.parentElement) {
        button.parentElement.removeChild(button);
      }
    };
  }, []);

  return { signer };
};

export default useSigner;
