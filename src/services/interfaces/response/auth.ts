export type IUserDecoded = {
  user: {
    email: string;
    name: string;
    role: string;
    id: string;
    team: string[]
  };
};

export type IRegisterResponse = {
  status: string;
  message: string;
  token: string;
  data: {
    user: {
      notificationPreferences: {
        emailNotifications: boolean;
      };
      role: string;
      projects: [];
      teams: [];
      _id: string;
      name: string;
      email: string;
      createdAt: string;
      __v: 0;
    };
  };
};

export type ILoginErrorResponse = {
  status: string;
  message: string;
};

export type ILoginResponse = {
  status: string;
  message: string;
  token: string;
};
