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
      className="w-[30vw] min-w-[444px] rounded border border-black px-1 py-2 focus:border-black focus:outline-black focus:ring-0"
    />
  );
};

export default Input;
