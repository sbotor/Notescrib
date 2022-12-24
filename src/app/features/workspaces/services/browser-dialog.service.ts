import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { concatMap, switchMap } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogData, DialogData } from 'src/app/core/dialog.models';
import { EditNoteDialogData } from '../../notes/components/dialogs/edit-note-dialog/edit-note-dialog.model';
import { EditNoteDialogComponent } from '../../notes/components/dialogs/edit-note-dialog/edit-note-dialog.component';
import { NoteOverview } from '../../notes/notes.models';
import { EditFolderDialogData } from '../components/dialogs/edit-folder-dialog/edit-folder-dialog.model';
import { EditFolderDialogComponent } from '../components/dialogs/edit-folder-dialog/edit-folder-dialog.component';
import { FolderOverview } from '../workspaces.models';
import { WorkspaceBrowserService } from './workspace-browser.service';

@Injectable({
  providedIn: 'root'
})
export class BrowserDialogService {
  constructor(
    private dialog: MatDialog,
    private browserService: WorkspaceBrowserService
  ) {}

  public editFolder(folder: FolderOverview) {
    const data = {
      title: 'Edit folder',
      value: { name: folder.name, id: folder.id },
    } as DialogData<EditFolderDialogData>;

    return EditFolderDialogComponent.open(this.dialog, data).pipe(
      concatMap((x) => this.browserService.updateFolder(x))
    );
  }

  public removeFolder(folder: FolderOverview) {
    const data = {
      value: `Do you want to remove ${folder.name}?`,
    } as ConfirmationDialogData;

    return ConfirmationDialogComponent.open(this.dialog, data).pipe(
      concatMap(() => this.browserService.removeFolder(folder.id))
    );
  }

  public createFolder() {
    const data = { title: 'Add folder' } as DialogData<EditFolderDialogData>;

    return EditFolderDialogComponent.open(this.dialog, data).pipe(
      concatMap((x) => this.browserService.addFolder(x.name))
    );
  }

  public createNote() {
    const data = { title: 'Add note' } as DialogData<EditNoteDialogData>;

    return EditNoteDialogComponent.open(this.dialog, data).pipe(
      concatMap((x) => this.browserService.addNote(x))
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
    } as DialogData<EditNoteDialogData>;

    return EditNoteDialogComponent.open(this.dialog, data).pipe(
      concatMap((x) => this.browserService.editNote(x))
    );
  }

  public removeNote(note: NoteOverview) {
    const data = {
      value: `Do you want to remove ${note.name}?`,
    } as ConfirmationDialogData;

    return ConfirmationDialogComponent.open(this.dialog, data).pipe(
      concatMap(() => this.browserService.removeNote(note.id))
    );
  }
}
