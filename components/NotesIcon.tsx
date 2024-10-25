import Image from 'next/image';

const NotesIcon = ({ size = 36 }: { size?: number }) => {
  return (
    <Image
      src="/images/notes.jpg"
      alt="Sonata Logo"
      width={size}
      height={size}
      className="aspect-square shrink-0 rounded-full"
    />
  );
};

export default NotesIcon;
