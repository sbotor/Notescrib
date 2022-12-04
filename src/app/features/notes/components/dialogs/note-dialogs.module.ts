import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";

import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

import { EditNoteDialogComponent } from "./edit-note-dialog/edit-note-dialog.component";

@NgModule({
  declarations: [
    EditNoteDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class NoteDialogsModule { }
