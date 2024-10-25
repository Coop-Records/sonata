import { useTipProvider } from '@/providers/TipProvider';
import { formatBigInt } from '@/lib/utils';
import NotesIcon from '@/components/NotesIcon';
import { useStakeProvider } from '@/providers/StakeProvider';

const BalanceInfo = () => {
  const { remainingTipAllocation, dailyTipAllowance } = useTipProvider();
  const { balance, stakedAmount } = useStakeProvider();
  const remainaingAllowance =
    remainingTipAllocation && formatBigInt(BigInt(remainingTipAllocation));
  const totalAllowance = dailyTipAllowance && formatBigInt(BigInt(dailyTipAllowance));
  const remainingBalance = balance && formatBigInt(balance);
  const userStake = stakedAmount && formatBigInt(BigInt(stakedAmount));
  console.log({ userStake, stakedAmount });
  const totalBalance = formatBigInt(balance + BigInt(stakedAmount));

  const stats = [
    {
      label: 'Allowance',
      value: totalAllowance && `${remainaingAllowance} / ${totalAllowance}`,
    },
    { label: 'Balance', value: remainingBalance },
    { label: 'Staked', value: userStake },
    { label: 'Total', value: totalBalance },
  ];

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {stats.map(({ label, value }) => (
        <div className="flex flex-wrap items-center gap-2" key={label}>
          <span className="font-sora">{label}:</span>
          <span className="whitespace-nowrap font-clashDisplay font-medium">{value || '-'}</span>
          <NotesIcon size={16} />
        </div>
      ))}
    </div>
  );
};

export default BalanceInfo;
