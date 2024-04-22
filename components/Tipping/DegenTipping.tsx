import { useState } from 'react';

const DegenTipping = () => {
  const [degenAmount, setDegenAmount] = useState<string>('');

  const setPresetAmount = (amount: number) => {
    setDegenAmount(amount.toString());
  };

  const submitTip = () => {
    // TODO: Submit tip amount as a comment
  };

  return (
    <div>
      {/* Preset buttons for tipping amounts */}
      50,000 Available
      <div className="flex space-x-4 mb-4">
        <button
          className="bg-blue-500 text-white rounded px-4 py-2"
          onClick={() => setPresetAmount(1)}
        >
          Tip 1 DEGEN
        </button>
        <button
          className="bg-blue-500 text-white rounded px-4 py-2"
          onClick={() => setPresetAmount(10)}
        >
          Tip 10 DEGEN
        </button>
        <button
          className="bg-blue-500 text-white rounded px-4 py-2"
          onClick={() => setPresetAmount(100)}
        >
          Tip 100 DEGEN
        </button>
      </div>
      {/* Input for custom amount */}
      <input
        type="text"
        placeholder="Custom amount"
        value={degenAmount}
        onChange={(e) => setDegenAmount(e.target.value)}
        className="border-2 border-gray-300 rounded px-4 py-2 w-full"
      />
      <button className="bg-blue-500 text-white rounded px-4 py-2 w-full" onClick={submitTip}>
        Submit Tip
      </button>
    </div>
  );
};

export default DegenTipping;
