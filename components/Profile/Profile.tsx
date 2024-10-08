import BaseInfo from './BaseInfo';
import Notes from './Notes';
import Songs from './Songs';
import TopSong from './TopSong';
import Followers from './Followers';

const Profile = () => (
  <section className="mx-auto mb-4 mt-8 space-y-4">
    <BaseInfo />
    <div className="flex gap-4">
      <Songs />
      <Notes />
      <TopSong />
    </div>
    <Followers />
  </section>
);

export default Profile;
