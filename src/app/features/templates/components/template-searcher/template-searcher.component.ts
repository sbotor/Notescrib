import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  BehaviorSubject,
  ReplaySubject,
  Subject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
} from 'rxjs';
import { NoteTemplateOverview } from '../../templates.models';
import { TemplatesApiService } from '../../templates-api.service';
import {
  CreateTemplateRequest,
  SearchTemplatesParams,
  UpdateTemplateRequest,
} from '../../templates.requests';
import { PageEvent } from '@angular/material/paginator';
import { EditTemplateDialogComponent } from '../dialogs/edit-template-dialog/edit-template-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/core/dialog.models';
import { EditTemplateDialogData } from '../dialogs/edit-template-dialog/edit-template-dialog.model';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-template-searcher',
  templateUrl: './template-searcher.component.html',
  styleUrls: ['./template-searcher.component.scss'],
})
export class TemplateSearcherComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private readonly templatesSubject = new ReplaySubject<
    NoteTemplateOverview[]
  >();
  public readonly templates$ = this.templatesSubject.asObservable();

  private readonly refreshSubject = new BehaviorSubject<undefined>(undefined);

  @Output()
  public readonly select = new EventEmitter<NoteTemplateOverview>();

  @Input()
  public title = 'Search notes';

  private readonly params = {
    textFilter$: new BehaviorSubject<string>(''),
    page$: new BehaviorSubject<number>(1),
    pageSize$: new BehaviorSubject<number>(10),
  };

  public readonly paging = {
    page: 0,
    pageSize: 10,
    pageSizeOptions: [5, 10, 20, 50],
    totalCount: 0,
  };

  constructor(
    private readonly templatesApi: TemplatesApiService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  public onTextFilterChange(value: string) {
    this.params.textFilter$.next(value);
  }

  public onPagingChanged(event: PageEvent) {
    if (event.pageIndex + 1 != this.paging.page) {
      this.paging.page = event.pageIndex + 1;
      this.params.page$.next(this.paging.page);
    }

    if (event.pageSize != this.paging.pageSize) {
      this.paging.pageSize = event.pageSize;
      this.params.pageSize$.next(this.paging.pageSize);
    }
  }

  public onSelect(template: NoteTemplateOverview) {
    this.select.emit(template);
  }

  public openAddDialog() {
    EditTemplateDialogComponent.open(this.dialog, { title: 'Add template' })
      .pipe(
        switchMap((x) => {
          const request = {
            name: x.name,
          } as CreateTemplateRequest;

          return this.templatesApi.createTemplate(request);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.refreshSubject.next(undefined));
  }

  public openEditDialog(template: NoteTemplateOverview) {
    const data = {
      title: 'Edit template',
      value: {
        id: template.id,
        name: template.name,
      },
    } as DialogData<EditTemplateDialogData>;

    EditTemplateDialogComponent.open(this.dialog, data)
      .pipe(
        switchMap((x) => {
          const request = {
            name: x.name,
          } as UpdateTemplateRequest;

          return this.templatesApi.updateTemplate(template.id, request);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.refreshSubject.next(undefined));
  }

  public delete(template: NoteTemplateOverview) {
    ConfirmationDialogComponent.open(this.dialog, {})
      .pipe(
        filter((x) => x),
        switchMap((_) => this.templatesApi.deleteTemplate(template.id)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.refreshSubject.next(undefined));
  }

  private setupSearch() {
    const textObservable = this.params.textFilter$.pipe(
      debounceTime(500),
      distinctUntilChanged()
    );

    const pageObservable = this.params.page$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );

    const pageSizeObservable = this.params.pageSize$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );

    combineLatest([
      textObservable,
      pageObservable,
      pageSizeObservable,
      this.refreshSubject,
    ])
      .pipe(
        switchMap(([text, page, pageSize]) => {
          const params = {
            textFilter: text,
            page: page,
            pageSize: pageSize,
          } as SearchTemplatesParams;

          return this.templatesApi.searchTemplates(params);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((x) => {
        this.paging.totalCount = x.totalCount;
        this.templatesSubject.next(x.data);
      });
  }
}
