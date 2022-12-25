import { Component, Inject, OnInit } from '@angular/core';
import { EditTemplateDialogData } from './edit-template-dialog.model';
import { DialogData } from 'src/app/core/dialog.models';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import ignoreFalsy from 'src/app/core/operators/ignoreFalsy';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-template-dialog',
  templateUrl: './edit-template-dialog.component.html',
  styleUrls: ['./edit-template-dialog.component.scss'],
})
export class EditTemplateDialogComponent implements OnInit {
  public readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<EditTemplateDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly data: DialogData<EditTemplateDialogData>
  ) {}

  ngOnInit(): void {
    if (this.data.value) {
      this.form.controls.name.setValue(this.data.value.name);
    }
  }

  public close(success: boolean) {
    let data: EditTemplateDialogData | undefined;

    if (success) {
      if (!this.form.valid) {
        return;
      }
      const controls = this.form.controls;
      data = {
        name: controls.name.value,
        id: this.data.value?.id
      };
    } else {
      data = undefined;
    }

    this.dialogRef.close(data);
  }

  public static open(
    service: MatDialog,
    data: DialogData<EditTemplateDialogData>
  ) {
    return service
      .open<
        EditTemplateDialogComponent,
        DialogData<EditTemplateDialogData>,
        EditTemplateDialogData
      >(EditTemplateDialogComponent, { data })
      .afterClosed()
      .pipe(ignoreFalsy());
  }
}
