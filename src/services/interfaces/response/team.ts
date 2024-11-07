export type IProject = {
  _id: string;
  name: string;
};

export type ITeams = {
  members: string[];
  projects: IProject[];

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
  projects: IProject[];
  tasks: [];
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

export type IAssignProjectErrorResponse = {
  status: string;
  message: string;
};

export type IAssignProjectResponse = {
  status: string;
  message: string;
  data: {
    team: ITeams;
  };
};

export type IMemberTask = {
  status: string;
  _id: string;
  name: string;
  description: string;
  dateCreated: string;
  project: IProject[];
};

export type IGetMemberDetailsResponse = {
  status: string;
  data: {
    member: {
      notificationPreferences: {
        emailNotifications: boolean;
      };
      role: string;
      projects: string[];
      tasks: IMemberTask[];
      teams: [];
      _id: string;
      name: string;
      email: string;
      createdAt: string;
      __v: 3;
    };
  };
};



export type IUpdateMemberTaskResponse = {
  status: string;
  message: string;
};

export type IUpdateMemberTaskErrorResponse = {
  status: string;
  message: string;
};
