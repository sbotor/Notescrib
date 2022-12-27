import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/features/auth/auth.service';
import { UserDetails } from '../../users.models';
import { take } from 'rxjs/internal/operators/take';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { UsersApiService } from '../../users-api.service';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { concatMap, filter } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.scss'],
})
export class UserInfoPageComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private user!: UserDetails;

  public readonly user$ = this.authService.user$;

  public readonly emailControl = this.fb.nonNullable.control('', [
    Validators.required,
    Validators.email,
  ]);

  private editing = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly usersApi: UsersApiService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.user$.pipe(take(1), takeUntil(this.destroy$)).subscribe((x) => {
      this.user = x!;
      this.emailControl.setValue(this.user.email);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  public isEditing() {
    return this.editing;
  }

  public toggleEditing() {
    if (this.editing) {
      this.emailControl.setValue(this.user.email);
    }

    this.editing = !this.editing;
  }

  public onResetPassword() {
    ConfirmationDialogComponent.open(this.dialog, {
      value: 'Do you want to reset your password?',
    })
      .pipe(
        filter((x) => !!x),
        concatMap(() => this.usersApi.initiatePasswordReset()),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.snackBar.open('An email has been sent.'));
  }

  public async onDelete() {
    ConfirmationDialogComponent.open(this.dialog, {
      title: 'This cannot be undone!',
      value: 'Do you want to remove your account?',
      confirmButton: { color: 'warn', label: 'DELETE MY ACCOUNT' },
    })
      .pipe(
        filter((x) => !!x),
        concatMap(() => this.usersApi.deleteUser()),
        takeUntil(this.destroy$)
      )
      .subscribe(async () => {
        this.authService.logout();
        await this.router
          .navigate([''])
          .then(() => this.snackBar.open('Account removed.'));
      });
  }
}
