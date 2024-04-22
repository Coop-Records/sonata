import useModals from '@/hooks/useModal';
import Button from '../Button';
import Modal from '../Modal/Modal';
import TippingModal from './TippingModal';

const TipButton = ({ verifications }: { verifications: string[] }) => {
  const { openModal, closeModal, isOpen } = useModals();

  const tip = () => {
    openModal(<TippingModal closeModal={closeModal} />);
  };

  return verifications && verifications.length > 0 ? (
    <div className="w-full flex justify-between items-center text-xs">
      <div className="inline-flex gap-4">
        <div>0 *NOTES LOGO*</div>
        <div className="text-xs">0 *DEGEN LOGO*</div>
      </div>
      <Button
        className="bg-transparent hover:bg-gray-100 text-black py-1 px-3 border border-gray-300 rounded"
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
