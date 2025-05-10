import { Component, inject } from '@angular/core';
import { SongService } from '../../../services/song.service';
import { SongInterface } from '../../../model/song-interface';
import { SongItemComponent } from '../song-item/song-item.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-song-list',
  imports: [SongItemComponent, NgFor],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.scss'
})
export class SongListComponent {
  songList: SongInterface[] = [];

  songService = inject(SongService);

  constructor() {
    this.songService.getAllSong()      
      .subscribe(({
        next: (response) => {
          console.log(response);
          this.songList = response;
        },
        error: (error) => {
          console.log(error);
          this.songList = [];
        }
      }));
  }
}
