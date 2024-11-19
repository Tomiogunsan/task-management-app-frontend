export type IAddTeamQuery = {
  name: string;
  description: string;
};

export type IGetMemberDetailsQuery = {
  teamId: string;
  memberId: string;
};

export type IUpdateMemberTaskQuery = {
  projectId: string;
  taskId: string;
};

export type IGetTeamQuery = {
  teamId?: string
}