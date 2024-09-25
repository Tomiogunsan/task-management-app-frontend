import AuthLayout from "@components/Layout/AuthLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "shared/Button";
import ControlledInput from "shared/Input/ControlledInput";
import ControlledInputPassword from "shared/InputPassword/ControlledInputPassword";
import { ILoginSchemaProps } from "../validation/validationInterfaces";
import { loginSchema } from "../validation";


const Login = () => {
     const { control, handleSubmit } = useForm<ILoginSchemaProps>({
       defaultValues: {
         email: "",
         password: "",
       },
       resolver: yupResolver(loginSchema),
     });

      const handleSubmitForm = (data: ILoginSchemaProps) => {
        console.log(data);
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
          Login
        </Button>
      </form>
    </AuthLayout>
  );
}

export default Login