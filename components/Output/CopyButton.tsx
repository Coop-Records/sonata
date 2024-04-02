import { useProvider } from '@/providers/Provider';
import Button from '../Button';
import CopyIcon from './CopyIcon';
import CheckIcon from './CheckIcon';
import { toast } from 'react-toastify';

const CopyButton = ({ text }: { text: string }) => {
  const { copied, setCopied } = useProvider();

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard');
      setCopied(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button onClick={handleClick} size="sm" variant="ghost" className="p-1 rounded-3xl">
      {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="w-4 h-4" />}
      <span className="sr-only">Copy</span>
    </Button>
  );
};

export default CopyButton;
