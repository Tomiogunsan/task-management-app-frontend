export type ICreateProjectQuery = {
  name: string;
  description: string;
};

export type ICreateProjectTaskQuery = {
  id: string;
  name: string;
  description: string;
};

export type IDeleteTaskQuery = {
  projectId: string;
  taskId: string;
};

export type IEditTaskQuery = {
  projectId: string;
  taskId: string;
} & ICreateProjectQuery;

export type IGetAllProjectTaskQuery = {
  id: string;
  assignedUser?: string;
};
