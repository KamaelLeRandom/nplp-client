import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CutInterface } from '../model/cut-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CutService {
  baseUrl: string = 'http://localhost:8080/cut';
  http = inject(HttpClient);

  constructor() { }

    getAllCut(): Observable<CutInterface[]> {
      return this.http.get<CutInterface[]>(`${this.baseUrl}`);
    }
  
    getCutById(id: number): Observable<CutInterface> {
      return this.http.get<CutInterface>(`${this.baseUrl}/${id}`);
    }
  
    postCut(cut: CutInterface) {
      return this.http.post(`${this.baseUrl}/create`, cut);
    }
  
    editCut(cut: CutInterface) {
      return this.http.put(`${this.baseUrl}/update/${cut.id}`, cut)
    }
  
    deleteCut(id: number) {
      return this.http.delete(`${this.baseUrl}/delete/${id}`)
    }
}
