import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Button from '../Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TipButton = ({ verifications }: { verifications: string[] }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [customTip, setCustomTip] = useState('');
  const [currency, setCurrency] = useState('DEGEN');
  const dropdownRef = useRef(null); // Ref for the dropdown

  const handleTip = (amount: number) => {
    toast(`Tipped ${amount} ${currency}`);
    setShowDropdown(false);
    setCustomTip('');
  };

  const toggleCurrency = () => {
    setCurrency(currency === 'DEGEN' ? 'POINTS' : 'DEGEN');
  };

  // Effect to handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]); // Only re-run when showDropdown changes

  return verifications && verifications.length > 0 ? (
    <div className="w-full flex justify-between items-center text-xs relative">
      <div className="inline-flex gap-4">
        <div className="flex items-center justify-center text-xs space-x-2 h-full">
          <span>0</span>
          <Image src="/images/notes.jpg" width={16} height={16} alt="" />
        </div>
        <div className="flex items-center justify-center text-xs space-x-2 h-full">
          <span>0</span>
          <Image src="/images/degenchain.png" width={12} height={12} alt="" />
        </div>
      </div>
      <Button
        className="hover:bg-gray-100 text-black py-0 px-2 border border-gray-300 rounded"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        TIP
      </Button>
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 py-2 w-48 bg-white shadow-xl rounded z-50"
        >
          <div className="flex justify-between items-center px-4 py-2">
            <span>Tip in:</span>
            <button
              className={`px-2 py-1 rounded ${currency === 'DEGEN' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => toggleCurrency()}
            >
              DEGEN
            </button>
            <button
              className={`px-2 py-1 rounded ${currency === 'POINTS' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => toggleCurrency()}
            >
              POINTS
            </button>
          </div>
          <ul className="text-gray-700">
            {[10, 100, 1000].map((amount) => (
              <li
                key={amount}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleTip(amount)}
              >
                Tip {amount} {currency}
              </li>
            ))}
            <li className="px-4 py-2 flex items-center">
              <input
                type="text"
                value={customTip}
                onChange={(e) => setCustomTip(e.target.value)}
                placeholder="Custom amount"
                className="border border-gray-300 rounded py-1 px-2 text-sm w-full"
              />
              <Button className="ml-2" onClick={() => handleTip(Number(customTip) || 0)}>
                Tip
              </Button>
            </li>
          </ul>
        </div>
      )}
    </div>
  ) : null;
};

export default TipButton;
