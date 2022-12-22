import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { AuthService } from 'src/app/features/auth/auth.service';
import { routeConfig } from 'src/app/route-config';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  public readonly routes = {
    login: routeConfig.joinFromRoot(routeConfig.auth.prefix, routeConfig.auth.login),
    workspaceBrowser: routeConfig.join(
      routeConfig.workspaces.prefix,
      routeConfig.workspaces.browse
    ),
  };

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    public readonly layout: LayoutService
  ) {}
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.fetchUser().pipe(takeUntil(this.destroy$)).subscribe();
    }
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  public isUserLoggedIn() {
    return this.authService.isLoggedIn();
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
