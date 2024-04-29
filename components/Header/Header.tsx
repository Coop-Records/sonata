import SignInButton from '../SignInButton';
import Title from './Title';

export default function Header() {
  return (
    <div>
      <div className="container flex items-center justify-between py-4">
        <Title />
        <SignInButton />
      </div>
    </div>
  );
}
