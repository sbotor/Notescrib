import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { ConfirmationDialogData } from 'src/app/core/dialog.models';
import { WorkspacesApiService } from '../../workspaces-api.service';
import { WorkspaceOverview } from '../../workspaces.models';
import { EditWorkspaceDialogComponent } from '../dialogs/edit-workspace-dialog/edit-workspace-dialog.component';
import { EditWorkspaceData } from '../dialogs/edit-workspace-dialog/edit-workspace-data';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-workspace-list',
  templateUrl: './workspace-list.component.html',
  styleUrls: ['./workspace-list.component.scss'],
})
export class WorkspaceListComponent implements OnInit, OnDestroy {
  private readonly subs = new Subscription();

  private readonly workspacesSubject = new Subject<WorkspaceOverview[]>();
  public readonly workspaces$ = this.workspacesSubject.asObservable();

  constructor(
    private workspacesApi: WorkspacesApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchWorkspaces();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public openWorkspaceDialog(workspace?: WorkspaceOverview) {
    workspace ? this.openEditDialog(workspace) : this.openCreateDialog();
  }

  public openDeleteDialog(workspace: WorkspaceOverview) {
    const data = {
      title: 'Are you sure?',
      value: `Do you want to remove ${workspace.name}?`,
      confirmButton: {
        label: 'Ok',
        color: 'warn',
      },
      cancelButton: {
        label: 'Cancel',
      },
    } as ConfirmationDialogData;

    this.subs.add(
      this.dialog
        .open(ConfirmationDialogComponent, { data })
        .afterClosed()
        .subscribe((x: boolean) => {
          if (!x) {
            return;
          }

          this.subs.add(
            this.workspacesApi
              .deleteWorkspace(workspace.id)
              .subscribe(() => this.fetchWorkspaces())
          );
        })
    );
  }

  private fetchWorkspaces() {
    this.subs.add(
      this.workspacesApi
        .getWorkspaces({ page: 1, pageSize: 50 })
        .subscribe((x) => this.workspacesSubject.next(x.data))
    );
  }

  private openCreateDialog() {
    const data = {
      title: 'Create workspace',
    };

    const dialogRef = this.dialog.open(EditWorkspaceDialogComponent, { data });

    dialogRef.afterClosed().subscribe((x?: EditWorkspaceData) => {
      if (!x) {
        return;
      }

      this.workspacesApi
        .createWorkspace({ name: x.name })
        .subscribe(() => this.fetchWorkspaces());
    });
  }

  private openEditDialog(workspace: WorkspaceOverview) {
    const data = {
      title: 'Edit workspace',
      value: { name: workspace.name },
    };

    const dialogRef = this.dialog.open(EditWorkspaceDialogComponent, { data });

    dialogRef.afterClosed().subscribe((x?: EditWorkspaceData) => {
      if (!x) {
        return;
      }

      this.workspacesApi
        .updateWorkspace(workspace.id, { name: x.name })
        .subscribe(() => this.fetchWorkspaces());
    });
  }
}
