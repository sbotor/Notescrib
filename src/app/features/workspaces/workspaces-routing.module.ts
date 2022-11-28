import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MustBeLoggedInGuard } from 'src/app/auth/guards/must-be-logged-in.guard';
import { WorkspaceBrowserComponent } from './components/workspace-browser/workspace-browser.component';
import { WorkspaceListComponent } from './components/workspace-list/workspace-list.component';

const routes: Routes = [
  {
    path: '',
    component: WorkspaceListComponent,
    canActivate: [MustBeLoggedInGuard],
  },
  {
    path: ':id',
    component: WorkspaceBrowserComponent,
    canActivate: [MustBeLoggedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspacesRoutingModule { }
