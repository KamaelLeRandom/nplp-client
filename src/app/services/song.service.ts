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

  postSong(song: SongInterface) {
    return this.http.post(`${this.baseUrl}/create`, song);
  }

  editSong(song: SongInterface) {
    return this.http.put(`${this.baseUrl}/update/${song.id}`, song)
  }

  deleteSong(id: number) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`)
  }
}
