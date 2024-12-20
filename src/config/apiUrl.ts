export const REGISTER = `auth/signup`;
export const LOGIN = `auth/login`;
export const GET_ALL_TEAM = `team`;
export const GET_ALL_PROJECT = `project`;
export const CREATE_PROJECT = `project`;
export const EDIT_PROJECT = (id: string) => `project/${id}`;
export const DELETE_PROJECT = (id: string) => `project/${id}`;
export const ASSIGN_PROJECT_TO_TEAM = (id: string) =>
  `team/${id}/assign-project`;
export const ADD_TEAM = `team`;
export const GET_TEAM_MEMBERS = (id: string) => `team/${id}/member`;
export const GET_ALL_USERS = `user`;
export const ADD_MEMBER_TO_TEAM = (id: string) => `team/${id}/member`;
export const GET_ALL_PROJECT_TASK = (id: string) => `project/${id}/task`;
export const CREATE_PROJECT_TASK = (id: string) => `project/${id}/task`;
export const DELETE_TASK = (projectId: string, taskId: string) =>
  `project/${projectId}/task/${taskId}`;
export const EDIT_TASK = (projectId: string, taskId: string) =>
  `project/${projectId}/task/${taskId}`;
export const ASSIGN_TASK_TO_MEMBER = (projectId: string, taskId: string) =>
  `project/${projectId}/task/${taskId}/assign`;
export const GET_MEMBER_DETAILS = (teamId: string, memberId: string) =>
  `team/${teamId}/member/${memberId}`;
export const UPDATE_STATUS = (projectId: string, taskId: string) =>
  `project/${projectId}/task/${taskId}/status`;
export const GET_ALL_MESSAGES = (teamId: string) => `message/${teamId}`;
export const SEND_MESSAGES = (teamId: string) => `message/${teamId}`;
