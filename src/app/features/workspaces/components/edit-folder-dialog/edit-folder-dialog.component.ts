import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/core/dialog.models';
import { EditFolderData } from './edit-folder-data';

@Component({
  selector: 'app-edit-folder-dialog',
  templateUrl: './edit-folder-dialog.component.html',
  styleUrls: ['./edit-folder-dialog.component.scss'],
})
export class EditFolderDialogComponent {
  public readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<EditFolderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: DialogData<EditFolderData>
  ) {}

  public close(success: boolean) {
    let data: EditFolderData | undefined;

    if (!this.form.valid || !success) {
      data = undefined;
    } else {
      data = {
        name: this.form.controls.name.value
      };
    }

    this.dialogRef.close(data);
  }
}
