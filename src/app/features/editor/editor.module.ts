import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorFieldComponent } from './components/editor-field/editor-field.component';
import { EditorPreviewComponent } from './components/editor-preview/editor-preview.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PreviewEditorComponent } from './components/preview-editor/preview-editor.component';
import { MatDividerModule } from '@angular/material/divider';
import { EditorModeIconPipe } from './pipes/editor-mode-icon.pipe';
import { EditorModeNamePipe } from './pipes/editor-mode-name.pipe';

@NgModule({
  declarations: [
    EditorFieldComponent,
    EditorPreviewComponent,
    PreviewEditorComponent,
    EditorModeIconPipe,
    EditorModeNamePipe
  ],
  imports: [
    CommonModule,

    MatToolbarModule,
    MatProgressBarModule,
    MatDividerModule
  ],
  exports: [
    EditorFieldComponent,
    EditorPreviewComponent,
    PreviewEditorComponent,

    EditorModeIconPipe,
    EditorModeNamePipe
  ]
})
export class EditorModule { }
