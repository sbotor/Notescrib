import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogData } from 'src/app/core/dialog.models';
import ignoreFalsy from 'src/app/core/operators/ignoreFalsy';

@Component({
  selector: 'app-note-template-chooser-dialog',
  templateUrl: './note-template-chooser-dialog.component.html',
  styleUrls: ['./note-template-chooser-dialog.component.scss'],
})
export class NoteTemplateChooserDialogComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<NoteTemplateChooserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: DialogData<void>
  ) {}

  public close(id?: string) {
    this.dialogRef.close(id);
  }

  public static open(service: MatDialog, data: DialogData<void>) {
    return service
      .open<NoteTemplateChooserDialogComponent, DialogData<void>, string>(
        NoteTemplateChooserDialogComponent,
        { data }
      )
      .afterClosed()
      .pipe(ignoreFalsy());
  }
}
