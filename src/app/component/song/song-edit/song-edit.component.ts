import { Component, inject, Input, input } from '@angular/core';
import { SongFormComponent } from '../song-form/song-form.component';
import { SongService } from '../../../services/song.service';
import { SongInterface } from '../../../model/song-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-song-edit',
  standalone: true,
  imports: [SongFormComponent],
  templateUrl: './song-edit.component.html',
  styleUrl: './song-edit.component.scss'
})
export class SongEditComponent {
    @Input() id!: string;
    songService = inject(SongService);
    router = inject(Router);

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
