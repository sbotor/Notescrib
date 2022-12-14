import { Component, OnDestroy } from '@angular/core';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { BrowserDialogService } from '../../services/browser-dialog.service';
import { WorkspaceBrowserService } from '../../services/workspace-browser.service';
import { FolderOverview } from '../../workspaces.models';
import { Router } from '@angular/router';
import { NoteOverview } from 'src/app/features/notes/notes.models';
import { routeConfig } from 'src/app/route-config';

@Component({
  selector: 'app-browser-list',
  templateUrl: './browser-list.component.html',
  styleUrls: ['./browser-list.component.scss'],
})
export class BrowserListComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  public readonly folder$ = this.browserService.folder$;

  constructor(
    private readonly browserService: WorkspaceBrowserService,
    public readonly dialog: BrowserDialogService,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  public navigateDown(id: string) {
    this.browserService
      .navigateDown(id)
      .pipe(
        switchMap((x) => this.browserService.fetchFolderDetails(x.id)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public editFolder(folder: FolderOverview) {
    this.dialog
      .editFolder(folder)
      .pipe(
        switchMap(() => this.browserService.refreshFolderDetails()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public removeFolder(folder: FolderOverview) {
    this.dialog
      .removeFolder(folder)
      .pipe(
        switchMap(() => this.browserService.refreshFolderDetails()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public async onNoteSelect(note: NoteOverview) {
    await this.router.navigate(['/', routeConfig.notes.prefix, note.id]);
  }
}
