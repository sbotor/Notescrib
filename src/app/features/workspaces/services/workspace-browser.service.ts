import { Injectable } from '@angular/core';
import { concatMap, ReplaySubject, take } from 'rxjs';
import { NotesApiService } from 'src/app/features/notes/notes-api.service';
import { WorkspacesApiService } from '../workspaces-api.service';
import { FolderDetails } from '../workspaces.models';
import { BrowserItem } from '../components/workspace-browser/workspace-browser.models';
import WorkspaceNavigator from '../components/workspace-browser/workspace-navigator';
import NavigationInfo from '../components/workspace-browser/navigation-info';
import { EditNoteData } from '../../notes/components/dialogs/edit-note-dialog/edit-note-data';
import { CreateNoteRequest } from '../../notes/notes.requests';
import { EditFolderData } from '../components/dialogs/edit-folder-dialog/edit-folder-data';

@Injectable()
export class WorkspaceBrowserService {
  private selectedItem?: BrowserItem;
  private readonly navigator = new WorkspaceNavigator([]);

  private readonly folderSubject = new ReplaySubject<FolderDetails>(1);
  public readonly folder$ = this.folderSubject.asObservable();

  constructor(
    private readonly workspacesApi: WorkspacesApiService,
    private readonly notesApi: NotesApiService
  ) {}

  public getNavInfo() {
    return <NavigationInfo>this.navigator;
  }

  public navigateUp() {
    const up = this.navigator.up();
    this.fetchFolderDetails(up?.id);
    this.selectedItem = undefined;
  }

  public navigateDown(folderId: string) {
    this.folder$.subscribe((x) => {
      const found = x.children.find((x) => x.id === folderId);
      if (!found) {
        throw new Error('Child folder not found.');
      }

      this.navigator.down({ id: found.id, name: found.name });
      this.fetchFolderDetails(found.id);
      this.selectedItem = undefined;
    });
  }

  public addFolder(name: string) {
    this.folder$
      .pipe(
        take(1),
        concatMap((x) =>
          this.workspacesApi.createFolder({ name: name, parentId: x.id })
        )
      )
      .subscribe((_) => {
        this.refreshFolderDetails();
      });
  }

  public updateFolder(data: EditFolderData) {
    this.workspacesApi
      .updateFolder(data.id!, { name: data.name })
      .subscribe(() => this.refreshFolderDetails());
  }

  public removeFolder(id: string) {
    this.workspacesApi.deleteFolder(id).subscribe(() => {
      this.refreshFolderDetails();
    });
  }

  public addNote(data: EditNoteData) {
    const currentFolder = this.navigator.getCurrentFolder();
    const request = {
      name: data.name,
      folderId: currentFolder?.id,
      sharingInfo: data.sharingInfo,
      labels: data.labels,
    } as CreateNoteRequest;

    this.notesApi
      .createNote(request)
      .subscribe((_) => this.refreshFolderDetails());
  }

  public getSelectedItem() {
    return this.selectedItem;
  }

  public selectItem(item?: BrowserItem) {
    this.selectedItem = item;
  }

  public fetchFolderDetails(folderId?: string) {
    this.workspacesApi.getFolderDetails(folderId ?? '_').subscribe((x) => {
      this.folderSubject.next(x);
    });
  }

  public refreshFolderDetails() {
    this.fetchFolderDetails(this.navigator.getCurrentFolder()?.id);
  }
}
