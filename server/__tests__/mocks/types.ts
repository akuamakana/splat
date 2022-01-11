export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export interface Project {
  title: string;
  description: string;
  user: User;
  assigned_users: User[];
  id: number;
  created_at: Date;
  updated_at: Date;
}
