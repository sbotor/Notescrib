import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth-api.service';
import { UserDetails } from 'src/app/users/users.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() public toggleSidenav = new EventEmitter();

  public username$ = this.authService.user$.pipe(take(1), map(x => x?.email));

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.fetchUser();
  }

  public onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  public userLoggedIn() {
    return this.authService.isLoggedIn();
  }

  public logout() {
    this.authService.logout();
    this.router.navigate([''])
  }

  public getUsername() {
    return undefined;
  }
}
