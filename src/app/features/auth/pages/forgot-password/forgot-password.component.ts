import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UsersApiService } from 'src/app/features/users/users-api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  public readonly emailControl = this.fb.nonNullable.control('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    private readonly fb: FormBuilder,
    private readonly usersApi: UsersApiService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  public onSubmit() {
    if (!this.emailControl.valid) {
      return;
    }

    this.usersApi
      .initiatePasswordReset(this.emailControl.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() =>
        this.router
          .navigate([''])
          .then(() =>
            this.snackBar.open('Check your email to reset your password.')
          )
      );
  }
}
