import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/features/auth/auth.service';
import { UserDetails } from '../../users.models';
import { take } from 'rxjs/internal/operators/take';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { UsersApiService } from '../../users-api.service';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.scss'],
})
export class UserInfoPageComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private user!: UserDetails;

  public readonly emailControl = this.fb.nonNullable.control('', [
    Validators.required,
    Validators.email,
  ]);

  private editing = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly usersApi: UsersApiService
  ) {}

  ngOnInit(): void {
    this.authService.user$
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((x) => {
        this.user = x!;
        this.emailControl.setValue(this.user.email);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  public getUser() {
    return this.user;
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

  public onSubmit() {
    if (
      !this.emailControl.valid ||
      this.emailControl.value === this.user.email
    ) {
      return;
    }

    this.usersApi
      .updateUser({ email: this.emailControl.value })
      .pipe(
        switchMap(() => this.authService.fetchUser()),
        takeUntil(this.destroy$)
      )
      .subscribe((x) => (this.user = x));
  }

  public onPasswordReset() {
    // TODO
  }
}
