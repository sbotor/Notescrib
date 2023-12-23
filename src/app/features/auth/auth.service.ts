import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { ReplaySubject, of, tap } from 'rxjs';
import { UsersApiService } from 'src/app/features/users/users-api.service';
import { environment } from 'src/environments/environment';
import { TokenResponse } from './auth.models';
import { UserDetails } from '../users/users.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static readonly JWT_KEY = 'token';

  private readonly userSubject = new ReplaySubject<UserDetails | undefined>();
  public readonly user$ = this.userSubject.asObservable();

  public get token() {
    return localStorage.getItem(AuthService.JWT_KEY) ?? undefined;
  }

  constructor(
    private readonly client: HttpClient,
    private readonly usersService: UsersApiService
  ) {}

  public login(email: string, password: string) {
    return this.client
      .post<TokenResponse>(environment.baseAuthUrl + 'api/auth', {
        email,
        password,
      })
      .pipe(
        tap((x) => {
          localStorage.setItem(AuthService.JWT_KEY, x.token);
          this.userSubject.next(x.user);
        })
      );
  }

  public isLoggedIn() {
    if (!this.token) {
      return false;
    }

    const token = jwtDecode<JwtPayload>(this.token);
    const valid = Date.now() < token.exp! * 1000;

    if (!valid) {
      localStorage.removeItem(AuthService.JWT_KEY);
    }

    return valid;
  }

  public logout() {
    localStorage.removeItem(AuthService.JWT_KEY);
    this.userSubject.next(undefined);
  }

  public fetchUser() {
    return this.usersService.getCurrentUser().pipe(tap((x) => (this.userSubject.next(x))));
  }
}
