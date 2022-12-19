import { Component } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from 'src/app/features/auth/auth.service';
import { routeConfig } from 'src/app/route-config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public readonly routes = {
    login: routeConfig.root.login
  };

  public readonly username$ = this.authService.user$.pipe(map(x => x!.email));

  constructor(private readonly authService: AuthService) { }

  public isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
