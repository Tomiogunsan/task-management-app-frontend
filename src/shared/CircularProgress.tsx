import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  size?: number;
  color?: string;
  className?: string;
};

const CircularProgress = ({
  size,
  color,
  className,
  style,
  ...rest
}: Props) => {
  return (
    <span
      {...rest}
      className={twMerge('animate-spin duration-500 icon-loading', className)}
      style={{
        ...style,
        color,
        fontSize: `${size}px`,
      }}
    />
  );
};

CircularProgress.defaultProps = {
  size: 20,
  color: '#0000FF',
};

export default CircularProgress;
