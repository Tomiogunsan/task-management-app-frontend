import AuthLayout from "@components/Layout/AuthLayout";
import { useForm } from "react-hook-form";
import Button from "shared/Button";
import ControlledInput from "shared/Input/ControlledInput";
import ControlledInputPassword from "shared/InputPassword/ControlledInputPassword";
import { registerSchema } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegisterSchemaProps } from "../validation/validationInterfaces";

const Register = () => {
  const { control, handleSubmit } = useForm<IRegisterSchemaProps>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    resolver: yupResolver(registerSchema),
  });

  const handleSubmitForm = (data: IRegisterSchemaProps) => {
    console.log(data);
  };
  return (
    <AuthLayout
      label="Register to create an account"
      text="Already registered? Please Login "
    >
      <form
        onSubmit={handleSubmit(handleSubmitForm, (err) => console.log(err))}
      >
        <ControlledInput
          label="Enter your name"
          name="name"
          control={control}
        />
        <ControlledInput
          label="Enter your email"
          name="email"
          control={control}
        />
        <ControlledInputPassword
          label="Enter your password"
          name="password"
          control={control}
        />
        <ControlledInputPassword
          label="Confirm your password"
          name="passwordConfirm"
          control={control}
        />

        <Button type="submit" className="bg-blue-800 text-[#fff] w-full mt-4">
          Register
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Register;
