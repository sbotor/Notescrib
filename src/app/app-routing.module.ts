import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home-component/home.component';
import { routeConfig } from './route-config';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: routeConfig.root.home,
    component: HomeComponent,
  },
  {
    path: routeConfig.auth.prefix,
    loadChildren: () => import('./features/auth/auth.module').then(x => x.AuthModule),
  },
  {
    path: routeConfig.workspaces.prefix,
    loadChildren: () => import('./features/workspaces/workspaces.module').then(x => x.WorkspacesModule)
  },
  {
    path: routeConfig.notes.prefix,
    loadChildren: () => import('./features/notes/notes.module').then(x => x.NotesModule)
  },
  {
    path: routeConfig.templates.prefix,
    loadChildren: () => import('./features/templates/templates.module').then(x => x.TemplatesModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
