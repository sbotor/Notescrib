import { Component, Input, OnDestroy } from '@angular/core';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { BrowserDialogService } from '../../services/browser-dialog.service';
import { WorkspaceBrowserService } from '../../services/workspace-browser.service';
import { FolderDetails } from '../../workspaces.models';
import NavigationInfo from '../../pages/workspace-browser/navigation-info';

@Component({
  selector: 'app-browser-toolbar',
  templateUrl: './browser-toolbar.component.html',
  styleUrls: ['./browser-toolbar.component.scss'],
})
export class BrowserToolbarComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  @Input()
  public folder?: FolderDetails;

  public readonly navInfo: NavigationInfo;

  constructor(
    private readonly browserService: WorkspaceBrowserService,
    public readonly dialog: BrowserDialogService
  ) {
    this.navInfo = browserService.getNavInfo();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  public formatPath() {
    return this.navInfo.getCurrentPath() ?? 'Notes';
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
}
