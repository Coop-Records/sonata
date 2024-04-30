import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Button from '../Button';
import { useTipProvider } from '@/providers/TipProvider';
import { Cast as CastType } from '@/types/Cast';

const TipButton = ({
  verifications,
  cast = {} as CastType,
}: {
  verifications: string[];
  cast: CastType;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [customTip, setCustomTip] = useState('');
  const { tip, tipDegen } = useTipProvider();
  const [currency, setCurrency] = useState<'DEGEN' | 'POINTS'>('DEGEN'); // Toggle between 'DEGEN' and 'POINTS'
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [notesTotal, setNotesTotal] = useState(0);
  const [degenTotal, setDegenTotal] = useState(0);

  const tipAmounts: Record<string, number[]> = {
    DEGEN: [10, 100, 1000],
    POINTS: [100, 1000, 10000],
  };

  useEffect(() => {
    setNotesTotal(cast.points ?? 0);
    setDegenTotal(cast.degen ?? 0);
  }, [cast.points]);

  const handleTip = async (amount: number) => {
    if (currency === 'DEGEN') {
      const response = await tipDegen(amount, cast.hash);
      setDegenTotal(response.totalTipOnPost ?? 0);
      setShowDropdown(false);
      setCustomTip('');
    } else if (currency === 'POINTS') {
      const response = await tip(amount, cast.hash, cast.author.verifications);
      setNotesTotal(response.totalTipOnPost ?? 0);
      setShowDropdown(false);
      setCustomTip('');
    }
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
        <div className="flex items-center justify-center text-xs space-x-2 h-full">
          <span>{degenTotal}</span>
          <Image src="/images/degenchain.png" width={12} height={12} alt="DEGEN" />
        </div>
        <div className="flex items-center justify-center text-xs space-x-2 h-full">
          <span>{notesTotal}</span>
          <Image src="/images/notes.jpg" width={16} height={16} alt="NOTES" />
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
