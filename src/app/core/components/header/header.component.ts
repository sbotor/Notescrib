import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
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
    login: routeConfig.joinFromRoot(
      routeConfig.auth.prefix,
      routeConfig.auth.login
    ),
    userInfo: routeConfig.joinFromRoot(routeConfig.users.prefix),
  };

  @Output()
  public sidenavToggle = new EventEmitter();

  public readonly user$ = this.authService.user$;

  constructor(private authService: AuthService, private router: Router) {}

  public isUserLoggedIn() {
    return this.authService.isLoggedIn();
  }

  public async logout() {
    this.authService.logout();
    await this.router.navigateByUrl('/');
  }

  public onSidenavToggle() {
    this.sidenavToggle.emit();
  }
}
