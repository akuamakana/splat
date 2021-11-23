export interface IUser {
  username: string;
  email: string;
  id: number;
  created_at: string;
  updated_at: string;
  role: 'SUBMITTER' | 'DEV' | 'MANAGER' | 'ADMIN';
  firstName: string;
  lastName: string;
}
