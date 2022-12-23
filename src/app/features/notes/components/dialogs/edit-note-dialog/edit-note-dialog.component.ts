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
import { EditNoteDialogData } from './edit-note-dialog.model';
import { VisibilityLevel } from 'src/app/core/sharing.models';

@Component({
  selector: 'app-edit-note-dialog',
  templateUrl: './edit-note-dialog.component.html',
  styleUrls: ['./edit-note-dialog.component.scss'],
})
export class EditNoteDialogComponent implements OnInit {
  public readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    visibility: this.fb.nonNullable.control<VisibilityLevel>('Private', [
      Validators.required,
    ]),
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<EditNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: DialogData<EditNoteDialogData>
  ) {}

  ngOnInit(): void {
    if (this.data.value) {
      const data = this.data.value;
      const controls = this.form.controls;

      controls.name.setValue(data.name);
      controls.visibility.setValue(data.sharingInfo.visibility);
    }
  }

  public trackOption(_: number, item: SelectOption<VisibilityLevel>) {
    return item.value;
  }

  public close(success: boolean) {
    let data: EditNoteDialogData | undefined;

    if (success) {
      if (!this.form.valid) {
        return;
      }
      const controls = this.form.controls;
      data = {
        name: controls.name.value,
        sharingInfo: {
          visibility: controls.visibility.value,
        },
        tags: [],
        id: this.data.value?.id,
        relatedIds: []
      };
    } else {
      data = undefined;
    }

    this.dialogRef.close(data);
  }

  public getVisibilityOptions() {
    return [
      { label: 'Private', value: 'Private' },
      { label: 'Hidden', value: 'Hidden' },
      { label: 'Public', value: 'Public' },
    ] as SelectOption<VisibilityLevel>[];
  }

  public static open(service: MatDialog, data: DialogData<EditNoteDialogData>) {
    return service
      .open<EditNoteDialogComponent, DialogData<EditNoteDialogData>, EditNoteDialogData>(
        EditNoteDialogComponent,
        { data }
      )
      .afterClosed()
      .pipe(ignoreFalsy());
  }
}
