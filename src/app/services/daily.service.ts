import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyInterface } from '../model/daily-interface';

@Injectable({
  providedIn: 'root'
})
export class DailyService {
  baseUrl: string = 'http://localhost:8080/daily';
  http = inject(HttpClient);

  constructor() { }

  getDaily(): Observable<DailyInterface[]> {
    return this.http.get<DailyInterface[]>(`${this.baseUrl}/today`);
  }
}
