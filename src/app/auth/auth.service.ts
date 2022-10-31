import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDetails } from '../users/users.models';
import { TokenResponse } from './auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static readonly JWT_KEY = 'token';

  private _user?: UserDetails;

  public get token() {
    return localStorage.getItem(AuthService.JWT_KEY) ?? undefined;
  }

  public get user() {
    return this._user;
  }

  constructor(private client: HttpClient) {}

  public login(email: string, password: string) {
    return this.client
      .post<TokenResponse>(environment.baseApiUrl + 'auth', {
        email,
        password,
      })
      .subscribe((resp) => {
        localStorage.setItem(AuthService.JWT_KEY, resp.token);
        this._user = resp.user;
      });
  }

  public isLoggedIn() {
    return this.token ? true : false;
  }

  public logout() {
    localStorage.removeItem(AuthService.JWT_KEY);
  }
}
