import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, take } from 'rxjs';
import { NotesApiService } from 'src/app/features/notes/notes-api.service';
import { WorkspacesApiService } from '../../workspaces-api.service';
import { WorkspaceDetails } from '../../workspaces.models';

@Component({
  selector: 'app-workspace-browser',
  templateUrl: './workspace-browser.component.html',
  styleUrls: ['./workspace-browser.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceBrowserComponent {

  private workspaceId = '';

  private readonly workspaceSubject = new ReplaySubject<WorkspaceDetails>(1);
  public readonly workspaceDetails$ = this.workspaceSubject.asObservable();

  constructor(
    route: ActivatedRoute,
    private workspacesService: WorkspacesApiService,
    private notesService: NotesApiService
  ) {
    route.paramMap.pipe(take(1)).subscribe((x) => {
      this.workspaceId = x.get('id') ?? '';
      this.fetchWorkspaceDetails();
    });
  }

  private fetchWorkspaceDetails() {
    if (!this.workspaceId) {
      throw new Error('Workspace ID is empty.');
    }

    this.workspacesService
      .getWorkspaceDetails(this.workspaceId)
      .pipe(take(1))
      .subscribe((x) => this.workspaceSubject.next(x));
  }
}
