import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Button from '../Button';
import { useTipProvider } from '@/providers/TipProvider';
import { Cast as CastType } from '@/types/Cast';

const isValidNumber = (value: string) => {
  return /^\d+$/.test(value);
};

const TipButton = ({
  verifications,
  cast = {} as CastType,
}: {
  verifications: string[];
  cast: CastType;
}) => {
  const { tip, tipDegen } = useTipProvider();
  const [showDegenDropdown, setShowDegenDropdown] = useState(false);
  const [showPointsDropdown, setShowPointsDropdown] = useState(false);
  const [customTipDegen, setCustomTipDegen] = useState('');
  const [customTipPoints, setCustomTipPoints] = useState('');
  const degenDropdownRef = useRef<HTMLDivElement>(null);
  const pointsDropdownRef = useRef<HTMLDivElement>(null);
  const [notesTotal, setNotesTotal] = useState(0);
  const [degenTotal, setDegenTotal] = useState(0);

  useEffect(() => {
    setNotesTotal(cast.points ?? 0);
    setDegenTotal(cast.degen ?? 0);
  }, [cast]);

  const handleTip = async (amount: number, currency: 'DEGEN' | 'NOTES') => {
    setShowDegenDropdown(false);
    setShowPointsDropdown(false);
    let response;
    if (currency === 'DEGEN') {
      response = await tipDegen(amount, cast.hash);
      setDegenTotal(response.totalTipOnPost ?? 0);
      setCustomTipDegen('');
    } else {
      response = await tip(amount, cast.hash, cast.author.verifications);
      setNotesTotal(response.totalTipOnPost ?? 0);
      setCustomTipPoints('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (degenDropdownRef.current && !degenDropdownRef.current.contains(event.target as Node)) {
        setShowDegenDropdown(false);
        setCustomTipDegen('');
      }
      if (pointsDropdownRef.current && !pointsDropdownRef.current.contains(event.target as Node)) {
        setShowPointsDropdown(false);
        setCustomTipPoints('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return verifications && verifications.length > 0 ? (
    <div className="relative flex w-full items-center justify-end gap-4 text-xs">
      <div
        className="flex h-full cursor-pointer items-center justify-center space-x-2 rounded-sm p-1 text-xs hover:bg-gray-100"
        onClick={() => setShowDegenDropdown(!showDegenDropdown)}
      >
        <span>{degenTotal}</span>
        <Image src="/images/degenchain.png" width={12} height={12} alt="DEGEN" />
      </div>
      <div
        className="flex h-full cursor-pointer items-center justify-center space-x-2 rounded-sm p-1 text-xs hover:bg-gray-100"
        onClick={() => setShowPointsDropdown(!showPointsDropdown)}
      >
        <span>{notesTotal}</span>
        <Image src="/images/notes.jpg" width={16} height={16} alt="NOTES" />
      </div>
      {showDegenDropdown && (
        <div
          ref={degenDropdownRef}
          className="absolute right-0 z-50 mt-2 w-48 rounded bg-white py-2 shadow-xl"
        >
          <ul className="text-gray-700">
            {[10, 50, 100].map((amount) => (
              <li
                key={amount}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => handleTip(amount, 'DEGEN')}
              >
                Tip {amount} DEGEN
              </li>
            ))}
            <li className="flex items-center px-4 py-2">
              <input
                type="number"
                min={0}
                value={customTipDegen}
                onChange={(e) => setCustomTipDegen(e.target.value)}
                placeholder="Custom amount"
                className={`mr-2 w-full rounded border px-2 py-1 text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
              />
              <Button
                className="p-2 hover:bg-gray-100"
                onClick={() => isValidNumber(customTipDegen) && handleTip(Number(customTipDegen), 'DEGEN')}
              >
                Tip
              </Button>
            </li>
          </ul>
        </div>
      )}
      {showPointsDropdown && (
        <div
          ref={pointsDropdownRef}
          className="absolute right-0 z-50 mt-2 w-48 rounded bg-white py-2 shadow-xl"
        >
          <ul className="text-gray-700">
            {[100, 1000, 10000].map((amount) => (
              <li
                key={amount}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => handleTip(amount, 'NOTES')}
              >
                Tip {amount} NOTES
              </li>
            ))}
            <li className="flex items-center px-4 py-2">
              <input
                type="number"
                min={0}
                value={customTipPoints}
                onChange={(e) => setCustomTipPoints(e.target.value)}
                placeholder="Custom amount"
                className={`mr-2 w-full rounded border px-2 py-1 text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
              />
              <Button
                className="p-2 hover:bg-gray-100"
                onClick={() => isValidNumber(customTipPoints) && handleTip(Number(customTipPoints), 'NOTES')}
              >
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
