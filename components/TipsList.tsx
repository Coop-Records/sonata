import HorizontalScroller from './scroller/HorizontalScroller';
import useTipsBanner from '@/hooks/useTipsBanner';

const TipsList = () => {
  const { tips } = useTipsBanner();

  return <HorizontalScroller items={tips} />;
};

export default TipsList;
