export type IUser = {
  notificationPreferences: {
    emailNotifications: true;
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

export type IGetUsersResponse = {
  status: string;
  data: {
    users: IUser[];
  };
};
