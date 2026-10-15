import type { UserRole } from '../types';

// À ajuster quand les espaces par rôle existeront
const HOME_ROUTE_BY_ROLE: Record<UserRole, string> = {
  admin: '/',
  operator: '/',
  client: '/',
};

export function getHomeRoute(role: UserRole): string {
  return HOME_ROUTE_BY_ROLE[role];
}