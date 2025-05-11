import { inject, Injectable } from '@angular/core';
import { DifficultyInterface } from '../model/difficulty-interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DifficultyService {
  baseUrl: string = 'http://localhost:8080/difficulty';
  http = inject(HttpClient);

  constructor() { }

    getAllDifficulty(): Observable<DifficultyInterface[]> {
      return this.http.get<DifficultyInterface[]>(`${this.baseUrl}`);
    }
  
    getDifficultyById(id: number): Observable<DifficultyInterface> {
      return this.http.get<DifficultyInterface>(`${this.baseUrl}/${id}`);
    }
  
    postDifficulty(song: DifficultyInterface) {
      return this.http.post(`${this.baseUrl}/create`, song);
    }
  
    editDifficulty(diff: DifficultyInterface) {
      return this.http.put(`${this.baseUrl}/update/${diff.id}`, diff)
    }
  
    deleteDifficulty(id: number) {
      return this.http.delete(`${this.baseUrl}/delete/${id}`)
    }
}
