import { cn } from '@/lib/utils';

const Input = ({ onChange, onEnterPress, placeholder = '', className }: any) => {
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      if (onEnterPress) {
        onEnterPress(e.target.value);
      }
    }
  };

  return (
    <input
      onChange={onChange}
      placeholder={placeholder}
      onKeyDown={handleKeyDown}
      className={cn(
        'w-[30vw] sm:min-w-[444px] rounded border border-black px-1 py-2 focus:border-black focus:outline-black focus:ring-0',
        className,
      )}
    />
  );
};

export default Input;
