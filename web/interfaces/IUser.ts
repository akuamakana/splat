export interface IUser {
  username: string;
  email: string;
  id: number;
  created_at: string;
  updated_at: string;
  role: {
    id: number;
    name: string;
  };
}
