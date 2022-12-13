import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  FolderDetails,
  FolderInfoBase,
  FolderOverview,
} from './workspaces.models';
import {
  CreateFolderRequest,
  UpdateFolderRequest,
} from './workspaces.requests';

@Injectable({
  providedIn: 'root',
})
export class FoldersApiService {
  private static readonly URL = environment.baseApiUrl + '/folders';

  constructor(private client: HttpClient) {}

  public createFolder(request: CreateFolderRequest) {
    return this.client.post(FoldersApiService.URL, request);
  }

  public updateFolder(id: string, request: UpdateFolderRequest) {
    return this.client.put(`${FoldersApiService.URL}/${id}`, request);
  }

  public deleteFolder(id: string) {
    return this.client.delete(`${FoldersApiService.URL}/${id}`);
  }

  public getFolderDetails(id?: string) {
    const idSegment = id ? `/${id}` : '';
    return this.client.get<FolderDetails>(FoldersApiService.URL + idSegment);
  }

  public getFolderTree() {
    return this.client.get<FolderOverview>(`${FoldersApiService.URL}`);
  }
}
