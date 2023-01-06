import { Injectable } from '@angular/core';
import {
  concatMap,
  distinctUntilChanged,
  of,
  ReplaySubject,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { NotesApiService } from 'src/app/features/notes/notes-api.service';
import { FoldersApiService } from '../folders-api.service';
import { FolderDetails } from '../workspaces.models';
import WorkspaceNavigator from '../pages/workspace-browser/workspace-navigator';
import NavigationInfo from '../pages/workspace-browser/navigation-info';
import { EditNoteDialogData } from '../../notes/components/dialogs/edit-note-dialog/edit-note-dialog.model';
import {
  CreateNoteRequest,
  UpdateNoteRequest,
} from '../../notes/notes.requests';
import { EditFolderDialogData } from '../components/dialogs/edit-folder-dialog/edit-folder-dialog.model';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceBrowserService {
  private readonly navigator = new WorkspaceNavigator();

  private readonly folderSubject = new ReplaySubject<FolderDetails>(1);
  public readonly folder$ = this.folderSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(
    private readonly workspacesApi: FoldersApiService,
    private readonly notesApi: NotesApiService
  ) {}

  public getNavInfo() {
    return <NavigationInfo>this.navigator;
  }

  public navigateUp() {
    return of(this.navigator.up());
  }

  public resetNavigation() {
    this.navigator.reset();
  }

  public navigateDown(folderId: string) {
    return this.folder$.pipe(
      take(1),
      switchMap((x) => {
        const found = x.children.find((x) => x.id === folderId);
        if (!found) {
          throw new Error('Child folder not found.');
        }
        return of(found);
      }),
      tap((x) => this.navigator.down({ id: x.id, name: x.name }))
    );
  }

  public addFolder(name: string) {
    return this.folder$.pipe(
      take(1),
      concatMap((x) =>
        this.workspacesApi.createFolder({ name: name, parentId: x.id })
      )
    );
  }

  public updateFolder(data: EditFolderDialogData) {
    return this.workspacesApi.updateFolder(data.id!, { name: data.name });
  }

  public removeFolder(id: string) {
    return this.workspacesApi.deleteFolder(id);
  }

  public addNote(data: EditNoteDialogData, content?: string) {
    const currentFolder = this.navigator.getCurrentFolder();
    const request = {
      name: data.name,
      folderId: currentFolder?.id,
      sharingInfo: data.sharingInfo,
      tags: data.tags,
      content: content
    } as CreateNoteRequest;

    return this.notesApi.createNote(request);
  }

  public editNote(data: EditNoteDialogData) {
    const currentFolder = this.navigator.getCurrentFolder();
    const request = {
      name: data.name,
      folderId: currentFolder?.id,
      sharingInfo: data.sharingInfo,
      tags: data.tags,
    } as UpdateNoteRequest;

    return this.notesApi.updateNote(data.id!, request);
  }

  public removeNote(id: string) {
    return this.notesApi.deleteNote(id);
  }

  public fetchFolderDetails(folderId?: string) {
    return this.workspacesApi.getFolderDetails(folderId).pipe(
      tap((x) => {
        this.folderSubject.next(x);
      })
    );
  }

  public refreshFolderDetails() {
    return this.fetchFolderDetails(this.navigator.getCurrentFolder()?.id);
  }
}
