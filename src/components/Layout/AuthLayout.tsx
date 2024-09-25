import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  label: string;
  text: string;
};
const AuthLayout: FC<Props> = ({ children, label, text }) => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-300">
      <div className="relative -top-[7vh] bg-white z-10  py-[32px] px-[40px] w-[440px] filter rounded-[12px]">
        <div className=" text-center flex flex-col items-center mb-9">
          {/* <Link to={AuthPagePath.signin()} className="w-max mb-6">
            <Logo className="w-full max-w-[169.333px]" />
          </Link> */}
          <p className="mb-2 text-gray-800 font-[600] tracking-tight ">
            {label}
          </p>
          <p className="text-gray-400 text-[14px]">{text}</p>
        </div>
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
