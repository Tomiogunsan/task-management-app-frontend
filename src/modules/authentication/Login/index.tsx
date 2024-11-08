import AuthLayout from "@components/Layout/AuthLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "shared/Button";
import ControlledInput from "shared/Input/ControlledInput";
import ControlledInputPassword from "shared/InputPassword/ControlledInputPassword";
import { ILoginSchemaProps } from "../validation/validationInterfaces";
import { loginSchema } from "../validation";
import { useLoginMutation } from "@services/auth.service";

import { AuthPaths, BasePaths } from "@constants/path";
import { Link, useNavigate } from "react-router-dom";
import {
  ILoginErrorResponse,
  ILoginResponse,
} from "@services/interfaces/response/auth";
import { toastAlert } from "@utils/toastConfig";

import { setToken } from "helpers/auth";
import CircularProgress from "shared/CircularProgress";

const Login = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<ILoginSchemaProps>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const [login, { isLoading }] = useLoginMutation();
  const handleSubmitForm = async (data: ILoginSchemaProps) => {
    try {
      const res = (await login(data).unwrap()) as unknown as ILoginResponse;

      toastAlert.success("Logged in successfully");
      setToken(res.token);
      navigate(BasePaths.USER());
    } catch (error) {
      const { message } = error as unknown as ILoginErrorResponse;
      toastAlert.error(message || "Incorrect email or password");
    }
  };

  return (
    <AuthLayout
      label="Log in to your account "
      text={<p>Welcome back! Please enter your details</p>}
    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
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

        <Button type="submit" className="bg-blue-800 text-[#fff] w-full mt-4">
          {isLoading ? (
            <div>
              <CircularProgress />{" "}
            </div>
          ) : (
            " Login"
          )}
        </Button>
        <p className="pt-4 text-center text-gray-400">
          Not registered yet?{" "}
          <span className="text-[#FF8600] font-bold">
            <Link to={`/${AuthPaths.REGISTER}`}>Register here</Link>
          </span>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
