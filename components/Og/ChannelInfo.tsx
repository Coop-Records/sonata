const ChannelInfo = ({ channelIcon, channelLabel }: any) => (
  <div tw="flex m-0 items-center mt-10">
    <img
      src={channelIcon}
      alt="channel Icon"
      width="40"
      height="40"
      loading="lazy"
      tw="rounded-full w-14 h-14"
      style={{ imageRendering: 'pixelated' }}
    />
    <p tw="m-0 text-3xl ml-2 text-[#333536]" style={{ fontWeight: 600 }}>
      {channelLabel}
    </p>
  </div>
);

export default ChannelInfo;
