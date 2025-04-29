export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

export interface UserRequest {
  name: string;
  email: string;
  password: string;
}
