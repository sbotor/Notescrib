import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteEditorComponent } from './pages/note-editor/note-editor.component';
import { routeConfig } from 'src/app/route-config';

const routes: Routes = [
  {
    path: routeConfig.notes.editor,
    component: NoteEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
