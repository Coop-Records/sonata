import { useState } from 'react';
import DegenTipping from './DegenTipping';
import NotesTipping from './NotesTipping';
import { CloseModal } from '@/types/Modal';

const TippingModal = ({ closeModal }: { closeModal: CloseModal }) => {
  const [activeTab, setActiveTab] = useState<'DEGEN' | 'NOTES'>('DEGEN');

  const switchTab = (tab: 'DEGEN' | 'NOTES') => {
    setActiveTab(tab);
  };

  return (
    <div className="p-4 text-sm">
      <div className="flex border-b-2 text-sm">
        <button
          className={`flex-1 rounded-tl-lg p-3 transition-all duration-300 ${
            activeTab === 'DEGEN'
              ? 'border-blue-500 bg-blue-100 text-blue-700 shadow-md'
              : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
          onClick={() => switchTab('DEGEN')}
        >
          Tip in $DEGEN
        </button>
        <button
          className={`flex-1 rounded-tr-lg p-3 transition-all duration-300 ${
            activeTab === 'NOTES'
              ? 'border-blue-500 bg-blue-100 text-blue-700 shadow-md'
              : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
          onClick={() => switchTab('NOTES')}
        >
          Tip in $NOTES
        </button>
      </div>
      <div className="mt-4">
        {activeTab === 'DEGEN' ? (
          <DegenTipping closeModal={closeModal} />
        ) : (
          <NotesTipping closeModal={closeModal} />
        )}
      </div>
    </div>
  );
};

export default TippingModal;
