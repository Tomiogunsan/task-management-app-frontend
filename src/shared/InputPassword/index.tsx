import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import Input from "shared/Input";
import { IInputPasswordProps } from "./interface";
import { twMerge } from "tailwind-merge";

const InputPassword = (props: IInputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      {...props}
      type={showPassword ? "text" : "password"}
      endAdornment={
        showPassword ? (
          <FaRegEye onClick={() => setShowPassword(false)} />
        ) : (
          <FaEyeSlash onClick={() => setShowPassword(true)} />
        )
      }
      endAdornmentProps={{
        ...props.endAdornmentProps,
        className: twMerge(
          "!border-none cursor-pointer  ",
          props.endAdornmentProps?.className
        ),
      }}
    />
  );
};

export default InputPassword;
