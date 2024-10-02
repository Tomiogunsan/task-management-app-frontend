/* eslint-disable no-unused-vars */
import React, { ReactNode } from 'react';
import { IFieldHelperTextProps } from 'shared/FieldHelperText/interface';

export type IDropdownOption = {
  label: string;
  value: string;
};

export type IDropdownProps = Omit<IFieldHelperTextProps, 'children'> & {
  className?: string;
  children:
    | (({ close }: { close: () => void }) => React.ReactNode)
    | React.ReactNode;
  trigger?: React.ReactNode;
  onOpen?: (e: React.MouseEvent) => void;
  onClose?: (e: React.MouseEvent) => void;
  disabled?: boolean;
};

export type IDropdownItemsProps = {
  items?: {
    // eslint-disable-next-line no-unused-vars
    onClick: (close: () => void) => void;
    label: string | ReactNode;
    className?: string;
    hide?: boolean;
  }[];
  // eslint-disable-next-line no-unused-vars
  close?: () => void;
  closeOnItemClick?: boolean;
};
