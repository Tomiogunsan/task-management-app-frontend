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

import { Link, useNavigate } from "react-router-dom";
import { AuthPaths } from "@constants/path";
import CircularProgress from "shared/CircularProgress";

const Register = () => {
  const navigate = useNavigate();
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
    try {
      (await register(data).unwrap()) as unknown as IRegisterResponse;

      toastAlert.success("Registered successfully");
      navigate(`/${AuthPaths.SIGNIN}`);
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
          Already registered?{" "}
          <span className="text-blue-700 font-bold">
            <Link to={`/${AuthPaths.SIGNIN}`}>Please Login</Link>
          </span>
        </p>
      }
    >
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
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
          {isLoading ? <CircularProgress /> : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Register;
