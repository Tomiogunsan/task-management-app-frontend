export type IProject = {
  task: string[];
  teamMembers: string[];
  _id: string;
  tasks: string[];
  name: string;
  description: string;
  dateCreated: string;
  __v: 0;
};

export type IGetProjectResponse = {
  status: string;
  data: {
    project: IProject[];
  };
};

export type ICreateProjectResponse = {
  status: string;
  data: {
    project: IProject[];
  };
};

export type IDeleteProjectResponse = {
  status: string;
  message: string;
};
