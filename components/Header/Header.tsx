import SignInButton from '../SignInButton';
import Title from './Title';

export default function Header() {
  return (
    <div>
      <div className="container flex justify-end py-4">
        <SignInButton />
      </div>
      <Title />
    </div>
  );
}
