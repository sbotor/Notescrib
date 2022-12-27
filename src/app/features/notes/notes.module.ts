import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NoteDialogsModule } from './components/dialogs/note-dialogs.module';

import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EditorModule } from '../editor/editor.module';
import { NoteEditorComponent } from './pages/note-editor/note-editor.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserDialogService } from '../workspaces/services/browser-dialog.service';

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
    MatDividerModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
  ],
  providers: [BrowserDialogService]
})
export class NotesModule {}
