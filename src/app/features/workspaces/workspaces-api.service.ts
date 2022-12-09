import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FolderDetails, FolderInfoBase, FolderOverview } from './workspaces.models';
import {
  CreateFolderRequest,
  UpdateFolderRequest,
} from './workspaces.requests';

@Injectable({
  providedIn: 'root',
})
export class WorkspacesApiService {
  private static readonly URL = environment.baseApiUrl + '/folders';

  constructor(private client: HttpClient) {}

  public createFolder(request: CreateFolderRequest) {
    return this.client.post<FolderInfoBase>(WorkspacesApiService.URL, request);
  }

  public updateFolder(id: string, request: UpdateFolderRequest) {
    return this.client.put(`${WorkspacesApiService.URL}/${id}`, request);
  }

  public deleteFolder(id: string) {
    return this.client.delete(`${WorkspacesApiService.URL}/${id}`);
  }

  public getFolderDetails(id: string) {
    return this.client.get<FolderDetails>(`${WorkspacesApiService.URL}/${id}`)
  }

  public getFolderTree() {
    return this.client.get<FolderOverview>(`${WorkspacesApiService.URL}`)
  }
}
