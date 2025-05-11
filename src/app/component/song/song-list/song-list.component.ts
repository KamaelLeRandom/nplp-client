import { Component, inject } from '@angular/core';
import { SongService } from '../../../services/song.service';
import { SongInterface } from '../../../model/song-interface';
import { SongItemComponent } from '../song-item/song-item.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthentificationService } from '../../../services/authentification-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-song-list', 
  standalone: true,
  imports: [SongItemComponent, FormsModule, NgFor, NgIf],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.scss'
})
export class SongListComponent {
  router = inject(Router);
  authService = inject(AuthentificationService);
  songList: SongInterface[] = [];
  songService = inject(SongService);

  searchInput: string = '';
  searchQuery: string = '';

  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;

  constructor() {
    this.fetchSongs();
  }

  fetchSongs() {
    this.songService.getSongs(this.currentPage, this.pageSize, this.searchQuery)
      .subscribe({
        next: (response: any) => {
          this.songList = response.songs;
          this.totalPages = response.totalPages;
        },
        error: (error) => {
          console.error(error);
          this.songList = [];
        }
      });
  }

  applySearch() {
    this.searchQuery = this.searchInput.trim().toLowerCase();
    this.currentPage = 1;
    this.fetchSongs();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }

    this.currentPage = page;
    this.fetchSongs();
  }


  onCreateClick() {
    this.router.navigateByUrl('/song/create');
  }
}
