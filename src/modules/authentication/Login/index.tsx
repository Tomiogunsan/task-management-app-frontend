import AuthLayout from "@components/Layout/AuthLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "shared/Button";
import ControlledInput from "shared/Input/ControlledInput";
import ControlledInputPassword from "shared/InputPassword/ControlledInputPassword";
import { ILoginSchemaProps } from "../validation/validationInterfaces";
import { loginSchema } from "../validation";
import { useLoginMutation } from "@services/auth.service";
import CircularProgress from "shared/CircularProgress";

const Login = () => {
  const { control, handleSubmit } = useForm<ILoginSchemaProps>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const [login, { isLoading }] = useLoginMutation();
  const handleSubmitForm = async (data: ILoginSchemaProps) => {
    console.log(data);
    try {
      const res = await login(data).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout
      label="Log in to your account "
      text={<p>Welcome back! Please enter your details</p>}
    >
      <form
        onSubmit={handleSubmit(handleSubmitForm, (err) => console.log(err))}
      >
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
          {isLoading ? <CircularProgress color="#fff" /> : " Login"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
