import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogData, DialogData } from 'src/app/core/dialog.models';
import { EditNoteData } from '../../notes/components/dialogs/edit-note-dialog/edit-note-data';
import { EditNoteDialogComponent } from '../../notes/components/dialogs/edit-note-dialog/edit-note-dialog.component';
import { EditFolderData } from '../components/dialogs/edit-folder-dialog/edit-folder-data';
import { EditFolderDialogComponent } from '../components/dialogs/edit-folder-dialog/edit-folder-dialog.component';
import { WorkspaceBrowserService } from './workspace-browser.service';

@Injectable()
export class BrowserDialogService {
  constructor(
    private dialog: MatDialog,
    private browserService: WorkspaceBrowserService
  ) {}

  public editFolder() {
    const item = this.browserService.getSelectedItem()!;
    const data = {
      title: 'Edit folder',
      value: { name: item.name, id: item.id },
    } as DialogData<EditFolderData>;

    EditFolderDialogComponent.open(this.dialog, data).subscribe((x) =>
      this.browserService.updateFolder(item, x.name)
    );
  }

  public removeFolder() {
    const item = this.browserService.getSelectedItem()!;
    const data = {
      value: `Do you want to remove ${item.name}?`,
    } as ConfirmationDialogData;

    ConfirmationDialogComponent.open(this.dialog, data).subscribe(() =>
      this.browserService.removeFolder(item.id)
    );
  }

  public createFolder() {
    const data = { title: 'Add folder' } as DialogData<EditFolderData>;

    EditFolderDialogComponent.open(this.dialog, data).subscribe((x) =>
      this.browserService.addFolder(x.name)
    );
  }

  public createNote() {
    const data = { title: 'Add note' } as DialogData<EditNoteData>;

    EditNoteDialogComponent.open(this.dialog, data).subscribe((x) =>
      this.browserService.addNote(x)
    );
  }
}
