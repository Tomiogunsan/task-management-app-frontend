export type ICreateProjectQuery = {
  name: string;
  description: string;
};


export type ICreateProjectTaskQuery = {
  id: string;
  name: string;
  description: string;
}

export type IDeleteTaskQuery = {
  projectId: string;
  taskId: string
}