import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PagedList } from '../../core/core.models';
import {
  WorkspaceDetails,
  WorkspaceOverview,
} from './workspaces.models';
import {
  CreateWorkspaceRequest,
  GetWorkspacesRequest,
  UpdateFolderRequest,
  UpdateWorkspaceRequest,
} from './workspaces.requests';

@Injectable({
  providedIn: 'root',
})
export class WorkspacesApiService {
  private static readonly URL = environment.baseApiUrl + '/workspaces';

  constructor(private client: HttpClient) {}

  public getWorkspaces(params: GetWorkspacesRequest) {
    return this.client.get<PagedList<WorkspaceOverview>>(
      WorkspacesApiService.URL,
      { params: { ...params } }
    );
  }

  public createWorkspace(request: CreateWorkspaceRequest) {
    return this.client.post(WorkspacesApiService.URL, request);
  }

  public updateWorkspace(id: string, request: UpdateWorkspaceRequest) {
    return this.client.put(WorkspacesApiService.URL + `/${id}`, request);
  }

  public getWorkspaceDetails(id: string) {
    return this.client.get<WorkspaceDetails>(WorkspacesApiService.URL + `/${id}`);
  }

  public deleteWorkspace(id: string) {
    return this.client.delete(WorkspacesApiService.URL + `/${id}`);
  }

  public createFolder(workspaceId: string, request: CreateWorkspaceRequest) {
    return this.client.post(
      `${WorkspacesApiService.URL}/${workspaceId}/folder`,
      request
    );
  }

  public updateFolder(
    workspaceId: string,
    folderId: string,
    request: UpdateFolderRequest
  ) {
    return this.client.put(
      `${WorkspacesApiService.URL}/${workspaceId}/folder/${folderId}`,
      request
    );
  }

  public deleteFolder(workspaceId: string, folderId: string) {
    return this.client.delete(`${WorkspacesApiService.URL}/${workspaceId}/folder/${folderId}`);
  }
}
