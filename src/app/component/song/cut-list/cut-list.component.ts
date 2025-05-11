import { Component, inject, Input } from '@angular/core';
import { CutItemComponent } from '../cut-item/cut-item.component';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../../services/authentification-service.service';

@Component({
  selector: 'app-cut-list',
  imports: [CutItemComponent, NgFor, NgIf],
  templateUrl: './cut-list.component.html',
  styleUrl: './cut-list.component.scss'
})
export class CutListComponent {
  @Input() cuts: any[] = [];
  router = inject(Router);
  authService = inject(AuthentificationService);

  onAddClick() {
    this.router.navigateByUrl('/cut/create');
  }

  get sortedCuts() {
    return [...this.cuts].sort((a, b) => b.difficulty.point - a.difficulty.point);
  }
}
