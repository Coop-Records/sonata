import { useState } from 'react';
import Modal from '../Modal/Modal';
import DegenTipping from './DegenTipping';
import NotesTipping from './NotesTipping';

const TippingModal = ({ closeModal }: { closeModal: Function }) => {
  const [activeTab, setActiveTab] = useState<'DEGEN' | 'NOTES'>('DEGEN');

  const switchTab = (tab: 'DEGEN' | 'NOTES') => {
    setActiveTab(tab);
  };

  return (
    <Modal close={closeModal} hideHeader>
      <div className="p-4">
        <div className="border-b-2 flex">
          <button
            className={`p-2 ${activeTab === 'DEGEN' ? 'border-b-4 border-blue-500' : ''}`}
            onClick={() => switchTab('DEGEN')}
          >
            Tip in $DEGEN
          </button>
          <button
            className={`p-2 ${activeTab === 'NOTES' ? 'border-b-4 border-blue-500' : ''}`}
            onClick={() => switchTab('NOTES')}
          >
            Tip in $NOTES
          </button>
        </div>
        <div className="mt-4">{activeTab === 'DEGEN' ? <DegenTipping /> : <NotesTipping />}</div>
      </div>
    </Modal>
  );
};

export default TippingModal;
