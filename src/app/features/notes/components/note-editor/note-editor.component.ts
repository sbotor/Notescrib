import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Observable,
  Subject,
  debounceTime,
  pipe,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { NoteDetails } from '../../notes.models';
import { NotesApiService } from '../../notes-api.service';
import { EditorService } from 'src/app/features/editor/editor.service';
import { EditorMode } from 'src/app/features/editor/editor.models';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss'],
})
export class NoteEditorComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private noteId = '';

  private note$!: Observable<NoteDetails>;

  constructor(
    route: ActivatedRoute,
    private readonly api: NotesApiService,
    private readonly editorService: EditorService
  ) {
    route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((x) => {
      this.noteId = x.get('id') ?? '';
    });
  }

  ngOnInit(): void {
    this.note$ = this.api
      .getNote(this.noteId)
      .pipe(tap((x) => this.editorService.resetContent(x.content, false)));

    this.editorService.save$
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

  public getNote() {
    return this.note$;
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
    this.editorService.save();
  }
}
