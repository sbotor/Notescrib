import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateSearcherComponent } from './template-searcher.component';
import { TemplateDialogsModule } from '../dialogs/template-dialogs.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from 'src/app/core/core.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    TemplateSearcherComponent
  ],
  imports: [
    CommonModule,

    TemplateDialogsModule,
    CoreModule,

    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatMenuModule,
    MatListModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule
  ],
  exports: [
    TemplateSearcherComponent
  ]
})
export class TemplateSearcherModule { }
