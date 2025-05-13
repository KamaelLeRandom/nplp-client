import { Component, inject } from '@angular/core';
import { AuthorItemComponent } from '../author-item/author-item.component';
import { NgFor, NgIf } from '@angular/common';
import { AuthorInterface } from '../../../model/author-interface';
import { AuthentificationService } from '../../../services/authentification-service.service';
import { Router } from '@angular/router';
import { AuthorService } from '../../../services/author.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [AuthorItemComponent, FormsModule, NgIf, NgFor],
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.scss'
})
export class AuthorListComponent {
  router = inject(Router);
  authService = inject(AuthentificationService);
  authorList: AuthorInterface[] = [];
  authorService = inject(AuthorService);

  searchInput: string = '';
  searchQuery: string = '';

  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;

  constructor() {
    this.fetchAuthors();
  }

  fetchAuthors() {
    this.authorService.getAuthors(this.currentPage, this.pageSize, this.searchQuery)
      .subscribe(({
        next: (response: any) => {
          this.authorList = response.songs;
          this.totalPages = response.totalPages;
        },
        error: (error) => {
          console.error(error);
          this.authorList = [];
        }
      }))
    ;
  }

  applySearch() {
    this.searchQuery = this.searchInput.trim().toLowerCase();
    this.currentPage = 1;
    this.fetchAuthors();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }

    this.currentPage = page;
    this.fetchAuthors();
  }

  onCreateClick() {
    this.router.navigateByUrl('/author/create');
  }
}
