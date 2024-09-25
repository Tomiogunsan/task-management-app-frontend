import { Controller, FieldValues } from "react-hook-form";
import { IControlledInputPassword } from "./interface";
import InputPassword from ".";

const ControlledInputPassword = <TFieldValue extends FieldValues>(
  props: IControlledInputPassword<TFieldValue>
) => {
  const { control, name: cname, ...rest } = props;
  return (
    <Controller
      control={control}
      name={cname}
      render={({ field: { ...fields }, fieldState }) => (
        <InputPassword
          {...fields}
          {...rest}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};

export default ControlledInputPassword;
