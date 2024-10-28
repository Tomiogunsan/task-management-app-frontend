export type IAddTeamQuery = {
  name: string;
  description: string;
};

export type IAssignTaskToMemberQuery = {
  projectId: string;
  taskId: string;
  userId: string;
};
