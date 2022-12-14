import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { AuthService } from '../../auth.service';
import { UsersApiService } from 'src/app/features/users/users-api.service';
import { routeConfig } from 'src/app/route-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  public readonly routes = {
    forgotPassword: routeConfig.joinFromRoot(
      routeConfig.auth.prefix,
      routeConfig.auth.forgotPassword
    ),
  } as const;

  public readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  public readonly registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    passwordConfirmation: ['', [Validators.required]],
  });

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersApiService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  public login() {
    if (!this.loginForm.valid) {
      return;
    }

    this.authService
      .login(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        async () =>
          await this.router.navigate([
            routeConfig.workspaces.prefix,
            routeConfig.workspaces.browse,
          ])
      );
  }

  public register() {
    if (!this.registerForm.valid) {
      return;
    }

    const controls = this.registerForm.controls;
    if (controls.password.value !== controls.passwordConfirmation.value) {
      this.snackBar.open('Passwords do not match.');
      return;
    }

    this.usersService
      .createUser({
        email: controls.email.value,
        password: controls.password.value,
        passwordConfirmation: controls.passwordConfirmation.value,
      })
      .pipe(
        tap(() =>
          this.snackBar.open('Please, confirm your email.', 'Ok', {
            duration: undefined,
          })
        )
      )
      .subscribe(async () => await this.router.navigate(['']));
  }
}
