import { Component, inject, Input } from '@angular/core';
import { CutInterface } from '../../../model/cut-interface';
import { NgIf } from '@angular/common';
import { AuthentificationService } from '../../../services/authentification-service.service';
import { CutService } from '../../../services/cut.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cut-item',
  imports: [NgIf],
  templateUrl: './cut-item.component.html',
  styleUrl: './cut-item.component.scss'
})
export class CutItemComponent {
  @Input() cut!: CutInterface;

  router = inject(Router);
  cutService = inject(CutService);
  authService = inject(AuthentificationService);
  showSearchLyric = false;

  toggleSearchLyric() {
    this.showSearchLyric = !this.showSearchLyric;
  }

  onEditClick() {
    const confirmed = window.confirm(`Voulez-vous vraiment modifier cette coupure ?`);

    if (confirmed) {
      this.router.navigateByUrl(`/cut/${this.cut.id}/edit`);
    }
  }

  onDeleteClick() {
    const confirmed = window.confirm(`Voulez-vous vraiment supprimer cette coupure ? (cette action est irréversible)`);

    if (confirmed) {
      this.cutService.deleteCut(this.cut.id)
        .subscribe(({
          next: (response) => {
            window.location.reload();
          },
          error: (error) => {
            console.log(error);
          }
        }))
      ;
    }
  }
}
