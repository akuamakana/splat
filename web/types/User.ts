export interface User {
  username: string;
  password: string;
  email?: string;
}

export interface UserResponse {
  field: string;
  message: string;
}
