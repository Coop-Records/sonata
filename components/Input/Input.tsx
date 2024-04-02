const Input = ({ onChange, onEnterPress, placeholder = '' }: any) => {
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
      className="min-w-[444px] border border-black focus:border-black focus:outline-black w-[30vw] px-1 py-2 focus:ring-0 rounded"
    />
  );
};

export default Input;
