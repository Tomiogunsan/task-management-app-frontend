import { Controller, FieldValues } from 'react-hook-form';
import { IControlledInputProps } from './interface';
import Input from '.';

const ControlledInput = <TFieldValue extends FieldValues>(
  props: IControlledInputProps<TFieldValue>,
) => {
  const { name, control, onKeyDown, ...rest } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Input
          {...rest}
          {...field}
          error={(fieldState.error?.message || '').length > 0}
          helperText={fieldState.error?.message}
          onKeyDown={onKeyDown}
          // ref={ref => {
          //   field.ref(ref);

          // }}
        />
      )}
    />
  );
};

export default ControlledInput;
