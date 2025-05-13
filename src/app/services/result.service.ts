import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultInterface } from '../model/result-interface';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  baseUrl: string = 'http://localhost:8080/result';
  http = inject(HttpClient);

  constructor() { }

  getResultByPlayer(id: number): Observable<ResultInterface[]> {
    return this.http.get<ResultInterface[]>(`${this.baseUrl}/player/${id}`);
  }

  postResultForPlayer(result: ResultInterface): Observable<ResultInterface> {
    return this.http.post<ResultInterface>(`${this.baseUrl}/create`, result);
  }
}
