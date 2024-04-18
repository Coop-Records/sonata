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
    <Button className="text-black border-black border-2" onClick={tip}>
      TIP
    </Button>
  ) : (
    <></>
  );
};

export default TipButton;
