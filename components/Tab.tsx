import { Button } from '@/components/ui/button';

interface Props {
  tab: { value: string; label: string };
  className?: string;
  onClick: () => void;
}

export default function Tab({ tab, className = '', onClick }: Props) {
  return (
    <li className={className}>
      <Button
        variant="ghost"
        className="p-0 text-sm font-bold hover:bg-transparent md:text-lg !text-white"
        onClick={onClick}
      >
        {tab.label}
      </Button>
    </li>
  );
}
