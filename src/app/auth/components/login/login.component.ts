import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  public login() {
    if (!this.form.valid) {
      return;
    }

    this.authService.login(this.form.controls.email.value, this.form.controls.password.value)
  }
}
