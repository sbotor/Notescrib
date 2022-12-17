import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MustBeLoggedInGuard } from 'src/app/auth/guards/must-be-logged-in.guard';
import { NoteEditorComponent } from './components/note-editor/note-editor.component';

const routes: Routes = [
  {
    path: ':id',
    component: NoteEditorComponent,
    canActivate: [MustBeLoggedInGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
