import { Injectable } from '@angular/core';
import { map, ReplaySubject, concatMap, of, take, tap } from 'rxjs';
import { NotesApiService } from 'src/app/features/notes/notes-api.service';
import { NoteOverview } from 'src/app/features/notes/notes.models';
import { WorkspacesApiService } from '../workspaces-api.service';
import { FolderOverview } from '../workspaces.models';
import { BrowserItem } from '../components/workspace-browser/workspace-browser.models';
import WorkspaceNavigator from '../components/workspace-browser/workspace-navigator';
import NavigationInfo from '../components/workspace-browser/navigation-info';
import { EditNoteData } from '../../notes/components/dialogs/edit-note-dialog/edit-note-data';
import { CreateNoteRequest } from '../../notes/notes.requests';
import { CurrentWorkspaceService } from './current-workspace.service';
import ignoreFalsy from 'src/app/core/operators/ignoreFalsy';

@Injectable()
export class WorkspaceBrowserService {
  private readonly notes = new Map<string, NoteOverview[]>();
  private workspaceId = '';
  private selectedItem?: BrowserItem;
  private readonly navigator = new WorkspaceNavigator([]);

  public readonly workspace$ = this.fetchWorkspace();

  private readonly foldersSubject = new ReplaySubject<FolderOverview[]>(1);
  public readonly folders$ = this.foldersSubject.asObservable();

  private readonly notesSubject = new ReplaySubject<NoteOverview[]>(1);
  public readonly notes$ = this.notesSubject.asObservable();

  constructor(
    public readonly current: CurrentWorkspaceService,
    private readonly workspacesApi: WorkspacesApiService,
    private readonly notesApi: NotesApiService
  ) {}

  public getNavInfo() {
    return <NavigationInfo>this.navigator;
  }

  public navigateUp() {
    const up = this.navigator.up();
    this.updateCurrentItems(up);
    this.selectedItem = undefined;
  }

  public navigateDown(folderId: string) {
    const down = this.navigator.down(folderId);
    this.updateCurrentItems(down);
    this.selectedItem = undefined;
  }

  public addFolder(name: string) {
    const parent = this.navigator.getCurrentFolder();
    const parentId = parent?.id;

    this.workspacesApi
      .createFolder(this.workspaceId, { name: name, parentId })
      .subscribe((x) => {
        const target = parent?.children ?? this.navigator.getRoots();
        if (!x) {
          throw new Error('No id returned.');
        }
        target.push(x);
        target.sort((a, b) => a.name.localeCompare(b.name));
        this.updateCurrentItems(parent);
      });
  }

  public updateFolder(item: BrowserItem, name: string) {
    this.workspacesApi
      .updateFolder(this.workspaceId, item.id, { name })
      .subscribe(() => (item.name = name));
  }

  public removeFolder(id: string) {
    this.workspacesApi.deleteFolder(this.workspaceId, id).subscribe(() => {
      const folders =
        this.navigator.getCurrentFolder()?.children ??
        this.navigator.getRoots();

      folders.splice(
        folders.findIndex((x) => x.id === id),
        1
      );
      this.updateCurrentItems();
    });
  }

  public addNote(data: EditNoteData) {
    const currentFolder = this.navigator.getCurrentFolder();
    const request = {
      name: data.name,
      workspaceId: this.workspaceId,
      folderId: currentFolder?.id,
      sharingInfo: data.sharingInfo,
      labels: data.labels,
    } as CreateNoteRequest;

    this.notesApi
      .createNote(request)
      .subscribe((_) => this.updateCurrentItems(currentFolder, true));
  }

  public getSelectedItem() {
    return this.selectedItem;
  }

  public selectItem(item?: BrowserItem) {
    this.selectedItem = item;
  }

  private fetchWorkspace() {
    return this.current.workspace$.pipe(
      take(1),
      ignoreFalsy(),
      tap((x) => {
        this.navigator.reset(x.folderTree);
        this.notes.clear();
        this.workspaceId = x?.id;
        this.updateCurrentItems();
      })
    );
  }

  private updateCurrentItems(folder?: FolderOverview, refreshNotes = false) {
    const children = folder?.children ?? this.navigator.getRoots();
    const folderId = folder?.id ?? '*';

    this.foldersSubject.next(children);

    this.getNotes(folderId, refreshNotes).subscribe((x) => {
      this.notes.set(folderId, x);
      this.notesSubject.next(x);
    });
  }

  private getNotes(folderId: string, refresh = false) {
    if (!refresh) {
      const found = this.notes.get(folderId);
      if (found) {
        return of(found);
      }
    }

    return this.current.workspace$.pipe(
      take(1),
      concatMap((x) =>
        this.notesApi.getNotes({
          workspaceId: this.workspaceId,
          folderId,
          page: 1,
          pageSize: 50,
        })
      ),
      map((x) => x.data)
    );
  }
}
