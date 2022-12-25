import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeConfig } from 'src/app/route-config';
import { MustBeLoggedInGuard } from '../auth/guards/must-be-logged-in.guard';
import { TemplateSearchComponent } from './pages/template-search/template-search.component';
import { TemplateEditorComponent } from './pages/template-editor/template-editor.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: routeConfig.templates.search,
    pathMatch: 'full'
  },
  {
    path: routeConfig.templates.search,
    component: TemplateSearchComponent,
    canActivate: [MustBeLoggedInGuard]
  },
  {
    path: routeConfig.templates.editor,
    component: TemplateEditorComponent,
    canActivate: [MustBeLoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule { }
