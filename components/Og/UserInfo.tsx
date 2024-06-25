const UserInfo = ({ profilePfp, rank, encodedUsername }: any) => {
  return (
    <div tw="flex flex-col mt-10 ml-1">
      <p tw="text-[#949494] text-xl" style={{ fontWeight: 400 }}>
        Posted By
      </p>
      <div tw="flex">
        <div tw="flex items-center rounded-full">
          <img
            tw="rounded-full"
            src={profilePfp}
            alt="warpcast"
            width={50}
            height={50}
            loading="lazy"
          />
        </div>
        {rank && (
          <div tw="flex items-center justify-center bg-[#F6F6F6] rounded-full w-[100px] ml-5">
            <p tw="text-xl ml-2 m-0 text-[#333536]" style={{ fontWeight: 600 }}>
              #{rank}
            </p>
          </div>
        )}
        <div tw="flex items-center justify-center bg-[#EEE4FE] rounded-full max-w-[220px] w-fit px-5 h-12 ml-5">
          <img
            src="https://i.imgur.com/JXN6jYv.png"
            alt="warpcast"
            width={28}
            height={24}
            loading="lazy"
          />
          <p tw="text-[#8b49f7] text-xl ml-2" style={{ fontWeight: 600 }}>
            {encodedUsername}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;