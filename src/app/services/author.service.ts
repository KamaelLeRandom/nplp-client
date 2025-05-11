import { HttpClient } from '@angular/common/http';
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
}
