import { ADMIN, TEAM_MEMBER } from "@constants/roles";

export const AppAllowedRoles = [ADMIN, TEAM_MEMBER] as const;

export type IAppAllowedRoles = typeof AppAllowedRoles[number];

export const roles = ['admin', 'team-member'] as const

export type IRole = typeof roles[number] | 'team-member'