import { UserDetails } from "../users/users.models"

export interface AuthModel {
  email: string,
  password: string
}

export interface AuthResult {
  success: boolean;
  message: string;
}

export interface TokenResponse {
  token: string,
  user: UserDetails
}

export interface UserTokenData {
  userId: string;
  token: string;
}
