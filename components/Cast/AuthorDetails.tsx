import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const AuthorDetails = ({ pfpUrl, displayName }: any) => (
  <div className="flex items-center space-x-3">
    <Avatar className="size-8">
      <AvatarImage src={pfpUrl} />
      <AvatarFallback>{displayName}</AvatarFallback>
    </Avatar>

    <span className="text-sm font-light font-inter">{displayName}</span>
  </div>
);

export default AuthorDetails;
