import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ReplaySubject,
  Subject,
  concatMap,
  debounceTime,
  filter,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { NoteDetails, NoteOverview } from '../../notes.models';
import { NotesApiService } from '../../notes-api.service';
import { EditorService } from 'src/app/features/editor/editor.service';
import { EditorMode } from 'src/app/features/editor/editor.models';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteDialogComponent } from '../../components/dialogs/edit-note-dialog/edit-note-dialog.component';
import { EditNoteDialogData } from '../../components/dialogs/edit-note-dialog/edit-note-dialog.model';
import { ConfirmationDialogData, DialogData } from 'src/app/core/dialog.models';
import { AddRelatedNoteDialogComponent } from '../../components/dialogs/add-related-note-dialog/add-related-note-dialog.component';
import { routeConfig } from 'src/app/route-config';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss'],
})
export class NoteEditorComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private noteId = '';

  private readonly noteSubject = new ReplaySubject<NoteDetails>(1);
  public readonly note$ = this.noteSubject.pipe(
    tap((x) => {
      if (x.isReadonly) this.setMode('readonly');
    })
  );

  constructor(
    route: ActivatedRoute,
    private readonly api: NotesApiService,
    private readonly editorService: EditorService,
    private readonly dialog: MatDialog
  ) {
    route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((x) => {
      this.noteId = x.get('id') ?? '';
    });
  }

  ngOnInit(): void {
    this.api
      .getNote(this.noteId)
      .pipe(
        tap((x) => this.editorService.resetContent(x.content)),
        takeUntil(this.destroy$)
      )
      .subscribe((x) => this.noteSubject.next(x));

    this.editorService.saveRequested$
      .pipe(
        debounceTime(250),
        switchMap(() => this.editorService.content$.pipe(take(1))),
        switchMap((x) => this.api.updateContent(this.noteId, { content: x })),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.editorService.clearDirty());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  public isDirty() {
    return this.editorService.isDirty();
  }

  public getMode() {
    return this.editorService.getMode();
  }

  public setMode(mode: EditorMode) {
    if (!mode) {
      return;
    }
    return this.editorService.setMode(mode);
  }

  public save() {
    this.editorService.requestSave();
  }

  public openEditDialog() {
    this.note$
      .pipe(
        take(1),
        switchMap((x) => {
          const data = {
            title: 'Edit note',
            value: {
              name: x.name,
              sharingInfo: x.sharingInfo,
              tags: x.tags,
              id: x.id,
            },
          } as DialogData<EditNoteDialogData>;

          return EditNoteDialogComponent.open(this.dialog, data);
        }),
        switchMap((x) => this.api.updateNote(x.id!, x)),
        switchMap(() => this.api.getNote(this.noteId)),
        takeUntil(this.destroy$)
      )
      .subscribe((x) => this.noteSubject.next(x));
  }

  public openAddRelatedDialog() {
    const data = {
      title: 'Select note',
      value: this.noteId,
    } as DialogData<string>;

    AddRelatedNoteDialogComponent.open(this.dialog, data)
      .pipe(
        concatMap((x) => this.api.addRelatedNotes(this.noteId, [x.id])),
        switchMap(() => this.api.getNote(this.noteId)),
        takeUntil(this.destroy$)
      )
      .subscribe((x) => this.noteSubject.next(x));
  }

  public removeRelatedNote(note: NoteOverview) {
    ConfirmationDialogComponent.open(this.dialog)
      .pipe(
        filter(x => !!x),
        concatMap((_) => this.api.deleteRelatedNotes(this.noteId, [note.id])),
        switchMap(() => this.api.getNote(this.noteId)),
        takeUntil(this.destroy$));
  }

  public getCurrentModeText() {
    switch (this.getMode()) {
      case 'edit':
        return 'Editing';
      case 'preview':
        return 'Editing with preview';
      case 'readonly':
        return 'Reading';
    }
  }

  public getCurrentModeIcon() {
    switch (this.getMode()) {
      case 'edit':
        return 'edit';
      case 'preview':
        return 'vertical_split';
      case 'readonly':
        return 'visibility';
    }
  }

  public getNoteRoute(id: string) {
    return `/${routeConfig.notes}/${id}`;
  }
}
