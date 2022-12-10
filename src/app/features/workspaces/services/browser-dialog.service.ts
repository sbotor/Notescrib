import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogData, DialogData } from 'src/app/core/dialog.models';
import { EditNoteData } from '../../notes/components/dialogs/edit-note-dialog/edit-note-data';
import { EditNoteDialogComponent } from '../../notes/components/dialogs/edit-note-dialog/edit-note-dialog.component';
import { NoteOverview } from '../../notes/notes.models';
import { EditFolderData } from '../components/dialogs/edit-folder-dialog/edit-folder-data';
import { EditFolderDialogComponent } from '../components/dialogs/edit-folder-dialog/edit-folder-dialog.component';
import { FolderInfoBase } from '../workspaces.models';
import { WorkspaceBrowserService } from './workspace-browser.service';

@Injectable()
export class BrowserDialogService {
  constructor(
    private dialog: MatDialog,
    private browserService: WorkspaceBrowserService
  ) {}

  public editFolder(folder: FolderInfoBase) {
    const data = {
      title: 'Edit folder',
      value: { name: folder.name, id: folder.id },
    } as DialogData<EditFolderData>;

    EditFolderDialogComponent.open(this.dialog, data).subscribe((x) =>
      this.browserService.updateFolder(x)
    );
  }

  public removeFolder(folder: FolderInfoBase) {
    const data = {
      value: `Do you want to remove ${folder.name}?`,
    } as ConfirmationDialogData;

    ConfirmationDialogComponent.open(this.dialog, data).subscribe(() =>
      this.browserService.removeFolder(folder.id)
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

  public editNote(note: NoteOverview) {
    const data = {
      title: 'Edit note',
      value: {
        id: note.id,
        name: note.name,
        sharingInfo: note.sharingInfo,
        tags: note.tags,
      },
    } as DialogData<EditNoteData>;

    EditNoteDialogComponent.open(this.dialog, data).subscribe((x) =>
      this.browserService
    );
  }

  public removeNote(note: NoteOverview) {
    const data = {
      value: `Do you want to remove ${note.name}?`,
    } as ConfirmationDialogData;

    ConfirmationDialogComponent.open(this.dialog, data).subscribe(() =>
      this.browserService.removeNote(note.id)
    );
  }
}
