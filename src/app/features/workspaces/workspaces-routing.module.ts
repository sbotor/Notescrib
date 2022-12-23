import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceBrowserComponent } from './pages/workspace-browser/workspace-browser.component';
import { MustBeLoggedInGuard } from '../auth/guards/must-be-logged-in.guard';
import { routeConfig } from 'src/app/route-config';
import { WorkspaceSearchComponent } from './pages/workspace-search/workspace-search.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: routeConfig.workspaces.browse,
    pathMatch: 'full',
  },
  {
    path: routeConfig.workspaces.browse,
    component: WorkspaceBrowserComponent,
    canActivate: [MustBeLoggedInGuard],
  },
  {
    path: routeConfig.workspaces.search,
    component: WorkspaceSearchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkspacesRoutingModule {}
