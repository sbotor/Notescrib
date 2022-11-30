import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { WorkspaceBrowserService } from './workspace-browser.service';
@Component({
  selector: 'app-workspace-browser',
  templateUrl: './workspace-browser.component.html',
  styleUrls: ['./workspace-browser.component.scss'],
})
export class WorkspaceBrowserComponent {
  private workspaceId = '';

  public readonly name$ = this.workspaceService.workspace$.pipe(map(x => x.name));

  constructor(
    route: ActivatedRoute,
    private workspaceService: WorkspaceBrowserService
  ) {
    route.paramMap.subscribe((x) => {
      this.workspaceId = x.get('id') ?? '';
      this.workspaceService.fetchWorkspaceDetails(this.workspaceId);
    });
  }
}
