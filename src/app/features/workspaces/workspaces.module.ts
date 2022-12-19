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
import { BrowserToolbarComponent } from './components/browser-toolbar/browser-toolbar.component';
import { WorkspaceBrowserService } from './services/workspace-browser.service';
import { BrowserDialogService } from './services/browser-dialog.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserListComponent } from './components/browser-list/browser-list.component';

@NgModule({
  declarations: [
    WorkspaceBrowserComponent,
    EditFolderDialogComponent,
    BrowserToolbarComponent,
    BrowserListComponent,
  ],
  imports: [
    CommonModule,
    WorkspacesRoutingModule,
    ReactiveFormsModule,

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
  ],
  providers: [WorkspaceBrowserService, BrowserDialogService],
})
export class WorkspacesModule {}
