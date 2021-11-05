import { IUser } from '@interfaces/IUser';
export interface IComment {
  id: number;
  text: string;
  created_at: string;
  updated_at: string;
  submitter: IUser;
}
