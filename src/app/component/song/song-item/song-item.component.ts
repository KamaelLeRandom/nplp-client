import { Component, Input } from '@angular/core';
import { SongInterface } from '../../../model/song-interface';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-song-item',
  imports: [RouterLink, NgIf],
  templateUrl: './song-item.component.html',
  styleUrl: './song-item.component.scss'
})
export class SongItemComponent {
  @Input() song!: SongInterface;

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
