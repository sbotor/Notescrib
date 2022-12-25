import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplateSearcherComponent } from './components/template-searcher/template-searcher.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { CoreModule } from 'src/app/core/core.module';
import { EditTemplateDialogComponent } from './components/dialogs/edit-template-dialog/edit-template-dialog.component';
import { TemplateSearchComponent } from './pages/template-search/template-search.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { TemplateEditorComponent } from './pages/template-editor/template-editor.component';
import { EditorModule } from '../editor/editor.module';


@NgModule({
  declarations: [
    TemplateSearcherComponent,
    EditTemplateDialogComponent,
    TemplateSearchComponent,
    TemplateEditorComponent
  ],
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    ReactiveFormsModule,

    CoreModule,
    EditorModule,

    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule
  ]
})
export class TemplatesModule { }
