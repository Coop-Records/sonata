import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';

export default function Header() {
  return (
    <header className="container flex items-center gap-4 py-4">
      <HeaderDesktop className="max-md:hidden" />
      <HeaderMobile className="md:hidden" />
    </header>
  );
}
