import { Component, OnDestroy, OnInit } from '@angular/core';
import { NoteTemplateDetails } from '../../templates.models';
import { ReplaySubject, Subject, debounceTime, switchMap, take, takeUntil, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TemplatesApiService } from '../../templates-api.service';
import { EditorService } from 'src/app/features/editor/editor.service';
import { MatDialog } from '@angular/material/dialog';
import { EditorMode } from 'src/app/features/editor/editor.models';
import { EditTemplateDialogData } from '../../components/dialogs/edit-template-dialog/edit-template-dialog.model';
import { EditTemplateDialogComponent } from '../../components/dialogs/edit-template-dialog/edit-template-dialog.component';
import { DialogData } from 'src/app/core/dialog.models';

@Component({
  selector: 'app-template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.scss'],
})
export class TemplateEditorComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private templateId = '';
  private readonly templateSubject = new ReplaySubject<NoteTemplateDetails>(1);
  public readonly template$ = this.templateSubject.asObservable();

  constructor(
    route: ActivatedRoute,
    private readonly api: TemplatesApiService,
    private readonly editorService: EditorService,
    private readonly dialog: MatDialog
  ) {
    route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((x) => {
      this.templateId = x.get('id') ?? '';
    });
  }

  ngOnInit(): void {
    this.api
      .getTemplate(this.templateId)
      .pipe(
        tap((x) => this.editorService.resetContent(x.content)),
        takeUntil(this.destroy$)
      )
      .subscribe((x) => this.templateSubject.next(x));

    this.editorService.saveRequested$
      .pipe(
        debounceTime(250),
        switchMap(() => this.editorService.content$.pipe(take(1))),
        switchMap((x) => this.api.updateContent(this.templateId, { content: x })),
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
    this.template$
      .pipe(
        take(1),
        switchMap((x) => {
          const data = {
            title: 'Edit template',
            value: {
              name: x.name,
            },
          } as DialogData<EditTemplateDialogData>;

          return EditTemplateDialogComponent.open(this.dialog, data);
        }),
        switchMap((x) => this.api.updateTemplate(this.templateId, x)),
        switchMap(() => this.api.getTemplate(this.templateId)),
        takeUntil(this.destroy$)
      )
      .subscribe((x) => this.templateSubject.next(x));
  }

  public getMode() {
    return this.editorService.getMode();
  }
}
