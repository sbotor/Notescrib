import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspacesRoutingModule } from './workspaces-routing.module';
import { WorkspaceBrowserComponent } from './pages/workspace-browser/workspace-browser.component';
import { EditFolderDialogComponent } from './components/dialogs/edit-folder-dialog/edit-folder-dialog.component';

import { ReactiveFormsModule } from '@angular/forms';

import { MatTreeModule } from '@angular/material/tree';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserListComponent } from './components/browser-list/browser-list.component';
import { WorkspaceSearchComponent } from './pages/workspace-search/workspace-search.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { CoreModule } from 'src/app/core/core.module';
import { ConfirmationDialogModule } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.module';
import { NoteListModule } from '../notes/components/note-list/note-list.module';
import { NoteSearcherModule } from '../notes/components/note-searcher/note-searcher.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoteTemplateChooserDialogComponent } from './components/dialogs/note-template-chooser-dialog/note-template-chooser-dialog.component';
import { TemplateSearcherModule } from '../templates/components/template-searcher/template-searcher.module';
import { BrowserDialogService } from './services/browser-dialog.service';

@NgModule({
  declarations: [
    WorkspaceBrowserComponent,
    EditFolderDialogComponent,
    BrowserListComponent,
    WorkspaceSearchComponent,
    NoteTemplateChooserDialogComponent,
  ],
  imports: [
    CommonModule,
    WorkspacesRoutingModule,
    ReactiveFormsModule,

    CoreModule,
    ConfirmationDialogModule,
    NoteListModule,
    NoteSearcherModule,
    TemplateSearcherModule,

    MatInputModule,
    MatFormFieldModule,
    MatTreeModule,
    MatSidenavModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatChipsModule,
    MatTooltipModule
  ],
  providers: [
    BrowserDialogService
  ]
})
export class WorkspacesModule {}
