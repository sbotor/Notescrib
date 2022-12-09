import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CurrentWorkspaceService } from 'src/app/features/workspaces/services/current-workspace.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {

  private workspaceNameSub?: Subscription;

  public readonly username$ = this.authService.username$;
  public readonly workspaceName$ = this.getWorkspaceName();

  constructor(
    private readonly authService: AuthService,
    private readonly currentWorkspace: CurrentWorkspaceService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.workspaceNameSub = this.currentWorkspace.fetchWorkspace().subscribe();
  }

  ngOnDestroy(): void {
    this.workspaceNameSub?.unsubscribe();
  }

  public isUserLoggedIn() {
    return this.authService.isLoggedIn();
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  private getWorkspaceName() {
    return this.currentWorkspace.workspace$.pipe(
      map((x) => x?.name)
    );
  }
}
