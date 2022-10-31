import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  constructor(protected client: HttpClient, private authService: AuthService) {}

  protected get<T>(resource: string, params: any = undefined): Observable<T> {
    return this.client.get<T>(environment.baseApiUrl + resource, {
      headers: this.getHeaders(),
      params,
    });
  }

  protected post<T>(resource: string, body: any): Observable<T> {
    return this.client.post<T>(environment.baseApiUrl + resource, body, {
      headers: this.getHeaders(),
    });
  }

  protected getHeaders() {
    return new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService.token}`
    );
  }
}
