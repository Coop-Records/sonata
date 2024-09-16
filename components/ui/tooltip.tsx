import React, { PropsWithChildren } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

interface Props {
  id: string;
  content: any;
  link?: string;
  className?: string;
  tipClasses?: string;
}

const Tooltip = ({
  children,
  content,
  id,
  className,
  tipClasses = '',
}: PropsWithChildren<Props>) => {
  return (
    <div className={className} data-tooltip-id={id}>
      {children}
      <ReactTooltip
        id={id}
        className={`${tipClasses}`}
        render={content}
        place="top"
        isOpen={true}
      />
    </div>
  );
};

export default Tooltip;
