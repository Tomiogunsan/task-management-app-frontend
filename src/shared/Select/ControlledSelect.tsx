import { Controller, FieldValues } from 'react-hook-form';
import Select from '.';
import { IControlledSelect } from './interface';

const ControlledSelect = <TFieldValue extends FieldValues>(
  props: IControlledSelect<TFieldValue>,
) => {
  const { control, name: cname, ...rest } = props;
  return (
    <Controller
      control={control}
      name={cname}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { ref: _ref, ...fields }, fieldState }) => (
        <Select
          {...rest}
          {...fields}
          error={(fieldState.error?.message || '').length > 0}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};

export default ControlledSelect;
