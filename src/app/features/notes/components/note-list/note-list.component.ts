import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { NoteOverview } from 'src/app/features/notes/notes.models';
import { BrowserDialogService } from '../../../workspaces/services/browser-dialog.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { WorkspaceBrowserService } from '../../../workspaces/services/workspace-browser.service';

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

  @Input()
  public currentNoteId?: string;

  @Output()
  public readonly select = new EventEmitter<NoteOverview>();

  constructor(private readonly browserService: WorkspaceBrowserService,
    private readonly dialog: BrowserDialogService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  public onSelect(note: NoteOverview) {
    if (note.id === this.currentNoteId) {
      return;
    }

    this.select.emit(note);
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

  public formatTags(note: NoteOverview) {
    return note.tags.length > 0 ? note.tags.join(', ') : 'None'
  }
}
