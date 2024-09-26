import AuthLayout from "@components/Layout/AuthLayout";
import { useForm } from "react-hook-form";
import Button from "shared/Button";
import ControlledInput from "shared/Input/ControlledInput";
import ControlledInputPassword from "shared/InputPassword/ControlledInputPassword";
import { registerSchema } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";

import { IRegisterDTO } from "@services/interfaces/DTO/auth";
import { useRegisterMutation } from "@services/auth.service";

import { IRegisterResponse } from "@services/interfaces/response/auth";
import { toastAlert } from "@utils/toastConfig";
import CircularProgress from "shared/CircularProgress";

const Register = () => {
  const { control, handleSubmit } = useForm<IRegisterDTO>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    resolver: yupResolver(registerSchema),
  });

  const [register, { isLoading }] = useRegisterMutation();
  const handleSubmitForm = async (data: IRegisterDTO) => {
    console.log(data);
    try {
      const res = (await register(
        data
      ).unwrap()) as unknown as IRegisterResponse;
      console.log(res);
      toastAlert.success("Registered successfully");
    } catch (error) {
      console.log(error);
      toastAlert.error("Something went wrong");
    }
  };
  return (
    <AuthLayout
      label="Register to create an account"
      text={
        <p>
          Already registered? <span>Please Login</span>
        </p>
      }
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
          {isLoading ? <CircularProgress color="#fff" /> : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Register;
