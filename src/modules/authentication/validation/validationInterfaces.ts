export type IRegisterSchemaProps = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type ILoginSchemaProps = {
  email: string;
  password: string;
};
