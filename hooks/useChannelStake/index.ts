import useStake from "./useStake";
import useUnstake from "./useUnstake";

const useChannelStake = () => {
  const { unstake } = useUnstake();
  const { stake } = useStake();

  return { unstake, stake };
};

export default useChannelStake;