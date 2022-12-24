import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteSearchComponent } from './note-search.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NoteListModule } from '../note-list/note-list.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    NoteSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    NoteListModule,

    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatIconModule
  ],
  exports: [
    NoteSearchComponent
  ]
})
export class NoteSearchModule { }
