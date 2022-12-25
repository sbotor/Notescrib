import { Component, OnDestroy, OnInit } from '@angular/core';
import { WorkspaceBrowserService } from '../../services/workspace-browser.service';
import { BrowserDialogService } from '../../services/browser-dialog.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-workspace-browser',
  templateUrl: './workspace-browser.component.html',
  styleUrls: ['./workspace-browser.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceBrowserComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  public readonly folder$ = this.browserService.folder$;

  constructor(
    private readonly browserService: WorkspaceBrowserService,
    public readonly dialog: BrowserDialogService
  ) {}

  ngOnInit(): void {
    this.browserService
      .fetchFolderDetails()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  public formatPath() {
    return this.browserService.getNavInfo().getCurrentPath() ?? 'Notes';
  }

  public canNavigateUp() {
    return this.browserService.getNavInfo().canNavigateUp();
  }

  public navigateUp() {
    this.browserService
      .navigateUp()
      .pipe(
        switchMap((x) => this.browserService.fetchFolderDetails(x?.id)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public createFolder() {
    this.dialog
      .createFolder()
      .pipe(
        switchMap(() => this.browserService.refreshFolderDetails()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public createNote() {
    this.dialog
      .createNote()
      .pipe(
        switchMap(() => this.browserService.refreshFolderDetails()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public createNoteFromTemplate() {
    this.dialog
      .createNoteFromTemplate()
      .pipe(
        switchMap(() => this.browserService.refreshFolderDetails()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
