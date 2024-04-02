import { useProvider } from '@/providers/Provider';
import CopyButton from './CopyButton';

const Output = () => {
  const { setupActions } = useProvider();
  const text = setupActions.length > 0 && JSON.stringify(setupActions);

  return (
    <div className="w-[444px] rounded-lg border border-black-200 p-1.5 flex items-center">
      {text && (
        <textarea
          value={text}
          className="w-full h-full bg-transparent"
          readOnly
          rows={4}
          wrap="soft"
        />
      )}
      {text && <CopyButton text={text} />}
    </div>
  );
};

export default Output;
