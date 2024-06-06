import { TITLE } from '@/lib/consts';

const Title = () => (
  <div className="space-y-2 text-center md:space-y-3">
    <a href="/" style={{ textDecoration: 'none' }}>
      <p className="text-4xl font-bold tracking-tighter sm:text-5xl">{TITLE}</p>
    </a>
  </div>
);

export default Title;
