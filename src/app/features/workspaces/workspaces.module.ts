import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspacesRoutingModule } from './workspaces-routing.module';
import { WorkspaceListComponent } from './components/workspace-list/workspace-list.component';
import { EditWorkspaceDialogComponent } from './components/dialogs/edit-workspace-dialog/edit-workspace-dialog.component';
import { WorkspaceBrowserComponent } from './components/workspace-browser/workspace-browser.component';
import { EditFolderDialogComponent } from './components/dialogs/edit-folder-dialog/edit-folder-dialog.component';

import { ReactiveFormsModule } from '@angular/forms';

import { MatTreeModule } from '@angular/material/tree';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserTileComponent } from './components/browser-tile/browser-tile.component';
import { BrowserToolbarComponent } from './components/browser-toolbar/browser-toolbar.component';
import { WorkspaceBrowserService } from './services/workspace-browser.service';
import { BrowserDialogService } from './services/browser-dialog.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    WorkspaceListComponent,
    EditWorkspaceDialogComponent,
    WorkspaceBrowserComponent,
    EditFolderDialogComponent,
    BrowserTileComponent,
    BrowserToolbarComponent,
  ],
  imports: [
    CommonModule,
    WorkspacesRoutingModule,
    ReactiveFormsModule,

    MatInputModule,
    MatFormFieldModule,
    MatTreeModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
  ],
  providers: [WorkspaceBrowserService, BrowserDialogService],
})
export class WorkspacesModule {}
