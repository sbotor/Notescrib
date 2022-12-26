import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDetails } from './users.models';
import { CreateUserRequest, UpdateUserPasswordRequest, UpdateUserRequest } from './users.requests';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private static readonly URL = environment.baseApiUrl + '/identity/users';

  constructor(private readonly client: HttpClient) {}

  public createUser(request: CreateUserRequest) {
    return this.client.post(UsersApiService.URL, request);
  }

  public getCurrentUser() {
    return this.client.get<UserDetails>(UsersApiService.URL);
  }

  public confirmEmail(id: string, token: string) {
    return this.client.post(`${UsersApiService.URL}/${id}/confirm`, { token });
  }

  public deleteUser() {
    return this.client.delete(UsersApiService.URL);
  }

  public updateUser(request: UpdateUserRequest) {
    return this.client.put(UsersApiService.URL, request);
  }

  public initiatePasswordReset() {
    return this.client.post(`${UsersApiService.URL}/password`, undefined);
  }

  public resetPassword(id: string, request: UpdateUserPasswordRequest) {
    return this.client.put(`${UsersApiService.URL}/${id}/password`, request);
  }
}
