import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserDetails } from 'src/app/users/users.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() public toggleSidenav = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.fetchUser();
  }

  public onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  public userLoggedIn() {
    return this.authService.isLoggedIn();
  }

  public getUsername() {
    return this.authService.user$.pipe(take(1), map(x => x?.email));
  }
}
