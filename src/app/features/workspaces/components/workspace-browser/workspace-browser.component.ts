import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, take } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { NotesApiService } from 'src/app/features/notes/notes-api.service';
import { WorkspacesApiService } from '../../workspaces-api.service';
import { WorkspaceDetails } from '../../workspaces.models';
import { EditFolderData } from '../edit-folder-dialog/edit-folder-data';
import { EditFolderDialogComponent } from '../edit-folder-dialog/edit-folder-dialog.component';
import {
  FolderFlatNodeItem,
  MenuAction,
} from '../folder-tree/folder-tree.models';

@Component({
  selector: 'app-workspace-browser',
  templateUrl: './workspace-browser.component.html',
  styleUrls: ['./workspace-browser.component.scss'],
})
export class WorkspaceBrowserComponent {
  private workspaceId = '';

  private readonly workspaceSubject = new ReplaySubject<WorkspaceDetails>(1);
  public readonly workspaceDetails$ = this.workspaceSubject.asObservable();

  constructor(
    route: ActivatedRoute,
    private workspacesService: WorkspacesApiService,
    private notesService: NotesApiService,
    private dialog: MatDialog
  ) {
    route.paramMap.pipe(take(1)).subscribe((x) => {
      this.workspaceId = x.get('id') ?? '';
      this.fetchWorkspaceDetails();
    });
  }

  public handleTreeMenuAction(data: MenuAction) {
    switch (data.type) {
      case 'createFolder':
        this.createFolder(data.node.item);
        break;
      case 'delete':
        this.deleteFolder(data.node.item);
        break;
    }
  }

  private fetchWorkspaceDetails() {
    if (!this.workspaceId) {
      throw new Error('Workspace ID is empty.');
    }

    this.workspacesService
      .getWorkspaceDetails(this.workspaceId)
      .pipe(take(1))
      .subscribe((x) => this.workspaceSubject.next(x));
  }

  private createFolder(item: FolderFlatNodeItem) {
    this.dialog
      .open(EditFolderDialogComponent, { data: { title: 'Add folder' } })
      .afterClosed()
      .subscribe((x: EditFolderData) => {
        if (!x) {
          return;
        }

        const parentId = item.id ? item.id : undefined;
        this.workspacesService
          .createFolder(this.workspaceId, {
            name: x.name,
            parentId: parentId,
          })
          .pipe(take(1))
          .subscribe(() => this.fetchWorkspaceDetails());
      });
  }

  private deleteFolder(item: FolderFlatNodeItem) {
    this.dialog
      .open(ConfirmationDialogComponent, { data: { title: `Do you want to remove ${item.name}?` } })
      .afterClosed()
      .subscribe((x: EditFolderData) => {
        if (!x) {
          return;
        }

        this.workspacesService
          .deleteFolder(this.workspaceId, item.id)
          .pipe(take(1))
          .subscribe(() => this.fetchWorkspaceDetails());
      });
  }
}
