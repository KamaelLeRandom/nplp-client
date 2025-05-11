import { Component, inject, Input, input, OnInit } from '@angular/core';
import { SongFormComponent } from '../song-form/song-form.component';
import { SongService } from '../../../services/song.service';
import { SongInterface } from '../../../model/song-interface';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-song-edit',
  standalone: true,
  imports: [SongFormComponent, NgIf],
  templateUrl: './song-edit.component.html',
  styleUrl: './song-edit.component.scss'
})
export class SongEditComponent implements OnInit {
    @Input() id!: string;
    songService = inject(SongService);
    router = inject(Router);
    song: SongInterface = {} as SongInterface;
    loading: boolean = true;

    ngOnInit(): void {
      if (isNaN(Number(this.id))) {
        this.router.navigateByUrl('/error', { state: { reason: 'Identifiant de chanson invalide' } })
      }

      this.songService.getSongById(Number(this.id))
        .subscribe(({
          next: (response) => {
            this.loading = false;
            this.song = response;
          },
          error: (error) => {
            console.log('error', error);
            this.router.navigateByUrl('/error', { state: { reason: 'Chanson introuvable' } })
          }
        }))
    }

    onSubmit(songForm: any) {
      const authorsIds: number[] = songForm.authors || [];
      const authors = authorsIds.map((id: number) => ({ id }));

      this.songService
        .editSong(
          {
            id: Number(this.id),
            title: songForm.title,
            lyric: songForm.lyric,
            publishAt: new Date(songForm.publishAt ?? ''),
            duration: Number(songForm.duration) || 0,
            authors: authors,
            cuts: [] as number[],
          } as SongInterface)
        .subscribe(({
          next: (response) => {
            this.router.navigateByUrl(`/song/${this.id}`) 
          },
          error: (error) => {
            console.log(error);
          }
        }))
      ;
    }
}
