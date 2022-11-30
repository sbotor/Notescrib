import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HeaderItem } from './header-item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output()
  public toggleSidenav = new EventEmitter();

  public username$ = this.authService.username$;

  private readonly items: HeaderItem[] = [
    { label: 'Workspaces', link: '/workspaces', loggedInOnly: true },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.fetchUser();
  }

  public onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  public isUserLoggedIn() {
    return this.authService.isLoggedIn();
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  public getItems() {
    return this.items.filter((x) => !x.loggedInOnly || this.isUserLoggedIn());
  }

  public isCurrentRoute(link: string) {
    return this.router.url.startsWith(link);
  }
}
