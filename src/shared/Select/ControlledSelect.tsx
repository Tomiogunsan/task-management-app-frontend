import { Controller, FieldValues } from 'react-hook-form';
import { IControlledSelect } from './interface';
import Select from '.';

const ControlledSelect = <TFieldValue extends FieldValues>(
  props: IControlledSelect<TFieldValue>,
) => {
  const { control, name: cname, ...rest } = props;
  return (
    <Controller
      control={control}
      name={cname}
      render={({ field: { ref: _ref, ...fields }, fieldState }) => (
        <Select
          {...fields}
          {...rest}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};

export default ControlledSelect;
