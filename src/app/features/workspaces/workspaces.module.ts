import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspacesRoutingModule } from './workspaces-routing.module';
import { WorkspaceListComponent } from './components/workspace-list/workspace-list.component';
import { EditWorkspaceDialogComponent } from './components/dialogs/edit-workspace-dialog/edit-workspace-dialog.component';
import { WorkspaceBrowserComponent } from './components/workspace-browser/workspace-browser.component';import { EditFolderDialogComponent } from './components/dialogs/edit-folder-dialog/edit-folder-dialog.component';

import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTreeModule } from '@angular/material/tree';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    WorkspaceListComponent,
    EditWorkspaceDialogComponent,
    WorkspaceBrowserComponent,
    EditFolderDialogComponent,
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
  ],
})
export class WorkspacesModule {}
