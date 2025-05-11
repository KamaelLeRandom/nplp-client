import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorInterface } from '../model/author-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  baseUrl: string = 'http://localhost:8080/author';
  http = inject(HttpClient);

  constructor() { }

  getAllAuthor(): Observable<AuthorInterface[]> {
    return this.http.get<AuthorInterface[]>(`${this.baseUrl}`);
  }

  getAuthors(page: number, size: number, search?: string): Observable<AuthorInterface[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<AuthorInterface[]>(`${this.baseUrl}/filter`, { params });
  }
}
