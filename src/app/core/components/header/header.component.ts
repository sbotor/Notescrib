import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/features/auth/auth.service';
import { routeConfig } from 'src/app/route-config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  public readonly routes = {
    home: routeConfig.root.home,
    login: routeConfig.root.login
  };

  @Output()
  public sidenavToggle = new EventEmitter();

  public readonly user$ = this.authService.user$;

  constructor(private authService: AuthService, private router: Router) {}

  public isUserLoggedIn() {
    return this.authService.isLoggedIn();
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  public onSidenavToggle() {
    this.sidenavToggle.emit();
  }
}
