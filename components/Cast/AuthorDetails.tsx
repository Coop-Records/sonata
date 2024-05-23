import { User } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const AuthorDetails = ({ author }: { author: User }) => (
  <a href={`https://warpcast.com/${author.username}`} target="_blank">
    <div className="flex items-center space-x-3">
      <Avatar className="size-8">
        <AvatarImage src={author.pfp_url} />
        <AvatarFallback>{author.display_name}</AvatarFallback>
      </Avatar>

      <span className="font-inter text-sm font-light">{author.display_name}</span>
    </div>
  </a>
);

export default AuthorDetails;
