import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const AuthorDetails = ({ pfpUrl, displayName }: any) => (
  <div className="flex items-center space-x-3">
    <Avatar className="size-8">
      <AvatarImage src={pfpUrl} />
      <AvatarFallback>{displayName}</AvatarFallback>
    </Avatar>

    <span className="font-inter text-sm font-light">{displayName}</span>
  </div>
);

export default AuthorDetails;
