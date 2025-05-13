import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClient } from '@angular/common/http';
import { AuthentificationService } from './services/authentification-service.service';
import { PlayerInterface } from './model/player-interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'nplp-client';
  router = inject(Router);
  http = inject(HttpClient);
  authService = inject(AuthentificationService)

  ngOnInit(): void {
    if (localStorage.getItem("token") !== null && localStorage.getItem("token") !== undefined && localStorage.getItem("token") !== '')
      this.http
        .get<PlayerInterface>("http://localhost:8080/player/me")
        .subscribe({
          next: (response) => {
            this.authService.currentPlayerSig.set(response);
            this.router.navigateByUrl('/home');
          },
          error: () => {
            this.authService.currentPlayerSig.set(null);
          }
        })
  }
}
