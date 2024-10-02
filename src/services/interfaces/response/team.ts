

export type ITeams = {
  members: string[];
  projects: {
    _id: string;
    name: string;
  };

  _id: string;
  name: string;
};

export type IGetTeamResponse = {
  status: string;
  data: {
    teams: ITeams[];
  };
};
