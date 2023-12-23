import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NoteDetails, NoteOverview } from './notes.models';
import {
  CreateNoteRequest,
  SearchNotesParams,
  UpdateNoteContentRequest,
  UpdateNoteRequest,
} from './notes.requests';
import { PagedList } from 'src/app/core/paging.models';

@Injectable({
  providedIn: 'root',
})
export class NotesApiService {
  private static readonly URL = environment.baseApiUrl + 'api/notes';

  constructor(private client: HttpClient) {}

  public createNote(request: CreateNoteRequest) {
    return this.client.post<NoteOverview>(NotesApiService.URL, request);
  }

  public getNote(id: string) {
    return this.client.get<NoteDetails>(`${NotesApiService.URL}/${id}`);
  }

  public updateNote(id: string, request: UpdateNoteRequest) {
    return this.client.put(`${NotesApiService.URL}/${id}`, request);
  }

  public addRelatedNotes(id: string, relatedIds: string[]) {
    return this.client.post(`${NotesApiService.URL}/${id}/related`, relatedIds);
  }

  public deleteRelatedNotes(id: string, relatedIds: string[]) {
    const params = new HttpParams().appendAll({ relatedIds });
    return this.client.delete(`${NotesApiService.URL}/${id}/related`, {
      params,
    });
  }

  public deleteNote(id: string) {
    return this.client.delete(`${NotesApiService.URL}/${id}`);
  }

  public updateContent(id: string, request: UpdateNoteContentRequest) {
    return this.client.put(`${NotesApiService.URL}/${id}/content`, request);
  }

  public searchNotes(params: SearchNotesParams) {
    return this.client.get<PagedList<NoteDetails>>(NotesApiService.URL, {
      params: { ...params },
    });
  }
}
