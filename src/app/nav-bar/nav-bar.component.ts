import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgbTooltipModule, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  isConnected: boolean;

  constructor() {
    this.isConnected = true;
  }
}