import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NoteEditorComponent } from './components/note-editor/note-editor.component';
import { NoteDialogsModule } from './components/dialogs/note-dialogs.module';


@NgModule({
  declarations: [
    NoteEditorComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,

    NoteDialogsModule
  ]
})
export class NotesModule { }
