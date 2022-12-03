import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditFolderData } from '../dialogs/edit-folder-dialog/edit-folder-data';
import { EditFolderDialogComponent } from '../dialogs/edit-folder-dialog/edit-folder-dialog.component';
import { BrowserItem } from './workspace-browser.models';
import { WorkspaceBrowserService } from './workspace-browser.service';

@Component({
  selector: 'app-workspace-browser',
  templateUrl: './workspace-browser.component.html',
  styleUrls: ['./workspace-browser.component.scss'],
})
export class WorkspaceBrowserComponent implements OnDestroy {
  private readonly subs = new Subscription();
  private workspaceId = '';

  public readonly workspace$ = this.workspaceService.workspace$;
  public readonly items$ = this.workspaceService.currentItems$;

  constructor(
    route: ActivatedRoute,
    private workspaceService: WorkspaceBrowserService,
    private dialog: MatDialog
  ) {
    this.subs.add(
      route.paramMap.subscribe((x) => {
        this.workspaceId = x.get('id') ?? '';
        this.workspaceService.fetchWorkspaceDetails(this.workspaceId);
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public isRoot() {
    return this.workspaceService.navigator.canNavigateUp();
  }

  public currentPath() {
    return this.workspaceService.navigator.getCurrentPath();
  }

  public selectItem(item: BrowserItem) {
    this.workspaceService.selectItem(item);
  }

  public selectedItem() {
    return this.workspaceService.getSelectedItem();
  }

  public openCreateFolderDialog() {
    this.subs.add(
      this.dialog
        .open(EditFolderDialogComponent, {
          data: { title: 'Add folder' },
        })
        .afterClosed()
        .subscribe((x: EditFolderData) => {
          if (!x) {
            return;
          }

          this.workspaceService.addFolder(x.name);
        })
    );
  }
}
