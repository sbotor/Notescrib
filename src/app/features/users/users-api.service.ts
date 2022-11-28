import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDetails } from './users.models';
import { CreateUserRequest } from './users.requests';

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
    return this.client.get<UserDetails>(UsersApiService.URL).pipe(take(1));
  }
}
