import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SongInterface } from '../model/song-interface';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  baseUrl: string = 'http://localhost:8080/song';
  http = inject(HttpClient);

  constructor() { }

  getAllSong(): Observable<SongInterface[]> {
    return this.http.get<SongInterface[]>(`${this.baseUrl}`);
  }

  getSongById(id: number): Observable<SongInterface> {
    return this.http.get<SongInterface>(`${this.baseUrl}/${id}`);
  }
}
