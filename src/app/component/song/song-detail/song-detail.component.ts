import { Component, inject, Inject, Input, input, OnInit } from '@angular/core';
import { SongInterface } from '../../../model/song-interface';
import { SongService } from '../../../services/song.service';
import { CutListComponent } from '../cut-list/cut-list.component';
import { AuthentificationService } from '../../../services/authentification-service.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-song-detail',
  imports: [CutListComponent, NgIf],
  templateUrl: './song-detail.component.html',
  styleUrl: './song-detail.component.scss'
})
export class SongDetailComponent implements OnInit {
  id = input.required<string>();
  song: SongInterface = {} as SongInterface;
  songService = inject(SongService);
  authService = inject(AuthentificationService)
  showLyrics: boolean = false;

  ngOnInit(): void {
    this.songService.getSongById(Number(this.id()))
      .subscribe(({
        next: (response) => {
          this.song = response;
        },
        error: (error) => {
          console.log(error);
        },
      }))
  }

  toggleLyrics(): void {
    this.showLyrics = !this.showLyrics;
  }

  get formattedDate(): string {
    const date = new Date(this.song.publishAt);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  get formattedDuration(): string {
    const duration = this.song.duration;
    const minutes = Math.floor(duration);
    const seconds = Math.round((duration - minutes) * 100);

    return `${minutes}min et ${seconds}sec`;
  }

  get authorList(): string {
    const names = this.song.authors.map(a => a.nickname);

    if (names.length <= 1) 
      return names[0] || '';
    
    return names.slice(0, -1).join(', ') + ' et ' + names[names.length - 1];
  }
}
