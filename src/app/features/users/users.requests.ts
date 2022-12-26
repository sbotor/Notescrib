export interface CreateUserRequest {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface UpdateUserRequest {
  email: string;
}

export interface UpdateUserPasswordRequest {
  token: string;
  password: string;
  passwordConfirmation: string;
}
