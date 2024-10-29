import BaseInfo from './BaseInfo';
import Notes from './Notes';
import Songs from './Songs';
import TopSong from './TopSong';

const Profile = () => (
  <section className="mx-auto mb-4 mt-8 space-y-4">
    <BaseInfo />
    <div className="flex justify-between">
      <Songs />
      <Notes />
      <TopSong />
    </div>
  </section>
);

export default Profile;
