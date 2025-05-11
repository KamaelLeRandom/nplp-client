import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { PlayerInterface } from '../model/player-interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  currentPlayerSig = signal<PlayerInterface | null | undefined>(undefined);
  baseUrl: string = 'http://localhost:8080/auth';
  router = inject(Router);

  constructor(private http: HttpClient) { }

  isAdmin(): boolean {
    if (this.currentPlayerSig() !== undefined && this.currentPlayerSig !== null) {
      if (this.currentPlayerSig()?.role == "ROLE_ADMIN") {
        return true;
      }
    }
    return false;
  }

  register() {

  }

  login(name: string, password: string) {
    this.http
      .post<PlayerInterface>(`${this.baseUrl}/login`, { name, password })
      .subscribe(({
        next: (response) => {
          console.log(response);
          localStorage.setItem('token', response.token)
          this.currentPlayerSig.set(response);
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          console.log(error);
        }
      }));
  }

  logout() {
    localStorage.setItem('token', '');
    this.currentPlayerSig.set(null);
    this.router.navigateByUrl('/login');
  }
}
