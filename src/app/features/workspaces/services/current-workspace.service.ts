import { Injectable } from '@angular/core';
import { distinctUntilChanged, ReplaySubject, tap } from 'rxjs';
import { WorkspacesApiService } from '../workspaces-api.service';
import { WorkspaceDetails } from '../workspaces.models';

@Injectable({
  providedIn: 'root',
})
export class CurrentWorkspaceService {
  private static readonly ID_KEY = 'workspace_id';

  private readonly workspaceSubject = new ReplaySubject<WorkspaceDetails | undefined>(1);
  public readonly workspace$ = this.workspaceSubject.pipe(distinctUntilChanged());

  constructor(private readonly api: WorkspacesApiService) {
  }

  public fetchWorkspace() {
    const id = this.getId();
    if (!id) {
      this.workspaceSubject.next(undefined);
    }

    return this.switchWorkspace(id!);
  }

  public getId() {
    return localStorage.getItem(CurrentWorkspaceService.ID_KEY);
  }

  public switchWorkspace(id?: string) {
    if (!id) {
      localStorage.removeItem(CurrentWorkspaceService.ID_KEY);
      this.workspaceSubject.next(undefined);
    }

    return this.api
      .getWorkspaceDetails(id!)
      .pipe(
        tap((x) => {
          localStorage.setItem(CurrentWorkspaceService.ID_KEY, x.id);
          this.workspaceSubject.next(x);
        })
      );
  }
}
