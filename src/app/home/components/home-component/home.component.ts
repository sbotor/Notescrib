import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public username$ = this.authService.username$;

  constructor(private authService: AuthService) { }

  public isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
