import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { BaseApiService } from '../core/base-api.service';
import { PagedList } from '../core/core.models';
import { GetWorkspacesRequest, WorkspaceOverview } from './workspaces.models';

@Injectable({
  providedIn: 'root',
})
export class WorkspacesApiService extends BaseApiService {
  private static readonly RESOURCE = 'workspaces';

  constructor(client: HttpClient, authService: AuthService) {
    super(client, authService);
  }

  public getWorkspaces(request: GetWorkspacesRequest): Observable<PagedList<WorkspaceOverview>> {
    return this.get(WorkspacesApiService.RESOURCE, request)
  }
}
