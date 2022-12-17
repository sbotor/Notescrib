import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NoteDetails, NoteOverview } from './notes.models';
import {
  CreateNoteRequest,
  UpdateNoteContentRequest,
  UpdateNoteRequest,
} from './notes.requests';

@Injectable({
  providedIn: 'root',
})
export class NotesApiService {
  private static readonly URL = environment.baseApiUrl + '/notes';

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

  public deleteNote(id: string) {
    return this.client.delete(`${NotesApiService.URL}/${id}`);
  }

  public updateContent(id: string, request: UpdateNoteContentRequest) {
    return this.client.put(`${NotesApiService.URL}/${id}/content`, request);
  }
}
