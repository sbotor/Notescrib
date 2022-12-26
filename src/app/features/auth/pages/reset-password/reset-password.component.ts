import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, map, switchMap, takeUntil, tap } from 'rxjs';
import { routeConfig } from 'src/app/route-config';
import { AuthResult, UserTokenData } from '../../auth.models';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UsersApiService } from 'src/app/features/users/users-api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UpdateUserPasswordRequest } from 'src/app/features/users/users.requests';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  public readonly routes = {
    login: routeConfig.joinFromRoot(
      routeConfig.auth.prefix,
      routeConfig.auth.login
    ),
  };

  private tokenData?: UserTokenData;

  public readonly form = this.fb.nonNullable.group({
    password: ['', Validators.required],
    passwordConfirmation: ['', Validators.required],
  });

  private readonly paramsResultSubject = new BehaviorSubject<
    AuthResult | undefined
  >(undefined);
  public readonly paramsResult$ = this.paramsResultSubject.asObservable();

  private readonly resultSubject = new BehaviorSubject<AuthResult | undefined>(
    undefined
  );
  public readonly result$ = this.paramsResultSubject.asObservable();

  constructor(
    route: ActivatedRoute,
    private readonly api: UsersApiService,
    private readonly fb: FormBuilder,
    private readonly snackBar: MatSnackBar
  ) {
    route.queryParamMap
      .pipe(
        map(this.extractData),
        tap((x) => (this.tokenData = x)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (_) =>
          this.paramsResultSubject.next({
            success: true,
            message: 'Provide a new password.',
          }),
        error: (_) =>
          this.paramsResultSubject.next({
            success: false,
            message: 'An error occured.',
          }),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  public onSubmit() {
    if (!this.form.valid || !this.tokenData) {
      return;
    }

    const controls = this.form.controls;
    if (controls.password.value !== controls.passwordConfirmation.value) {
      this.snackBar.open('Passwords do not match.');
      return;
    }

    const request = {
      token: this.tokenData.token,
      password: controls.password.value,
      passwordConfirmation: controls.passwordConfirmation.value,
    } as UpdateUserPasswordRequest;

    this.api
      .resetPassword(this.tokenData.userId, request)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() =>
        this.resultSubject.next({
          success: true,
          message: 'Password has been reset.',
        })
      );
  }

  private extractData(params: ParamMap) {
    let userId = params.get('userId');
    let token = params.get('token');

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
}
