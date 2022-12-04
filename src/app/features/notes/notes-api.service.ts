import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedList } from 'src/app/core/core.models';
import { environment } from 'src/environments/environment';
import { NoteOverview } from './notes.models';
import { CreateNoteRequest, GetNotesRequest } from './notes.requests';

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
}
