import { Component, inject, input, OnInit } from '@angular/core';
import { AuthorInterface } from '../../../model/author-interface';
import { AuthentificationService } from '../../../services/authentification-service.service';
import { Router, RouterLink } from '@angular/router';
import { AuthorService } from '../../../services/author.service';
import { SongItemComponent } from '../../song/song-item/song-item.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-author-details',
  imports: [RouterLink, SongItemComponent, NgIf, NgFor],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.scss'
})
export class AuthorDetailsComponent implements OnInit {
  id = input.required<string>();
  author: AuthorInterface = {} as AuthorInterface;
  authorService = inject(AuthorService);
  authService = inject(AuthentificationService)
  router = inject(Router);

  ngOnInit(): void {
    if (isNaN(Number(this.id()))) {
      this.router.navigateByUrl('error', { state: { reason: "Identifiant de chanteur invalide" } })
    }

    this.authorService.getAuthorById(Number(this.id()))
      .subscribe(({
        next: (response) => {
              console.log('respose', response);
          this.author = response;
        },
        error: (error) => {
          this.router.navigateByUrl('/error', { state: { reason: 'Song not found' } });
        }
      }))
    ;
  }

  onEditClick(): void {
    const confirmed = window.confirm(`Voulez-vous vraiment editer "${this.author.nickname}" ?`);
    if (confirmed) {
      this.router.navigateByUrl(`/author/${this.id()}/edit`);
    }
  }

  onDeleteClick(): void {
    const confirmed = window.confirm(`Voulez-vous vraiment supprimer "${this.author.nickname}" ? (cette action est irréversible)`);

    if (confirmed && !isNaN(Number(this.id()))) {
      this.authorService.deleteAuthor(Number(this.id()))
        .subscribe(({
          next: (response) => {
            this.router.navigateByUrl(`/author`)
          },
          error: (error) => {
            console.log(error);
          }
        }))
    }
  }

  get formattedDate(): string {
    const date = new Date(this.author.birthday);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
