import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogData } from 'src/app/core/dialog.models';
import ignoreFalsy from 'src/app/core/operators/ignoreFalsy';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-related-note-dialog',
  templateUrl: './add-related-note-dialog.component.html',
  styleUrls: ['./add-related-note-dialog.component.scss'],
})
export class AddRelatedNoteDialogComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<AddRelatedNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: DialogData<string>,
    private readonly snackBar: MatSnackBar
  ) {}

  public close(id?: string) {
    this.dialogRef.close(id);
  }

  public tryClose(id: string) {
    if (id === this.data?.value) {
      this.snackBar.open('Cannot choose the current note.');
      return;
    }

    this.close(id);
  }

  public static open(service: MatDialog, data: DialogData<string>) {
    return service
      .open<AddRelatedNoteDialogComponent, DialogData<string>, string>(
        AddRelatedNoteDialogComponent,
        { data }
      )
      .afterClosed()
      .pipe(ignoreFalsy());
  }
}
