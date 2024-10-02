import { twMerge } from 'tailwind-merge';
import { Menu } from '@mui/material';
import { IDropdownProps } from './interface';
import React, { useRef, useState } from 'react';


const Dropdown = (props: IDropdownProps) => {
  const {
    className,
    disabled,
    children,
    trigger,
   
    onOpen,
    onClose,
  } = props;

  const handleClose = () => {
    setShowDropdown(false);
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const anchorWidth = anchorRef.current?.offsetWidth;
  const childrenProps = {
    close: handleClose,
  };
  return (
    <div
      className={twMerge('w-full max-w-full h-max overflow-hidden', className)}
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <div
        ref={anchorRef}
        onClick={e => {
          e.stopPropagation();
          if (!disabled) {
            setShowDropdown(!showDropdown);
            if (showDropdown) {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              onClose && onClose(e);
            } else {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              onOpen && onOpen(e);
            }
          }
        }}
        className="w-full"
      >
        {trigger}
      </div>
      <Menu
        anchorEl={anchorRef.current}
        open={showDropdown}
        onClose={handleClose}
        className={'w-full max-w-full'}
        slotProps={{
          paper: {
            style: {
              minWidth: `${anchorWidth ? `${anchorWidth}px` : 'auto'}`,
            },
          },
        }}
      >
        {(() => {
          if (React.isValidElement(children)) {
            return React.cloneElement(children, childrenProps);
          } else if (typeof children === 'function') {
            return children(childrenProps);
          } else {
            return children;
          }
        })()}
      </Menu>
      {/* <FieldHelperText error={error} helperText={helperText} /> */}
    </div>
  );
};

export default Dropdown;
