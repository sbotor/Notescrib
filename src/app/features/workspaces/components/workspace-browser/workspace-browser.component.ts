import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, Subscription, take } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { WorkspaceContentsService } from '../../workspace-contents.service';
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
export class WorkspaceBrowserComponent implements OnDestroy {
  private workspaceId = '';
  private readonly subs = new Subscription();

  private readonly workspaceSubject = new ReplaySubject<WorkspaceDetails>(1);
  public readonly workspaceDetails$ = this.workspaceSubject.asObservable();

  constructor(
    route: ActivatedRoute,
    private workspacesService: WorkspacesApiService,
    private contentsService: WorkspaceContentsService,
    private dialog: MatDialog
  ) {
    route.paramMap.subscribe((x) => {
      this.workspaceId = x.get('id') ?? '';
      this.fetchWorkspaceDetails();
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
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

    this.subs.add(
      this.workspacesService
        .getWorkspaceDetails(this.workspaceId)
        .subscribe((x) => this.workspaceSubject.next(x))
    );
  }

  private createFolder(item: FolderFlatNodeItem) {
    this.subs.add(
      this.dialog
        .open(EditFolderDialogComponent, { data: { title: 'Add folder' } })
        .afterClosed()
        .subscribe((x: EditFolderData) => {
          if (!x) {
            return;
          }

          const parentId = item.id ? item.id : undefined;
          this.subs.add(
            this.workspacesService
              .createFolder(this.workspaceId, {
                name: x.name,
                parentId: parentId,
              })
              .subscribe(() => this.fetchWorkspaceDetails())
          );
        })
    );
  }

  private deleteFolder(item: FolderFlatNodeItem) {
    this.subs.add(
      this.dialog
        .open(ConfirmationDialogComponent, {
          data: { title: `Do you want to remove ${item.name}?` },
        })
        .afterClosed()
        .subscribe((x: EditFolderData) => {
          if (!x) {
            return;
          }

          this.subs.add(
            this.workspacesService
              .deleteFolder(this.workspaceId, item.id)
              .pipe(take(1))
              .subscribe(() => this.fetchWorkspaceDetails())
          );
        })
    );
  }
}
