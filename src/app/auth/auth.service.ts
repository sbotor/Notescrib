import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { map, ReplaySubject, Subject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsersApiService } from '../features/users/users-api.service';
import { UserDetails } from '../features/users/users.models';
import { TokenResponse } from './auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static readonly JWT_KEY = 'token';

  private userSubject = new ReplaySubject<UserDetails | undefined>(1);

  public get token() {
    return localStorage.getItem(AuthService.JWT_KEY) ?? undefined;
  }

  public user$ = this.userSubject.asObservable();
  public username$ = this.user$.pipe(
    take(1),
    map((x) => x?.email)
  );

  constructor(
    private client: HttpClient,
    private usersService: UsersApiService
  ) {}

  public login(email: string, password: string) {
    var loggedInSubject = new Subject<void>();

    this.client
      .post<TokenResponse>(environment.baseApiUrl + '/identity/auth', {
        email,
        password,
      })
      .pipe(take(1))
      .subscribe((x) => {
        this.userSubject.next(x.user);
        localStorage.setItem(AuthService.JWT_KEY, x.token);

        loggedInSubject.next();
        loggedInSubject.complete();
      });

    return loggedInSubject.asObservable();
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
    if (!this.isLoggedIn()) {
      return;
    }

    this.usersService
      .getCurrentUser()
      .pipe(take(1))
      .subscribe((x) => {
        this.userSubject.next(x);
      });
  }
}
