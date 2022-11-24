import { UserDetails } from "../features/users/users.models"

export interface AuthModel {
  email: string,
  password: string
}

export interface TokenResponse {
  token: string,
  user: UserDetails
}
