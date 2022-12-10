import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SelectOption } from 'src/app/core/core.models';
import { DialogData } from 'src/app/core/dialog.models';
import ignoreFalsy from 'src/app/core/operators/ignoreFalsy';
import { Visibility } from 'src/app/core/sharing.models';
import { EditNoteData } from './edit-note-data';

@Component({
  selector: 'app-edit-note-dialog',
  templateUrl: './edit-note-dialog.component.html',
  styleUrls: ['./edit-note-dialog.component.scss'],
})
export class EditNoteDialogComponent implements OnInit {
  public readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    visibility: [Visibility.Private, [Validators.required]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<EditNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: DialogData<EditNoteData>
  ) {}

  ngOnInit(): void {
    if (this.data.value) {
      const data = this.data.value;
      const controls = this.form.controls;

      controls.name.setValue(data.name);
      controls.visibility.setValue(data.sharingInfo.visibility);
    }
  }

  public trackOption(_: number, item: SelectOption) {
    return item.value;
  }

  public close(success: boolean) {
    let data: EditNoteData | undefined;

    if (success) {
      if (!this.form.valid) {
        return;
      }
      const controls = this.form.controls;
      data = {
        name: controls.name.value,
        sharingInfo: {
          visibility: controls.visibility.value,
          allowedUserIds: [],
        },
        tags: [],
        id: this.data.value?.id
      };
    } else {
      data = undefined;
    }

    this.dialogRef.close(data);
  }

  public getVisibilityOptions() {
    return [
      { label: 'Private', value: Visibility.Private },
      { label: 'Hidden', value: Visibility.Hidden },
      { label: 'Public', value: Visibility.Public },
    ] as SelectOption[];
  }

  public static open(service: MatDialog, data: DialogData<EditNoteData>) {
    return service
      .open<EditNoteDialogComponent, DialogData<EditNoteData>, EditNoteData>(
        EditNoteDialogComponent,
        { data }
      )
      .afterClosed()
      .pipe(ignoreFalsy());
  }
}
