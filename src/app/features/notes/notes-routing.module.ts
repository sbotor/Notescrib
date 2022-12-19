import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteEditorComponent } from './pages/note-editor/note-editor.component';
import { MustBeLoggedInGuard } from '../auth/guards/must-be-logged-in.guard';
import { routeConfig } from 'src/app/route-config';

const routes: Routes = [
  {
    path: routeConfig.notes.editor,
    component: NoteEditorComponent,
    canActivate: [MustBeLoggedInGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
