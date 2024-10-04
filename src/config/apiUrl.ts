export const REGISTER = `auth/signup`;
export const LOGIN = `auth/login`;
export const GET_ALL_TEAM = `team`;
export const GET_ALL_PROJECT = `project`;
export const CREATE_PROJECT = `project`;
export const EDIT_PROJECT = (id: string) => `project/${id}`;
export const DELETE_PROJECT = (id: string) => `project/${id}`;
export const ASSIGN_PROJECT_TO_TEAM = (id: string) =>
  `team/${id}/assign-project`;
