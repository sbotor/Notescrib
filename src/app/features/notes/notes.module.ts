import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NoteDialogsModule } from './components/dialogs/note-dialogs.module';

import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EditorModule } from '../editor/editor.module';
import { NoteEditorComponent } from './components/note-editor/note-editor.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [NoteEditorComponent],
  imports: [
    CommonModule,
    NotesRoutingModule,
    FormsModule,

    NoteDialogsModule,
    EditorModule,

    MatToolbarModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
})
export class NotesModule {}
