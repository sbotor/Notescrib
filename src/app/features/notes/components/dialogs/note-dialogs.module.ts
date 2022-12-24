import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { EditNoteDialogComponent } from "./edit-note-dialog/edit-note-dialog.component";

import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from "@angular/material/icon";
import { AddRelatedNoteDialogComponent } from './add-related-note-dialog/add-related-note-dialog.component';
import { NoteSearchModule } from "../note-search/note-search.module";

@NgModule({
  declarations: [
    EditNoteDialogComponent,
    AddRelatedNoteDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    NoteSearchModule,

    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
  ]
})
export class NoteDialogsModule { }
