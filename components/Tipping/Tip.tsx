import { useModal } from '@/hooks/useModal';
import Image from 'next/image';
import Button from '../Button';
import TippingModal from './TippingModal';

const TipButton = ({ verifications }: { verifications: string[] }) => {
  const { openModal, closeModal } = useModal();

  const tip = () => {
    openModal(<TippingModal closeModal={closeModal} />, 'Leave a Tip');
  };

  return verifications && verifications.length > 0 ? (
    <div className="w-full flex justify-between items-center text-xs">
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
        onClick={tip}
      >
        TIP
      </Button>
    </div>
  ) : (
    <></>
  );
};

export default TipButton;
