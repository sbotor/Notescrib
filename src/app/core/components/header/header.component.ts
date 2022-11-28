import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() public toggleSidenav = new EventEmitter();

  public username$ = this.authService.username$;

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
