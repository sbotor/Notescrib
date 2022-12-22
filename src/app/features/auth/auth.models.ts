import { UserDetails } from "../users/users.models"

export interface AuthModel {
  email: string,
  password: string
}

export interface TokenResponse {
  token: string,
  user: UserDetails
}

export interface ConfirmEmailData {
  userId: string;
  token: string;
}
