import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { LoggedOutGuardGuard as LoggedOutGuard } from './auth/guards/logged-out.guard';
import { LoginGuard } from './auth/guards/login.guard';
import { LoginPromptComponent } from './home/components/login-prompt/login-prompt.component';
import { WorkspaceListComponent } from './workspaces/components/workspace-list/workspace-list.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPromptComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
