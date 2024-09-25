import { FieldValues } from "react-hook-form";
import { IBaseControlledField, IInputProps } from "shared/Input/interface";


export type IInputPasswordProps = Omit<IInputProps, "type" | "endAdornment">;

export type IControlledInputPassword<TFieldValues extends FieldValues> =
  IBaseControlledField<TFieldValues> &
    Omit<IInputPasswordProps, "value" | "name">;
