import { DESCRIPTION, TITLE } from '@/lib/consts';
export default function Title() {
  return (
    <div className="space-y-2 text-center md:space-y-3">
      <p className="text-4xl font-bold tracking-tighter sm:text-5xl">{TITLE}.</p>
      <p className="font-bold md:text-xl">{DESCRIPTION}.</p>
    </div>
  );
}
