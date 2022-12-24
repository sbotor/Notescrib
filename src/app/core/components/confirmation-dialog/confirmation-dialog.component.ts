import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ConfirmationDialogData } from '../../dialog.models';
import ignoreFalsy from '../../operators/ignoreFalsy';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) {}

  public close(choice: boolean) {
    this.dialogRef.close(choice);
  }

  public static open(service: MatDialog, data: ConfirmationDialogData) {
    return service
      .open<ConfirmationDialogComponent, ConfirmationDialogData, boolean>(
        ConfirmationDialogComponent,
        { data }
      )
      .afterClosed()
      .pipe(ignoreFalsy());
  }
}
