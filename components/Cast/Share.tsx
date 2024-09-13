import findValidEmbed from '@/lib/findValidEmbed';
import { SupabasePost } from '@/types/SupabasePost';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import { FiShare } from 'react-icons/fi';

export default function Share({ cast }: { cast: SupabasePost }) {
  const { copy } = useCopyToClipboard();
  const handleClick = () => {
    const embed = findValidEmbed(cast);
    if (!embed) return;

    copy(`${window.location.origin}/cast/${cast.author.username}/${cast.post_hash.slice(0, 10)}`);
  };

  return (
    <button type="button" onClick={handleClick} className="text-grey">
      <FiShare className="text-md" />
    </button>
  );
}
