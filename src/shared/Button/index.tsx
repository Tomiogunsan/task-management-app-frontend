import { twMerge } from "tailwind-merge";
import { IButtonProps } from "./interface";
import { Button as MUIButton } from "@mui/material";

const Button = ({
  color,
  variant,
  className,
  loading,
  children,
  ...rest
}: IButtonProps) => {
  return (
    <MUIButton
      variant={variant}
      className={twMerge(
        className,
        "!border capitalize font-[500] text-[16px] leading-5 py-[10px] rounded-[8px] hover:bg-[#2809c3]"
      )}
      {...rest}
      color={color}
    >
      {loading ? <p>Loading....</p> : children}
    </MUIButton>
  );
};

Button.defaultProps = {
  variant: "contained",
};

export default Button;
