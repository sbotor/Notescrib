import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { LoginGuard } from './auth/login.guard';
import { HomeComponent } from './home/home.component';
import { WorkspaceListComponent } from './workspaces/components/workspace-list/workspace-list.component';

export const paths = {
  home: '',
  login: 'login',
  workspaceList: 'workspaces'
}

const routes: Routes = [
  {
    path: paths.home,
    component: HomeComponent,
  },
  {
    path: paths.login,
    component: LoginComponent,
  },
  {
    path: paths.workspaceList,
    component: WorkspaceListComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
