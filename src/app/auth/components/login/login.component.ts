import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { UsersApiService } from 'src/app/features/users/users-api.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
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

  public login() {
    if (!this.loginForm.valid) {
      return;
    }

    this.authService
      .login(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value
      )
      .pipe(take(1))
      .subscribe(() => this.router.navigate(['workspaces']));
  }

  public register() {
    if (!this.registerForm.valid) {
      return;
    }

    const controls = this.registerForm.controls;
    if (controls.password.value !== controls.passwordConfirmation.value) {
      this.snackBar.open('Passwords do not match.', 'Close', {
        duration: 1500,
      });
      return;
    }

    this.usersService
      .createUser({
        email: controls.email.value,
        password: controls.password.value,
        passwordConfirmation: controls.passwordConfirmation.value,
      })
      .pipe(take(1))
      .subscribe(() => this.router.navigate(['']));
  }
}
