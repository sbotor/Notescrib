import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MustBeLoggedOutGuard } from './features/auth/guards/must-be-logged-out.guard';
import { MustBeLoggedInGuard } from './features/auth/guards/must-be-logged-in.guard';
import { HomeComponent } from './features/home/pages/home-component/home.component';
import { routeConfig } from './route-config';

const routes: Routes = [
  {
    path: routeConfig.root.home,
    component: HomeComponent,
  },
  {
    path: routeConfig.root.login,
    loadChildren: () => import('./features/auth/auth.module').then(x => x.AuthModule),
    canActivate: [MustBeLoggedOutGuard]
  },
  {
    path: routeConfig.workspaces.prefix,
    loadChildren: () => import('./features/workspaces/workspaces.module').then(x => x.WorkspacesModule),
    canActivate: [MustBeLoggedInGuard],
  },
  {
    path: routeConfig.notes.prefix,
    loadChildren: () => import('./features/notes/notes.module').then(x => x.NotesModule),
    canActivate: [MustBeLoggedInGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
