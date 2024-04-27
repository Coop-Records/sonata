import { useState } from 'react';
import { toast } from 'react-toastify';

const NotesTipping = ({ closeModal }: { closeModal: Function }) => {
  const [degenAmount, setDegenAmount] = useState<string>('');

  const submitTip = (amount?: number) => {
    const finalAmount = amount ? amount.toString() : degenAmount;
    toast(`You tipped ${finalAmount} NOTES`);
    // closeModal();
  };

  return (
    <div>
      <div className="text-sm">50,000 Available</div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <button className="bg-blue-500 text-white rounded" onClick={() => submitTip(100)}>
          Tip 100 NOTES
        </button>
        <button
          className="bg-blue-500 text-white rounded"
          onClick={() => submitTip(1000)}
        >
          Tip 1000 NOTES
        </button>
        <button
          className="bg-blue-500 text-white rounded"
          onClick={() => submitTip(10000)}
        >
          Tip 10000 NOTES
        </button>
        <div>
          <input
            type="text"
            placeholder="Custom amount"
            value={degenAmount}
            onChange={(e) => setDegenAmount(e.target.value)}
            className="border-2 border-gray-300 rounded w-full text-sm"
          />
          <button
            className="bg-blue-500 text-white rounded mt-1 w-full"
            onClick={() => submitTip()}
          >
            Submit Custom Tip
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesTipping;
