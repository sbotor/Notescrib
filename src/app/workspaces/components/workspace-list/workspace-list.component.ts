import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, map, switchMap, take } from 'rxjs';
import { SortingDirection } from 'src/app/core/core.models';
import { DialogData } from 'src/app/core/dialog.models';
import { WorkspacesApiService } from '../../workspaces-api.service';
import { WorkspaceOverview } from '../../workspaces.models';
import { EditWorkspaceDialogComponent } from '../edit-workspace-dialog/edit-workspace-dialog.component';
import { EditWorkspaceData } from '../edit-workspace-dialog/edit-workspace-data';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-workspace-list',
  templateUrl: './workspace-list.component.html',
  styleUrls: ['./workspace-list.component.scss'],
})
export class WorkspaceListComponent implements OnInit {
  private page = 1;
  private pageSize = 10;

  private refreshSubject = new BehaviorSubject<undefined>(undefined);
  public workspaces$ = this.refreshSubject.pipe(
    switchMap(() => this.getWorkspaces())
  );

  constructor(
    private workspacesService: WorkspacesApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.refreshSubject.next(undefined);
  }

  private getWorkspaces() {
    return this.workspacesService
      .getWorkspaces({
        page: this.page,
        pageSize: this.pageSize,
        orderBy: 'name',
        direction: SortingDirection.Ascending,
      })
      .pipe(map((x) => x.data));
  }

  public openWorkspaceDialog(workspace?: WorkspaceOverview) {
    workspace ? this.openEditDialog(workspace) : this.openCreateDialog();
  }

  public openDeleteDialog(workspace: WorkspaceOverview) {
    const data = {
      title: 'Are you sure?',
      value: `Do you want to remove ${workspace.name}?`,
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data });

    dialogRef.afterClosed().subscribe((x: boolean) => {
      if (!x) {
        return;
      }

      this.workspacesService
        .deleteWorkspace(workspace.id)
        .pipe(take(1))
        .subscribe(() => this.refreshSubject.next(undefined));
    });
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

      this.workspacesService
        .createWorkspace({ name: x.name })
        .pipe(take(1))
        .subscribe(() => this.refreshSubject.next(undefined));
    });
  }

  private openEditDialog(workspace: WorkspaceOverview) {
    const data = {
      title: 'Edit workspace',
      value: { id: workspace.id, name: workspace.name },
    };

    const dialogRef = this.dialog.open(EditWorkspaceDialogComponent, { data });

    dialogRef.afterClosed().subscribe((x?: EditWorkspaceData) => {
      if (!x?.id) {
        return;
      }

      this.workspacesService
        .updateWorkspace(x.id, { name: x.name })
        .pipe(take(1))
        .subscribe(() => this.refreshSubject.next(undefined));
    });
  }
}
