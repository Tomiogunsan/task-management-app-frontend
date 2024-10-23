export type ITeams = {
  members: string[];
  projects: {
    _id: string;
    name: string;
  };

  _id: string;
  name: string;
  description: string;
  dateCreated: string;
};

export type IGetTeamResponse = {
  status: string;
  data: {
    teams: ITeams[];
  };
};

export type IMembers = {
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

export type IGetMembersResponse = {
  status: string;
  data: {
    members: IMembers[];
  };
};

export type IAddMemberErrorResponse = {
  status: string;
  message: string;
};

export type IAddMemberResponse = {
  status: string;
  message: string;
};
