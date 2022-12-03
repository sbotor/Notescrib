import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/core/dialog.models';
import { EditWorkspaceData } from './edit-workspace-data';

@Component({
  selector: 'app-edit-workspace-dialog',
  templateUrl: './edit-workspace-dialog.component.html',
  styleUrls: ['./edit-workspace-dialog.component.scss'],
})
export class EditWorkspaceDialogComponent implements OnInit {

  public readonly form = this.fb.nonNullable.group({ name: ['', [Validators.required]] });

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

    if (!this.form.valid || !success) {
      data = undefined;
    } else {
      data = {
        name: this.form.controls.name.value
      }
    }

    this.dialogRef.close(data);
  }
}