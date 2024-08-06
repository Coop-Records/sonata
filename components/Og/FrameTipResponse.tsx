/* eslint-disable @next/next/no-img-element */
import formatNumber from "@/lib/formatNumber";

interface Props {
  sender: string;
  receiver: string;
  daily: number | string;
  tipAmount: number | string;
  remaining: number | string;
};

function FrameTipResponse(props: Props) {
  const logo2 = 'https://sonata.tips/images/logo2.png';
  return (
    <div
      style={{
        background: '#fff',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #eaeaea',
        textTransform: 'uppercase'
      }}>
      <img src='https://sonata.tips/images/notes.jpg' alt='' tw="w-[40%]" />

      <div tw="size-full flex flex-col">
        <h1 tw="underline">Success</h1>

        <h1 tw="mt-0 mb-5">Tip by @{props.sender}</h1>
        <h1 tw="m-0">@{props.receiver}</h1>

        <div tw="flex my-6">
          <div tw="flex flex-col">
            <h1 tw="m-0">allowance</h1>
            <div tw="flex items-center">
              <h1 tw="m-0">{formatNumber(props.daily)}</h1>
              <img src={logo2} alt='' height={25} width={25} />
            </div>
          </div>

          <div tw="w-1 h-full mx-8 bg-slate-300" />

          <div tw="flex flex-col">
            <h1 tw="m-0">remaining</h1>

            <div tw="flex items-center">
              <h1 tw="m-0">{formatNumber(props.remaining)}</h1>
              <img src={logo2} alt='' height={25} width={25} />
            </div>
          </div>
        </div>

        <div tw="flex items-center">
          <h1>used amount: {formatNumber(props.tipAmount)}</h1>
          <img src={logo2} alt='' height={25} width={25} />
        </div>
      </div>
    </div>
  );
}

export default FrameTipResponse;