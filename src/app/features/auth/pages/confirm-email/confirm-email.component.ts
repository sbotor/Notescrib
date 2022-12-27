import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  BehaviorSubject,
  Subject,
  map,
  mergeMap,
  of,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { UsersApiService } from 'src/app/features/users/users-api.service';
import { AuthResult, UserTokenData } from '../../auth.models';
import { Buffer } from 'buffer';
import { routeConfig } from 'src/app/route-config';
import { AuthService } from '../../auth.service';
import { UserDetails } from 'src/app/features/users/users.models';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmEmailComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  public readonly routes = {
    login: routeConfig.joinFromRoot(
      routeConfig.auth.prefix,
      routeConfig.auth.login
    ),
  };

  private readonly resultSubject = new BehaviorSubject<AuthResult | undefined>(
    undefined
  );
  public readonly result$ = this.resultSubject.asObservable();

  constructor(
    route: ActivatedRoute,
    private readonly api: UsersApiService,
    private readonly authService: AuthService
  ) {
    route.queryParamMap.pipe(take(1))
      .pipe(
        map((x) =>
          this.extractData(x)
        ),
        tap((x) => this.authService.isLoggedIn()),
        mergeMap((x) =>
          (this.authService.isLoggedIn()
            ? this.authService.user$.pipe(take(1))
            : of(undefined)
          ).pipe(map((u) => this.checkUser(x, u)))
        ),
        switchMap((x) => this.api.activateAccount(x.userId, x.token)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (_) =>
          this.resultSubject.next({
            success: true,
            message: 'Email confirmed.',
          }),
        error: (_) =>
          this.resultSubject.next({
            success: false,
            message: 'An error occured.',
          }),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private extractData(query: ParamMap) {
    let userId = query.get('userId');
    let token = query.get('token');

    if (!userId || !token) {
      throw new Error();
    }

    userId = Buffer.from(userId, 'base64').toString('utf8');
    token = Buffer.from(token, 'base64').toString('utf8');

    return {
      userId,
      token,
    } as UserTokenData;
  }

  private checkUser(data: UserTokenData, currentUser?: UserDetails) {
    if (currentUser && currentUser.id !== data.userId) {
      throw new Error();
    }

    return data;
  }
}
