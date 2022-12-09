import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MustBeLoggedOutGuard } from './auth/guards/must-be-logged-out.guard';
import { MustBeLoggedInGuard } from './auth/guards/must-be-logged-in.guard';
import { HomeComponent } from './home/components/home-component/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.module').then(x => x.LoginModule),
    canActivate: [MustBeLoggedOutGuard]
  },
  {
    path: 'workspace',
    loadChildren: () => import('./features/workspaces/workspaces.module').then(x => x.WorkspacesModule),
    canActivate: [MustBeLoggedInGuard],
  },
  {
    path: 'note',
    loadChildren: () => import('./features/notes/notes.module').then(x => x.NotesModule),
    canActivate: [MustBeLoggedInGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
