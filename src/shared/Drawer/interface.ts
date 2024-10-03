import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { IButtonProps } from 'shared/Button/interface';

export type IModalActionProps = {
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
  onClose: () => void;
  children?: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
  containerClassName?: string;
};

export type IModalProps = IModalBaseProps & {
  icon?: React.ReactNode;
  subHeader?: React.ReactNode;
  action?: IModalActionProps;
  secondaryAction?: IModalActionProps;
  contentClassName?: string;
};

export type IFilterModalProps<TFieldValues extends FieldValues> =
  IModalBaseProps & {
    action?: IModalActionProps;
    showClearAll?: boolean;
    form: UseFormReturn<TFieldValues>;
  };
