import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';

const Header = () => (
  <header className="container flex items-center gap-4 sm:py-4">
    <HeaderDesktop className="max-md:hidden" />
    <HeaderMobile className="md:hidden" />
  </header>
);

export default Header;
