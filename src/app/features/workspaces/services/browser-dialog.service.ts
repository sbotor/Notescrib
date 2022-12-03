import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogData, DialogData } from 'src/app/core/dialog.models';
import { EditFolderData } from '../components/dialogs/edit-folder-dialog/edit-folder-data';
import { EditFolderDialogComponent } from '../components/dialogs/edit-folder-dialog/edit-folder-dialog.component';
import { WorkspaceBrowserService } from './workspace-browser.service';

@Injectable({
  providedIn: 'root',
})
export class BrowserDialogService {
  constructor(
    private dialog: MatDialog,
    private browserService: WorkspaceBrowserService
  ) {}

  public editFolder() {
    const item = this.browserService.getSelectedItem()!;

    this.dialog
      .open(EditFolderDialogComponent, {
        data: {
          title: 'Edit folder',
          value: { name: item.name, id: item.id },
        } as DialogData<EditFolderData>,
      })
      .afterClosed()
      .subscribe((x: EditFolderData) => {
        if (!x) {
          return;
        }
        this.browserService.updateFolder(item, x.name);
      });
  }

  public removeFolder() {
    const item = this.browserService.getSelectedItem()!;

    this.dialog
      .open(ConfirmationDialogComponent, {
        data: {
          value: `Do you want to remove ${item.name}?`,
        } as ConfirmationDialogData,
      })
      .afterClosed()
      .subscribe((x: boolean) => {
        if (!x) {
          return;
        }
        this.browserService.removeFolder(item.id);
      });
  }

  public createFolder() {
    this.dialog
      .open(EditFolderDialogComponent, {
        data: { title: 'Add folder' },
      })
      .afterClosed()
      .subscribe((x: EditFolderData) => {
        if (!x) {
          return;
        }
        this.browserService.addFolder(x.name);
      });
  }
}
