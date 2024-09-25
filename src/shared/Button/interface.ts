import { ButtonProps } from '@mui/material';

export type IButtonProps = Omit<ButtonProps, 'color'> & {
  loading?: boolean;
  loadingText?: React.ReactNode;
  color?: 'primary' | 'error';
};
