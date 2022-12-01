export enum Role {
  ADMIN = 'admin',
  GUEST = 'guest',
  INSTRUCTOR = 'instructor',
  TRAINEE = 'trainee',
}

export interface INewsletter {
  email: string;
  role: Role;
}
