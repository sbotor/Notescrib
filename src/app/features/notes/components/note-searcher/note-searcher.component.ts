import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {
  BehaviorSubject,
  ReplaySubject,
  Subject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from 'rxjs';
import { AuthService } from 'src/app/features/auth/auth.service';
import { NotesApiService } from 'src/app/features/notes/notes-api.service';
import { NoteOverview } from 'src/app/features/notes/notes.models';
import { SearchNotesParams } from 'src/app/features/notes/notes.requests';

@Component({
  selector: 'app-note-searcher',
  templateUrl: './note-searcher.component.html',
  styleUrls: ['./note-searcher.component.scss'],
})
export class NoteSearcherComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private readonly notesSubject = new ReplaySubject<NoteOverview[]>();
  public readonly notes$ = this.notesSubject.asObservable();

  @Output()
  public readonly select = new EventEmitter<NoteOverview>();

  @Input()
  public title = 'Search notes';

  @Input()
  public isMinimal = false;

  private readonly params = {
    textFilter$: new BehaviorSubject<string>(''),
    ownNotesOnly$: new BehaviorSubject<boolean>(false),
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
    private readonly notesApi: NotesApiService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  public isUserLoggedIn() {
    return this.authService.isLoggedIn();
  }

  public onTextFilterChange(value: string) {
    this.params.textFilter$.next(value);
  }

  public onCheckboxChange(value: boolean) {
    this.params.ownNotesOnly$.next(value);
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

  private setupSearch() {
    const textObservable = this.params.textFilter$.pipe(
      debounceTime(500),
      distinctUntilChanged()
    );

    const ownNotesOnlyObservable = this.params.ownNotesOnly$.pipe(
      debounceTime(200),
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
      ownNotesOnlyObservable,
      pageObservable,
      pageSizeObservable,
    ])
      .pipe(
        switchMap(([text, ownNotes, page, pageSize]) => {
          const params = {
            textFilter: text,
            ownOnly: ownNotes,
            page: page,
            pageSize: pageSize,
          } as SearchNotesParams;

          return this.notesApi.searchNotes(params);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((x) => {
        this.paging.totalCount = x.totalCount;
        this.notesSubject.next(x.data);
      });
  }
}
