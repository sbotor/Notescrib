import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/core/dialog.models';
import ignoreFalsy from 'src/app/core/operators/ignoreFalsy';
import { EditFolderDialogData } from './edit-folder-dialog.model';

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
    @Inject(MAT_DIALOG_DATA) public readonly data: DialogData<EditFolderDialogData>
  ) {}

  ngOnInit(): void {
    if (this.data.value) {
      this.form.controls.name.setValue(this.data.value.name);
    }
  }

  public close(success: boolean) {
    let data: EditFolderDialogData | undefined;

    if (success) {
      if (!this.form.valid) {
        return;
      }
      data = {
        name: this.form.controls.name.value,
        id: this.data.value?.id
      };
    } else {
      data = undefined;
    }

    this.dialogRef.close(data);
  }

  public static open(service: MatDialog, data: DialogData<EditFolderDialogData>) {
    return service
      .open<
        EditFolderDialogComponent,
        DialogData<EditFolderDialogData>,
        EditFolderDialogData
      >(EditFolderDialogComponent, { data })
      .afterClosed()
      .pipe(ignoreFalsy());
  }
}
