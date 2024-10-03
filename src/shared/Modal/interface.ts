import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { IButtonProps } from 'shared/Button/interface';

type IModalActionProps = {
  show?: boolean;
  text?: React.ReactNode;
  variant?: IButtonProps['variant'];
  color?: IButtonProps['color'];
  onClick?: (_data: any) => void;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  loadingText?: React.ReactNode;
};

export type IModalBaseProps = {
  onClose?: () => void;
  children?: React.ReactNode;
  header?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  hideCancelIcon?: boolean;
  bgClassName?: string;
  fgContentContainerClassName?: string;
  bodyClassName?: string;
};

export type IModalProps = Omit<IModalBaseProps, 'actions'> & {
  subHeader?: React.ReactNode;
  icon?: React.ReactNode;
  action?: IModalActionProps;
  secondaryAction?: IModalActionProps;
  actionsClassName?: string;
  tabIndicator?: {
    length: number;
    currentTab: number;
  };
};

export type IFilterModalProps<TFieldValues extends FieldValues> =
  IModalBaseProps & {
    action?: IModalActionProps;
    showClearAll?: boolean;
    form: UseFormReturn<TFieldValues>;
  };
