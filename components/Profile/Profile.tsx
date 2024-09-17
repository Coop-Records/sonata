import BaseInfo from './BaseInfo';
import Notes from './Notes';
import Songs from './Songs';
import TopSong from './TopSong';

const Profile = () => (
  <section className="mx-auto mb-4 mt-8 space-y-4 pr-6">
    <BaseInfo />
    <div className="flex w-full justify-between">
      <Songs />
      <Notes />
      <TopSong />
    </div>
  </section>
);

export default Profile;
