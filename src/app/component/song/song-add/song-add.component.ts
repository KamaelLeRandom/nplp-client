import { Component, inject } from '@angular/core';
import { SongFormComponent } from '../song-form/song-form.component';
import { Router } from '@angular/router';
import { SongService } from '../../../services/song.service';
import { SongInterface } from '../../../model/song-interface';

@Component({
  selector: 'app-song-add',
  imports: [SongFormComponent],
  templateUrl: './song-add.component.html',
  styleUrl: './song-add.component.scss'
})
export class SongAddComponent {
  router = inject(Router);
  songService = inject(SongService);
  song: SongInterface = {} as SongInterface;

  onSubmit(songForm: any) {
    const authorsIds: number[] = songForm.authors || [];
    const authors = authorsIds.map((id: number) => ({ id }));

    this.songService
      .postSong(
        {
          title: songForm.title,
          lyric: songForm.lyric,
          publishAt: new Date(songForm.publishAt ?? ''),
          duration: Number(songForm.duration) || 0,
          authors: authors,
          cuts: [] as number[],
        } as SongInterface)
      .subscribe(({
        next: (response) => {
          console.log('res', response)
          this.router.navigateByUrl(`/song`) 
        },
        error: (error) => {
          console.log(error);
        }
      }))
    ;
  }
}
