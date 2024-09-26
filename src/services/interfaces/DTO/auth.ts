export type IRegisterDTO ={
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export type ILoginDTO = {
    email: string;
    password: string;
}