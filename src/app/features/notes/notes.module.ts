import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NoteEditorComponent } from './components/note-editor/note-editor.component';
import { NoteDialogsModule } from './components/dialogs/note-dialogs.module';

import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    NoteEditorComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    FormsModule,

    NoteDialogsModule,

    MatToolbarModule,
    MatButtonModule,

    CodemirrorModule,
  ]
})
export class NotesModule { }
