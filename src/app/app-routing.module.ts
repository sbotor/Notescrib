import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { LoggedOutGuardGuard as LoggedOutGuard } from './auth/guards/logged-out.guard';
import { LoginGuard } from './auth/guards/login.guard';
import { HomeComponent } from './home/components/home-component/home.component';
import { WorkspaceListComponent } from './features/workspaces/components/workspace-list/workspace-list.component';
import { WorkspaceBrowserComponent } from './features/workspaces/components/workspace-browser/workspace-browser.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedOutGuard]
  },
  {
    path: 'workspaces',
    component: WorkspaceListComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'workspaces/:id',
    component: WorkspaceBrowserComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
