import BalanceInfo from './BalanceInfo';
import ClaimAirdropButton from './ClaimAirdropButton';
import CreatePostButton from './CreatePostButton';
import UserMenu from './UserMenu';

const SignedInSection = () => (
  <div className="flex gap-2">
    <div className="max-md:hidden">
      <BalanceInfo />
    </div>
    <CreatePostButton />
    <UserMenu />
  </div>
);

export default SignedInSection;
