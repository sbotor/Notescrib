import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorFieldComponent } from './components/editor-field/editor-field.component';
import { EditorPreviewComponent } from './components/editor-preview/editor-preview.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    EditorFieldComponent,
    EditorPreviewComponent
  ],
  imports: [
    CommonModule,

    MatToolbarModule,
    MatProgressBarModule
  ],
  exports: [
    EditorFieldComponent,
    EditorPreviewComponent
  ]
})
export class EditorModule { }
