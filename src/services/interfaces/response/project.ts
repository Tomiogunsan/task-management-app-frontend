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

export type ITaskProject = {
  _id: string;
  name: string;
};

export type ITask = {
  status: string;
  assignedUser: { _id: string; name: string };
  project: ITaskProject[];
  _id: string;
  name: string;
  description: string;
  dateCreated: string;
  __v: 0;
};

export type IGetAllProjectTask = {
  status: string;
  data: {
    tasks: ITask[];
  };
};

export type ICreateProjectTaskResponse = {
  status: string;
  data: {
    task: ITask;
  };
};

export type ICreateProjectTaskErrorResponse = {
  status: string;
  message: string;
};

export type IDeleteTaskResponse = {
  status: string;
  message: string;
};

