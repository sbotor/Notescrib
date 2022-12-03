import { Injectable } from '@angular/core';
import { map, ReplaySubject, concatMap, of } from 'rxjs';
import { NotesApiService } from 'src/app/features/notes/notes-api.service';
import { NoteOverview } from 'src/app/features/notes/notes.models';
import { WorkspacesApiService } from '../../workspaces-api.service';
import { FolderOverview, WorkspaceDetails } from '../../workspaces.models';
import { BrowserItem } from './workspace-browser.models';
import { WorkspaceNavigator } from './workspace-navigator';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceBrowserService {
  private readonly notes = new Map<string, NoteOverview[]>();
  private workspaceId = '';
  private selectedItem?: BrowserItem;

  private readonly workspaceSubject = new ReplaySubject<WorkspaceDetails>();
  public readonly workspace$ = this.workspaceSubject.asObservable();

  private readonly itemsSubject = new ReplaySubject<BrowserItem[]>();
  public readonly currentItems$ = this.itemsSubject.asObservable();

  public readonly navigator = new WorkspaceNavigator([]);

  constructor(
    private workspacesApi: WorkspacesApiService,
    private notesApi: NotesApiService
  ) {}

  public fetchWorkspaceDetails(id: string) {
    if (!id) {
      throw new Error('Workspace ID is empty.');
    }

    this.workspacesApi.getWorkspaceDetails(id).subscribe((x) => {
      this.navigator.reset(x.folderTree);
      this.notes.clear();
      this.workspaceId = x.id;
      this.workspaceSubject.next(x);
      this.updateCurrentItems();
    });
  }

  public navigateUp() {
    this.updateCurrentItems(this.navigator.up());
    this.selectedItem = undefined;
  }

  public navigateDow(folderId: string) {
    this.updateCurrentItems(this.navigator.down(folderId));
    this.selectedItem = undefined;
  }

  public addFolder(name: string) {
    const parent = this.navigator.peekParent();
    const parentId = parent?.id;

    this.workspacesApi
      .createFolder(this.workspaceId, { name: name, parentId })
      .subscribe((x) => {
        const target = parent?.children ?? this.navigator.getRoots();
        if (!x) {
          throw new Error('No id returned.');
        }
        target.push(x);
        this.updateCurrentItems(parent);
      });
  }

  public getSelectedItem() {
    return this.selectedItem;
  }

  public selectItem(item?: BrowserItem) {
    this.selectedItem = item;
  }

  private updateCurrentItems(folder?: FolderOverview) {
    const children = folder?.children ?? this.navigator.getRoots();
    const folderId = folder?.id ?? '';

    const items: BrowserItem[] = children.map((x) => ({
      id: x.id,
      name: x.name,
      isNote: false,
    }));

    this.getNotes(folderId).subscribe((x) => {
      const notes = x.map((n) => ({ id: n.id, name: n.name, isNote: true }));
      items.push(...notes);
      this.itemsSubject.next(items);
    });
  }

  private getNotes(folderId: string) {
    const found = this.notes.get(folderId);
    if (found) {
      return of(found);
    }

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
