import { IProject } from './IProject';
import { IUser } from './IUser';

export interface ITicket {
  id: string;
  title: string; //input
  description: string; //input
  status: string; //select
  priority: string; //select
  type: string; //select
  submitter: IUser; //none
  project?: IProject; //select
  assigned_user: IUser | null;
  created_at: string;
  updated_at: string;
}
