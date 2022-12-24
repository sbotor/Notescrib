import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SelectOption } from 'src/app/core/core.models';
import { DialogData } from 'src/app/core/dialog.models';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { EditNoteDialogData } from './edit-note-dialog.model';
import { VisibilityLevel } from 'src/app/core/sharing.models';
import ignoreFalsy from 'src/app/core/operators/ignoreFalsy';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';

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
    ])
  });

  public readonly separatorKeyCodes = [ENTER, COMMA] as const;

  public readonly tags: string[] = [...(this.data.value?.tags ?? [])];

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<EditNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly data: DialogData<EditNoteDialogData>
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
        tags: this.tags,
        id: this.data.value?.id
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

  public addTag(event: MatChipInputEvent) {
    if (this.tags.length >= 10) {
      return;
    }

    const value = event.value.trim();

    if (!value || !!this.tags.find((x) => x === value)) {
      return;
    }

    this.tags.push(value);
    event.chipInput.clear();
  }

  public removeTag(tag: string) {
    const idx = this.tags.findIndex(x => x === tag);
    if (idx < 0) {
      return;
    }

    this.tags.splice(idx, 1);
  }

  public editTag(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.removeTag(tag);
    }

    const idx = this.tags.findIndex(x => x === tag);
    if (idx < 0) {
      return;
    }

    this.tags[idx] = value;
  }

  public static open(service: MatDialog, data: DialogData<EditNoteDialogData>) {
    return service
      .open<
        EditNoteDialogComponent,
        DialogData<EditNoteDialogData>,
        EditNoteDialogData
      >(EditNoteDialogComponent, { data })
      .afterClosed()
      .pipe(ignoreFalsy());
  }
}
