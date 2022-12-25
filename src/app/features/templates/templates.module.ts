import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';import { TemplateSearcherComponent } from './components/template-searcher/template-searcher.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { CoreModule } from 'src/app/core/core.module';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateEditorComponent } from './pages/template-editor/template-editor.component';
import { EditorModule } from '../editor/editor.module';
import { TemplateSearcherModule } from './components/template-searcher/template-searcher.module';
import { TemplateSearchComponent } from './pages/template-search/template-search.component';


@NgModule({
  declarations: [
    TemplateSearchComponent,
    TemplateEditorComponent
  ],
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    ReactiveFormsModule,

    CoreModule,
    EditorModule,
    TemplateSearcherModule,

    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressBarModule
  ]
})
export class TemplatesModule { }
