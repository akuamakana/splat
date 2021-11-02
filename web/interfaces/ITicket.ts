import { IProject } from './IProject';
import { IUser } from './IUser';

export interface ITicket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  type: string;
  submitter: IUser;
  project?: IProject;
}
