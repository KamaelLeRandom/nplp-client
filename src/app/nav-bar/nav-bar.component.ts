import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthentificationService } from '../services/authentification-service.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgbTooltipModule, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  authService = inject(AuthentificationService);

  constructor() { }
}