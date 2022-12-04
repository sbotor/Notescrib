import { Injectable } from '@angular/core';
import {
  map,
  ReplaySubject,
  concatMap,
  of
} from 'rxjs';
import { NotesApiService } from 'src/app/features/notes/notes-api.service';
import { NoteOverview } from 'src/app/features/notes/notes.models';
import { WorkspacesApiService } from '../workspaces-api.service';
import { FolderOverview, WorkspaceDetails } from '../workspaces.models';
import { BrowserItem } from '../components/workspace-browser/workspace-browser.models';
import WorkspaceNavigator from '../components/workspace-browser/workspace-navigator';
import NavigationInfo from '../components/workspace-browser/navigation-info';
import { EditNoteData } from '../../notes/components/dialogs/edit-note-dialog/edit-note-data';
import { CreateNoteRequest } from '../../notes/notes.requests';

@Injectable()
export class WorkspaceBrowserService {
  private readonly notes = new Map<string, NoteOverview[]>();
  private workspaceId = '';
  private selectedItem?: BrowserItem;
  private readonly navigator = new WorkspaceNavigator([]);

  private readonly workspaceSubject = new ReplaySubject<WorkspaceDetails>();
  public readonly workspace$ = this.workspaceSubject.asObservable();

  private readonly itemsSubject = new ReplaySubject<BrowserItem[]>();
  public readonly currentItems$ = this.itemsSubject.asObservable();

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

    this.notesApi.createNote(request).subscribe(_ => this.updateCurrentItems(currentFolder, true));
  }

  public getSelectedItem() {
    return this.selectedItem;
  }

  public selectItem(item?: BrowserItem) {
    this.selectedItem = item;
  }

  private updateCurrentItems(folder?: FolderOverview, refreshNotes = false) {
    const children = folder?.children ?? this.navigator.getRoots();
    const folderId = folder?.id ?? '*';

    const items: BrowserItem[] = children.map((x) => ({
      id: x.id,
      name: x.name,
      isNote: false,
    }));

    this.getNotes(folderId, refreshNotes).subscribe((x) => {
      const notes = x.map((n) => ({ id: n.id, name: n.name, isNote: true }));
      items.push(...notes);
      this.itemsSubject.next(items);
    });
  }

  private getNotes(folderId: string, refresh = false) {
    if (!refresh) {
      const found = this.notes.get(folderId);
      if (found) {
        return of(found);
      }
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
