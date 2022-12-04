import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from 'src/app/core/dialog.models';
import ignoreFalsy from 'src/app/core/operators/ignoreFalsy';
import { EditWorkspaceData } from './edit-workspace-data';

@Component({
  selector: 'app-edit-workspace-dialog',
  templateUrl: './edit-workspace-dialog.component.html',
  styleUrls: ['./edit-workspace-dialog.component.scss'],
})
export class EditWorkspaceDialogComponent implements OnInit {
  public readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<EditWorkspaceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: DialogData<EditWorkspaceData>
  ) {}

  ngOnInit() {
    if (this.data.value) {
      this.form.controls.name.setValue(this.data.value?.name);
    }
  }

  public close(success: boolean) {
    let data: EditWorkspaceData | undefined;

    if (success) {
      if (!this.form.valid) {
        return;
      }
      data = {
        name: this.form.controls.name.value,
      };
    } else {
      data = undefined;
    }

    this.dialogRef.close(data);
  }

  public static open(service: MatDialog, data: DialogData<EditWorkspaceData>) {
    return service
      .open<
        EditWorkspaceDialogComponent,
        DialogData<EditWorkspaceData>,
        EditWorkspaceData
      >(EditWorkspaceDialogComponent, { data })
      .afterClosed()
      .pipe(ignoreFalsy());
  }
}
