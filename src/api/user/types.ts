export interface UserResponse {
  message: string;
  status: boolean;
  data: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface UserRequest {
  name: string;
  email: string;
  password: string;
}
