import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from 'src/app/core/dialog.models';
import ignoreFalsy from 'src/app/core/operators/ignoreFalsy';
import { EditFolderData } from './edit-folder-data';

@Component({
  selector: 'app-edit-folder-dialog',
  templateUrl: './edit-folder-dialog.component.html',
  styleUrls: ['./edit-folder-dialog.component.scss'],
})
export class EditFolderDialogComponent implements OnInit {
  public readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<EditFolderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: DialogData<EditFolderData>
  ) {}

  ngOnInit(): void {
    if (this.data.value) {
      this.form.controls.name.setValue(this.data.value.name);
    }
  }

  public close(success: boolean) {
    let data: EditFolderData | undefined;

    if (!this.form.valid || !success) {
      data = undefined;
    } else {
      data = {
        name: this.form.controls.name.value,
      };
    }

    this.dialogRef.close(data);
  }

  public static open(service: MatDialog, data: DialogData<EditFolderData>) {
    return service
      .open<
        EditFolderDialogComponent,
        DialogData<EditFolderData>,
        EditFolderData
      >(EditFolderDialogComponent, { data })
      .afterClosed()
      .pipe(ignoreFalsy());
  }
}
