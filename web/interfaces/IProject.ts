import { IUser } from './IUser';

export interface IProject {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  assigned_users: IUser[];
}
