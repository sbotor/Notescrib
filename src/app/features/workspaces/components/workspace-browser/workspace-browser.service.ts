import { Injectable } from '@angular/core';
import { map, ReplaySubject, concatMap, of } from 'rxjs';
import { NotesApiService } from 'src/app/features/notes/notes-api.service';
import { NoteOverview } from 'src/app/features/notes/notes.models';
import { WorkspacesApiService } from '../../workspaces-api.service';
import { WorkspaceDetails, FolderOverview } from '../../workspaces.models';
import { WorkspaceWalker } from './workspace-walker';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceBrowserService {
  private readonly notes = new Map<string, NoteOverview[]>();
  private readonly workspaceWalker = new WorkspaceWalker([]);

  private readonly workspaceSubject = new ReplaySubject<WorkspaceDetails>(1);
  public readonly workspace$ = this.workspaceSubject.asObservable();

  constructor(
    private workspacesApi: WorkspacesApiService,
    private notesApi: NotesApiService
  ) {}

  public fetchWorkspaceDetails(id: string) {
    if (!id) {
      throw new Error('Workspace ID is empty.');
    }

    this.notes.clear();

    this.workspacesApi
      .getWorkspaceDetails(id)
      .pipe(
        concatMap((x) => {
          this.workspaceWalker.reset(x.folderTree);
          this.workspaceSubject.next(x);
          return this.fetchNotes('');
        })
      )
      .subscribe((x) => {
        this.notes.set('', x);
      });
  }

  public getNotes(folderId: string) {
    const found = this.notes.get(folderId);
    if (found) {
      return of(found);
    }

    return this.fetchNotes(folderId);
  }

  private fetchNotes(folderId: string) {
    return this.workspaceSubject.pipe(
      concatMap((x) =>
        this.notesApi.getNotes({
          workspaceId: x.id,
          folderId,
          page: 1,
          pageSize: 50,
        })
      ),
      map((x) => x.data)
    );
  }
}
