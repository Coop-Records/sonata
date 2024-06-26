import React from 'react';
import Header from './Header';
import ChannelInfo from './ChannelInfo';
import MetadataInfo from './MetadataInfo';
import UserInfo from './UserInfo';
import Footer from './Footer';

const CastImageLayout = ({
  encodedUsername,
  profilePfp,
  metadata,
  channelLabel,
  channelIcon,
  points,
  rank,
}: any) => (
  <div
    style={{
      background: '#fff',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      border: '1px solid #eaeaea',
    }}
  >
    <div tw="flex flex-col ml-[100px] mt-[50px]">
      <Header />
      <ChannelInfo channelIcon={channelIcon} channelLabel={channelLabel} />
      <MetadataInfo metadata={metadata} points={points} />
      <UserInfo profilePfp={profilePfp} rank={rank} encodedUsername={encodedUsername} />
    </div>
    <Footer />
  </div>
);

export default CastImageLayout;
