import { Role } from '@/enums/role.enum';

export type DashboardPropsType = {
  children: React.ReactNode;
  title: string;
  role: Role;
  navLinks: { [key: string]: string };
};
