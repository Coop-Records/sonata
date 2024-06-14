
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { cn } from '@/lib/utils';

export default function UserDetailsInfo() {
//   const profileUrl = `https://warpcast.com/test`;
  return (
    

    <div className="music-info">
        <div className="info-section">
            <div className="info-item">
            <span className="info-number">10</span>
            <span className="info-label">Songs</span>
            </div>
            <div className="info-item">
            <span className="info-number">25.6k</span>
            <span className="info-label">Notes</span>
            </div>
            <div className="info-item">
                <div className="flex">

                    <img src="/images/top-song.png" alt="Top Song" className="top-song-image" />
                    <span>High on Coinba...</span>

                </div>
                
            <span className="info-label">Top Song</span>
            </div>
        </div>
        <div className="followers">
            <div className="follower-images">
                <img src="/images/follower1.png" alt="Follower 1" className="follower-image" />
                <img src="/images/follower2.png" alt="Follower 2" className="follower-image" />
                <img src="/images/follower3.png" alt="Follower 3" className="follower-image" />
            </div>
            <div className="follower-text">
            Followed by @seb, @coop, @akhil and 50 more friends.
            </div>
        </div>
    </div>
   
    
  );
}
