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
