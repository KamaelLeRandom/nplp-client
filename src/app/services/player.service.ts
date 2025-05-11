import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerInterface } from '../model/player-interface';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  baseUrl: string = 'http://localhost:8080/player';
  http = inject(HttpClient);

  constructor() { }

  getLeaderboard(): Observable<PlayerInterface[]> {
    return this.http.get<PlayerInterface[]>(`${this.baseUrl}/leaderboard`);
  }
}
