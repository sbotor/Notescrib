import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output()
  public sidenavToggle = new EventEmitter();

  public readonly username$ = this.authService.username$;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.fetchUser();
  }

  public onToggleSidenav() {
    this.sidenavToggle.emit();
  }

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
