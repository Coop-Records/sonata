'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import NotesIcon from '@/components/NotesIcon';
import BalanceInfo from './BalanceInfo';

export default function BalanceMenu() {
  return (
    <Popover>
      <PopoverTrigger>
        <NotesIcon />
      </PopoverTrigger>
      <PopoverContent className="text-foreground">
        <BalanceInfo />
        <a
          className="mt-4 block font-clashDisplay font-medium"
          href="https://www.stack.so/leaderboard/sonata"
          target="_blank"
        >
          Leaderboard
        </a>
      </PopoverContent>
    </Popover>
  );
}
