import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedList } from 'src/app/core/paging.models';
import { environment } from 'src/environments/environment';
import { NoteOverview } from './notes.models';
import {
  CreateNoteRequest,
  UpdateNoteRequest,
  GetNotesRequest,
  CreateNoteSectionRequest,
} from './notes.requests';

@Injectable({
  providedIn: 'root',
})
export class NotesApiService {
  private static readonly URL = environment.baseApiUrl + '/notes';

  constructor(private client: HttpClient) {}

  public getNotes(params: GetNotesRequest) {
    return this.client.get<PagedList<NoteOverview>>(NotesApiService.URL, {
      params: { ...params },
    });
  }

  public createNote(request: CreateNoteRequest) {
    return this.client.post<NoteOverview>(NotesApiService.URL, request);
  }

  public updateNote(id: string, request: UpdateNoteRequest) {
    return this.client.put(`${NotesApiService.URL}/${id}`, request);
  }

  public deleteNote(id: string) {
    return this.client.delete(`${NotesApiService.URL}/${id}`);
  }
}
