import { useState } from 'react';
import DegenTipping from './DegenTipping';
import NotesTipping from './NotesTipping';

const TippingModal = ({ closeModal }: { closeModal: Function }) => {
  const [activeTab, setActiveTab] = useState<'DEGEN' | 'NOTES'>('DEGEN');

  const switchTab = (tab: 'DEGEN' | 'NOTES') => {
    setActiveTab(tab);
  };

  return (
    <div className="p-4 text-sm">
      <div className="border-b-2 flex text-sm">
        <button
          className={`flex-1 p-3 rounded-tl-lg transition-all duration-300 ${
            activeTab === 'DEGEN'
              ? 'bg-blue-100 border-blue-500 text-blue-700 shadow-md'
              : 'bg-white hover:bg-gray-50 text-gray-500'
          }`}
          onClick={() => switchTab('DEGEN')}
        >
          Tip in $DEGEN
        </button>
        <button
          className={`flex-1 p-3 rounded-tr-lg transition-all duration-300 ${
            activeTab === 'NOTES'
              ? 'bg-blue-100 border-blue-500 text-blue-700 shadow-md'
              : 'bg-white hover:bg-gray-50 text-gray-500'
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
