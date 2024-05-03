import CreatePostButton from './CreatePostButton';
import UserMenu from './UserMenu';

const SignedInSection = () => (
  <div className="flex gap-2">
    <CreatePostButton />
    <UserMenu />
  </div>
);

export default SignedInSection;
