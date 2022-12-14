import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from 'src/app/features/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private static readonly NAVBAR_KEY = 'navbar_open';

  public readonly username$ = this.authService.user$.pipe(map(x => x!.email));

  constructor(private readonly authService: AuthService) {}

  public isNavbarOpened() {
    return localStorage.getItem(LayoutService.NAVBAR_KEY) === 'true';
  }

  public setNavbarOpen(state: boolean) {
    localStorage.setItem(LayoutService.NAVBAR_KEY, state.toString());
  }

  public toggleNavbar() {
    this.setNavbarOpen(!this.isNavbarOpened());
  }
}
