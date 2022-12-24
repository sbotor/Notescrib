import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteListComponent } from './note-list.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    NoteListComponent
  ],
  imports: [
    CommonModule,

    CoreModule,

    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  exports: [
    NoteListComponent
  ]
})
export class NoteListModule { }
