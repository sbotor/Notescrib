import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { NoteOverview } from 'src/app/features/notes/notes.models';
import { routeConfig } from 'src/app/route-config';
import { BrowserDialogService } from '../../services/browser-dialog.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { WorkspaceBrowserService } from '../../services/workspace-browser.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteListComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  @Input()
  public notes: NoteOverview[] = [];

  constructor(private readonly browserService: WorkspaceBrowserService,
    private readonly dialog: BrowserDialogService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  public getNoteRoute(noteId: string) {
    return `/${routeConfig.notes.prefix}/${noteId}`;
  }

  public editNote(note: NoteOverview) {
    this.dialog
      .editNote(note)
      .pipe(
        switchMap(() => this.browserService.refreshFolderDetails()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public removeNote(note: NoteOverview) {
    this.dialog
      .removeNote(note)
      .pipe(
        switchMap(() => this.browserService.refreshFolderDetails()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
