import { SelectProps } from '@mui/material';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import { IFieldHelperTextProps } from 'shared/FieldHelperText/interface';
import { IFieldLabelHelperTextProps } from 'shared/FieldLabelHelperText/interface';
import { IBaseControlledField } from 'shared/interface';

export type ISelectOption = {
  label: string;
  value: string | number;
  onClick?: () => void;
  disabled?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  labelNode?: React.ReactNode;
};

export type ISelectProps = Omit<
  SelectProps,
  'onChange' | 'placeholder' | 'renderValue'
> &
  IFieldHelperTextProps & {
    label?: string;
    labelContainerClassName?: string;
    containerClassName?: string;
    labelClassName?: string;
    labelEndAdornment?: React.ReactNode;
    labelHelperTextProps?: Omit<IFieldLabelHelperTextProps, 'children'>;
    labelHelperText?: React.ReactNode;
    actionText?: React.ReactNode;
    options: ISelectOption[];
    StartIconComponent?: React.ElementType;
    onChange?: (
      // eslint-disable-next-line no-unused-vars
      value: ISelectOption['value'] | ISelectOption['value'][],
    ) => void;
    showSelectAll?: boolean;
    showChipPreview?: boolean;
    placeholder?: React.ReactNode;
    searchable?: boolean;
    EoL?: {
      show?: boolean;
      // eslint-disable-next-line no-unused-vars
      onVisible: (entryItem: IntersectionObserverEntry) => void;
      showLoader: boolean;
    };
    // eslint-disable-next-line no-unused-vars
    onSearch?: (value: string) => void;
    // eslint-disable-next-line no-unused-vars
    renderValue?: (
      // eslint-disable-next-line no-unused-vars
      selected: unknown,
      // eslint-disable-next-line no-unused-vars
      options: ISelectOption | Record<string, ISelectOption>,
    ) => React.ReactNode | string | number;
    renderedValueClassName?: string;
    previewMode?: boolean;
  };

export type IControlledSelect<TFieldValues extends FieldValues> =
  IBaseControlledField<TFieldValues> &
    Omit<ISelectProps, 'value' | 'name' | 'onChange'>;
