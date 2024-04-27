import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Button from '../Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TipButton = ({ verifications }: { verifications: string[] }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [customTip, setCustomTip] = useState('');
  const [currency, setCurrency] = useState<string>('DEGEN'); // Toggle between 'DEGEN' and 'POINTS'
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Simulated available amounts for DEGEN and POINTS
  // TODO: Make this so it is variable
  const [availableAmounts, setAvailableAmounts] = useState<Record<string, number>>({
    DEGEN: 3000,
    POINTS: 7500,
  });

  const tipAmounts: Record<string, number[]> = {
    DEGEN: [10, 100, 1000],
    POINTS: [100, 1000, 10000],
  };

  const handleTip = (amount: number) => {
    if (amount > availableAmounts[currency]) {
      toast.error(`Not enough ${currency} available`);
      return;
    }

    toast(`Tipped ${amount} ${currency}`);
    setShowDropdown(false);
    setCustomTip('');
    setAvailableAmounts((prev: { [x: string]: number }) => ({
      ...prev,
      [currency]: prev[currency] - amount, // Deduct the tipped amount from the available balance
    }));
  };

  const toggleCurrency = () => {
    setCurrency((prevCurrency) => (prevCurrency === 'DEGEN' ? 'POINTS' : 'DEGEN'));
    setShowDropdown(true);
  };

  // Effect to handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return verifications && verifications.length > 0 ? (
    <div className="relative flex w-full items-center justify-between text-xs">
      <div className="inline-flex gap-4">
        <div className="flex h-full items-center justify-center space-x-2 text-xs">
          <span>{availableAmounts.DEGEN}</span>
          <Image src="/images/degenchain.png" width={12} height={12} alt="DEGEN" />
        </div>
        <div className="flex h-full items-center justify-center space-x-2 text-xs">
          <span>{availableAmounts.POINTS}</span>
          <Image src="/images/notes.jpg" width={16} height={16} alt="POINTS" />
        </div>
      </div>
      <Button
        className="rounded border border-gray-300 px-2 py-0 text-black hover:bg-gray-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        TIP
      </Button>
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute right-0 z-50 mt-2 w-48 rounded bg-white py-2 shadow-xl"
        >
          <div className="flex items-center justify-between px-4 py-2">
            <span>Tip in:</span>
            <button
              className={`rounded px-2 py-1 ${currency === 'DEGEN' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => toggleCurrency()}
            >
              DEGEN
            </button>
            <button
              className={`rounded px-2 py-1 ${currency === 'POINTS' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => toggleCurrency()}
            >
              POINTS
            </button>
          </div>
          <ul className="text-gray-700">
            {tipAmounts[currency].map((amount) => (
              <li
                key={amount}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => handleTip(amount)}
              >
                Tip {amount} {currency}
              </li>
            ))}
            <li className="flex items-center px-4 py-2">
              <input
                type="text"
                value={customTip}
                onChange={(e) => setCustomTip(e.target.value)}
                placeholder="Custom amount"
                className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
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
