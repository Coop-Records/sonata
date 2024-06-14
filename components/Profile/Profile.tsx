'use client';

import { useEffect } from 'react';
import BaseInfo from './BaseInfo';
import Notes from './Notes';
import Songs from './Songs';
import TopSong from './TopSong';
import Followers from './Followers';

const Profile = () => {
  useEffect(() => {
    const init = async () => {};
    init();
  }, []);

  return (
    <section className="container mx-auto max-w-3xl space-y-4 mb-4 mt-8">
      <BaseInfo />
      <div className="flex gap-4">
        <Songs />
        <Notes />
        <TopSong />
      </div>
      <Followers />
    </section>
  );
};

export default Profile;
