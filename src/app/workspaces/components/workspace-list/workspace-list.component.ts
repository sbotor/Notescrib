import { Component, OnInit } from '@angular/core';
import { SortingDirection } from 'src/app/core/core.models';
import { WorkspacesApiService } from '../../workspaces-api.service';
import { WorkspaceOverview } from '../../workspaces.models';

@Component({
  selector: 'app-workspace-list',
  templateUrl: './workspace-list.component.html',
  styleUrls: ['./workspace-list.component.scss']
})
export class WorkspaceListComponent implements OnInit {

  private isLoading = true;

  public workspaces: WorkspaceOverview[] = [];

  constructor(private workspacesService: WorkspacesApiService) { }

  ngOnInit(): void {
    this.workspacesService.getWorkspaces({
      pageNumber: 1,
      pageSize: 10,
      orderBy: 'name',
      direction: SortingDirection.Ascending
    }).subscribe(list => {
      this.workspaces = list.data;
      this.isLoading = false;
    })
  }

}
