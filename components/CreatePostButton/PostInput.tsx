import { ChangeEvent, ReactNode } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Props {
  action: ReactNode;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder: string;
  className?: string;
}

function PostInput({ action, onChange, value, placeholder, className }: Props) {
  return (
    <div
      className={cn(
        'flex grow items-center justify-between rounded-full bg-secondary p-3',
        className,
      )}
    >
      <Input
        value={value}
        className="border-none bg-transparent text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder={placeholder}
        onChange={onChange}
      />
      {action}
    </div>
  );
}

export default PostInput;
