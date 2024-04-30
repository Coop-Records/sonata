import { DESCRIPTION, TITLE } from '@/lib/consts';
export default function Title() {
  return (
    <div className="space-y-2 text-center md:space-y-3">
      <p className="text-xl font-bold tracking-tighter sm:text-5xl">{TITLE}.</p>
      <p className="text-sm font-bold md:text-xl">{DESCRIPTION}.</p>
    </div>
  );
}
