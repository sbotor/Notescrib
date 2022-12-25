import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateTemplateRequest,
  SearchTemplatesParams,
  UpdateTemplateContentRequest,
  UpdateTemplateRequest,
} from './templates.requests';
import { environment } from 'src/environments/environment';
import { PagedList } from 'src/app/core/paging.models';
import { NoteTemplateDetails, NoteTemplateOverview } from './templates.models';

@Injectable({
  providedIn: 'root',
})
export class TemplatesApiService {
  private static readonly URL = environment.baseApiUrl + '/templates';

  constructor(private readonly http: HttpClient) {}

  public createTemplate(request: CreateTemplateRequest) {
    return this.http.post(TemplatesApiService.URL, request);
  }

  public searchTemplates(params: SearchTemplatesParams) {
    return this.http.get<PagedList<NoteTemplateOverview>>(TemplatesApiService.URL, { params: { ...params } });
  }

  public getTemplate(id: string) {
    return this.http.get<NoteTemplateDetails>(`${TemplatesApiService.URL}/${id}`);
  }

  public updateTemplate(id: string, request: UpdateTemplateRequest) {
    return this.http.put(`${TemplatesApiService.URL}/${id}`, request);
  }

  public updateContent(id: string, request: UpdateTemplateContentRequest) {
    return this.http.put(`${TemplatesApiService.URL}/${id}/content`, request);
  }

  public deleteTemplate(id: string) {
    return this.http.delete(`${TemplatesApiService.URL}/${id}`);
  }
}
